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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Unregister-DbatoolsConfig</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Unregister-DbatoolsConfig.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbatoolsConfig | Unregister-DbatoolsConfig" }

Completely removes all registered configurations currently loaded in memory.<br>
In most cases, this will mean removing all registered configurations.<br>

#####  Example:  2 

```powershell
PS C:\> Unregister-DbatoolsConfig -Scope SystemDefault -FullName 'MyModule.Path.DefaultExport'
```
{: data-copyable="true" data-clean-code="Unregister-DbatoolsConfig -Scope SystemDefault -FullName 'MyModule.Path.DefaultExport'" }

Unregisters the setting 'MyModule.Path.DefaultExport' from the list of computer-wide defaults.<br>
Note: Changing system wide settings requires running the console with elevation.<br>

#####  Example:  3 

```powershell
PS C:\> Unregister-DbatoolsConfig -Module MyModule
```
{: data-copyable="true" data-clean-code="Unregister-DbatoolsConfig -Module MyModule" }

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
