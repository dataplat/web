---
title: "Export-DbaServerRole"
slug: "Export-DbaServerRole"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Generates T-SQL scripts for server-level roles including permissions and memberships"
tags:
  - "Export"
  - "Role"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaServerRole.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaServerRole"
draft: false
---

# Export-DbaServerRole

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaServerRole](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaServerRole.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaServerRole](https://dataplat.github.io/boh#Export-DbaServerRole).

## Synopsis

Generates T-SQL scripts for server-level roles including permissions and memberships

## Description

Creates complete T-SQL scripts that can recreate server-level roles along with their permissions and memberships on another instance. This eliminates the need to manually recreate security configurations during server migrations or disaster recovery scenarios. The function queries sys.server_permissions to capture all role permissions (GRANT, DENY, REVOKE) and generates the appropriate T-SQL statements for role creation and member assignments.  
  
Primarily targets SQL Server 2012 and higher where user-defined server roles were introduced, but works on earlier versions to script role memberships for built-in roles.  
This command extends John Eisbrener's post "Fully Script out a MSSQL Database Role"  
Reference:  https://dbaeyes.wordpress.com/2013/04/19/fully-script-out-a-mssql-database-role/

## Syntax

```powershell
Export-DbaServerRole
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <Object[]>]
    [[-ScriptingOptionsObject] <ScriptingOptions>]
    [[-ServerRole] <String[]>]
    [[-ExcludeServerRole] <String[]>]
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
PS C:\> Export-DbaServerRole -SqlInstance sql2005
```

Exports the Server Roles for SQL Server "sql2005" and writes them to the path defined in the ConfigValue 'Path.DbatoolsExport' using a a default name pattern of ServerName-YYYYMMDDhhmmss-serverrole. <br>
Uses BatchSeparator defined by Config 'Formatting.BatchSeparator'<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaServerRole -SqlInstance sql2005 -Path C:\temp
```

Exports the Server Roles for SQL Server "sql2005" and writes them to the path "C:\temp" using a a default name pattern of ServerName-YYYYMMDDhhmmss-serverrole. Uses BatchSeparator defined by Config <br>
'Formatting.BatchSeparator'<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaServerRole -SqlInstance sqlserver2014a -FilePath C:\temp\ServerRoles.sql
```

Exports the Server Roles for SQL Server sqlserver2014a to the file  C:\temp\ServerRoles.sql. Overwrites file if exists<br>

#####  Example:  4 

```powershell
PS C:\> Export-DbaServerRole -SqlInstance sqlserver2014a -ServerRole SchemaReader -Passthru
```

Exports ONLY ServerRole SchemaReader FROM sqlserver2014a and writes script to console<br>

#####  Example:  5 

```powershell
PS C:\> Export-DbaServerRole -SqlInstance sqlserver2008 -ExcludeFixedRole -ExcludeServerRole Public -IncludeRoleMember -FilePath C:\temp\ServerRoles.sql -Append -BatchSeparator ''
```

Exports server roles from sqlserver2008, excludes all roles marked as as FixedRole and Public role. Includes RoleMembers and writes to file C:\temp\ServerRoles.sql, appending to file if it exits. <br>
Does not include a BatchSeparator<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaServerRole -SqlInstance sqlserver2012, sqlserver2014  | Export-DbaServerRole
```

Exports server roles from sqlserver2012, sqlserver2014 and writes them to the path defined in the ConfigValue 'Path.DbatoolsExport' using a a default name pattern of <br>
ServerName-YYYYMMDDhhmmss-serverrole<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaServerRole -SqlInstance sqlserver2016 -ExcludeFixedRole -ExcludeServerRole Public | Export-DbaServerRole -IncludeRoleMember
```

Exports server roles from sqlserver2016, excludes all roles marked as as FixedRole and Public role. Includes RoleMembers<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. SQL Server 2000 and above supported.

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

Accepts server role objects from Get-DbaServerRole for pipeline processing. Use this when you need to filter roles first with Get-DbaServerRole before exporting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ScriptingOptionsObject

Provides custom SMO scripting options to control the generated T-SQL output format. Use New-DbaScriptingOption to create custom options when you need specific formatting requirements like excluding   
object owners or database context.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerRole

Specifies which server-level roles to export by name. Useful when you only need to script specific custom roles instead of all roles on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeServerRole

Excludes specific server-level roles from the export by name. Use this to skip problematic roles or roles you don't want to migrate to the target instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeFixedRole

Excludes built-in server roles like sysadmin, serveradmin, and dbcreator from the export. Use this when migrating between instances where you only want to transfer custom user-defined roles. On SQL   
Server 2008/2008R2, this will exclude all roles since user-defined server roles weren't supported.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeRoleMember

Includes ALTER SERVER ROLE statements to add current role members to the exported script. Essential when you need to recreate both the roles and their membership assignments on the target instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Path

Specifies the directory where script files will be saved. Defaults to the Path.DbatoolsExport configuration setting. Use this when you want to organize exports in a specific folder structure for your   
deployment process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path for the exported script. When blank, creates timestamped files using the instance name. Use this when you need consistent file naming for deployment pipelines or when   
exporting from a single instance.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Passthru

Displays the generated T-SQL script in the console instead of saving to file. Perfect for quick review of the script or when you need to copy-paste the output directly into SSMS.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BatchSeparator

Sets the batch separator used between T-SQL statements in the output. Defaults to the configured value, typically 'GO'. Change this when deploying to tools that use different batch separators or set   
to empty string to remove separators entirely.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Formatting.BatchSeparator') |

##### -NoClobber

Prevents overwriting existing files at the target location. Use this as a safety measure when running automated exports to avoid accidentally replacing important deployment scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds the exported script to an existing file instead of overwriting it. Useful when building comprehensive deployment scripts that combine multiple exports into a single file.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoPrefix

Excludes the header comment block that contains generation metadata like timestamp and user information. Use this when you need clean T-SQL output without documentation headers for automated   
deployments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Encoding

Sets the character encoding for the output file. Defaults to UTF8 which handles international characters correctly. Change to ASCII only if you're certain the role names contain no special characters   
and need compatibility with older systems.

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
