---
title: "Breaking Changes Update"
date: 2018-11-16
author: "Chrissy LeMaire"
slug: "breaking-changes-update"
aliases:
  - /breaking-changes-update/
  - /breaking-changes-update/index.html
categories: [announcements]
tags: []
draft: false
---

Before I go into the breaking changes introduced in **0.9.518**, I wanted to highlight `Invoke-dbatoolsRenameHelper` which is an awesome command that will help you with a vast majority of our renames. Using it is as simple as:

`Get-ChildItem *.ps1 -Recurse | Invoke-dbatoolsRenameHelper`

This command even takes care of a couple parameter renames like NetworkShare and UseLastBackups.

![image](https://user-images.githubusercontent.com/8278033/48633808-67416180-e9c4-11e8-8e8b-0539663a6c28.png?w=800&ssl=1)

## Breaking Changes

It's been a busy couple days! Here's a list of our breaking changes

- Invoke-Sqlcmd2 has been removed and replaced with a warning to use Invoke-DbaQuery
- The NetworkShare parameter has been renamed to SharedPath
- UseLastBackups has been renamed to UseLastBackup
- Most NoXyz in Start-DbaMigration has been renamed to ExcludeXyz

## New Commands

Recently, we've also added a bunch of new WSFC, Mirroring and AG commands (like [Sync-DbaAvailabilityGroup](https://dbatools.io/Sync-DbaAvailabilityGroup)!) that I'll write about more in-depth about later. If you'd like to test the commands now and give us feedback, check out the [Availability Groups section](https://dbatools.io/commands/#AGs) of the [Commands Index](https://dbatools.io/commands).

We also have other new commands including

- [Install-DbaSqlWatch](https://dbatools.io/Install-DbaSqlWatch)
- [Uninstall-DbaSqlWatch](https://dbatools.io/Uninstall-DbaSqlWatch)
- [Get-DbaMemoryCondition](https://dbatools.io/Get-DbaMemoryCondition)
- [Remove-DbaDbBackupRestoreHistory](https://dbatools.io/Remove-DbaDbBackupRestoreHistory)
- [New-DbaDatabase](https://dbatools.io/New-DbaDatabase)

`New-DbaDatabase` allows you to create databases easily. It even allows you to create multiple databases on multiple servers at once!

![image](/images/new-db.png)

Also, a teammate suggested we highlight that `Install-DbaSqlWatch`, which installs [sqlwatch](https://sqlwatch.io) is different from [Install-DbaWatchUpdate](https://dbatools.io/Install-DbaWatchUpdate) which watches for updates to dbatools.

## Other Updates

We also added Azure support to [Copy-DbaDbTableData](https://dbatools.io/Copy-DbaDbTableData). Oh, and, we added `-AutoCreateTable` which creates the destination table based off of the definition of the source table. Have you ever used this command? It's an insanely fast streaming bulk-copy between two tables.

![image](https://user-images.githubusercontent.com/8278033/48632337-f0ef3000-e9c0-11e8-8e4f-15f898948667.png?w=800&ssl=1)

Note that it took 11ms to create the destination table on a remote server and insert 2155 rows 🙌

Thank you all for your patience while we make these huge strides. We'll be in touch soon.

Chrissy
