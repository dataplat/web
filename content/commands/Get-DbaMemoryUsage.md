---
title: "Get-DbaMemoryUsage"
slug: "Get-DbaMemoryUsage"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Collects memory usage statistics from all SQL Server services using Windows performance counters"
tags:
  - "Management"
  - "OS"
  - "Memory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMemoryUsage.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaMemoryUsage"
draft: false
---

# Get-DbaMemoryUsage

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaMemoryUsage](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMemoryUsage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaMemoryUsage](https://dataplat.github.io/boh#Get-DbaMemoryUsage).

## Synopsis

Collects memory usage statistics from all SQL Server services using Windows performance counters

## Description

Collects detailed memory usage from SQL Server Database Engine, Analysis Services (SSAS), and Integration Services (SSIS) using Windows performance counters. This helps you troubleshoot memory pressure issues and understand how memory is allocated across different SQL Server components on the same server.  
  
Gathers counters from Memory Manager (server memory, connection memory, lock memory), Plan Cache (procedure plans, ad-hoc plans), Buffer Manager (total pages, free pages, stolen pages), and service-specific memory usage. Each result shows the counter name, instance, page count where applicable, and memory in both KB and MB.  
  
SSRS does not have memory counters, only memory shrinks and memory pressure state.  
  
This function requires local admin role on the targeted computers.

## Syntax

```powershell
Get-DbaMemoryUsage
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-MemoryCounterRegex] <String>]
    [[-PlanCounterRegex] <String>]
    [[-BufferCounterRegex] <String>]
    [[-SSASCounterRegex] <String>]
    [[-SSISCounterRegex] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaMemoryUsage -ComputerName sql2017
```

Returns a custom object displaying Server, counter instance, counter, number of pages, memory<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaMemoryUsage -ComputerName sql2017\sqlexpress -SqlCredential sqladmin | Where-Object { $_.Memory.Megabyte -gt 100 }
```

Logs into the sql2017\sqlexpress as sqladmin using SQL Authentication then returns results only where memory exceeds 100 MB<br>

#####  Example:  3 

```powershell
PS C:\> $servers | Get-DbaMemoryUsage | Out-Gridview
```

Gets results from an array of $servers then diplays them in a gridview.<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows server to collect memory usage statistics from. Returns data for all SQL Server instances on the server.  
Use this when you need to monitor memory usage across multiple instances on a single server or compare memory allocation between different servers.

| Property | Value |
| --- | --- |
| Alias | Host,cn,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MemoryCounterRegex

Filters which SQL Server Memory Manager counters to collect using a regular expression pattern. Controls memory allocation tracking for server memory, connections, locks, cache, optimizer, and   
workspace usage.  
Customize this when you need specific memory counters or when working with non-English SQL Server installations where counter names are localized.  
Default pattern captures the most critical memory allocation counters that DBAs monitor for memory pressure troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Total Server Memory |Target Server Memory |Connection Memory |Lock Memory |SQL Cache Memory |Optimizer Memory |Granted Workspace Memory |Cursor memory usage|Maximum Workspace) |

##### -PlanCounterRegex

Filters which SQL Server Plan Cache counters to collect using a regular expression pattern. Tracks memory usage for cached execution plans including stored procedures, ad-hoc queries, and prepared   
statements.  
Use this to focus on specific plan cache types when investigating plan cache bloat or when working with non-English SQL Server installations.  
Default pattern captures all major plan cache memory consumers that affect query performance and memory allocation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (cache pages|procedure plan|ad hoc sql plan|prepared SQL Plan) |

##### -BufferCounterRegex

Filters which SQL Server Buffer Manager counters to collect using a regular expression pattern. Monitors buffer pool memory usage including data pages, free pages, stolen pages, and buffer pool   
extensions.  
Modify this when troubleshooting specific buffer pool issues or working with non-English SQL Server installations where counter names are translated.  
Default pattern includes essential buffer pool metrics that indicate memory pressure and buffer pool health.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Free pages|Reserved pages|Stolen pages|Total pages|Database pages|target pages|extension .* pages) |

##### -SSASCounterRegex

Filters which SQL Server Analysis Services (SSAS) memory counters to collect using a regular expression pattern. Tracks memory consumption for SSAS instances and processing operations.  
Customize this when monitoring specific SSAS memory usage patterns or working with non-English installations where SSAS counter names are localized.  
Use when troubleshooting SSAS memory issues or when SSAS and Database Engine compete for server memory resources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (\\memory ) |

##### -SSISCounterRegex

Filters which SQL Server Integration Services (SSIS) memory counters to collect using a regular expression pattern. Monitors memory usage for SSIS package execution and service operations.  
Adjust this when investigating SSIS memory consumption during ETL operations or working with non-English installations where SSIS counter names are translated.  
Useful for identifying memory bottlenecks in SSIS packages or when multiple SQL Server services compete for available memory.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (memory) |

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
