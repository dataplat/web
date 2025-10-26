---
title: "simplifying snapshots"
date: 2018-06-25
author: "Chrissy LeMaire"
slug: "snapshots"
aliases:
  - /snapshots/
  - /snapshots/index.html
categories: [announcements]
tags: []
draft: false
---

I remember the first time I saw [database snapshots](https://www.red-gate.com/simple-talk/sql/database-administration/sql-server-2005-snapshots/), I was so excited. Then I right-clicked in SSMS and..

![](/wp-content/uploads/2018/05/rightclick.png)

No way to easily create a snapshot. So then I researched how to create one using T-SQL and I had to know the exact path. UGH.

```sql
CREATE DATABASE db1_snapshot_preupgrade ON (NAME = N'db1_snapshot_preupgrade_datafile',
FILENAME = N'M:\MSSQL14.MSSQLSERVER\MSSQL\DATA\db1_snapshot_preupgrade.ss')
AS SNAPSHOT OF db1
```

## intro to snapshots

Basically, database snapshots are similar to VM snapshots but for databases. If you update an application and its database, you can take a snapshot and if the upgrade goes poorly, you can *super quickly* restore the snapshot and even a multi-TB database can be restored in no time. Here's a more technical [definition from Microsoft](https://docs.microsoft.com/en-us/sql/relational-databases/databases/database-snapshots-sql-server).

> A database snapshot is a read-only, static view of a SQL Server database (the source database). The database snapshot is transactionally consistent with the source database as of the moment of the snapshot's creation. A database snapshot always resides on the same server instance as its source database. As the source database is updated, the database snapshot is updated. Therefore, the longer a database snapshot exists, the more likely it is to use up its available disk space.

I've never done this but my BFF and DBA Brandon swears by it. He noted that up until SQL Server 2016 SP1, snapshots were solely available in Enterprise Edition. With SQL Server 2016 SP1 and up, they are available in every edition, even Express!

### benefits

Benefits, as listed on [Microsoft's Snapshot page on docs](https://docs.microsoft.com/en-us/sql/relational-databases/databases/database-snapshots-sql-server?view=sql-server-2017#Benefits) are listed as follows:

- Snapshots can be used for reporting purposes
- Maintaining historical data for report generation
- Using a mirror database that you are maintaining for availability purposes to offload reporting
- Safeguarding data against administrative error
- Safeguarding data against user error
- Managing a test database

That last example is pretty cool and relatable. In a testing environment, snapshots can be useful when repeatedly running a test for the database to contain identical data at the start of each round of testing.

One thing Microsoft didn't emphasize as a bullet-point is how useful snapshots can be when upgrading an application. As mentioned above the upgrade goes poorly, it's fast and easy to revert.

## snapshot commands

One of our awesome devs, Simone Bizzoto, created a series of snapshot commands which make them way easier to work with. Like most other dbatools commands, these commands are flexible but require as little information as possible by default.

**Super important note:** these commands were recently renamed to align with our 1.0 convention. Please update to the latest version (0.9.359) or none of this will work as expected.

### New-DbaDbSnapshot

To create a new snapshot, you no longer need to know the path of the snapshot location (though we do support custom paths). You don't even need to specify a name! But you can, of course.

```powershell
# Here's how you create a snapshot for the HR and Accounting databases on server "sql2017"
New-DbaDbSnapshot -SqlInstance sql2017 -Database HR, Accounting

# Want it to be created in a specific path?
New-DbaDbSnapshot -SqlInstance sql2017 -Database HR, Accounting -Path S:\snaps

# Want to create snapshots on a bunch of different servers?
# You can pass -SqlInstance $servers or you can pipe from Out-GridView in PS v5.1 and below!
$servers | Get-DbaDatabase | Out-GridView -PassThru | New-DbaDbSnapshot
```

`<iframe width="560" height="315" src="https://www.youtube.com/embed/MEFFfEVsQPs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`

```powershell
# To specify the name of the resulting snapshot, you can use the -Snapshot parameter
New-DbaDbSnapshot -SqlInstance sql017 -Database HR -Snapshot MyCustomSnapNameforHRdb

# If you'd like to create a snapshot for a few databases, but not use the default names,
# you can use placeholders. As an example, the command below creates the following will
# create two snapshots: one named new_HR_snap and new_Accounting_snap.
New-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR, Accounting -NameSuffix 'new_{0}_snap'
```

### Get-DbaDbSnapshot

Now that you have a couple new snapshots, let's take a look at them.

```powershell
# Find snapshots by specifying their base database
Get-DbaDbSnapshot -SqlInstance sql2017 -Database HR, Accounting

# Or you can even pass in a few servers.
Get-DbaDbSnapshot -SqlInstance sql2017, sql2016, sql2014 -Database db1, db2, db3

# Or get a snapshot with a specific name
Get-DbaDbSnapshot -SqlInstance sql2017 -Snapshot HR_snap_20161201

# Want to see every snapshot across your entire estate? Just pipe in your server inventory,
# whether it be a string array, from AD or from Central Management Server
Get-DbaRegisteredServer -SqlInstance SQLCMS | Get-DbaDbSnapshot
```

![](/wp-content/uploads/2018/06/snap.png)

### Restore-DbaDbSnapshot

Something very important to note about snapshot restores: according to Microsoft, restoring/reverting a snapshot does not work in an offline or corrupted database. Ultimately, this means that snapshots are not a replacement for a solid backup/restore plan.

If you're wondering how long a snapshot will take to restore, the answer is "it depends." If you have very few page changes, it'll be very fast even on a multi-TB database. If you had GBs of changes since you took the snapshot, it'll take longer.

```powershell
# To restore the HR database using the latest snapshot available.
# By default, a prompt will appear to confirm the restore.
Restore-DbaDbSnapshot -SqlInstance sql2017 -Database HR

# To restore the HR_snap_20161201 snapshot and kill any active connections in the base database (HR)
Restore-DbaDbSnapshot -SqlInstance sql2017 -Snapshot HR_snap_20161201 -Force

# To select from a list of snapshots on sql2016, then restore them.
Get-DbaDbSnapshot -SqlInstance sql2016 | Out-GridView -Passthru | Restore-DbaDbSnapshot
```

### Remove-DbaDbSnapshot

When you're finished with a snapshot, you should remove it. Why? All changes to your database will take up hdd space both in the database *and* the snapshot. This means you could potentially run out of disk space and if you do, [your snapshots will become invalid](https://www.sqlskills.com/blogs/paul/database-snapshots-when-things-go-wrong/).

```powershell
# To remove database snapshots named HR_snap_20161201 and HR_snap_20161101
Remove-DbaDbSnapshot -SqlInstance sql2014 -Snapshot HR_snap_20161201, HR_snap_20161101

# To remove all database snapshots for HR and Accounting
Remove-DbaDbSnapshot -SqlInstance sql2014 -Database HR, Accounting

# To select from a list of snapshots on sql2016, then remove them using a pipe
Get-DbaDbSnapshot -SqlInstance sql2014 | Out-GridView -Passthru | Remove-DbaDbSnapshot

# To remove all snapshots in all databases on sql2014 and confirm for each
Remove-DbaDbSnapshot -SqlInstance sql2014 -AllSnapshots -Confirm
```

Note that these commands will *not* remove your base database! Also, if you try to pass in a regular database object, the command will tell you it's a real database and skip the drop 👍

## snapshots are 🔥

Hopefully, there will be a greater adoption of SQL Server snapshots both because their use has been simplified with PowerShell and because Microsoft has made this feature available in all editions of SQL Server 2016 SP1 and above.

Remember, though, that while snapshots are super useful, they are not a replacement for a solid backup/restore strategy.

\- Chrissy
