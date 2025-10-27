---
title: "Set-DbaNetworkConfiguration"
slug: "Set-DbaNetworkConfiguration"
date: 2024-01-01
layout: "single"
author: "Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Modifies SQL Server network protocol settings including TCP/IP, Named Pipes, and Shared Memory configurations."
tags:
  - "Network"
  - "Connection"
  - "SQLWMI"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaNetworkConfiguration.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaNetworkConfiguration"
draft: false
---

# Set-DbaNetworkConfiguration

| Property | Value |
| --- | --- |
| **Author** | Andreas Jordan (@JordanOrdix), ordix.de |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaNetworkConfiguration](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaNetworkConfiguration.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaNetworkConfiguration](https://dataplat.github.io/boh#Set-DbaNetworkConfiguration).

## Synopsis

Modifies SQL Server network protocol settings including TCP/IP, Named Pipes, and Shared Memory configurations.

## Description

Modifies SQL Server network protocol settings through WMI, allowing you to enable or disable network protocols and configure TCP/IP properties like static or dynamic ports. This replaces the need to manually use SQL Server Configuration Manager for network changes.  
  
Common DBA scenarios include switching instances from dynamic to static ports for firewall rules, enabling TCP/IP for remote connections, or configuring specific IP addresses for multi-homed servers. You can also pass modified objects from Get-DbaNetworkConfiguration to make complex property changes.  
  
Network configuration changes require a SQL Server service restart to take effect - use the RestartService parameter to handle this automatically, otherwise you'll need to restart the service manually afterward.  
  
Uses remote SQL WMI by default with PowerShell remoting as a fallback. Requires administrative privileges on the target server.  
  
For detailed property explanations see: https://docs.microsoft.com/en-us/sql/tools/configuration-manager/sql-server-network-configuration

## Syntax

```powershell
Set-DbaNetworkConfiguration
    [-SqlInstance] <DbaInstanceParameter[]>
    [-Credential <PSCredential>]
    [-EnableProtocol <String>]
    [-DisableProtocol <String>]
    [-DynamicPortForIPAll]
    [-StaticPortForIPAll <Int32[]>]
    [-IpAddress <String[]>]
    [-RestartService]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaNetworkConfiguration
    [-Credential <PSCredential>]
    [-RestartService]
    -InputObject <Object[]>
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
PS C:\> Set-DbaNetworkConfiguration -SqlInstance sql2016 -EnableProtocol SharedMemory -RestartService
```

Ensures that the shared memory network protocol for the default instance on sql2016 is enabled.<br>
Restarts the service if needed.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaNetworkConfiguration -SqlInstance sql2016\test -StaticPortForIPAll 14331, 14332 -RestartService
```

Ensures that the TCP/IP network protocol is enabled and configured to use the ports 14331 and 14332 for all IP addresses.<br>
Restarts the service if needed.<br>

#####  Example:  3 

```powershell
PS C:\> $netConf = Get-DbaNetworkConfiguration -SqlInstance sqlserver2014a
PS C:\> $netConf.TcpIpProperties.KeepAlive = 60000
PS C:\> $netConf | Set-DbaNetworkConfiguration -RestartService -Confirm:$false
```

Changes the value of the KeepAlive property for the default instance on sqlserver2014a and restarts the service.<br>
Does not prompt for confirmation.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaNetworkConfiguration -SqlInstance sql2016\test -IpAddress 192.168.3.41:1433 -RestartService
```

Ensures that the TCP/IP network protocol is enabled and configured to only listen on port 1433 of IP address 192.168.3.41.<br>
Restarts the service if needed.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts a network configuration object from Get-DbaNetworkConfiguration for making complex property changes.  
Use this when you need to modify specific TCP/IP properties like KeepAlive values or make multiple configuration changes.  
The Get-DbaNetworkConfiguration command must use -OutputType Full to provide the complete configuration object.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Credential

Credential object used to connect to the Computer as a different user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EnableProtocol

Enables a specific SQL Server network protocol for client connections.  
Use SharedMemory for local-only connections, NamedPipes for legacy applications, or TcpIp for remote access.  
TCP/IP is required for remote connections and most modern applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | SharedMemory,NamedPipes,TcpIp |

##### -DisableProtocol

Disables a specific SQL Server network protocol to prevent client connections via that method.  
Commonly used to disable unneeded protocols for security or troubleshooting purposes.  
Be cautious disabling TCP/IP as it will prevent all remote connections to the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | SharedMemory,NamedPipes,TcpIp |

##### -DynamicPortForIPAll

Configures the instance to use a random port assigned by Windows for all IP addresses.  
Use this for non-production environments or when you don't need predictable port numbers.  
Automatically enables TCP/IP protocol and sets ListenAll to true, clearing any existing static port configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -StaticPortForIPAll

Configures the instance to use specific port numbers for all IP addresses instead of dynamic ports.  
Essential for production environments where firewall rules require predictable port numbers.  
Automatically enables TCP/IP protocol and sets ListenAll to true. Accepts multiple ports as comma-separated values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IpAddress

Restricts the instance to listen only on specified IP addresses instead of all available interfaces.  
Use this on multi-homed servers to control which network interfaces accept SQL Server connections.  
Format as "192.168.1.10" for dynamic ports or "192.168.1.10:1433" for static ports. IPv6 addresses need square brackets like "[::1]:1433".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestartService

Automatically restarts the SQL Server service when network configuration changes are made.  
Network configuration changes only take effect after a service restart, so use this to avoid manual restarts.  
Without this parameter, you must manually restart the SQL Server service for changes to become active.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
