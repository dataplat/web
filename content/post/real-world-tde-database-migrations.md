---
title: "Real-World TDE Database Migrations"
date: 2018-02-07
lastmod: 2025-10-29
slug: "real-world-tde-database-migrations"
aliases:
  - /real-world-tde-database-migrations/
  - /real-world-tde-database-migrations/index.html
categories: [announcements]
tags: [migration, migration-party, party]
draft: false
---

In today's post, I will tell you about how we managed to successfully complete a migration during a ~12 hour maintenance window. This could have taken a LOT longer if we didn't have [dbatools](https://dbatools.io) to automate several of the steps.

Although I will not go in to every detail about our process, I want to emphasize the areas were we chose to use dbatools to make our lives easier.

## The Goal

Recently, we got the green light for upgrading to SQL Server 2016 and we were ready to roll. Our task was to migrate multiple servers, each having several TDE encrypted databases on them. All the databases were mirrored on SQL Servers hosted in a different datacenter.

When protecting data using TDE, special care must be taken when it comes to migrations. We had two primary options for migrating TDE protected databases.

#### First Option

One option would be decrypt the databases on the old servers prior to the migration. This can take a while depending on the database size as the process would touch every single data page on disk. Same would be true once we encrypted the databases on the new servers.

If you ever decide to take this route during your migration, make sure you follow the correct and complete process to disable TDE. Otherwise you can lock your data if you don't have the certificates and keys backed up somewhere else, ready to be restored in case of emergency. And perhaps most importantly, make sure you test this process!

#### Second Option

The second option (and the one we chose) was to leave the encryption enabled. In order to be able to attach the files, or to do restores from the backups **you need to have the same certificate that was used for encryption**. This certificate is protected by the master key.

To accomplish this:

1. Make backups of the master key and the certificates
2. Restore the key and certificates on the new principal and mirror pairs

> Be aware that each database can have its own certificate! You must be sure which database is protected by which certificate. Failing to have this sorted out will leave you with some files you cannot attach or restore anywhere. Basically, you'd lose the data 😢

Need help figuring all of this out? Check out Microsoft's article [Move a TDE Protected Database to Another SQL Server](https://learn.microsoft.com/en-us/sql/relational-databases/security/encryption/move-a-tde-protected-database-to-another-sql-server). As I mentioned before make sure you test this process ahead of time!

## Preparation

In preparation for the migration day, we built all the new servers (primaries and mirrors) ahead of time and configured them based on our requirements.

A key point is to restore the keys used for encryption to the new servers. From this point on you won't have to worry too much about TDE.

Next is where [dbatools](https://dbatools.io) comes into play:

```powershell
$serverList = @(
'server_01',
'server_02',
'server_03'
)

foreach ($server in $serverList) {
    Set-DbaSpConfigure -SqlInstance $server -ConfigName CostThresholdForParallelism -Value 50
    Set-DbaSpConfigure -SqlInstance $server -ConfigName DefaultBackupCompression -Value 1
    Set-DbaSpConfigure -SqlInstance $server -ConfigName OptimizeAdhocWorkloads -Value 1
    Set-DbaSpConfigure -SqlInstance $server -ConfigName RemoteDacConnectionsEnabled -Value 1
    Set-DbaSpConfigure -SqlInstance $server -ConfigName ShowAdvancedOptions -Value 1
    # Insert all your config options here

    Set-DbaPowerPlan -ComputerName $server
    Set-DbaDbOwner -SqlInstance $server

    # Suppress all successful backups in SQL server error log
    Enable-DbaTraceFlag -SqlInstance $server -TraceFlag 3226

    # Set max memory to the recommended MB
    Set-DbaMaxMemory -SqlInstance $server
}
```

Doesn't matter how many servers you have in your environment, doing it like this saves you a lot of time and you can be sure you have the same configuration for all of them.

Next, we created our DBA toolkit database where we keep all the handy stuff:

```powershell
foreach ($server in $serverList) {
    # Create DBA database
    Invoke-DbaQuery -SqlInstance $server -Query $SQL

    # Install sp_WhoIsActive
    Install-DbaWhoIsActive -SqlInstance $server -Database DBA
}
```

Couldn't be easier than this!

## Moving Forward

Next, we created our backup jobs:

```powershell
foreach ($server in $serverList) {
    # Install Ola Hallengren's solution
    Install-DbaMaintenanceSolution -SqlInstance $server -Database DBA -ReplaceExisting -CleanupTime 72 -LogToTable -Solution "All" -BackupLocation "X:\SQLBackup" -OutputFileDirectory "X:\SQLMaintenanceLogs" -InstallJobs
}
```

For auditing purposes we even saved the old server configuration and compare it to the new ones, all with only a few lines of code:

```powershell
$propcompare = foreach ($prop in $oldprops) {
    [pscustomobject]@{
        Config              = $prop.DisplayName
        'SQL Server 2008R2' = $prop.RunningValue
        'SQL Server 2016'   = ($newprops | Where ConfigName -eq $prop.ConfigName).RunningValue
    }
}
```

Save `$propcompare` to a database using `Write-DbaDataTable` and you're set.

Transfering the logins from the old server is now easier than ever (no more sp_help_revlogin):

```powershell
Copy-DbaLogin -Source oldServer -Destination newServer
```

Beat that if you can! This way we ensured that old logins will work as soon as we start the applications.

We started to build the mirrors ahead of time (we have some big databases). We got the details for the last full backups on the old servers:

```powershell
$OldServerList | ForEach-Object {
    Get-DbaDbBackupHistory -SqlInstance $_ -LastFull | Select SqlInstance, Database, Start, End, Duration, Path, TotalSize
} | Format-Table -AutoSize
```

Based on the output of the above we fired up a quick PowerShell script that got everything copied over to a network share. From there, restoring the backups to the new mirrors was simple as:

```powershell
Restore-DbaDatabase -SqlInstance $newSQLServer_01 -Database db_1 -Path \\SharedPath\Migration\db_1 -NoRecovery -WithReplace -Verbose
Restore-DbaDatabase -SqlInstance $newSQLServer_02 -Database db_2 -Path \\SharedPath\Migration\db_2 -NoRecovery -WithReplace -Verbose
...
Restore-DbaDatabase -SqlInstance $newSQLServer_0N -Database db_N -Path \\SharedPath\Migration\db_N -NoRecovery -WithReplace -Verbose
```

I can do this all day long, especially when piping it directly to the `Backup-DbaDatabase` 😊

## Finalizing the Migration

During the maintenance window we just got a last DIFF for each database and restored that to the new mirrors. Some manual growth on some of the databases and the restore of the DIFFs took us the longest time (those contained several days of data for each server).

To shorten the time for the principals, we used detach/attach of the data and log drives approach which went pretty smooth with no unexpected incidents.

And, in case you're wondering, we do have valid backups. We even restore and test those automatically on a separate server using [dbatools](https://dbatools.io) as well. These jobs take around 17 hours per day.

I must confess, we did a bit of T-SQL to bring the mirroring up and now we're back in business, HA included.

## Post Migration

Now to the post migration stuff.

Once we're running on the new instances, we made sure we enable all the jobs we already created ahead of time:

```powershell
$serverList = @(
    'server_01',
    'server_02',
    'server_03'
)

foreach ($server in $serverList) {
    $jobs = Get-DbaAgentJob -SqlInstance $server
    $jobs | ForEach-Object {Set-DbaAgentJob -SqlInstance $server -Job $_ -Enabled}
}
```

Alternatively, piping support was added to today's release, 0.9.191. With this release and above, you can use the following syntax:

Once we're running on the new instances, we made sure we enable all the jobs we already created ahead of time:

```powershell
# much less code 👍
$serverlist | Get-DbaAgentJob | Set-DbaAgentJob -Enabled
```

We decided we need some more RAM on a few of the servers and after we added it, we just executed the following to make SQL Server aware of the change.

```powershell
Set-DbaMaxMemory -SqlInstance $server
```

Now, the moment of truth. Application started and what do you know, everything just works!

- No orphaned logins
- No SID mismatches for the logins
- No error messages.

**<insert happy tears here>**

## Automation is Awesome

As you can see, a lot of steps were automated using [dbatools](https://dbatools.io) and this saved us a lot of time overall, making this multi-terabyte database migration across 5 environments very smooth.

There is still room for a lot more automation, for even more efficiency. I'm sure we'll do better next time.

Thanks again to all of you contributing to this project and Chrissy, thanks for starting all this. Can't wait to see what the future will bring for [dbatools](https://dbatools.io) and I hope I'll be able to contribute more.

Happy migrations everyone!

\- Viorel 🇷🇴
