---
title: "Set-DbaRgWorkloadGroup"
slug: "Set-DbaRgWorkloadGroup"
date: 2024-01-01
layout: "single"
author: "John McCall (@lowlydba), lowlydba.com"
availability: "Windows, Linux, macOS"
synopsis: "Modifies Resource Governor workload group settings to control query resource consumption and limits."
tags:
  - "ResourcePool"
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaRgWorkloadGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaRgWorkloadGroup"
draft: false
---

# Set-DbaRgWorkloadGroup

| Property | Value |
| --- | --- |
| **Author** | John McCall (@lowlydba), lowlydba.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaRgWorkloadGroup](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaRgWorkloadGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaRgWorkloadGroup](https://dataplat.github.io/boh#Set-DbaRgWorkloadGroup).

## Synopsis

Modifies Resource Governor workload group settings to control query resource consumption and limits.

## Description

Modifies configuration settings for Resource Governor workload groups, which control how SQL Server allocates CPU, memory, and parallelism resources to different categories of queries and connections.  
Use this function to adjust resource limits for specific workload groups when you need to prioritize critical applications, limit resource-hungry queries, or enforce service level agreements through resource allocation policies.  
Changes automatically trigger a Resource Governor reconfiguration unless skipped, and plan-affecting settings only apply to new query plans after clearing the procedure cache.  
Supports both internal resource pools (standard workloads) and external resource pools (R/Python integration scenarios).

## Syntax

```powershell
Set-DbaRgWorkloadGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-WorkloadGroup] <String[]>]
    [[-ResourcePool] <String>]
    [[-ResourcePoolType] <String>]
    [[-Importance] <String>]
    [[-RequestMaximumMemoryGrantPercentage] <Int32>]
    [[-RequestMaximumCpuTimeInSeconds] <Int32>]
    [[-RequestMemoryGrantTimeoutInSeconds] <Int32>]
    [[-MaximumDegreeOfParallelism] <Int32>]
    [[-GroupMaximumRequests] <Int32>]
    [-SkipReconfigure]
    [[-InputObject] <WorkloadGroup[]>]
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
PS C:\> Set-DbaRgWorkloadGroup -SqlInstance sql2016 -WorkloadGroup "groupAdmin" -ResourcePool "poolAdmin"
```

Configures a workload group named "groupAdmin" in the resource pool "poolAdmin" for the instance sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRgWorkloadGroup | Where-Object Name -eq "groupSuperUsers" | Set-DbaRgWorkloadGroup -GroupMaximumRequests 2
```

Configures a workload group named "groupSuperUsers" by setting the maximum number of group requests to 2 for the instance sql2016.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Credential object used to connect to the Windows server as a different user

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WorkloadGroup

Name of the specific workload group to modify within the resource pool.  
Use this to target individual workload groups when you need to adjust resource limits for specific application categories or user groups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ResourcePool

Name of the resource pool that contains the workload group to be modified.  
Required when specifying WorkloadGroup by name rather than piping from Get-DbaRgWorkloadGroup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ResourcePoolType

Specifies whether to target Internal resource pools (standard SQL workloads) or External resource pools (R/Python integration scenarios).  
Choose Internal for typical database workloads, or External when managing Machine Learning Services resource allocation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Internal,External |

##### -Importance

Sets the relative priority level for requests within this workload group compared to other groups in the same resource pool.  
Use HIGH for critical business applications, MEDIUM for standard workloads, or LOW for background processes that can tolerate delays.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | LOW,MEDIUM,HIGH |

##### -RequestMaximumMemoryGrantPercentage

Sets the maximum percentage of the resource pool's memory that any single query can request for operations like sorting and hashing.  
Values range from 1-100 percent. Use lower values to prevent single queries from monopolizing memory resources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RequestMaximumCpuTimeInSeconds

Defines the maximum CPU time in seconds that any single request can consume before being terminated.  
Set this to prevent runaway queries from consuming excessive CPU resources. Use 0 for unlimited CPU time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RequestMemoryGrantTimeoutInSeconds

Sets how long queries can wait for memory grants before timing out with insufficient memory errors.  
Increase this for environments with heavy memory contention, or decrease to fail fast when memory is unavailable.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaximumDegreeOfParallelism

Controls the maximum number of parallel processors that queries in this workload group can use.  
Override the server-level MAXDOP setting for specific workload groups to optimize resource allocation based on workload characteristics.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -GroupMaximumRequests

Limits the total number of concurrent requests that can execute simultaneously within this workload group.  
Use this to prevent resource pool saturation by limiting how many queries from this group can run at once.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SkipReconfigure

Prevents automatic Resource Governor reconfiguration after making workload group changes.  
Use this when making multiple configuration changes and you want to reconfigure manually once at the end to minimize disruption.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts workload group objects piped from Get-DbaRgWorkloadGroup for bulk configuration operations.  
Allows you to modify multiple workload groups across different instances in a single pipeline operation.

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
