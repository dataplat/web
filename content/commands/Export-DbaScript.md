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

# Export-DbaScript

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaScript](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaScript.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaScript](https://dataplat.github.io/boh#Export-DbaScript).

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

Exports all jobs on the SQL Server sql2016 instance using a trusted connection - automatically determines filename based on the Path.DbatoolsExport configuration setting, current time and server name.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 | Export-DbaScript -FilePath C:\temp\export.sql -Append
```

Exports all jobs on the SQL Server sql2016 instance using a trusted connection - Will append the output to the file C:\temp\export.sql if it already exists<br>
Inclusion of Batch Separator in script depends on the configuration s not include Batch Separator and will not compile<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance sql2016 -Database MyDatabase -Table 'dbo.Table1', 'dbo.Table2' -SqlCredential sqladmin | Export-DbaScript -FilePath C:\temp\export.sql
```

Exports only script for 'dbo.Table1' and 'dbo.Table2' in MyDatabase to C:temp\export.sql and uses the SQL login "sqladmin" to login to sql2016<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 -Job syspolicy_purge_history, 'Hourly Log Backups' -SqlCredential sqladmin | Export-DbaScript -FilePath C:\temp\export.sql -NoPrefix
```

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

Exports only syspolicy_purge_history and 'Hourly Log Backups' to C:temp\export.sql and uses the SQL login "sqladmin" to login to sql2016<br>
Uses Scripting options to ensure Batch Terminator is set<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2014 | Export-DbaScript -Passthru | ForEach-Object { $_.Replace('sql2014','sql2016') } | Set-Content -Path C:\temp\export.sql
```

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
