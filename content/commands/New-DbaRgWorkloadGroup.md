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

# New-DbaRgWorkloadGroup

| Property | Value |
| --- | --- |
| **Author** | John McCall (@lowlydba), lowlydba.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaRgWorkloadGroup](https://github.com/dataplat/dbatools/blob/master/public/New-DbaRgWorkloadGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaRgWorkloadGroup](https://dataplat.github.io/boh#New-DbaRgWorkloadGroup).

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

Creates a workload group "groupAdmin" in the resource pool named "poolAdmin" for the instance sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaRgWorkloadGroup -SqlInstance sql2016 -WorkloadGroup "groupAdmin" -Force
```

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
