---
title: "Get-DbaPfDataCollector"
slug: "Get-DbaPfDataCollector"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows Performance Monitor data collectors and their configuration details from local or remote computers."
tags:
  - "Performance"
  - "DataCollector"
  - "PerfCounter"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollector.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPfDataCollector"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaPfDataCollector</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollector.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Retrieves Windows Performance Monitor data collectors and their configuration details from local or remote computers.

## Description

Retrieves detailed information about Windows Performance Monitor data collectors within collector sets, commonly used by DBAs to monitor SQL Server performance counters. This function parses the XML configuration of existing data collectors to show their settings, file locations, sample intervals, and the specific performance counters they collect.  
  
Use this when you need to audit existing performance monitoring setups, verify collector configurations, or identify which performance counters are being captured for SQL Server baseline analysis and troubleshooting. The function works across multiple computers and integrates with Get-DbaPfDataCollectorSet for filtering specific collector sets.

## Syntax

```powershell
Get-DbaPfDataCollector
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CollectorSet] <String[]>]
    [[-Collector] <String[]>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPfDataCollector
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollector" }

Gets all Collectors on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollector -ComputerName sql2017
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollector -ComputerName sql2017" }

Gets all Collectors on sql2017.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollector -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollector -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'" }

Gets all Collectors for the 'System Correlation' CollectorSet on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Get-DbaPfDataCollector
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Get-DbaPfDataCollector" }

Gets all Collectors for the 'System Correlation' CollectorSet.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) to retrieve performance data collectors from. Defaults to localhost.  
Use this to monitor performance collectors across multiple SQL Server environments or remote systems where SQL Server performance monitoring is configured.

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

Filters results to data collectors within specific collector sets by name. Accepts wildcards for pattern matching.  
Use this when you want to examine collectors in a particular performance monitoring setup, such as 'System Correlation' or custom SQL Server baseline collector sets.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Collector

Filters results to specific data collectors by name within the collector sets. Accepts wildcards for pattern matching.  
Use this when you need to examine a particular collector's configuration, such as one focused on SQL Server counters or system resource monitoring.

| Property | Value |
| --- | --- |
| Alias | DataCollector |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts collector set objects from Get-DbaPfDataCollectorSet via the pipeline to retrieve their individual data collectors.  
Use this for pipeline operations when you want to drill down from collector sets to examine the specific performance counters and configuration details of their data collectors.

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
