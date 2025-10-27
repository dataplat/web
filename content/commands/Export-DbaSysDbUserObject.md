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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaSysDbUserObject</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaSysDbUserObject.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Jess Pomfret (@jpomfret)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Export-DbaSysDbUserObject -SqlInstance server1" }

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
