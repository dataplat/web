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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaAgListener</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaAgListener.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Add-DbaAgListener -SqlInstance sql2017 -AvailabilityGroup SharePoint -IPAddress 10.0.20.20" }

Creates a listener on 10.0.20.20 port 1433 for the SharePoint availability group on sql2017.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017 -AvailabilityGroup availabilitygroup1 | Add-DbaAgListener -Dhcp
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql2017 -AvailabilityGroup availabilitygroup1 | Add-DbaAgListener -Dhcp" }

Creates a listener on port 1433 with a dynamic IP for the group1 availability group on sql2017.<br>

#####  Example:  3 

```powershell
PS C:\> Add-DbaAgListener -SqlInstance sql2017 -AvailabilityGroup SharePoint -IPAddress 10.0.20.20,10.1.77.77 -SubnetMask 255.255.252.0
```
{: data-copyable="true" data-clean-code="Add-DbaAgListener -SqlInstance sql2017 -AvailabilityGroup SharePoint -IPAddress 10.0.20.20,10.1.77.77 -SubnetMask 255.255.252.0" }

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
