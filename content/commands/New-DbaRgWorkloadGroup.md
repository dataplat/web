---
title: "New-DbaRgWorkloadGroup"
slug: "New-DbaRgWorkloadGroup"
date: 2024-01-01
layout: "single"
author: "John McCall (@lowlydba), lowlydba.com"
availability: "Windows, Linux, macOS"
synopsis: "Creates a Resource Governor workload group within a specified resource pool to control SQL Server resource allocation."
tags:
  - "WorkloadGroup"
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaRgWorkloadGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaRgWorkloadGroup"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaRgWorkloadGroup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaRgWorkloadGroup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates a Resource Governor workload group within a specified resource pool to control SQL Server resource allocation.

## Description

Creates a Resource Governor workload group within a specified resource pool, allowing you to define specific resource limits and priorities for different types of SQL Server workloads. Workload groups act as containers that classify incoming requests and apply resource policies like CPU time limits, memory grant percentages, and maximum degree of parallelism.  
  
This is essential for DBAs managing multi-tenant environments, mixed workloads, or systems where you need to prevent resource-intensive queries from impacting critical applications. You can create separate workload groups for reporting queries, ETL processes, application traffic, or administrative tasks, each with tailored resource constraints.  
  
The function supports both internal and external resource pools, handles existing workload group conflicts with optional force recreation, and automatically reconfigures Resource Governor to apply the changes immediately.

## Syntax

```powershell
New-DbaRgWorkloadGroup
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
PS C:\> New-DbaRgWorkloadGroup -SqlInstance sql2016 -WorkloadGroup "groupAdmin" -ResourcePool "poolAdmin"
```
{: data-copyable="true" data-clean-code="New-DbaRgWorkloadGroup -SqlInstance sql2016 -WorkloadGroup &quot;groupAdmin&quot; -ResourcePool &quot;poolAdmin&quot;" }

Creates a workload group "groupAdmin" in the resource pool named "poolAdmin" for the instance sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaRgWorkloadGroup -SqlInstance sql2016 -WorkloadGroup "groupAdmin" -Force
```
{: data-copyable="true" data-clean-code="New-DbaRgWorkloadGroup -SqlInstance sql2016 -WorkloadGroup &quot;groupAdmin&quot; -Force" }

If "groupAdmin" exists, it is dropped and re-created in the default resource pool for the instance sql2016.<br>

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
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -WorkloadGroup

Specifies the name of the workload group to create within the resource pool. Use descriptive names that reflect the workload type, like 'ReportingQueries', 'ETLProcesses', or 'AdminTasks'.  
Each workload group acts as a container for classifying requests and applying specific resource limits and priorities.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ResourcePool

Specifies which resource pool will contain the new workload group. Defaults to 'default' if not specified.  
Use this to organize workload groups within custom resource pools that have specific CPU and memory allocations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | default |

##### -ResourcePoolType

Determines whether to create the workload group in an Internal or External resource pool. Defaults to Internal.  
Use External for R/Python workloads or machine learning services; use Internal for standard SQL Server workloads like queries and stored procedures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Internal |
| Accepted Values | Internal,External |

##### -Importance

Sets the relative priority for requests in this workload group when competing for CPU resources. Defaults to MEDIUM.  
Use HIGH for critical application queries, MEDIUM for normal operations, and LOW for background tasks like maintenance or reporting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | MEDIUM |
| Accepted Values | LOW,MEDIUM,HIGH |

##### -RequestMaximumMemoryGrantPercentage

Limits how much memory any single query in this workload group can consume from the resource pool. Defaults to 25%.  
Lower this for concurrent workloads to prevent memory hogging, or increase it for data warehouse queries that need large memory grants for sorting and hashing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 25 |

##### -RequestMaximumCpuTimeInSeconds

Sets the maximum CPU time in seconds that any single request can consume before being terminated. Default of 0 means unlimited.  
Use this to prevent runaway queries from consuming excessive CPU, typically setting values between 300-3600 seconds depending on your workload requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RequestMemoryGrantTimeoutInSeconds

Defines how long a query will wait for memory grants before timing out. Default of 0 means unlimited wait time.  
Set this to prevent queries from waiting indefinitely during memory pressure, typically using values like 60-300 seconds for interactive workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaximumDegreeOfParallelism

Controls the maximum number of processors that queries in this workload group can use for parallel execution. Default of 0 uses the server's MAXDOP setting.  
Lower values prevent queries from consuming too many CPU cores, while higher values can improve performance for analytical workloads on servers with many cores.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -GroupMaximumRequests

Limits the total number of concurrent requests that can execute simultaneously within this workload group. Default of 0 means unlimited.  
Use this to control concurrency for resource-intensive workloads, preventing too many expensive queries from running at once and overwhelming the system.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SkipReconfigure

Prevents automatic reconfiguration of Resource Governor after creating the workload group. Changes won't take effect until you manually run ALTER RESOURCE GOVERNOR RECONFIGURE.  
Use this when creating multiple workload groups in a batch to avoid repeated reconfigurations, but remember to reconfigure manually afterward.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates the workload group if it already exists, applying new configuration settings.  
Use this when you need to modify an existing workload group's properties, as Resource Governor workload groups cannot be altered once created.

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
