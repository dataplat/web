---
title: "Invoke-DbaPfRelog"
slug: "Invoke-DbaPfRelog"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Pipeline-compatible wrapper for the relog command which is available on modern Windows platforms."
tags:
  - "Performance"
  - "DataCollector"
  - "PerfCounter"
  - "Relog"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaPfRelog.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaPfRelog"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaPfRelog</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaPfRelog.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Pipeline-compatible wrapper for the relog command which is available on modern Windows platforms.

## Description

Pipeline-compatible wrapper for the relog command. Relog is useful for converting Windows Perfmon.  
  
Extracts performance counters from performance counter logs into other formats,  
such as text-TSV (for tab-delimited text), text-CSV (for comma-delimited text), binary-BIN, or SQL.  
  
`relog "C:\PerfLogs\Admin\System Correlation\WORKSTATIONX_20180112-000001\DataCollector01.blg" -o C:\temp\foo.csv -f tsv`  
  
If you find any input hangs, please send us the output so we can accommodate for it then use -Raw for an immediate solution.

## Syntax

```powershell
Invoke-DbaPfRelog
    [[-Path] <String[]>]
    [[-Destination] <String>]
    [[-Type] <String>]
    [-Append]
    [-AllowClobber]
    [[-PerformanceCounter] <String[]>]
    [[-PerformanceCounterPath] <String>]
    [[-Interval] <Int32>]
    [[-BeginTime] <DateTime>]
    [[-EndTime] <DateTime>]
    [[-ConfigPath] <String>]
    [-Summary]
    [[-InputObject] <Object[]>]
    [-Multithread]
    [-AllTime]
    [-Raw]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaPfRelog -Path C:\temp\perfmon.blg
```
{: data-copyable="true" data-clean-code="Invoke-DbaPfRelog -Path C:\temp\perfmon.blg" }

