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

# Set-DbaRgResourcePool

| Property | Value |
| --- | --- |
| **Author** | John McCall (@lowlydba), lowlydba.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaRgResourcePool](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaRgResourcePool.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaRgResourcePool](https://dataplat.github.io/boh#Set-DbaRgResourcePool).

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

Configures a resource pool named "poolAdmin" for the instance sql2016 with a Maximum CPU Percent of 5.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaRgResourcePool-SqlInstance sql2012\dev1 -ResourcePool "poolDeveloper" -SkipReconfigure
```

Configures a resource pool named "poolDeveloper" for the instance dev1 on sq2012.<br>
Reconfiguration is skipped and the Resource Governor will not be able to use the new resource pool<br>
until it is reconfigured.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRgResourcePool -SqlInstance sql2016 -Type "Internal" | Where-Object { $_.IsSystemObject -eq $false } | Set-DbaRgResourcePool -MinMemoryPercent 10
```

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
