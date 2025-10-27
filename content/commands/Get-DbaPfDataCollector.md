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

# Get-DbaPfDataCollector

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPfDataCollector](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollector.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPfDataCollector](https://dataplat.github.io/boh#Get-DbaPfDataCollector).

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

Gets all Collectors on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollector -ComputerName sql2017
```

Gets all Collectors on sql2017.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollector -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```

Gets all Collectors for the 'System Correlation' CollectorSet on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Get-DbaPfDataCollector
```

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