Creates C:\temp\perfmon.tsv from C:\temp\perfmon.blg.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaPfRelog -Path C:\temp\perfmon.blg -Destination C:\temp\a\b\c
```
{: data-copyable="true" data-clean-code="Invoke-DbaPfRelog -Path C:\temp\perfmon.blg -Destination C:\temp\a\b\c" }

Creates the temp, a, and b directories if needed, then generates c.tsv (tab separated) from C:\temp\perfmon.blg.<br>
Returns the newly created file as a file object.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -ComputerName sql2016 | Get-DbaPfDataCollector | Invoke-DbaPfRelog -Destination C:\temp\perf
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorSet -ComputerName sql2016 | Get-DbaPfDataCollector | Invoke-DbaPfRelog -Destination C:\temp\perf" }

Creates C:\temp\perf if needed, then generates computername-datacollectorname.tsv (tab separated) from the latest logs of all data collector sets on sql2016. This destination format was chosen to <br>
avoid naming conflicts with piped input.<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaPfRelog -Path C:\temp\perfmon.blg -Destination C:\temp\a\b\c -Raw
>> [Invoke-DbaPfRelog][21:21:35] relog "C:\temp\perfmon.blg" -f csv -o C:\temp\a\b\c
>> Input

##### >> 
>> File(s):
>> C:\temp\perfmon.blg (Binary)
>> Begin:    1/13/2018 5:13:23
>> End:      1/13/2018 14:29:55
>> Samples:  2227
>> 100.00%
>> Output

##### >> 
>> File:     C:\temp\a\b\c.csv
>> Begin:    1/13/2018 5:13:23
>> End:      1/13/2018 14:29:55
>> Samples:  2227
>> The command completed successfully.
```
{: data-copyable="true" data-clean-code="Invoke-DbaPfRelog -Path C:\temp\perfmon.blg -Destination C:\temp\a\b\c -Raw
[Invoke-DbaPfRelog][21:21:35] relog &quot;C:\temp\perfmon.blg&quot; -f csv -o C:\temp\a\b\c
Input
File(s):
C:\temp\perfmon.blg (Binary)
Begin:    1/13/2018 5:13:23
End:      1/13/2018 14:29:55
Samples:  2227
100.00%
Output
File:     C:\temp\a\b\c.csv
Begin:    1/13/2018 5:13:23
End:      1/13/2018 14:29:55
Samples:  2227
The command completed successfully." }

Creates the temp, a, and b directories if needed, then generates c.tsv (tab separated) from C:\temp\perfmon.blg then outputs the raw results of the relog command.<br>

#####  Example:  5 

```powershell
PS C:\> Invoke-DbaPfRelog -Path 'C:\temp\perflog with spaces.blg' -Destination C:\temp\a\b\c -Type csv -BeginTime ((Get-Date).AddDays(-30)) -EndTime ((Get-Date).AddDays(-1))
```
{: data-copyable="true" data-clean-code="Invoke-DbaPfRelog -Path 'C:\temp\perflog with spaces.blg' -Destination C:\temp\a\b\c -Type csv -BeginTime ((Get-Date).AddDays(-30)) -EndTime ((Get-Date).AddDays(-1))" }

Creates the temp, a, and b directories if needed, then generates c.csv (comma separated) from C:\temp\perflog with spaces.blg', starts 30 days ago and ends one day ago.<br>

#####  Example:  6 

```powershell
PS C:\> $servers | Get-DbaPfDataCollectorSet | Get-DbaPfDataCollector | Invoke-DbaPfRelog -Multithread -AllowClobber
```
{: data-copyable="true" data-clean-code="$servers | Get-DbaPfDataCollectorSet | Get-DbaPfDataCollector | Invoke-DbaPfRelog -Multithread -AllowClobber" }

Relogs latest data files from all collectors within the servers listed in $servers.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaPfDataCollector -Collector DataCollector01 | Invoke-DbaPfRelog -AllowClobber -AllTime
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollector -Collector DataCollector01 | Invoke-DbaPfRelog -AllowClobber -AllTime" }

Relogs all the log files from the DataCollector01 on the local computer and allows overwrite.<br>

### Optional Parameters

##### -Path

Specifies the file path to Windows performance counter log files (.blg format) that need to be converted. Accepts multiple file paths and supports pipeline input.  
Use this when you have perfmon binary logs that need to be converted to readable formats like CSV or TSV for analysis.

| Property | Value |
| --- | --- |
| Alias | FullName |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Destination

Specifies the output file path or directory where converted performance data will be saved. Creates necessary directories automatically if they don't exist.  
When omitted, files are saved in the same directory as the source with the appropriate extension (.tsv, .csv, etc.).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies the output format for the converted performance data. Defaults to 'tsv' (tab-separated values).  
Use 'csv' for Excel compatibility, 'tsv' for easy parsing in PowerShell, 'bin' for binary format, or 'sql' to write directly to a SQL database via ODBC.  
For SQL output, specify the destination as 'DSN!counter_log' where DSN is configured in ODBC Manager.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | tsv |
| Accepted Values | tsv,csv,bin,sql |

##### -Append

Appends performance data to an existing output file instead of overwriting it. Only works with binary (-Type bin) format.  
Use this when consolidating multiple perfmon logs into a single file for comprehensive analysis over time periods.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AllowClobber

Overwrites existing output files without prompting. Required when the destination file already exists and you want to replace it.  
Use this in automated scripts or when you need to refresh converted performance data files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PerformanceCounter

Specifies specific performance counters to extract from the log files. Accepts counter paths like '\Processor(_Total)\% Processor Time'.  
Use this to filter large perfmon logs and extract only the counters you need for analysis, reducing output file size.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PerformanceCounterPath

Specifies a text file containing performance counter paths to extract, one counter per line. Alternative to specifying counters directly.  
Use this when you have a standard set of counters for monitoring SQL Server performance and want to consistently extract the same metrics across multiple log files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Interval

Specifies the sampling interval by including every nth data point from the original log. Reduces output size by skipping intermediate samples.  
Use this when working with high-frequency perfmon logs where you need less granular data for trend analysis rather than detailed monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BeginTime

Specifies the start time for data extraction using a DateTime object. Only performance data from this time forward will be included in the output.  
Use this to extract specific time periods from large perfmon logs, such as during a known performance incident or maintenance window.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EndTime

Specifies the end time for data extraction using a DateTime object. Performance data after this time will be excluded from the output.  
Combine with BeginTime to extract data from specific time ranges, useful for analyzing performance during particular events or time periods.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ConfigPath

Specifies a configuration file containing relog command-line parameters for complex or frequently-used conversion settings.  
Use this when you have standardized performance log processing requirements that need consistent parameters across multiple operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Summary

Displays summary information about the performance log files including available counters and time ranges without performing the conversion.  
Use this to examine perfmon logs before processing them, helping you determine what counters are available and the time span covered.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts data collector objects from Get-DbaPfDataCollector and Get-DbaPfDataCollectorSet via pipeline input for automatic log file discovery.  
Use this to convert performance logs directly from active or configured data collectors without manually specifying file paths.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Multithread

Processes multiple performance log files in parallel to improve performance when converting large batches of files.  
Use this when converting many perfmon logs simultaneously, especially beneficial on multi-core systems with large performance monitoring datasets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AllTime

Processes all available log files from data collectors instead of just the most recent ones when used with pipeline input from Get-DbaPfDataCollector.  
Use this when you need to convert historical performance data from all collection periods, not just the latest monitoring session.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Raw

Displays the raw output from the relog command instead of returning file objects. Useful for debugging conversion issues or seeing detailed progress.  
Use this when troubleshooting relog operations or when you need to see the exact command-line output and statistics from the conversion process.

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
