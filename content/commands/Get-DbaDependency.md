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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDependency</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDependency.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="$table = (Get-DbaDatabase -SqlInstance sql2012 -Database Northwind).tables | Where-Object Name -eq Customers
$table | Get-DbaDependency" }

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
