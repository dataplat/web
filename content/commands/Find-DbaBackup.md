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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaBackup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaBackup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Find-DbaBackup -Path 'C:\MSSQL\SQL Backup\' -BackupFileExtension trn -RetentionPeriod 48h" }

Searches for all trn files in C:\MSSQL\SQL Backup\ and all subdirectories that are more than 48 hours old will be included.<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaBackup -Path 'C:\MSSQL\Backup\' -BackupFileExtension bak -RetentionPeriod 7d -CheckArchiveBit
```
{: data-copyable="true" data-clean-code="Find-DbaBackup -Path 'C:\MSSQL\Backup\' -BackupFileExtension bak -RetentionPeriod 7d -CheckArchiveBit" }

Searches for all bak files in C:\MSSQL\Backup\ and all subdirectories that are more than 7 days old will be included, but only if the files have been backed up to another location as verified by <br>
checking the Archive bit.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaBackup -Path '\\SQL2014\Backup\' -BackupFileExtension bak -RetentionPeriod 24h | Remove-Item -Verbose
```
{: data-copyable="true" data-clean-code="Find-DbaBackup -Path '\\SQL2014\Backup\' -BackupFileExtension bak -RetentionPeriod 24h | Remove-Item -Verbose" }

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
