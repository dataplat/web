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

# Export-DbaPfDataCollectorSetTemplate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaPfDataCollectorSetTemplate](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaPfDataCollectorSetTemplate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaPfDataCollectorSetTemplate](https://dataplat.github.io/boh#Export-DbaPfDataCollectorSetTemplate).

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

Exports all data collector sets from to the C:\temp\pf folder.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorSet ComputerName sql2017 -CollectorSet 'System Correlation' | Export-DbaPfDataCollectorSetTemplate -Path C:\temp
```

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
