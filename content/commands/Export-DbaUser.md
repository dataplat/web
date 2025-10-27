---
title: "Export-DbaUser"
slug: "Export-DbaUser"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva)"
availability: "Windows, Linux, macOS"
synopsis: "Generates T-SQL scripts to recreate database users with their complete security context including roles and permissions"
tags:
  - "User"
  - "Export"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaUser.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaUser"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaUser</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaUser.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Claudio Silva (@ClaudioESSilva)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Generates T-SQL scripts to recreate database users with their complete security context including roles and permissions

## Description

Creates comprehensive T-SQL scripts that fully recreate database users along with their security assignments and permissions. The generated scripts include user creation statements, role memberships, database-level permissions (like CONNECT, SELECT, INSERT), and granular object-level permissions for tables, views, stored procedures, functions, and other database objects.  
  
This function is essential for migrating users between environments, documenting security configurations for compliance audits, creating deployment scripts for application users, or preparing disaster recovery procedures. Each exported script is self-contained and includes all necessary role creation statements to avoid dependency issues during execution.  
  
The function examines the complete security context for each user, including custom database roles, explicit permissions granted at the database level, and specific object permissions across all supported SQL Server object types (tables, views, procedures, functions, assemblies, certificates, schemas, and Service Broker objects).

## Syntax

```powershell
Export-DbaUser
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-InputObject] <Database[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-User] <String[]>]
    [[-DestinationVersion] <String>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-Encoding] <String>]
    [-NoClobber]
    [-Append]
    [-Passthru]
    [-Template]
    [-EnableException]
    [[-ScriptingOptionsObject] <ScriptingOptions>]
    [-ExcludeGoBatchSeparator]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaUser -SqlInstance sql2005 -FilePath C:\temp\sql2005-users.sql
```
{: data-copyable="true" data-clean-code="Export-DbaUser -SqlInstance sql2005 -FilePath C:\temp\sql2005-users.sql" }

Exports SQL for the users in server "sql2005" and writes them to the file "C:\temp\sql2005-users.sql"<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaUser -SqlInstance sqlserver2014a $scred -FilePath C:\temp\users.sql -Append
```
{: data-copyable="true" data-clean-code="Export-DbaUser -SqlInstance sqlserver2014a $scred -FilePath C:\temp\users.sql -Append" }

Authenticates to sqlserver2014a using SQL Authentication. Exports all users to C:\temp\users.sql, and appends to the file if it exists. If not, the file will be created.<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaUser -SqlInstance sqlserver2014a -User User1, User2 -FilePath C:\temp\users.sql
```
{: data-copyable="true" data-clean-code="Export-DbaUser -SqlInstance sqlserver2014a -User User1, User2 -FilePath C:\temp\users.sql" }

Exports ONLY users User1 and User2 from sqlserver2014a to the file C:\temp\users.sql<br>

#####  Example:  4 

```powershell
PS C:\> Export-DbaUser -SqlInstance sqlserver2014a -User User1, User2 -Path C:\temp
```
{: data-copyable="true" data-clean-code="Export-DbaUser -SqlInstance sqlserver2014a -User User1, User2 -Path C:\temp" }

Exports ONLY users User1 and User2 from sqlserver2014a to the folder C:\temp. One file per user will be generated<br>

#####  Example:  5 

```powershell
PS C:\> Export-DbaUser -SqlInstance sqlserver2008 -User User1 -FilePath C:\temp\users.sql -DestinationVersion SQLServer2016
```
{: data-copyable="true" data-clean-code="Export-DbaUser -SqlInstance sqlserver2008 -User User1 -FilePath C:\temp\users.sql -DestinationVersion SQLServer2016" }

Exports user User1 from sqlserver2008 to the file C:\temp\users.sql with syntax to run on SQL Server 2016<br>

#####  Example:  6 

```powershell
PS C:\> Export-DbaUser -SqlInstance sqlserver2008 -Database db1,db2 -FilePath C:\temp\users.sql
```
{: data-copyable="true" data-clean-code="Export-DbaUser -SqlInstance sqlserver2008 -Database db1,db2 -FilePath C:\temp\users.sql" }

Exports ONLY users from db1 and db2 database on sqlserver2008 server, to the C:\temp\users.sql file.<br>

#####  Example:  7 

