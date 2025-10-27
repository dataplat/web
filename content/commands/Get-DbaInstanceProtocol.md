---
title: "Get-DbaInstanceProtocol"
slug: "Get-DbaInstanceProtocol"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server network protocol configuration and status from target computers."
tags:
  - "Management"
  - "Protocol"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceProtocol.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaInstanceProtocol"
draft: false
---

# Get-DbaInstanceProtocol

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaInstanceProtocol](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceProtocol.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaInstanceProtocol](https://dataplat.github.io/boh#Get-DbaInstanceProtocol).

## Synopsis

Retrieves SQL Server network protocol configuration and status from target computers.

## Description

Retrieves the configuration and status of SQL Server network protocols (TCP/IP, Named Pipes, Shared Memory, VIA) by querying the WMI ComputerManagement namespace. This is essential for troubleshooting connectivity issues, auditing network configurations for security compliance, and managing protocol settings across multiple SQL Server instances.  
  
The returned protocol objects include Enable() and Disable() methods, allowing you to manage protocol states directly without opening SQL Server Configuration Manager. This is particularly useful for automating security hardening by disabling unnecessary protocols or standardizing configurations across your environment.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Get-DbaInstanceProtocol
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
PS C:\> Get-DbaInstanceProtocol -ComputerName sqlserver2014a
```

Gets the SQL Server related server protocols on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Get-DbaInstanceProtocol
```

Gets the SQL Server related server protocols on computers sql1, sql2 and sql3.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaInstanceProtocol -ComputerName sql1,sql2
```

Gets the SQL Server related server protocols on computers sql1 and sql2.<br>

#####  Example:  4 

```powershell
PS C:\> (Get-DbaInstanceProtocol -ComputerName sql1 | Where-Object { $_.DisplayName -eq 'Named Pipes' }).Disable()
```

Disables the VIA ServerNetworkProtocol on computer sql1.<br>
If successful, return code 0 is shown.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) where SQL Server instances are running. Accepts computer names, fully qualified domain names, or IP addresses.  
Use this when you need to check network protocol configurations on remote SQL Server machines for connectivity troubleshooting or security audits.

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
