---
title: "New-DbatoolsSupportPackage"
slug: "New-DbatoolsSupportPackage"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Creates a comprehensive diagnostic package for troubleshooting dbatools module issues and bugs."
tags:
  - "Module"
  - "Support"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbatoolsSupportPackage.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbatoolsSupportPackage"
draft: false
---

# New-DbatoolsSupportPackage

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbatoolsSupportPackage](https://github.com/dataplat/dbatools/blob/master/public/New-DbatoolsSupportPackage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbatoolsSupportPackage](https://dataplat.github.io/boh#New-DbatoolsSupportPackage).

## Synopsis

Creates a comprehensive diagnostic package for troubleshooting dbatools module issues and bugs.

## Description

This function creates an extensive diagnostic package specifically designed to help the dbatools team troubleshoot module-related issues, bugs, or unexpected behavior. When you encounter problems with dbatools commands or need to submit a bug report, this package provides all the environmental and runtime information needed for effective debugging.  
  
The resulting compressed file contains comprehensive system and PowerShell environment details that are essential for reproducing and diagnosing issues. This saves you from manually collecting multiple pieces of information and ensures nothing important gets missed when reporting problems.  
  
The package includes:  
- Operating system and hardware information (CPU, RAM, OS version)  
- PowerShell and .NET framework versions and loaded modules  
- Your PowerShell command history from the current session  
- dbatools internal message and error logs  
- Complete console buffer contents (everything currently visible in your PowerShell window)  
- Loaded assemblies and their versions  
- Any additional variables you specify  
  
The output file is automatically created on your desktop (or home directory if desktop doesn't exist) as a timestamped ZIP archive. Always start a fresh PowerShell session and reproduce the minimal steps to trigger your issue before running this command - this keeps the diagnostic data focused and avoids including unrelated information or sensitive data from your session history.

## Syntax

```powershell
New-DbatoolsSupportPackage
    [[-Path] <String>]
    [[-Variables] <String[]>]
    [-PassThru]
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
PS C:\> New-DbatoolsSupportPackage
```

Creates a large support pack in order to help us troubleshoot stuff.<br>

### Optional Parameters

##### -Path

Specifies the directory where the support package ZIP file will be created. Defaults to your desktop, or home directory if desktop doesn't exist.  
Use this when you need the diagnostic file saved to a specific location for easier access or compliance requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | "$($env:USERPROFILE)\Desktop" |

##### -Variables

Specifies additional PowerShell variables to include in the diagnostic package by name. Only captures variables that exist in your current session.  
Use this when specific variables contain connection strings, configuration settings, or data relevant to reproducing your issue.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PassThru

Returns the FileInfo object for the created ZIP file instead of just displaying its location.  
Use this when you need to programmatically work with the support package file, such as uploading it automatically or getting its size.

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
