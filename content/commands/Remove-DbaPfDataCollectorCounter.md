---
title: "Remove-DbaPfDataCollectorCounter"
slug: "Remove-DbaPfDataCollectorCounter"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes specific performance counters from Windows Performance Monitor Data Collector Sets."
tags:
  - "PerfMon"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaPfDataCollectorCounter.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaPfDataCollectorCounter"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaPfDataCollectorCounter</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaPfDataCollectorCounter.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Removes specific performance counters from Windows Performance Monitor Data Collector Sets.

## Description

Removes performance counters from existing Data Collector Sets in Windows Performance Monitor. This allows you to clean up monitoring configurations by removing counters that are no longer needed, reducing resource consumption and focusing on relevant metrics. Commonly used when fine-tuning SQL Server performance monitoring setups or removing counters that were added for troubleshooting specific issues.

## Syntax

```powershell
Remove-DbaPfDataCollectorCounter
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
PS C:\> Remove-DbaPfDataCollectorCounter -ComputerName sql2017 -CollectorSet 'System Correlation' -Collector DataCollector01  -Counter '\LogicalDisk(*)\Avg. Disk Queue Length'
```
{: data-copyable="true" data-clean-code="Remove-DbaPfDataCollectorCounter -ComputerName sql2017 -CollectorSet 'System Correlation' -Collector DataCollector01  -Counter '\LogicalDisk(*)\Avg. Disk Queue Length'" }

Prompts for confirmation then removes the '\LogicalDisk(*)\Avg. Disk Queue Length' counter within the DataCollector01 collector within the System Correlation collector set on sql2017.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfDataCollectorCounter | Out-GridView -PassThru | Remove-DbaPfDataCollectorCounter -Confirm:$false
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorCounter | Out-GridView -PassThru | Remove-DbaPfDataCollectorCounter -Confirm:$false" }

Allows you to select which counters you'd like on localhost and does not prompt for confirmation.<br>

### Required Parameters

##### -Counter

Specifies the exact performance counter name(s) to remove from the data collector. Must use the full counter path format like '\Processor(_Total)\% Processor Time' or '\SQLServer:Buffer   
Manager\Buffer cache hit ratio'.  
Use this when you need to remove specific SQL Server or system performance counters that are no longer needed for monitoring, such as counters added for troubleshooting that are now consuming   
unnecessary resources.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) where the Performance Monitor Data Collector Set is configured. Accepts multiple computer names for bulk operations.  
Use this when you need to remove counters from collector sets on remote SQL Server machines or when managing performance monitoring across multiple servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to the target computer using alternative credentials. To use:  
$cred = Get-Credential, then pass $cred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CollectorSet

Specifies the name of the Performance Monitor Data Collector Set containing the counters to be removed. Supports wildcards for pattern matching across multiple sets.  
Use this when you know the specific collector set name where your performance counters are configured, such as 'System Correlation' or custom SQL Server monitoring sets.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Collector

Specifies the name of the individual data collector within the collector set that contains the performance counters to remove. Supports multiple collector names.  
Use this to target specific data collectors when your collector set contains multiple collectors, allowing you to remove counters from only the collectors you specify.

| Property | Value |
| --- | --- |
| Alias | DataCollector |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts performance counter objects from Get-DbaPfDataCollectorCounter via the pipeline, allowing you to remove counters discovered through previous queries.  
Use this when you want to first review existing counters with Get-DbaPfDataCollectorCounter and then selectively remove specific ones through pipeline operations.

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
