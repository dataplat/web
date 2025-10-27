---
title: "Export-DbaScript"
slug: "Export-DbaScript"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Generates T-SQL CREATE scripts from SQL Server Management Objects for migration and deployment"
tags:
  - "Migration"
  - "Backup"
  - "Export"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaScript.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaScript"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaScript</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaScript.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Generates T-SQL CREATE scripts from SQL Server Management Objects for migration and deployment

## Description

Takes any SQL Server Management Object from dbatools commands and converts it into executable T-SQL CREATE scripts using SMO scripting. This lets you script out database objects like tables, jobs, logins, stored procedures, and more for migration between environments or backup purposes. The function handles proper formatting with batch separators and supports custom scripting options to control what gets included in the output. Perfect for creating deployment scripts or documenting your SQL Server configurations without manual scripting.

## Syntax

```powershell
Export-DbaScript
    [-InputObject] <Object[]>
    [[-ScriptingOptionsObject] <ScriptingOptions>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-Encoding] <String>]
    [[-BatchSeparator] <String>]
    [-NoPrefix]
    [-Passthru]
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
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 | Export-DbaScript
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJob -SqlInstance sql2016 | Export-DbaScript" }

Exports all jobs on the SQL Server sql2016 instance using a trusted connection - automatically determines filename based on the Path.DbatoolsExport configuration setting, current time and server name.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 | Export-DbaScript -FilePath C:\temp\export.sql -Append
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJob -SqlInstance sql2016 | Export-DbaScript -FilePath C:\temp\export.sql -Append" }

Exports all jobs on the SQL Server sql2016 instance using a trusted connection - Will append the output to the file C:\temp\export.sql if it already exists<br>
Inclusion of Batch Separator in script depends on the configuration s not include Batch Separator and will not compile<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance sql2016 -Database MyDatabase -Table 'dbo.Table1', 'dbo.Table2' -SqlCredential sqladmin | Export-DbaScript -FilePath C:\temp\export.sql
```
{: data-copyable="true" data-clean-code="Get-DbaDbTable -SqlInstance sql2016 -Database MyDatabase -Table 'dbo.Table1', 'dbo.Table2' -SqlCredential sqladmin | Export-DbaScript -FilePath C:\temp\export.sql" }

Exports only script for 'dbo.Table1' and 'dbo.Table2' in MyDatabase to C:temp\export.sql and uses the SQL login "sqladmin" to login to sql2016<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 -Job syspolicy_purge_history, 'Hourly Log Backups' -SqlCredential sqladmin | Export-DbaScript -FilePath C:\temp\export.sql -NoPrefix
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJob -SqlInstance sql2016 -Job syspolicy_purge_history, 'Hourly Log Backups' -SqlCredential sqladmin | Export-DbaScript -FilePath C:\temp\export.sql -NoPrefix" }

Exports only syspolicy_purge_history and 'Hourly Log Backups' to C:temp\export.sql and uses the SQL login "sqladmin" to login to sql2016<br>
Suppress the output of a Prefix<br>

#####  Example:  5 

