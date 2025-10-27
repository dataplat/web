---
title: "Set-DbaRgResourcePool"
slug: "Set-DbaRgResourcePool"
date: 2024-01-01
layout: "single"
author: "John McCall (@lowlydba), lowlydba.com"
availability: "Windows, Linux, macOS"
synopsis: "Modifies CPU, memory, and IOPS limits for existing SQL Server Resource Governor pools."
tags:
  - "ResourcePool"
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaRgResourcePool.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaRgResourcePool"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaRgResourcePool</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaRgResourcePool.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>John McCall (@lowlydba), lowlydba.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Modifies CPU, memory, and IOPS limits for existing SQL Server Resource Governor pools.

## Description

Modifies resource allocation settings for existing Resource Governor pools to control how much CPU, memory, and disk I/O different workloads can consume.  
This lets you adjust performance limits after analyzing workload patterns or when server capacity changes.  
Works with both internal pools (for SQL Server queries) and external pools (for R Services, Python, or other external processes).  
The Resource Governor is automatically reconfigured to apply changes immediately unless you skip reconfiguration.

## Syntax

```powershell
Set-DbaRgResourcePool
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-ResourcePool <String[]>]
    [-Type <String>]
    [-MinimumCpuPercentage <Int32>]
    [-MaximumCpuPercentage <Int32>]
    [-CapCpuPercentage <Int32>]
    [-MinimumMemoryPercentage <Int32>]
    [-MaximumMemoryPercentage <Int32>]
    [-MinimumIOPSPerVolume <Int32>]
    [-MaximumIOPSPerVolume <Int32>]
    [-SkipReconfigure]
    [-InputObject <Object[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaRgResourcePool
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-ResourcePool <String[]>]
    [-Type <String>]
    [-MinimumCpuPercentage <Int32>]
    [-MaximumCpuPercentage <Int32>]
    [-CapCpuPercentage <Int32>]
    [-MinimumMemoryPercentage <Int32>]
    [-MaximumMemoryPercentage <Int32>]
    [-MinimumIOPSPerVolume <Int32>]
    [-MaximumIOPSPerVolume <Int32>]
    [-SkipReconfigure]
    [-InputObject <Object[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaRgResourcePool
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-ResourcePool <String[]>]
    [-Type <String>]
    [-MinimumCpuPercentage <Int32>]
    [-MaximumCpuPercentage <Int32>]
    [-CapCpuPercentage <Int32>]
    [-MinimumMemoryPercentage <Int32>]
    [-MaximumMemoryPercentage <Int32>]
    [-MinimumIOPSPerVolume <Int32>]
    [-MaximumIOPSPerVolume <Int32>]
    [-MaximumProcesses <Int32>]
    [-SkipReconfigure]
    [-InputObject <Object[]>]
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
PS C:\> Set-DbaRgResourcePool-SqlInstance sql2016 -ResourcePool "poolAdmin" -MaximumCpuPercentage 5
```
{: data-copyable="true" data-clean-code="Set-DbaRgResourcePool-SqlInstance sql2016 -ResourcePool &quot;poolAdmin&quot; -MaximumCpuPercentage 5" }

Configures a resource pool named "poolAdmin" for the instance sql2016 with a Maximum CPU Percent of 5.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaRgResourcePool-SqlInstance sql2012\dev1 -ResourcePool "poolDeveloper" -SkipReconfigure
```
{: data-copyable="true" data-clean-code="Set-DbaRgResourcePool-SqlInstance sql2012\dev1 -ResourcePool &quot;poolDeveloper&quot; -SkipReconfigure" }

Configures a resource pool named "poolDeveloper" for the instance dev1 on sq2012.<br>
Reconfiguration is skipped and the Resource Governor will not be able to use the new resource pool<br>
until it is reconfigured.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRgResourcePool -SqlInstance sql2016 -Type "Internal" | Where-Object { $_.IsSystemObject -eq $false } | Set-DbaRgResourcePool -MinMemoryPercent 10
```
{: data-copyable="true" data-clean-code="Get-DbaRgResourcePool -SqlInstance sql2016 -Type &quot;Internal&quot; | Where-Object { $_.IsSystemObject -eq $false } | Set-DbaRgResourcePool -MinMemoryPercent 10" }

