---
title: "Unregister-DbatoolsConfig"
slug: "Unregister-DbatoolsConfig"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Removes persisted dbatools configuration settings from registry and configuration files."
tags:
  - "Module"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Unregister-DbatoolsConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Unregister-DbatoolsConfig"
draft: false
---

# Unregister-DbatoolsConfig

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Unregister-DbatoolsConfig](https://github.com/dataplat/dbatools/blob/master/public/Unregister-DbatoolsConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Unregister-DbatoolsConfig](https://dataplat.github.io/boh#Unregister-DbatoolsConfig).

## Synopsis

Removes persisted dbatools configuration settings from registry and configuration files.

## Description

Removes dbatools configuration settings that have been persisted to Windows registry or JSON configuration files. This lets you clean up module settings that were previously saved using Register-DbatoolsConfig, removing them from user profiles or system-wide storage locations.  
  
The function handles settings stored in multiple persistence scopes including user-specific registry entries, computer-wide registry settings, and JSON configuration files in various user and system directories. You can target specific settings by name or module, or remove entire configuration groups.  
  
Note: This command only removes persisted settings and has no effect on configuration values currently loaded in PowerShell memory.

## Syntax

```powershell
Unregister-DbatoolsConfig
    [-ConfigurationItem <Config[]>]
    [-FullName <String[]>]
    [-Scope {UserDefault | UserMandatory | SystemDefault | SystemMandatory | FileUserLocal | FileUserShared | FileSystem}]
    [<CommonParameters>]

Unregister-DbatoolsConfig -Module <String>
    [-Name <String>]
    [-Scope {UserDefault | UserMandatory | SystemDefault | SystemMandatory | FileUserLocal | FileUserShared | FileSystem}]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbatoolsConfig | Unregister-DbatoolsConfig
```

Completely removes all registered configurations currently loaded in memory.<br>
In most cases, this will mean removing all registered configurations.<br>

#####  Example:  2 

```powershell
PS C:\> Unregister-DbatoolsConfig -Scope SystemDefault -FullName 'MyModule.Path.DefaultExport'
```

Unregisters the setting 'MyModule.Path.DefaultExport' from the list of computer-wide defaults.<br>
Note: Changing system wide settings requires running the console with elevation.<br>

#####  Example:  3 

```powershell
PS C:\> Unregister-DbatoolsConfig -Module MyModule
```

Unregisters all configuration settings for the module MyModule.<br>

### Required Parameters

##### -Module

Specifies the module name to target for configuration removal.  
Use this to remove all configuration settings belonging to a specific dbatools module or component.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -ConfigurationItem

Specifies configuration objects to remove from persistent storage, as returned by Get-DbatoolsConfig.  
Use this when you want to unregister specific settings already identified through Get-DbatoolsConfig.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -FullName

Specifies the complete name of the configuration setting to remove from persistent storage.  
Use this when you know the exact setting name in the format 'module.category.setting'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Name

Specifies the setting name pattern to match within the targeted module. Supports wildcards.  
Use with the Module parameter to narrow down which settings to remove, defaults to '*' to match all settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

##### -Scope

Specifies which configuration storage locations to target for removal: user settings, computer-wide settings, or file-based configurations.  
Defaults to UserDefault which removes settings from the current user's registry. Use SystemDefault to remove computer-wide settings (requires elevation).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UserDefault |


&nbsp;
