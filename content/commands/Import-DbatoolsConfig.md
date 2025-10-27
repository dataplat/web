---
title: "Import-DbatoolsConfig"
slug: "Import-DbatoolsConfig"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Imports dbatools configuration settings from JSON files or default module paths."
tags:
  - "Module"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Import-DbatoolsConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Import-DbatoolsConfig"
draft: false
---

# Import-DbatoolsConfig

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Import-DbatoolsConfig](https://github.com/dataplat/dbatools/blob/master/public/Import-DbatoolsConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Import-DbatoolsConfig](https://dataplat.github.io/boh#Import-DbatoolsConfig).

## Synopsis

Imports dbatools configuration settings from JSON files or default module paths.

## Description

Loads dbatools configuration settings from JSON files or retrieves module-specific settings from default configuration locations. This lets you restore saved dbatools preferences, share standardized settings across your team, or apply configuration baselines to multiple servers. You can import from local files, web URLs, or raw JSON strings, with optional filtering to selectively apply only the settings you need.

## Syntax

```powershell
Import-DbatoolsConfig -Path <String[]>
    [-IncludeFilter <String[]>]
    [-ExcludeFilter <String[]>]
    [-Peek]
    [-EnableException]
    [<CommonParameters>]

Import-DbatoolsConfig -ModuleName <String>
    [-ModuleVersion <Int32>]
    [-Scope {UserDefault | UserMandatory | SystemDefault | SystemMandatory | FileUserLocal | FileUserShared | FileSystem}]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Import-DbatoolsConfig -Path '.\config.json'
```

Imports the configuration stored in '.\config.json'<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbatoolsConfig -ModuleName message
```

Imports all the module specific settings that have been persisted in any of the default file system paths.<br>

### Required Parameters

##### -Path

Specifies the path to JSON configuration files, web URLs, or raw JSON strings to import settings from.  
Use this to restore saved dbatools preferences, apply team-standard configurations, or load settings from remote locations.  
Accepts local file paths, HTTP/HTTPS URLs, or direct JSON content as strings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ModuleName

Specifies which dbatools module's configuration settings to import from default system locations.  
Use this to restore module-specific settings that were previously saved using Export-DbatoolsConfig.  
Common modules include 'message' for logging preferences and 'sql' for connection defaults.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -ModuleVersion

Specifies which version of the module configuration schema to load when importing persisted settings.  
Defaults to version 1, which works for most scenarios unless you're working with legacy configuration exports.  
Only change this if you're importing settings exported with a different version of dbatools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |

##### -Scope

Controls which configuration storage locations to search when importing module settings.  
Options include FileUserLocal (user profile), FileUserShared (shared user settings), and FileSystem (system-wide).  
User settings override system settings when the same configuration exists in multiple locations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | FileUserLocal, FileUserShared, FileSystem |

##### -IncludeFilter

Specifies wildcard patterns to selectively import only matching configuration items from the source.  
Use this to import specific settings like 'sql.connection.*' for connection-related configs or 'logging.*' for logging preferences.  
Supports PowerShell -like wildcard matching with * and ? characters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeFilter

Specifies wildcard patterns to exclude specific configuration items during import.  
Use this to skip sensitive settings like credentials or environment-specific paths when sharing configurations.  
Applied after IncludeFilter, allowing you to include a category but exclude specific items within it.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Peek

Returns the configuration items that would be imported without actually applying them to your session.  
Use this to preview configuration changes before applying them, especially when importing from unfamiliar sources.  
Helpful for validating configuration files and understanding what settings will be modified.

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
