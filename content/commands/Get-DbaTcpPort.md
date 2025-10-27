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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaTcpPort</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTcpPort.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaTcpPort -SqlInstance sqlserver2014a" }

Returns just the port number for the default instance on sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaTcpPort -SqlInstance winserver\sqlexpress, sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaTcpPort -SqlInstance winserver\sqlexpress, sql2016" }

Returns an object with server name and port number for the sqlexpress on winserver and the default instance on sql2016.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTcpPort -SqlInstance sqlserver2014a, sql2016 -All
```
{: data-copyable="true" data-clean-code="Get-DbaTcpPort -SqlInstance sqlserver2014a, sql2016 -All" }

Returns an object with server name, IPAddress (ipv4 and ipv6), port and static ($true/$false) for sqlserver2014a and sql2016.<br>
Remote sqlwmi is used by default. If this doesn't work, then remoting is used. If neither work, it defaults to T-SQL which can provide only the port.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014 | Get-DbaTcpPort -ExcludeIpv6 -All
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sql2014 | Get-DbaTcpPort -ExcludeIpv6 -All" }

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
