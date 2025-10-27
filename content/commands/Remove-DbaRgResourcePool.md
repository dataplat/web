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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaRgResourcePool</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaRgResourcePool.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Remove-DbaRgResourcePool -SqlInstance sql2016 -ResourcePool &quot;poolAdmin&quot; -Type Internal" }

Removes an internal resource pool named "poolAdmin" for the instance sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRgResourcePool -SqlInstance sql2016 -Type "Internal" | Where-Object { $_.IsSystemObject -eq $false } | Remove-DbaRgResourcePool
```
{: data-copyable="true" data-clean-code="Get-DbaRgResourcePool -SqlInstance sql2016 -Type &quot;Internal&quot; | Where-Object { $_.IsSystemObject -eq $false } | Remove-DbaRgResourcePool" }

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
