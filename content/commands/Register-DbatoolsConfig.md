---
title: "Register-DbatoolsConfig"
slug: "Register-DbatoolsConfig"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Registers an existing configuration object in registry."
tags:
  - "Module"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Register-DbatoolsConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Register-DbatoolsConfig"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Register-DbatoolsConfig</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Register-DbatoolsConfig.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Registers an existing configuration object in registry.

## Description

Registers an existing configuration object in registry.  
This allows simple persisting of settings across powershell consoles.  
It also can be used to generate a registry template, which can then be used to create policies.

## Syntax

```powershell
Register-DbatoolsConfig
    [-Config <Config[]>]
    [-FullName <String[]>]
    [-Scope {UserDefault | UserMandatory | SystemDefault | SystemMandatory | FileUserLocal | FileUserShared | FileSystem}]
    [-EnableException]
    [<CommonParameters>]

Register-DbatoolsConfig
    [-Module] <String>
    [[-Name] <String>]
    [-Scope {UserDefault | UserMandatory | SystemDefault | SystemMandatory | FileUserLocal | FileUserShared | FileSystem}]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbatoolsConfig message.style.* | Register-DbatoolsConfig
```
{: data-copyable="true" data-clean-code="Get-DbatoolsConfig message.style.* | Register-DbatoolsConfig" }

Retrieves all configuration items that that start with message.style. and registers them in registry for the current user.<br>

#####  Example:  2 

```powershell
PS C:\> Register-DbatoolsConfig -FullName "message.consoleoutput.disable" -Scope SystemDefault
```
{: data-copyable="true" data-clean-code="Register-DbatoolsConfig -FullName &quot;message.consoleoutput.disable&quot; -Scope SystemDefault" }

Retrieves the configuration item "message.consoleoutput.disable" and registers it in registry as the default setting for all users on this machine.<br>

#####  Example:  3 

```powershell
PS C:\> Register-DbatoolsConfig -Module Message -Scope SystemMandatory
```
{: data-copyable="true" data-clean-code="Register-DbatoolsConfig -Module Message -Scope SystemMandatory" }

Retrieves all configuration items of the module Message, then registers them in registry to enforce them for all users on the current system.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbatoolsConfig -FullName sql.connection.trustcert -Value $true -PassThru | Register-DbatoolsConfig
```
{: data-copyable="true" data-clean-code="Set-DbatoolsConfig -FullName sql.connection.trustcert -Value $true -PassThru | Register-DbatoolsConfig" }

Set the "sql.connection.trustcert" configuration to be $true, and then use the -PassThru parameter<br>
to be able to pipe the output and register them in registry for the current user.<br>

### Required Parameters

##### -Module

Module name containing the configuration settings to register, such as "Message" or "SqlInstance".  
Use this to register all configuration settings for a particular dbatools module at once.  
Combine with -Name parameter to filter which settings within the module get registered.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Config

Configuration object(s) to persist to registry or file system for future PowerShell sessions.  
Accepts pipeline input from Get-DbatoolsConfig to save specific settings like connection timeouts or SSL preferences.  
Use this when you have configuration objects you want to make permanent across dbatools sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -FullName

Complete configuration setting name to register, such as "sql.connection.trustcert" or "message.consoleoutput.disable".  
Specify this when you know the exact setting name and want to persist that specific configuration.  
Use Get-DbatoolsConfig to discover available configuration names in your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Name

Filters which configuration settings get registered when used with -Module parameter. Supports wildcards.  
Use this to register only specific settings within a module rather than all module settings.  
Defaults to "*" which includes all settings for the specified module.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

##### -Scope

Determines where the configuration is stored and who can access it.  
UserDefault applies to current user only, while SystemDefault affects all users on the machine.  
Use UserMandatory or SystemMandatory to enforce settings that cannot be overridden by individual users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UserDefault |

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
