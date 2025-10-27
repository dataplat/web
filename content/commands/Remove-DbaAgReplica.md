---
title: "Remove-DbaAgReplica"
slug: "Remove-DbaAgReplica"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes secondary replicas from SQL Server Availability Groups"
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgReplica.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgReplica"
draft: false
---

# Remove-DbaAgReplica

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgReplica](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgReplica.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgReplica](https://dataplat.github.io/boh#Remove-DbaAgReplica).

## Synopsis

Removes secondary replicas from SQL Server Availability Groups

## Description

Removes secondary replicas from Availability Groups by calling the Drop() method on the replica object. This is commonly used when decommissioning servers, scaling down your availability group topology, or removing failed replicas that cannot be recovered. The function accepts either direct SQL instance parameters or piped input from Get-DbaAgReplica for batch operations. All removal operations require explicit confirmation due to the high-impact nature of this change.

## Syntax

```powershell
Remove-DbaAgReplica
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [[-Replica] <String[]>]
    [[-InputObject] <AvailabilityReplica[]>]
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
PS C:\> Remove-DbaAgReplica -SqlInstance sql2017a -AvailabilityGroup SharePoint -Replica sp1
```

Removes the sp1 replica from the SharePoint ag on sql2017a. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaAgReplica -SqlInstance sql2017a | Select-Object *
```

Returns full object properties on all availability group replicas found on sql2017a<br>

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

Specifies the availability group(s) containing the replicas to remove. Accepts wildcards for pattern matching.  
Use this to limit the removal operation to specific availability groups when you have multiple AGs on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Replica

Specifies the name(s) of the availability group replicas to remove from the AG configuration. Accepts wildcards for pattern matching.  
This parameter is required when using SqlInstance and typically matches the server name hosting the replica you want to remove.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group replica objects from the pipeline, typically from Get-DbaAgReplica output.  
Use this for batch operations when you need to remove multiple replicas or want to filter replicas before removal.

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
