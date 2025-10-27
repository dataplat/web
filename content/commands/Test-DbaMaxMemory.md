---
title: "Test-DbaMaxMemory"
slug: "Test-DbaMaxMemory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Calculates recommended SQL Server max memory settings to prevent OS memory pressure and optimize performance."
tags:
  - "MaxMemory"
  - "Memory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaMaxMemory.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaMaxMemory"
draft: false
---

# Test-DbaMaxMemory

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaMaxMemory](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaMaxMemory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaMaxMemory](https://dataplat.github.io/boh#Test-DbaMaxMemory).

## Synopsis

Calculates recommended SQL Server max memory settings to prevent OS memory pressure and optimize performance.

## Description

Analyzes server memory and SQL Server instances to calculate optimal max memory configuration settings. Uses a tiered algorithm that reserves appropriate memory for the operating system based on total server memory, accounting for multiple SQL instances and other SQL services like SSAS, SSRS, or SSIS. Compares current max memory settings against recommended values to help identify misconfigured servers that could cause memory pressure or performance issues. Based on Jonathan Kehayias's memory calculation methodology, this provides general recommendations that should be validated against your specific environment and workload requirements.

## Syntax

```powershell
Test-DbaMaxMemory
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaMaxMemory -SqlInstance sqlcluster,sqlserver2012
```

Calculate the 'Max Server Memory' for SQL Server instances sqlcluster and sqlserver2012<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlcluster | Test-DbaMaxMemory
```

Calculate the 'Max Server Memory' settings for all servers within the SQL Server Central Management Server "sqlcluster"<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlcluster | Test-DbaMaxMemory | Where-Object { $_.MaxValue -gt $_.Total } | Set-DbaMaxMemory
```

Find all servers in CMS that have Max SQL memory set to higher than the total memory of the server (think 2147483647) and set it to recommended value.<br>

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

##### -Credential

Windows Credential with permission to log on to the server running the SQL instance

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
