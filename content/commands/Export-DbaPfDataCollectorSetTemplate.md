---
title: "Export-DbaPfDataCollectorSetTemplate"
slug: "Export-DbaPfDataCollectorSetTemplate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Exports Windows Performance Monitor Data Collector Set configurations as reusable XML templates."
tags:
  - "Performance"
  - "DataCollector"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaPfDataCollectorSetTemplate.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaPfDataCollectorSetTemplate"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaPfDataCollectorSetTemplate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaPfDataCollectorSetTemplate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Exports Windows Performance Monitor Data Collector Set configurations as reusable XML templates.

## Description

Exports Data Collector Set configurations from Windows Performance Monitor as XML template files that can be imported on other SQL Server hosts. This allows you to standardize performance monitoring across your SQL Server environment by saving custom counter collections, sampling intervals, and output settings as portable templates. Particularly useful for creating consistent performance baselines and troubleshooting configurations that can be quickly deployed when performance issues arise.

## Syntax

```powershell
Export-DbaPfDataCollectorSetTemplate
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CollectorSet] <String[]>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaPfDataCollectorSetTemplate -ComputerName sql2017 -Path C:\temp\pf
```
{: data-copyable="true" data-clean-code="Export-DbaPfDataCollectorSetTemplate -ComputerName sql2017 -Path C:\temp\pf" }

Exports all data collector sets from to the C:\temp\pf folder.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorSet ComputerName sql2017 -CollectorSet 'System Correlation' | Export-DbaPfDataCollectorSetTemplate -Path C:\temp
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorSet ComputerName sql2017 -CollectorSet 'System Correlation' | Export-DbaPfDataCollectorSetTemplate -Path C:\temp" }

Exports the 'System Correlation' data collector set from sql2017 to C:\temp.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) to export data collector sets from. Defaults to localhost.  
Use this to export performance monitoring templates from remote SQL Server hosts for standardization across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to $ComputerName using alternative credentials. To use:  
$cred = Get-Credential, then pass $cred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CollectorSet

Specifies the name(s) of specific data collector sets to export. If not specified, all collector sets will be exported.  
Use this when you only need to export particular performance monitoring configurations rather than all available sets.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory where XML template files will be created. Each collector set exports as a separate XML file.  
Defaults to the configured dbatools export path, typically used when exporting multiple collector sets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path including filename for the exported XML template. Use instead of Path when exporting a single collector set.  
Automatically appends .xml extension if not provided, ideal for creating named templates for specific monitoring scenarios.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts data collector set objects from Get-DbaPfDataCollectorSet via pipeline input. Enables pipeline workflows for filtering and processing collector sets.  
Use this when you need to chain commands together, such as filtering collector sets before exporting them.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
