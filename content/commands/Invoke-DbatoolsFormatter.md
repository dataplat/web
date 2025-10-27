---
title: "Invoke-DbatoolsFormatter"
slug: "Invoke-DbatoolsFormatter"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto"
availability: "Windows, Linux, macOS"
synopsis: "Formats PowerShell function files to dbatools coding standards"
tags:
  - "Module"
  - "Support"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbatoolsFormatter.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbatoolsFormatter"
draft: false
---

# Invoke-DbatoolsFormatter

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbatoolsFormatter](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbatoolsFormatter.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbatoolsFormatter](https://dataplat.github.io/boh#Invoke-DbatoolsFormatter).

## Synopsis

Formats PowerShell function files to dbatools coding standards

## Description

Applies consistent code formatting to PowerShell files using PSScriptAnalyzer's Invoke-Formatter with OTBS (One True Brace Style) settings. This function standardizes indentation, brace placement, and whitespace handling across all dbatools module files, ensuring code consistency for contributors and maintainers. Files are saved without BOM encoding and with proper line ending handling for cross-platform compatibility.

## Syntax

```powershell
Invoke-DbatoolsFormatter
    [-Path] <Object[]>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbatoolsFormatter -Path C:\dbatools\public\Get-DbaDatabase.ps1
```

Reformats C:\dbatools\public\Get-DbaDatabase.ps1 to dbatools' standards<br>

### Required Parameters

##### -Path

Specifies the path to one or more PowerShell (.ps1) files that need to be formatted to dbatools coding standards.  
Accepts pipeline input from Get-ChildItem or other file listing commands for batch processing multiple files.  
Use this when you want to apply consistent OTBS formatting, proper indentation, and standardized brace placement to your dbatools contributions.

| Property | Value |
| --- | --- |
| Alias | FullName) |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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
