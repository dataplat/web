---
title: "Test-DbaMaxDop"
slug: "Test-DbaMaxDop"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@claudioessilva)"
availability: "Windows, Linux, macOS"
synopsis: "Tests SQL Server MAXDOP configuration against recommended values based on CPU cores and NUMA topology."
tags:
  - "MaxDop"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaMaxDop.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaMaxDop"
draft: false
---

# Test-DbaMaxDop

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@claudioessilva) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaMaxDop](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaMaxDop.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaMaxDop](https://dataplat.github.io/boh#Test-DbaMaxDop).

## Synopsis

Tests SQL Server MAXDOP configuration against recommended values based on CPU cores and NUMA topology.

## Description

Analyzes your SQL Server's Max Degree of Parallelism (MAXDOP) settings and compares them against Microsoft's recommended values based on your server's hardware configuration. This function examines CPU cores, NUMA topology, and SQL Server version to calculate optimal MAXDOP settings for query performance.  
  
The function helps you identify instances where MAXDOP may be misconfigured, which can lead to poor query performance, excessive parallelism overhead, or CXPACKET waits. It automatically detects single vs multi-NUMA configurations and applies version-specific calculation rules.  
  
For SQL Server 2016 and higher, the function also examines database-level MAXDOP settings, since these versions support per-database parallelism configuration that can override instance-level settings.  
  
Results include current settings, recommended values, and guidance notes about whether changes should be considered. The recommendations follow Microsoft's official guidelines but include warnings for scenarios where custom MAXDOP values may be intentionally set for specific applications.  
  
Inspired by Sakthivel Chidambaram's MAXDOP Calculator methodology and Microsoft's official guidance (KB 2806535).  
  
More info:  
https://support.microsoft.com/en-us/kb/2806535  
https://blogs.msdn.microsoft.com/sqlsakthi/2012/05/23/wow-we-have-maxdop-calculator-for-sql-server-it-makes-my-job-easier/

## Syntax

```powershell
Test-DbaMaxDop
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
PS C:\> Test-DbaMaxDop -SqlInstance sql2008, sqlserver2012
```

Get Max DOP setting for servers sql2008 and sqlserver2012 and also the recommended one.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaMaxDop -SqlInstance sql2014 | Select-Object *
```

Shows Max DOP setting for server sql2014 with the recommended value. Piping the output to Select-Object * will also show the 'NumaNodes' and 'NumberOfCores' of each instance<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaMaxDop -SqlInstance sqlserver2016 | Select-Object *
```

Get Max DOP setting for servers sql2016 with the recommended value. Piping the output to Select-Object * will also show the 'NumaNodes' and 'NumberOfCores' of each instance. Because it is an 2016 <br>
instance will be shown 'InstanceVersion', 'Database' and 'DatabaseMaxDop' columns.<br>

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
