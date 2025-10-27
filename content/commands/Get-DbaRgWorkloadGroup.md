---
title: "Get-DbaRgWorkloadGroup"
slug: "Get-DbaRgWorkloadGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Resource Governor workload groups from SQL Server instances"
tags:
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRgWorkloadGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRgWorkloadGroup"
draft: false
---

# Get-DbaRgWorkloadGroup

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRgWorkloadGroup](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRgWorkloadGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRgWorkloadGroup](https://dataplat.github.io/boh#Get-DbaRgWorkloadGroup).

## Synopsis

Retrieves Resource Governor workload groups from SQL Server instances

## Description

Retrieves Resource Governor workload groups along with their configuration settings including CPU limits, memory grants, and parallelism controls. Workload groups define how resource requests are classified and managed within resource pools, allowing DBAs to control resource consumption for different types of workloads. This function is essential for monitoring and troubleshooting Resource Governor configurations to ensure optimal performance isolation between competing workloads.

## Syntax

```powershell
Get-DbaRgWorkloadGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <ResourcePool[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRgWorkloadGroup -SqlInstance sql2017
```

Gets the workload groups on sql2017<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaResourceGovernor -SqlInstance sql2017 | Get-DbaRgResourcePool | Get-DbaRgWorkloadGroup
```

Gets the workload groups on sql2017<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts resource pool objects from Get-DbaRgResourcePool to retrieve workload groups from specific pools only.  
Use this to filter workload groups when you need to examine groups within particular resource pools instead of all workload groups across the instance.

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


&nbsp;
