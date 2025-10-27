---
title: "Export-DbaDbRole"
slug: "Export-DbaDbRole"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Generates T-SQL scripts for database role definitions with their complete permission sets and schema ownership"
tags:
  - "Export"
  - "Role"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDbRole.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaDbRole"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaDbRole</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDbRole.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Patrick Flynn (@sqllensman)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Generates T-SQL scripts for database role definitions with their complete permission sets and schema ownership

## Description

Creates executable T-SQL scripts that fully define database roles including CREATE ROLE statements, granular object permissions, and schema ownership assignments. The output captures every permission granted to custom roles across all database securables like tables, schemas, assemblies, and certificates so you can recreate identical security configurations in other environments. This is particularly useful for migrating role-based security between development, test, and production databases, or documenting security configurations for compliance audits.  
  
This command is based off of John Eisbrener's post "Fully Script out a MSSQL Database Role"  
Reference:  https://dbaeyes.wordpress.com/2013/04/19/fully-script-out-a-mssql-database-role/

## Syntax

```powershell
Export-DbaDbRole
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <Object[]>]
    [[-ScriptingOptionsObject] <ScriptingOptions>]
    [[-Database] <Object[]>]
    [[-Role] <Object[]>]
    [[-ExcludeRole] <Object[]>]
    [-ExcludeFixedRole]
    [-IncludeRoleMember]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [-Passthru]
    [[-BatchSeparator] <String>]
    [-NoClobber]
    [-Append]
    [-NoPrefix]
    [[-Encoding] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaDbRole -SqlInstance sql2005 -Path C:\temp
```
{: data-copyable="true" data-clean-code="Export-DbaDbRole -SqlInstance sql2005 -Path C:\temp" }

Exports all the Database Roles for SQL Server "sql2005" and writes them to the file "C:\temp\sql2005-logins.sql"<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2014a -ExcludeRole realcajun -SqlCredential $scred -Path C:\temp\roles.sql -Append
```
{: data-copyable="true" data-clean-code="Export-DbaDbRole -SqlInstance sqlserver2014a -ExcludeRole realcajun -SqlCredential $scred -Path C:\temp\roles.sql -Append" }

Authenticates to sqlserver2014a using SQL Authentication. Exports all roles except for realcajun to C:\temp\roles.sql, and appends to the file if it exists. If not, the file will be created.<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2014a -Role realcajun,netnerds -Path C:\temp\roles.sql
```
{: data-copyable="true" data-clean-code="Export-DbaDbRole -SqlInstance sqlserver2014a -Role realcajun,netnerds -Path C:\temp\roles.sql" }

Exports ONLY roles netnerds and realcajun FROM sqlserver2014a to the file C:\temp\roles.sql<br>

#####  Example:  4 

```powershell
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2014a -Role realcajun,netnerds -Database HR, Accounting
```
{: data-copyable="true" data-clean-code="Export-DbaDbRole -SqlInstance sqlserver2014a -Role realcajun,netnerds -Database HR, Accounting" }

Exports ONLY roles netnerds and realcajun FROM sqlserver2014a with the permissions on databases HR and Accounting<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqlserver2014a -Database HR, Accounting | Export-DbaDbRole
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sqlserver2014a -Database HR, Accounting | Export-DbaDbRole" }

Exports ONLY roles FROM sqlserver2014a with permissions on databases HR and Accounting<br>

#####  Example:  6 

