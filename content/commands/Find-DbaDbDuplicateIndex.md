---
title: "Find-DbaDbDuplicateIndex"
slug: "Find-DbaDbDuplicateIndex"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva)"
availability: "Windows, Linux, macOS"
synopsis: "Identifies duplicate and overlapping indexes that waste storage space and degrade insert performance"
tags:
  - "Index"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbDuplicateIndex.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaDbDuplicateIndex"
draft: false
---

# Find-DbaDbDuplicateIndex

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaDbDuplicateIndex](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbDuplicateIndex.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaDbDuplicateIndex](https://dataplat.github.io/boh#Find-DbaDbDuplicateIndex).

## Synopsis

Identifies duplicate and overlapping indexes that waste storage space and degrade insert performance

## Description

Scans database tables to identify indexes that have identical or overlapping column structures, which consume unnecessary storage space and slow down insert, update, and delete operations. Duplicate indexes have exactly the same key columns, included columns, and filter conditions, while overlapping indexes share some key columns but differ in others.  
  
Use this during index maintenance to eliminate redundant indexes before they impact performance. The function analyzes sys.indexes and related catalog views to compare column structures, accounting for column order and sort direction. On SQL Server 2008 and higher, filtered indexes are properly differentiated using the IsFiltered property.  
  
Supports both clustered and nonclustered indexes on user tables, excluding system objects. Returns comprehensive index details including size in MB, row counts, compression settings (2008+), and disabled/filtered status to help prioritize which duplicates to remove.  
  
Output includes:  
TableName, IndexName, KeyColumns, IncludedColumns, IndexSizeMB, IndexType, CompressionDescription (2008+), RowCount, IsDisabled, IsFiltered (2008+)

## Syntax

```powershell
Find-DbaDbDuplicateIndex
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [-IncludeOverlapping]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaDbDuplicateIndex -SqlInstance sql2005
```

Returns duplicate indexes found on sql2005<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaDbDuplicateIndex -SqlInstance sql2017 -SqlCredential sqladmin
```

Finds exact duplicate indexes on all user databases present on sql2017, using SQL authentication.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaDbDuplicateIndex -SqlInstance sql2017 -Database db1, db2
```

Finds exact duplicate indexes on the db1 and db2 databases.<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaDbDuplicateIndex -SqlInstance sql2017 -IncludeOverlapping
```

Finds both duplicate and overlapping indexes on all user databases.<br>

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

Specifies which databases to analyze for duplicate indexes. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases instead of scanning all databases on the instance, which can be time-consuming on servers with many databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeOverlapping

Finds indexes that share some key columns but have different column structures, not just exact duplicates.  
Use this to identify indexes where one might be redundant because it's covered by another with additional columns.  
For example, an index on (CustomerID) would be flagged as overlapping with an index on (CustomerID, OrderDate).

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
