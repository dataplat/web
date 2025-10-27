---
title: "Get-DbaLastBackup"
slug: "Get-DbaLastBackup"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves last backup dates and times for database backup compliance monitoring"
tags:
  - "DisasterRecovery"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLastBackup.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaLastBackup"
draft: false
---

# Get-DbaLastBackup

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaLastBackup](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLastBackup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaLastBackup](https://dataplat.github.io/boh#Get-DbaLastBackup).

## Synopsis

Retrieves last backup dates and times for database backup compliance monitoring

## Description

Queries msdb backup history to retrieve the most recent full, differential, and transaction log backup dates for each database. This function helps DBAs quickly identify backup gaps and verify compliance with backup policies by showing when each backup type was last performed. The function also calculates elapsed time since each backup and provides status indicators to highlight potential issues, such as databases with no recent backups or transaction log backups that are overdue in full recovery model databases. Default output includes Server, Database, LastFullBackup, LastDiffBackup, and LastLogBackup columns.

## Syntax

```powershell
Get-DbaLastBackup
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaLastBackup -SqlInstance ServerA\sql987
```

Returns a custom object with Server name, Database name, and the date the last time backups were performed.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaLastBackup -SqlInstance ServerA\sql987 | Select-Object *
```

Returns a custom object with Server name, Database name, and the date the last time backups were performed, and also recoverymodel and calculations on how long ago backups were taken and what the <br>
status is.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLastBackup -SqlInstance ServerA\sql987 | Select-Object * | Out-Gridview
```

Returns a gridview displaying ComputerName, InstanceName, SqlInstance, Database, RecoveryModel, LastFullBackup, LastDiffBackup, LastLogBackup, SinceFull, SinceDiff, SinceLog, <br>
LastFullBackupIsCopyOnly, LastDiffBackupIsCopyOnly, LastLogBackupIsCopyOnly, DatabaseCreated, DaysSinceDbCreated, Status<br>

#####  Example:  4 

```powershell
PS C:\> $MyInstances | Get-DbaLastBackup | Where-Object -FilterScript { $_.LastFullBackup.Date -lt (Get-Date).AddDays(-3) } | Format-Table -Property SqlInstance, Database, LastFullBackup
```

Returns all databases on the given instances without a full backup in the last three days.<br>
Note that the property LastFullBackup is a custom object, with the subproperty Date of type datetime and therefore suitable for comparison with dates.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaLastBackup -SqlInstance ServerA\sql987 | Where-Object { $_.LastFullBackupIsCopyOnly -eq $true }
```

Filters for the databases that had a copy_only full backup done as the last backup.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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

##### -Database

Specifies which databases to check for backup history. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases rather than scanning all databases on the instance.  
Helpful for monitoring critical production databases or troubleshooting backup issues on particular databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the backup history check. Commonly used to skip system databases or test databases.  
Use this when you want to check most databases but exclude certain ones like tempdb, development databases, or databases with known backup exemptions.

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
