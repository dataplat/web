---
title: "Get-DbaForceNetworkEncryption"
slug: "Get-DbaForceNetworkEncryption"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Force Network Encryption configuration from SQL Server's network settings"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaForceNetworkEncryption.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaForceNetworkEncryption"
draft: false
---

# Get-DbaForceNetworkEncryption

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaForceNetworkEncryption](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaForceNetworkEncryption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaForceNetworkEncryption](https://dataplat.github.io/boh#Get-DbaForceNetworkEncryption).

## Synopsis

Retrieves Force Network Encryption configuration from SQL Server's network settings

## Description

Retrieves the Force Network Encryption setting and associated certificate from SQL Server's network configuration stored in the Windows registry. This setting determines whether SQL Server requires all client connections to use encryption, preventing unencrypted communication.  
  
Useful for security audits and compliance checks to verify that network encryption policies are properly configured across your SQL Server estate. The function accesses the SuperSocketNetLib registry key where SQL Server stores its network security settings, requiring Windows-level access rather than SQL Server authentication.

## Syntax

```powershell
Get-DbaForceNetworkEncryption
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaForceNetworkEncryption
```

Gets Force Encryption properties on the default (MSSQLSERVER) instance on localhost - requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaForceNetworkEncryption -SqlInstance sql01\SQL2008R2SP2
```

Gets Force Network Encryption for the SQL2008R2SP2 on sql01. Uses Windows Credentials to both login and view the registry.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to the computer (not sql instance) using alternative Windows credentials

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
