---
title: "Get-DbaMemoryCondition"
slug: "Get-DbaMemoryCondition"
date: 2024-01-01
layout: "single"
author: "IJeb Reitsma"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves memory pressure notifications and utilization metrics from SQL Server resource monitor ring buffers."
tags:
  - "Memory"
  - "General"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMemoryCondition.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaMemoryCondition"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaMemoryCondition</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMemoryCondition.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>IJeb Reitsma</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves memory pressure notifications and utilization metrics from SQL Server resource monitor ring buffers.

## Description

Analyzes SQL Server's internal resource monitor ring buffers to identify memory pressure events and track memory utilization over time. This helps DBAs diagnose performance issues caused by insufficient memory, excessive paging, or memory pressure conditions that trigger automatic memory adjustments.  
  
The function returns detailed memory statistics including physical memory usage, page file utilization, virtual address space consumption, and SQL Server-specific memory allocation metrics. Each record includes the exact timestamp when memory conditions were recorded, making it valuable for correlating memory pressure with performance degradation during specific time periods.  
  
This command is based on a query provided by Microsoft support and queries the sys.dm_os_ring_buffers DMV to extract resource monitor notifications.  
Reference KB article: https://support.microsoft.com/en-us/help/918483/how-to-reduce-paging-of-buffer-pool-memory-in-the-64-bit-version-of-sq

## Syntax

```powershell
Get-DbaMemoryCondition
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaMemoryCondition -SqlInstance sqlserver2014a
```
{: data-copyable="true" data-clean-code="Get-DbaMemoryCondition -SqlInstance sqlserver2014a" }

Returns the memory conditions for the selected instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -Group GroupName | Get-DbaMemoryCondition | Out-GridView
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sqlserver2014a -Group GroupName | Get-DbaMemoryCondition | Out-GridView" }

Returns the memory conditions for a group of servers from SQL Server Central Management Server (CMS). Send output to GridView.<br>

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
For MFA support, please use Connect-DbaInstance..

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
