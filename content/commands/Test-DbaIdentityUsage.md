---
title: "Test-DbaIdentityUsage"
slug: "Test-DbaIdentityUsage"
date: 2024-01-01
layout: "single"
author: "Brandon Abshire, netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Analyzes IDENTITY column seed consumption and calculates percentage of available range used."
tags:
  - "Identity"
  - "Table"
  - "Column"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaIdentityUsage.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaIdentityUsage"
draft: false
---

# Test-DbaIdentityUsage

| Property | Value |
| --- | --- |
| **Author** | Brandon Abshire, netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaIdentityUsage](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaIdentityUsage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaIdentityUsage](https://dataplat.github.io/boh#Test-DbaIdentityUsage).

## Synopsis

Analyzes IDENTITY column seed consumption and calculates percentage of available range used.

## Description

Scans IDENTITY columns across databases to calculate how much of the available seed range has been consumed based on data type limits (tinyint, smallint, int, bigint). This helps DBAs proactively identify tables approaching identity exhaustion before they hit maximum values and cause application failures. The function calculates percentage used by comparing current identity values against theoretical maximums, so you can plan remediation like reseeding or changing data types before problems occur.

## Syntax

```powershell
Test-DbaIdentityUsage
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Threshold] <Int32>]
    [-ExcludeSystem]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaIdentityUsage -SqlInstance sql2008, sqlserver2012
```

Check identity seeds for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaIdentityUsage -SqlInstance sql2008 -Database TestDB
```

Check identity seeds on server sql2008 for only the TestDB database<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaIdentityUsage -SqlInstance sql2008 -Database TestDB -Threshold 20
```

Check identity seeds on server sql2008 for only the TestDB database, limiting results to 20% utilization of seed range or higher<br>

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

##### -Database

Specifies which databases to scan for IDENTITY column usage. Accepts multiple database names as an array.  
Use this when you need to focus analysis on specific databases rather than scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

The database(s) to exclude - this list is auto-populated from the server

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Threshold

Allows you to specify a minimum % of the seed range being utilized.  This can be used to ignore seeds that have only utilized a small fraction of the range.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -ExcludeSystem

Allows you to suppress output on system databases

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
