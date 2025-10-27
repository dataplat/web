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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaMemoryUsage</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMemoryUsage.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDBAKlaas)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaMemoryUsage -ComputerName sql2017" }

Returns a custom object displaying Server, counter instance, counter, number of pages, memory<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaMemoryUsage -ComputerName sql2017\sqlexpress -SqlCredential sqladmin | Where-Object { $_.Memory.Megabyte -gt 100 }
```
{: data-copyable="true" data-clean-code="Get-DbaMemoryUsage -ComputerName sql2017\sqlexpress -SqlCredential sqladmin | Where-Object { $_.Memory.Megabyte -gt 100 }" }

Logs into the sql2017\sqlexpress as sqladmin using SQL Authentication then returns results only where memory exceeds 100 MB<br>

#####  Example:  3 

```powershell
PS C:\> $servers | Get-DbaMemoryUsage | Out-Gridview
```
{: data-copyable="true" data-clean-code="$servers | Get-DbaMemoryUsage | Out-Gridview" }

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
