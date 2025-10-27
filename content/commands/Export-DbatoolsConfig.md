---
title: "Export-DbatoolsConfig"
slug: "Export-DbatoolsConfig"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Exports dbatools module configuration settings to a JSON file for backup or migration."
tags:
  - "Module"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbatoolsConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbatoolsConfig"
draft: false
---

# Export-DbatoolsConfig

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbatoolsConfig](https://github.com/dataplat/dbatools/blob/master/public/Export-DbatoolsConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbatoolsConfig](https://dataplat.github.io/boh#Export-DbatoolsConfig).

## Synopsis

Exports dbatools module configuration settings to a JSON file for backup or migration.

## Description

Exports dbatools configuration settings to a JSON file, allowing you to backup your current settings or migrate them to other machines. This function captures customized settings like connection timeouts, default database paths, and other module preferences that have been changed from their default values. You can export all settings or filter by specific modules, and optionally exclude settings that haven't been modified from defaults.

## Syntax

```powershell
Export-DbatoolsConfig -FullName <String>
    [-OutPath] <String>
    [-SkipUnchanged]
    [-EnableException]
    [<CommonParameters>]

Export-DbatoolsConfig -Module <String>
    [[-Name] <String>]
    [-OutPath] <String>
    [-SkipUnchanged]
    [-EnableException]
    [<CommonParameters>]

Export-DbatoolsConfig -Config <Config[]>
    [-OutPath] <String>
    [-SkipUnchanged]
    [-EnableException]
    [<CommonParameters>]

Export-DbatoolsConfig -ModuleName <String>
    [-ModuleVersion <Int32>]
    [-Scope {UserDefault | UserMandatory | SystemDefault | SystemMandatory | FileUserLocal | FileUserShared | FileSystem}]
    [-SkipUnchanged]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbatoolsConfig | Export-DbatoolsConfig -OutPath '~/export.json'
```

Exports all current settings to json.<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbatoolsConfig -Module message -OutPath '~/export.json' -SkipUnchanged
```

Exports all settings of the module 'message' that are no longer the original default values to json.<br>

### Required Parameters

##### -FullName

Specifies the complete configuration setting name to export, including the module prefix (e.g., 'dbatools.path.dbatoolsdata').  
Use this when you need to export a specific configuration setting and know its exact full name.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Module

Filters configuration settings to export only those belonging to a specific dbatools module (e.g., 'sql', 'path', 'message').  
Use this when you want to export all settings related to a particular functional area of dbatools rather than individual settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Config

Accepts configuration objects directly from Get-DbatoolsConfig for export to JSON.  
Use this when you want to filter or manipulate configuration objects before export, typically in pipeline operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ModuleName

Exports module-specific configuration settings to predefined system locations rather than a custom path.  
Only exports settings marked as 'ModuleExport' that have been modified from defaults, useful for creating standardized module configuration packages.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -OutPath

Specifies the complete file path where the JSON configuration export will be saved, including the filename.  
The parent directory must exist or the export will fail, and any existing file at this location will be overwritten.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Name

Specifies a pattern to match configuration setting names within the selected module, supporting wildcards.  
Use this with the Module parameter to narrow down which settings to export when you don't need all settings from a module.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

##### -ModuleVersion

Specifies the version number to include in the exported configuration filename when using ModuleName parameter.  
Defaults to 1 and helps track different versions of module configuration exports for change management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |

##### -Scope

Determines where to save module configuration files when using ModuleName parameter - user profile, shared location, or system-wide.  
Only file-based scopes are supported (registry scopes are blocked). Defaults to FileUserShared for cross-user accessibility.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | FileUserShared |

##### -SkipUnchanged

Excludes configuration settings that still have their original default values from the export.  
Use this to create smaller backup files containing only your customized settings, making configuration migration more focused.

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
