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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaRgWorkloadGroup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaRgWorkloadGroup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Set-DbaRgWorkloadGroup -SqlInstance sql2016 -WorkloadGroup &quot;groupAdmin&quot; -ResourcePool &quot;poolAdmin&quot;" }

Configures a workload group named "groupAdmin" in the resource pool "poolAdmin" for the instance sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRgWorkloadGroup | Where-Object Name -eq "groupSuperUsers" | Set-DbaRgWorkloadGroup -GroupMaximumRequests 2
```
{: data-copyable="true" data-clean-code="Get-DbaRgWorkloadGroup | Where-Object Name -eq &quot;groupSuperUsers&quot; | Set-DbaRgWorkloadGroup -GroupMaximumRequests 2" }

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
