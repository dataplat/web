---
title: "Rename-DbaDatabase"
slug: "Rename-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold)"
availability: "Windows, Linux, macOS"
synopsis: "Renames database names, filegroups, logical files, and physical files using customizable templates with placeholder support."
tags:
  - "Database"
  - "Rename"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Rename-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Rename-DbaDatabase"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Rename-DbaDatabase</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Rename-DbaDatabase.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Simone Bizzotto (@niphold)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Renames database names, filegroups, logical files, and physical files using customizable templates with placeholder support.

## Description

Systematically renames all database components using template-based naming conventions to enforce consistent standards across your SQL Server environment.  
This function addresses the common challenge of standardizing database naming when inheriting inconsistent systems or implementing new naming policies.  
  
The renaming process follows SQL Server's object hierarchy and executes in this order:  
- Database name is changed (optionally forcing users out)  
- Filegroup names are changed accordingly  
- Logical file names are changed accordingly  
- Physical file names are changed accordingly  
- If Move is specified, the database goes offline for file operations, then back online  
- If Move is not specified, the database remains online (unless SetOffline), and you handle file moves manually  
  
The function uses powerful template placeholders like <DBN> for database name, <FGN> for filegroup name, <DATE> for current date, and <FT> for file type.  
When naming conflicts occur, automatic counters are appended to ensure uniqueness.  
If any step fails, the entire process stops to prevent partial renames that could leave your database in an inconsistent state.  
  
Always backup your databases before using this function, and take a full backup of master after completion.  
The function returns detailed objects showing all completed renames, with hidden properties providing human-readable summaries.  
  
Store results in a variable for troubleshooting: "$result = Rename-DbaDatabase ....."  
Use the -Preview parameter first to see exactly what changes would occur: "Rename-DbaDatabase .... -Preview | Select-Object *"

## Syntax

```powershell
Rename-DbaDatabase -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    [-DatabaseName <String>]
    [-FileGroupName <String>]
    [-LogicalName <String>]
    [-FileName <String>]
    [-ReplaceBefore]
    [-Force]
    [-Move]
    [-SetOffline]
    [-Preview]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Rename-DbaDatabase
    [-SqlCredential <PSCredential>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    [-DatabaseName <String>]
    [-FileGroupName <String>]
    [-LogicalName <String>]
    [-FileName <String>]
    [-ReplaceBefore]
    [-Force]
    [-Move]
    [-SetOffline]
    [-Preview]
    -InputObject <Database[]>
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
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName HR2 -Preview | Select-Object *
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName HR2 -Preview | Select-Object *" }

Shows the detailed result set you'll get renaming the HR database to HR2 without doing anything<br>

#####  Example:  2 

```powershell
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName HR2
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName HR2" }

Renames the HR database to HR2<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqlserver2014a -Database HR | Rename-DbaDatabase -DatabaseName HR2
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sqlserver2014a -Database HR | Rename-DbaDatabase -DatabaseName HR2" }

Same as before, but with a piped database (renames the HR database to HR2)<br>

#####  Example:  4 

```powershell
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName "dbatools_<DBN>"
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName &quot;dbatools_&lt;DBN&gt;&quot;" }

Renames the HR database to dbatools_HR<br>

#####  Example:  5 

```powershell
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName "dbatools_<DBN>_<DATE>"
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName &quot;dbatools_&lt;DBN&gt;_&lt;DATE&gt;&quot;" }

Renames the HR database to dbatools_HR_20170807 (if today is 07th Aug 2017)<br>

#####  Example:  6 

```powershell
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -FileGroupName "dbatools_<FGN>"
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -FileGroupName &quot;dbatools_&lt;FGN&gt;&quot;" }

Renames every FileGroup within HR to "dbatools_[the original FileGroup name]"<br>

#####  Example:  7 

```powershell
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName "dbatools_<DBN>" -FileGroupName "<DBN>_<FGN>"
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName &quot;dbatools_&lt;DBN&gt;&quot; -FileGroupName &quot;&lt;DBN&gt;_&lt;FGN&gt;&quot;" }

Renames the HR database to "dbatools_HR", then renames every FileGroup within to "dbatools_HR_[the original FileGroup name]"<br>

#####  Example:  8 

```powershell
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -FileGroupName "dbatools_<DBN>_<FGN>"
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName "dbatools_<DBN>"
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -FileGroupName &quot;dbatools_&lt;DBN&gt;_&lt;FGN&gt;&quot;
Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName &quot;dbatools_&lt;DBN&gt;&quot;" }

Renames the HR database to "dbatools_HR", then renames every FileGroup within to "dbatools_HR_[the original FileGroup name]"<br>

#####  Example:  9 

```powershell
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName "dbatools_<DBN>" -FileName "<DBN>_<FGN>_<FNN>"
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName &quot;dbatools_&lt;DBN&gt;&quot; -FileName &quot;&lt;DBN&gt;_&lt;FGN&gt;_&lt;FNN&gt;&quot;" }

Renames the HR database to "dbatools_HR" and then all filenames as "dbatools_HR_[Name of the FileGroup]_[original_filename]"<br>
The db stays online (watch out!). You can then proceed manually to move/copy files by hand, set the db offline and then online again to finish the rename process<br>

#####  Example:  10 

