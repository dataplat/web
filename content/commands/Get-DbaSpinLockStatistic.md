---
title: "Get-DbaSpinLockStatistic"
slug: "Get-DbaSpinLockStatistic"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves spinlock contention statistics from SQL Server's internal synchronization mechanisms"
tags:
  - "Diagnostic"
  - "SpinLockStatistics"
  - "Waits"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSpinLockStatistic.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaSpinLockStatistic"
draft: false
---

# Get-DbaSpinLockStatistic

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaSpinLockStatistic](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSpinLockStatistic.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaSpinLockStatistic](https://dataplat.github.io/boh#Get-DbaSpinLockStatistic).

## Synopsis

Retrieves spinlock contention statistics from SQL Server's internal synchronization mechanisms

## Description

Queries sys.dm_os_spinlock_stats to return detailed statistics about SQL Server's spinlock usage and contention. Spinlocks are lightweight synchronization primitives that SQL Server uses internally for very brief waits when protecting critical code sections and memory structures.  
  
This information helps diagnose severe performance issues caused by spinlock contention, which typically manifests as high CPU usage with poor throughput. Common spinlock contention scenarios include tempdb allocation bottlenecks, excessive concurrent activity on specific database objects, or issues with SQL Server's internal data structures.  
  
Based on Paul Randal's advanced performance troubleshooting methodology, this data is essential when wait statistics show SOS_SCHEDULER_YIELD or other CPU-related waits that might indicate spinlock pressure.  
  
Returns:  
        SpinLockName - The type of spinlock (e.g., LOCK_HASH, LOGCACHE_ACCESS)  
        Collisions - Number of times threads had to wait for the spinlock  
        Spins - Total number of spin cycles before acquiring the lock  
        SpinsPerCollision - Average spins per collision (efficiency indicator)  
        SleepTime - Total time spent sleeping when spins were exhausted  
        Backoffs - Number of times the thread backed off before retrying  
  
Reference: https://www.sqlskills.com/blogs/paul/advanced-performance-troubleshooting-waits-latches-spinlocks/

## Syntax

```powershell
Get-DbaSpinLockStatistic
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
PS C:\> Get-DbaSpinLockStatistic -SqlInstance sql2008, sqlserver2012
```

Get SpinLock Statistics for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> $output = Get-DbaSpinLockStatistic -SqlInstance sql2008 | Select-Object * | ConvertTo-DbaDataTable
```

Collects all SpinLock Statistics on server sql2008 into a Data Table.<br>

#####  Example:  3 

```powershell
PS C:\> 'sql2008','sqlserver2012' | Get-DbaSpinLockStatistic
```

Get SpinLock Statistics for servers sql2008 and sqlserver2012 via pipline<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaSpinLockStatistic -SqlInstance sql2008 -SqlCredential $cred
```

Connects using sqladmin credential and returns SpinLock Statistics from sql2008<br>

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
