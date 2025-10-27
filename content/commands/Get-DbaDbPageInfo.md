---
title: "Get-DbaDbPageInfo"
slug: "Get-DbaDbPageInfo"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed page allocation information from SQL Server databases for storage analysis and troubleshooting"
tags:
  - "Database"
  - "Page"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbPageInfo.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbPageInfo"
draft: false
---

# Get-DbaDbPageInfo

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbPageInfo](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbPageInfo.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbPageInfo](https://dataplat.github.io/boh#Get-DbaDbPageInfo).

## Synopsis

Retrieves detailed page allocation information from SQL Server databases for storage analysis and troubleshooting

## Description

This function queries the sys.dm_db_database_page_allocations dynamic management view to return detailed information about page allocation, including page type, free space percentage, allocation status, and mixed page allocation indicators.  
Use this when troubleshooting storage issues, analyzing space utilization patterns, or investigating page-level performance problems in your databases.  
Results can be filtered by specific databases, schemas, and tables to focus your analysis on problem areas.  
Requires SQL Server 2012 or higher as it depends on the sys.dm_db_database_page_allocations DMV.

## Syntax

```powershell
Get-DbaDbPageInfo
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Schema] <String[]>]
    [[-Table] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbPageInfo -SqlInstance sql2017
```

Returns page information for all databases on sql2017<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbPageInfo -SqlInstance sql2017, sql2016 -Database testdb
```

Returns page information for the testdb on sql2017 and sql2016<br>

#####  Example:  3 

```powershell
PS C:\> $servers | Get-DbaDatabase -Database testdb | Get-DbaDbPageInfo
```

Returns page information for the testdb on all $servers<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

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

Specifies which databases to analyze for page allocation information. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases rather than scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Limits the analysis to tables within specific schemas only. Multiple schema names can be provided.  
Helpful when troubleshooting page issues in specific application schemas or when you want to exclude system schemas from results.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Restricts page information retrieval to specific tables only. Can be combined with Schema parameter for precise targeting.  
Use this when investigating page allocation problems for known problematic tables or when performing focused storage analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase, allowing you to chain commands together.  
This enables scenarios like getting databases from multiple instances and then analyzing their page information in a single pipeline.

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
