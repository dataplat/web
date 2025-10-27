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

# ConvertTo-DbaDataTable

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [ConvertTo-DbaDataTable](https://github.com/dataplat/dbatools/blob/master/public/ConvertTo-DbaDataTable.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [ConvertTo-DbaDataTable](https://dataplat.github.io/boh#ConvertTo-DbaDataTable).

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

Creates a DataTable from the output of Get-Service.<br>

#####  Example:  2 

```powershell
PS C:\> ConvertTo-DbaDataTable -InputObject $csv.cheesetypes
```

Creates a DataTable from the CSV object $csv.cheesetypes.<br>

#####  Example:  3 

```powershell
PS C:\> $dblist | ConvertTo-DbaDataTable
```

Creates a DataTable from the $dblist object passed in via pipeline.<br>

#####  Example:  4 

```powershell
PS C:\> Get-Process | ConvertTo-DbaDataTable -TimeSpanType TotalSeconds
```

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
