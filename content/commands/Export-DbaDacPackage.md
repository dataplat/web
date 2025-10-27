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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaDacPackage</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDacPackage.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Richie lee (@richiebzzzt)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Export-DbaDacPackage -SqlInstance sql2016 -Database SharePoint_Config -FilePath C:\SharePoint_Config.dacpac" }

Exports the dacpac for SharePoint_Config on sql2016 to C:\SharePoint_Config.dacpac<br>

#####  Example:  2 

```powershell
PS C:\> $options = New-DbaDacOption -Type Dacpac -Action Export
PS C:\> $options.ExtractAllTableData = $true
PS C:\> $options.CommandTimeout = 0
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -Database DB1 -DacOption $options
```
{: data-copyable="true" data-clean-code="$options = New-DbaDacOption -Type Dacpac -Action Export
$options.ExtractAllTableData = $true
$options.CommandTimeout = 0
Export-DbaDacPackage -SqlInstance sql2016 -Database DB1 -DacOption $options" }

Uses DacOption object to set the CommandTimeout to 0 then extracts the dacpac for DB1 on sql2016 to C:\Users\username\Documents\DbatoolsExport\sql2016-DB1-20201227140759-dacpackage.dacpac including <br>
all table data. As noted the generated filename will contain the server name, database name, and the current timestamp in the "%Y%m%d%H%M%S" format.<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -AllUserDatabases -ExcludeDatabase "DBMaintenance","DBMonitoring" -Path "C:\temp"
```
{: data-copyable="true" data-clean-code="Export-DbaDacPackage -SqlInstance sql2016 -AllUserDatabases -ExcludeDatabase &quot;DBMaintenance&quot;,&quot;DBMonitoring&quot; -Path &quot;C:\temp&quot;" }

Exports dacpac packages for all USER databases, excluding "DBMaintenance" & "DBMonitoring", on sql2016 and saves them to C:\temp. The generated filename(s) will contain the server name, database <br>
name, and the current timestamp in the "%Y%m%d%H%M%S" format.<br>

#####  Example:  4 

```powershell
PS C:\> $moreparams = "/OverwriteFiles:$true /Quiet:$true"
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -Database SharePoint_Config -Path C:\temp -ExtendedParameters $moreparams
```
{: data-copyable="true" data-clean-code="$moreparams = &quot;/OverwriteFiles:$true /Quiet:$true&quot;
Export-DbaDacPackage -SqlInstance sql2016 -Database SharePoint_Config -Path C:\temp -ExtendedParameters $moreparams" }

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
