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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaModule</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaModule.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Brandon Abshire, netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaModule -SqlInstance sql2008, sqlserver2012" }

Return all modules for servers sql2008 and sqlserver2012 sorted by Database, Modify_Date ASC.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaModule -SqlInstance sql2008, sqlserver2012 | Select-Object *
```
{: data-copyable="true" data-clean-code="Get-DbaModule -SqlInstance sql2008, sqlserver2012 | Select-Object *" }

Shows hidden definition column (informative wall of text).<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaModule -SqlInstance sql2008 -Database TestDB -ModifiedSince "2017-01-01 10:00:00"
```
{: data-copyable="true" data-clean-code="Get-DbaModule -SqlInstance sql2008 -Database TestDB -ModifiedSince &quot;2017-01-01 10:00:00&quot;" }

Return all modules on server sql2008 for only the TestDB database with a modified date after 1 January 2017 10:00:00 AM.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaModule -SqlInstance sql2008 -Type View, Trigger, ScalarFunction
```
{: data-copyable="true" data-clean-code="Get-DbaModule -SqlInstance sql2008 -Type View, Trigger, ScalarFunction" }

Return all modules on server sql2008 for all databases that are triggers, views or scalar functions.<br>

#####  Example:  5 

```powershell
PS C:\> 'sql2008' | Get-DbaModule -Database TestDB -Type View, StoredProcedure, ScalarFunction
```
{: data-copyable="true" data-clean-code="'sql2008' | Get-DbaModule -Database TestDB -Type View, StoredProcedure, ScalarFunction" }

Return all modules on server sql2008 for only the TestDB database that are stored procedures, views or scalar functions. Input via Pipeline<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2008 -ExcludeSystem | Get-DbaModule -Type View, Trigger, ScalarFunction
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2008 -ExcludeSystem | Get-DbaModule -Type View, Trigger, ScalarFunction" }

Return all modules on server sql2008 for all user databases that are triggers, views or scalar functions.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2008, sqlserver2012 -ExcludeUser | Get-DbaModule -Type StoredProcedure -ExcludeSystemObjects
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2008, sqlserver2012 -ExcludeUser | Get-DbaModule -Type StoredProcedure -ExcludeSystemObjects" }

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
