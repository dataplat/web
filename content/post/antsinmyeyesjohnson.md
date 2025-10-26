---
title: "New Release – Ants in My Eyes Johnson"
date: 2016-11-22
author: "Chrissy LeMaire"
slug: "antsinmyeyesjohnson"
aliases:
  - /antsinmyeyesjohnson/
  - /antsinmyeyesjohnson/index.html
categories: [announcements]
tags: []
draft: false
---

In [this release](https://github.com/dataplat/dbatools/releases/tag/v0.8.65) (two in one month, woo!), we gained 3 new contributors to the [dbatools master repository](https://github.com/dataplat/dbatools) for a grand total of of 29! We also added a [shortcuts reference page](https://dbatools.io/shortcuts) for those of you who often visit portions of our site or GitHub and would like the shortlinks.

## Commands

We fixed about 10 bugs, made two commands more efficient and added 5 new commands.

- **[Connect-DbaSqlServer](https://dbatools.io/Connect-DbaSqlServer)**
  Creates an SMO SQL Server object. Supports both Windows and SQL Authentication. I imagine mostly SMO programmers will like this one, but check it out anyway. It has a ton of useful parameters.

- **[Get-DbaLastBackup](https://dbatools.io/Get-DbaLastBackup)**
  Retrieves and compares the date/time for the last known backups, as well as the creation date/time for the database.

  Default output includes columns Server, Database, RecoveryModel, LastFullBackup, LastDiffBackup, LastLogBackup, SinceFull, SinceDiff, SinceLog, Status, DatabaseCreated, DaysSinceDbCreated.

- **[Get-DbaPermission](https://dbatools.io/Get-DbaPermission)**
  Get a list of Server and Database level permissions

- **[Get-DbaStartupParameter](https://dbatools.io/Get-DbaStartupParameter)**
  Displays values for a detailed list of SQL Server Startup Parameters including Master Data Path, Master Log path, Error Log, Trace Flags, Parameter String and much more.

- **[Remove-DbaBackup](https://dbatools.io/Remove-DbaBackup)**
  T-SQL based maintenance plans can't safely access Windows file system to determine if a file has been properly archived. PowerShell makes it easy.

  This command will make it easier to clean up old, archived (and unarchived) backups.

Want to see more or work on a command yourself? We have approved command ideas on [the dbatools Trello board](https://dbatools.io/trello). This board shows you what we're working on and what we're talking about.

## Notable Bug Fixes

- **[Copy-DbaCredential](https://dbatools.io/Copy-DbaCredential) and [Copy-DbaLinkedServer](https://dbatools.io/Copy-DbaLinkedServer)**
  Both commands worked properly but made an attempt to connect to the destination that was unnecessary and sometimes generated errors.

- **[Find-DbaOrphanedFile](https://dbatools.io/Find-DbaOrphanedFile)**
  Fixed bug that reported some valid directories and files as orphaned.

- **[Get-DbaTcpPort](https://dbatools.io/Get-DbaTcpPort)**
  Fixed a bug that hid a real exception message behind one that basically said "Something didn't work right."

- **[Test-DbaNetworkLatency](https://dbatools.io/Test-DbaNetworkLatency)**
  Fixed a logic bug that produced inaccurate results.

- **[Test-DbaPath](https://dbatools.io/Test-DbaPath)**
  Now works in all languages!

## Join Us!

Some of these commands are in their infancy. Want to help make them better? Come join the coding party! We're all hanging out on the [SQL Server Community Slack](https://dbatools.io/slack) in the #dbatools channel.
