---
title: "migrating super old app databases"
date: 2019-08-26
author: "Chrissy LeMaire"
slug: "oldapp"
aliases:
  - /oldapp/
  - /oldapp/index.html
categories: [announcements]
tags: []
draft: false
---

Recently, a colleague asked me to assist with the migration of some older, customized application databases to a SQL Server 2017 instance. Most of the migrations I perform are rather vanilla, but this one was a bit more involved.

# Setup

Imagine this scenario:

## Source (APPSQL1)

- Dedicated SQL Server 2008 R2 failover clustered instance with a non-default collation (SQL_Latin1_General_CP1_CI_AI)
- Custom .NET application with an intense database containing a non-default collation (also SQL_Latin1_General_CP1_CI_AI), multiple CLR assemblies, and thousands of tables, views, stored procedures, functions
- Nearly 30 SQL Agent jobs, many of which had to be disabled over the years due to compatibility issues and scope changes
- Out-of-support for both Microsoft and the application vendor

## Destination (APPSQL2)

- Shared server
- SQL Server 2017
- Default collation (SQL_Latin1_General_CP1_CI_AS)

There was even a linked server in the mix, but our biggest concerns revolved around the changing collation and the Agent jobs, which were known to be brittle.

The destination test server was an existing shared server, which mirrored the scenario that would play out in production. And while the databases only needed to exist on the new server for a limited period of time, these migrated databases were going to be the most important databases on the entire instance. This meant that the SQL Server configs were going to have to cater to this app's needs. One exception was the collation, as the accent sensitivity was determined not to be a big deal and the vendor agreed.

Interesting requirements, no doubt!

# Prep

Fortunately, my colleague kept a [login inventory](/track-logins/), and we used this to determine that there would be 5 servers with connection strings that'd have to be updated with the new server name. Generally, I try to see if creating [SQL client aliases](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/create-or-delete-a-server-alias-for-use-by-a-client) is a suitable solution and this was no exception. Creating SQL aliases satisfies my curiosity and can let us know early on if the migration was a success.

> This blog post refers to options added in 1.0.34. If you'd like to follow along, please ensure you've updated to the latest version of dbatools.

So let's take a look at the prep work.

```powershell
# Ensure PowerShell remoting is available (Test-DbaConnection would also work)
Invoke-Command -ComputerName server1, server2, server3, server4, server5 -ScriptBlock { $env:computername }

# See current aliases to ensure no overlap
Get-DbaClientAlias -ComputerName server1, server2, server3, server4, server5

# Export / Document all instance objects from source SQL Server
Export-DbaInstance -SqlInstance APPSQL1, APPSQL2

# Ensure no jobs are currently running
Get-DbaRunningJob -SqlInstance APPSQL1

# Perform final log backup
Start-DbaAgentJob -SqlInstance APPSQL1 -Job "DatabaseBackup - USER_DATABASES - LOG"
```

Since the old server was going to be turned off entirely, I thought it'd be a good idea to export all of the objects (logins, jobs, etc) so that the DBA could see the state they were in at the time of migration. While we were at it, we threw in the destination server as well.

Once the final log backup was made, it was time to perform the migration!

# Migration

Because the destination server was a shared server, it wasn't a likely candidate for `Start-DbaMigration` as this command is intended for instance-to-instance migrations. In general, when I migrate to shared servers, I'll run each individual `Copy-Dba` command for things like databases, logins and jobs.

In this case, however, I recommended `Start-DbaMigration` since the application was high-priority and I wanted the migration to be as thorough as possible. I knew that the SQL Server configuration values would change, but because they were exported when we ran `Export-DbaInstance`, we could easily reference old settings.

I did decide to exclude a few things that could needlessly pollute the new server like user objects in the system databases (`Copy-DbaSysDbUserObject`) and I also excluded the Agent Server Properties, because the destination server properties (like fail-safe operator) were already set.

```powershell
# Start Migration - view results in a pretty grid, and assign the results to a variable so that it can be easily referenced later
Start-DbaMigration -Source APPSQL1 -Destination APPSQL2 -UseLastBackup -SetSourceReadOnly -Exclude SysDbUserObjects, AgentServerProperties, PolicyManagement, ResourceGovernor, DataCollector | Select-Object * -OutVariable migration | Out-GridView

# Create new alias
New-DbaClientAlias -ComputerName server1, server2, server3, server4, server5 -ServerName APPSQL2 -Alias APPSQL1

# Prep post migration potential failure/fallback
# Set-DbaDbState -SqlInstance APPSQL11 -AllDatabases -ReadWrite -Force
# Get-DbaClientAlias -ComputerName server1, server2, server3, server4, server5 | Where AliasName -eq APPSQL11 | Remove-DbaClientAlias
```

# Post-migration

So the migration went *decently* well. While we didn't have to use the fallback commands, we did have to investigate a couple failures.

## Failed job migration

A couple jobs didn't migrate because they were rejected by the new server. Seems that scripted export code referenced "server=", which was invalid because it contained the name of the old server.

```powershell
# Find jobs causing issues
Get-DbaAgentJobStep -SqlInstance APPSQL1 | Where Command -match "@server=N'APPSQL1'"

# Nope that didn't work. Oh, wait, I need the export code, not the command code.
$jobs = $migration | Where-Object { $psitem.Type -eq "Agent Job" -and $psitem.Status -eq "Failed" } | Select -ExpandProperty Name
Get-DbaAgentJob -SqlInstance APPSQL1 -Job $jobs | Export-DbaScript -Passthru -Outvariable tsql | clip
```

