---
title: "Get-DbaHelpIndex"
slug: "Get-DbaHelpIndex"
date: 2024-01-01
layout: "single"
author: "Nic Cain, sirsql.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves comprehensive index and statistics information from SQL Server databases for performance analysis and optimization."
tags:
  - "Database"
  - "Index"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaHelpIndex.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaHelpIndex"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaHelpIndex</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaHelpIndex.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Nic Cain, sirsql.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves comprehensive index and statistics information from SQL Server databases for performance analysis and optimization.

## Description

This function queries SQL Server DMVs to return detailed index and statistics information for performance analysis, index maintenance planning, and identifying optimization opportunities. You can target all indexes in a database or focus on a specific table to analyze index usage patterns, sizes, and fragmentation levels.  
  
Essential for DBAs performing index tuning, this command helps identify unused indexes for removal, oversized indexes consuming storage, and indexes requiring maintenance based on fragmentation or usage statistics. The data combines structural information (key columns, include columns, filters) with runtime metrics (reads, updates, last used) to provide a complete index health picture.  
  
Uses SQL Server DMVs and system tables, requiring SQL Server 2005 or later. For performance reasons, certain statistics details are limited in SQL Server 2005 unless you specify a specific table with the ObjectName parameter.  
  
The data includes:  
- ObjectName: the table containing the index  
- IndexType: clustered/non-clustered/columnstore and whether the index is unique/primary key  
- KeyColumns: the key columns of the index  
- IncludeColumns: any include columns in the index  
- FilterDefinition: any filter that may have been used in the index  
- DataCompression: row/page/none depending upon whether or not compression has been used  
- IndexReads: the number of reads of the index since last restart or index rebuild  
- IndexUpdates: the number of writes to the index since last restart or index rebuild  
- SizeKB: the size the index in KB  
- IndexRows: the number of the rows in the index (note filtered indexes will have fewer rows than exist in the table)  
- IndexLookups: the number of lookups that have been performed (only applicable for the heap or clustered index)  
- MostRecentlyUsed: when the index was most recently queried (default to 1900 for when never read)  
- StatsSampleRows: the number of rows queried when the statistics were built/rebuilt (not included in SQL Server 2005 unless ObjectName is specified)  
- StatsRowMods: the number of changes to the statistics since the last rebuild  
- HistogramSteps: the number of steps in the statistics histogram (not included in SQL Server 2005 unless ObjectName is specified)  
- StatsLastUpdated: when the statistics were last rebuilt (not included in SQL Server 2005 unless ObjectName is specified)

## Syntax

```powershell
Get-DbaHelpIndex
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-InputObject] <Database[]>]
    [[-ObjectName] <String>]
    [-IncludeStats]
    [-IncludeDataTypes]
    [-Raw]
    [-IncludeFragmentation]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaHelpIndex -SqlInstance localhost -Database MyDB
```
{: data-copyable="true" data-clean-code="Get-DbaHelpIndex -SqlInstance localhost -Database MyDB" }

Returns information on all indexes on the MyDB database on the localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaHelpIndex -SqlInstance localhost -Database MyDB,MyDB2
```
{: data-copyable="true" data-clean-code="Get-DbaHelpIndex -SqlInstance localhost -Database MyDB,MyDB2" }

Returns information on all indexes on the MyDB & MyDB2 databases.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -ObjectName dbo.Table1
```
{: data-copyable="true" data-clean-code="Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -ObjectName dbo.Table1" }

Returns index information on the object dbo.Table1 in the database MyDB.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -ObjectName dbo.Table1 -IncludeStats
```
{: data-copyable="true" data-clean-code="Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -ObjectName dbo.Table1 -IncludeStats" }

Returns information on the indexes and statistics for the table dbo.Table1 in the MyDB database.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -ObjectName dbo.Table1 -IncludeDataTypes
```
{: data-copyable="true" data-clean-code="Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -ObjectName dbo.Table1 -IncludeDataTypes" }

Returns the index information for the table dbo.Table1 in the MyDB database, and includes the data types for the key and include columns.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -ObjectName dbo.Table1 -Raw
```
{: data-copyable="true" data-clean-code="Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -ObjectName dbo.Table1 -Raw" }

Returns the index information for the table dbo.Table1 in the MyDB database, and returns the numerical data without localized separators.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -IncludeStats -Raw
```
{: data-copyable="true" data-clean-code="Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -IncludeStats -Raw" }

Returns the index information for all indexes in the MyDB database as well as their statistics, and formats the numerical data without localized separators.<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -IncludeFragmentation
```
{: data-copyable="true" data-clean-code="Get-DbaHelpIndex -SqlInstance localhost -Database MyDB -IncludeFragmentation" }

Returns the index information for all indexes in the MyDB database as well as their fragmentation<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017 -Database MyDB | Get-DbaHelpIndex
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2017 -Database MyDB | Get-DbaHelpIndex" }

Returns the index information for all indexes in the MyDB database<br>

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

Specifies which databases to analyze for index and statistics information. Accepts multiple database names and wildcard patterns.  
Use this when you need to focus your analysis on specific databases rather than scanning the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Databases to skip during the index analysis process. Useful for excluding system databases or databases currently under maintenance.  
Commonly used to exclude tempdb or databases that are offline or in restoring state.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline processing.  
Enables filtering databases first, then analyzing only the indexes on those specific databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ObjectName

Targets index analysis to a specific table using either single name (uses default schema) or two-part naming like 'schema.table'.  
Essential when troubleshooting performance issues on a specific table or when you need detailed statistics information on SQL Server 2005 instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeStats

Returns statistics objects in addition to indexes, providing complete picture of query optimization structures.  
Use this when analyzing query plan issues or determining which statistics might be missing or stale for specific tables.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeDataTypes

Adds data type information for all key and include columns in the index definitions.  
Helpful when analyzing index key size, planning composite indexes, or understanding why certain indexes might be inefficient.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Raw

Returns numeric values without formatting (no thousands separators) and Size as a dbasize object.  
Use this when feeding results into other functions or when you need precise numeric values for calculations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeFragmentation

Adds fragmentation percentage data by querying sys.dm_db_index_physical_stats with DETAILED mode.  
Critical for index maintenance planning but significantly increases execution time on large databases with many indexes.

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
