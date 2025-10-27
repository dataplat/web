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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Select-DbaBackupInformation</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Select-DbaBackupInformation.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stuart Moore (@napalmgram), stuart-moore.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="$Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
$FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1)" }

Returns all backups needed to restore all the backups in \\server1\backups$ to 1 hour ago<br>

#####  Example:  2 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
PS C:\> $FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1) -DatabaseName ProdFinance
```
{: data-copyable="true" data-clean-code="$Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
$FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1) -DatabaseName ProdFinance" }

Returns all the backups needed to restore Database ProdFinance to an hour ago<br>

#####  Example:  3 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
PS C:\> $FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1) -IgnoreLogs
```
{: data-copyable="true" data-clean-code="$Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
$FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1) -IgnoreLogs" }

Returns all the backups in \\server1\backups$ to restore to as close prior to 1 hour ago as can be managed with only full and differential backups<br>

#####  Example:  4 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
PS C:\> $FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1) -IgnoreDiffs
```
{: data-copyable="true" data-clean-code="$Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\server1\backups$
$FilteredBackups = $Backups | Select-DbaBackupInformation -RestoreTime (Get-Date).AddHours(-1) -IgnoreDiffs" }

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
