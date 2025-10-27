---
title: "Find-DbaStoredProcedure"
slug: "Find-DbaStoredProcedure"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Searches stored procedure definitions for specific text patterns or regex expressions across SQL Server databases."
tags:
  - "StoredProcedure"
  - "Proc"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaStoredProcedure.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaStoredProcedure"
draft: false
---

# Find-DbaStoredProcedure

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaStoredProcedure](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaStoredProcedure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaStoredProcedure](https://dataplat.github.io/boh#Find-DbaStoredProcedure).

## Synopsis

Searches stored procedure definitions for specific text patterns or regex expressions across SQL Server databases.

## Description

Searches through stored procedure source code to find specific strings, patterns, or regex expressions within the procedure definitions. This is particularly useful for finding hardcoded values, deprecated function calls, security vulnerabilities, or specific business logic across your database environment. The function examines the actual T-SQL code stored in sys.sql_modules and can search across multiple databases simultaneously. Results include the matching line numbers and context, making it easy to locate exactly where patterns appear within each procedure. You can scope searches to specific databases and choose whether to include system stored procedures and system databases in the search.

## Syntax

```powershell
Find-DbaStoredProcedure
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-Pattern] <String>
    [-IncludeSystemObjects]
    [-IncludeSystemDatabases]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaStoredProcedure -SqlInstance DEV01 -Pattern whatever
```

Searches all user databases stored procedures for "whatever" in the text body<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaStoredProcedure -SqlInstance sql2016 -Pattern '\w+@\w+\.\w+'
```

Searches all databases for all stored procedures that contain a valid email pattern in the text body<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaStoredProcedure -SqlInstance DEV01 -Database MyDB -Pattern 'some string' -Verbose
```

Searches in "mydb" database stored procedures for "some string" in the text body<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaStoredProcedure -SqlInstance sql2016 -Database MyDB -Pattern RUNTIME -IncludeSystemObjects
```

Searches in "mydb" database stored procedures for "runtime" in the text body<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Pattern

Specifies the text pattern or regular expression to search for within stored procedure definitions. Supports full regex syntax for complex pattern matching.  
Use this to find hardcoded values, deprecated functions, security vulnerabilities, or specific business logic across procedure source code.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

Specifies which databases to search for stored procedures containing the pattern. Accepts database names and supports wildcards.  
When omitted, searches all user databases on the instance. Use this to focus searches on specific databases when you know where procedures are located.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the stored procedure search. Accepts database names and supports wildcards.  
Use this when you want to search most databases but exclude specific ones like test environments or databases with sensitive procedures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemObjects

Includes system stored procedures (those shipped with SQL Server) in the search results. By default, only user-created procedures are searched.  
Use this when investigating system procedures or when patterns might exist in Microsoft-provided code. Warning: this significantly slows performance when searching multiple databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSystemDatabases

Includes system databases (master, model, msdb, tempdb) in the search scope. By default, only user databases are searched.  
Use this when investigating system procedures or when your pattern might exist in maintenance scripts stored in system databases.

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
