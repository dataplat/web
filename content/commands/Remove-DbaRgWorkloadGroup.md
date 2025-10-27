---
title: "Remove-DbaRgWorkloadGroup"
slug: "Remove-DbaRgWorkloadGroup"
date: 2024-01-01
layout: "single"
author: "John McCall (@lowlydba), lowlydba.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes workload groups from SQL Server Resource Governor"
tags:
  - "WorkloadGroup"
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaRgWorkloadGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaRgWorkloadGroup"
draft: false
---

# Remove-DbaRgWorkloadGroup

| Property | Value |
| --- | --- |
| **Author** | John McCall (@lowlydba), lowlydba.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaRgWorkloadGroup](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaRgWorkloadGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaRgWorkloadGroup](https://dataplat.github.io/boh#Remove-DbaRgWorkloadGroup).

## Synopsis

Removes workload groups from SQL Server Resource Governor

## Description

Removes specified workload groups from SQL Server Resource Governor and automatically reconfigures the Resource Governor so changes take effect immediately.  
Workload groups define resource allocation policies for incoming requests, and removing them eliminates those resource controls.  
Useful for cleaning up test environments, removing deprecated resource policies, or simplifying Resource Governor configurations during performance tuning.  
Works with both internal and external resource pools, and can process multiple workload groups through pipeline input from Get-DbaRgWorkloadGroup.

## Syntax

```powershell
Remove-DbaRgWorkloadGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-WorkloadGroup] <String[]>]
    [[-ResourcePool] <String>]
    [[-ResourcePoolType] <String>]
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
PS C:\> Remove-DbaRgResourcePool -SqlInstance sql2016 -WorkloadGroup "groupAdmin" -ResourcePool "poolAdmin" -ResourcePoolType Internal
```

Removes a workload group named "groupAdmin" in the "poolAdmin" resource pool for the instance sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaRgResourcePool -SqlInstance sql2016 -WorkloadGroup "groupAdmin"
```

Removes a workload group named "groupAdmin" in the default resource pool for the instance sql2016.<br>

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

Credential object used to connect to the Windows server as a different user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -WorkloadGroup

Specifies the name of the workload group(s) to remove from Resource Governor.  
Use this when you need to eliminate specific resource allocation policies or clean up deprecated workload configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ResourcePool

Specifies the resource pool containing the workload group to be removed. Defaults to "default" pool.  
Required when workload groups exist in custom resource pools rather than the default SQL Server resource pool.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | default |

##### -ResourcePoolType

Specifies whether to target Internal or External resource pools. Defaults to "Internal".  
Use "External" when removing workload groups that manage external script execution resources like R or Python jobs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Internal |
| Accepted Values | Internal,External |

##### -SkipReconfigure

Skips the automatic Resource Governor reconfiguration that makes workload group changes take effect immediately.  
Use this when removing multiple workload groups in sequence to avoid repeated reconfigurations, but remember to manually reconfigure afterwards.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts workload group objects piped from Get-DbaRgWorkloadGroup for removal.  
Use this approach when you need to filter workload groups first or when processing multiple groups across different resource pools.

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
