---
title: "Invoke-DbaAgFailover"
slug: "Invoke-DbaAgFailover"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Performs manual failover of an availability group to make the target instance the new primary replica."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAgFailover.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaAgFailover"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaAgFailover</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAgFailover.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Performs manual failover of an availability group to make the target instance the new primary replica.

## Description

Performs manual failover of an availability group to make the specified SQL Server instance the new primary replica. The function connects to the target instance (which must be a secondary replica) and promotes it to primary, while the current primary becomes secondary.  
  
By default, performs a safe failover that waits for all committed transactions to be synchronized to the target replica, preventing data loss. When the -Force parameter is used, performs a forced failover that may result in data loss if transactions haven't been synchronized to the target replica.  
  
This is commonly used during planned maintenance windows, disaster recovery scenarios, or when rebalancing availability group workloads across replicas. The target instance must already be configured as a secondary replica in the availability group.

## Syntax

```powershell
Invoke-DbaAgFailover
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [[-InputObject] <AvailabilityGroup[]>]
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
PS C:\> Invoke-DbaAgFailover -SqlInstance sql2017 -AvailabilityGroup SharePoint
```
{: data-copyable="true" data-clean-code="Invoke-DbaAgFailover -SqlInstance sql2017 -AvailabilityGroup SharePoint" }

Safely (no potential data loss) fails over the SharePoint AG to sql2017. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017 | Out-GridView -Passthru | Invoke-DbaAgFailover -Confirm:$false
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql2017 | Out-GridView -Passthru | Invoke-DbaAgFailover -Confirm:$false" }

Safely (no potential data loss) fails over the selected availability groups to sql2017. Does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaAgFailover -SqlInstance sql2017 -AvailabilityGroup SharePoint -Force
```
{: data-copyable="true" data-clean-code="Invoke-DbaAgFailover -SqlInstance sql2017 -AvailabilityGroup SharePoint -Force" }

Forcefully (with potential data loss) fails over the SharePoint AG to sql2017. Prompts for confirmation.<br>

### Optional Parameters

##### -SqlInstance

The SQL Server instance. Server version must be SQL Server version 2012 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance..

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

Specifies the name(s) of the availability groups to failover on the target instance. Accepts multiple availability group names.  
Use this when you need to failover specific availability groups rather than all groups on the instance.  
Required when using SqlInstance parameter to identify which availability groups should be failed over.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group objects from Get-DbaAvailabilityGroup for pipeline operations.  
Use this approach when you want to filter or select specific availability groups before failover.  
Allows for more complex scenarios like failing over multiple groups across different instances in a single operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Performs a forced failover that allows potential data loss by not waiting for transaction synchronization.  
Use this during disaster recovery scenarios when the primary replica is unavailable and you need immediate failover.  
Without this switch, the function performs a safe failover that waits for all committed transactions to synchronize, preventing data loss.

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
