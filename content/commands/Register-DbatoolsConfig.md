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

# Register-DbatoolsConfig

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Register-DbatoolsConfig](https://github.com/dataplat/dbatools/blob/master/public/Register-DbatoolsConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Register-DbatoolsConfig](https://dataplat.github.io/boh#Register-DbatoolsConfig).

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

Retrieves all configuration items that that start with message.style. and registers them in registry for the current user.<br>

#####  Example:  2 

```powershell
PS C:\> Register-DbatoolsConfig -FullName "message.consoleoutput.disable" -Scope SystemDefault
```

Retrieves the configuration item "message.consoleoutput.disable" and registers it in registry as the default setting for all users on this machine.<br>

#####  Example:  3 

```powershell
PS C:\> Register-DbatoolsConfig -Module Message -Scope SystemMandatory
```

Retrieves all configuration items of the module Message, then registers them in registry to enforce them for all users on the current system.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbatoolsConfig -FullName sql.connection.trustcert -Value $true -PassThru | Register-DbatoolsConfig
```

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