```powershell
PS C:\> $options = New-DbaScriptingOption
PS C:\> $options.ScriptSchema = $true
PS C:\> $options.IncludeDatabaseContext  = $true
PS C:\> $options.IncludeHeaders = $false
PS C:\> $Options.NoCommandTerminator = $false
PS C:\> $Options.ScriptBatchTerminator = $true
PS C:\> $Options.AnsiFile = $true
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 -Job syspolicy_purge_history, 'Hourly Log Backups' -SqlCredential sqladmin | Export-DbaScript -FilePath C:\temp\export.sql -ScriptingOptionsObject $options
```
{: data-copyable="true" data-clean-code="$options = New-DbaScriptingOption
$options.ScriptSchema = $true
$options.IncludeDatabaseContext  = $true
$options.IncludeHeaders = $false
$Options.NoCommandTerminator = $false
$Options.ScriptBatchTerminator = $true
$Options.AnsiFile = $true
Get-DbaAgentJob -SqlInstance sql2016 -Job syspolicy_purge_history, 'Hourly Log Backups' -SqlCredential sqladmin | Export-DbaScript -FilePath C:\temp\export.sql -ScriptingOptionsObject $options" }

Exports only syspolicy_purge_history and 'Hourly Log Backups' to C:temp\export.sql and uses the SQL login "sqladmin" to login to sql2016<br>
Uses Scripting options to ensure Batch Terminator is set<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2014 | Export-DbaScript -Passthru | ForEach-Object { $_.Replace('sql2014','sql2016') } | Set-Content -Path C:\temp\export.sql
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJob -SqlInstance sql2014 | Export-DbaScript -Passthru | ForEach-Object { $_.Replace('sql2014','sql2016') } | Set-Content -Path C:\temp\export.sql" }

Exports jobs and replaces all instances of the servername "sql2014" with "sql2016" then writes to C:\temp\export.sql<br>

#####  Example:  7 

```powershell
PS C:\> $options = New-DbaScriptingOption
PS C:\> $options.ScriptSchema = $true
PS C:\> $options.IncludeDatabaseContext  = $true
PS C:\> $options.IncludeHeaders = $false
PS C:\> $Options.NoCommandTerminator = $false
PS C:\> $Options.ScriptBatchTerminator = $true
PS C:\> $Options.AnsiFile = $true
PS C:\> $Databases = Get-DbaDatabase -SqlInstance sql2016 -ExcludeDatabase master, model, msdb, tempdb
PS C:\> foreach ($db in $Databases) {
>>        Export-DbaScript -InputObject $db -FilePath C:\temp\export.sql -Append -Encoding UTF8 -ScriptingOptionsObject $options -NoPrefix
>> }
```
{: data-copyable="true" data-clean-code="$options = New-DbaScriptingOption
$options.ScriptSchema = $true
$options.IncludeDatabaseContext  = $true
$options.IncludeHeaders = $false
$Options.NoCommandTerminator = $false
$Options.ScriptBatchTerminator = $true
$Options.AnsiFile = $true
$Databases = Get-DbaDatabase -SqlInstance sql2016 -ExcludeDatabase master, model, msdb, tempdb
foreach ($db in $Databases) {
Export-DbaScript -InputObject $db -FilePath C:\temp\export.sql -Append -Encoding UTF8 -ScriptingOptionsObject $options -NoPrefix
}" }

Exports Script for each database on sql2016 excluding system databases<br>
Uses Scripting options to ensure Batch Terminator is set<br>
Will append the output to the file C:\temp\export.sql if it already exists<br>

### Required Parameters

##### -InputObject

Accepts any SQL Server Management Object (SMO) from dbatools commands like Get-DbaLogin, Get-DbaAgentJob, or Get-DbaDatabase.  
Use this when you need to generate CREATE scripts for specific database objects, jobs, logins, or other SQL Server components.  
The object type determines what kind of T-SQL script will be generated.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -ScriptingOptionsObject

Accepts a customized SMO ScriptingOptions object created with New-DbaScriptingOption to control script generation.  
Use this when you need specific formatting like including schema context, headers, or data along with object definitions.  
Settings in this object override other Export-DbaScript parameters like BatchSeparator.

| Property | Value |
| --- | --- |
| Alias | ScriptingOptionObject |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Sets the directory where script files will be saved when FilePath is not specified.  
Defaults to the configured dbatools export directory from your Path.DbatoolsExport setting.  
Use this when you want scripts saved to a standard location with auto-generated filenames.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Sets the complete file path and name for the output script file.  
Use this when you need the script saved to a specific location with a custom filename.  
Overrides the Path parameter when specified.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Encoding

Controls the character encoding used when writing script files to disk.  
Default is UTF8 which handles international characters and is widely supported.  
Use UTF8 for most scenarios, or ASCII if you need compatibility with older tools that don't support Unicode.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UTF8 |
| Accepted Values | ASCII,BigEndianUnicode,Byte,String,Unicode,UTF7,UTF8,Unknown |

##### -BatchSeparator

Sets the batch terminator added between SQL statements in the output script.  
Defaults to "GO" from your dbatools configuration, which is standard for SQL Server Management Studio.  
Use a different separator if deploying to tools that require different batch terminators.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Formatting.BatchSeparator') |

##### -NoPrefix

Suppresses the header comment block that normally identifies when and by whom the script was generated.  
Use this when you need clean scripts without metadata comments for automated deployments.  
The prefix normally includes timestamp, username, and dbatools version information.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Passthru

Returns the generated T-SQL script as string output instead of writing to a file.  
Use this when you need to capture the script in a variable for further processing or modification.  
Commonly used in pipelines to transform scripts before saving.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoClobber

Prevents overwriting existing files, causing the command to fail if the target file already exists.  
Use this as a safety measure when you want to ensure you don't accidentally replace existing scripts.  
Combine with -Append if you want to add to existing files instead.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds the generated script to the end of an existing file instead of overwriting it.  
Use this when building consolidated deployment scripts by combining multiple objects into one file.  
Particularly useful for scripting multiple databases or object types into a single migration script.

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

Shows what would happen if the command were to run. No actions are actually performed

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
