---
title: "Get-DbatoolsConfigValue"
slug: "Get-DbatoolsConfigValue"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves a specific dbatools configuration value by its exact name."
tags:
  - "Module"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsConfigValue.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbatoolsConfigValue"
draft: false
---

# Get-DbatoolsConfigValue

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbatoolsConfigValue](https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsConfigValue.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbatoolsConfigValue](https://dataplat.github.io/boh#Get-DbatoolsConfigValue).

## Synopsis

Retrieves a specific dbatools configuration value by its exact name.

## Description

Retrieves the actual value stored in a specific dbatools configuration setting using its full name (Module.Name format). This function is primarily used internally by dbatools functions to access their configuration settings, but can also be used by DBAs in custom scripts to retrieve specific module preferences like connection timeouts, default file paths, or email settings. Unlike Get-DbatoolsConfig which lists multiple configurations, this function returns the raw value of a single setting with optional fallback support.

## Syntax

```powershell
Get-DbatoolsConfigValue
    [-FullName] <String>
    [[-Fallback] <Object>]
    [-NotNull]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbatoolsConfigValue -Name 'System.MailServer'
```

Returns the configured value that was assigned to the key 'System.MailServer'<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbatoolsConfigValue -Name 'Default.CoffeeMilk' -Fallback 0
```

Returns the configured value for 'Default.CoffeeMilk'. If no such value is configured, it returns '0' instead.<br>

### Required Parameters

##### -FullName

Specifies the exact configuration setting name in Module.Name format (like 'sql.connection.timeout' or 'path.dbatoolsdata').  
Use this to retrieve specific dbatools module settings that control behavior like connection timeouts, default file paths, or email configurations.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Fallback

Provides a default value to return when the specified configuration setting doesn't exist or is set to null.  
Use this in scripts when you need a reliable value even if the configuration hasn't been set, such as providing a default timeout of 30 seconds when no custom timeout is configured.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NotNull

Forces the function to throw an error instead of returning null when no configuration value is found.  
Use this when your script requires a specific configuration setting to be present and should fail gracefully rather than continue with null values that could cause unexpected behavior.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
