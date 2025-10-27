---
title: "Clear-DbaConnectionPool"
slug: "Clear-DbaConnectionPool"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Clears all SQL Server connection pools on the specified computer to resolve connection issues."
tags:
  - "Diagnostic"
  - "Connection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Clear-DbaConnectionPool.ps1"
bohUrl: "https://dataplat.github.io/boh#Clear-DbaConnectionPool"
draft: false
---

# Clear-DbaConnectionPool

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Clear-DbaConnectionPool](https://github.com/dataplat/dbatools/blob/master/public/Clear-DbaConnectionPool.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Clear-DbaConnectionPool](https://dataplat.github.io/boh#Clear-DbaConnectionPool).

## Synopsis

Clears all SQL Server connection pools on the specified computer to resolve connection issues.

## Description

Clears all SQL Server connection pools managed by the .NET SqlClient on the target computer. This forces any pooled connections to be discarded and recreated on the next connection attempt.  
  
Connection pools can sometimes retain stale or problematic connections that cause intermittent connectivity issues, authentication failures, or performance problems. This command helps resolve these issues by forcing a clean slate for all SQL Server connections from that computer.  
  
Active connections are marked for disposal and will be discarded when closed, rather than returned to the pool. New connections will be created fresh from the pool after clearing.  
  
Ref: https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnection.clearallpools(v=vs.110).aspx

## Syntax

```powershell
Clear-DbaConnectionPool
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
PS C:\> Clear-DbaConnectionPool
```

Clears all local connection pools.<br>

#####  Example:  2 

```powershell
PS C:\> Clear-DbaConnectionPool -ComputerName workstation27
```

Clears all connection pools on workstation27.<br>

### Optional Parameters

##### -ComputerName

Specifies the computer(s) where SQL Server connection pools should be cleared. Accepts multiple computer names and supports pipeline input.  
Use this when connection pool issues are occurring on specific client machines or application servers connecting to SQL Server.  
Defaults to the local computer if not specified.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Alternate credential object to use for accessing the target computer(s).

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
