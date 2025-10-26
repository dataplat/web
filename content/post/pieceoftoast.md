---
title: "new release – pieceoftoast"
date: 2017-02-27
slug: "pieceoftoast"
aliases:
  - /pieceoftoast/
  - /pieceoftoast/index.html
categories: [announcements]
draft: false
---

In [this release](https://github.com/dataplat/dbatools/releases/tag/v0.8.930), we gained **22 new commands**, 7 new [contributors](https://github.com/dataplat/dbatools/graphs/contributors) to the [dbatools master repository](https://github.com/dataplat/dbatools) for a grand total of 46! We even added a couple new [Major Contributors](https://dbatools.io/team) to the team. Thanks to all who have joined in to make the awesomest toolset for SQL Server DBAs — we're now offering the community 154 quality commands!

## Updated Commands

We released the follow two commands in [snowball](https://dbatools.io/snowball) but wanted you to download the latest version of dbatools which includes some really awesome improvements to backup and restore.

- **[Restore-DbaDatabase](https://dbatools.io/Restore-DbaDatabase)**
  The restore command is now especially impressive – imagine being able to restore a whole instance of [Maintenance Solution](https://ola.hallengren.com/) backups with a single pipe like `Get-ChildItem \\nas\sql\sql2016 | Restore-DbaDatabase -SqlInstance localhost`. It's now totally possible!

  Want to be even more blown away? How about `Get-DbaDatabase -SqlInstance sql2005 -ExcludeSystemLoginsDb | Backup-DbaDatabase -BackupDirectory \\dc\sql\test | Restore-DbaDatabase -SqlServer sql2016\vnext`

  This makes it way easier to copy to an interim fileshare if needed ❤️

- **[Backup-DbaDatabase](https://dbatools.io/Backup-DbaDatabase)**
  In case you missed it, we released a really nice Backup-DbaDatabase command.

  And check out this demo video (includes blooper reel) and accompanying [demo code](https://gist.github.com/ctrlbold/23a65d21aa4e18ba7e386b9bb6450018).

<iframe width="560" height="315" src="https://www.youtube.com/embed/VnHQSJAkwqQ" frameborder="0" allowfullscreen></iframe>

## New Commands

In this release we have **22 new commands**, several bugs fixes and a bunch of improvements. Note that many of these commands were available in [snowball](https://dbatools.io/snowball) but they weren't officially released with a supporting webpage and additional testing.

### Execution Plans

- **[Get-DbaExecutionPlan](https://dbatools.io/Get-DbaExecutionPlan)**
  Gets execution plans and metadata – useful for piping to Export-DbaExecutionPlan.

- **[Export-DbaExecutionPlan](https://dbatools.io/Export-DbaExecutionPlan)**
  Exports execution plans to disk. Can pipe from Get-DbaExecutionPlan.

### Query Store

- **[Get-DbaDbQueryStoreOption](https://dbatools.io/Get-DbaDbQueryStoreOption)**
  Get the Query Store configuration for Query Store enabled databases. Retrieves and returns the Query Store configuration for every database that has the Query Store feature enabled.

- **[Set-DbaDbQueryStoreOption](https://dbatools.io/Set-DbaDbQueryStoreOption)**
  Configure Query Store settings for a specific or multiple databases.

- **[Copy-DbaDbQueryStoreOption](https://dbatools.io/Copy-DbaDbQueryStoreOption)**
  Copies the configuration of a Query Store enabled database and sets the copied configuration on other databases.

### Finding things

- **[Find-DbaCommand](https://dbatools.io/Find-DbaCommand)**
  Finds dbatools commands searching through the inline help text, building a consolidated json index and querying it because Get-Help is too slow.

- **[Find-DbaLoginInGroup](https://dbatools.io/Find-DbaLoginInGroup)**
  Finds Logins in Active Directory groups that have logins on the SQL Instance. Outputs all the active directory groups members for a server, or limits it to find a specific AD user in the groups.

- **[Find-DbaUserObject](https://dbatools.io/Find-DbaUserObject)**
  Have a developer, DBA or other employee leaving the company and need to know what they own? This command can help. It searches SQL Server to find user-owned objects (ie. not dbo or sa) or for any object owned by a specific user specified by the Pattern parameter.

### Protocol info

- **[Get-DbaClientProtocol](https://dbatools.io/Get-DbaClientProtocol)**
  Gets the SQL Server related client protocols on a computer.

- **[Get-DbaServerProtocol](https://dbatools.io/Get-DbaServerProtocol)**
  Gets the SQL Server related server protocols on a computer.

### Update tracking

We actually release to the gallery a little more often than we blog about. If you're using Windows 10, have access to the PowerShell Gallery (some corporate networks may not) and would like to be notified about updates, use Watch-DbaUpdate. It's super cute and tries not to be annoying.

It's also our mascot, Tron's, debut in the toolkit. You'll be seeing more of him around, including in an upcoming blog post.

- **[Watch-DbaUpdate](https://dbatools.io/Watch-DbaUpdate)**
  Just for fun – checks the PowerShell Gallery for updates to dbatools.

- **[Install-dbatoolsWatchUpdate](https://dbatools.io/Install-dbatoolsWatchUpdate)**
  Sets up a scheduled task that checks the PowerShell Gallery every 3 hours for updates to dbatools. Notifies once max per release.

- **[Uninstall-dbatoolsWatchUpdate](https://dbatools.io/Uninstall-dbatoolsWatchUpdate)**
  Removes the scheduled task that checks the PowerShell Gallery every 3 hours for updates to dbatools.

### Misc

- **[Clear-DbaConnectionPool](https://dbatools.io/Clear-DbaConnectionPool)**
  Clear all yo SQL connection pools. Simple but good for testing. After 1.0, I'd like to figure out a way to enumerate connections, that'd be cool!

- **[Get-DbaDatabase](https://dbatools.io/Get-DbaDatabase)**
  We'll be adding a bunch of SMO Get commands, this is the first of the batch. The Get-DbaDatabase command gets SQL database information for each database that is present in the target instance(s) of SQL Server. If the name of the database is provided, the command will return only the specific database information.

- **[Get-DbaPrivilege](https://dbatools.io/Get-DbaPrivilege)**
  Gets the users with local privileges 'Lock Pages in Memory', 'Instant File Initialization', 'Logon as Batch' on one or more computers. Requires Local Admin rights on destination computer(s).

- **[Get-DbaService](https://dbatools.io/Get-DbaService)**
  Gets the SQL Server related services on one or more computers.

- **[Measure-DbaBackupThroughput](https://dbatools.io/Measure-DbaBackupThroughput)**
  Uses backup history to determine how quickly SQL Server is backing up databases to media.

- **[New-DbaDirectory](https://dbatools.io/New-DbaDirectory)**
  Uses master.dbo.xp_create_subdir to create the path. Returns $true if the path can be created, $false otherwise.

### Internal configurations

We're gettin Enterprise up in here! Thanks to our newest Major Contributor [Friedrich Weinmann](http://allthingspowershell.blogspot.de/), we've now got a really cool configuration system. This will be helpful for our developers. We'll have more information in a blog post during the 1.0 redo, but here's a quick lil overview.

- **[Get-dbatoolsConfig](https://dbatools.io/Get-dbatoolsConfig)**
  Retrieves configuration elements by name. Can be used to search the existing configuration list.

- **[Get-dbatoolsConfigValue](https://dbatools.io/Get-dbatoolsConfigValue)**
  Returns the configuration value stored under the specified name. This command is usually only called by functions.

- **[Set-dbatoolsConfig](https://dbatools.io/Set-dbatoolsConfig)**
  This function creates or changes configuration values. These are used in a larger framework to provide dynamic configuration information outside the PowerShell variable system.

## Improvements & Notable bug fixes

The awesomest improvement is our full on Enterprise-lookin' logging implemented by Fred. We'll be writing some blog in-depth blog posts which discuss the logging system in depth, but for now, check out what happens when I open our logging directory using `Invoke-Item (Get-dbatoolsConfigValue -Name path.dbatoolslogpath)`

![Logging directory](https://dbatools.io/wp-content/uploads/2017/02/img_58b434b604eb5.png?w=800&ssl=1)

Whaat! Such good looking logging. Thank you Fred for all of your work on this!

As for other improvements and bug fixes, we'll be releasing our last few commands (until 1.0) on on Wednesday March, 1, so I'll cover other improvements more in-depth then. Writing the post for all these commands exhausted me 😅

## 1.0 Reminder

Just a reminder: on March 1, 2017, we will initiate a feature freeze. This means that we will no longer be accepting new commands or PRs for new features until we've fully implemented all changes that were decided upon for the 1.0 release.

A feature freeze is necessary because we invest time vetting each PR and in order to reach 1.0 in a timely manner, we need to focus on bug and style resolutions. We're asking anyone who can code to help fix the 43 [bugs](https://github.com/dataplat/dbatools/issues?q=is%3Aissue+is%3Aopen+label%3Abug) currently filed at GitHub and address the [style changes](https://dbatools.io/tstyle) that the community decided upon.

If you're available to help, we'd love it! Even if you don't know PowerShell, we'll need help updating the website with screenshots and examples with the updated parameters and command names, and other tasks of that nature. We will be working on the following:

- Bug fixes
- Standardized documentation
- Standardized names for parameters, commands, etc
- Standardized outputs
- Testing

We plan to resolve all bug issues first and will continue releasing on a regular basis until the style changes are implemented.

## New to dbatools?

Visit the [downloads page](https://dbatools.io/download) for information about how to download and install dbatools (it's 1 command).

## Join us!

Some of these commands are in their infancy. Want to help make them better? Come join the coding party! We're all hanging out on the [SQL Server Community Slack](https://dbatools.io/slack) in the #dbatools channel. There's almost 500 of us there now (but the conversation load is reasonable).

Thanks for reading 😄
- Chrissy
