---
title: "Another Batch of New Commands Now Available!"
date: 2016-08-17
author: "Chrissy LeMaire"
slug: "new-batch-of-commands"
aliases:
  - /new-batch-of-commands/
  - /new-batch-of-commands/index.html
categories: [announcements]
tags: [migration]
draft: false
---

dbatools is not only intended to be a great migration tool, but also a toolset to help DBAs follow best practices. Check out all the new commands in this batch, courtesy of [Mike Fal](https://twitter.com/mike_fal), [Constantine Kokkinos](https://twitter.com/mobileck) and [Chrissy LeMaire](https://twitter.com/cl).

## Best Practices Commands

Ever read a really great article about how to do something properly but then kinda forgot and you have to revisit each time? Well, we've codified some of those practices for you, making them easy to both follow and remember.

* **[Test-DbaDbOwner](https://dbatools.io/Test-DbaDbOwner) and [Set-DbaDbOwner](https://dbatools.io/Set-DbaDbOwner)**
Database ownership is complicated, but many SQL Server experts suggest using one specific account, be it [sa](http://weblogs.sqlteam.com/dang/archive/2008/01/13/Database-Owner-Troubles.aspx) or an alternative account that your organization has decided on. These commands, created by [Mike Fal](http://www.mikefal.net), validate or set ownership on all databases on an instance to a SQL login you specify, or the default of sa.

* **[Test-DbaDiskAlignment](https://dbatools.io/Test-DbaDiskAlignment)**
This command, created by [Constantine Kokkinos](http://constantinekokkinos.com), evaluates a servers disk setup to see if it aligns with the Disk Partition Alignment Best Practices [recommended by Microsoft](https://technet.microsoft.com/en-us/library/dd758814(v=sql.100).aspx). Disk Alignment is a very complicated subject, but we did our best to make it easy to evaluate your environment.

* **[Test-DbaDiskAllocation](https://dbatools.io/Test-DbaDiskAllocation)**
This command helps DBAs check all disks on a computer to see if they are [formatted to 64k](https://technet.microsoft.com/en-us/library/dd758814(v=sql.100).aspx). It also reports if a disk has SQL Server data on it or not.

* **[Test-DbaAgentJobOwner](https://dbatools.io/Test-DbaAgentJobOwner) and [Set-DbaAgentJobOwner](https://dbatools.io/Set-DbaAgentJobOwner)**
These commands, created by [Mike Fal](http://www.mikefal.net), will check and set all SQL Agent Job on an instance against a SQL login to validate if that login owns those SQL Agent Jobs or not. By default, [the function will check against 'sa' for ownership](http://sqlmag.com/blog/sql-server-tip-assign-ownership-jobs-sysadmin-account), but the user can pass a specific login if they use something else. For the Test command, only jobs that fail the test will be returned.

* **[Test-DbaPowerPlan](https://dbatools.io/Test-DbaPowerPlan) and [Set-DbaPowerPlan](https://dbatools.io/Set-DbaPowerPlan)**
These commands Test and Set the SQL Server OS's Power Plan. It defaults to [High Performance](https://support.microsoft.com/en-us/kb/2207548) which is [Best Practice](http://www.sqlskills.com/blogs/glenn/windows-power-plan-effects-on-newer-intel-processors/).

* **[Measure-DbaDbVirtualLogFile](https://dbatools.io/Measure-DbaDbVirtualLogFile)**
This command returns database virtual log file information for database files on a SQL instance. As you may already know, having a TLog file with too many VLFs [can hurt database performance](http://blogs.msdn.com/b/saponsqlserver/archive/2012/02/22/too-many-virtual-log-files-vlfs-can-cause-slow-database-recovery.aspx). This command helps you easily see the VLF counts for all your databases, or just specific ones.

## Commands That Make Your Life Easier

* **[Get-DbaClusterActiveNode](https://dbatools.io/Get-DbaClusterActiveNode)**
Returns the active node(s) of a SQL Cluster

* **[Get-DbaDbSpace](https://dbatools.io/Get-DbaDbSpace)**
These commands, created by [Mike Fal](http://www.mikefal.net), get information about space available inside the database.

* **[Install-SqlSpWhoIsActive](https://dbatools.io/Install-SqlSpWhoIsActive) and [Update-SqlSpWhoIsActive](https://dbatools.io/Update-SqlSpWhoIsActive)**
Install and update [Adam Machanic's sp_whoisactive](http://sqlblog.com/blogs/adam_machanic/archive/2012/03/22/released-who-is-active-v11-11.aspx) with ease using these commands. The latest version of sp_whoisactive is automatically downloaded from Adam's site and installed. Update-SqlSpWhoIsActive is actually an alias for Install-SqlSpWhoIsActive since Adam's install routine handles updates.

## Commands That Are Coming Soon

And we've got more planned!

* Copy-SqlMaintenancePlan
Maintenance plan support isn't provided by dbatools at this time, but that's soon going to change once this command is complete.

* Disable-DbaLogonTrigger
Like [Reset-DbaAdmin](https://dbatools.io/Reset-DbaAdmin), this is a command that won't be used often, but when it is, its a lifesaver.

* Find-DbaSqlInstance
This one's gonna be fun. Scan your subnet, AD or specific servers for SQL Server instances.

* Move-DbaDatabaseFile
We wanted to ensure this command is as fail-proof and useful as possible. It's been tough getting progress bars to work, but we're getting there! This command should be available in our next batch.

* Restore-DbaBackupFromDirectory
Routine to restore databases from directories (think the way that Ola Hallengren's outputs his by default)

* Remove-DbaBackupFromDisk
Routine to remove SQL backups from disk. If you copy your backups to tape or use a third-party solution, this command will ensure that no backups are deleted until they've been marked as archived.

* Test-DbaBackup
Routine to test your backups

* Write-SqlSpWhoIsActive
Write the results of Show-SqlSpWhoIsActive to table!

## Join Us!

Some of these commands are in their infancy. Want to help make them better? Come join the coding party! We're all hanging out on the [SQL Server Community Slack](https://dbatools.io/slack) in the #dbatools channel.
