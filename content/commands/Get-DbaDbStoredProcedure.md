---
title: "Get-DbaDbStoredProcedure"
slug: "Get-DbaDbStoredProcedure"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves stored procedures from SQL Server databases with detailed metadata and filtering options"
tags:
  - "Database"
  - "StoredProcedure"
  - "Proc"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbStoredProcedure.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbStoredProcedure"
draft: false
---

# Get-DbaDbStoredProcedure

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbStoredProcedure](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbStoredProcedure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbStoredProcedure](https://dataplat.github.io/boh#Get-DbaDbStoredProcedure).

## Synopsis

Retrieves stored procedures from SQL Server databases with detailed metadata and filtering options

## Description

Retrieves stored procedures from one or more SQL Server databases, returning detailed information including schema, creation dates, and implementation details. This function helps DBAs inventory stored procedures across instances, analyze database objects for documentation or migration planning, and locate specific procedures by name or schema. You can filter results by database, schema, or procedure name, and exclude system stored procedures to focus on user-defined objects. Supports multi-part naming conventions for precise targeting of specific procedures.

## Syntax

```powershell
Get-DbaDbStoredProcedure
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemSp]
    [[-Name] <String[]>]
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
PS C:\> Get-DbaDbStoredProcedure -SqlInstance sql2016
```

Gets all database Stored Procedures<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1
```

Gets the Stored Procedures for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the Stored Procedures for all databases except db1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -ExcludeSystemSp
```

Gets the Stored Procedures for all databases that are not system objects<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbStoredProcedure
```

Gets the Stored Procedures for the databases on Sql1 and Sql2/sqlexpress<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance Server1 -ExcludeSystem | Get-DbaDbStoredProcedure
```

Pipe the databases from Get-DbaDatabase into Get-DbaDbStoredProcedure<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1 -Name schema1.proc1
```

Gets the Stored Procedure proc1 in the schema1 schema in the db1 database<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Name db1.schema1.proc1
```

Gets the Stored Procedure proc1 in the schema1 schema in the db1 database<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1 -Name proc1
```

Gets the Stored Procedure proc1 in the db1 database<br>

#####  Example:  10 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1 -Schema schema1
```

Gets the Stored Procedures in schema1 for the db1 database<br>

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

Specifies which databases to search for stored procedures. Accepts database names and supports wildcards.  
Use this when you need to focus on specific databases instead of searching across all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specified databases from the stored procedure search. Accepts database names and supports wildcards.  
Useful when you want results from most databases but need to skip specific ones like development or staging databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemSp

Excludes system stored procedures from results, showing only user-defined stored procedures.  
Use this when you want to focus on custom business logic and avoid the hundreds of built-in SQL Server system procedures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Name

Specifies exact stored procedure names to retrieve. Supports two-part names (schema.procedure) and three-part names (database.schema.procedure).  
Use this when searching for specific procedures by name rather than browsing all procedures in a database or schema.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Filters results to stored procedures within the specified schema(s). Accepts multiple schema names.  
Useful for organizing results by application area or when working with multi-tenant databases that separate objects by schema.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline processing.  
Use this to chain commands when you need to filter databases first, then retrieve stored procedures from the filtered results.

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
