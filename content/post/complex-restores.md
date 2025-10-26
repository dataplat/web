---
title: "Getting Complex with Restore-DbaDatabase"
date: 2017-11-28
author: "Stuart Moore"
slug: "complex-restores"
aliases:
  - /complex-restores/
  - /complex-restores/index.html
categories: [announcements]
tags: [party]
draft: false
---

No matter how hard the [dbatools](https://dbatools.io) team tries, there's always someone who wants to do things we'd never thought. This is one of the great things with getting feedback direct from a great community. Unfortunately a lot of these ideas are either too niche to implement, or would be a lot of complex code for a single use case.

As part of the `Restore-DbaDatabase` stack rewrite, I wanted to do make things easier for users to be able to get their hands dirty within the Restore stack. Not necessarily needing to dive into the core code and the world of GitHub Pull Requests, but by manipulating the data flowing through the pipeline using standard PowerShell techniques, all the while being able to do the heavy lifting without code.

So, below we'll be looking at some examples of how you can start going to town with your restores.

## Improving Header Scan Performance

One of the most common requests has been ways of speeding up reading the headers from the backup files. Unfortunately we have to do this so we can be sure of what they contain, and there aren't any shortcuts ([I've looked into it in some depth before](https://stuart-moore.com/reading-sql-server-backup-file-headers-directly-using-powershell/)).

So we can now offer a couple more options to do this:

### Spread the Load Over Time

Using `Get-DbaBackupInformation` it's now possible to scan the headers ahead of time, and just add to them in small batches going forward. So you could scan every 3 hours, and if you needed more recent file, you'd only have to scan the files written since the last scan:

<!-- Gist: 34fec9d449dd914ca455a2a4ea4980c4 -->

### Run Parallel Jobs on a Single Server

Another option is to run multiple scans at the same time. For this example I'm using the [PoshRsJob](https://github.com/proxb/PoshRSJob) module as it's one I use a bit, but any other runspace/jobs options would work just as well.

In the first example we scan multiple directories on the same SQL Server Instance. We pass an array of folders into `Start-RsJob` and scan each folder in parallel as a seperate job.

<!-- Gist: 54b7e967097b6467047fa6790ab4c95f -->

### Run Parallel Jobs on Multiple Servers

Perhaps you want to spread the load even more? The run the scans across multiple SQL Instances. This example uses a simple allocation routine that just 'cross joins' the options:

<!-- Gist: c9a31104759d66b7427311a6b6ae7a3b -->

## Custom Log and Data Folders for Each Database

Perhaps you want to restore a number of databases, and you want seperate Data and Log folders for each database, eg:

**db1 – c:\folder\data\db1 and c:\folder\log\db1**
**db2 – c:\folder\data\db2 and c:\folder\log\db2**

By dipping into the restore pipleine we can loop through the databases contained within the backup information and apply custom formatting to each database:

<!-- Gist: 9a6bec3aa2710d719d58f2224491911a -->

## Creating Multiple Environments

Perhaps you need to refresh multiple environments at the same time. Using Get-DbaBackupInformation to create a BackupHistory you can use the same scanned files multiple times, saving scanning them repeatedly:

<!-- Gist: 39ac060bd7904c900eac9575d03f0008 -->

## Creating Different Points in Time for Comparison

Perhaps you're trying to find out when an issue occured. This example restores the same database to multiple points in time so you can compare the state between them.

<!-- Gist: 00cbc4c3cf31583cae99c36f0494bf94 -->

## Rolling Forward Looking for Data

Building on the one above, perhaps you'd rather something else did the checking for you? With this script we gradually roll forward a database a minute at a time. We use a SQL query (quite a simple one here) to indicate when the process should stop.

<!-- Gist: c5575e488ff3d95e60403b39b70ca7da -->

## Complex Rebasing of Backups

When people use `Get-DbaDbBackupHistory` to get the pre-created Backup History directly from SQL Server, it's a very common request for a way of changing the path of where the backup files were to where they are now. One thing that catches a lot of people out is that the Backup History object stores the Backup file paths as an array. This allows us to easily cope with striped backupsets where the backup consists of multiple files. The simplest way is a nested ForEach loop:

<!-- Gist: 5bef59595e931507e2f4ce64a1fa1307 -->

With this method you can manipulate the strings to your heart's content using any standard PowerShell technique.
