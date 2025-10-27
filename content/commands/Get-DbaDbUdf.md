---
title: "Get-DbaDbUdf"
slug: "Get-DbaDbUdf"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves User Defined Functions from SQL Server databases with filtering and metadata"
tags:
  - "Udf"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbUdf.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbUdf"
draft: false
---

# Get-DbaDbUdf

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbUdf](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbUdf.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbUdf](https://dataplat.github.io/boh#Get-DbaDbUdf).

## Synopsis

Retrieves User Defined Functions from SQL Server databases with filtering and metadata

## Description

Retrieves all User Defined Functions (UDFs) from one or more SQL Server databases, returning detailed metadata including schema, creation dates, and data types. This function helps DBAs inventory custom database logic, analyze code dependencies during migrations, and audit user-created functions for security or performance reviews. You can filter results by database, schema, or function name, and exclude system functions to focus on custom business logic.

## Syntax

```powershell
Get-DbaDbUdf
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemUdf]
    [[-Schema] <String[]>]
    [[-ExcludeSchema] <String[]>]
    [[-Name] <String[]>]
    [[-ExcludeName] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbUdf -SqlInstance sql2016
```

Gets all database User Defined Functions<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbUdf -SqlInstance Server1 -Database db1
```

Gets the User Defined Functions for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbUdf -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the User Defined Functions for all databases except db1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbUdf -SqlInstance Server1 -ExcludeSystemUdf
```

Gets the User Defined Functions for all databases that are not system objects (there can be 100+ system User Defined Functions in each DB)<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbUdf
```

Gets the User Defined Functions for the databases on Sql1 and Sql2/sqlexpress<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

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

Specifies which databases to retrieve User Defined Functions from. Accepts wildcards for pattern matching.  
Use this when you need to audit UDFs in specific databases rather than scanning the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when retrieving User Defined Functions. Useful for excluding system databases or databases under maintenance.  
Commonly used to exclude tempdb, model, or large databases that don't contain custom business logic.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemUdf

Filters out built-in SQL Server system functions from the results, showing only custom user-created functions.  
Essential when auditing business logic since system databases can contain 100+ built-in UDFs that obscure custom code.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Schema

Limits results to User Defined Functions within specific schemas. Accepts multiple schema names.  
Useful for focusing on functions owned by particular applications or development teams, such as 'Sales' or 'Reporting' schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSchema

Excludes User Defined Functions from specific schemas when retrieving results.  
Helpful for filtering out legacy schemas, test schemas, or third-party application schemas that aren't relevant to your analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Retrieves specific User Defined Functions by name. Accepts multiple function names and supports wildcards.  
Use this when searching for particular functions during troubleshooting or when documenting specific business logic components.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeName

Excludes specific User Defined Functions from results by name. Supports wildcards for pattern matching.  
Useful for filtering out known test functions, deprecated functions, or utility functions that clutter audit reports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
