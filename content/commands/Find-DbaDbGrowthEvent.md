---
title: "Find-DbaDbGrowthEvent"
slug: "Find-DbaDbGrowthEvent"
date: 2024-01-01
layout: "single"
author: "Aaron Nelson"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database auto-growth and auto-shrink events from the SQL Server Default Trace"
tags:
  - "AutoGrow"
  - "Database"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbGrowthEvent.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaDbGrowthEvent"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaDbGrowthEvent</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbGrowthEvent.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Aaron Nelson</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves database auto-growth and auto-shrink events from the SQL Server Default Trace

## Description

Queries the SQL Server Default Trace to identify when database files have automatically grown or shrunk, providing detailed timing and size change information essential for performance troubleshooting and capacity planning. This function helps DBAs investigate unexpected performance slowdowns caused by auto-growth events, analyze storage growth patterns to optimize initial file sizing, and track which applications or processes are triggering unplanned database expansions. Returns comprehensive details including the exact time of each event, size change in MB, duration, and the application/user that caused the growth, so you don't have to manually parse trace files or write custom T-SQL queries.  
  
The following events are included:  
92 - Data File Auto Grow  
93 - Log File Auto Grow  
94 - Data File Auto Shrink  
95 - Log File Auto Shrink

## Syntax

```powershell
Find-DbaDbGrowthEvent
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-EventType] <String>]
    [[-FileType] <String>]
    [-UseLocalTime]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Find-DbaDbGrowthEvent -SqlInstance localhost" }

Returns any database AutoGrow events in the Default Trace with UTC time for the instance for every database on the localhost instance.<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance localhost -UseLocalTime
```
{: data-copyable="true" data-clean-code="Find-DbaDbGrowthEvent -SqlInstance localhost -UseLocalTime" }

Returns any database AutoGrow events in the Default Trace with the local time of the instance for every database on the localhost instance.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016, ServerA\SQL2014
```
{: data-copyable="true" data-clean-code="Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016, ServerA\SQL2014" }

Returns any database AutoGrow events in the Default Traces for every database on ServerA\sql2016 & ServerA\SQL2014.<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016 | Format-Table -AutoSize -Wrap
```
{: data-copyable="true" data-clean-code="Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016 | Format-Table -AutoSize -Wrap" }

Returns any database AutoGrow events in the Default Trace for every database on the ServerA\SQL2016 instance in a table format.<br>

#####  Example:  5 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016 -EventType Shrink
```
{: data-copyable="true" data-clean-code="Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016 -EventType Shrink" }

Returns any database Auto Shrink events in the Default Trace for every database on the ServerA\SQL2016 instance.<br>

#####  Example:  6 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016 -EventType Growth -FileType Data
```
{: data-copyable="true" data-clean-code="Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016 -EventType Growth -FileType Data" }

Returns any database Auto Growth events on data files in the Default Trace for every database on the ServerA\SQL2016 instance.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to search for growth events. Accepts wildcards for pattern matching.  
Use this to focus on specific databases when investigating growth patterns or troubleshooting performance issues.  
If not specified, searches all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specified databases from the growth event search. Accepts wildcards for pattern matching.  
Useful when you want to skip system databases like tempdb or exclude databases with known frequent growth events.  
Commonly used with tempdb, master, model, and msdb to focus on user databases only.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EventType

Filters results to show only specific types of database size change events.  
Use 'Growth' to identify when files expanded automatically, which can indicate undersized initial allocations or unexpected data volume increases.  
Use 'Shrink' to find auto-shrink events that may be causing performance problems due to file fragmentation.  
Allowed values: Growth, Shrink

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Growth,Shrink |

##### -FileType

Filters results to show only data file or log file growth events.  
Use 'Data' when investigating storage capacity issues or unexpected table growth patterns.  
Use 'Log' when troubleshooting transaction log growth, often caused by long-running transactions or delayed log backups.  
Allowed values: Data, Log

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Data,Log |

##### -UseLocalTime

Returns timestamps in the SQL Server instance's local time zone instead of converting to UTC.  
Use this when correlating growth events with local application schedules, maintenance windows, or business hours.  
By default, times are converted to UTC for consistency across multiple time zones.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
