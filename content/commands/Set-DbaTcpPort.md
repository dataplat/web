---
title: "Set-DbaTcpPort"
slug: "Set-DbaTcpPort"
date: 2024-01-01
layout: "single"
author: "@H0s0n77"
availability: "Windows, Linux, macOS"
synopsis: "Configures SQL Server TCP port settings for specified instances and IP addresses."
tags:
  - "Network"
  - "Connection"
  - "TCP"
  - "Configure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaTcpPort.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaTcpPort"
draft: false
---

# Set-DbaTcpPort

| Property | Value |
| --- | --- |
| **Author** | @H0s0n77 |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaTcpPort](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaTcpPort.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaTcpPort](https://dataplat.github.io/boh#Set-DbaTcpPort).

## Synopsis

Configures SQL Server TCP port settings for specified instances and IP addresses.

## Description

Configures TCP port settings for SQL Server instances by modifying the network configuration through SQL Server Configuration Manager functionality. This replaces the manual process of opening SQL Server Configuration Manager to change port settings for security hardening or network compliance.  
  
The function can target all IP addresses (IPAll setting) or specific IP addresses, disables dynamic port allocation, and sets static port numbers. This is commonly used to move SQL Server off the default port 1433 for security purposes, configure custom ports for named instances, or meet organizational network segmentation requirements.  
  
Important: SQL Server must be restarted before the new port configuration takes effect. Use the -Force parameter to automatically restart the Database Engine service, or restart manually after running the command.

## Syntax

```powershell
Set-DbaTcpPort
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [-Port] <Int32[]>
    [[-IpAddress] <IPAddress[]>]
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
PS C:\> Set-DbaTcpPort -SqlInstance sql2017 -Port 1433
```

Sets the port number 1433 for all IP Addresses on the default instance on sql2017. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaTcpPort -SqlInstance winserver\sqlexpress -IpAddress 192.168.1.22 -Port 1433 -Confirm:$false
```

Sets the port number 1433 for IP 192.168.1.22 on the sqlexpress instance on winserver. Does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaTcpPort -SqlInstance sql2017, sql2019 -port 1337 -Credential ad\dba -Force
```

Sets the port number 1337 for all IP Addresses on SqlInstance sql2017 and sql2019 using the credentials for ad\dba. Prompts for confirmation. Restarts the service.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Port

Specifies the TCP port number for SQL Server to listen on, replacing any existing static or dynamic port configuration.  
Use this to move SQL Server off the default port 1433 for security hardening or to configure custom ports for named instances.  
Accepts any valid port number between 1 and 65535, with common choices being 1433 (default), 1434, or organization-specific port ranges.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Credential

Credential object used to connect to the Windows server itself as a different user (like SQL Configuration Manager).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IpAddress

Specifies which IP address should listen on the configured port instead of applying to all IP addresses.  
Use this for multi-homed servers where you need SQL Server to listen only on specific network interfaces.  
When omitted, the port change applies to all IP addresses (IPAll setting), which is the typical configuration for most servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Automatically restarts the SQL Server Database Engine service to apply the new port configuration immediately.  
Use this when you need the port change to take effect right away instead of waiting for the next service restart.  
Without this parameter, you must manually restart SQL Server before the new port settings become active.

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
