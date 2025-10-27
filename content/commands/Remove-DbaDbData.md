---
title: "Remove-DbaDbData"
slug: "Remove-DbaDbData"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Truncates all user tables in specified databases to remove all data while preserving table structure."
tags:
  - "Table"
  - "Data"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbData.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbData"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbData</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbData.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Jess Pomfret (@jpomfret), jesspomfret.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Truncates all user tables in specified databases to remove all data while preserving table structure.

## Description

Removes all data from user tables by truncating each table in the specified databases. When foreign keys or views exist that would prevent truncation, the function automatically scripts them out, drops them temporarily, performs the truncation, then recreates the objects with their original definitions and permissions. This provides a fast way to clear databases for testing or development environments without having to rebuild schemas. The function excludes system databases and only processes user databases to prevent accidental damage to SQL Server internals.

## Syntax

```powershell
Remove-DbaDbData
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-InputObject] <Object[]>]
    [[-Path] <String>]
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
PS C:\> Remove-DbaDbData -SqlInstance localhost -Database dbname
```
{: data-copyable="true" data-clean-code="Remove-DbaDbData -SqlInstance localhost -Database dbname" }

Removes all data from the dbname database on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbData -SqlInstance mssql1 -ExcludeDatabase DBA -Confirm:$False
```
{: data-copyable="true" data-clean-code="Remove-DbaDbData -SqlInstance mssql1 -ExcludeDatabase DBA -Confirm:$False" }

Removes all data from all databases on mssql1 except the DBA Database. Doesn't prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> $svr = Connect-DbaInstance -SqlInstance mssql1
PS C:\> $svr | Remove-DbaDbData -Database AdventureWorks2017
```
{: data-copyable="true" data-clean-code="$svr = Connect-DbaInstance -SqlInstance mssql1
$svr | Remove-DbaDbData -Database AdventureWorks2017" }

Removes all data from AdventureWorks2017 on the mssql1 SQL Server Instance, uses piped input from Connect-DbaInstance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance mssql1 -Database AdventureWorks2017 | Remove-DbaDbData
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance mssql1 -Database AdventureWorks2017 | Remove-DbaDbData" }

Removes all data from AdventureWorks2017 on the mssql1 SQL Server Instance, uses piped input from Get-DbaDatabase.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

Specifies which databases to clear of data. Accepts wildcards for pattern matching.  
When omitted, the function processes all user databases on the instance. System databases are always excluded for safety.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from data removal operations. Use this to protect important databases when clearing multiple databases.  
Commonly used with production or reference databases that should remain untouched during development environment resets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts piped database objects from Get-DbaDatabase or server connections from Connect-DbaInstance.  
Use this for pipeline operations when you need to filter databases with complex criteria before clearing data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Path

Sets the temporary directory for storing drop and create scripts during the data removal process.  
The function creates temporary SQL scripts for foreign keys and views, then automatically removes them when complete. Defaults to the configured dbatools export path.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
