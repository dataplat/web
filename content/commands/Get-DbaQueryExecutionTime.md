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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaQueryExecutionTime</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaQueryExecutionTime.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Brandon Abshire, netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaQueryExecutionTime -SqlInstance sql2008, sqlserver2012" }

Return the top 100 slowest stored procedures or statements for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaQueryExecutionTime -SqlInstance sql2008 -Database TestDB
```
{: data-copyable="true" data-clean-code="Get-DbaQueryExecutionTime -SqlInstance sql2008 -Database TestDB" }

Return the top 100 slowest stored procedures or statements on server sql2008 for only the TestDB database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaQueryExecutionTime -SqlInstance sql2008 -Database TestDB -MaxResultsPerDb 100 -MinExecs 200 -MinExecMs 1000
```
{: data-copyable="true" data-clean-code="Get-DbaQueryExecutionTime -SqlInstance sql2008 -Database TestDB -MaxResultsPerDb 100 -MinExecs 200 -MinExecMs 1000" }

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
