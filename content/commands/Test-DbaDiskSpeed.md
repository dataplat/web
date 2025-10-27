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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaDiskSpeed</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDiskSpeed.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Test-DbaDiskSpeed -SqlInstance sql2008, sqlserver2012" }

Tests how disks are performing on sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDiskSpeed -SqlInstance sql2008 -Database tempdb
```
{: data-copyable="true" data-clean-code="Test-DbaDiskSpeed -SqlInstance sql2008 -Database tempdb" }

Tests how disks storing tempdb files on sql2008 are performing.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDiskSpeed -SqlInstance sql2008 -AggregateBy "File" -Database tempdb
```
{: data-copyable="true" data-clean-code="Test-DbaDiskSpeed -SqlInstance sql2008 -AggregateBy &quot;File&quot; -Database tempdb" }

Returns the statistics aggregated to the file level. This is the default aggregation level if the -AggregateBy param is omitted. The -Database or -ExcludeDatabase params can be used to filter for <br>
specific databases.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaDiskSpeed -SqlInstance sql2008 -AggregateBy "Database"
```
{: data-copyable="true" data-clean-code="Test-DbaDiskSpeed -SqlInstance sql2008 -AggregateBy &quot;Database&quot;" }

Returns the statistics aggregated to the database/disk level. The -Database or -ExcludeDatabase params can be used to filter for specific databases.<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaDiskSpeed -SqlInstance sql2008 -AggregateBy "Disk"
```
{: data-copyable="true" data-clean-code="Test-DbaDiskSpeed -SqlInstance sql2008 -AggregateBy &quot;Disk&quot;" }

Returns the statistics aggregated to the disk level. The -Database or -ExcludeDatabase params can be used to filter for specific databases.<br>

#####  Example:  6 

```powershell
PS C:\> $results = @(instance1, instance2) | Test-DbaDiskSpeed
```
{: data-copyable="true" data-clean-code="$results = @(instance1, instance2) | Test-DbaDiskSpeed" }

Returns the statistics for instance1 and instance2 as part of a pipeline command<br>

#####  Example:  7 

```powershell
PS C:\> $databases = @('master', 'model')
```
{: data-copyable="true" data-clean-code="$databases = @('master', 'model')" }

$results = Test-DbaDiskSpeed -SqlInstance sql2019 -Database $databases<br>
Returns the statistics for more than one database specified.<br>

#####  Example:  8 

```powershell
PS C:\> $excludedDatabases = @('master', 'model')
```
{: data-copyable="true" data-clean-code="$excludedDatabases = @('master', 'model')" }

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
