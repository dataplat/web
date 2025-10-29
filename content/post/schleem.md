---
title: "New Release – Schleem"
date: 2016-12-14
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "schleem"
aliases:
  - /schleem/
  - /schleem/index.html
categories: [announcements]
tags: []
draft: false
---

In this release, we gained 4 new [contributors](https://github.com/dataplat/dbatools/graphs/contributors) to the [dbatools master repository](https://github.com/dataplat/dbatools) for a grand total of of 33! We even added 4 new [Major Contributors](https://dbatools.io/team) to the team. Thanks to all who have joined in to make the awesomest toolset for SQL Server DBAs — we're now offering the community over 100 quality commands

## Just a Quick Highlight

I'm especially excited about every one of the commands in this release. One in particular that stands out to me, though, is [Test-DbaWindowsLogin](https://dbatools.io/Test-DbaWindowsLogin). I like this one because it's a perfect example of a simple PowerShell command that would be a nightmare to pull off using pure T-SQL.

Test-DbaWindowsLogin gathers all of the surrounding Active Directory domains (trusted and within the forest), logs into a SQL Server, gets the list of logins that are Windows users and groups, then queries Active Directory to see if they are still valid.

![](/images/img_58513046e8be1.png)

Gorgeous! Thanks so much to Major Contributor [Stephen Bennett](https://sqlnotesfromtheunderground.wordpress.com/) for suggesting and creating this command. It's something I've already started to use in my own environment.

## Commands

We fixed about 16 bugs, made a couple commands more efficient and added 10 new commands.

- **[Export-DbaAvailabilityGroup](https://dbatools.io/Export-DbaAvailabilityGroup)**
  Exports SQL Server Availability Groups creation scripts to a T-SQL file. This is a function that is not available in SQL Server Management Studio.

- **[Get-DbaDbBackupHistory](https://dbatools.io/Get-DbaDbBackupHistory)**
  This command returns backup history details for some or all databases on a SQL Server. You can even get detailed information (including file path) for latest full, differential and log files.

- **[Get-DbaDbSnapshot](https://dbatools.io/Get-DbaDbSnapshot)**
  Retrieves the list of database snapshot available, along with their base (the db they are the snapshot of), Size in MB, creation time and other details.

- **[Get-DbaDbRoleMember](https://dbatools.io/Get-DbaDbRoleMember)**
  Get members of all roles on a SQL instance. Default output includes columns SqlServer, Database, Role, Member.

- **[Read-DbaBackupHeader](https://dbatools.io/Read-DbaBackupHeader)**
  Reads detailed file information about full, differential and transaction log backups.

- **[Remove-DbaDbSnapshot](https://dbatools.io/Remove-DbaDbSnapshot)**
  Removes (drops) database snapshots from the server

- **[Resolve-DbaNetworkName](https://dbatools.io/Resolve-DbaNetworkName)**
  Returns information about the network connection of the target computer including NetBIOS name, IP Address, domain name and fully qualified domain name (FQDN).

- **[Test-DbaMaxMemory](https://dbatools.io/Test-DbaMaxMemory)**
  The Max Memory series ([Get-DbaMaxMemory](https://dbatools.io/Get-DbaMaxMemory), [Set-DbaMaxMemory](https://dbatools.io/Set-DbaMaxMemory), [Test-DbaMaxMemory](https://dbatools.io/Test-DbaMaxMemory)) first started out as Get-DbaMaxMemory and Set-DbaMaxMemory. Since then, things change a bit. First, the prefix was changed from Sql to Dba to better align with the rest of the commands, and Test was used to test and propose recommendations instead of Get.

  Test-DbaMaxMemory information relating to SQL Server Max Memory configuration settings. It was inspired by Jonathan Kehayias's post about SQL Server Max memory, and displays a SQL Server's: total memory, currently configured SQL max memory, and the calculated recommendation.

- **[Test-DbaWindowsLogin](https://dbatools.io/Test-DbaWindowsLogin)**
  The purpose of this function is to find SQL Server logins that are used by Active Directory users that are either disabled or removed from the domain. It allows you to keep your logins accurate and up to date by removing accounts that are no longer needed.

- **[Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup)**
  Restores all or some of the latest backups, performs a DBCC CHECKTABLE then drops the test database. Here's a video.

{{< youtube 50xEuEZr6as >}}

## Notable Bug Fixes

- **[Remove-DbaDatabaseSafely](https://dbatools.io/Remove-DbaDatabaseSafely)**
  Fixed an issue with it not detecting that SQL Agent was running.

- **[Find-DbaOrphanedFile](https://dbatools.io/Find-DbaOrphanedFile)**
  Good ol' Find-DbaOrphanedFile now works better with SQL Server 2005 and SQL Server 2000.

- **[Export-DbaLogin](https://dbatools.io/Export-DbaLogin)**
  Now enumerates database permissions!

- **[Get-DbaRegServer](https://dbatools.io/Get-DbaRegServer)**
  Fixed to allow working with nested groups

- **[Copy-DbaLogin](https://dbatools.io/Copy-DbaLogin)**
  Fixed an issue where SQL Logins wouldn't be copied over if Mixed-Mode authentication was not enabled.

## AppVeyor, Pester and Testing

Rob Sewell of dbareports.io fame spent a few days adding Pester testing and enforced testing for each commit using [AppVeyor](https://appveyor.com). This will ultimately help us release more often and with higher quality.

Want to help create tests? We're in desperate need of testers and Pester fans. Or, if you want to learn Pester, this is a great opportunity. Both dbatools and dbareports are in need.

## What Is Schleem? Sounds Nasty

All of our release names are taken from my favorite cartoon, [Rick and Morty](http://www.adultswim.com/videos/rick-and-morty/). I'm obsessed! What's schleem? It's the stuff that smooths out the dingle bop, which is an important part of a plumbus.

## New to dbatools?

Visit the [downloads page](https://dbatools.io/download) for information about how to download and install dbatools (it's 1 command).

## Join us!

Some of these commands are in their infancy. Want to help make them better? Come join the coding party! We're all hanging out on the [SQL Server Community Slack](https://dbatools.io/slack) in the #dbatools channel.
