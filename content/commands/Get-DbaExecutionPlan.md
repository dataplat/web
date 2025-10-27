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

# Get-DbaExecutionPlan

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaExecutionPlan](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaExecutionPlan.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaExecutionPlan](https://dataplat.github.io/boh#Get-DbaExecutionPlan).

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

Gets all execution plans on  sqlserver2014a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sqlserver2014a -Database db1, db2 -SinceLastExecution '2016-07-01 10:47:00'
```

Gets all execution plans for databases db1 and db2 on sqlserver2014a since July 1, 2016 at 10:47 AM.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sqlserver2014a, sql2016 -Exclude db1 | Format-Table
```

Gets execution plan info for all databases except db1 on sqlserver2014a and sql2016 and makes the output pretty<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sql2014 -Database AdventureWorks2014, pubs -Force
```

Gets super detailed information for execution plans on only for AdventureWorks2014 and pubs<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sqlserver2014a","sql2016t"
PS C:\> $servers | Get-DbaExecutionPlan -Force
```

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
