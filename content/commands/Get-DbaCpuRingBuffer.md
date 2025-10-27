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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaCpuRingBuffer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCpuRingBuffer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Patrick Flynn (@sqllensman)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaCpuRingBuffer -SqlInstance sql2008, sqlserver2012" }

Gets CPU Statistics from sys.dm_os_ring_buffers for servers sql2008 and sqlserver2012 for last 60 minutes.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCpuRingBuffer -SqlInstance sql2008 -CollectionMinutes 240
```
{: data-copyable="true" data-clean-code="Get-DbaCpuRingBuffer -SqlInstance sql2008 -CollectionMinutes 240" }

Gets CPU Statistics from sys.dm_os_ring_buffers for server sql2008 for last 240 minutes<br>

#####  Example:  3 

```powershell
PS C:\> $output = Get-DbaCpuRingBuffer -SqlInstance sql2008 -CollectionMinutes 240 | Select-Object * | ConvertTo-DbaDataTable
```
{: data-copyable="true" data-clean-code="$output = Get-DbaCpuRingBuffer -SqlInstance sql2008 -CollectionMinutes 240 | Select-Object * | ConvertTo-DbaDataTable" }

Gets CPU Statistics from sys.dm_os_ring_buffers for server sql2008 for last 240 minutes into a Data Table.<br>

#####  Example:  4 

```powershell
PS C:\> 'sql2008','sql2012' | Get-DbaCpuRingBuffer
```
{: data-copyable="true" data-clean-code="'sql2008','sql2012' | Get-DbaCpuRingBuffer" }

Gets CPU Statistics from sys.dm_os_ring_buffers for servers sql2008 and sqlserver2012<br>

#####  Example:  5 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaCpuRingBuffer -SqlInstance sql2008 -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Get-DbaCpuRingBuffer -SqlInstance sql2008 -SqlCredential $cred" }

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
