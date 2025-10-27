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

# Remove-DbaDbBackupRestoreHistory

| Property | Value |
| --- | --- |
| **Author** | IJeb Reitsma |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbBackupRestoreHistory](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbBackupRestoreHistory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbBackupRestoreHistory](https://dataplat.github.io/boh#Remove-DbaDbBackupRestoreHistory).

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

Prompts for confirmation then deletes backup and restore history on SQL Server sql2016 older than 30 days (default period)<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbBackupRestoreHistory -SqlInstance sql2016 -KeepDays 100 -Confirm:$false
```

Remove backup and restore history on SQL Server sql2016 older than 100 days. Does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbBackupRestoreHistory -SqlInstance sql2016 -Database db1
```

Prompts for confirmation then deletes all backup and restore history for database db1 on SQL Server sql2016<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 | Remove-DbaDbBackupRestoreHistory -WhatIf
```

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
