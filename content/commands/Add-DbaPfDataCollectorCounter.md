---
title: "Add-DbaPfDataCollectorCounter"
slug: "Add-DbaPfDataCollectorCounter"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Adds performance counters to existing Windows Performance Monitor Data Collector Sets for SQL Server monitoring."
tags:
  - "PerfMon"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaPfDataCollectorCounter.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaPfDataCollectorCounter"
draft: false
---

# Add-DbaPfDataCollectorCounter

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Add-DbaPfDataCollectorCounter](https://github.com/dataplat/dbatools/blob/master/public/Add-DbaPfDataCollectorCounter.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Add-DbaPfDataCollectorCounter](https://dataplat.github.io/boh#Add-DbaPfDataCollectorCounter).

## Synopsis

Adds performance counters to existing Windows Performance Monitor Data Collector Sets for SQL Server monitoring.

## Description

Adds specific performance counters to existing Data Collector Sets within Windows Performance Monitor. This allows DBAs to customize their performance monitoring by adding SQL Server-specific counters like disk queue length, processor time, or SQL Server object counters to existing collection sets. The function modifies the Data Collector Set configuration and immediately applies the changes, so you can start collecting the additional performance metrics without recreating your monitoring setup.

## Syntax

```powershell
Add-DbaPfDataCollectorCounter
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CollectorSet] <String[]>]
    [[-Collector] <String[]>]
    [-Counter] <Object[]>
    [[-InputObject] <Object[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Add-DbaPfDataCollectorCounter -ComputerName sql2017 -CollectorSet 'System Correlation' -Collector DataCollector01  -Counter '\LogicalDisk(*)\Avg. Disk Queue Length'
```

Adds the '\LogicalDisk(*)\Avg. Disk Queue Length' counter within the DataCollector01 collector within the System Correlation collector set on sql2017.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollector | Out-GridView -PassThru | Add-DbaPfDataCollectorCounter -Counter '\LogicalDisk(*)\Avg. Disk Queue Length' -Confirm
```

Allows you to select which Data Collector you'd like to add the counter '\LogicalDisk(*)\Avg. Disk Queue Length' on localhost and prompts for confirmation.<br>

### Required Parameters

##### -Counter

Specifies the performance counter path to add to the Data Collector. Must use the full counter path format like '\Processor(_Total)\% Processor Time' or '\SQLServer:Buffer Manager\Page life   
expectancy'.  
Use Get-DbaPfAvailableCounter to find available SQL Server and system counters with their exact paths.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the target computer where the Data Collector Set is located. Use this when adding counters to performance monitoring on remote SQL Server instances.  
Defaults to localhost if not specified.

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

Specifies the name of the Windows Performance Monitor Data Collector Set that contains the collector you want to modify.  
This is the parent container that organizes related performance data collectors for your monitoring scenario.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Collector

Specifies the name of the individual Data Collector within the CollectorSet where the new counter will be added.  
Each collector can contain multiple performance counters and defines how the data is gathered and stored.

| Property | Value |
| --- | --- |
| Alias | DataCollector |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Data Collector objects from Get-DbaPfDataCollector via the pipeline. This allows you to target specific collectors for counter addition.  
Also accepts counter objects from Get-DbaPfAvailableCounter to add available counters directly.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
