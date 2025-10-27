---
title: "Get-DbaExecutionPlan"
slug: "Get-DbaExecutionPlan"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves cached execution plans and metadata from SQL Server's plan cache"
tags:
  - "Performance"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaExecutionPlan.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaExecutionPlan"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaExecutionPlan</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaExecutionPlan.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Retrieves cached execution plans and metadata from SQL Server's plan cache

## Description

Retrieves execution plans from SQL Server's plan cache using Dynamic Management Views (sys.dm_exec_query_stats, sys.dm_exec_query_plan, and sys.dm_exec_text_query_plan). This is essential for performance analysis because it shows you what queries are actually running and how SQL Server is executing them, without having to capture plans in real-time.  
  
The function returns detailed metadata including database name, object name, creation time, last execution time, query and plan handles, plus the actual XML execution plans. You can filter results by database, creation date, or last execution time to focus on specific queries or time periods. Use this when troubleshooting performance issues, identifying resource-intensive queries, or analyzing query plan changes over time.  
  
The output can be piped directly to Export-DbaExecutionPlan to save plans as .sqlplan files for detailed analysis in SQL Server Management Studio or other tools.  
  
Thanks to following for the queries:  
https://www.simple-talk.com/sql/t-sql-programming/dmvs-for-query-plan-metadata/  
http://www.scarydba.com/2017/02/13/export-plans-cache-sqlplan-file/

## Syntax

```powershell
Get-DbaExecutionPlan
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-SinceCreation] <DateTime>]
    [[-SinceLastExecution] <DateTime>]
    [-ExcludeEmptyQueryPlan]
    [-Force]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sqlserver2014a
```
{: data-copyable="true" data-clean-code="Get-DbaExecutionPlan -SqlInstance sqlserver2014a" }

Gets all execution plans on  sqlserver2014a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sqlserver2014a -Database db1, db2 -SinceLastExecution '2016-07-01 10:47:00'
```
{: data-copyable="true" data-clean-code="Get-DbaExecutionPlan -SqlInstance sqlserver2014a -Database db1, db2 -SinceLastExecution '2016-07-01 10:47:00'" }

Gets all execution plans for databases db1 and db2 on sqlserver2014a since July 1, 2016 at 10:47 AM.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sqlserver2014a, sql2016 -Exclude db1 | Format-Table
```
{: data-copyable="true" data-clean-code="Get-DbaExecutionPlan -SqlInstance sqlserver2014a, sql2016 -Exclude db1 | Format-Table" }

Gets execution plan info for all databases except db1 on sqlserver2014a and sql2016 and makes the output pretty<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sql2014 -Database AdventureWorks2014, pubs -Force
```
{: data-copyable="true" data-clean-code="Get-DbaExecutionPlan -SqlInstance sql2014 -Database AdventureWorks2014, pubs -Force" }

Gets super detailed information for execution plans on only for AdventureWorks2014 and pubs<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sqlserver2014a","sql2016t"
PS C:\> $servers | Get-DbaExecutionPlan -Force
```
{: data-copyable="true" data-clean-code="$servers = &quot;sqlserver2014a&quot;,&quot;sql2016t&quot;
$servers | Get-DbaExecutionPlan -Force" }

Gets super detailed information for execution plans on sqlserver2014a and sql2016<br>

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

Specifies which databases to include when retrieving execution plans from the plan cache.  
Use this to focus performance analysis on specific databases instead of scanning all databases on the instance.  
Accepts multiple database names and supports wildcards for pattern matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to exclude when retrieving execution plans from the plan cache.  
Useful when you want to analyze most databases but skip system databases like tempdb or specific application databases.  
Accepts multiple database names for flexible filtering.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SinceCreation

Filters execution plans to only those created on or after the specified date and time.  
Use this to focus on recent query plan changes after deployments, index modifications, or statistics updates.  
Helps identify new execution plans that may be causing performance issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SinceLastExecution

Filters execution plans to only those executed on or after the specified date and time.  
Essential for identifying recently active queries when troubleshooting current performance problems.  
Excludes older cached plans that are no longer being used by applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeEmptyQueryPlan

Excludes execution plans that have null or empty XML query plan data.  
Use this to focus only on plans with complete execution plan information for detailed performance analysis.  
Helps avoid incomplete results when you need the actual query plan XML for troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Returns all available columns from the Dynamic Management Views instead of the standard curated output.  
Use this when you need access to additional execution statistics, compilation details, or other raw plan cache data.  
Provides comprehensive information for advanced performance analysis and troubleshooting scenarios.

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
