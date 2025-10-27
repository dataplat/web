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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaStoredProcedure</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaStoredProcedure.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stephen Bennett, sqlnotesfromtheunderground.wordpress.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Find-DbaStoredProcedure -SqlInstance DEV01 -Pattern whatever" }

Searches all user databases stored procedures for "whatever" in the text body<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaStoredProcedure -SqlInstance sql2016 -Pattern '\w+@\w+\.\w+'
```
{: data-copyable="true" data-clean-code="Find-DbaStoredProcedure -SqlInstance sql2016 -Pattern '\w+@\w+\.\w+'" }

Searches all databases for all stored procedures that contain a valid email pattern in the text body<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaStoredProcedure -SqlInstance DEV01 -Database MyDB -Pattern 'some string' -Verbose
```
{: data-copyable="true" data-clean-code="Find-DbaStoredProcedure -SqlInstance DEV01 -Database MyDB -Pattern 'some string' -Verbose" }

Searches in "mydb" database stored procedures for "some string" in the text body<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaStoredProcedure -SqlInstance sql2016 -Database MyDB -Pattern RUNTIME -IncludeSystemObjects
```
{: data-copyable="true" data-clean-code="Find-DbaStoredProcedure -SqlInstance sql2016 -Database MyDB -Pattern RUNTIME -IncludeSystemObjects" }

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
