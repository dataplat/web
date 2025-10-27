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

# Get-DbaIoLatency

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaIoLatency](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaIoLatency.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaIoLatency](https://dataplat.github.io/boh#Get-DbaIoLatency).

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

Get IO subsystem latency statistics for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> $output = Get-DbaIoLatency -SqlInstance sql2008 | Select-Object * | ConvertTo-DbaDataTable
```

Collects all IO subsystem latency statistics on server sql2008 into a Data Table.<br>

#####  Example:  3 

```powershell
PS C:\> 'sql2008','sqlserver2012' | Get-DbaIoLatency
```

Get IO subsystem latency statistics for servers sql2008 and sqlserver2012 via pipline<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaIoLatency -SqlInstance sql2008 -SqlCredential $cred
```

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
