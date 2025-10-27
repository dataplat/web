---
title: "Remove-DbaBackup"
slug: "Remove-DbaBackup"
date: 2024-01-01
layout: "single"
author: "Chris Sommer (@cjsommer), www.cjsommer.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server backup files from disk based on retention policies and file extension criteria."
tags:
  - "Backup"
  - "DisasterRecovery"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaBackup.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaBackup"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaBackup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaBackup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chris Sommer (@cjsommer), www.cjsommer.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Removes SQL Server backup files from disk based on retention policies and file extension criteria.

## Description

Recursively searches backup directories and removes SQL Server backup files older than your specified retention period. This function automates the tedious process of manually cleaning up old backup files to free disk space and maintain storage compliance.  
  
You can target specific backup types by extension (.bak, .trn, .dif) and define retention periods using flexible time units (hours, days, weeks, months). The Archive bit check ensures files are only deleted after they've been backed up to another location, preventing accidental loss of unarchived backups.  
  
Replaces the backup cleanup functionality found in SQL Server maintenance plans with more granular control and PowerShell automation. Optionally removes empty backup folders after file cleanup to keep your backup directory structure tidy.

## Syntax

```powershell
Remove-DbaBackup
    [-Path] <String>
    [-BackupFileExtension] <String>
    [-RetentionPeriod] <String>
    [-CheckArchiveBit]
    [-RemoveEmptyBackupFolder]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Remove-DbaBackup -Path 'C:\MSSQL\SQL Backup\' -BackupFileExtension trn -RetentionPeriod 48h
```
{: data-copyable="true" data-clean-code="Remove-DbaBackup -Path 'C:\MSSQL\SQL Backup\' -BackupFileExtension trn -RetentionPeriod 48h" }

'*.trn' files in 'C:\MSSQL\SQL Backup\' and all subdirectories that are more than 48 hours old will be removed.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaBackup -Path 'C:\MSSQL\SQL Backup\' -BackupFileExtension trn -RetentionPeriod 48h -WhatIf
```
{: data-copyable="true" data-clean-code="Remove-DbaBackup -Path 'C:\MSSQL\SQL Backup\' -BackupFileExtension trn -RetentionPeriod 48h -WhatIf" }

Same as example #1, but doesn't actually remove any files. The function will instead show you what would be done.<br>
This is useful when first experimenting with using the function.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaBackup -Path 'C:\MSSQL\Backup\' -BackupFileExtension bak -RetentionPeriod 7d -CheckArchiveBit
```
{: data-copyable="true" data-clean-code="Remove-DbaBackup -Path 'C:\MSSQL\Backup\' -BackupFileExtension bak -RetentionPeriod 7d -CheckArchiveBit" }

'*.bak' files in 'C:\MSSQL\Backup\' and all subdirectories that are more than 7 days old will be removed, but only if the files have been backed up to another location as verified by checking the <br>
Archive bit.<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaBackup -Path 'C:\MSSQL\Backup\' -BackupFileExtension bak -RetentionPeriod 1w -RemoveEmptyBackupFolder
```
{: data-copyable="true" data-clean-code="Remove-DbaBackup -Path 'C:\MSSQL\Backup\' -BackupFileExtension bak -RetentionPeriod 1w -RemoveEmptyBackupFolder" }

'*.bak' files in 'C:\MSSQL\Backup\' and all subdirectories that are more than 1 week old will be removed. Any folders left empty will be removed as well.<br>

### Required Parameters

##### -Path

Specifies the root directory where backup files are stored for cleanup. The function recursively searches all subdirectories from this location.  
Use this to target your primary backup storage location, whether it's a local drive, network share, or mounted backup volume.

| Property | Value |
| --- | --- |
| Alias | BackupFolder |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -BackupFileExtension

Specifies the file extension for the backup type to clean up. Common values are 'bak' for full backups, 'trn' for transaction log backups, or 'dif' for differential backups.  
Use this to target specific backup types during cleanup, allowing you to apply different retention policies for each backup type. Do not include the period.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -RetentionPeriod

Defines how long to keep backup files before deletion, formatted as number plus unit (48h, 7d, 4w, 1m).  
Use shorter periods for transaction log backups (24h-48h) and longer periods for full backups (1w-4w) based on your recovery requirements and storage capacity.  
Valid units: h=hours, d=days, w=weeks, m=months  
Examples: '48h' keeps files for 48 hours, '7d' for 7 days, '4w' for 4 weeks, '1m' for 1 month

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -CheckArchiveBit

Prevents deletion of files that haven't been archived to tape or another backup location by checking the Windows Archive bit.  
Use this when you have a two-tier backup strategy where files are first copied to disk, then archived to tape or cloud storage before cleanup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RemoveEmptyBackupFolder

Removes directories that become empty after backup file cleanup to prevent folder structure clutter.  
Use this to maintain a clean backup directory structure, especially when backup files are organized by database or date folders.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.i

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
