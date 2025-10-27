---
title: "Test-DbaConnectionAuthScheme"
slug: "Test-DbaConnectionAuthScheme"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Tests and reports authentication scheme and transport protocol details for SQL Server connections"
tags:
  - "SPN"
  - "Kerberos"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaConnectionAuthScheme.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaConnectionAuthScheme"
draft: false
---

# Test-DbaConnectionAuthScheme

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaConnectionAuthScheme](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaConnectionAuthScheme.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaConnectionAuthScheme](https://dataplat.github.io/boh#Test-DbaConnectionAuthScheme).

## Synopsis

Tests and reports authentication scheme and transport protocol details for SQL Server connections

## Description

This command queries sys.dm_exec_connections to retrieve authentication and transport details for your current SQL Server session. By default, it returns key connection properties including ServerName, Transport protocol, and AuthScheme (Kerberos or NTLM).  
  
This is particularly valuable for troubleshooting authentication issues when you expect Kerberos but are getting NTLM instead. The ServerName returned shows what SQL Server reports as its @@SERVERNAME, which must match your connection name for proper SPN registration and Kerberos authentication.  
  
When used with -Kerberos or -Ntlm switches, the command returns simple $true/$false results to verify specific authentication methods. This makes it ideal for automated checks and scripts that need to validate authentication schemes across multiple servers.  
  
Common scenarios include diagnosing SPN configuration problems, security auditing of connection protocols, and verifying that domain authentication is working as expected in your environment.

## Syntax

```powershell
Test-DbaConnectionAuthScheme
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Kerberos]
    [-Ntlm]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaConnectionAuthScheme -SqlInstance sqlserver2014a, sql2016
```

Returns ConnectName, ServerName, Transport and AuthScheme for sqlserver2014a and sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaConnectionAuthScheme -SqlInstance sqlserver2014a -Kerberos
```

Returns $true or $false depending on if the connection is Kerberos or not.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaConnectionAuthScheme -SqlInstance sqlserver2014a | Select-Object *
```

Returns the results of "SELECT * from sys.dm_exec_connections WHERE session_id = @@SPID"<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server(s) must be SQL Server 2005 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias | Credential,Cred |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Kerberos

Returns $true if the connection uses Kerberos authentication, $false otherwise.  
Use this switch when you need to verify that domain authentication is working properly and not falling back to NTLM.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Ntlm

Returns $true if the connection uses NTLM authentication, $false otherwise.  
Use this switch to confirm when connections are using NTLM instead of the preferred Kerberos authentication method.

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


&nbsp;
