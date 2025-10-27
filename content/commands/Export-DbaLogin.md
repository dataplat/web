---
title: "Export-DbaLogin"
slug: "Export-DbaLogin"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Generates T-SQL scripts to recreate SQL Server logins with their complete security context for migration and disaster recovery."
tags:
  - "Export"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaLogin"
draft: false
---

# Export-DbaLogin

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaLogin](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaLogin.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaLogin](https://dataplat.github.io/boh#Export-DbaLogin).

## Synopsis

Generates T-SQL scripts to recreate SQL Server logins with their complete security context for migration and disaster recovery.

## Description

Creates executable T-SQL scripts that recreate SQL Server and Windows logins along with their complete security configuration. The export includes login properties (SID, hashed passwords, default database), server-level permissions and role memberships, database user mappings and roles, plus SQL Agent job ownership assignments. This addresses the common challenge where restoring databases doesn't restore the associated logins, leaving applications unable to connect. DBAs use this for server migrations, disaster recovery scenarios, and maintaining consistent security across environments.

## Syntax

```powershell
Export-DbaLogin
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <Object[]>]
    [[-Login] <Object[]>]
    [[-ExcludeLogin] <Object[]>]
    [[-Database] <Object[]>]
    [-ExcludeJobs]
    [-ExcludeDatabase]
    [-ExcludePassword]
    [[-DefaultDatabase] <String>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-Encoding] <String>]
    [-NoClobber]
    [-Append]
    [[-BatchSeparator] <String>]
    [[-DestinationVersion] <String>]
    [-NoPrefix]
    [-Passthru]
    [-ObjectLevel]
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
PS C:\> Export-DbaLogin -SqlInstance sql2005 -Path C:\temp\sql2005-logins.sql
```

Exports the logins for SQL Server "sql2005" and writes them to the file "C:\temp\sql2005-logins.sql"<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaLogin -SqlInstance sqlserver2014a -ExcludeLogin realcajun -SqlCredential $scred -Path C:\temp\logins.sql -Append
```

Authenticates to sqlserver2014a using SQL Authentication. Exports all logins except for realcajun to C:\temp\logins.sql, and appends to the file if it exists. If not, the file will be created.<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaLogin -SqlInstance sqlserver2014a -Login realcajun, netnerds -Path C:\temp\logins.sql
```

Exports ONLY logins netnerds and realcajun FROM sqlserver2014a to the file  C:\temp\logins.sql<br>

#####  Example:  4 

```powershell
PS C:\> Export-DbaLogin -SqlInstance sqlserver2014a -Login realcajun, netnerds -Database HR, Accounting
```

Exports ONLY logins netnerds and realcajun FROM sqlserver2014a with the permissions on databases HR and Accounting<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqlserver2014a -Database HR, Accounting | Export-DbaLogin
```

Exports ONLY logins FROM sqlserver2014a with permissions on databases HR and Accounting<br>

#####  Example:  6 

```powershell
PS C:\> Set-DbatoolsConfig -FullName formatting.batchseparator -Value $null
PS C:\> Export-DbaLogin -SqlInstance sqlserver2008 -Login realcajun, netnerds -Path C:\temp\login.sql
```

Exports ONLY logins netnerds and realcajun FROM sqlserver2008 server, to the C:\temp\login.sql file without the 'GO' batch separator.<br>

#####  Example:  7 

```powershell
PS C:\> Export-DbaLogin -SqlInstance sqlserver2008 -Login realcajun -Path C:\temp\users.sql -DestinationVersion SQLServer2016
```

Exports login realcajun from sqlserver2008 to the file C:\temp\users.sql with syntax to run on SQL Server 2016<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqlserver2008 -Login realcajun | Export-DbaLogin
```

Exports login realcajun from sqlserver2008<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sqlserver2008, sqlserver2012  | Where-Object { $_.IsDisabled -eq $false } | Export-DbaLogin
```

Exports all enabled logins from sqlserver2008 and sqlserver2008<br>

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

Accepts piped objects from Get-DbaLogin, Get-DbaDatabase, or Connect-DbaInstance commands.  
Use this when you want to export logins from specific objects rather than specifying instances directly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Login

Specifies which SQL Server logins to export by name. Accepts wildcards and arrays.  
When specified, only these logins are processed instead of all server logins. Use this to target specific accounts for migration or backup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeLogin

Specifies login names to skip during export. Accepts wildcards and arrays.  
Use this to exclude system accounts, service accounts, or other logins that shouldn't be migrated to the target environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Limits export to logins that have user mappings in the specified databases. Accepts database names or database objects.  
When specified, only logins with permissions or user accounts in these databases are exported, reducing script size for targeted migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJobs

Excludes SQL Agent job ownership assignments from the export script.  
Use this when migrating logins to servers where the associated jobs don't exist or will be owned by different accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeDatabase

Excludes database user mappings and permissions from the export script.  
Use this when you only need server-level login definitions without their database-specific permissions and role memberships.

| Property | Value |
| --- | --- |
| Alias | ExcludeDatabases |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludePassword

Excludes hashed password values from SQL login export, replacing them with placeholder text.  
Use this for security compliance when sharing scripts or when passwords will be reset after migration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DefaultDatabase

Overrides the default database for all exported logins with the specified database name.  
Use this when migrating to servers where the original default databases don't exist, preventing login creation failures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory where export files will be saved. Defaults to the Path.DbatoolsExport configuration setting.  
Files are automatically named based on instance and timestamp unless FilePath is specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path for the export script. Cannot be used when exporting from multiple instances.  
Use this when you need precise control over the output file location and name.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Encoding

Sets the character encoding for the output file. Defaults to UTF8.  
Choose the appropriate encoding based on your deployment environment requirements and any special characters in login names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UTF8 |
| Accepted Values | ASCII,BigEndianUnicode,Byte,String,Unicode,UTF7,UTF8,Unknown |

##### -NoClobber

Prevents overwriting existing files at the specified Path location.  
Use this as a safety measure when you don't want to accidentally replace existing login export scripts.

| Property | Value |
| --- | --- |
| Alias | NoOverwrite |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds the generated script to an existing file instead of overwriting it.  
Use this to combine login exports from multiple instances into a single deployment script.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BatchSeparator

Sets the T-SQL batch separator used between statements. Defaults to 'GO' from the Formatting.BatchSeparator configuration.  
Specify an empty string to remove batch separators when the target system doesn't support them.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Formatting.BatchSeparator') |

##### -DestinationVersion

Generates T-SQL syntax compatible with the specified SQL Server version. Defaults to the source instance version.  
Use this when migrating to older SQL Server versions that require different syntax for role assignments or other features.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | SQLServer2000,SQLServer2005,SQLServer2008/2008R2,SQLServer2012,SQLServer2014,SQLServer2016,SQLServer2017,SQLServer2019,SQLServer2022 |

##### -NoPrefix

Excludes the standard dbatools header comment from the generated script.  
Use this when you need clean T-SQL output without metadata comments for automated deployment systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Passthru

Returns the generated T-SQL script to the PowerShell pipeline instead of saving to file.  
Use this to capture the script in a variable, pipe to other commands, or display directly in the console.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ObjectLevel

Includes detailed object-level permissions for each database user associated with the exported logins.  
Use this for complete permission migration when you need granular security settings preserved in the target environment.

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
