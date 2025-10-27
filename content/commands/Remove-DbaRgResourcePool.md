---
title: "Remove-DbaRgResourcePool"
slug: "Remove-DbaRgResourcePool"
date: 2024-01-01
layout: "single"
author: "John McCall (@lowlydba), lowlydba.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes internal or external resource pools from SQL Server Resource Governor configuration"
tags:
  - "ResourcePool"
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaRgResourcePool.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaRgResourcePool"
draft: false
---

# Remove-DbaRgResourcePool

| Property | Value |
| --- | --- |
| **Author** | John McCall (@lowlydba), lowlydba.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaRgResourcePool](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaRgResourcePool.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaRgResourcePool](https://dataplat.github.io/boh#Remove-DbaRgResourcePool).

## Synopsis

Removes internal or external resource pools from SQL Server Resource Governor configuration

## Description

Removes user-defined resource pools from SQL Server's Resource Governor, freeing up the allocated memory, CPU, and IO resources for redistribution to other workloads. This is typically done when cleaning up unused resource pools, consolidating workload management, or reconfiguring resource allocation strategies.  
  
Resource pools define the physical resource boundaries (memory, CPU, IO) that can be assigned to different database workloads through workload groups. Removing unused pools helps maintain a clean Resource Governor configuration and prevents resource fragmentation.  
  
The function automatically reconfigures Resource Governor after pool removal to ensure changes take effect immediately, unless you specify -SkipReconfigure for batch operations.

## Syntax

```powershell
Remove-DbaRgResourcePool
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-ResourcePool] <String[]>]
    [[-Type] <String>]
    [-SkipReconfigure]
    [[-InputObject] <Object[]>]
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
PS C:\> Remove-DbaRgResourcePool -SqlInstance sql2016 -ResourcePool "poolAdmin" -Type Internal
```

Removes an internal resource pool named "poolAdmin" for the instance sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRgResourcePool -SqlInstance sql2016 -Type "Internal" | Where-Object { $_.IsSystemObject -eq $false } | Remove-DbaRgResourcePool
```

Removes all user internal resource pools for the instance sql2016 by piping output from Get-DbaRgResourcePool.<br>

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

##### -ResourcePool

Name of the resource pool to remove from Resource Governor configuration. Accepts multiple pool names.  
Use this when you need to clean up specific unused pools or consolidate resource management by removing obsolete pools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies whether to remove Internal or External resource pools. Defaults to Internal.  
Internal pools manage CPU and memory for regular SQL Server workloads, while External pools manage resources for R/Python/Java external scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Internal |
| Accepted Values | Internal,External |

##### -SkipReconfigure

Skips the automatic Resource Governor reconfiguration after removing resource pools. By default, Resource Governor is reconfigured to apply changes immediately.  
Use this when removing multiple pools in batch operations to avoid repeated reconfigurations, then manually reconfigure once at the end.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts resource pool objects piped from Get-DbaRgResourcePool for removal. Supports both Internal and External resource pool objects.  
Use this for pipeline operations when you need to filter pools before removal or process multiple pools efficiently.

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
