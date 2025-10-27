---
title: "Get-DbaClientProtocol"
slug: "Get-DbaClientProtocol"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server client network protocol configuration and status from local or remote computers."
tags:
  - "Management"
  - "Protocol"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaClientProtocol.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaClientProtocol"
draft: false
---

# Get-DbaClientProtocol

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaClientProtocol](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaClientProtocol.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaClientProtocol](https://dataplat.github.io/boh#Get-DbaClientProtocol).

## Synopsis

Retrieves SQL Server client network protocol configuration and status from local or remote computers.

## Description

Retrieves the configuration and status of SQL Server client network protocols (Named Pipes, TCP/IP, Shared Memory, VIA) from local or remote computers. This function helps DBAs audit and troubleshoot client connectivity issues by showing which protocols are enabled, their order of precedence, and associated DLL files.  
  
The returned objects include Enable() and Disable() methods, allowing you to modify protocol settings directly without opening SQL Server Configuration Manager. This is particularly useful for standardizing client configurations across multiple servers or troubleshooting connectivity problems.  
  
Requires Local Admin rights on destination computer(s) and SQL Server 2005 or later.  
The client protocols can be enabled and disabled when retrieved via WSMan.

## Syntax

```powershell
Get-DbaClientProtocol
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaClientProtocol -ComputerName sqlserver2014a
```

Gets the SQL Server related client protocols on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Get-DbaClientProtocol
```

Gets the SQL Server related client protocols on computers sql1, sql2 and sql3.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaClientProtocol -ComputerName sql1,sql2 | Out-GridView
```

Gets the SQL Server related client protocols on computers sql1 and sql2, and shows them in a grid view.<br>

#####  Example:  4 

```powershell
PS C:\> (Get-DbaClientProtocol -ComputerName sql2 | Where-Object { $_.DisplayName -eq 'Named Pipes' }).Disable()
```

Disables the VIA ClientNetworkProtocol on computer sql2.<br>
If successful, return code 0 is shown.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) to retrieve SQL Server client protocol configuration from. Accepts computer names, IP addresses, or SQL Server instance names.  
Use this when you need to audit client protocol settings on remote servers or troubleshoot connectivity issues across multiple machines.  
Defaults to the local computer if not specified.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the computer as a different user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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


&nbsp;
