---
title: "Get-DbaPfDataCollectorSetTemplate"
slug: "Get-DbaPfDataCollectorSetTemplate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows Performance Monitor templates designed for SQL Server monitoring and troubleshooting."
tags:
  - "Performance"
  - "DataCollector"
  - "PerfCounter"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorSetTemplate.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPfDataCollectorSetTemplate"
draft: false
---

# Get-DbaPfDataCollectorSetTemplate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPfDataCollectorSetTemplate](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorSetTemplate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPfDataCollectorSetTemplate](https://dataplat.github.io/boh#Get-DbaPfDataCollectorSetTemplate).

## Synopsis

Retrieves Windows Performance Monitor templates designed for SQL Server monitoring and troubleshooting.

## Description

Retrieves information about predefined Windows Performance Monitor (PerfMon) templates specifically created for SQL Server performance analysis. These templates include counter sets for monitoring long-running queries, PAL (Performance Analysis of Logs) configurations for different SQL Server versions, and other SQL Server-focused performance scenarios.  
  
The function parses XML template files and returns details like template names, descriptions, sources, and file paths. Use this to discover available monitoring templates before deploying them with Import-DbaPfDataCollectorSetTemplate, eliminating the need to manually browse template directories or guess what counters to collect for specific performance issues.

## Syntax

```powershell
Get-DbaPfDataCollectorSetTemplate
    [[-Path] <String[]>]
    [[-Pattern] <String>]
    [[-Template] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPfDataCollectorSetTemplate
```

Returns information about all the templates in the local dbatools repository.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorSetTemplate | Out-GridView -PassThru | Import-DbaPfDataCollectorSetTemplate -ComputerName sql2017 | Start-DbaPfDataCollectorSet
```

Allows you to select a template, then deploys it to sql2017 and immediately starts the DataCollectorSet.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollectorSetTemplate | Select-Object *
```

Returns more information about the template, including the full path/filename.<br>

### Optional Parameters

##### -Path

Specifies the directory path containing Performance Monitor template XML files. Defaults to the dbatools built-in template repository (\bin\perfmontemplates\collectorsets).  
Use this when you have custom template files stored in a different location or want to load templates from a network share.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | "$script:PSModuleRoot\bin\perfmontemplates\collectorsets" |

##### -Pattern

Filters templates by matching text patterns against template names and descriptions using regex syntax. Supports wildcards (* becomes .*).  
Use this to find templates for specific scenarios like "long.*query" to locate long-running query monitoring templates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Template

Specifies one or more template names to retrieve by exact match. Accepts multiple values and supports tab completion to browse available templates.  
Use this when you know the specific template names you need rather than browsing all available templates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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
