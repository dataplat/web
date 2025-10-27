---
title: "Find-DbaDbDisabledIndex"
slug: "Find-DbaDbDisabledIndex"
date: 2024-01-01
layout: "single"
author: "Jason Squires, sqlnotnull.com"
availability: "Windows, Linux, macOS"
synopsis: "Identifies disabled indexes across SQL Server databases"
tags:
  - "Index"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbDisabledIndex.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaDbDisabledIndex"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaDbDisabledIndex</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbDisabledIndex.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Jason Squires, sqlnotnull.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Identifies disabled indexes across SQL Server databases

## Description

Scans SQL Server databases to locate indexes that have been disabled, returning detailed information including database, schema, table, and index names. Disabled indexes consume storage space but aren't maintained during data modifications, making them candidates for cleanup or re-enabling. This is useful for database maintenance, performance troubleshooting, and identifying indexes that were disabled during bulk operations but never re-enabled.

## Syntax

```powershell
Find-DbaDbDisabledIndex
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-NoClobber]
    [-Append]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaDbDisabledIndex -SqlInstance sql2005
```
{: data-copyable="true" data-clean-code="Find-DbaDbDisabledIndex -SqlInstance sql2005" }

Generates the SQL statements to drop the selected disabled indexes on server "sql2005".<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaDbDisabledIndex -SqlInstance sqlserver2016 -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Find-DbaDbDisabledIndex -SqlInstance sqlserver2016 -SqlCredential $cred" }

Generates the SQL statements to drop the selected disabled indexes on server "sqlserver2016", using SQL Authentication to connect to the database.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaDbDisabledIndex -SqlInstance sqlserver2016 -Database db1, db2
```
{: data-copyable="true" data-clean-code="Find-DbaDbDisabledIndex -SqlInstance sqlserver2016 -Database db1, db2" }

Generates the SQL Statement to drop selected indexes in databases db1 & db2 on server "sqlserver2016".<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaDbDisabledIndex -SqlInstance sqlserver2016
```
{: data-copyable="true" data-clean-code="Find-DbaDbDisabledIndex -SqlInstance sqlserver2016" }

Generates the SQL statements to drop selected indexes on all user databases.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to scan for disabled indexes. Accepts multiple database names and supports wildcards.  
When not specified, all accessible user databases on the instance will be scanned.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the disabled index scan. Useful when you want to scan most databases but skip certain ones like staging or temp databases.  
Accepts multiple database names to exclude from the operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoClobber

Prevents overwriting existing output files when used with file export functionality.  
Note: This parameter is currently not implemented in the function logic.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Appends results to existing output files instead of overwriting them when used with file export functionality.  
Note: This parameter is currently not implemented in the function logic.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
