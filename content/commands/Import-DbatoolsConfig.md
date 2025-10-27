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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Import-DbatoolsConfig</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Import-DbatoolsConfig.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Import-DbatoolsConfig -Path '.\config.json'" }

Imports the configuration stored in '.\config.json'<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbatoolsConfig -ModuleName message
```
{: data-copyable="true" data-clean-code="Import-DbatoolsConfig -ModuleName message" }

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
