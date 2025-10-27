---
title: "Get-DbaDbFile"
slug: "Get-DbaDbFile"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves comprehensive database file information including size, growth, I/O statistics, and storage details."
tags:
  - "Storage"
  - "Data"
  - "File"
  - "Log"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbFile"
draft: false
---

# Get-DbaDbFile

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbFile](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbFile](https://dataplat.github.io/boh#Get-DbaDbFile).

## Synopsis

Retrieves comprehensive database file information including size, growth, I/O statistics, and storage details.

## Description

Retrieves detailed information about database files (data and log files) from SQL Server instances using direct T-SQL queries for optimal performance. This function provides comprehensive file metadata including current size, used space, growth settings, I/O statistics, and volume free space information that DBAs need for capacity planning, performance analysis, and storage management. Unlike SMO-based approaches, this command avoids costly enumeration operations and provides faster results when analyzing file configurations across multiple databases.

## Syntax

```powershell
Get-DbaDbFile
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-FileGroup] <Object[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbFile -SqlInstance sql2016
```

Will return an object containing all file groups and their contained files for every database on the sql2016 SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbFile -SqlInstance sql2016 -Database Impromptu
```

Will return an object containing all file groups and their contained files for the Impromptu Database on the sql2016 SQL Server instance<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbFile -SqlInstance sql2016 -Database Impromptu, Trading
```

Will return an object containing all file groups and their contained files for the Impromptu and Trading databases on the sql2016 SQL Server instance<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database Impromptu, Trading | Get-DbaDbFile
```

Will accept piped input from Get-DbaDatabase and return an object containing all file groups and their contained files for the Impromptu and Trading databases on the sql2016 SQL Server instance<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbFile -SqlInstance sql2016 -Database AdventureWorks2017 -FileGroup Index
```

Return any files that are in the Index filegroup of the AdventureWorks2017 database.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

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

Specifies which databases to analyze for file information. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases rather than scanning all databases on the instance.  
Particularly useful for capacity planning or troubleshooting file growth issues on targeted databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the file analysis. Accepts wildcards for pattern matching.  
Use this to skip system databases, test databases, or databases you don't need to analyze.  
Helpful when performing routine file space reviews while avoiding databases that don't require monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileGroup

Filters results to show only files within the specified filegroup name.  
Use this when analyzing specific filegroups for space utilization, I/O patterns, or growth planning.  
Particularly valuable when troubleshooting performance issues or planning filegroup-specific storage migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from other dbatools commands like Get-DbaDatabase.  
Use this for advanced filtering scenarios or when chaining multiple dbatools commands together.  
Allows you to pre-filter databases using complex criteria before analyzing their file information.

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