```powershell
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName "dbatools_<DBN>" -FileName "<DBN>_<FGN>_<FNN>" -SetOffline
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName &quot;dbatools_&lt;DBN&gt;&quot; -FileName &quot;&lt;DBN&gt;_&lt;FGN&gt;_&lt;FNN&gt;&quot; -SetOffline" }

Renames the HR database to "dbatools_HR" and then all filenames as "dbatools_HR_[Name of the FileGroup]_[original_filename]"<br>
The db is then set offline (watch out!). You can then proceed manually to move/copy files by hand and then set it online again to finish the rename process<br>

#####  Example:  11 

```powershell
PS C:\> Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName "dbatools_<DBN>" -FileName "<DBN>_<FGN>_<FNN>" -Move
```
{: data-copyable="true" data-clean-code="Rename-DbaDatabase -SqlInstance sqlserver2014a -Database HR -DatabaseName &quot;dbatools_&lt;DBN&gt;&quot; -FileName &quot;&lt;DBN&gt;_&lt;FGN&gt;_&lt;FNN&gt;&quot; -Move" }

Renames the HR database to "dbatools_HR" and then all filenames as "dbatools_HR_[Name of the FileGroup]_[original_filename]"<br>
The db is then set offline (watch out!). The function tries to do a simple rename and then sets the db online again to finish the rename process<br>

### Required Parameters

##### -SqlInstance

Target any number of instances, in order to return their build state.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from the pipeline, typically from Get-DbaDatabase. Allows for advanced filtering and database selection before renaming.  
Use this when you need complex database selection logic or when chaining database operations in a pipeline.

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

Specifies which databases to include in the renaming operation. Accepts database names, wildcards, or arrays of database names.  
Use this when you need to rename specific databases instead of all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude from the renaming operation. Accepts database names, wildcards, or arrays of database names.  
Use this to protect specific databases when using -AllDatabases or when you want to process most databases except certain ones.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllDatabases

Applies the renaming operation to all user databases on the SQL Server instance. System databases are automatically excluded.  
Use this switch when standardizing naming conventions across your entire instance rather than targeting specific databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DatabaseName

Specifies a template for renaming database names using placeholder substitution. Creates new database names based on the template pattern.  
Use this when you need to standardize database names according to organizational naming conventions. Common patterns include adding prefixes, suffixes, or date stamps.  
Valid placeholders are: <DBN> (current database name), <DATE> (current date in yyyyMMdd format).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileGroupName

Specifies a template for renaming filegroup names within databases using placeholder substitution. Note that the PRIMARY filegroup cannot be renamed due to SQL Server restrictions.  
Use this when you need consistent filegroup naming across databases or when implementing data organization strategies that require specific filegroup names.  
Valid placeholders are: <FGN> (current filegroup name), <DBN> (current database name), <DATE> (current date in yyyyMMdd format). If distinct names cannot be generated, a counter is appended (0001,   
0002, etc).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LogicalName

Specifies a template for renaming the logical names of database files using placeholder substitution. Logical names are used internally by SQL Server to reference files.  
Use this when you need consistent logical file naming for backup operations, maintenance scripts, or troubleshooting, as logical names are referenced in many SQL commands.  
Valid placeholders are: <FT> (file type: ROWS, LOG, MMO, FS), <LGN> (current logical name), <FGN> (current filegroup name), <DBN> (current database name), <DATE> (current date in yyyyMMdd format). If   
distinct names cannot be generated, a counter is appended (0001, 0002, etc).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileName

Specifies a template for renaming physical database file names on disk using placeholder substitution. Changes only the file name, preserving the original directory and file extension.  
Use this when you need to align physical file names with your database naming standards for easier file management, monitoring, and disaster recovery operations.  
Valid placeholders are: <FNN> (current file name without directory or extension), <FT> (file type: ROWS, LOG, MMO, FS), <LGN> (current logical name), <FGN> (current filegroup name), <DBN> (current   
database name), <DATE> (current date in yyyyMMdd format). If distinct names cannot be generated, a counter is appended (0001, 0002, etc).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReplaceBefore

Modifies how placeholder substitution works by removing old database, filegroup, and logical names from current names before applying templates. This prevents duplicate naming components in nested   
scenarios.  
Use this when your existing names already contain components that would be duplicated by the template placeholders, resulting in cleaner final names.  
For example, with -ReplaceBefore, renaming database "HR_DB" to "PROD_HR" and using template "<DBN>_Data" results in "PROD_HR_Data" instead of "PROD_HR_HR_DB_Data".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Terminates all active connections to target databases to allow renaming operations to proceed. Required when databases have active connections that would prevent rename operations.  
Use this when you need to force database renames in production environments where applications may maintain persistent connections.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Move

Automatically moves physical database files to match renamed file names. Sets the database offline, performs file operations, then brings the database back online.  
Use this for a complete automated renaming solution when you want the function to handle all file operations. Requires PowerShell remoting access to the SQL Server's file system.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SetOffline

Forces the database offline after renaming operations to prepare for manual file moves. Terminates active connections and sets database state to offline.  
Use this when you need to rename physical files but want to handle the file movement operations manually rather than having the function move them automatically.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Preview

Displays what renaming operations would be performed without executing any changes to the databases. Shows the complete rename plan including all affected components.  
Use this first to verify your templates and parameters will produce the desired results before committing to actual database changes.

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
