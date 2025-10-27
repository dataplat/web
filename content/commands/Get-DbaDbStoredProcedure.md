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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbStoredProcedure</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbStoredProcedure.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDbaKlaas)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaDbStoredProcedure -SqlInstance sql2016" }

Gets all database Stored Procedures<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1" }

Gets the Stored Procedures for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -ExcludeDatabase db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbStoredProcedure -SqlInstance Server1 -ExcludeDatabase db1" }

Gets the Stored Procedures for all databases except db1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -ExcludeSystemSp
```
{: data-copyable="true" data-clean-code="Get-DbaDbStoredProcedure -SqlInstance Server1 -ExcludeSystemSp" }

Gets the Stored Procedures for all databases that are not system objects<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbStoredProcedure
```
{: data-copyable="true" data-clean-code="'Sql1','Sql2/sqlexpress' | Get-DbaDbStoredProcedure" }

Gets the Stored Procedures for the databases on Sql1 and Sql2/sqlexpress<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance Server1 -ExcludeSystem | Get-DbaDbStoredProcedure
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance Server1 -ExcludeSystem | Get-DbaDbStoredProcedure" }

Pipe the databases from Get-DbaDatabase into Get-DbaDbStoredProcedure<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1 -Name schema1.proc1
```
{: data-copyable="true" data-clean-code="Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1 -Name schema1.proc1" }

Gets the Stored Procedure proc1 in the schema1 schema in the db1 database<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Name db1.schema1.proc1
```
{: data-copyable="true" data-clean-code="Get-DbaDbStoredProcedure -SqlInstance Server1 -Name db1.schema1.proc1" }

Gets the Stored Procedure proc1 in the schema1 schema in the db1 database<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1 -Name proc1
```
{: data-copyable="true" data-clean-code="Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1 -Name proc1" }

Gets the Stored Procedure proc1 in the db1 database<br>

#####  Example:  10 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1 -Schema schema1
```
{: data-copyable="true" data-clean-code="Get-DbaDbStoredProcedure -SqlInstance Server1 -Database db1 -Schema schema1" }

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
