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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbatoolsConfig</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbatoolsConfig.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbatoolsConfig | Export-DbatoolsConfig -OutPath '~/export.json'" }

Exports all current settings to json.<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbatoolsConfig -Module message -OutPath '~/export.json' -SkipUnchanged
```
{: data-copyable="true" data-clean-code="Export-DbatoolsConfig -Module message -OutPath '~/export.json' -SkipUnchanged" }

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
