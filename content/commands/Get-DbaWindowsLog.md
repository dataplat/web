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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaWindowsLog</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWindowsLog.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Drew Furgiuele , Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="$ErrorLogs = Get-DbaWindowsLog -SqlInstance sql01\sharepoint
$ErrorLogs | Where-Object ErrorNumber -eq 18456" }

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
