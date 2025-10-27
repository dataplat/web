---
title: "Get-DbaMaxMemory"
slug: "Get-DbaMaxMemory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server max memory configuration and compares it to total physical server memory"
tags:
  - "MaxMemory"
  - "Memory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMaxMemory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaMaxMemory"
draft: false
---

# Get-DbaMaxMemory

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaMaxMemory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMaxMemory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaMaxMemory](https://dataplat.github.io/boh#Get-DbaMaxMemory).

## Synopsis

Retrieves SQL Server max memory configuration and compares it to total physical server memory

## Description

This command retrieves the SQL Server 'Max Server Memory' configuration setting alongside the total physical memory installed on the server. This comparison helps identify potential memory configuration issues that can impact SQL Server performance.  
  
Use this function to audit memory settings across your environment, troubleshoot performance issues related to memory pressure, or verify that SQL Server isn't configured to use more memory than physically available. The function is particularly useful for finding instances with the default max memory setting (2147483647 MB) that should be properly configured based on available physical memory.  
  
Results are returned in megabytes (MB) for both the configured max memory and total physical memory values.

## Syntax

```powershell
Get-DbaMaxMemory
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
PS C:\> Get-DbaMaxMemory -SqlInstance sqlcluster, sqlserver2012
```

Get memory settings for instances "sqlcluster" and "sqlserver2012". Returns results in megabytes (MB).<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlcluster | Get-DbaMaxMemory | Where-Object { $_.MaxValue -gt $_.Total }
```

Find all servers in Server Central Management Server that have 'Max Server Memory' set to higher than the total memory of the server (think 2147483647)<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaInstance -ComputerName localhost | Get-DbaMaxMemory | Format-Table -AutoSize
```

Scans localhost for instances using the browser service, traverses all instances and displays memory settings in a formatted table.<br>

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

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

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
