---
title: "Export-DbaExecutionPlan"
slug: "Export-DbaExecutionPlan"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Extracts execution plans from plan cache and saves them as .sqlplan files for analysis"
tags:
  - "Diagnostic"
  - "Performance"
  - "ExecutionPlan"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaExecutionPlan.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaExecutionPlan"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaExecutionPlan</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaExecutionPlan.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Extracts execution plans from plan cache and saves them as .sqlplan files for analysis

## Description

Queries the SQL Server plan cache using dynamic management views and exports execution plans as XML files with .sqlplan extensions. These files can be opened directly in SQL Server Management Studio for detailed analysis and troubleshooting. The function retrieves both single statement plans and batch query plans from sys.dm_exec_query_stats, allowing you to analyze query performance patterns and identify optimization opportunities. You can filter results by database, creation time, or last execution time to focus on specific time periods or problematic queries. This eliminates the need to manually capture plans during query execution or dig through plan cache DMVs.  
  
Thanks to  
https://www.simple-talk.com/sql/t-sql-programming/dmvs-for-query-plan-metadata/  
and  
http://www.scarydba.com/2017/02/13/export-plans-cache-sqlplan-file/  
for the idea and query.

## Syntax

```powershell
Export-DbaExecutionPlan
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Export-DbaExecutionPlan -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-Path <String>]
    [-SinceCreation <DateTime>]
    [-SinceLastExecution <DateTime>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Export-DbaExecutionPlan
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-Path <String>]
    -InputObject <Object[]>
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
PS C:\> Export-DbaExecutionPlan -SqlInstance sqlserver2014a -Path C:\Temp
```
{: data-copyable="true" data-clean-code="Export-DbaExecutionPlan -SqlInstance sqlserver2014a -Path C:\Temp" }

Exports all execution plans for sqlserver2014a. Files saved in to C:\Temp<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaExecutionPlan -SqlInstance sqlserver2014a -Database db1, db2 -SinceLastExecution '2016-07-01 10:47:00' -Path C:\Temp
```
{: data-copyable="true" data-clean-code="Export-DbaExecutionPlan -SqlInstance sqlserver2014a -Database db1, db2 -SinceLastExecution '2016-07-01 10:47:00' -Path C:\Temp" }

Exports all execution plans for databases db1 and db2 on sqlserver2014a since July 1, 2016 at 10:47 AM. Files saved in to C:\Temp<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sqlserver2014a | Export-DbaExecutionPlan -Path C:\Temp
```
{: data-copyable="true" data-clean-code="Get-DbaExecutionPlan -SqlInstance sqlserver2014a | Export-DbaExecutionPlan -Path C:\Temp" }

Gets all execution plans for sqlserver2014a. Using Pipeline exports them all to C:\Temp<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sqlserver2014a | Export-DbaExecutionPlan -Path C:\Temp -WhatIf
```
{: data-copyable="true" data-clean-code="Get-DbaExecutionPlan -SqlInstance sqlserver2014a | Export-DbaExecutionPlan -Path C:\Temp -WhatIf" }

Gets all execution plans for sqlserver2014a. Then shows what would happen if the results where piped to Export-DbaExecutionPlan<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts execution plan objects from the pipeline, typically from Get-DbaExecutionPlan.  
Use this when you want to filter or process plans with Get-DbaExecutionPlan first, then export specific results.  
Allows for more complex filtering scenarios before exporting plans to files.

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

Specifies which databases to export execution plans from. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases instead of analyzing plans from all databases on the instance.  
Helps reduce output volume and processing time when troubleshooting database-specific performance issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to exclude from execution plan export. Accepts wildcards for pattern matching.  
Use this to skip system databases or databases that are known to be performing well when doing instance-wide plan analysis.  
Common exclusions include tempdb, model, or development databases that don't need performance review.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory path where .sqlplan files will be saved. Defaults to the dbatools export configuration path.  
Files are named using a pattern that includes instance name, database, query position, and SQL handle for easy identification.  
Ensure the path exists and has sufficient space, as large plan caches can generate hundreds of files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -SinceCreation

Filters execution plans to only include those created after the specified date and time.  
Use this when investigating performance issues that started after a specific deployment, configuration change, or known incident.  
Helps focus analysis on recently compiled plans rather than older cached plans that may no longer be relevant.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SinceLastExecution

Filters execution plans to only include those last executed after the specified date and time.  
Use this when you want to analyze only actively used plans rather than stale plans sitting in cache.  
Particularly useful for identifying currently problematic queries during active performance issues or recent workload changes.

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
