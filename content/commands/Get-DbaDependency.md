---
title: "Get-DbaDependency"
slug: "Get-DbaDependency"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Maps SQL Server object dependencies and generates creation scripts in proper deployment order"
tags:
  - "Dependency"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDependency.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDependency"
draft: false
---

# Get-DbaDependency

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDependency](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDependency.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDependency](https://dataplat.github.io/boh#Get-DbaDependency).

## Synopsis

Maps SQL Server object dependencies and generates creation scripts in proper deployment order

## Description

This function discovers SQL Server object dependencies using SMO (SQL Server Management Objects) and returns detailed information including creation scripts and deployment order.  
By default, it finds all objects that depend on your input object - perfect for impact analysis before making changes or understanding what might break if you modify something.  
  
The function returns objects in hierarchical tiers, showing you exactly which objects need to be created first when deploying to a new environment.  
Each result includes the T-SQL creation script, so you can generate deployment scripts in the correct dependency order without manually figuring out prerequisites.  
  
Use the 'Parents' switch to reverse the direction and find what your object depends on instead - useful for understanding all the prerequisites needed before creating or moving an object.  
This is particularly valuable when migrating individual objects between environments or troubleshooting missing dependencies.  
  
For more details on dependency relationships, see:  
https://technet.microsoft.com/en-us/library/ms345449(v=sql.105).aspx

## Syntax

```powershell
Get-DbaDependency
    [[-InputObject] <Object>]
    [-AllowSystemObjects]
    [-Parents]
    [-IncludeSelf]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $table = (Get-DbaDatabase -SqlInstance sql2012 -Database Northwind).tables | Where-Object Name -eq Customers
PS C:\> $table | Get-DbaDependency
```

Returns everything that depends on the "Customers" table<br>

### Optional Parameters

##### -InputObject

Specifies the SQL Server object (table, view, stored procedure, function, etc.) to analyze for dependencies.  
Accepts any SMO object from Get-DbaDatabase, Get-DbaDbTable, Get-DbaDbStoredProcedure, and similar commands.  
Use this when you need to understand what objects will be affected by changes to a specific database object.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -AllowSystemObjects

Includes system objects like sys tables, system functions, and built-in stored procedures in dependency results.  
Use this when you need complete dependency mapping including SQL Server internal objects.  
Most DBAs can leave this off since system dependencies rarely impact deployment or migration planning.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Parents

Reverses the dependency direction to show what objects the input depends on rather than what depends on it.  
Essential for understanding prerequisites when migrating objects or troubleshooting "object not found" errors.  
Use this to identify all dependencies that must exist before you can create or restore the target object.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSelf

Includes the original input object in the results along with its dependencies.  
Helpful when generating complete deployment scripts that need to recreate both the object and everything it depends on.  
Commonly used when exporting database schemas or preparing objects for cross-environment deployment.

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
