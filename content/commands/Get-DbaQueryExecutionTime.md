---
title: "Get-DbaQueryExecutionTime"
slug: "Get-DbaQueryExecutionTime"
date: 2024-01-01
layout: "single"
author: "Brandon Abshire, netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves stored procedures and SQL statements with the highest CPU execution times from SQL Server instances."
tags:
  - "Diagnostic"
  - "Performance"
  - "Query"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaQueryExecutionTime.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaQueryExecutionTime"
draft: false
---

# Get-DbaQueryExecutionTime

| Property | Value |
| --- | --- |
| **Author** | Brandon Abshire, netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaQueryExecutionTime](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaQueryExecutionTime.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaQueryExecutionTime](https://dataplat.github.io/boh#Get-DbaQueryExecutionTime).

## Synopsis

Retrieves stored procedures and SQL statements with the highest CPU execution times from SQL Server instances.

## Description

Analyzes SQL Server's query execution statistics to identify performance bottlenecks by examining CPU worker time data from dynamic management views. This function queries sys.dm_exec_procedure_stats for stored procedures and sys.dm_exec_query_stats for ad hoc statements, returning detailed execution metrics including average execution time, total executions, and maximum execution time.  
  
Use this when troubleshooting performance issues, identifying resource-intensive queries during peak hours, or conducting routine performance audits. The results help pinpoint which stored procedures or SQL statements are consuming the most CPU resources across your databases, so you don't have to manually query DMVs or run expensive profiler traces.  
  
By default, returns the top 100 results per database for queries executed at least 100 times with an average execution time of 500ms or higher. Results include the full SQL text for ad hoc statements and procedure names for stored procedures, along with execution statistics and timing data.

## Syntax

```powershell
Get-DbaQueryExecutionTime -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-MaxResultsPerDb <Int32>]
    [-MinExecs <Int32>]
    [[-MinExecMs] <Int32>]
    [[-ExcludeSystem]]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaQueryExecutionTime -SqlInstance sql2008, sqlserver2012
```

Return the top 100 slowest stored procedures or statements for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaQueryExecutionTime -SqlInstance sql2008 -Database TestDB
```

Return the top 100 slowest stored procedures or statements on server sql2008 for only the TestDB database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaQueryExecutionTime -SqlInstance sql2008 -Database TestDB -MaxResultsPerDb 100 -MinExecs 200 -MinExecMs 1000
```

Return the top 100 slowest stored procedures or statements on server sql2008 for only the TestDB database, limiting results to queries with more than 200 total executions and an execution time over <br>
1000ms or higher.<br>

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

Specifies which databases to analyze for query execution statistics. Accepts wildcards for pattern matching.  
Use this when troubleshooting performance issues in specific databases instead of scanning all databases on the instance.  
Helpful for focusing on production databases or isolating performance analysis to databases experiencing issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the execution time analysis. Accepts wildcards for pattern matching.  
Use this to avoid processing databases that are known to be performing well or contain only static reference data.  
Common use case is excluding development or staging databases when analyzing production performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaxResultsPerDb

Limits the number of top execution time results returned per database. Defaults to 100 results.  
Specify a lower number for quick performance overviews or higher numbers for comprehensive analysis.  
Large values may impact query performance on busy systems with extensive plan cache data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100 |

##### -MinExecs

Filters results to queries that have executed at least this many times. Defaults to 100 executions.  
Use this to focus on frequently-run queries that have consistent performance patterns rather than one-time queries.  
Higher values help identify truly problematic queries that impact system performance regularly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100 |

##### -MinExecMs

Filters results to queries with an average execution time of at least this many milliseconds. Defaults to 500ms.  
Use this to focus on genuinely slow queries rather than fast queries that happen to consume CPU cycles.  
Lowering this value shows more queries but may include acceptable performance levels.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 500 |

##### -ExcludeSystem

Skips analysis of system databases (master, model, msdb, tempdb).  
Use this when focusing performance analysis on user databases only, since system database queries are typically administrative.  
System database performance issues are usually infrastructure-related rather than application code problems.

| Property | Value |
| --- | --- |
| Alias | ExcludeSystemDatabases |
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
