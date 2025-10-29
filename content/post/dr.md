---
title: "Simplifying Disaster Recovery With dbatools"
date: 2018-09-20
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "dr"
aliases: ["/dr/", "/dr/index.html"]
categories: ["announcements"]
draft: false
---

Over the weekend, I presented a session in Glasgow called doomsday prepping with dbatools at SQLGLA, a community event hosted by [Craig Porteous](https://uk.linkedin.com/in/craigporteous), sql_bob and [Louise Paterson](https://www.linkedin.com/in/louise-paterson/).

It was a lot of fun, even though the audience put no effort into winning the MRE give away

![](/images/mre.gif)

Now **I've** got some ready-to-eat beef tacos when the zombie apocalypse hits!

## Down to Business

When we talk about Disaster Recovery or *DR*, it's often coupled with the term High Availability or *HA*. Here are some definitions from my [graduate course on HADR](http://academic.regis.edu/ccis/Syllabi/graduate/MSCT/MSCT650_Syllabus.pdf).

### High Availability

- Deals with minor outages, and failover solutions are automated
- The goal is to restore full system functionality in a short time

### Disaster Recovery

- Deals with major outages such as natural and man-made disasters
- Focuses on manual processes and procedures to restore systems back to their original state
- Characterized by a phased approach to restoring the primary site

In the context of [SQL Server, HA](https://learn.microsoft.com/en-us/sql/sql-server/failover-clusters/high-availability-solutions-sql-server) would be Availability Groups (AG), Failover Clustering (FCI), Log Shipping and more. I won't be addressing High Availability in this post, however.

## Disaster Recovery

### Why

There are a [number](https://www.strongholddata.com/3-important-reasons-business-needs-disaster-recovery-plan/) [of](http://www.onlinetech.com/resources/references/top-5-reasons-why-your-it-disaster-recovery-plan-should-be-a-top-priority) [articles](https://www.techadvisory.org/2016/01/the-importance-of-disaster-recovery/) discussing the importance of disaster recovery. Here are the three I list in my presentation:

- Certain federal regulations require development of DR plans
- Business partners and customers often demand proof of disaster recovery plans
- Supporting ongoing availability of IT services for **business continuity**

While I can't find the original reference to cite, I once read [in my HADR class](http://academic.regis.edu/ccis/Syllabi/graduate/MSCT/MSCT650_Syllabus.pdf) that Cleveland State University did a study about the importance of DR, and they found that:

> A company that experiences a computer outage lasting more than 10 days will never fully recover financially. Within five years, 50% of those companies will be out of business.

That's insane! And a very solid reason to have a well-tested DR plan.

### Who

There was once a story on Reddit about someone who accidentally dropped the production database on their first day on the job and was fired by the CTO.

Companies like [Amazon](https://aws.amazon.com/message/680587/) correctly recognize that such disasters are a team effort and disaster recovery is the responsibility of the entire organization.

Here's how you can do your part.

## SQL Server Disaster Recovery

[Tracy Boggiano](https://tracyboggiano.com/) has an awesome, in-depth presentation about DR titled Disaster Recovery: Where to Begin that I recommend checking out. It was the primary source for my own research.

### Databases

When it comes to SQL Server and Disaster Recovery, Microsoft offers a number of options.

- Backup/Restore
- Replication
- Log Shipping
- Mirroring
- Multi-site Failover Clustering
- Availability Groups

Tracy's slide deck didn't mention it, but Bacpacs and Dacpacs are a potential option as well.

#### Scenarios

> the faster you want to get data back, the more you will pay

Need a quick DR solution? Use [Ola Hallengren's](https://ola.hallengren.com) free and open source [SQL Server Maintenance Solution](https://ola.hallengren.com) to schedule your backups, then [use robocopy to mirror those backups](https://web.archive.org/web/20190201092055/http://2clickfix.com/practical-robocopy-examples/) to a secondary data center or the cloud.

You can reliability recover your data this way but it won't be immediate.

If you need to recover your data far faster, you can use [Distributed Availability Groups](https://learn.microsoft.com/en-us/sql/database-engine/availability-groups/windows/distributed-availability-groups). This method is faster but far more costly, because you'd potentially need:

- Another data center
- More SQL Server licenses
- More Windows licenses
- More resources & storage
- More support staff

### Everything Else

Microsoft rightly places a lot of emphasis on database DR, but what about everything else? Things like:

- Logins
- SQL Agent
- Extended Events
- Linked Servers
- Credentials
- Audit
- sp_configure
- Central Management Server
- Database Mail
- System Triggers
- Endpoints
- Custom errors
- Replication
- Availability Groups

How do you DR these? You can backup the required databases for some things – like msdb restores everything in Agent. Or, if it's available, you can right-click hundreds of objects, one-by-one, and export them.

![](/images/right-click.png)

## Introducing Simplified Disaster Recovery

dbatools can help ease your DR, all in one convenient command. No, not good ol' [Export-DbaScript](https://dbatools.io/happy-belated-world-backup-day/) which is essentially the command line equivalent of the screenshot above.

Now, dbatools offers a whole new command, written specifically for the DR presentation: **[Export-DbaInstance](https://docs.dbatools.io/Export-DbaInstance.html)**

**Export-DbaInstance** is a wrapper for over 50 export commands. This is similar to [Start-DbaMigration](https://docs.dbatools.io/Start-DbaMigration.html) which is a wrapper for a bunch of copy commands.

![image](https://user-images.githubusercontent.com/8278033/45688102-c7489280-bb50-11e8-9fc5-4da29a32f312.png?w=800&ssl=1)

The databases export is an export of all the restore commands from the last log backup. So full, diff and logs.

```sql
RESTORE DATABASE [anotherdb] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\anotherdb\FULL\WORKSTATION$SQL2016_anotherdb_FULL_20180914_002533.bak' WITH  FILE = 1,  MOVE N'anotherdb' TO N'M:\DATA\anotherdb.mdf',  MOVE N'anotherdb_log' TO N'M:\DATA\anotherdb_log.ldf',  NORECOVERY,  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE DATABASE [anotherdb] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\anotherdb\DIFF\WORKSTATION$SQL2016_anotherdb_DIFF_20180914_002539.bak' WITH  FILE = 1,  MOVE N'anotherdb' TO N'M:\DATA\anotherdb.mdf',  MOVE N'anotherdb_log' TO N'M:\DATA\anotherdb_log.ldf',  NORECOVERY,  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE LOG [anotherdb] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\anotherdb\LOG\WORKSTATION$SQL2016_anotherdb_LOG_20180914_002545.trn' WITH  FILE = 1,  MOVE N'anotherdb' TO N'M:\DATA\anotherdb.mdf',  MOVE N'anotherdb_log' TO N'M:\DATA\anotherdb_log.ldf',  NORECOVERY,  NOUNLOAD,  STATS = 10
RESTORE LOG [anotherdb] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\anotherdb\LOG\WORKSTATION$SQL2016_anotherdb_LOG_20180914_002551.trn' WITH  FILE = 1,  MOVE N'anotherdb' TO N'M:\DATA\anotherdb.mdf',  MOVE N'anotherdb_log' TO N'M:\DATA\anotherdb_log.ldf',  NORECOVERY,  NOUNLOAD,  STATS = 10
RESTORE LOG [anotherdb] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\anotherdb\LOG\WORKSTATION$SQL2016_anotherdb_LOG_20180914_002557.trn' WITH  FILE = 1,  MOVE N'anotherdb' TO N'M:\DATA\anotherdb.mdf',  MOVE N'anotherdb_log' TO N'M:\DATA\anotherdb_log.ldf',  NOUNLOAD,  STATS = 10
RESTORE DATABASE [db1] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\db1\FULL\WORKSTATION$SQL2016_db1_FULL_20180914_002533.bak' WITH  FILE = 1,  MOVE N'db1' TO N'M:\DATA\db1.mdf',  MOVE N'db1_log' TO N'M:\DATA\db1_log.ldf',  NORECOVERY,  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE DATABASE [db1] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\db1\DIFF\WORKSTATION$SQL2016_db1_DIFF_20180914_002540.bak' WITH  FILE = 1,  MOVE N'db1' TO N'M:\DATA\db1.mdf',  MOVE N'db1_log' TO N'M:\DATA\db1_log.ldf',  NORECOVERY,  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE LOG [db1] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\db1\LOG\WORKSTATION$SQL2016_db1_LOG_20180914_002545.trn' WITH  FILE = 1,  MOVE N'db1' TO N'M:\DATA\db1.mdf',  MOVE N'db1_log' TO N'M:\DATA\db1_log.ldf',  NORECOVERY,  NOUNLOAD,  STATS = 10
RESTORE LOG [db1] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\db1\LOG\WORKSTATION$SQL2016_db1_LOG_20180914_002552.trn' WITH  FILE = 1,  MOVE N'db1' TO N'M:\DATA\db1.mdf',  MOVE N'db1_log' TO N'M:\DATA\db1_log.ldf',  NORECOVERY,  NOUNLOAD,  STATS = 10
RESTORE LOG [db1] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\db1\LOG\WORKSTATION$SQL2016_db1_LOG_20180914_002557.trn' WITH  FILE = 1,  MOVE N'db1' TO N'M:\DATA\db1.mdf',  MOVE N'db1_log' TO N'M:\DATA\db1_log.ldf',  NOUNLOAD,  STATS = 10
RESTORE DATABASE [dbwithsprocs] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\dbwithsprocs\FULL\WORKSTATION$SQL2016_dbwithsprocs_FULL_20180914_002534.bak' WITH  FILE = 1,  MOVE N'dbwithsprocs' TO N'M:\DATA\dbwithsprocs.mdf',  MOVE N'dbwithsprocs_log' TO N'M:\DATA\dbwithsprocs_log.ldf',  NORECOVERY,  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE DATABASE [dbwithsprocs] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\dbwithsprocs\DIFF\WORKSTATION$SQL2016_dbwithsprocs_DIFF_20180914_002540.bak' WITH  FILE = 1,  MOVE N'dbwithsprocs' TO N'M:\DATA\dbwithsprocs.mdf',  MOVE N'dbwithsprocs_log' TO N'M:\DATA\dbwithsprocs_log.ldf',  NORECOVERY,  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE LOG [dbwithsprocs] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\dbwithsprocs\LOG\WORKSTATION$SQL2016_dbwithsprocs_LOG_20180914_002545.trn' WITH  FILE = 1,  MOVE N'dbwithsprocs' TO N'M:\DATA\dbwithsprocs.mdf',  MOVE N'dbwithsprocs_log' TO N'M:\DATA\dbwithsprocs_log.ldf',  NORECOVERY,  NOUNLOAD,  STATS = 10
RESTORE LOG [dbwithsprocs] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\dbwithsprocs\LOG\WORKSTATION$SQL2016_dbwithsprocs_LOG_20180914_002552.trn' WITH  FILE = 1,  MOVE N'dbwithsprocs' TO N'M:\DATA\dbwithsprocs.mdf',  MOVE N'dbwithsprocs_log' TO N'M:\DATA\dbwithsprocs_log.ldf',  NORECOVERY,  NOUNLOAD,  STATS = 10
RESTORE LOG [dbwithsprocs] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\dbwithsprocs\LOG\WORKSTATION$SQL2016_dbwithsprocs_LOG_20180914_002557.trn' WITH  FILE = 1,  MOVE N'dbwithsprocs' TO N'M:\DATA\dbwithsprocs.mdf',  MOVE N'dbwithsprocs_log' TO N'M:\DATA\dbwithsprocs_log.ldf',  NOUNLOAD,  STATS = 10
RESTORE DATABASE [distribution] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\distribution\FULL\WORKSTATION$SQL2016_distribution_FULL_20180914_002534.bak' WITH  FILE = 1,  MOVE N'distribution' TO N'M:\DATA\distribution.MDF',  MOVE N'distribution_log' TO N'M:\DATA\distribution.LDF',  NORECOVERY,  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE DATABASE [distribution] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\distribution\DIFF\WORKSTATION$SQL2016_distribution_DIFF_20180914_002540.bak' WITH  FILE = 1,  MOVE N'distribution' TO N'M:\DATA\distribution.MDF',  MOVE N'distribution_log' TO N'M:\DATA\distribution.LDF',  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE DATABASE [master] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\master\FULL\WORKSTATION$SQL2016_master_FULL_20180914_002533.bak' WITH  FILE = 1,  MOVE N'master' TO N'M:\DATA\master.mdf',  MOVE N'mastlog' TO N'M:\DATA\mastlog.ldf',  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE DATABASE [model] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\model\FULL\WORKSTATION$SQL2016_model_FULL_20180914_002533.bak' WITH  FILE = 1,  MOVE N'modeldev' TO N'M:\DATA\model.mdf',  MOVE N'modellog' TO N'M:\DATA\modellog.ldf',  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE DATABASE [msdb] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\msdb\FULL\WORKSTATION$SQL2016_msdb_FULL_20180914_002534.bak' WITH  FILE = 1,  MOVE N'MSDBData' TO N'M:\DATA\MSDBData.mdf',  MOVE N'MSDBLog' TO N'M:\DATA\MSDBLog.ldf',  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE DATABASE [shipped] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\shipped\FULL\WORKSTATION$SQL2016_shipped_FULL_20180914_002534.bak' WITH  FILE = 1,  MOVE N'shipped' TO N'M:\DATA\shipped.mdf',  MOVE N'shipped_log' TO N'M:\DATA\shipped_log.ldf',  NORECOVERY,  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE DATABASE [shipped] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\shipped\DIFF\WORKSTATION$SQL2016_shipped_DIFF_20180914_002540.bak' WITH  FILE = 1,  MOVE N'shipped' TO N'M:\DATA\shipped.mdf',  MOVE N'shipped_log' TO N'M:\DATA\shipped_log.ldf',  NORECOVERY,  NOUNLOAD,  REPLACE,  STATS = 10
RESTORE LOG [shipped] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\shipped\LOG\WORKSTATION$SQL2016_shipped_LOG_20180914_002545.trn' WITH  FILE = 1,  MOVE N'shipped' TO N'M:\DATA\shipped.mdf',  MOVE N'shipped_log' TO N'M:\DATA\shipped_log.ldf',  NORECOVERY,  NOUNLOAD,  STATS = 10
RESTORE LOG [shipped] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\shipped\LOG\WORKSTATION$SQL2016_shipped_LOG_20180914_002552.trn' WITH  FILE = 1,  MOVE N'shipped' TO N'M:\DATA\shipped.mdf',  MOVE N'shipped_log' TO N'M:\DATA\shipped_log.ldf',  NORECOVERY,  NOUNLOAD,  STATS = 10
RESTORE LOG [shipped] FROM  DISK = N'\\localhost\backups\WORKSTATION$SQL2016\shipped\LOG\WORKSTATION$SQL2016_shipped_LOG_20180914_002557.trn' WITH  FILE = 1,  MOVE N'shipped' TO N'M:\DATA\shipped.mdf',  MOVE N'shipped_log' TO N'M:\DATA\shipped_log.ldf',  NOUNLOAD,  STATS = 10
```

Looking good!

## And Now for a Demo

Here is a slightly modified version of the demo I gave in Glasgow, commented for your enjoyment.

```powershell
# Check out our export/backup commands
Get-Command -Name Export-DbaScript -Module dbatools -Type Function
Get-Command -Name *export* -Module dbatools -Type Function
Get-Command -Name *backup* -Module dbatools -Type Function
Get-Command -Name *dbadac* -Module dbatools -Type Function

# Let's examine the commands a little more. First up! Export-DbaScript

# Start with something simple
Get-DbaAgentJob -SqlInstance workstation\sql2016 | Select -First 1 | Export-DbaScript

# Now let's look inside
Get-DbaAgentJob -SqlInstance workstation\sql2016 | Select -First 1 | Export-DbaScript | Invoke-Item

# Raw output and add a batch separator
Get-DbaAgentJob -SqlInstance workstation\sql2016 | Export-DbaScript -Passthru -BatchSeparator GO

# Get crazy
#Set Scripting Options
$options = New-DbaScriptingOption
$options.ScriptSchema = $true
$options.IncludeDatabaseContext  = $true
$options.IncludeHeaders = $false
$Options.NoCommandTerminator = $false
$Options.ScriptBatchTerminator = $true
$Options.AnsiFile = $true

# The next command will use SQL authentication
# first, pipe the password to clipboard as an example
'Zjady7$$$fxzy(&*($1' | clip
Get-DbaDbMailProfile -SqlInstance workstation\sql2016 -SqlCredential sqladmin |
Export-DbaScript -Path C:\temp\export.sql -ScriptingOptionsObject $options -NoPrefix |
Invoke-Item

# Now for a few special commands that SMO didn't quite do justice to
Export-DbaSpConfigure -SqlInstance workstation\sql2016 -Path C:\temp\sp_configure.sql
# Warning, this will write clear-text passwords to disk
Export-DbaLinkedServer -SqlInstance workstation\sql2016 -Path C:\temp\linkedserver.sql | Invoke-Item
# This will write hashed passwords to disk
Export-DbaLogin -SqlInstance workstation\sql2016 -Path C:\temp\logins.sql | Invoke-Item

# Other specials, relative to the server itself
Backup-DbaDbMasterKey -SqlInstance workstation\sql2016
Backup-DbaDbMasterKey -SqlInstance workstation\sql2016 -Path \\localhost\backups

# What if you just want to script out your restore? Invoke Backup-DbaDatabase or your Maintenance Solution job
# Let's create a FULL, DIFF, LOG, LOG, LOG
Start-DbaAgentJob -SqlInstance localhost\sql2016 -Job 'DatabaseBackup - SYSTEM_DATABASES - FULL','DatabaseBackup - USER_DATABASES - FULL'
Get-DbaRunningJob -SqlInstance localhost\sql2016

Start-DbaAgentJob -SqlInstance localhost\sql2016 -Job 'DatabaseBackup - USER_DATABASES - DIFF'
Get-DbaRunningJob -SqlInstance localhost\sql2016

Start-DbaAgentJob -SqlInstance localhost\sql2016 -Job 'DatabaseBackup - USER_DATABASES - LOG'
Get-DbaRunningJob -SqlInstance localhost\sql2016

Start-DbaAgentJob -SqlInstance localhost\sql2016 -Job 'DatabaseBackup - USER_DATABASES - LOG'
Get-DbaRunningJob -SqlInstance localhost\sql2016

Start-DbaAgentJob -SqlInstance localhost\sql2016 -Job 'DatabaseBackup - USER_DATABASES - LOG'
Get-DbaRunningJob -SqlInstance localhost\sql2016

# Now export the restores to disk
Get-ChildItem -Directory '\\localhost\backups\WORKSTATION$SQL2016' | Restore-DbaDatabase -SqlInstance localhost\sql2017 -OutputScriptOnly -WithReplace | Out-File -Filepath c:\temp\restore.sql
Invoke-Item c:\temp\restore.sql

# Speaking of Ola, use his backup script? We can restore an *ENTIRE INSTANCE* with just one line
Get-ChildItem -Directory \\workstation\backups\sql2012 | Restore-DbaDatabase -SqlInstance localhost\sql2017 -WithReplace

# Log shipping, what's up - dbatools.io/logshipping
# Also supports multiple destinations!
 $params = @{
    Source = 'localhost\sql2016'
    Destination = 'localhost\sql2017'
    Database = 'shipped'
    BackupNetworkPath= '\\localhost\backups'
    PrimaryMonitorServer = 'localhost\sql2017'
    SecondaryMonitorServer = 'localhost\sql2017'
    BackupScheduleFrequencyType = 'Daily'
    BackupScheduleFrequencyInterval = 1
    CompressBackup = $true
    CopyScheduleFrequencyType = 'Daily'
    CopyScheduleFrequencyInterval = 1
    GenerateFullBackup = $true
    Force = $true
}

Invoke-DbaDbLogShipping @params

# And now, failover to secondary
Invoke-DbaDbLogShipRecovery -SqlInstance localhost\sql2017 -Database shipped

# Introducing Export-DbaInstance
# Written for #SQLGLA!
# Get Pester and drop code at sqlps.io/doomsday

# Check that everything exists prior to export
Invoke-Pester C:\github\community-presentations\chrissy-lemaire\doomsday.Tests.ps1

# Do it all at once
Export-DbaInstance -SqlInstance workstation\sql2016 -Path \\workstation\backups\DR
Invoke-Item \\workstation\backups\DR

# It ain't a DR plan without testing
Test-DbaLastBackup -SqlInstance workstation\sql2016

# Now let's test the output scripts.
# This will also kill SSMS so that I'm forced to refresh, and open it back up
. C:\github\community-presentations\chrissy-lemaire\doomsday-dropeverything.ps1

# Check that everything has been dropped
Invoke-Pester C:\github\community-presentations\chrissy-lemaire\doomsday.Tests.ps1

# Prep
Stop-DbaService -ComputerName localhost -InstanceName sql2016 -Type Agent
Get-DbaProcess -SqlInstance localhost\sql2016 -Database msdb | Stop-DbaProcess


# Perform restores and restart SQL Agent
$files = Get-ChildItem -Path \\workstation\backups\DR -Exclude *agent* | Sort-Object LastWriteTime
$files | ForEach-Object {
    Write-Output "Running $psitem"
    Invoke-DbaQuery -File $PSItem -SqlInstance workstation\sql2016 -ErrorAction Ignore -Verbose
}

Start-DbaService -ComputerName localhost -InstanceName sql2016 -Type Agent

# Check if everything is back
Invoke-Pester C:\github\community-presentations\chrissy-lemaire\doomsday.Tests.ps1
```

Excellent! How gorgeous is that Pester test? Well, the output is hard to read, sorry. But the results are magic

![image](https://user-images.githubusercontent.com/8278033/45773900-db24ef00-bc4b-11e8-8d19-00b98bcb5e42.png?w=800&ssl=1)

## And a YouTube Link!

I also had a blast [presenting this session virtually](https://www.youtube.com/watch?v=MqawTb9crEA) for the Portland PowerShell User Group if you'd like to see a recorded demo.

{{< youtube MqawTb9crEA >}}

So check out Export-DbaInstance, let me know what you think

If you've got some suggestions, [let me know](https://dbatools.io/issues) or [create a pull request on GitHub](https://dbatools.io/pr) with your enhancements.

Thanks for reading,
- Chrissy
