---
title: "Export-DbaSysDbUserObject"
slug: "Export-DbaSysDbUserObject"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret)"
availability: "Windows, Linux, macOS"
synopsis: "Discovers and exports user-created objects from SQL Server system databases (master, model, msdb) to SQL script files."
tags:
  - "Export"
  - "Object"
  - "SystemDatabase"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaSysDbUserObject.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaSysDbUserObject"
draft: false
---

# Export-DbaSysDbUserObject

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaSysDbUserObject](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaSysDbUserObject.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaSysDbUserObject](https://dataplat.github.io/boh#Export-DbaSysDbUserObject).

## Synopsis

Discovers and exports user-created objects from SQL Server system databases (master, model, msdb) to SQL script files.

## Description

Scans the master, model, and msdb system databases to identify tables, views, stored procedures, functions, triggers, and other objects that were created by users rather than SQL Server itself. This function helps DBAs document custom objects that may have been inadvertently created in system databases, which is critical for server migrations, compliance audits, and maintaining clean system database environments. The exported SQL scripts can be used to recreate these objects on other instances or to review what custom code exists in your system databases.

## Syntax

```powershell
Export-DbaSysDbUserObject
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-IncludeDependencies]
    [[-BatchSeparator] <String>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [-NoPrefix]
    [[-ScriptingOptionsObject] <ScriptingOptions>]
    [-NoClobber]
    [-PassThru]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaSysDbUserObject -SqlInstance server1
```

Exports any user objects that are in the system database to the default location.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.  
This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target instance using alternative credentials.  
Windows and SQL Authentication supported. Accepts credential objects (Get-Credential)

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeDependencies

Includes dependent objects in the scripted output when exporting user objects.  
Use this when your custom objects have dependencies that need to be recreated together on the target instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BatchSeparator

Sets the batch separator used between SQL statements in the exported script files. Defaults to "GO".  
Change this when you need compatibility with specific SQL tools that use different batch separators.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | GO |

##### -Path

Specifies the directory where the exported SQL script file will be created. Uses the dbatools default export path if not specified.  
Provide this when you need the script saved to a specific location for documentation or deployment purposes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path including filename for the exported SQL script.  
Use this instead of Path when you need precise control over the output file name and location.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoPrefix

Excludes header information from the exported scripts, removing creator details and timestamp comments.  
Use this when you need clean scripts without metadata for version control or when the header information is not needed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ScriptingOptionsObject

Provides a custom ScriptingOptions object to control how objects are scripted, including permissions, indexes, and constraints.  
Use this when you need specific scripting behavior beyond the default options, such as excluding certain object properties.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoClobber

Prevents overwriting existing files at the target location and throws an error if the file already exists.  
Use this as a safety measure when you want to avoid accidentally replacing existing script files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PassThru

Outputs the generated SQL scripts directly to the PowerShell console instead of saving to a file.  
Use this when you want to review the scripts immediately or pipe them to other cmdlets for further processing.

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


&nbsp;
