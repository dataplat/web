---
title: "Get-DbaModule"
slug: "Get-DbaModule"
date: 2024-01-01
layout: "single"
author: "Brandon Abshire, netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database modules (stored procedures, functions, views, triggers) modified after a specified date"
tags:
  - "General"
  - "Object"
  - "StoredProcedure"
  - "View"
  - "Table"
  - "Trigger"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaModule.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaModule"
draft: false
---

# Get-DbaModule

| Property | Value |
| --- | --- |
| **Author** | Brandon Abshire, netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaModule](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaModule.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaModule](https://dataplat.github.io/boh#Get-DbaModule).

## Synopsis

Retrieves database modules (stored procedures, functions, views, triggers) modified after a specified date

## Description

Queries sys.sql_modules and sys.objects to find database modules that have been modified within a specified timeframe, helping DBAs track recent code changes for troubleshooting, auditing, or deployment verification.  
Essential for identifying which stored procedures, functions, views, or triggers were altered during maintenance windows or after application deployments.  
Returns metadata including modification dates, schema names, and object types, with the actual module definition hidden by default but available when needed.  
Supports filtering by specific module types and can exclude system objects to focus on user-created code changes.

## Syntax

```powershell
Get-DbaModule
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-ModifiedSince] <DateTime>]
    [[-Type] <String[]>]
    [-ExcludeSystemDatabases]
    [-ExcludeSystemObjects]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaModule -SqlInstance sql2008, sqlserver2012
```

Return all modules for servers sql2008 and sqlserver2012 sorted by Database, Modify_Date ASC.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaModule -SqlInstance sql2008, sqlserver2012 | Select-Object *
```

Shows hidden definition column (informative wall of text).<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaModule -SqlInstance sql2008 -Database TestDB -ModifiedSince "2017-01-01 10:00:00"
```

Return all modules on server sql2008 for only the TestDB database with a modified date after 1 January 2017 10:00:00 AM.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaModule -SqlInstance sql2008 -Type View, Trigger, ScalarFunction
```

Return all modules on server sql2008 for all databases that are triggers, views or scalar functions.<br>

#####  Example:  5 

```powershell
PS C:\> 'sql2008' | Get-DbaModule -Database TestDB -Type View, StoredProcedure, ScalarFunction
```

Return all modules on server sql2008 for only the TestDB database that are stored procedures, views or scalar functions. Input via Pipeline<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2008 -ExcludeSystem | Get-DbaModule -Type View, Trigger, ScalarFunction
```

Return all modules on server sql2008 for all user databases that are triggers, views or scalar functions.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2008, sqlserver2012 -ExcludeUser | Get-DbaModule -Type StoredProcedure -ExcludeSystemObjects
```

Return all user created stored procedures in the system databases for servers sql2008 and sqlserver2012.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to search for modified modules. Accepts database names or wildcards for pattern matching.  
Use this when you need to focus on specific databases rather than scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the module search. Useful when you want to search most databases but skip certain ones like test or archive databases.  
Commonly used to exclude databases under maintenance or those known to have frequent module changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ModifiedSince

Returns only modules modified after this date and time. Defaults to 1900-01-01 to include all modules.  
Essential for tracking recent code changes after deployments, maintenance windows, or troubleshooting sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1900-01-01 |

##### -Type

Filters results to specific module types only. Valid choices include: View, TableValuedFunction, DefaultConstraint, StoredProcedure, Rule, InlineTableValuedFunction, Trigger, ScalarFunction.  
Use this when investigating specific types of database objects, such as finding all modified stored procedures after an application release.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | View,TableValuedFunction,DefaultConstraint,StoredProcedure,Rule,InlineTableValuedFunction,Trigger,ScalarFunction |

##### -ExcludeSystemDatabases

Excludes system databases (master, model, msdb, tempdb) from the search. Focus on user databases only.  
Recommended for routine auditing since system database changes are typically handled by SQL Server updates rather than application deployments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeSystemObjects

Excludes Microsoft-shipped system objects from results. Shows only user-created modules.  
Use this to filter out built-in SQL Server objects and focus on custom business logic that your team maintains.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline operations. Allows chaining commands together.  
Useful for complex filtering scenarios where you first select databases with specific criteria, then search for modules within those databases.

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