Configures all user internal resource pools to have a minimum memory percent of 10<br>
for the instance sql2016 by piping output from Get-DbaRgResourcePool.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue, ByPropertyName) |
| Default Value |  |

##### -SqlCredential

Credential object used to connect to the Windows server as a different user

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ResourcePool

Specifies the name of the existing resource pool to modify.  
Use this to target specific pools like 'poolAdmin' or 'poolDeveloper' when you need to adjust their resource limits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies whether to modify Internal or External resource pools.  
Internal pools control SQL Server queries and connections, while External pools manage R Services, Python, or other external processes.  
Defaults to Internal if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Internal |
| Accepted Values | Internal,External |

##### -MinimumCpuPercentage

Sets the guaranteed minimum CPU percentage (0-100) that this pool will always receive during CPU contention.  
Use this to ensure critical workloads get sufficient CPU even when the server is busy.  
For example, set to 20 to guarantee a pool always gets at least 20% of available CPU.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | 0 |

##### -MaximumCpuPercentage

Sets the maximum CPU percentage (1-100) that this pool can consume during CPU contention.  
Use this to prevent runaway queries from monopolizing CPU resources.  
For example, set to 30 to limit a development pool to 30% of available CPU.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | 0 |

##### -CapCpuPercentage

Sets an absolute hard cap (1-100) on CPU usage that cannot be exceeded even when CPU is available.  
Unlike MaximumCpuPercentage, this limit applies regardless of server load or contention.  
Only available on SQL Server 2012 and later. Use this for strict resource isolation requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | 0 |

##### -MinimumMemoryPercentage

Sets the minimum memory percentage (0-100) that is reserved exclusively for this pool and cannot be shared.  
Use this to guarantee memory for critical workloads that must have dedicated memory allocation.  
For example, set to 15 to ensure a production pool always has at least 15% of server memory reserved.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | 0 |

##### -MaximumMemoryPercentage

Sets the maximum memory percentage (1-100) that this pool can consume from total server memory.  
Use this to prevent memory-intensive workloads from consuming all available memory.  
Defaults to 100, meaning no memory restrictions. Set lower values like 50 to limit pool memory usage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | 0 |

##### -MinimumIOPSPerVolume

Sets the minimum guaranteed IOPS per disk volume that this pool will receive during I/O contention.  
Use this to ensure critical workloads get sufficient disk I/O performance even when storage is busy.  
For example, set to 1000 to guarantee at least 1000 IOPS per volume for a production pool.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | 0 |

##### -MaximumIOPSPerVolume

Sets the maximum IOPS per disk volume that this pool can consume during I/O operations.  
Use this to prevent I/O-intensive workloads from overwhelming disk subsystems and affecting other pools.  
For example, set to 5000 to limit a reporting pool to 5000 IOPS per volume.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | 0 |

##### -MaximumProcesses

Sets the maximum number of external processes allowed in this external resource pool.  
Only applies to External pool types used for R Services, Python, or other external runtime processes.  
Set to 0 for unlimited processes (limited only by server resources), or specify a number like 10 to restrict concurrent external processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SkipReconfigure

Prevents automatic reconfiguration of the Resource Governor after making pool changes.  
Use this when making multiple pool modifications and you want to reconfigure manually later.  
Without reconfiguration, your pool changes won't take effect until you manually reconfigure the Resource Governor.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts resource pool objects piped from Get-DbaRgResourcePool for bulk modifications.  
Use this to modify multiple pools at once by piping them from Get-DbaRgResourcePool.  
Eliminates the need to specify SqlInstance and ResourcePool parameters when working with existing pool objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
