---
title: "New Release - Twentyfiveschmeckles"
date: 2017-02-01
lastmod: 2025-10-30
author: "Chrissy LeMaire"
slug: "twentyfiveschmeckles"
aliases:
  - /twentyfiveschmeckles/
  - /twentyfiveschmeckles/index.html
categories: [announcements]
tags: []
draft: false
---

In this release, we gained 4 new [contributors](https://github.com/dataplat/dbatools/graphs/contributors) to the [dbatools master repository](https://github.com/dataplat/dbatools) for a grand total of of 39! We even added 4 new [Major Contributors](https://dbatools.io/team) to the team. Thanks to all who have joined in to make the awesomest toolset for SQL Server DBAs — we're now offering the community 126 quality commands.

## Sorry for the Delay, We've Been Really Busy!

Our last release came out around mid-December. Ideally, we aim for releasing more often, but [Rob](https://blog.robsewell.com/) and I were out presenting about dbatools and [dbareports](https://dbareports.io) at a few conferences and ran out of time. We did merge a mini-release (v0.8.693) to master in early January, though. So that kinda counts 😉

The rest of the team has been super busy, too, as you can see by all of the new commands, enhancements and fixes. Now we've had time to compile the documentation and screenshots, so here is the release in all of its amazing glory.

## New Commands

In this release we have **22 new commands**, several bugs fixes and a bunch of improvements on the existing commands. There are so many exciting commands in this release, it's hard to even highlight the top 22 best(har har). Let us know your favorites at [bsky.app/profile/dbatools.io](https://bsky.app/profile/dbatools.io)! We're really curious.

- **[Export-DbaUser](https://dbatools.io/Export-DbaUser)**
  Exports SQL Server Database Users creation script with all database permissions (database and object level) to a T-SQL file. This is a function that is not available in SQL Server Management Studio.

- **[Find-DbaAgentJob](https://dbatools.io/Find-DbaAgentJob)**
  Finds agent job(s) that fit certain search criteria.

- **[Find-DbaDatabase](https://dbatools.io/Find-DbaDatabase)**
  Search SQL Server instances for database that have either the same name, owner or service broker guid.

- **[Find-DbaStoredProcedure](https://dbatools.io/Find-DbaStoredProcedure)**
  Returns all stored procedures that contain a specific string or regex pattern.

- **[Get-DbaAgentAlert](https://dbatools.io/Get-DbaAgentAlert)**
  Return all SQL Agent alerts on a SQL Server Agent.

- **[Get-DbaAgentOperator](https://dbatools.io/Get-DbaAgentOperator)**
  Returns all SQL Agent operators on a SQL Server Agent.

- **[Get-DbaDbState](https://dbatools.io/Get-DbaDbState)**
  Gets some common "states" on databases like Read-Write (READ_ONLY or READ_WRITE), Status (ONLINE, OFFLINE, EMERGENCY) and Access options (SINGLE_USER, RESTRICTED_USER, MULTI_USER)

- **[Get-DbaHelpIndex](https://dbatools.io/Get-DbaHelpIndex)**
  This function will return detailed information on indexes (and optionally statistics) for all indexes in a database, or a given index should one be passed along.

- **[Get-DbaMemoryUsage](https://dbatools.io/Get-DbaMemoryUsage)**
  Get amount of memory in use by all SQL Server components and instances. SSAS and SSIS are included.

- **[Get-DbaMsdtc](https://dbatools.io/Get-DbaMsdtc)**
  Displays information about the Distributed Transaction Coordinator (MSDTC) on a server.

- **[Get-DbaPageFileSetting](https://dbatools.io/Get-DbaPageFileSetting)**
  Returns detailed information about the Windows page file.

- **[Get-DbaTrigger](https://dbatools.io/Get-DbaTrigger)**
  Get all existing triggers at instance and database level.

- **[Get-DbaUptime](https://dbatools.io/Get-DbaUptime)**
  Returns the uptime of the SQL Server instance. If you want you can get the value for the hosting windows server too.

- **[Get-DbaXEventsSession](https://dbatools.io/Get-DbaXEventsSession)**
  Retrieves a list of Extended Events Sessions.

- **[Invoke-DbaQuery](https://dbatools.io/Invoke-DbaQuery)**
  Invoke-SqlCmd2, a community favorite, has also been added to dbatools! Updates will continue to occur in the [Invoke-SqlCmd2 repository](https://github.com/dataplat/Invoke-SqlCmd2) and we'll just add the updates with each release

  Invoke-DbaQuery runs a T-SQL script. But only captures the first selected result set, such as the output of PRINT statements when -verbose parameter is specified. A big plus when comparing with native Invoke-Sqlcmd cmdlet is that this one supports parameterized queries.

- **[New-DbaDbSnapshot](https://dbatools.io/New-DbaDbSnapshot)**
  Do you need to create a database snapshot? This command will do it without hassles.

- **[ConvertTo-DbaDataTable](https://dbatools.io/ConvertTo-DbaDataTable)**
  Will creates a DataTable based on an objects properties.
  This allows you to easily write to SQL Server tables.

- **[Rename-DbaLogin](https://dbatools.io/Rename-DbaLogin)**
  It can be a pain to update all of the mappings for a specific user when you rename a SQL login this does it for you, will rename login and database mapping for a specified login.

- **[Restore-DbaFromDatabaseSnapshot](https://dbatools.io/Restore-DbaFromDatabaseSnapshot)**
  Restores the database from the snapshot, discarding every modification made to the database.

- **[Set-DbaDbState](https://dbatools.io/Set-DbaDbState)**
  Want to change a database state? With this command you can chose between ReadOnly, ReadWrite, Online, Offline, Emergency, plus a special "Detached", SingleUser, RestrictedUser, MultiUser.

- **[Test-DbaOptimizeForAdHoc](https://dbatools.io/Test-DbaOptimizeForAdHoc)**
  Displays information relating to SQL Server Optimize for AdHoc Workloads setting.

- **[Write-DbaDataTable](https://dbatools.io/Write-DbaDataTable)**
  Quickly and efficiently writes data to a SQL Server Table using a .NET DataTable to a SQL Server table using SQL Bulk Copy.

## Improvements

- **[Test-DbaMigrationConstraint](https://dbatools.io/Test-DbaMigrationConstraint)**
  Added support for SQL Server 2016 SP1 outstanding news! Almost all editions support what was, until now, Enterprise-only features. ([#512](https://github.com/dataplat/dbatools/pull/512))

- **[Get-SqlServerKey](https://dbatools.io/Get-SqlServerKey)**
  Added support for SQL Server 2016 ([#610](https://github.com/dataplat/dbatools/pull/610))

- **[Copy-DbaLogin](https://dbatools.io/Copy-DbaLogin)**
  If you try to transfer a local account (non-domain) you get a "Skipped", because is a local machine account. ([#275](https://github.com/dataplat/dbatools/issues/275))

## Notable Bug Fixes

- **[Copy-DbaDatabase](https://dbatools.io/Copy-DbaDatabase)**
  Fixed an issue where -WithReplace was not working properly ([#601](https://github.com/dataplat/dbatools/issues/601))

- **[Expand-DbaDbLogFile](https://dbatools.io/Expand-DbaDbLogFile)**
  Fixed an issue where Expand-DbaDbLogFile grew TLog all at once. ([#503](https://github.com/dataplat/dbatools/issues/503))

- **[Remove-DbaDbOrphanUser](https://dbatools.io/Remove-DbaDbOrphanUser)**
  Fixed an issue where Remove-DbaDbOrphanUser fails when the user was the owner of one or more schemas. ([#296](https://github.com/dataplat/dbatools/issues/296))

- **[Remove-DbaDatabaseSafely](https://dbatools.io/Remove-DbaDatabaseSafely)**
  Remove-DbaDatabaseSafely failed to perform final drop w/ no additional information. ([#238](https://github.com/dataplat/dbatools/issues/238))

## How's 1.0 Coming Along?

Very well! We're working through the style guide right now and have been decisive and moving forward quickly. The feature code freeze is still planned for the end of February then we'll begin working on:

- Bug fixes
- Standardized documentation
- Standardized names for parameters, commands, etc
- Standardized outputs
- Testing

We plan to resolve all bug issues first and will continue releasing on a regular basis until the style changes are implemented. If you're available to help, we'd love it! Even if you don't know PowerShell, we'll need help updating the website with screenshots and examples with the updated parameters and command names, and other tasks of that nature.

## AppVeyor, Pester and Testing

Rob Sewell of [dbareports.io](https://dbareports.io) fame spent even more time adding Pester testing and enforced testing for each commit using [AppVeyor](http://appveyor.com). This helps us release more often and with higher quality.

Want to help create tests? We're in desperate need of testers and Pester fans. Or, if you want to learn Pester, this is a great opportunity. Both dbatools and dbareports are in need. Thanks so much to Iraklis Evangelinos for the tests he contributed in this release.

## New to dbatools?

Visit the [installation page](https://dbatools.io/install) for information about how to download and install dbatools (it's 1 command).

## Join Us!

Some of these commands are in their infancy. Want to help make them better? Come join the coding party! We're all hanging out on the [SQL Server Community Slack](https://dbatools.io/slack) in the #dbatools channel. There's like 430 of us there now.

Thanks for reading 😀
- Chrissy
