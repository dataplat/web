---
title: "New Best Practices Commands Now Available"
date: 2016-07-20
author: "Chrissy LeMaire"
slug: "new-best-practices-commands-now-available"
aliases:
  - /new-best-practices-commands-now-available/
  - /new-best-practices-commands-now-available/index.html
categories: [announcements]
tags: [migration]
draft: false
---

So many SQL Server and PowerShell pros have joined the dbatools team and we're producing well designed PowerShell commands like mad!

dbatools is not only intended to be a great migration tool, but also a toolset to help DBAs follow best practices. We like to think of these commands as **fully automated Wizards** that are executed from the command line instead of the GUI.

## Best Practices Commands

Ever read a really great article about how to do something properly but then kinda forgot and you have to revisit each time? Well, we've codified some those practices for you, making them easy to both follow and remember.

- **[Expand-DbaDbLogFile](https://dbatools.io/Expand-DbaDbLogFile)**
  This command, created by [Cláudio Silva](https://twitter.com/ClaudioESSilva) helps DBAs automate Virtual Log File (VLF) management. Claudio covers this command in depth in a [guest post on my blog](https://blog.netnerds.net/2016/07/guest-blogger-claudio-silva-why-Expand-DbaDbLogFile/).

- **[Find-DbaDbDuplicateIndex](https://dbatools.io/Find-DbaDbDuplicateIndex)**
  This command, also created by [Cláudio Silva](https://dbatools.io/) helps DBAs find duplicate indexes which may be slowing your queries down and taking up unnecessary disk space.

- **[Remove-DbaDatabaseSafely](https://dbatools.io/Remove-DbaDatabaseSafely)**
  This command, created by [Rob Sewell](https://sqldbawithabeard.com/), safely removes a SQL Database and creates an Agent Job to restore it. By default it:

  1. Performs a DBCC CHECKDB
  2. Backs up the database WITH CHECKSUM
  3. Restores with VERIFY ONLY on the source
  4. Creates and Agent job to easily restore from that backup
  5. Drops the database
  6. The Agent Job restores the database
  7. Performs a DBCC CHECKDB and drops the database for a final time

  Simply amazing! You can read more about [Remove-DbaDatabaseSafely](http://sqldbawithabeard.com/2016/07/20/Remove-DbaDatabaseSafely-my-first-contribution-to-dbatools/) on Rob's blog.

- **[Set-DbaTempdbConfig](https://dbatools.io/Set-DbaTempdbConfig)**
  These commands, created by [Mike Fal](http://www.mikefal.net), sets tempdb data and log files according to best practice calcluations. Mike writes more about this function [on his blog](http://www.mikefal.net).

- **[Find-DbaDbUnusedIndex](https://dbatools.io/Find-DbaDbUnusedIndex)**
  This command, created by [Aaron Nelson](http://sqlvariant.com), will help you to find unused indexes on a database or a list of databases. It also tells how much space you can save by dropping the index. For now only supported for CLUSTERED and NONCLUSTERED indexes.

## Commands That Make Your Life Easier

- **[Invoke-DbaWhoIsActive](https://dbatools.io/Invoke-DbaWhoIsActive)**
  We wrote a PowerShell command to output results of [Adam Machanic's](http://sqlblog.com/blogs/adam_machanic/) beloved [sp_WhoIsActive](http://sqlblog.com/blogs/adam_machanic/archive/tags/who+is+active/default.aspx) to a GridView (default) or DataTable. If sp_WhoIsActive is not installed in the system, it will be downloaded and installed to a database you specify with either -Database or a database you select from Show-DbaDbList.

  This is v0.1 of Invoke-DbaWhoIsActive. We'll be working on formatting options and auto-population soon.

- **[Repair-DbaDbOrphanUser](https://dbatools.io/Repair-DbaDbOrphanUser)**
  This command, created by [Cláudio Silva](https://dbatools.io/), helps DBAs find and repairs orphaned users in one, multiple or all databases.

- **[Remove-DbaDbOrphanUser](https://dbatools.io/Remove-DbaDbOrphanUser)**
  Another homerun written by [Cláudio Silva](https://dbatools.io/), which removes orphaned database users with no matching logins.

- **[Get-DbaDiskSpace](https://dbatools.io/Get-DbaDiskSpace)**
  Displays Disk information for all local drives on one or more servers. Returns server name, name of disk, label of disk, total size, free size and percent free. Considering a new column in the future that designates if any SQL data/log files are stored on the returned disks. What do you think?

- **[Get-DbaRegServer](https://dbatools.io/Get-DbaRegServer)**
  Gets list of SQL Server names stored in SQL Server Central Management Server. Filtering by one or more server groups supported.

- **[Show-SqlServerFileSystem](https://dbatools.io/Show-SqlServerFileSystem)**
  Similar to the remote file system popup you see when browsing a remote SQL Server in SQL Server Management Studio, this command allows you to traverse the remote SQL Server's file structure.

  Show-SqlServerFileSystem uses SQL Management Objects to browse the directories and what you see is limited to the permissions of the account running the command. This will complement the upcoming Move-SqlDatabaseFile command.

![wpf](/images/wpf-1.png)

- **[Show-DbaDbList](https://dbatools.io/Show-DbaDbList)**
  Shows a list of databases in a GUI. Returns a simple string. Hitting cancel returns null.

![dblist](/images/dblist.png)

## Test Commands

- **[Test-DbaTempdbConfig](https://dbatools.io/Test-DbaTempdbConfig)**
  Test Your TempDb Configuration

- **[Test-DbaNetworkLatency](https://dbatools.io/Test-DbaNetworkLatency)**
  This function is intended to help measure SQL Server network latency by establishing a connection and making a simple query. This is a better alternative than ping because it actually creates the connection to the SQL Server, and times not only the entire routine, but also how long the actual queries take vs how long it takes to get the results.

- **[Test-DbaPath](https://dbatools.io/Test-DbaPath)**
  Use this command to determine whether the SQL Server service account can "see" a directory. This command uses master.dbo.xp_fileexist under the hood and returns $true or $false.

- **[Test-DbaMigrationConstraint](https://dbatools.io/Test-DbaMigrationConstraint)**
  Shows if you can migrate the database(s) between the servers. When you want to migrate from a higher edition to a lower one there are some features that can't be used. This function will validate if you have any of this features in use and will report to you. The validation will be made ONLY on on SQL Server 2008 or higher using the 'sys.dm_db_persisted_sku_features' DMV.

## Join Us!

Some of these commands are in their infancy. Want to help make them better? Come join the coding party! We're all hanging out on the [SQL Server Community Slack](https://dbatools.io/slack) in the #dbatools channel.
