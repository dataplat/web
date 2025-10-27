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

# Export-DbaExecutionPlan

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaExecutionPlan](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaExecutionPlan.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaExecutionPlan](https://dataplat.github.io/boh#Export-DbaExecutionPlan).

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

Exports all execution plans for sqlserver2014a. Files saved in to C:\Temp<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaExecutionPlan -SqlInstance sqlserver2014a -Database db1, db2 -SinceLastExecution '2016-07-01 10:47:00' -Path C:\Temp
```

Exports all execution plans for databases db1 and db2 on sqlserver2014a since July 1, 2016 at 10:47 AM. Files saved in to C:\Temp<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sqlserver2014a | Export-DbaExecutionPlan -Path C:\Temp
```

Gets all execution plans for sqlserver2014a. Using Pipeline exports them all to C:\Temp<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaExecutionPlan -SqlInstance sqlserver2014a | Export-DbaExecutionPlan -Path C:\Temp -WhatIf
```

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
