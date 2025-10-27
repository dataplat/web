---
title: "Get-DbaIoLatency"
slug: "Get-DbaIoLatency"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves I/O latency metrics for all database files to identify storage performance bottlenecks"
tags:
  - "Diagnostic"
  - "IOLatency"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaIoLatency.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaIoLatency"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaIoLatency</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaIoLatency.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Patrick Flynn (@sqllensman)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves I/O latency metrics for all database files to identify storage performance bottlenecks

## Description

Queries sys.dm_io_virtual_file_stats to collect detailed I/O performance statistics for every database file on the SQL Server instance. Returns calculated latency metrics including read latency, write latency, and overall latency in milliseconds, plus throughput statistics like average bytes per read and write operation. Essential for diagnosing slow database performance caused by storage bottlenecks, helping you identify which specific database files are experiencing high I/O wait times. Based on Paul Randal's SQL Server performance tuning methodology.  
  
Reference:  https://www.sqlskills.com/blogs/paul/how-to-examine-io-subsystem-latencies-from-within-sql-server/  
            https://www.sqlskills.com/blogs/paul/capturing-io-latencies-period-time/

## Syntax

```powershell
Get-DbaIoLatency
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaIoLatency -SqlInstance sql2008, sqlserver2012
```
{: data-copyable="true" data-clean-code="Get-DbaIoLatency -SqlInstance sql2008, sqlserver2012" }

Get IO subsystem latency statistics for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> $output = Get-DbaIoLatency -SqlInstance sql2008 | Select-Object * | ConvertTo-DbaDataTable
```
{: data-copyable="true" data-clean-code="$output = Get-DbaIoLatency -SqlInstance sql2008 | Select-Object * | ConvertTo-DbaDataTable" }

Collects all IO subsystem latency statistics on server sql2008 into a Data Table.<br>

#####  Example:  3 

```powershell
PS C:\> 'sql2008','sqlserver2012' | Get-DbaIoLatency
```
{: data-copyable="true" data-clean-code="'sql2008','sqlserver2012' | Get-DbaIoLatency" }

Get IO subsystem latency statistics for servers sql2008 and sqlserver2012 via pipline<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaIoLatency -SqlInstance sql2008 -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Get-DbaIoLatency -SqlInstance sql2008 -SqlCredential $cred" }

Connects using sqladmin credential and returns IO subsystem latency statistics from sql2008<br>

### Required Parameters

##### -SqlInstance

The SQL Server instance. Server version must be SQL Server version 2008 or higher.

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
