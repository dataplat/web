---
title: "Test-DbaDiskSpeed"
slug: "Test-DbaDiskSpeed"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Analyzes database file I/O performance and identifies storage bottlenecks using SQL Server DMV statistics"
tags:
  - "Diagnostic"
  - "Performance"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDiskSpeed.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDiskSpeed"
draft: false
---

# Test-DbaDiskSpeed

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDiskSpeed](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDiskSpeed.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDiskSpeed](https://dataplat.github.io/boh#Test-DbaDiskSpeed).

## Synopsis

Analyzes database file I/O performance and identifies storage bottlenecks using SQL Server DMV statistics

## Description

Queries sys.dm_io_virtual_file_stats to measure read/write latency, throughput, and overall I/O performance for database files. Returns performance ratings from "Very Good" to "Serious I/O Bottleneck" based on average stall times, helping you quickly identify storage issues that impact SQL Server performance. Can aggregate results by individual file, database, or disk level to pinpoint exactly where I/O problems exist. Essential for troubleshooting slow queries, validating storage upgrades, and proactive performance monitoring.

## Syntax

```powershell
Test-DbaDiskSpeed
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-AggregateBy] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDiskSpeed -SqlInstance sql2008, sqlserver2012
```

Tests how disks are performing on sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDiskSpeed -SqlInstance sql2008 -Database tempdb
```

Tests how disks storing tempdb files on sql2008 are performing.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDiskSpeed -SqlInstance sql2008 -AggregateBy "File" -Database tempdb
```

Returns the statistics aggregated to the file level. This is the default aggregation level if the -AggregateBy param is omitted. The -Database or -ExcludeDatabase params can be used to filter for <br>
specific databases.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaDiskSpeed -SqlInstance sql2008 -AggregateBy "Database"
```

Returns the statistics aggregated to the database/disk level. The -Database or -ExcludeDatabase params can be used to filter for specific databases.<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaDiskSpeed -SqlInstance sql2008 -AggregateBy "Disk"
```

Returns the statistics aggregated to the disk level. The -Database or -ExcludeDatabase params can be used to filter for specific databases.<br>

#####  Example:  6 

```powershell
PS C:\> $results = @(instance1, instance2) | Test-DbaDiskSpeed
```

Returns the statistics for instance1 and instance2 as part of a pipeline command<br>

#####  Example:  7 

```powershell
PS C:\> $databases = @('master', 'model')
```

$results = Test-DbaDiskSpeed -SqlInstance sql2019 -Database $databases<br>
Returns the statistics for more than one database specified.<br>

#####  Example:  8 

```powershell
PS C:\> $excludedDatabases = @('master', 'model')
```

$results = Test-DbaDiskSpeed -SqlInstance sql2019 -ExcludeDatabase $excludedDatabases<br>
Returns the statistics for databases other than the exclusions specified.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to include in the I/O performance analysis. Accepts database names as strings or arrays.  
Use this when you need to focus on specific databases instead of analyzing all databases on the instance.  
Commonly used to isolate performance issues in production databases or exclude system databases from analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to exclude from the I/O performance analysis. Accepts database names as strings or arrays.  
Use this when you want to analyze most databases but skip specific ones like development databases or those with known issues.  
Helpful for excluding system databases (master, model, msdb) when focusing on user database performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AggregateBy

Controls how I/O statistics are grouped and summarized in the results. Options are 'File' (default), 'Database', or 'Disk'.  
Use 'File' for detailed analysis of individual data and log files, 'Database' to compare performance across databases, or 'Disk' to identify storage-level bottlenecks.  
File-level analysis helps pinpoint specific problematic files, while disk-level aggregation is useful for storage capacity planning and identifying hardware issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | File |
| Accepted Values | Database,Disk,File |

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
