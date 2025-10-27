---
title: "Set-DbaAgListener"
slug: "Set-DbaAgListener"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Modifies the port number for Availability Group listeners on SQL Server instances."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgListener.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgListener"
draft: false
---

# Set-DbaAgListener

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaAgListener](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgListener.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaAgListener](https://dataplat.github.io/boh#Set-DbaAgListener).

## Synopsis

Modifies the port number for Availability Group listeners on SQL Server instances.

## Description

Modifies the port number for Availability Group listeners, allowing you to change the network port that clients use to connect to the availability group. This is commonly needed when standardizing ports across environments, resolving port conflicts with other services, or implementing security policies that require non-default ports. The command works with existing listeners and requires the availability group to be online to complete the port change.

## Syntax

```powershell
Set-DbaAgListener
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [[-Listener] <String[]>]
    [-Port] <Int32>
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
PS C:\> Set-DbaAgListener -SqlInstance sql2017 -AvailabilityGroup SharePoint -Port 14333
```

Changes the port for the SharePoint AG Listener on sql2017. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgListener -SqlInstance sql2017 | Out-GridView -Passthru | Set-DbaAgListener -Port 1433 -Confirm:$false
```

Changes the port for selected AG listeners to 1433. Does not prompt for confirmation.<br>

### Required Parameters

##### -Port

Sets the new port number for the availability group listener. This is the TCP port clients will use to connect to the availability group.  
Commonly changed to standardize ports across environments, resolve conflicts with other services, or meet security requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | 0 |

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

Specifies the name of the availability group containing the listener to modify. Required when using SqlInstance parameter.  
Use this to target specific availability groups when multiple groups exist on the same instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Listener

Specifies the name of specific listeners to modify within the availability group. Optional parameter to target only certain listeners.  
Use this when an availability group has multiple listeners and you only want to change the port for specific ones.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group listener objects from the pipeline, typically from Get-DbaAgListener. Allows you to chain commands together.  
Use this approach when you want to filter or select specific listeners before modifying their ports.

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
