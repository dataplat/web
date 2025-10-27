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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaEstimatedCompletionTime</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaEstimatedCompletionTime.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaEstimatedCompletionTime -SqlInstance sql2016" }

Gets estimated completion times for queries performed against the entire server<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaEstimatedCompletionTime -SqlInstance sql2016 | Select-Object *
```
{: data-copyable="true" data-clean-code="Get-DbaEstimatedCompletionTime -SqlInstance sql2016 | Select-Object *" }

Gets estimated completion times for queries performed against the entire server PLUS the SQL query text of each command<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaEstimatedCompletionTime -SqlInstance sql2016 | Where-Object { $_.Text -match 'somequerytext' }
```
{: data-copyable="true" data-clean-code="Get-DbaEstimatedCompletionTime -SqlInstance sql2016 | Where-Object { $_.Text -match 'somequerytext' }" }

Gets results for commands whose queries only match specific text (match is like LIKE but way more powerful)<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaEstimatedCompletionTime -SqlInstance sql2016 -Database Northwind,pubs,Adventureworks2014
```
{: data-copyable="true" data-clean-code="Get-DbaEstimatedCompletionTime -SqlInstance sql2016 -Database Northwind,pubs,Adventureworks2014" }

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
