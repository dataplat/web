---
title: "Export-DbaDacPackage"
slug: "Export-DbaDacPackage"
date: 2024-01-01
layout: "single"
author: "Richie lee (@richiebzzzt)"
availability: "Windows, Linux, macOS"
synopsis: "Creates DACPAC or BACPAC deployment packages from SQL Server databases using SqlPackage"
tags:
  - "Dacpac"
  - "Deployment"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDacPackage.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaDacPackage"
draft: false
---

# Export-DbaDacPackage

| Property | Value |
| --- | --- |
| **Author** | Richie lee (@richiebzzzt) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaDacPackage](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDacPackage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaDacPackage](https://dataplat.github.io/boh#Export-DbaDacPackage).

## Synopsis

Creates DACPAC or BACPAC deployment packages from SQL Server databases using SqlPackage

## Description

Creates database deployment packages for version control, migrations, and schema distribution. Generates DACPAC files containing database schema definitions or BACPAC files that include both schema and data. This automates the SqlPackage utility so you don't have to remember complex command-line syntax or manage connection strings manually.  
  
Perfect for creating deployable packages from development databases, capturing schema snapshots for source control, or preparing migration artifacts for different environments. The function handles multiple databases in batch operations and provides flexible table filtering when you only need specific objects.  
  
Uses Microsoft DAC Services under the hood with automatic SqlPackage installation if needed. Note that extraction can fail with three-part references to external databases or complex cross-database dependencies.  
  
For help with the extract action parameters and properties, refer to https://learn.microsoft.com/en-us/sql/tools/sqlpackage/sqlpackage-extract

## Syntax

```powershell
Export-DbaDacPackage -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllUserDatabases]
    [-Path <String>]
    [-FilePath <String>]
    [-DacOption <Object>]
    [-Type <String>]
    [-Table <String[]>]
    [-EnableException]
    [<CommonParameters>]

Export-DbaDacPackage -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllUserDatabases]
    [-Path <String>]
    [-FilePath <String>]
    [-ExtendedParameters <String>]
    [-ExtendedProperties <String>]
    [-Type <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -Database SharePoint_Config -FilePath C:\SharePoint_Config.dacpac
```

Exports the dacpac for SharePoint_Config on sql2016 to C:\SharePoint_Config.dacpac<br>

#####  Example:  2 

```powershell
PS C:\> $options = New-DbaDacOption -Type Dacpac -Action Export
PS C:\> $options.ExtractAllTableData = $true
PS C:\> $options.CommandTimeout = 0
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -Database DB1 -DacOption $options
```

Uses DacOption object to set the CommandTimeout to 0 then extracts the dacpac for DB1 on sql2016 to C:\Users\username\Documents\DbatoolsExport\sql2016-DB1-20201227140759-dacpackage.dacpac including <br>
all table data. As noted the generated filename will contain the server name, database name, and the current timestamp in the "%Y%m%d%H%M%S" format.<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -AllUserDatabases -ExcludeDatabase "DBMaintenance","DBMonitoring" -Path "C:\temp"
```

Exports dacpac packages for all USER databases, excluding "DBMaintenance" & "DBMonitoring", on sql2016 and saves them to C:\temp. The generated filename(s) will contain the server name, database <br>
name, and the current timestamp in the "%Y%m%d%H%M%S" format.<br>

#####  Example:  4 

```powershell
PS C:\> $moreparams = "/OverwriteFiles:$true /Quiet:$true"
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -Database SharePoint_Config -Path C:\temp -ExtendedParameters $moreparams
```

Using extended parameters to over-write the files and performs the extraction in quiet mode to C:\temp\sql2016-SharePoint_Config-20201227140759-dacpackage.dacpac. Uses command line instead of SMO <br>
behind the scenes. As noted the generated filename will contain the server name, database name, and the current timestamp in the "%Y%m%d%H%M%S" format.<br>

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
Only SQL authentication is supported. When not specified, uses Trusted Authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to export as DACPAC or BACPAC packages. Accepts multiple database names and supports wildcards.  
Use this to target specific databases instead of processing all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during export operations. Works with both Database and AllUserDatabases parameters.  
Use this to exclude system databases, maintenance databases, or any databases you don't want to package.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllUserDatabases

Exports packages for all user databases on the instance, automatically excluding system databases.  
Use this for bulk operations when you want to create deployment packages for every application database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Path

Specifies the directory where DACPAC or BACPAC files will be saved. Defaults to the configured DbatoolsExport path.  
Use this when you want to organize exports in a specific location or when working with multiple databases that need consistent file placement.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path including filename for the export package. Overrides both Path and automatic file naming.  
Use this when you need a specific filename or when exporting a single database to a predetermined location.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DacOption

Configures advanced export settings using a DacExtractOptions or DacExportOptions object created by New-DbaDacOption.  
Use this to control extraction behavior like command timeouts, table data inclusion, or specific schema elements to include or exclude.

| Property | Value |
| --- | --- |
| Alias | ExtractOptions,ExportOptions,DacExtractOptions,DacExportOptions,Options,Option |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExtendedParameters

Passes additional command-line parameters directly to SqlPackage.exe for advanced scenarios (e.g., '/OverwriteFiles:true /Quiet:true').  
Use this when you need SqlPackage options not available through DacOption or when integrating with existing SqlPackage workflows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExtendedProperties

Passes additional property settings directly to SqlPackage.exe for fine-tuned control over extraction behavior.  
Use this when you need to set specific SqlPackage properties that aren't exposed through the standard DacOption parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies the package type to create: Dacpac (schema-only) or Bacpac (schema and data). Defaults to Dacpac.  
Use Dacpac for version control and schema deployments, or Bacpac when you need to include table data for migrations or testing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Dacpac |
| Accepted Values | Dacpac,Bacpac |

##### -Table

Specifies which tables to include in the export package. Provide as schema.table format (e.g., 'dbo.Users', 'Sales.Orders').  
Use this when you only need specific tables rather than the entire database, such as for partial deployments or data subsets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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