```powershell
PS C:\> $options = New-DbaScriptingOption
PS C:\> $options.ScriptDrops = $false
PS C:\> $options.WithDependencies = $true
PS C:\> Export-DbaUser -SqlInstance sqlserver2008 -Database db1,db2 -FilePath C:\temp\users.sql -ScriptingOptionsObject $options
```
{: data-copyable="true" data-clean-code="$options = New-DbaScriptingOption
$options.ScriptDrops = $false
$options.WithDependencies = $true
Export-DbaUser -SqlInstance sqlserver2008 -Database db1,db2 -FilePath C:\temp\users.sql -ScriptingOptionsObject $options" }

Exports ONLY users from db1 and db2 database on sqlserver2008 server, to the C:\temp\users.sql file.<br>
It will not script drops but will script dependencies.<br>

#####  Example:  8 

```powershell
PS C:\> Export-DbaUser -SqlInstance sqlserver2008 -Database db1,db2 -FilePath C:\temp\users.sql -ExcludeGoBatchSeparator
```
{: data-copyable="true" data-clean-code="Export-DbaUser -SqlInstance sqlserver2008 -Database db1,db2 -FilePath C:\temp\users.sql -ExcludeGoBatchSeparator" }

Exports ONLY users from db1 and db2 database on sqlserver2008 server, to the C:\temp\users.sql file without the 'GO' batch separator.<br>

#####  Example:  9 

```powershell
PS C:\> Export-DbaUser -SqlInstance sqlserver2008 -Database db1 -User user1 -Template -PassThru
```
{: data-copyable="true" data-clean-code="Export-DbaUser -SqlInstance sqlserver2008 -Database db1 -User user1 -Template -PassThru" }

Exports user1 from database db1, replacing loginname and username with {templateLogin} and {templateUser} correspondingly.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. SQL Server 2000 and above supported.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase for processing specific database collections.  
Use this in pipeline operations when you have pre-filtered database objects to process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Specifies which databases to export users from. Accepts wildcards for pattern matching.  
Use this when you need to export users from specific databases instead of all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude from user export operations. Accepts wildcards for pattern matching.  
Useful when exporting from most databases but need to skip system databases or specific application databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -User

Exports only the specified database users by name. Accepts multiple user names.  
Use this when you need to export specific application users or service accounts rather than all database users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationVersion

Specifies the target SQL Server version for the generated T-SQL script syntax compatibility.  
Use this when migrating users to a different SQL Server version than the source database compatibility level.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | SQLServer2000,SQLServer2005,SQLServer2008/2008R2,SQLServer2012,SQLServer2014,SQLServer2016,SQLServer2017,SQLServer2019,SQLServer2022 |

##### -Path

Sets the directory path where user script files will be created. Creates individual files per user when FilePath is not specified.  
Use this when organizing exported scripts by directory structure for different environments or applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Sets the complete file path for a single consolidated script containing all exported users.  
Use this when you need all user definitions in one file for batch deployment or version control.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Encoding

Sets the character encoding for the output T-SQL script file. Defaults to UTF8.  
Change this when you need to match specific encoding requirements for your deployment tools or source control systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UTF8 |
| Accepted Values | ASCII,BigEndianUnicode,Byte,String,Unicode,UTF7,UTF8,Unknown |

##### -NoClobber

Prevents overwriting existing files during export operations.  
Use this safety feature when running exports to avoid accidentally replacing existing user scripts.

| Property | Value |
| --- | --- |
| Alias | NoOverwrite |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds the exported user scripts to the end of an existing file instead of creating a new file.  
Use this when consolidating user exports from multiple instances or databases into a single deployment script.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Passthru

Returns the T-SQL script to the console instead of writing to a file.  
Use this for copying scripts to clipboard, reviewing output before saving, or integrating with other PowerShell operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Template

Replaces actual usernames and login names with placeholders {templateUser} and {templateLogin} in the generated script.  
Use this when creating reusable deployment scripts that can be parameterized for different environments or applications.

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

##### -ScriptingOptionsObject

Provides a custom ScriptingOptions object to control detailed T-SQL generation behavior and formatting.  
Use this for advanced scenarios requiring specific scripting options beyond the standard Export-DbaUser parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeGoBatchSeparator

Removes the 'GO' batch separator statements from the generated T-SQL script.  
Use this when the target deployment tool or application doesn't support batch separators or requires continuous T-SQL.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
