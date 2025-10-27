---
title: "Get-DbaPfDataCollectorCounterSample"
slug: "Get-DbaPfDataCollectorCounterSample"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves real-time performance counter samples from SQL Server systems for monitoring and troubleshooting."
tags:
  - "Performance"
  - "DataCollector"
  - "PerfCounter"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorCounterSample.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPfDataCollectorCounterSample"
draft: false
---

# Get-DbaPfDataCollectorCounterSample

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPfDataCollectorCounterSample](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorCounterSample.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPfDataCollectorCounterSample](https://dataplat.github.io/boh#Get-DbaPfDataCollectorCounterSample).

## Synopsis

Retrieves real-time performance counter samples from SQL Server systems for monitoring and troubleshooting.

## Description

Collects performance counter data from Windows Performance Monitor collector sets and individual counters on SQL Server systems. This function wraps PowerShell's Get-Counter cmdlet to provide structured performance data that DBAs use for monitoring CPU, memory, disk I/O, and SQL Server-specific metrics. You can capture single snapshots for quick checks or continuous samples for ongoing monitoring during troubleshooting sessions. The output integrates seamlessly with Get-DbaPfDataCollectorCounter to build comprehensive performance monitoring workflows.

## Syntax

```powershell
Get-DbaPfDataCollectorCounterSample
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CollectorSet] <String[]>]
    [[-Collector] <String[]>]
    [[-Counter] <String[]>]
    [-Continuous]
    [[-ListSet]]
    [[-MaxSamples] <Int32>]
    [[-SampleInterval] <Int32>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPfDataCollectorCounterSample
```

Gets a single sample for all counters for all Collector Sets on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorCounterSample -Counter '\Processor(_Total)\% Processor Time'
```

Gets a single sample for all counters for all Collector Sets on localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter -ComputerName sql2017, sql2016 | Out-GridView -PassThru | Get-DbaPfDataCollectorCounterSample -MaxSamples 10
```

Gets 10 samples for all counters for all Collector Sets for servers sql2016 and sql2017.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorCounterSample -ComputerName sql2017
```

Gets a single sample for all counters for all Collector Sets on sql2017.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaPfDataCollectorCounterSample -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```

Gets a single sample for all counters for the 'System Correlation' CollectorSet on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaPfDataCollectorCounterSample -CollectorSet 'System Correlation'
```

Gets a single sample for all counters for the 'System Correlation' CollectorSet.<br>

### Optional Parameters

##### -ComputerName

The target computer where performance counters will be collected. Defaults to localhost.  
Use this when monitoring remote SQL Server systems or collecting performance data from multiple servers simultaneously.

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

Specifies which Performance Monitor Data Collector Set to sample counters from. Accepts wildcard patterns for matching multiple sets.  
Use this to focus on specific pre-configured collector sets like 'System Performance' or custom SQL Server monitoring sets instead of sampling all available counters.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Collector

Specifies which individual Data Collector within a Collector Set to sample from. Accepts wildcard patterns.  
Use this when you need samples from specific collectors rather than all collectors in a set, such as targeting only SQL Server-related collectors.

| Property | Value |
| --- | --- |
| Alias | DataCollector |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Counter

Specifies individual performance counter paths to sample in the standard format like '\Processor(_Total)\% Processor Time' or '\SQLServer:Buffer Manager\Page life expectancy'.  
Use this when you need specific counters for targeted troubleshooting rather than sampling all available counters from collector sets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Continuous

Enables continuous sampling until you press CTRL+C instead of taking a single snapshot. Combine with SampleInterval to control timing between samples.  
Use this during active troubleshooting sessions when you need to monitor performance trends in real-time, such as during query execution or system load events.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ListSet

Lists available performance counter sets on the target computers without collecting samples. Supports wildcard patterns for filtering.  
Use this to discover what counter sets are available before running collection commands, especially useful when working with unfamiliar systems or custom monitoring configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaxSamples

Specifies the maximum number of samples to collect from each counter before stopping. Default is 1 sample.  
Use this when you need a specific number of data points for analysis, such as collecting 60 samples at 1-second intervals to get one minute of baseline performance data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SampleInterval

Sets the time interval between samples in seconds with a minimum and default of 1 second.  
Use this to control sampling frequency based on your monitoring needs - shorter intervals for active troubleshooting or longer intervals for baseline collection to reduce overhead.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -InputObject

Accepts the object output by Get-DbaPfDataCollectorCounter via the pipeline.

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