The above code resulted in the T-SQL CREATE scripts being added to the clipboard. We then pasted that code into SSMS, performed a find/replace for *@server=N'APPSQL1'* with *@server=N'APPSQL2'* then executed the T-SQL. Boom, it worked. Jobs were created and scheduled. I also updated dbatools to avoid this failure in the future.

While I used SSMS to perform the find/replace, this could have been done in PowerShell as well.

```powershell
$tsql = $tsql -Replace "@server=N'APPSQL1'","@server=N'APPSQL2'"
Invoke-DbaQuery -SqlInstance APPSQL2 -Query $tsql
```

Now we needed to run each of the newly created jobs to see if they work, as it make me feel more confident in the migration's success. After evaluating each job's purpose, we determined it would be okay to run every job outside of their scheduled execution times.

```powershell
# Start newly created jobs that are enabled (the lazy way), wait for them to finish
Get-DbaAgentJob -SqlInstance APPSQL2 | Where CreateDate -gt (Get-Date).AddMinutes(-60) | Where Enabled | Start-DbaAgentJob -Wait

# Ugh, looks like we have some failed executions. Were any of these jobs failing prior to migration?
Get-DbaAgentJob -SqlInstance APPSQL1 | Where LastRunOutcome -ne "Succeeded" | Where Enabled | select Name
```

Nooo, all the failed jobs ran successfully on the APPSQL1! Now we'd have to dig into the code to see what code is failing and how it can be fixed. I imagined the failures were due to collation issues and I was right. Good ol' **Cannot resolve the collation conflict between…**.

Maybe we can update the collation in the databases? I recall years ago someone asked for this functionality in dbatools but thoroughly changing the collation of an existing database is so complicated as it [requires changing the collation of so many objects](https://docs.microsoft.com/en-us/sql/relational-databases/collations/set-or-change-the-database-collation?view=sql-server-2017) including tables and indexes.

Let's try changing the database collation anyway, just to see if it's possible and if it helps. This was mostly to satisfy my curiosity.

```powershell
# first we have to kill the connections then attempt a collation change in SSMS
Get-DbaProcess -SqlInstance APPSQL1 -Database appdb | Stop-DbaProcess
```

Nope. Our attempted collation change using SSMS didn't even work because there were some dependent features in a couple of the databases. So now we had to find and edit the impacted views.

```powershell
# Omg most of the database objects are encrypted 😵, don't we have a command for that?
Get-Command -Module dbatools *crypt*

# Yesss, Invoke-DbaDbDecryptObject. Thanks Sander!
Get-Help -Examples Invoke-DbaDbDecryptObject

# Run it
Invoke-DbaDbDecryptObject -SqlInstance APPSQL2 -Database appdb -Name vwImportantView

# Oh darn, DAC is not enabled and Invoke-DbaDbDecryptObject needs DAC
Set-DbaSpConfigure -SqlInstance APPSQL2 -ConfigName RemoteDacConnectionsEnabled -Value 1

# Run again
Invoke-DbaDbDecryptObject -SqlInstance APPSQL2 -Database appdb -Name $names

# Turn DAC back off
Set-DbaSpConfigure -SqlInstance APPSQL2 -ConfigName RemoteDacConnectionsEnabled -Value 0
```

We decrypted the views then added *COLLATE DATABASE_DEFAULT* to some queries, altered the views and voila! We were set. After the jobs ran successfully, we handed the migration off to the application team.

## SSPI failures

The application team immediately handed it right back to us 😅. Seems they encountered some "Cannot Generate SSPI Context" failures. Wait, what? The SPNs are set, right?

```powershell
# Double-checking all of the SPNs are set
Test-DbaSpn -ComputerName APPSQL2

# Looks great! So is it just the app or can we make any kerberos connections using PowerShell?
# Maybe this is because they are using a SQL Client alias?
Test-DbaConnectionAuthScheme -SqlInstance APPSQL2
```

Oh, no: our dbatools connection was also using NTLM. So we checked to see if there were some stale DNS records. Nope. Cleaned out the Kerberos tickets. Works? Still no. Triple checked with Microsoft's tools and really, Kerberos *should* be working.

Turns out it was an issue with a setting in Windows (didn't record which, oops), and after that was adjusted, Kerberos worked!

# Now for the application

After confirming that Kerberos was totally working, I removed the newly created SQL Client aliases and they updated all of the connection strings. Still there were problems. The error message was written in `en-gb` ("initalised") so I figured it was an application error. If this was an error coming from SQL Server or IIS, it would have been written in `en-us`.

We figured that if the error is referencing database initialization, there must be some config table that has the name of the server. What a nightmare. Now we have to search through the databases, guessing at the potential name for this configuration object.

```powershell
# I bet it's one of those configuration tables.
Get-DbaDbTable -SqlInstance APPSQL2 -Database appdb | Where Name -match config

# No good candidates. Let's look thru the stored procedures.
 Find-DbaStoredProcedure -SqlInstance APPSQL2 -Database appdb -Pattern config

# Oops, forgot they were all encrypted. That didn't return anything.
# Search views, stored procedures and triggers then save the candidates' names to a variable so they can be passed to Invoke-DbaDbDecryptObject
Get-DbaDbModule -SqlInstance APPSQL2 -Database appdb -Type View, StoredProcedure, Trigger | Out-GridView -Passthru | Select-Object -ExpandProperty Name -OutVariable names
Invoke-DbaDbDecryptObject -SqlInstance APPSQL2 -Database appdb -Name $names
```

Oh, la la! We found a candidate, updated the values and we were back in action! The migration was successful and the test results were accepted. With this knowledge, they were able to quickly perform a the production migration.

# Out of curiosity

What was your most challenging migration with dbatools like? How often do you have to modify jobs and database objects like stored procedures/views?

- Chrissy 🚀
