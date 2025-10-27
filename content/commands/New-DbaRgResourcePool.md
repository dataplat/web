---
title: "New-DbaRgResourcePool"
slug: "New-DbaRgResourcePool"
date: 2024-01-01
layout: "single"
author: "John McCall (@lowlydba), lowlydba.com"
availability: "Windows, Linux, macOS"
synopsis: "Creates a Resource Governor resource pool to control CPU, memory, and I/O allocation for SQL Server workloads."
tags:
  - "ResourcePool"
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaRgResourcePool.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaRgResourcePool"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaRgResourcePool</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaRgResourcePool.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates a Resource Governor resource pool to control CPU, memory, and I/O allocation for SQL Server workloads.

## Description

Creates a new Resource Governor resource pool that defines specific limits for CPU, memory, and I/O resources on a SQL Server instance.  
Resource pools let you isolate different workloads by setting minimum and maximum thresholds for system resources, preventing one application from consuming all server resources.  
Supports both Internal pools (for SQL Server workloads) and External pools (for external processes like R Services).  
The Resource Governor is automatically reconfigured after pool creation unless you specify otherwise.

## Syntax

```powershell
New-DbaRgResourcePool -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-ResourcePool <String[]>]
    [-Type <String>]
    [-MaximumCpuPercentage <Int32>]
    [-MaximumMemoryPercentage <Int32>]
    [-SkipReconfigure]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

New-DbaRgResourcePool -SqlInstance <DbaInstanceParameter[]>
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
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

New-DbaRgResourcePool -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-ResourcePool <String[]>]
    [-Type <String>]
    [-MaximumCpuPercentage <Int32>]
    [-MaximumMemoryPercentage <Int32>]
    [-MaximumProcesses <Int32>]
    [-SkipReconfigure]
    [-Force]
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
PS C:\> New-DbaRgResourcePool -SqlInstance sql2016 -ResourcePool "poolAdmin"
```
{: data-copyable="true" data-clean-code="New-DbaRgResourcePool -SqlInstance sql2016 -ResourcePool &quot;poolAdmin&quot;" }

Creates a new resource pool named "poolAdmin" for the instance sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaRgResourcePool -SqlInstance sql2012\dev1 -ResourcePool "poolDeveloper" -SkipReconfigure
```
{: data-copyable="true" data-clean-code="New-DbaRgResourcePool -SqlInstance sql2012\dev1 -ResourcePool &quot;poolDeveloper&quot; -SkipReconfigure" }

Creates a new resource pool named "poolDeveloper" for the instance dev1 on sq2012.<br>
Reconfiguration is skipped and the Resource Governor will not be able to use the new resource pool<br>
until it is reconfigured.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue, ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Credential object used to connect to the Windows server as a different user

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ResourcePool

Specifies the name of the resource pool to create. Pool names must be unique within the Resource Governor configuration.  
Use descriptive names that indicate the workload type, like 'ReportingPool' or 'BatchProcessingPool' for easier management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies whether to create an Internal pool for SQL Server workloads or External pool for external processes like R Services.  
Internal pools control database workloads, while External pools manage machine learning and external script execution resources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Internal |
| Accepted Values | Internal,External |

##### -MinimumCpuPercentage

Sets the guaranteed minimum CPU percentage reserved for this pool during CPU contention. Ranges from 0-100, defaults to 0.  
Use this to ensure critical workloads always get their required CPU resources, even when the server is under heavy load.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaximumCpuPercentage

Sets the maximum CPU percentage this pool can consume during CPU contention. Ranges from 1-100, defaults to 100.  
Use this to prevent runaway queries or resource-intensive workloads from monopolizing server CPU resources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100 |

##### -CapCpuPercentage

Creates an absolute hard limit on CPU usage that cannot be exceeded, regardless of available CPU capacity. Ranges from 1-100, defaults to 100.  
Unlike MaximumCpuPercentage, this enforces the limit even when CPU resources are idle. Requires SQL Server 2012 or later.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100 |

##### -MinimumMemoryPercentage

Reserves a minimum percentage of server memory exclusively for this pool that cannot be shared with other pools. Ranges from 0-100, defaults to 0.  
Use this to guarantee memory allocation for critical workloads that require consistent memory availability.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaximumMemoryPercentage

Sets the maximum percentage of total server memory this pool can consume. Ranges from 1-100, defaults to 100.  
Use this to prevent memory-intensive operations from consuming all available server memory and affecting other workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100 |

##### -MinimumIOPSPerVolume

Reserves a minimum number of IOPS per disk volume exclusively for this pool. Defaults to 0 (unlimited).  
Use this to guarantee disk I/O performance for workloads that require consistent data access speeds, such as OLTP systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaximumIOPSPerVolume

Limits the maximum IOPS per disk volume that this pool can consume. Defaults to 0 (unlimited).  
Use this to prevent I/O-intensive workloads like batch processing or reporting from saturating disk subsystems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaximumProcesses

Sets the maximum number of external processes allowed to run concurrently in this External pool. Specify 0 for unlimited.  
Use this to control how many R or Python scripts can execute simultaneously, preventing external processes from overwhelming the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SkipReconfigure

Skips the automatic Resource Governor reconfiguration that makes the new pool active immediately after creation.  
Use this when creating multiple pools in succession to avoid repeated reconfigurations, then manually reconfigure once at the end.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Automatically drops and recreates the resource pool if it already exists with the same name.  
Use this when you need to update an existing pool's configuration or ensure a clean pool creation.

| Property | Value |
| --- | --- |
| Alias |  |
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
