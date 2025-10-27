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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaPfDataCollectorCounter</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorCounter.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounter" }

Gets all counters for all Collector Sets on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter -ComputerName sql2017
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounter -ComputerName sql2017" }

Gets all counters for all Collector Sets on  on sql2017.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter -ComputerName sql2017 -Counter '\Processor(_Total)\% Processor Time'
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounter -ComputerName sql2017 -Counter '\Processor(_Total)\% Processor Time'" }

Gets the '\Processor(_Total)\% Processor Time' counter on sql2017.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounter -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'" }

Gets all counters for the 'System Correlation' CollectorSet on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Get-DbaPfDataCollector | Get-DbaPfDataCollectorCounter
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Get-DbaPfDataCollector | Get-DbaPfDataCollectorCounter" }

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
