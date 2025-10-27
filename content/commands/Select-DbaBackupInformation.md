---
title: "Select-DbaBackupInformation"
slug: "Select-DbaBackupInformation"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Filters backup history to identify the minimum backup chain needed for point-in-time database recovery"
tags:
  - "Backup"
  - "Restore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Select-DbaBackupInformation.ps1"
bohUrl: "https://dataplat.github.io/boh#Select-DbaBackupInformation"
draft: false
---

# Select-DbaBackupInformation

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Select-DbaBackupInformation](https://github.com/dataplat/dbatools/blob/master/public/Select-DbaBackupInformation.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Select-DbaBackupInformation](https://dataplat.github.io/boh#Select-DbaBackupInformation).

## Synopsis

Filters backup history to identify the minimum backup chain needed for point-in-time database recovery

## Description

Analyzes backup history objects and determines the exact sequence of backups required to restore a database to a specific point in time. This function handles the complex LSN logic to identify which full, differential, and log backups are needed, eliminating the guesswork of manual restore planning. It supports continuing interrupted restores, filtering by database or server names, and accommodating different restore strategies by optionally ignoring differential or log backups. Perfect for automating disaster recovery procedures or when you need to restore to a precise moment without restoring unnecessary backup files.

## Syntax

```powershell
Select-DbaBackupInformation
    [-BackupHistory] <Object>
    [[-RestoreTime] <DateTime>]
    [-IgnoreLogs]
    [-IgnoreDiffs]
    [[-DatabaseName] <String[]>]
    [[-ServerName] <String[]>]
    [[-ContinuePoints] <Object>]
    [[-LastRestoreType] <Object>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
PS C:\> $FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1)
```

Returns all backups needed to restore all the backups in \\server1\backups$ to 1 hour ago<br>

#####  Example:  2 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
PS C:\> $FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1) -DatabaseName ProdFinance
```

Returns all the backups needed to restore Database ProdFinance to an hour ago<br>

#####  Example:  3 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
PS C:\> $FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1) -IgnoreLogs
```

Returns all the backups in \\server1\backups$ to restore to as close prior to 1 hour ago as can be managed with only full and differential backups<br>

#####  Example:  4 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
PS C:\> $FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1) -IgnoreDiffs
```

Returns all the backups in \\server1\backups$ to restore to 1 hour ago using only Full and Log backups.<br>

### Required Parameters

##### -BackupHistory

Backup history records from Get-DbaBackupInformation containing backup metadata and file paths.  
This function analyzes these records to determine the minimum backup chain needed for point-in-time recovery.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -RestoreTime

The specific point in time to restore the database to. Defaults to one month in the future if not specified.  
Use this when you need to recover to a specific moment, such as just before a data corruption incident occurred.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-Date).addmonths(1) |

##### -IgnoreLogs

Excludes transaction log backups from the restore chain, limiting recovery to the most recent full or differential backup.  
Use this when you don't need point-in-time recovery or when log backups are unavailable or corrupted.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IgnoreDiffs

Excludes differential backups from the restore chain, using only full backups and transaction logs.  
Use this when differential backups are corrupted or when you want to test a restore strategy using only full and log backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DatabaseName

Filters results to only include backup chains for the specified database names. Accepts wildcards.  
Use this when you only need to restore specific databases from a backup set containing multiple databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerName

Filters results to only include backups from the specified server or availability group names.  
For Availability Groups, this filters by the AG name rather than individual replica server names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ContinuePoints

Output from Get-RestoreContinuableDatabase containing LSN and fork information for resuming interrupted restores.  
Use this when continuing a partial restore operation on a database that's already in a restoring state.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LastRestoreType

Output from Get-DbaDbRestoreHistory -Last showing the most recent restore operation performed on the target database.  
This determines whether differential backups can be applied based on the last restore type performed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EnableException

By default, when something goes wrong we try to catch it, interpret it and give you a friendly warning message.  
This avoids overwhelming you with "sea of red" exceptions, but is inconvenient because it basically disables advanced scripting.  
Using this switch turns this "nice by default" feature off and enables you to catch exceptions with your own try/catch.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
