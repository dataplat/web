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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Reset-DbatoolsConfig</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Reset-DbatoolsConfig.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Reset-DbatoolsConfig -Module MyModule" }

Resets all configuration items of the MyModule to default.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbatoolsConfig | Reset-DbatoolsConfig
```
{: data-copyable="true" data-clean-code="Get-DbatoolsConfig | Reset-DbatoolsConfig" }

Resets ALL configuration items to default.<br>

#####  Example:  3 

```powershell
PS C:\> Reset-DbatoolsConfig -FullName MyModule.Group.Setting1
```
{: data-copyable="true" data-clean-code="Reset-DbatoolsConfig -FullName MyModule.Group.Setting1" }

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
