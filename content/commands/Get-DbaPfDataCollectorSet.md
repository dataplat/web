---
title: "Get-DbaPfDataCollectorSet"
slug: "Get-DbaPfDataCollectorSet"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows Performance Monitor Data Collector Sets and their configuration details."
tags:
  - "Performance"
  - "DataCollector"
  - "PerfCounter"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorSet.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPfDataCollectorSet"
draft: false
---

# Get-DbaPfDataCollectorSet

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPfDataCollectorSet](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfDataCollectorSet.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPfDataCollectorSet](https://dataplat.github.io/boh#Get-DbaPfDataCollectorSet).

## Synopsis

Retrieves Windows Performance Monitor Data Collector Sets and their configuration details.

## Description

Retrieves detailed information about Windows Performance Monitor Data Collector Sets, which are used to collect performance counters for SQL Server monitoring and troubleshooting. Data Collector Sets define what performance counters to collect, when to collect them, and where to store the collected data. This function helps DBAs inventory existing collector sets, check their status (running, stopped, scheduled), and review their configuration including output locations and schedules. Particularly useful when inheriting a SQL Server environment or auditing existing performance monitoring setup.

## Syntax

```powershell
Get-DbaPfDataCollectorSet
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CollectorSet] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPfDataCollectorSet
```

Gets all Collector Sets on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -ComputerName sql2017
```

Gets all Collector Sets on sql2017.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -ComputerName sql2017 -Credential ad\sqldba -CollectorSet 'System Correlation'
```

Gets the 'System Correlation' CollectorSet on sql2017 using alternative credentials.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorSet | Select-Object *
```

Displays extra columns and also exposes the original COM object in DataCollectorSetObject.<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows server(s) where you want to inventory Performance Monitor Data Collector Sets.  
Use this when checking collector sets across multiple SQL Server hosts or when managing performance monitoring from a central location.  
Accepts multiple computer names and defaults to the local computer.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Specifies the name(s) of specific Data Collector Sets to retrieve instead of returning all collector sets.  
Use this when you need to check the status or configuration of specific performance monitoring setups like 'SQL Server Default' or custom collector sets.  
Accepts wildcards and multiple collector set names for targeted monitoring inventory.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
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
