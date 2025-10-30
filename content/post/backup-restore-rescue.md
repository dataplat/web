---
title: "dbatools to the backup/restore rescue"
date: 2016-12-13
lastmod: 2025-10-30
author: "Chrissy LeMaire"
slug: "backup-restore-rescue"
aliases:
  - /backup-restore-rescue/
  - /backup-restore-rescue/index.html
categories: [announcements]
tags: [backup, restore]
draft: false
---

[![TSQL2SDAY-150x150](/images/TSQL2SDAY-150x150.png)](https://sqlstudies.com/2016/12/06/4169/)

Today's blog post is part of [T-SQL Tuesday](https://sqlstudies.com/2016/12/06/4169/). T-SQL Tuesday is the brainchild of Adam Machanic. It is a monthly blog party on the second Tuesday of each month. Everyone is welcome to participate.

### intro

[dbatools](https://dbatools.io) has been around since 2014. At first, it started with one contributor and was solely dedicated to migrating SQL Server instances, but now it's grown into an awesome [open source DBA project](https://github.com/dataplat/dbatools) with over 30 contributors.

We have nearly 100 commands for you to enjoy and about 10 of them revolve around Backup and Restore. Even more are planned, as you can read in [Stuart Moore's](https://stuart-moore.com/) blog post titled [Easier SQL Server Restores using DBATools](https://stuart-moore.com/easier-sql-server-restores-dbatools/). Stuart is a long-established SQL/PowerShell powerhouse backup/restore and we're honored to have him on board.

### our backup/restore commands (present)

- [Get-DbaBackupHistory](https://dbatools.io/Get-DbaBackupHistory)
- [Get-DbaDatabaseSnapshot](https://dbatools.io/Get-DbaDatabaseSnapshot)
- [Get-DbaRestoreHistory](https://dbatools.io/Get-DbaRestoreHistory)
- [Get-DbaLastBackup](https://dbatools.io/Get-DbaLastBackup)
- [Read-DbaBackupHeader](https://dbatools.io/Read-DbaBackupHeader)
- [Remove-DbaBackup](https://dbatools.io/Remove-DbaBackup)
- [Remove-DbaDatabaseSnapshot](https://dbatools.io/Remove-DbaDatabaseSnapshot)
- Restore-SqlBackupFromDirectory\*
- [Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup)
- [Test-DbaFullRecoveryModel](https://dbatools.io/Test-DbaFullRecoveryModel)

Want to know more about our snapshot commands? Check out team member Constantine Kokkinos' blog post "T-SQL Tuesday 85: Managing database snapshots with dbatools". A snapshot may not exactly be a backup/restore but its spirit is, fa sho.

[![histories](/images/histories-1024x263.png)](/images/histories-1024x263.png)

Restore-SqlBackupFromDirectory is super useful in a pinch, too, but it's not quite fleshed out to our standards, so it doesn't have a corresponding webpage. We expect this will be renamed by the next release.

### our backup/restore commands (soon)

- Restore-DbaBackup
- Restore-DbaSnapshot
- New-DbaSnapshot
- Test-DbaBackup
- ???

Coming up, we're going to have a fully featured Restore-DbaBackup command that can easily restore a single file, to a point in time, from a [Ola Hallengren](https://ola.hallengren.com) styled directory structure or a formatted hashtable (like the one I'll pass to process my Test-DbaLastBackup command).

We're eager to keep going. Have any ideas? Let us know by [filing an issue](https://github.com/dataplat/dbatools/issues) or [joining our Slack Channel on the SQL Community Slack](https://sqlps.io/slack) and telling us what you need.

### my favorite backup/restore command

I love this entire toolset but damn, I've been needing a command like **Test-DbaLastBackup** for a long time. Testing backups can be such a pain, but PowerShell can make it easy for your entire estate. Not just one SQL instance where you've got some specific stored procedure installed, but all of your SQL servers -- from one workstation!

I created Test-DbaLastBackup because I wanted to test all of my backups and using PowerShell was the easiest way to do it. It parses Get-DbaBackupHistory for the last full backup, restores it, runs a DBCC CHECKTABLE and then drops the test database.

Here's a test I did on my SQL Server 2016 instance. I ran Ola Hallengren's Full backups for both system and user, then executed **Test-DbaLastBackup -SqlServer sql2016**. Simple AF!

<iframe width="560" height="315" src="https://www.youtube.com/embed/50xEuEZr6as" frameborder="0" allowfullscreen></iframe>

The command's webpage is at **[dbatools.io/Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup)**. Pretty easy, eh? That goes for every command we have, too. Just dbatools.io + /The-CommandName.

Back to the command, Test-DbaLastBackup. It:

- Restores the test databases (named dbatools-testrestore-$dbname by default) to the specified -SqlServer unless you specify a -Destination.
- Then it'll restore to the Destination (if remote, so long as the backups are on a shared directory -- which mine always are).
- You can even specify a MaxMB if you don't have space for super large database restores (in that case, the -VerifyOnly switch could come in handy).
- Want your Data and Log files to go somewhere other than default? Use the -DataDirectory and -LogDirectory params.

This command is only in its infancy, too! Next up, team member Christian Solje will be adding additional features like Point in Time restore.

### get-help

Need to know more about our commands? In every release, we require some basic docs so just run **Get-Help Test-DbaLastBackup -Detailed** and you'll be greeted with Examples, docs for each parameter, a synopsis a description and other useful stuff.

### download

Intrigued and haven't installed dbatools yet? Hit up our [Downloads page](https://dbatools.io/download) to see how to install it on your system.

### youtube and community

We have a [YouTube channel](https://dbatools.io/youtube) if you want to watch some videos. That's the YouTube channel for the SQL Community Collaborative where you can watch videos about open source, (mostly) SQL PowerShell projects like dbareports and, of course, [dbatools.io](https://dbatools.io).

We are also on [Bluesky](https://bsky.app/profile/dbatools.io) as @dbatools.io.

### one more thing

If you think we've done something that sucks, let us know, either on [GitHub](https://github.com/dataplat/dbatools/issues) or [Slack](https://sqlps.io/slack). We welcome and even enjoy alternative approaches and civilized debate about processes. Or hey, if you love something we've done, feel free to drop by the Slack channel too.

We like to **release early, release often** which means that we're nimble and responsive to changes and requests. (It also means that, while we are at v0.8.69, version 1.0 which is due in Summer 2017 will likely introduce breaking - but beautiful - changes. This is thanks to our Style Shepherd Klaas Vandenberghe.)

### in conclusion

We're a bunch of DBA's who, like you, want to have an even easier time managing SQL Server. dbatools uses PowerShell to help do exactly that. Want to join the fun? We're an inclusive group -- even if you don't know PowerShell, we'll help you. Even if you don't know Git, we've got you covered. Come with your experience, your scholarly background or your enthusiasm and passion. We'd love to [hear from you](https://sqlps.io/slack).

Thanks for reading. I'm looking forward to the next T-SQL Tuesday!
