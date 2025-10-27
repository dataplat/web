---
title: "Get-DbaWindowsLog"
slug: "Get-DbaWindowsLog"
date: 2024-01-01
layout: "single"
author: "Drew Furgiuele | Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves and parses SQL Server error log entries from the file system for analysis and troubleshooting"
tags:
  - "Logging"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWindowsLog.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWindowsLog"
draft: false
---

# Get-DbaWindowsLog

| Property | Value |
| --- | --- |
| **Author** | Drew Furgiuele , Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWindowsLog](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWindowsLog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWindowsLog](https://dataplat.github.io/boh#Get-DbaWindowsLog).

## Synopsis

Retrieves and parses SQL Server error log entries from the file system for analysis and troubleshooting

## Description

Parses SQL Server error log files directly from the file system to extract structured error information including timestamps, SPIDs, error numbers, severity levels, and messages. Locates error log files by querying Windows Application Event Log for SQL Server startup events (Event ID 17111), then reads and parses the raw log files to provide searchable, filterable results. This is essential for troubleshooting SQL Server issues, compliance reporting, and proactive monitoring since it gives you programmatic access to detailed error information that would otherwise require manual log file review.

## Syntax

```powershell
Get-DbaWindowsLog
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Start] <DateTime>]
    [[-End] <DateTime>]
    [[-Credential] <PSCredential>]
    [[-MaxThreads] <Int32>]
    [[-MaxRemoteThreads] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $ErrorLogs = Get-DbaWindowsLog -SqlInstance sql01\sharepoint
PS C:\> $ErrorLogs | Where-Object ErrorNumber -eq 18456
```

Returns all lines in the errorlogs that have event number 18456 in them<br>
This exists to ignore the Script Analyzer rule for Start-Runspace<br>

### Optional Parameters

##### -SqlInstance

The instance(s) to retrieve the event logs from

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Start

Filters log entries to include only those occurring after this timestamp. Defaults to January 1, 1970.  
Use this to focus on recent issues or events within a specific timeframe when troubleshooting SQL Server problems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1/1/1970 00:00:00 |

##### -End

Filters log entries to include only those occurring before this timestamp. Defaults to the current date and time.  
Combine with Start parameter to create specific time windows for analyzing SQL Server events during known problem periods.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-Date) |

##### -Credential

Credential to be used to connect to the Server. Note this is a Windows credential, as this command requires we communicate with the computer and not with the SQL instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaxThreads

Controls the maximum number of parallel threads used on the local computer for processing multiple SQL instances. Defaults to unlimited.  
Set a specific limit when processing many instances simultaneously to prevent overwhelming the local system with too many concurrent operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaxRemoteThreads

Sets the maximum number of parallel threads executed on each target SQL Server for processing error log files. Defaults to 2.  
Keep this low to avoid excessive CPU load on production servers, as log file parsing is CPU-intensive. Set to 0 or below to remove the limit entirely.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 2 |

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
