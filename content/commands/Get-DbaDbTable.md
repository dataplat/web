---
title: "Get-DbaDbTable"
slug: "Get-DbaDbTable"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves table metadata including space usage, row counts, and table features from SQL Server databases"
tags:
  - "Database"
  - "Tables"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbTable.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbTable"
draft: false
---

# Get-DbaDbTable

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbTable](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbTable.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbTable](https://dataplat.github.io/boh#Get-DbaDbTable).

## Synopsis

Retrieves table metadata including space usage, row counts, and table features from SQL Server databases

## Description

Returns detailed table information including row counts, space usage (IndexSpaceUsed, DataSpaceUsed), and special table characteristics like memory optimization, partitioning, and FileTable status. Essential for database capacity planning, documentation, and finding tables with specific features across multiple databases. Supports complex three-part naming with special characters and can filter by database, schema, or specific table names.

## Syntax

```powershell
Get-DbaDbTable
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [-IncludeSystemDBs]
    [[-Table] <String[]>]
    [[-Schema] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance DEV01 -Database Test1
```

Return all tables in the Test1 database<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance DEV01 -Database MyDB -Table MyTable
```

Return only information on the table MyTable from the database MyDB<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance DEV01 -Database MyDB -Table MyTable -Schema MySchema
```

Return only information on the table MyTable from the database MyDB and only from the schema MySchema<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance DEV01 -Table MyTable
```

Returns information on table called MyTable if it exists in any database on the server, under any schema<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance DEV01 -Table dbo.[First.Table]
```

Returns information on table called First.Table on schema dbo if it exists in any database on the server<br>

#####  Example:  6 

```powershell
PS C:\> 'localhost','localhost\namedinstance' | Get-DbaDbTable -Database DBA -Table Commandlog
```

Returns information on the CommandLog table in the DBA database on both instances localhost and the named instance localhost\namedinstance<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance DEV01 -Table "[[DbName]]].[Schema.With.Dots].[`"[Process]]`"]" -Verbose
```

Return table information for instance Dev01 and table Process with special characters in the schema name<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.

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

Specifies which databases to retrieve table information from. Accepts multiple database names and wildcards.  
Use this when you need table data from specific databases instead of scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from table retrieval. Accepts multiple database names and wildcards.  
Helpful when you want most databases but need to skip problematic or irrelevant ones like temp databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemDBs

Includes system databases (master, model, msdb, tempdb) in the table scan.  
By default system databases are excluded since they rarely contain user tables of interest.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Table

Specifies specific tables to retrieve using one, two, or three-part naming (table, schema.table, or database.schema.table).  
Use this when you need information on particular tables instead of all tables in the database.  
Wrap names containing special characters in square brackets and escape actual ] characters by doubling them.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Filters results to tables within specific schemas. Accepts multiple schema names.  
Useful for focusing on application schemas while excluding utility or system schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input.  
Use this when you have already filtered databases and want to pass them directly for table processing.

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
