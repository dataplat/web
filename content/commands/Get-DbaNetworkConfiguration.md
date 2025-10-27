---
title: "Get-DbaNetworkConfiguration"
slug: "Get-DbaNetworkConfiguration"
date: 2024-01-01
layout: "single"
author: "Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server network protocols, TCP/IP settings, and SSL certificate configuration from SQL Server Configuration Manager"
tags:
  - "Connection"
  - "SQLWMI"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaNetworkConfiguration.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaNetworkConfiguration"
draft: false
---

# Get-DbaNetworkConfiguration

| Property | Value |
| --- | --- |
| **Author** | Andreas Jordan (@JordanOrdix), ordix.de |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaNetworkConfiguration](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaNetworkConfiguration.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaNetworkConfiguration](https://dataplat.github.io/boh#Get-DbaNetworkConfiguration).

## Synopsis

Retrieves SQL Server network protocols, TCP/IP settings, and SSL certificate configuration from SQL Server Configuration Manager

## Description

Collects comprehensive network configuration details for SQL Server instances, providing the same information visible in SQL Server Configuration Manager but in a scriptable PowerShell format. This function is essential for network connectivity troubleshooting, security audits, and compliance reporting across multiple SQL Server environments.  
  
The function retrieves protocol status for Shared Memory, Named Pipes, and TCP/IP, along with detailed TCP/IP properties including port configurations, IP address bindings, and dynamic port settings. It also extracts SSL certificate information, encryption settings, and advanced security properties like SPNs and extended protection settings.  
  
Since the function accesses SQL WMI and Windows registry data, it uses PowerShell remoting to execute on the target machine, requiring appropriate permissions on both the local and remote systems.  
  
For a detailed explanation of the different properties see the documentation at:  
https://docs.microsoft.com/en-us/sql/tools/configuration-manager/sql-server-network-configuration

## Syntax

```powershell
Get-DbaNetworkConfiguration
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [[-OutputType] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaNetworkConfiguration -SqlInstance sqlserver2014a
```

Returns the network configuration for the default instance on sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaNetworkConfiguration -SqlInstance winserver\sqlexpress, sql2016 -OutputType ServerProtocols
```

Returns information about the server protocols for the sqlexpress on winserver and the default instance on sql2016.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -OutputType

Controls which network configuration details are returned from SQL Server Configuration Manager.  
Use this to focus on specific troubleshooting areas or reduce output when checking multiple instances.  
Valid options: Full, ServerProtocols, TcpIpProperties, TcpIpAddresses, Certificate (defaults to Full).  
Full provides complete network configuration including all protocols, TCP/IP settings, IP bindings, and SSL certificate details.  
ServerProtocols shows only whether Shared Memory, Named Pipes, and TCP/IP protocols are enabled.  
TcpIpProperties returns TCP/IP protocol settings like KeepAlive timeout and whether the instance listens on all IP addresses.  
TcpIpAddresses displays port configurations and IP address bindings for connection troubleshooting.  
Certificate outputs SSL certificate information and encryption enforcement settings for security audits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Full |
| Accepted Values | Full,ServerProtocols,TcpIpProperties,TcpIpAddresses,Certificate |

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


&nbsp;
