---
title: "Join-DbaAvailabilityGroup"
slug: "Join-DbaAvailabilityGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Adds a SQL Server instance as a secondary replica to an existing availability group."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Join-DbaAvailabilityGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Join-DbaAvailabilityGroup"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Join-DbaAvailabilityGroup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Join-DbaAvailabilityGroup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Adds a SQL Server instance as a secondary replica to an existing availability group.

## Description

Adds a SQL Server instance as a secondary replica to an existing availability group that has already been created on the primary replica. This command is typically used after creating the availability group on the primary server and before adding databases to the group. The target instance must have the availability group feature enabled and be properly configured for high availability. For SQL Server 2017 and later, you can specify the cluster type (External, Wsfc, or None) to match your environment's configuration.

## Syntax

```powershell
Join-DbaAvailabilityGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [[-ClusterType] <String>]
    [[-InputObject] <AvailabilityGroup[]>]
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
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Join-DbaAvailabilityGroup -SqlInstance sql02
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Join-DbaAvailabilityGroup -SqlInstance sql02" }

Joins sql02 to the SharePoint availability group on sql01<br>

#####  Example:  2 

```powershell
PS C:\> $ag = Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint
PS C:\> Join-DbaAvailabilityGroup -SqlInstance sql02 -InputObject $ag
```
{: data-copyable="true" data-clean-code="$ag = Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint
Join-DbaAvailabilityGroup -SqlInstance sql02 -InputObject $ag" }

Joins sql02 to the SharePoint availability group on sql01<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Join-DbaAvailabilityGroup -SqlInstance sql02 -WhatIf
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Join-DbaAvailabilityGroup -SqlInstance sql02 -WhatIf" }

Shows what would happen if the command were to run. No actions are actually performed.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Join-DbaAvailabilityGroup -SqlInstance sql02 -Confirm
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Join-DbaAvailabilityGroup -SqlInstance sql02 -Confirm" }

Prompts for confirmation then joins sql02 to the SharePoint availability group on sql01.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2012 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

##### -AvailabilityGroup

Specifies the name of the availability group that the target instance will join as a secondary replica.  
Use this when you need to add a secondary replica to an existing availability group that was created on the primary server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ClusterType

Specifies the cluster type for the availability group when joining SQL Server 2017 or later instances.  
Use 'Wsfc' for Windows Server Failover Clustering, 'External' for Linux cluster managers like Pacemaker, or 'None' for read-scale availability groups without clustering.  
If not specified, the cluster type is automatically detected from the existing availability group.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | External,Wsfc,None |

##### -InputObject

Accepts availability group objects from Get-DbaAvailabilityGroup for pipeline operations.  
Use this when you want to retrieve availability group details from the primary replica and pipe them directly to join secondary replicas.  
The availability group name and cluster type are automatically extracted from the input object.

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
