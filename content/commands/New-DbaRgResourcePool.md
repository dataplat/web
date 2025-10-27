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

# New-DbaRgResourcePool

| Property | Value |
| --- | --- |
| **Author** | John McCall (@lowlydba), lowlydba.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaRgResourcePool](https://github.com/dataplat/dbatools/blob/master/public/New-DbaRgResourcePool.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaRgResourcePool](https://dataplat.github.io/boh#New-DbaRgResourcePool).

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

Creates a new resource pool named "poolAdmin" for the instance sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaRgResourcePool -SqlInstance sql2012\dev1 -ResourcePool "poolDeveloper" -SkipReconfigure
```

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
