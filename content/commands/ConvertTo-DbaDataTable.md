---
title: "ConvertTo-DbaDataTable"
slug: "ConvertTo-DbaDataTable"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Converts PowerShell objects into .NET DataTable objects for bulk SQL Server operations"
tags:
  - "Table"
  - "Data"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/ConvertTo-DbaDataTable.ps1"
bohUrl: "https://dataplat.github.io/boh#ConvertTo-DbaDataTable"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>ConvertTo-DbaDataTable</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/ConvertTo-DbaDataTable.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Converts PowerShell objects into .NET DataTable objects for bulk SQL Server operations

## Description

Converts PowerShell objects into .NET DataTable objects with proper column types and database-compatible data formatting. This is essential for bulk operations like importing data into SQL Server tables using Write-DbaDataTable or other bulk insert methods.  
  
The function automatically detects and converts data types to SQL Server-compatible formats, handling special dbatools types like DbaSize (file sizes) and DbaTimeSpan objects. You can control how these special types are converted - for example, converting TimeSpan objects to total milliseconds, seconds, or string representations.  
  
Common scenarios include taking results from Get-DbaDatabase, Get-DbaBackupHistory, or other dbatools commands and preparing them for storage in custom reporting tables. The function handles complex object arrays, null values, and provides both strongly-typed and raw string conversion modes.  
  
Thanks to Chad Miller, this is based on his script. https://gallery.technet.microsoft.com/scriptcenter/4208a159-a52e-4b99-83d4-8048468d29dd  
  
If the attempt to convert to data table fails, try the -Raw parameter for less accurate datatype detection.

## Syntax

```powershell
ConvertTo-DbaDataTable
    [-InputObject] <PSObject[]>
    [-TimeSpanType <String>]
    [-SizeType <String>]
    [-IgnoreNull]
    [-Raw]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-Service | ConvertTo-DbaDataTable
```
{: data-copyable="true" data-clean-code="Get-Service | ConvertTo-DbaDataTable" }

Creates a DataTable from the output of Get-Service.<br>

#####  Example:  2 

```powershell
PS C:\> ConvertTo-DbaDataTable -InputObject $csv.cheesetypes
```
{: data-copyable="true" data-clean-code="ConvertTo-DbaDataTable -InputObject $csv.cheesetypes" }

Creates a DataTable from the CSV object $csv.cheesetypes.<br>

#####  Example:  3 

```powershell
PS C:\> $dblist | ConvertTo-DbaDataTable
```
{: data-copyable="true" data-clean-code="$dblist | ConvertTo-DbaDataTable" }

Creates a DataTable from the $dblist object passed in via pipeline.<br>

#####  Example:  4 

```powershell
PS C:\> Get-Process | ConvertTo-DbaDataTable -TimeSpanType TotalSeconds
```
{: data-copyable="true" data-clean-code="Get-Process | ConvertTo-DbaDataTable -TimeSpanType TotalSeconds" }

Creates a DataTable with the running processes and converts any TimeSpan property to TotalSeconds.<br>

### Required Parameters

##### -InputObject

PowerShell objects to convert into a DataTable with proper SQL Server-compatible column types.  
Accepts results from dbatools commands like Get-DbaDatabase, Get-DbaBackupHistory, or any PowerShell object array.  
Handles complex properties, arrays, and dbatools-specific types like DbaSize and DbaTimeSpan automatically.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -TimeSpanType

Controls how TimeSpan and DbaTimeSpan objects are converted for database storage.  
Use 'TotalMilliseconds' (default) for precise timing data, 'TotalSeconds' for general duration tracking, or 'String' to preserve readable format.  
Common when converting backup duration, job runtime, or database uptime data for reporting tables.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | TotalMilliseconds |
| Accepted Values | Ticks,TotalDays,TotalHours,TotalMinutes,TotalSeconds,TotalMilliseconds,String |

##### -SizeType

Controls how DbaSize objects (file sizes, database sizes) are converted for database storage.  
Use 'Int64' (default) for precise byte values suitable for calculations, 'Int32' for smaller datasets, or 'String' to preserve human-readable format like '1.5 GB'.  
Essential when storing database size reports, backup file information, or disk space data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Int64 |
| Accepted Values | Int64,Int32,String |

##### -IgnoreNull

Excludes null objects from the DataTable instead of creating empty rows.  
Use this when preparing clean datasets for bulk insert operations where empty rows would cause issues.  
Helpful when processing filtered results that may contain null entries from failed connections or missing databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Raw

Forces all DataTable columns to be strings instead of detecting proper data types.  
Use this as a fallback when automatic type detection fails or when you need maximum compatibility with target tables that expect string data.  
Trades type safety for reliability when dealing with complex or problematic object properties.

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
