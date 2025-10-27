---
title: "Get-DbaTcpPort"
slug: "Get-DbaTcpPort"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Returns the TCP port used by the specified SQL Server."
tags:
  - "Network"
  - "Connection"
  - "TCP"
  - "SQLWMI"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTcpPort.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaTcpPort"
draft: false
---

# Get-DbaTcpPort

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaTcpPort](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTcpPort.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaTcpPort](https://dataplat.github.io/boh#Get-DbaTcpPort).

## Synopsis

Returns the TCP port used by the specified SQL Server.

## Description

By default, this function returns just the TCP port used by the specified SQL Server.  
  
If -All is specified, the server name, IPAddress (ipv4 and ipv6), port number and an indicator of whether or not the port assignment is static are returned.  
  
Remote sqlwmi is used by default. If this doesn't work, then remoting is used. If neither work, it defaults to T-SQL which can provide only the port.

## Syntax

```powershell
Get-DbaTcpPort
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [-All]
    [-ExcludeIpv6]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaTcpPort -SqlInstance sqlserver2014a
```

Returns just the port number for the default instance on sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaTcpPort -SqlInstance winserver\sqlexpress, sql2016
```

Returns an object with server name and port number for the sqlexpress on winserver and the default instance on sql2016.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTcpPort -SqlInstance sqlserver2014a, sql2016 -All
```

Returns an object with server name, IPAddress (ipv4 and ipv6), port and static ($true/$false) for sqlserver2014a and sql2016.<br>
Remote sqlwmi is used by default. If this doesn't work, then remoting is used. If neither work, it defaults to T-SQL which can provide only the port.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014 | Get-DbaTcpPort -ExcludeIpv6 -All
```

Returns an object with server name, IPAddress (just ipv4), port and static ($true/$false) for every server listed in the Central Management Server on sql2014.<br>

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

##### -SqlCredential

Allows you to connect to servers using alternate Windows credentials  
$scred = Get-Credential, then pass $scred object to the -SqlCredential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Credential

Credential object used to connect to the Computer as a different user

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -All

Returns comprehensive network configuration details including server name, IP addresses (IPv4 and IPv6), port numbers, and whether the port assignment is static.  
Use this when troubleshooting connectivity issues or when you need complete network configuration information instead of just the port number.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeIpv6

Excludes IPv6 addresses from the output when used with the All parameter, showing only IPv4 network configurations.  
Use this in environments where IPv6 is disabled or when you only need to focus on IPv4 connectivity for troubleshooting.

| Property | Value |
| --- | --- |
| Alias | Ipv4 |
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


&nbsp;
