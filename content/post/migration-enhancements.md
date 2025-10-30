---
title: "SQL Server Migration Enhancements"
date: 2018-09-24
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "migration-enhancements"
aliases:
  - /migration-enhancements/
  - /migration-enhancements/index.html
categories: []
tags: [migration, party]
draft: false
---

A while back, I added some new features to our migration commands but I forgot to blog about them. Then, I used one of the new features for a fast and successful migration, got so pumped and had to share.

## Multiple Destinations

Now, you can migrate from one server to many. This applies to both `Start-DbaMigration` and all of the `Copy-Dba*` commands, including [Copy-DbaDatabase](https://dbatools.io/Copy-DbaDatabase) and [Copy-DbaLogin](https://dbatools.io/Copy-DbaLogin).

![migration](/images/migration.gif)

As you may be able to see in the title bar of this [Out-GridView](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/out-gridview?view=powershell-5.1), I am migrating from **workstation**, which is a SQL Server 2008 instance, to **localhost\sql2016** and **localhost\sql2017**. My entire command is as follows:

```powershell
Start-DbaMigration -Source workstation -Destination localhost\sql2016, localhost\sql2017 -BackupRestore -UseLastBackup | Out-GridView
```

If you examine the results, you'll see it migrated sp_configure, then moved on to credentials - first for **localhost\sql2016** then **localhost\sql2017**. And continued on from there, migrating [central management server](https://dbatools.io/cms), database mail, server triggers and databases.

It migrates a bunch of other things too, of course. Haven't seen or performed a migration before? Check out this [50-second video](https://www.youtube.com/watch?v=hg8tovMRX2k) of a migration.

{{< youtube hg8tovMRX2k >}}

## -UseLastBackup

This one is awesome. Now, you can use your existing backups to perform a migration! Such a huge time saver. Imagine the following scenario:

> Dear DBA,
> Your mission, should you choose to accept it, is to migrate the SQL Server instance for a small SharePoint farm.
> You'll work with the SharePoint team and will have four hours to accomplish your portion of the migration.
> All combined, the databases are about 250 GB in size. Good luck, colleague!

A four hour outage window seems reasonable to me! Here is one way I could accomplish this task:

- Update the SQL Client Alias for the SharePoint Servers
- Shut down the SharePoint servers
- Execute my scheduled log backup job one final time
- Perform the migration using -UseLastBackup switch
- Boot up the SharePoint Servers
- Check that the sites work
- Party 🎉

I've actually done this a number of times, and even [made a video about it](https://www.youtube.com/watch?v=4XKw4xqpkFY) a couple years ago.

{{< youtube 4XKw4xqpkFY >}}

The outdated output is drastically different from today's output but the overall approach still applies. Note that back then, `-UseLastBackup` did not yet exist so in the video, it performs a backup and restore, not just a restore. I should make a new video.. one day!

So basically, this is the code I'd execute to migrate from spcluster to newcluster:

```powershell
# first, modify the alias then shut down the SharePoint servers
$spservers = "spweb1", "spweb2", "spapp1", "spapp2"
Remove-DbaClientAlias -ComputerName $spservers -Alias spsql1
New-DbaClientAlias -ComputerName $spservers -ServerName newcluster -Alias spsql1
Stop-Computer -ComputerName $spservers

# Once each of the servers were shut down, I'd begin my SQL Server migration.
Start-DbaMigration -Source spcluster -Destination newcluster -BackupRestore -UseLastBackup | Out-GridView

# Mission accomplished 🙅‍♀️🙅‍♂️
```

This would migrate all of my SQL Logins, with their passwords & SIDs, etc, jobs, linked servers, all that, then it'd build my last full, diff and log backups chain, and perform the restore to newcluster! Down. To. My. Last. Log. So awesome 😁👍

Thanks so much for that functionality [Stuart](https://stuart-moore.com/), Oleg and Simone!

## What About VLDBs?

For very large database migrations, we currently offer [log shipping](https://dbatools.io/logshipping). [Sander Stad](https://sqlstad.nl) made some cool enhancements to `Invoke-DbaDbLogShipping` and `Invoke-DbaDbLogShipRecovery` recently, too.

```powershell
# Also supports multiple destinations!
# Oh, and has a ton of params, so use a PowerShell splat
$params = @{
    Source = 'sql2008'
    Destination = 'sql2016', 'sql2017'
    Database = 'shipped'
    BackupNetworkPath= '\\backups\sql'
    PrimaryMonitorServer = 'sql2012'
    SecondaryMonitorServer = 'sql2012'
    BackupScheduleFrequencyType = 'Daily'
    BackupScheduleFrequencyInterval = 1
    CompressBackup = $true
    CopyScheduleFrequencyType = 'Daily'
    CopyScheduleFrequencyInterval = 1
    GenerateFullBackup = $true
    Force = $true
}

# pass the splat
Invoke-DbaDbLogShipping @params

# And now, failover to secondary
Invoke-DbaDbLogShipRecovery -SqlInstance localhost\sql2017 -Database shipped
```

Other migration options such as Classic Mirroring and Availability Groups are still on the agenda.

Happy migrating!

\- Chrissy
