---
title: "Reset-DbatoolsConfig"
slug: "Reset-DbatoolsConfig"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Resets dbatools module configuration settings back to their default values."
tags:
  - "Module"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Reset-DbatoolsConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Reset-DbatoolsConfig"
draft: false
---

# Reset-DbatoolsConfig

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Reset-DbatoolsConfig](https://github.com/dataplat/dbatools/blob/master/public/Reset-DbatoolsConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Reset-DbatoolsConfig](https://dataplat.github.io/boh#Reset-DbatoolsConfig).

## Synopsis

Resets dbatools module configuration settings back to their default values.

## Description

Restores dbatools configuration settings to their original default values, useful when troubleshooting connectivity issues, fixing misconfigured connection strings, or starting fresh after environment changes. This is particularly helpful when dbatools settings have been customized for specific environments and you need to restore the baseline behavior.  
  
The function can reset individual configuration items, all settings within a specific module, or all dbatools configuration settings at once. This saves you from manually tracking down and reconfiguring individual settings.  
  
In order for a reset to be possible, two conditions must be met:  
- The setting must have been initialized.  
- The setting cannot have been enforced by policy.

## Syntax

```powershell
Reset-DbatoolsConfig
    [-ConfigurationItem <Config[]>]
    [-FullName <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Reset-DbatoolsConfig -Module <String>
    [-Name <String>]
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
PS C:\> Reset-DbatoolsConfig -Module MyModule
```

Resets all configuration items of the MyModule to default.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbatoolsConfig | Reset-DbatoolsConfig
```

Resets ALL configuration items to default.<br>

#####  Example:  3 

```powershell
PS C:\> Reset-DbatoolsConfig -FullName MyModule.Group.Setting1
```

Resets the configuration item named 'MyModule.Group.Setting1'.<br>

### Required Parameters

##### -Module

The name of the module whose configuration settings should be reset (e.g., 'dbatools', 'sql', 'connection').  
Use this when you want to reset all settings within a specific functional area, such as resetting all connection-related settings after environment changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -ConfigurationItem

One or more configuration objects as returned by Get-DbatoolsConfig.  
Use this when you want to reset specific configuration items that you've already identified through Get-DbatoolsConfig, allowing for precise control over which settings get reset.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -FullName

The full qualified name of a specific configuration setting to reset (e.g., 'dbatools.Connection.EncryptConnection').  
Use this when you know the exact setting name and want to reset just that one item, providing the most precise targeting of configuration changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Name

A wildcard pattern to match configuration setting names within the specified module (defaults to "*" for all settings).  
Use this with the -Module parameter to selectively reset settings, such as using "Encrypt*" to reset only encryption-related settings within a module.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

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
