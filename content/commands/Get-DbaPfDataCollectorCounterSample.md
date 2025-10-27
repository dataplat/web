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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaPfDataCollectorCounterSample</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorCounterSample.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounterSample" }

Gets a single sample for all counters for all Collector Sets on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorCounterSample -Counter '\Processor(_Total)\% Processor Time'
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounterSample -Counter '\Processor(_Total)\% Processor Time'" }

Gets a single sample for all counters for all Collector Sets on localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter -ComputerName sql2017, sql2016 | Out-GridView -PassThru | Get-DbaPfDataCollectorCounterSample -MaxSamples 10
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounter -ComputerName sql2017, sql2016 | Out-GridView -PassThru | Get-DbaPfDataCollectorCounterSample -MaxSamples 10" }

Gets 10 samples for all counters for all Collector Sets for servers sql2016 and sql2017.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorCounterSample -ComputerName sql2017
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounterSample -ComputerName sql2017" }

Gets a single sample for all counters for all Collector Sets on sql2017.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaPfDataCollectorCounterSample -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounterSample -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'" }

Gets a single sample for all counters for the 'System Correlation' CollectorSet on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaPfDataCollectorCounterSample -CollectorSet 'System Correlation'
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounterSample -CollectorSet 'System Correlation'" }

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
