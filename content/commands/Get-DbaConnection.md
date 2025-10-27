---
title: "Get-DbaConnection"
slug: "Get-DbaConnection"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Returns a bunch of information from dm_exec_connections."
tags:
  - "Connection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaConnection"
draft: false
---

# Get-DbaConnection

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaConnection](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaConnection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaConnection](https://dataplat.github.io/boh#Get-DbaConnection).

## Synopsis

Returns a bunch of information from dm_exec_connections.

## Description

Returns a bunch of information from dm_exec_connections which, according to Microsoft:  
"Returns information about the connections established to this instance of SQL Server and the details of each connection. Returns server wide connection information for SQL Server. Returns current database connection information for SQL Database."

## Syntax

```powershell
Get-DbaConnection
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaConnection -SqlInstance sql2016, sql2017
```

Returns client connection information from sql2016 and sql2017<br>

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
