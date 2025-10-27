---
title: "Get-DbaDbMemoryUsage"
slug: "Get-DbaDbMemoryUsage"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed buffer pool memory consumption by database and page type for performance analysis."
tags:
  - "Memory"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMemoryUsage.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMemoryUsage"
draft: false
---

# Get-DbaDbMemoryUsage

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMemoryUsage](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMemoryUsage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMemoryUsage](https://dataplat.github.io/boh#Get-DbaDbMemoryUsage).

## Synopsis

Retrieves detailed buffer pool memory consumption by database and page type for performance analysis.

## Description

Analyzes SQL Server buffer pool memory usage by querying sys.dm_os_buffer_descriptors to show exactly how much memory each database consumes, broken down by page type (data pages, index pages, etc.). This helps DBAs identify memory-hungry databases that may be impacting instance performance and guides decisions about memory allocation, database optimization, or server capacity planning.  
  
The results include both raw page counts and percentage of total buffer pool consumed, making it easy to spot databases that are taking disproportionate memory resources. Use this when troubleshooting memory pressure, planning database migrations, or optimizing buffer pool utilization across multiple databases.  
  
This command is based on query provided by Aaron Bertrand.  
Reference: https://www.mssqltips.com/sqlservertip/2393/determine-sql-server-memory-use-by-database-and-object/

## Syntax

```powershell
Get-DbaDbMemoryUsage
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-IncludeSystemDb]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbMemoryUsage -SqlInstance sqlserver2014a
```

Returns the buffer pool consumption for all user databases<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMemoryUsage -SqlInstance sqlserver2014a -IncludeSystemDb
```

Returns the buffer pool consumption for all user databases and system databases<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMemoryUsage -SqlInstance sql1 -IncludeSystemDb -Database tempdb
```

Returns the buffer pool consumption for tempdb database only<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbMemoryUsage -SqlInstance sql2 -IncludeSystemDb -Exclude 'master','model','msdb','ResourceDb'
```

Returns the buffer pool consumption for all user databases and tempdb database<br>

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
For MFA support, please use Connect-DbaInstance..

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Restricts analysis to specific databases by name. Accepts multiple database names or wildcard patterns.  
Use this when investigating memory usage for particular databases rather than analyzing the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the memory analysis by name. Accepts multiple database names.  
Useful for filtering out known databases that aren't relevant to your current investigation or capacity planning.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemDb

Includes system databases (master, model, msdb, tempdb, ResourceDb) in the memory consumption analysis.  
Use this when troubleshooting overall instance memory pressure or when tempdb memory usage is a concern.

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
