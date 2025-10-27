---
title: "Find-DbaTrigger"
slug: "Find-DbaTrigger"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva)"
availability: "Windows, Linux, macOS"
synopsis: "Searches trigger code across server, database, and object levels for specific text patterns or regex matches."
tags:
  - "Trigger"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaTrigger.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaTrigger"
draft: false
---

# Find-DbaTrigger

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaTrigger](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaTrigger.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaTrigger](https://dataplat.github.io/boh#Find-DbaTrigger).

## Synopsis

Searches trigger code across server, database, and object levels for specific text patterns or regex matches.

## Description

Searches through SQL Server trigger definitions to find specific text patterns, supporting both literal strings and regular expressions. Examines triggers at three levels: server-level triggers, database-level DDL triggers, and object-level DML triggers on tables and views.  
  
This is particularly useful when you need to find triggers that reference specific objects before making schema changes, locate hardcoded values that need updating, or audit trigger code for compliance requirements. The function returns matching lines with line numbers, making it easy to pinpoint exactly where patterns occur in trigger code.  
  
When you specify specific databases, server-level trigger searches are skipped to focus the search scope. The function uses efficient SQL queries against system catalog views to examine trigger definitions without loading all trigger objects into memory.

## Syntax

```powershell
Find-DbaTrigger
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-Pattern] <String>
    [[-TriggerLevel] <String>]
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
PS C:\> Find-DbaTrigger -SqlInstance DEV01 -Pattern whatever
```

Searches all user databases triggers for "whatever" in the text body<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaTrigger -SqlInstance sql2016 -Pattern '\w+@\w+\.\w+'
```

Searches all databases for all triggers that contain a valid email pattern in the text body<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaTrigger -SqlInstance DEV01 -Database MyDB -Pattern 'some string' -Verbose
```

Searches in "mydb" database triggers for "some string" in the text body<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaTrigger -SqlInstance sql2016 -Database MyDB -Pattern RUNTIME -IncludeSystemObjects
```

Searches in "mydb" database triggers for "runtime" in the text body<br>

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

The text pattern or regular expression to search for within trigger definitions. Supports full regex syntax for complex pattern matching.  
Use this to find triggers containing specific table names, column references, or code patterns before making schema changes.  
Results show matching lines with line numbers to pinpoint exactly where the pattern occurs.

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

Specifies which databases to search for triggers. Accepts an array of database names for targeting specific databases.  
When specified, server-level triggers are automatically excluded from the search to focus on database and object-level triggers.  
If omitted, searches all user databases plus any server-level triggers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the trigger search. Accepts an array of database names to skip during processing.  
Use this when you want to search most databases but avoid specific ones like staging or temporary databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TriggerLevel

Controls which types of triggers to search: Server (instance-level logon triggers), Database (DDL triggers), Object (DML triggers on tables and views), or All.  
Use specific levels to narrow your search when you know what type of trigger contains the pattern you're looking for.  
Defaults to All, which searches server-level triggers, database DDL triggers, and object-level DML triggers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | All |
| Accepted Values | All,Server,Database,Object |

##### -IncludeSystemObjects

Includes system-created triggers in the search results. By default, only user-created triggers are searched.  
Use this when you need to examine built-in triggers for troubleshooting or audit purposes.  
Warning: This significantly impacts performance when searching across multiple databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSystemDatabases

Includes system databases (master, model, msdb, tempdb) in the trigger search. By default, only user databases are searched.  
Use this when troubleshooting system-level issues or when you need to examine triggers in system databases for audit purposes.

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