```powershell
PS C:\> Set-DbatoolsConfig -FullName formatting.batchseparator -Value $null
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2008 -Role realcajun,netnerds -Path C:\temp\roles.sql
```
{: data-copyable="true" data-clean-code="Set-DbatoolsConfig -FullName formatting.batchseparator -Value $null
Export-DbaDbRole -SqlInstance sqlserver2008 -Role realcajun,netnerds -Path C:\temp\roles.sql" }

Sets the BatchSeparator configuration to null, removing the default "GO" value.<br>
Exports ONLY roles netnerds and realcajun FROM sqlserver2008 server, to the C:\temp\roles.sql file, without the "GO" batch separator.<br>

#####  Example:  7 

```powershell
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2008 -Role realcajun,netnerds -Path C:\temp\roles.sql -BatchSeparator $null
```
{: data-copyable="true" data-clean-code="Export-DbaDbRole -SqlInstance sqlserver2008 -Role realcajun,netnerds -Path C:\temp\roles.sql -BatchSeparator $null" }

Exports ONLY roles netnerds and realcajun FROM sqlserver2008 server, to the C:\temp\roles.sql file, without the "GO" batch separator.<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqlserver2008 | Export-DbaDbRole -Role realcajun
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sqlserver2008 | Export-DbaDbRole -Role realcajun" }

Exports role realcajun for all databases on sqlserver2008<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaDbRole -SqlInstance sqlserver2008 -ExcludeFixedRole | Export-DbaDbRole
```
{: data-copyable="true" data-clean-code="Get-DbaDbRole -SqlInstance sqlserver2008 -ExcludeFixedRole | Export-DbaDbRole" }

Exports all roles from all databases on sqlserver2008, excludes all roles marked as as FixedRole<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. SQL Server 2005 and above supported.  
Any databases in CompatibilityLevel 80 or lower will be skipped

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

##### -InputObject

Accepts database role objects from Get-DbaDbRole, database objects from Get-DbaDatabase, or server instances.  
Use this when you need to export roles from a filtered set of databases or specific role objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ScriptingOptionsObject

Controls T-SQL script generation options using an SMO ScriptingOptions object from New-DbaScriptingOption.  
Customize output format, object naming, and scripting behavior to match your deployment requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to export role definitions from. Accepts wildcards for pattern matching.  
Use this when you need role scripts for specific databases rather than processing all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Role

Specifies which database roles to export. Accepts wildcards and multiple role names.  
Use this when you need scripts for specific custom roles rather than all roles in the database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeRole

Excludes specific database roles from the export operation. Accepts wildcards and multiple role names.  
Useful when you want most roles except certain application-specific or sensitive roles.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeFixedRole

Excludes built-in SQL Server fixed database roles like db_datareader, db_datawriter, and db_owner.  
Use this when you only want to export custom application roles and not the standard SQL Server roles.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeRoleMember

Includes ALTER ROLE statements to add existing members back to the roles.  
Use this when you need to recreate both the role definitions and their current membership assignments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Path

Specifies the output directory for generated SQL script files. Defaults to the configured DbatoolsExport path.  
Each database gets its own script file named with the instance and database name for organization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the exact file path for the output script. Auto-generates filename based on instance and database if not provided.  
Only use this when processing a single database, as multiple databases would overwrite the same file.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Passthru

Outputs the T-SQL script to the console instead of writing to files.  
Use this to review the generated scripts before saving them or to pipe output to other commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BatchSeparator

Sets the batch separator between T-SQL statements in the output script. Defaults to "GO" from configuration.  
Change this when deploying to tools that require different batch separators or set to null to remove separators entirely.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Formatting.BatchSeparator') |

##### -NoClobber

Prevents overwriting existing files at the target location. The operation will fail if files already exist.  
Use this as a safety measure when you want to avoid accidentally replacing existing role scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds the generated T-SQL scripts to the end of existing files rather than overwriting them.  
Use this to combine role scripts from multiple operations into a single deployment file.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoPrefix

Removes the header comment block that includes creation timestamp, user, and source information.  
Use this when you need clean T-SQL scripts without metadata comments for automated deployments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Encoding

Sets the character encoding for output files. Defaults to UTF8 for broad compatibility.  
Change to Unicode when working with international character sets in role names or comments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UTF8 |
| Accepted Values | ASCII,BigEndianUnicode,Byte,String,Unicode,UTF7,UTF8,Unknown |

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
