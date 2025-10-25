---
title: "Minimal-downtime migrations using Invoke-DbaLogShipping"
date: 2018-04-04
slug: "logshipping"
aliases:
  - /logshipping/
  - /logshipping/index.html
categories: [announcements]
tags: [party]
draft: false
---

Last week I performed a server migration from SQL Server 2014 to SQL Server 2016 using [dbatools](https://dbatools.io). A lot of work is done up front to prepare and plan for these migrations to have the least impact on our customers. So I always do my best to improve the process each time we do it.

## Backstory

This is the second product server we have migrated to SQL 2016. The first migration had automation to a certain point.

1. Configure the servers using some dbatools commands
2. Take a full backup the day before the migration
3. Take and apply a differential backup the night of the migration

My comfort level with [dbatools](https://dbatools.io) last year when the migration was done was low, so the migration was a mix of TSQL and manual processes.

## Goal

The goal this time around was to enhance the process with more automation. With that in mind I decided to use the `Invoke-DbaDbLogShipping` command to build log shipping for the primary database that was part of the migration. The current size of the database is 650GB which is not too outrageous, but it has growth of 30GB a day and by Wednesday my differential backup would have been 90GB. So time to take the backup and restore the backup would have been time consuming during the migration window.

### Why Log Shipping?

The reason I decided to go with Log Shipping is the ease of setup, made even easier by the dbatools commands. Also, the **ability to minimize downtime** which I pointed out earlier, even for large databases.

Log shipping also supports **mixed versions** as far back as 2005 to current versions and **mixed editions** like Standard, Workgroup or Enterprise which other migration options lack. See this great article on using [Log Shipping](https://blogs.msdn.microsoft.com/sqlgardner/2011/09/16/minimizing-db-migration-downtime-using-log-shipping/) to minimize downtime for more detail.

## Migration Steps

So we used our standard build configuration process to get the servers configured to our standards. This process has not been converted to use dbatools like I had hoped, but time has been my enemy on that project. Currently we have 12, yes 12 environments for each of our products. That means this exercise is done 12 times before it is all said and done.

However, this time we did things a little different. Our development teams now follow the Agile life cycle and our development teams do two week sprints. For our first phase we migrated the primary Continuous Integration environment and the main Integration environment using the automated process. However, log shipping does not come in to play due to the size of these environments. So it gives us practice and testing of the migration process. Then on the next sprint we migrated the Regression and Production environments. This is where the fun starts.

Last week I decided to use `Invoke-DbaDbLogShipping` to get the production database built on the new server and keep it in sync with the current server.

## Steps To Build Log Shipping

1. To get the secondary going I restored the latest Full backup and left the database in NO RECOVERY
2. Then I ran the `Invoke-DbaDbLogShipping` command with the parameters that were needed for my environment
3. Once everything was in place I monitored the Backup, Copy and Restore SQL Agent Jobs

```powershell
# Restore Latest Full
$restoreDbaDatabaseSplat = @{
    SqlInstance = 'localhost\sql2017'
    DatabaseName = 'WideWorldImporters'
    Path = 'C:\SQLData\Backups\WideWorldImporters_201804011846.bak'
    NoRecovery = $true
    WithReplace = $true
}
Restore-DbaDatabase $restoreDbaDatabaseSplat


# Configure Log Shipping
$invokeDbaLogShippingSplat = @{
    SourceSqlInstance = 'localhost\sql2016'
    DestinationSqlInstance = 'localhost\sql2017'
    Database = 'WideWorldImporters'
    BackupNetworkPath = '\\LXDW17181\C$\SQLData\LSBackups'
    BackupLocalPath = 'C:\SQLData\LSBackups'
    BackupScheduleFrequencySubdayType = 'Minutes'
    BackupScheduleFrequencySubdayInterval = 5
    CopyDestinationFolder = 'C:\SQLData\LS'
    CopyScheduleFrequencySubdayType = 'Minutes'
    CopyScheduleFrequencySubdayInterval = 5
    RestoreScheduleFrequencySubdayType = 'Minutes'
    RestoreScheduleFrequencySubdayInterval = 5
    NoInitialization = $true
    NoRecovery = $true
    Force = $true
}
Invoke-DbaDbLogShipping @invokeDbaLogShippingSplat
```

Once all the jobs are verified to be working from the proper locations, you can see that the **Transaction Log Shipping Status** built in report shows that we are current on our log shipping.

## Migration Day

11:00 PM on Wednesday was go time.

1. Our product site was put in maintenance mode so no new traffic is coming in
2. My steps in preparation for the migration
3. Time to verify that the latest Log Backup was taken, Copied and Restored on the secondary
4. Now it is time to bring that secondary copy online

I did not use the command below, as I had not had time to do any testing. So I used TSQL, but after testing this now it would have been even easier. The `Invoke-DbaDbLogShipRecovery` sets the jobs to disabled and then brings the database online.

```powershell
# Recover Log Shipping
$invokeDbaLogShippingRecoverySplat = @{
    SqlInstance = 'localhost\sql2017'
    Database = 'WideWorldImporters'
    Force = $true
}
Invoke-DbaDbLogShipRecovery @invokeDbaLogShippingRecoverySplat
```

And just like that we are done. 17 total minutes of downtime for our product and we are back, with only replication and AG to be done after the fact.

<iframe width="560" height="315" src="https://www.youtube.com/embed/cWv6CFG9ud0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Alternative configurations

Considering the number of parameters available in `Invoke-DbaDbLogShipping`, there are a number of ways to setup Log Shipping. Here are a couple available configurations using the parameters `-UseExistingFullBackup` and `-GenerateFullBackup`. These help automate the initial backup/restore process.

### UseExistingFullBackup

If the database is not yet initialized on the secondary instance it can be done by selecting an existing full backup and restore it for you.

```powershell
$params = @{
    SourceSqlInstance = 'sql1'
    DestinationSqlInstance = 'sql2'
    Database = 'db1'
    UseExistingFullBackup = $true
    BackupNetworkPath = '\\sql1\logshipping'
    BackupLocalPath = 'D:\Data\logshipping'
    CompressBackup = $true
    Force = $true
}

Invoke-DbaDbLogShipping @params
```

### GenerateFullBackup

If database is not yet initialized on the secondary instance it can be also be done by telling the command to create a new backup and restore it for you.

```powershell
$params = @{
    SourceSqlInstance = 'sql1'
    DestinationSqlInstance = 'sql2'
    Database = 'db1'
    GenerateFullBackup = $true
    BackupNetworkPath = '\\sql1\logshipping'
    BackupLocalPath = 'D:\Data\logshipping'
    CompressBackup = $true
    Force = $true
}

Invoke-DbaDbLogShipping @params
```

### UseBackupFolder

Or, if you've already got all of your backups in a folder, you can also use that as well.

```powershell
$params = @{
    SourceSqlInstance = 'sql1'
    DestinationSqlInstance = 'sql2'
    Database = 'db1'
    UseBackupFolder = 'C:\SQL\Backup'
    BackupNetworkPath = '\\sql1\logshipping'
    BackupLocalPath = 'D:\Data\logshipping'
    CompressBackup = $true
    Force = $true
}

Invoke-DbaDbLogShipping @params
```

If you have any migration in your future, or want to learn more, please take a look at the Log Shipping commands that [dbatools](https://dbatools.io) has to offer. You can use the command help for more detail.

```powershell
Get-Help Invoke-DbaDbLogShipping -Detailed
Get-Help Invoke-DbaDbLogShipRecovery -Detailed
```

## Additional Information

Check out the multi part series on the Log Shipping commands by the author of most of these awesome commands Sander Stad ([b](https://www.sqlstad.nl/)|[t](https://twitter.com/SQLStad)).

- [Log Shipping with dbatools – Part 1](https://www.sqlstad.nl/powershell/log-shipping-with-dbatools-part-1-setup-log-shipping/)
- [Log Shipping with dbatools – Part 2](https://www.sqlstad.nl/powershell/log-shipping-with-dbatools-part-2-test-log-shipping-status/)
- [Log Shipping with dbatools – Part 3](https://www.sqlstad.nl/powershell/log-shipping-dbatools-part-3-get-log-shipping-errors/)
- [Log Shipping with dbatools – Part 4](https://www.sqlstad.nl/powershell/log-shipping-with-dbatools-part-4-recover-a-log-shipped-database/)

Thanks for reading,
Garry ([@gbargsley](https://twitter.com/gbargsley))
