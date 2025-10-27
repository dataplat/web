---
title: "Get-DbaPfDataCollectorCounter"
slug: "Get-DbaPfDataCollectorCounter"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves performance counter configurations from Windows Performance Monitor Data Collector Sets."
tags:
  - "Performance"
  - "DataCollector"
  - "PerfCounter"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorCounter.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPfDataCollectorCounter"
draft: false
---

# Get-DbaPfDataCollectorCounter

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPfDataCollectorCounter](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorCounter.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPfDataCollectorCounter](https://dataplat.github.io/boh#Get-DbaPfDataCollectorCounter).

## Synopsis

Retrieves performance counter configurations from Windows Performance Monitor Data Collector Sets.

## Description

Retrieves the list of performance counters that are configured within Windows Performance Monitor Data Collector Sets. This is useful for auditing performance monitoring configurations, verifying which SQL Server and system counters are being collected, and understanding your performance data collection setup. The function extracts counter details from existing Data Collector objects, showing you exactly which performance metrics are being tracked for troubleshooting and capacity planning.

## Syntax

```powershell
Get-DbaPfDataCollectorCounter
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CollectorSet] <String[]>]
    [[-Collector] <String[]>]
    [[-Counter] <String[]>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter
```

Gets all counters for all Collector Sets on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter -ComputerName sql2017
```

Gets all counters for all Collector Sets on  on sql2017.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter -ComputerName sql2017 -Counter '\Processor(_Total)\% Processor Time'
```

Gets the '\Processor(_Total)\% Processor Time' counter on sql2017.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```

Gets all counters for the 'System Correlation' CollectorSet on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Get-DbaPfDataCollector | Get-DbaPfDataCollectorCounter
```

Gets all counters for the 'System Correlation' CollectorSet.<br>

### Optional Parameters

##### -ComputerName

Specifies the target server(s) where Performance Monitor Data Collector Sets are configured.  
Use this to audit performance counters on remote SQL Server instances or retrieve counter configurations from multiple servers at once.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to servers using alternative credentials. To use:  
$scred = Get-Credential, then pass $scred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CollectorSet

Filters results to specific Data Collector Set names such as 'System Correlation' or custom SQL performance monitoring sets.  
Use this when you need to examine counters for particular monitoring scenarios rather than reviewing all configured performance data collection.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Collector

Filters results to specific Data Collector names within a Collector Set.  
Use this to narrow down results when a Collector Set contains multiple data collectors and you only need counter details from specific ones.

| Property | Value |
| --- | --- |
| Alias | DataCollector |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Counter

Searches for specific performance counter names using the exact Windows Performance Monitor format like '\SQLServer:Buffer Manager\Page life expectancy' or '\Processor(_Total)\% Processor Time'.  
Use this to verify if critical SQL Server or system performance counters are being monitored in your data collection setup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Data Collector objects from Get-DbaPfDataCollector via the pipeline to extract counter configurations.  
Use this for chaining commands when you want to drill down from Collector Sets to specific Data Collectors and then to their individual performance counters.

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
