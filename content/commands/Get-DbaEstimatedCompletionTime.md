---
title: "Get-DbaEstimatedCompletionTime"
slug: "Get-DbaEstimatedCompletionTime"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Monitors progress and estimated completion times for long-running SQL Server operations"
tags:
  - "Diagnostic"
  - "Query"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaEstimatedCompletionTime.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaEstimatedCompletionTime"
draft: false
---

# Get-DbaEstimatedCompletionTime

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaEstimatedCompletionTime](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaEstimatedCompletionTime.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaEstimatedCompletionTime](https://dataplat.github.io/boh#Get-DbaEstimatedCompletionTime).

## Synopsis

Monitors progress and estimated completion times for long-running SQL Server operations

## Description

Retrieves real-time progress information for long-running SQL Server maintenance and administrative operations by querying sys.dm_exec_requests. This function helps DBAs monitor the status of time-intensive tasks without having to guess when they'll complete or manually check SQL Server Management Studio.  
  
Shows progress details including percent complete, running time, estimated time remaining, and projected completion time. Only returns operations that SQL Server can provide completion estimates for - quick queries and standard SELECT statements won't appear in the results.  
  
Percent complete will show for the following commands:  
  
ALTER INDEX REORGANIZE  
AUTO_SHRINK option with ALTER DATABASE  
BACKUP DATABASE  
DBCC CHECKDB  
DBCC CHECKFILEGROUP  
DBCC CHECKTABLE  
DBCC INDEXDEFRAG  
DBCC SHRINKDATABASE  
DBCC SHRINKFILE  
RECOVERY  
RESTORE DATABASE  
ROLLBACK  
TDE ENCRYPTION  
  
Particularly useful during scheduled maintenance windows, large database restores, or when troubleshooting performance issues where you need visibility into what's currently running and how much longer it will take.  
  
For additional information, check out https://blogs.sentryone.com/loriedwards/patience-dm-exec-requests/ and https://docs.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-exec-requests-transact-sql

## Syntax

```powershell
Get-DbaEstimatedCompletionTime
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
PS C:\> Get-DbaEstimatedCompletionTime -SqlInstance sql2016
```

Gets estimated completion times for queries performed against the entire server<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaEstimatedCompletionTime -SqlInstance sql2016 | Select-Object *
```

Gets estimated completion times for queries performed against the entire server PLUS the SQL query text of each command<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaEstimatedCompletionTime -SqlInstance sql2016 | Where-Object { $_.Text -match 'somequerytext' }
```

Gets results for commands whose queries only match specific text (match is like LIKE but way more powerful)<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaEstimatedCompletionTime -SqlInstance sql2016 -Database Northwind,pubs,Adventureworks2014
```

Gets estimated completion times for queries performed against the Northwind, pubs, and Adventureworks2014 databases<br>

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

SqlLogin to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance..

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Filters results to show only long-running operations within the specified database(s). Accepts multiple database names or wildcards.  
Use this when you need to monitor specific databases during maintenance windows or troubleshoot performance issues in particular databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes long-running operations from the specified database(s) when monitoring across the entire instance.  
Helpful when you want to monitor all databases except system databases or exclude databases with known maintenance operations.

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
