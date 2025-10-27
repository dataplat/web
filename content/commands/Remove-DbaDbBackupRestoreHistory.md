---
title: "Remove-DbaDbBackupRestoreHistory"
slug: "Remove-DbaDbBackupRestoreHistory"
date: 2024-01-01
layout: "single"
author: "IJeb Reitsma"
availability: "Windows, Linux, macOS"
synopsis: "Removes backup and restore history records from MSDB database to prevent excessive growth"
tags:
  - "Delete"
  - "Backup"
  - "Restore"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbBackupRestoreHistory.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbBackupRestoreHistory"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbBackupRestoreHistory</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbBackupRestoreHistory.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>IJeb Reitsma</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Removes backup and restore history records from MSDB database to prevent excessive growth

## Description

Removes backup and restore history records from MSDB database tables to prevent them from consuming excessive disk space and degrading performance. Over time, these history tables can grow substantially on busy SQL Server instances with frequent backup operations.  
  
Works in two modes: server-level cleanup removes records older than a specified retention period (default 30 days), while database-level cleanup removes the complete backup/restore history for specific databases. This is particularly useful when decommissioning databases or cleaning up after major maintenance operations.  
  
The backup and restore history tables reside in the MSDB database and include backupset, backupfile, restorehistory, and related system tables. Large history accumulations can impact backup operations, SSMS performance when viewing backup history, and overall MSDB database size.  
  
For production environments, consider scheduling regular cleanup using the sp_delete_backuphistory agent job from Ola Hallengren's SQL Server Maintenance Solution (https://ola.hallengren.com) rather than manual cleanup operations.

## Syntax

```powershell
Remove-DbaDbBackupRestoreHistory
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-KeepDays] <Int32>]
    [[-Database] <String[]>]
    [[-InputObject] <Database[]>]
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
PS C:\> Remove-DbaDbBackupRestoreHistory -SqlInstance sql2016
```
{: data-copyable="true" data-clean-code="Remove-DbaDbBackupRestoreHistory -SqlInstance sql2016" }

Prompts for confirmation then deletes backup and restore history on SQL Server sql2016 older than 30 days (default period)<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbBackupRestoreHistory -SqlInstance sql2016 -KeepDays 100 -Confirm:$false
```
{: data-copyable="true" data-clean-code="Remove-DbaDbBackupRestoreHistory -SqlInstance sql2016 -KeepDays 100 -Confirm:$false" }

Remove backup and restore history on SQL Server sql2016 older than 100 days. Does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbBackupRestoreHistory -SqlInstance sql2016 -Database db1
```
{: data-copyable="true" data-clean-code="Remove-DbaDbBackupRestoreHistory -SqlInstance sql2016 -Database db1" }

Prompts for confirmation then deletes all backup and restore history for database db1 on SQL Server sql2016<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 | Remove-DbaDbBackupRestoreHistory -WhatIf
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2016 | Remove-DbaDbBackupRestoreHistory -WhatIf" }

Remove complete backup and restore history for all databases on SQL Server sql2016<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -KeepDays

Specifies how many days of backup and restore history to retain when performing server-level cleanup. Records older than this period will be deleted from MSDB history tables.  
Use this for regular maintenance to prevent MSDB growth while preserving recent history for troubleshooting. Cannot be combined with Database parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Database

Specifies specific databases to completely remove all backup and restore history records regardless of age. Accepts multiple database names and wildcards.  
Use this when decommissioning databases or performing targeted cleanup after major maintenance operations. Cannot be combined with KeepDays parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase to remove complete backup and restore history for those specific databases.  
Use this for pipeline operations when working with filtered database collections or when combining with other dbatools database commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
