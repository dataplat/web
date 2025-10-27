---
title: "Get-DbaDbSpace"
slug: "Get-DbaDbSpace"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed space usage metrics for all database files including used space, free space, and growth settings."
tags:
  - "Database"
  - "Space"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSpace.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbSpace"
draft: false
---

# Get-DbaDbSpace

| Property | Value |
| --- | --- |
| **Author** | Michael Fal (@Mike_Fal), mikefal.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbSpace](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSpace.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbSpace](https://dataplat.github.io/boh#Get-DbaDbSpace).

## Synopsis

Retrieves detailed space usage metrics for all database files including used space, free space, and growth settings.

## Description

Queries sys.database_files and FILEPROPERTY to return comprehensive space information for data and log files across databases. Shows current usage, available free space, autogrowth configuration, and space remaining until maximum file size limits are reached. Essential for capacity planning, identifying files approaching size limits, and monitoring database storage consumption patterns.  
  
File free space script borrowed and modified from Glenn Berry's DMV scripts (http://www.sqlskills.com/blogs/glenn/category/dmv-queries/)

## Syntax

```powershell
Get-DbaDbSpace
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [-IncludeSystemDBs]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbSpace -SqlInstance localhost
```

Returns all user database files and free space information for the localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbSpace -SqlInstance localhost | Where-Object {$_.PercentUsed -gt 80}
```

Returns all user database files and free space information for the local host. Filters the output object by any files that have a percent used of greater than 80%.<br>

#####  Example:  3 

```powershell
PS C:\> 'localhost','localhost\namedinstance' | Get-DbaDbSpace
```

Returns all user database files and free space information for the localhost and localhost\namedinstance SQL Server instances. Processes data via the pipeline.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSpace -SqlInstance localhost -Database db1, db2 | Where-Object { $_.SpaceUntilMaxSize.Megabyte -lt 1 }
```

Returns database files and free space information for the db1 and db2 on localhost where there is only 1MB left until the space is maxed out<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSpace -SqlInstance localhost -Database db1, db2 | Where-Object { $_.SpaceUntilMaxSize.Gigabyte -lt 1 }
```

Returns database files and free space information for the db1 and db2 on localhost where there is only 1GB left until the space is maxed out<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Limits space analysis to specific databases by name. Accepts multiple values and supports wildcards.  
Use this when monitoring space usage for critical databases or investigating specific capacity issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from space analysis by name. Accepts multiple values and supports wildcards.  
Useful for skipping test databases, staging environments, or databases with known space issues when doing server-wide capacity reviews.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemDBs

This parameter is deprecated and will cause the function to stop with an error message.  
To include system databases in space analysis, pipe results from Get-DbaDatabase with the -IncludeSystem parameter instead.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase for space analysis.  
This allows for advanced filtering scenarios, such as analyzing only databases with specific properties like recovery models or creation dates.

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
