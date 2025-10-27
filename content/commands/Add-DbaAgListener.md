---
title: "Add-DbaAgListener"
slug: "Add-DbaAgListener"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a network listener endpoint for an Availability Group to provide client connectivity"
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaAgListener.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaAgListener"
draft: false
---

# Add-DbaAgListener

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Add-DbaAgListener](https://github.com/dataplat/dbatools/blob/master/public/Add-DbaAgListener.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Add-DbaAgListener](https://dataplat.github.io/boh#Add-DbaAgListener).

## Synopsis

Creates a network listener endpoint for an Availability Group to provide client connectivity

## Description

Creates a network listener endpoint that provides a virtual network name and IP address for clients to connect to an Availability Group. The listener automatically routes client connections to the current primary replica, eliminating the need for applications to track which server is currently hosting the primary database.  
  
This function supports both single-subnet and multi-subnet Availability Group configurations. You can specify static IP addresses for each subnet or use DHCP for automatic IP assignment. For multi-subnet deployments, specify multiple IP addresses and subnet masks to handle failover across geographically dispersed replicas.  
  
Use this when setting up new Availability Groups or when adding listeners to existing groups that don't have client connectivity configured yet. Without a listener, applications must connect directly to replica server names, which breaks during failover scenarios.

## Syntax

```powershell
Add-DbaAgListener
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [[-Name] <String>]
    [[-IPAddress] <IPAddress[]>]
    [[-SubnetIP] <IPAddress[]>]
    [[-SubnetMask] <IPAddress[]>]
    [[-Port] <Int32>]
    [-Dhcp]
    [-Passthru]
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
PS C:\> Add-DbaAgListener -SqlInstance sql2017 -AvailabilityGroup SharePoint -IPAddress 10.0.20.20
```

Creates a listener on 10.0.20.20 port 1433 for the SharePoint availability group on sql2017.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017 -AvailabilityGroup availabilitygroup1 | Add-DbaAgListener -Dhcp
```

Creates a listener on port 1433 with a dynamic IP for the group1 availability group on sql2017.<br>

#####  Example:  3 

```powershell
PS C:\> Add-DbaAgListener -SqlInstance sql2017 -AvailabilityGroup SharePoint -IPAddress 10.0.20.20,10.1.77.77 -SubnetMask 255.255.252.0
```

Creates a multi-subnet listener with 10.0.20.20 and 10.1.77.77, on two /22 subnets, on port 1433 for the SharePoint availability group on sql2017.<br>

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

Login to the SqlInstance instance using alternative credentials. Windows and SQL Authentication supported. Accepts credential objects (Get-Credential)

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

Specifies the name of the Availability Group that will receive the listener. Use this when connecting directly to a SQL Server instance rather than piping from Get-DbaAvailabilityGroup.  
Required when using the SqlInstance parameter to identify which AG on the server needs client connectivity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Specifies a custom network name for the listener that clients will use to connect. Defaults to the Availability Group name if not specified.  
Use this when you need a different DNS name than your AG name, such as for application connection strings that can't be changed.  
Cannot be used when processing multiple Availability Groups in a single operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IPAddress

Specifies one or more static IP addresses for the listener to use across different subnets. Each IP should correspond to a subnet where AG replicas are located.  
Use this for multi-subnet deployments or when DHCP is not available in your network environment.  
Cannot be combined with the Dhcp parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubnetIP

Specifies the network subnet addresses where the listener IPs will be configured. Auto-calculated from IPAddress and SubnetMask if not provided.  
Use this when you need explicit control over subnet configuration or when auto-calculation produces incorrect results.  
Must match the number of IP addresses specified, or provide a single subnet to apply to all IPs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubnetMask

Defines the subnet mask for each listener IP address, controlling the network range. Defaults to 255.255.255.0 (/24).  
Use this when your network uses non-standard subnet sizes or when configuring multi-subnet listeners with different mask requirements.  
Must match the number of IP addresses, or provide a single mask to apply to all IPs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 255.255.255.0 |

##### -Port

Specifies the TCP port number that clients will use to connect to the listener. Defaults to 1433.  
Change this when your environment requires non-standard SQL Server ports due to security policies or port conflicts with other services.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1433 |

##### -Dhcp

Configures the listener to obtain IP addresses automatically from DHCP rather than using static IPs. Simplifies network configuration when DHCP reservations are managed centrally.  
Cannot be used with IPAddress parameter and requires single-subnet AG configurations only.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Passthru

Returns the listener object without creating it on the server, allowing for additional configuration before calling Create().  
Use this when you need to set advanced properties not exposed by this function's parameters before committing the listener to SQL Server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts Availability Group objects from Get-DbaAvailabilityGroup through the pipeline, eliminating the need to specify SqlInstance and AvailabilityGroup parameters.  
Use this approach when working with multiple AGs or when you need to filter AGs before creating listeners.

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
