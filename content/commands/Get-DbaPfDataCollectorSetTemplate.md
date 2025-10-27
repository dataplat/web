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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaPfDataCollectorSetTemplate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorSetTemplate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorSetTemplate" }

Returns information about all the templates in the local dbatools repository.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorSetTemplate | Out-GridView -PassThru | Import-DbaPfDataCollectorSetTemplate -ComputerName sql2017 | Start-DbaPfDataCollectorSet
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorSetTemplate | Out-GridView -PassThru | Import-DbaPfDataCollectorSetTemplate -ComputerName sql2017 | Start-DbaPfDataCollectorSet" }

Allows you to select a template, then deploys it to sql2017 and immediately starts the DataCollectorSet.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollectorSetTemplate | Select-Object *
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorSetTemplate | Select-Object *" }

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
