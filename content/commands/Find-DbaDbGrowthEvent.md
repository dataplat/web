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

# Find-DbaDbGrowthEvent

| Property | Value |
| --- | --- |
| **Author** | Aaron Nelson |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaDbGrowthEvent](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbGrowthEvent.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaDbGrowthEvent](https://dataplat.github.io/boh#Find-DbaDbGrowthEvent).

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

Returns any database AutoGrow events in the Default Trace with UTC time for the instance for every database on the localhost instance.<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance localhost -UseLocalTime
```

Returns any database AutoGrow events in the Default Trace with the local time of the instance for every database on the localhost instance.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016, ServerA\SQL2014
```

Returns any database AutoGrow events in the Default Traces for every database on ServerA\sql2016 & ServerA\SQL2014.<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016 | Format-Table -AutoSize -Wrap
```

Returns any database AutoGrow events in the Default Trace for every database on the ServerA\SQL2016 instance in a table format.<br>

#####  Example:  5 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016 -EventType Shrink
```

Returns any database Auto Shrink events in the Default Trace for every database on the ServerA\SQL2016 instance.<br>

#####  Example:  6 

```powershell
PS C:\> Find-DbaDbGrowthEvent -SqlInstance ServerA\SQL2016 -EventType Growth -FileType Data
```

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
