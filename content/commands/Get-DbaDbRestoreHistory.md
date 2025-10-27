---
title: "Get-DbaDbRestoreHistory"
slug: "Get-DbaDbRestoreHistory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database restore history from MSDB for compliance reporting and recovery analysis."
tags:
  - "DisasterRecovery"
  - "Backup"
  - "Restore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRestoreHistory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbRestoreHistory"
draft: false
---

# Get-DbaDbRestoreHistory

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbRestoreHistory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRestoreHistory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbRestoreHistory](https://dataplat.github.io/boh#Get-DbaDbRestoreHistory).

## Synopsis

Retrieves database restore history from MSDB for compliance reporting and recovery analysis.

## Description

Queries the MSDB database's restorehistory and backupset tables to retrieve detailed information about all database restore operations performed on a SQL Server instance. This function returns comprehensive restore details including who performed the restore, when it occurred, what type of restore was performed, and the source and destination file paths.  
  
Use this command to track restore activity for compliance auditing, troubleshoot database issues by determining when databases were last restored, or investigate unexpected changes by identifying recent restore operations. The function supports filtering by database name, restore type (Database, File, Filegroup, Differential, Log, Verifyonly, Revert), date ranges, and can return only the most recent restore for each database.  
  
This eliminates the need to manually query MSDB system tables or write complex SQL joins to gather restore history information across multiple instances.  
  
Thanks to https://www.mssqltips.com/SqlInstancetip/1724/when-was-the-last-time-your-sql-server-database-was-restored/ for the query and https://sqlstudies.com/2016/07/27/when-was-this-database-restored/ for the idea.

## Syntax

```powershell
Get-DbaDbRestoreHistory
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Since] <DateTime>]
    [-Force]
    [-Last]
    [[-RestoreType] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbRestoreHistory -SqlInstance sql2016
```

Returns server name, database, username, restore type, date for all restored databases on sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbRestoreHistory -SqlInstance sql2016 -Database db1, db2 -Since '2016-07-01 10:47:00'
```

Returns restore information only for databases db1 and db2 on sql2016 since July 1, 2016 at 10:47 AM.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbRestoreHistory -SqlInstance sql2014, sql2016 -Exclude db1
```

Returns restore information for all databases except db1 on sql2014 and sql2016.<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbRestoreHistory -SqlInstance sql2014 -Database AdventureWorks2014, pubs -SqlCredential $cred | Format-Table
```

Returns database restore information for AdventureWorks2014 and pubs database on sql2014, connects using SQL Authentication via sqladmin account. Formats the data as a table.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2016 | Get-DbaDbRestoreHistory
```

Returns database restore information for every database on every server listed in the Central Management Server on sql2016.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbRestoreHistory -SqlInstance sql2016 -RestoreType Log
```

Returns log restore information for every database on the sql2016 instance.<br>

### Required Parameters

##### -SqlInstance

Specifies the SQL Server instance(s) to operate on. Requires SQL Server 2005 or higher.

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

Filters restore history to specific database(s). Accepts wildcards for pattern matching.  
Use this when investigating restore activity for particular databases rather than reviewing all restore operations on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific database(s) from the restore history results. Accepts wildcards for pattern matching.  
Useful when you need to filter out system databases or other databases that aren't relevant to your investigation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Since

Filters restore history to operations that occurred on or after the specified date and time.  
Use this when investigating recent restore activity or limiting results to a specific time period for compliance reporting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

This parameter is deprecated and no longer used.  
Previously controlled whether to return all available columns, but this functionality has been removed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Last

Returns only the most recent restore operation for each database, filtering out all earlier restore history.  
Use this when you need to quickly identify when each database was last restored without seeing the full restore timeline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RestoreType

Filters results to a specific type of restore operation: Database, File, Filegroup, Differential, Log, Verifyonly, or Revert.  
Use this when troubleshooting specific restore scenarios, such as finding all log restores during a point-in-time recovery or identifying differential restores for performance analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Database,File,Filegroup,Differential,Log,Verifyonly,Revert |

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
