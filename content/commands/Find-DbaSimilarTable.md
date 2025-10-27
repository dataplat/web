---
title: "Find-DbaSimilarTable"
slug: "Find-DbaSimilarTable"
date: 2024-01-01
layout: "single"
author: "Jana Sattainathan (@SQLJana), sqljana.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Finds tables and views with similar structures by comparing column names across databases"
tags:
  - "Table"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaSimilarTable.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaSimilarTable"
draft: false
---

# Find-DbaSimilarTable

| Property | Value |
| --- | --- |
| **Author** | Jana Sattainathan (@SQLJana), sqljana.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaSimilarTable](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaSimilarTable.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaSimilarTable](https://dataplat.github.io/boh#Find-DbaSimilarTable).

## Synopsis

Finds tables and views with similar structures by comparing column names across databases

## Description

Analyzes table and view structures across databases by comparing column names using INFORMATION_SCHEMA views. Returns a match percentage showing how similar structures are based on shared column names.  
  
Perfect for finding archive tables that mirror production structures, identifying tables that might serve similar purposes across databases, or discovering where specific table patterns are used throughout your SQL Server environment.  
  
You can search across all databases or target specific databases, schemas, or tables. The function calculates match percentages so you can set minimum thresholds to filter results and focus on the most relevant matches.  
  
More information can be found here: https://sqljana.wordpress.com/2017/03/31/sql-server-find-tables-with-similar-table-structure/

## Syntax

```powershell
Find-DbaSimilarTable
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-SchemaName] <String>]
    [[-TableName] <String>]
    [-ExcludeViews]
    [-IncludeSystemDatabases]
    [[-MatchPercentThreshold] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01
```

Searches all user database tables and views for each, returns all tables or views with their matching tables/views and match percent<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks
```

Searches AdventureWorks database and lists tables/views and their corresponding matching tables/views with match percent<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks -SchemaName HumanResource
```

Searches AdventureWorks database and lists tables/views in the HumanResource schema with their corresponding matching tables/views with match percent<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks -SchemaName HumanResource -Table Employee
```

Searches AdventureWorks database and lists tables/views in the HumanResource schema and table Employee with its corresponding matching tables/views with match percent<br>

#####  Example:  5 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks -MatchPercentThreshold 60
```

Searches AdventureWorks database and lists all tables/views with its corresponding matching tables/views with match percent greater than or equal to 60<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input

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

Specifies which databases to search for similar table structures. Accepts multiple database names.  
Use this to limit the search scope when you know which databases contain the tables you're comparing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the similarity search. Accepts multiple database names.  
Useful for skipping temp databases, development copies, or databases with known irrelevant structures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SchemaName

Limits the search to tables within a specific schema. Only tables in this schema will be used as reference structures.  
Use this when comparing tables within a logical grouping like 'Sales', 'HR', or 'Archive' schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TableName

Uses a specific table as the reference structure to find similar tables across databases.  
Perfect for finding archive versions of production tables or identifying tables that mirror a known structure.  
When the table exists in multiple schemas, all instances are used as reference points.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeViews

Excludes views from both the reference objects and the comparison results, focusing only on physical tables.  
Use this when you need to find similar table structures for data migration or archiving where views aren't relevant.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSystemDatabases

Includes system databases (master, model, msdb, tempdb) in the similarity search.  
Typically used when troubleshooting system table relationships or comparing custom objects in system databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MatchPercentThreshold

Sets the minimum percentage of matching column names required to include a table pair in results.  
Use values like 50 for loose matches, 80 for close structural similarity, or 95 for near-identical tables.  
Zero matches are always excluded regardless of this threshold.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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
