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

# Export-DbaDbRole

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaDbRole](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDbRole.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaDbRole](https://dataplat.github.io/boh#Export-DbaDbRole).

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

Exports all the Database Roles for SQL Server "sql2005" and writes them to the file "C:\temp\sql2005-logins.sql"<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2014a -ExcludeRole realcajun -SqlCredential $scred -Path C:\temp\roles.sql -Append
```

Authenticates to sqlserver2014a using SQL Authentication. Exports all roles except for realcajun to C:\temp\roles.sql, and appends to the file if it exists. If not, the file will be created.<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2014a -Role realcajun,netnerds -Path C:\temp\roles.sql
```

Exports ONLY roles netnerds and realcajun FROM sqlserver2014a to the file C:\temp\roles.sql<br>

#####  Example:  4 

```powershell
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2014a -Role realcajun,netnerds -Database HR, Accounting
```

Exports ONLY roles netnerds and realcajun FROM sqlserver2014a with the permissions on databases HR and Accounting<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqlserver2014a -Database HR, Accounting | Export-DbaDbRole
```

Exports ONLY roles FROM sqlserver2014a with permissions on databases HR and Accounting<br>

#####  Example:  6 

```powershell
PS C:\> Set-DbatoolsConfig -FullName formatting.batchseparator -Value $null
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2008 -Role realcajun,netnerds -Path C:\temp\roles.sql
```

Sets the BatchSeparator configuration to null, removing the default "GO" value.<br>
Exports ONLY roles netnerds and realcajun FROM sqlserver2008 server, to the C:\temp\roles.sql file, without the "GO" batch separator.<br>

#####  Example:  7 

```powershell
PS C:\> Export-DbaDbRole -SqlInstance sqlserver2008 -Role realcajun,netnerds -Path C:\temp\roles.sql -BatchSeparator $null
```

Exports ONLY roles netnerds and realcajun FROM sqlserver2008 server, to the C:\temp\roles.sql file, without the "GO" batch separator.<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqlserver2008 | Export-DbaDbRole -Role realcajun
```

Exports role realcajun for all databases on sqlserver2008<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaDbRole -SqlInstance sqlserver2008 -ExcludeFixedRole | Export-DbaDbRole
```

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
