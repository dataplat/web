---
title: "Remove-DbaAgListener"
slug: "Remove-DbaAgListener"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes availability group listeners from SQL Server instances."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgListener.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgListener"
draft: false
---

# Remove-DbaAgListener

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgListener](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgListener.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgListener](https://dataplat.github.io/boh#Remove-DbaAgListener).

## Synopsis

Removes availability group listeners from SQL Server instances.

## Description

Removes availability group listeners from SQL Server instances, permanently deleting the virtual network name and IP address configuration that clients use to connect to availability group databases. This operation is typically performed during decommissioning, reconfiguration, or when consolidating listeners. Once removed, applications will need to connect directly to individual replicas or use a different listener. The function can target specific listeners by name or remove all listeners from specified availability groups.

## Syntax

```powershell
Remove-DbaAgListener
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Listener] <String[]>]
    [[-AvailabilityGroup] <String[]>]
    [[-InputObject] <AvailabilityGroupListener[]>]
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
PS C:\> Remove-DbaAgListener -SqlInstance sqlserver2012 -AvailabilityGroup ag1, ag2 -Confirm:$false
```

Removes the ag1 and ag2 availability groups on sqlserver2012. Does not prompt for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sqlserver2012 -AvailabilityGroup availabilitygroup1 | Remove-DbaAgListener
```

Removes the listeners returned from the Get-DbaAvailabilityGroup function. Prompts for confirmation.<br>

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

##### -Listener

Specifies the name of specific availability group listeners to remove. Required when using SqlInstance parameter.  
Use this when you need to remove particular listeners rather than all listeners from availability groups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

Filters listener removal to only those within the specified availability groups.  
Use this when you want to remove listeners from particular AGs while preserving listeners from other availability groups on the same instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group listener objects from the pipeline, typically from Get-DbaAgListener.  
Use this when you need to remove listeners that have been filtered or selected through other dbatools commands.

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
