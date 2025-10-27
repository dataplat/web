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

# Get-DbaMemoryCondition

| Property | Value |
| --- | --- |
| **Author** | IJeb Reitsma |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaMemoryCondition](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMemoryCondition.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaMemoryCondition](https://dataplat.github.io/boh#Get-DbaMemoryCondition).

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

Returns the memory conditions for the selected instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -Group GroupName | Get-DbaMemoryCondition | Out-GridView
```

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
