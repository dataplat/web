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

# Invoke-DbaAgFailover

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaAgFailover](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAgFailover.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaAgFailover](https://dataplat.github.io/boh#Invoke-DbaAgFailover).

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

Safely (no potential data loss) fails over the SharePoint AG to sql2017. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017 | Out-GridView -Passthru | Invoke-DbaAgFailover -Confirm:$false
```

Safely (no potential data loss) fails over the selected availability groups to sql2017. Does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaAgFailover -SqlInstance sql2017 -AvailabilityGroup SharePoint -Force
```

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
