---
title: "Find-DbaDbUnusedIndex"
slug: "Find-DbaDbUnusedIndex"
date: 2024-01-01
layout: "single"
author: "Aaron Nelson (@SQLvariant), SQLvariant.com"
availability: "Windows, Linux, macOS"
synopsis: "Identifies database indexes with low usage statistics that may be candidates for removal"
tags:
  - "Index"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbUnusedIndex.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaDbUnusedIndex"
draft: false
---

# Find-DbaDbUnusedIndex

| Property | Value |
| --- | --- |
| **Author** | Aaron Nelson (@SQLvariant), SQLvariant.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaDbUnusedIndex](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbUnusedIndex.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaDbUnusedIndex](https://dataplat.github.io/boh#Find-DbaDbUnusedIndex).

## Synopsis

Identifies database indexes with low usage statistics that may be candidates for removal

## Description

Analyzes index usage statistics from sys.dm_db_index_usage_stats to identify indexes with minimal activity that consume storage space and slow down data modifications without providing query performance benefits.  
  
This function helps DBAs optimize database performance by finding indexes that are rarely or never used, so you can safely remove them to reduce maintenance overhead, speed up INSERT/UPDATE/DELETE operations, and free up disk space. The function uses customizable thresholds for seeks, scans, and lookups to define what constitutes "unused," with safety checks to ensure SQL Server has been running long enough (7+ days) for reliable statistics.  
  
Supports clustered and non-clustered indexes on SQL Server 2005 and higher, with additional data compression information available on SQL Server 2008+. Results include index size, row count, and detailed usage patterns to help prioritize which indexes to drop first.

## Syntax

```powershell
Find-DbaDbUnusedIndex
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-IgnoreUptime]
    [[-Seeks] <Int32>]
    [[-Scans] <Int32>]
    [[-Lookups] <Int32>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaDbUnusedIndex -SqlInstance sql2016 -Database db1, db2
```

Finds unused indexes on db1 and db2 on sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaDbUnusedIndex -SqlInstance sql2016 -SqlCredential $cred
```

Finds unused indexes on db1 and db2 on sql2016 using SQL Authentication to connect to the server<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 | Find-DbaDbUnusedIndex
```

Finds unused indexes on all databases on sql2016<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2019 | Find-DbaDbUnusedIndex -Seeks 10 -Scans 100 -Lookups 1000
```

Finds 'unused' indexes with user_seeks < 10, user_scans < 100, and user_lookups < 1000 on all databases on sql2019.<br>
Note that these additional parameters provide flexibility to define what is considered an 'unused' index.<br>

### Optional Parameters

##### -SqlInstance

The SQL Server you want to check for unused indexes.

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

Specifies which databases to analyze for unused indexes. Accepts wildcards for pattern matching.  
Use this when you want to focus on specific databases rather than scanning the entire instance, which is helpful for large environments or targeted maintenance windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the unused index analysis. Accepts wildcards for pattern matching.  
Commonly used to skip system databases, read-only databases, or databases undergoing maintenance that shouldn't be modified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IgnoreUptime

Bypasses the 7-day uptime check that normally prevents analysis on recently restarted instances.  
Use this when you need results from a server with recent restarts, but be aware that usage statistics may not reflect normal workload patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Seeks

Sets the threshold for user seeks below which an index is considered unused. Default is 1.  
User seeks occur when the query optimizer uses the index to efficiently locate specific rows. Increase this value to find indexes with very low seek activity rather than completely unused ones.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |

##### -Scans

Sets the threshold for user scans below which an index is considered unused. Default is 1.  
User scans happen when queries read multiple rows through the index, often for range queries or aggregations. Higher values help identify indexes with minimal scan activity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |

##### -Lookups

Sets the threshold for user lookups below which an index is considered unused. Default is 1.  
User lookups occur when a nonclustered index is used to locate rows that are then retrieved from the clustered index. This typically indicates bookmark lookup operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline operations.  
This allows you to chain commands and apply complex database filtering logic before analyzing unused indexes.

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
