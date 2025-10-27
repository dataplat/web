---
title: "Get-DbatoolsConfig"
slug: "Get-DbatoolsConfig"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves dbatools module configuration settings and preferences."
tags:
  - "Module"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbatoolsConfig"
draft: false
---

# Get-DbatoolsConfig

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbatoolsConfig](https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbatoolsConfig](https://dataplat.github.io/boh#Get-DbatoolsConfig).

## Synopsis

Retrieves dbatools module configuration settings and preferences.

## Description

Retrieves dbatools module configuration settings that control how dbatools functions behave. These settings include connection timeouts, default paths, email configurations, and other module preferences that affect dbatools operations. Use this command to view current settings, troubleshoot dbatools behavior, or identify what configurations are available for customization with Set-DbatoolsConfig.

## Syntax

```powershell
Get-DbatoolsConfig
    [[-FullName] <String>]
    [-Force]
    [<CommonParameters>]

Get-DbatoolsConfig
    [[-Name] <String>]
    [[-Module] <String>]
    [-Force]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbatoolsConfig 'Mail.To'
```

Retrieves the configuration element for the key "Mail.To"<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbatoolsConfig -Force
```

Retrieve all configuration elements from all modules, even hidden ones.<br>

### Optional Parameters

##### -FullName

Default: "*"  
Specifies the complete configuration key in Module.Name format to retrieve specific dbatools settings.  
Use this to find exact configuration values like "sql.connection.timeout" or "mail.smtpserver" without needing to specify module and name separately.  
Supports wildcards for pattern matching across all configuration keys.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

##### -Name

Default: "*"  
Specifies the configuration name to search for within a specific module.  
Use this with the Module parameter to find settings like "timeout" within the "sql" module or "smtpserver" within the "mail" module.  
Supports wildcards for finding multiple related configuration names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

##### -Module

Default: "*"  
Specifies which dbatools module's configuration settings to retrieve.  
Use this to focus on specific areas like "sql" for connection settings, "mail" for email configurations, or "path" for default file locations.  
Commonly used modules include sql, mail, path, and logging.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

##### -Force

Includes hidden configuration values that are normally not displayed in the output.  
Use this when troubleshooting dbatools behavior or when you need to see internal configuration settings that control advanced module functionality.  
Hidden settings often include debugging flags and internal module state information.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
