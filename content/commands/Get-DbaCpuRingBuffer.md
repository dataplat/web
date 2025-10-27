---
title: "Get-DbaCpuRingBuffer"
slug: "Get-DbaCpuRingBuffer"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves historical CPU utilization data from SQL Server's internal ring buffer for performance analysis"
tags:
  - "Diagnostic"
  - "Buffer"
  - "CPU"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCpuRingBuffer.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaCpuRingBuffer"
draft: false
---

# Get-DbaCpuRingBuffer

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaCpuRingBuffer](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCpuRingBuffer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaCpuRingBuffer](https://dataplat.github.io/boh#Get-DbaCpuRingBuffer).

## Synopsis

Retrieves historical CPU utilization data from SQL Server's internal ring buffer for performance analysis

## Description

This command queries sys.dm_os_ring_buffers to extract detailed CPU utilization history for performance troubleshooting and capacity planning. Based on Glen Berry's diagnostic query, it provides minute-by-minute CPU usage breakdowns that help identify performance patterns and resource contention.  
  
The ring buffer stores CPU utilization data in one-minute increments for up to 256 minutes, tracking three key metrics: SQL Server process utilization, other processes utilization, and system idle time. This historical data is invaluable when investigating performance issues, establishing baselines, or determining if high CPU usage originates from SQL Server or other system processes.  
  
Use this function to analyze CPU trends during specific time periods, correlate CPU spikes with application events, or gather evidence for capacity planning decisions without requiring external monitoring tools.  
  
Reference: https://www.sqlskills.com/blogs/glenn/sql-server-diagnostic-information-queries-detailed-day-16//

## Syntax

```powershell
Get-DbaCpuRingBuffer
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-CollectionMinutes] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaCpuRingBuffer -SqlInstance sql2008, sqlserver2012
```

Gets CPU Statistics from sys.dm_os_ring_buffers for servers sql2008 and sqlserver2012 for last 60 minutes.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCpuRingBuffer -SqlInstance sql2008 -CollectionMinutes 240
```

Gets CPU Statistics from sys.dm_os_ring_buffers for server sql2008 for last 240 minutes<br>

#####  Example:  3 

```powershell
PS C:\> $output = Get-DbaCpuRingBuffer -SqlInstance sql2008 -CollectionMinutes 240 | Select-Object * | ConvertTo-DbaDataTable
```

Gets CPU Statistics from sys.dm_os_ring_buffers for server sql2008 for last 240 minutes into a Data Table.<br>

#####  Example:  4 

```powershell
PS C:\> 'sql2008','sql2012' | Get-DbaCpuRingBuffer
```

Gets CPU Statistics from sys.dm_os_ring_buffers for servers sql2008 and sqlserver2012<br>

#####  Example:  5 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaCpuRingBuffer -SqlInstance sql2008 -SqlCredential $cred
```

Connects using sqladmin credential and returns CPU Statistics from sys.dm_os_ring_buffers from sql2008<br>

### Required Parameters

##### -SqlInstance

Allows you to specify a comma separated list of servers to query.

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
For MFA support, please use Connect-DbaInstance. To use:  
$cred = Get-Credential, this pass this $cred to the param.  
Windows Authentication will be used if DestinationSqlCredential is not specified. To connect as a different Windows user, run PowerShell as that user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CollectionMinutes

Specifies how many minutes of historical CPU data to retrieve from the ring buffer. Defaults to 60 minutes.  
Use this to extend the analysis window when investigating longer-term CPU trends or to focus on recent activity with shorter periods. Maximum available history is typically 256 minutes depending on   
system activity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 60 |

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
