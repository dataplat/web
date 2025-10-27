---
title: "Find-DbaView"
slug: "Find-DbaView"
date: 2024-01-01
layout: "single"
author: "Claudio Silva  (@ClaudioESSilva)"
availability: "Windows, Linux, macOS"
synopsis: "Searches database views for specific text patterns or regular expressions in their definitions."
tags:
  - "View"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaView.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaView"
draft: false
---

# Find-DbaView

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva  (@ClaudioESSilva) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaView](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaView.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaView](https://dataplat.github.io/boh#Find-DbaView).

## Synopsis

Searches database views for specific text patterns or regular expressions in their definitions.

## Description

Scans view definitions across one or more databases to locate specific text patterns, table references, or code constructs. This helps DBAs identify views that reference particular tables before schema changes, find views containing sensitive data patterns like email addresses or SSNs, or locate views with specific business logic during troubleshooting. The function searches the actual view definition text (TextBody) and returns the matching views along with line numbers showing exactly where the pattern was found, making it easy to understand the context of each match.

## Syntax

```powershell
Find-DbaView
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
PS C:\> Find-DbaView -SqlInstance DEV01 -Pattern whatever
```

Searches all user databases views for "whatever" in the text body<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaView -SqlInstance sql2016 -Pattern '\w+@\w+\.\w+'
```

Searches all databases for all views that contain a valid email pattern in the text body<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaView -SqlInstance DEV01 -Database MyDB -Pattern 'some string' -Verbose
```

Searches in "mydb" database views for "some string" in the text body<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaView -SqlInstance sql2016 -Database MyDB -Pattern RUNTIME -IncludeSystemObjects
```

Searches in "mydb" database views for "runtime" in the text body<br>

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

Specifies the text pattern or regular expression to search for within view definitions. Supports full regex syntax for complex pattern matching.  
Use this to find views referencing specific tables before schema changes, locate sensitive data patterns like email addresses or SSNs, or identify views containing particular business logic.  
Common patterns include table names, column references, function calls, or data validation expressions.

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

Specifies which databases to search for views containing the pattern. Accepts wildcards and multiple database names.  
Use this when you need to limit the search scope to specific databases instead of scanning all databases on the instance.  
Particularly useful for large instances where you only need to check certain application databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the view search operation. Accepts multiple database names.  
Use this to exclude large databases that you know don't contain relevant views, speeding up the search process.  
Common exclusions include development copies, archive databases, or third-party application databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemObjects

Includes system views in the search operation alongside user-created views. System views are excluded by default.  
Use this when troubleshooting issues that might involve system view dependencies or when documenting complete database schemas.  
Warning: Including system views significantly slows down the search, especially when scanning multiple databases or large instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSystemDatabases

Includes system databases (master, model, msdb, tempdb) in the view search operation. System databases are excluded by default.  
Use this when investigating SQL Server internals, troubleshooting replication issues, or documenting complete instance configurations.  
Most DBA tasks focus on user databases, so this parameter is typically used for advanced troubleshooting scenarios.

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
