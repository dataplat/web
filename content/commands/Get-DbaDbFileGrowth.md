---
title: "Get-DbaDbFileGrowth"
slug: "Get-DbaDbFileGrowth"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database file auto-growth settings and maximum size limits"
tags:
  - "Storage"
  - "Data"
  - "File"
  - "Log"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFileGrowth.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbFileGrowth"
draft: false
---

# Get-DbaDbFileGrowth

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbFileGrowth](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFileGrowth.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbFileGrowth](https://dataplat.github.io/boh#Get-DbaDbFileGrowth).

## Synopsis

Retrieves database file auto-growth settings and maximum size limits

## Description

Retrieves auto-growth configuration for data and log files across SQL Server databases, including growth type (percentage or fixed MB), growth increment values, and maximum size limits. This function helps DBAs quickly identify databases with problematic growth settings like percentage-based growth on large files, unlimited growth configurations, or insufficient growth increments that could cause performance issues during auto-growth events.

## Syntax

```powershell
Get-DbaDbFileGrowth
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbFileGrowth -SqlInstance sql2017, sql2016, sql2012
```

Gets all database file growths on sql2017, sql2016, sql2012<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbFileGrowth -SqlInstance sql2017, sql2016, sql2012 -Database pubs
```

Gets the database file growth info for pubs on sql2017, sql2016, sql2012<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database test | Get-DbaDbFileGrowth
```

Gets the test database file growth information on sql2016<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

Specifies which databases to analyze for file growth settings. Accepts wildcards for pattern matching.  
Use this when you need to check growth configuration for specific databases instead of all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input.  
Use this when you want to analyze file growth settings for databases already retrieved by another dbatools command.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
