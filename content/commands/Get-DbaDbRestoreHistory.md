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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbRestoreHistory</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRestoreHistory.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaDbRestoreHistory -SqlInstance sql2016" }

Returns server name, database, username, restore type, date for all restored databases on sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbRestoreHistory -SqlInstance sql2016 -Database db1, db2 -Since '2016-07-01 10:47:00'
```
{: data-copyable="true" data-clean-code="Get-DbaDbRestoreHistory -SqlInstance sql2016 -Database db1, db2 -Since '2016-07-01 10:47:00'" }

Returns restore information only for databases db1 and db2 on sql2016 since July 1, 2016 at 10:47 AM.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbRestoreHistory -SqlInstance sql2014, sql2016 -Exclude db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbRestoreHistory -SqlInstance sql2014, sql2016 -Exclude db1" }

Returns restore information for all databases except db1 on sql2014 and sql2016.<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbRestoreHistory -SqlInstance sql2014 -Database AdventureWorks2014, pubs -SqlCredential $cred | Format-Table
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Get-DbaDbRestoreHistory -SqlInstance sql2014 -Database AdventureWorks2014, pubs -SqlCredential $cred | Format-Table" }

Returns database restore information for AdventureWorks2014 and pubs database on sql2014, connects using SQL Authentication via sqladmin account. Formats the data as a table.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2016 | Get-DbaDbRestoreHistory
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sql2016 | Get-DbaDbRestoreHistory" }

Returns database restore information for every database on every server listed in the Central Management Server on sql2016.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbRestoreHistory -SqlInstance sql2016 -RestoreType Log
```
{: data-copyable="true" data-clean-code="Get-DbaDbRestoreHistory -SqlInstance sql2016 -RestoreType Log" }

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
