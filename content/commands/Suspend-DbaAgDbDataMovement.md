---
title: "Suspend-DbaAgDbDataMovement"
slug: "Suspend-DbaAgDbDataMovement"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Suspends data synchronization for availability group databases to halt replication between replicas."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Suspend-DbaAgDbDataMovement.ps1"
bohUrl: "https://dataplat.github.io/boh#Suspend-DbaAgDbDataMovement"
draft: false
---

# Suspend-DbaAgDbDataMovement

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Suspend-DbaAgDbDataMovement](https://github.com/dataplat/dbatools/blob/master/public/Suspend-DbaAgDbDataMovement.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Suspend-DbaAgDbDataMovement](https://dataplat.github.io/boh#Suspend-DbaAgDbDataMovement).

## Synopsis

Suspends data synchronization for availability group databases to halt replication between replicas.

## Description

Temporarily halts data movement between primary and secondary replicas for specified availability group databases. This stops transaction log records from being sent to secondary replicas, which is useful during maintenance windows, troubleshooting synchronization issues, or when preparing for manual failovers. While suspended, the secondary databases will fall behind the primary and cannot be failed over to until data movement is resumed.

## Syntax

```powershell
Suspend-DbaAgDbDataMovement
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String>]
    [[-Database] <String[]>]
    [[-InputObject] <AvailabilityDatabase[]>]
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
PS C:\> Suspend-DbaAgDbDataMovement -SqlInstance sql2017a -AvailabilityGroup ag1 -Database db1, db2
```

Suspends data movement on db1 and db2 to ag1 on sql2017a. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgDatabase -SqlInstance sql2017a, sql2019 | Out-GridView -Passthru | Suspend-DbaAgDbDataMovement -Confirm:$false
```

Suspends data movement on the selected availability group databases. Does not prompt for confirmation.<br>

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

Specifies the availability group containing the databases to suspend. Required when using SqlInstance parameter.  
Use this to target databases within a specific AG when multiple availability groups exist on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which availability group databases to suspend data movement for. Accepts multiple database names.  
Use this when you need to halt synchronization for specific databases while leaving other AG databases running normally.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group database objects piped from Get-DbaAgDatabase or other dbatools AG commands.  
Use this for pipeline operations when you want to filter and select specific AG databases before suspending data movement.

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
