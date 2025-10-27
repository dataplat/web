---
title: "Find-DbaBackup"
slug: "Find-DbaBackup"
date: 2024-01-01
layout: "single"
author: "Chris Sommer (@cjsommer), www.cjsommer.com"
availability: "Windows, Linux, macOS"
synopsis: "Searches filesystem directories for SQL Server backup files based on age and extension criteria."
tags:
  - "Backup"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaBackup.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaBackup"
draft: false
---

# Find-DbaBackup

| Property | Value |
| --- | --- |
| **Author** | Chris Sommer (@cjsommer), www.cjsommer.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaBackup](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaBackup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaBackup](https://dataplat.github.io/boh#Find-DbaBackup).

## Synopsis

Searches filesystem directories for SQL Server backup files based on age and extension criteria.

## Description

Recursively scans specified directories to locate SQL Server backup files (.bak, .trn, .dif, etc.) older than your defined retention period. Returns file objects that can be piped to removal commands or processed for cleanup workflows.  
  
This function replaces manual directory searches when managing backup retention policies. You can filter results to only include files that have been archived (using the Archive bit check) to ensure backups are safely stored elsewhere before cleanup.  
  
Commonly used in automated maintenance scripts to identify backup files ready for deletion based on your organization's retention requirements.

## Syntax

```powershell
Find-DbaBackup
    [-Path] <String>
    [-BackupFileExtension] <String>
    [-RetentionPeriod] <String>
    [-CheckArchiveBit]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaBackup -Path 'C:\MSSQL\SQL Backup\' -BackupFileExtension trn -RetentionPeriod 48h
```

Searches for all trn files in C:\MSSQL\SQL Backup\ and all subdirectories that are more than 48 hours old will be included.<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaBackup -Path 'C:\MSSQL\Backup\' -BackupFileExtension bak -RetentionPeriod 7d -CheckArchiveBit
```

Searches for all bak files in C:\MSSQL\Backup\ and all subdirectories that are more than 7 days old will be included, but only if the files have been backed up to another location as verified by <br>
checking the Archive bit.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaBackup -Path '\\SQL2014\Backup\' -BackupFileExtension bak -RetentionPeriod 24h | Remove-Item -Verbose
```

Searches for all bak files in \\SQL2014\Backup\ and all subdirectories that are more than 24 hours old and deletes only those files with verbose message.<br>

### Required Parameters

##### -Path

Specifies the root directory path to recursively search for backup files. Searches all subdirectories within this path.  
Use this to target specific backup locations like dedicated backup drives or network shares where your SQL Server backups are stored.

| Property | Value |
| --- | --- |
| Alias | BackupFolder |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -BackupFileExtension

Specifies the file extension to search for without the period (e.g., 'bak', 'trn', 'dif', 'log').  
Use 'bak' for full backups, 'trn' or 'log' for transaction log backups, or 'dif' for differential backups depending on which backup type you need to manage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -RetentionPeriod

Specifies how old backup files must be before they're included in results, using format like '7d' or '48h'.  
Files older than this period will be returned, making this essential for backup cleanup operations based on your retention policy.  
Valid units: h (hours), d (days), w (weeks), m (months). Examples: '48h', '7d', '4w', '1m'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -CheckArchiveBit

Only includes backup files that have been archived to another location (Archive bit is not set).  
Use this safety feature to ensure backups have been copied to tape, cloud storage, or other backup systems before cleanup to prevent accidental data loss.

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


&nbsp;
