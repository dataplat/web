---
title: "New Release - Mr. Meeseeks"
date: 2016-11-02
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "new-release-mrmeeseeks"
aliases:
  - /new-release-mrmeeseeks/
  - /new-release-mrmeeseeks/index.html
categories: [announcements]
tags: []
draft: false
---

In [this month's release](https://github.com/dataplat/dbatools/releases/tag/v0.8.61), we gained 6 new contributors to the [dbatools master repository](https://github.com/dataplat/dbatools) for a grand total of of 26! This was likely the result of moving the repository to the new organization on GitHub called the [SQL Server Community Collaborative](https://github.com/dataplat), which makes it easier to participate in the dbatools project.

We also added a few pages to the dbatools GitHub Wiki including: [Your First Pull Request](https://github.com/dataplat/dbatools/wiki/Your-First-Pull-Request), [Style Guide](https://github.com/dataplat/dbatools/wiki/Style-Guide) and [Testing and Q&A](https://github.com/dataplat/dbatools/wiki/Testing-&-QA).

## Commands

We fixed 15 bugs and added 9 new commands including one that migrates SQL Server Integration Services!

- **[Copy-DbaSsisCatalog](https://dbatools.io/Copy-DbaSsisCatalog)**

  This command migrates Folders, SSIS projects, and environments from one SQL Server to another.

  By default, all folders, projects, and environments are copied. The Project parameter can be specified to copy only one project, if desired.

  The parameters get more granular from the Folder level  i.e. specifying folder will only deploy projects/environments from within that folder.

  We're working towards this command being a wrapper for other new commands including Copy-SqlSsisFolder, Copy-SqlSsisProject and Copy-SqlSsisEnvironment.

- **[Find-DbaOrphanedFile](https://dbatools.io/Find-DbaOrphanedFile)**

  This command searches all directories associated with SQL database files for database files that are not currently in use by the SQL Server instance.

  By default, it looks for orphaned .mdf, .ldf and .ndf files in the root\data directory, the default data path, the default log path, the system paths and any directory in use by any attached directory.

- **[Get-DbaAvailabilityGroup](https://dbatools.io/Get-DbaAvailabilityGroup)**

  By default outputs a small set of information around the Availability Group found on the server.

- **[Get-DbaLastGoodCheckDb](https://dbatools.io/Get-DbaLastGoodCheckDb)**

  This command retrieves and compares the date/time for the last known good DBCC CHECKDB, as well as the creation date/time for the database.

- **[Get-DbaProcess](https://dbatools.io/Get-DbaProcess)**

  This command displays processes associated with a spid, login, host, program or database.

- **[Get-DbaRunningJob](https://dbatools.io/Get-DbaRunningJob)**

  This function returns agent jobs that active on the SQL Server intance when calling the command. The information is gathered the SMO JobServer.jobs and be returned either in detailed or standard format.

- **[Set-DbaMaxDop](https://dbatools.io/Set-DbaMaxDop)**

  This command will help you set MaxDop configuration according to Microsoft recommendations.

- **[Test-DbaDbRecoveryModel](https://dbatools.io/Test-DbaDbRecoveryModel)**

  When you switch a database into FULL recovery model, it will behave like a SIMPLE recovery model until a full backup is taken in order to begin a log backup chain. This command, inspired by [Paul Randal's post](https://www.sqlskills.com/blogs/paul/new-script-is-that-database-really-in-the-full-recovery-mode/), will let you easily see if a database is in the 'pseudo-Simple' recovery model.

- **[Test-DbaMaxDop](https://dbatools.io/Test-DbaMaxDop)**

  Inspired by Sakthivel Chidambaram's post about [SQL Server MAXDOP Calculator](https://learn.microsoft.com/en-us/archive/blogs/sqlsakthi/wow-we-have-maxdop-calculator-for-sql-server-it-makes-my-job-easier), this command displays a SQL Server's current configuration and calculated recommendation.

  These are just general recommendations for SQL Server and are a good starting point for setting the "max degree of parallelism" option.

## Next Batch

Some commands almost made it to this release, but didn't.

- **Rename-DbaDatabase**

  Renames not just the database but the underlying files.

- **Get-DbaBackupThroughput**

  Gets the minimum, maximum and average throughput in Mb/sec for all or one database on a server for all time or filter by month, day or year.

- **Copy-SqlMaintenancePlan**

  This is already a pull request in the development repository! Just a bit more development is needed.

- **Move-DbaDatabaseFile**

  So close!

- **Remove-SqlBackupFromDisk**

  T-SQL based maintenance plans can't safely access Windows file system to determine if a file has been properly archived. PowerShell makes it easy. This command will make it easier to clean up old, archived (and unarchived) backups.

Want to see more or work on a command yourself? We have approved command ideas on [the dbatools Trello board](https://dbatools.io/trello). This board shows you what we're working on and what we're talking about. We'd love if you'd join us.

## Join Us!

Some of these commands are in their infancy. Want to help make them better? Come join the coding party! We're all hanging out on the [SQL Server Community Slack](https://dbatools.io/slack) in the #dbatools channel.
