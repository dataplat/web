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

# Join-DbaAvailabilityGroup

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Join-DbaAvailabilityGroup](https://github.com/dataplat/dbatools/blob/master/public/Join-DbaAvailabilityGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Join-DbaAvailabilityGroup](https://dataplat.github.io/boh#Join-DbaAvailabilityGroup).

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

Joins sql02 to the SharePoint availability group on sql01<br>

#####  Example:  2 

```powershell
PS C:\> $ag = Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint
PS C:\> Join-DbaAvailabilityGroup -SqlInstance sql02 -InputObject $ag
```

Joins sql02 to the SharePoint availability group on sql01<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Join-DbaAvailabilityGroup -SqlInstance sql02 -WhatIf
```

Shows what would happen if the command were to run. No actions are actually performed.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Join-DbaAvailabilityGroup -SqlInstance sql02 -Confirm
```

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
