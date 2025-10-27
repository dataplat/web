---
title: "Get-DbaLatchStatistic"
slug: "Get-DbaLatchStatistic"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves latch contention statistics from SQL Server to identify performance bottlenecks"
tags:
  - "LatchStatistics"
  - "Waits"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLatchStatistic.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaLatchStatistic"
draft: false
---

# Get-DbaLatchStatistic

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaLatchStatistic](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLatchStatistic.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaLatchStatistic](https://dataplat.github.io/boh#Get-DbaLatchStatistic).

## Synopsis

Retrieves latch contention statistics from SQL Server to identify performance bottlenecks

## Description

Analyzes latch wait statistics from sys.dm_os_latch_stats to help identify latch contention issues that may be causing performance problems. This function implements Paul Randal's methodology for latch troubleshooting by returning the most significant latch classes based on cumulative wait time percentage. Each result includes direct links to SQLSkills documentation explaining what each latch class means and how to resolve related issues, making it easier to diagnose and fix latch-related performance bottlenecks without manually querying system DMVs.  
  
Returns:  
        LatchClass  
        WaitSeconds  
        WaitCount  
        Percentage  
        AverageWaitSeconds  
        URL  
  
Reference:  https://www.sqlskills.com/blogs/paul/advanced-performance-troubleshooting-waits-latches-spinlocks/  
            https://www.sqlskills.com/blogs/paul/most-common-latch-classes-and-what-they-mean/

## Syntax

```powershell
Get-DbaLatchStatistic
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Threshold] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaLatchStatistic -SqlInstance sql2008, sqlserver2012
```

Check latch statistics for servers sql2008 and sqlserver2012<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaLatchStatistic -SqlInstance sql2008 -Threshold 98
```

Check latch statistics on server sql2008 for thresholds above 98%<br>

#####  Example:  3 

```powershell
PS C:\> $output = Get-DbaLatchStatistic -SqlInstance sql2008 -Threshold 100 | Select-Object * | ConvertTo-DbaDataTable
```

Collects all latch statistics on server sql2008 into a Data Table.<br>

#####  Example:  4 

```powershell
PS C:\> 'sql2008','sqlserver2012' | Get-DbaLatchStatistic
```

Get latch statistics for servers sql2008 and sqlserver2012 via pipline<br>

#####  Example:  5 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaLatchStatistic -SqlInstance sql2008 -SqlCredential $cred
```

Connects using sqladmin credential and returns latch statistics from sql2008<br>

#####  Example:  6 

```powershell
PS C:\> $output = Get-DbaLatchStatistic -SqlInstance sql2008
PS C:\> $output
PS C:\> foreach ($row in ($output | Sort-Object -Unique Url)) { Start-Process ($row).Url }
```

Displays the output then loads the associated sqlskills website for each result. Opens one tab per unique URL.<br>

### Required Parameters

##### -SqlInstance

The SQL Server instance. Server version must be SQL Server version 2005 or higher.

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

##### -Threshold

Specifies the cumulative percentage threshold for filtering which latch classes to return. Only returns latch classes that contribute to the specified percentage of total wait time.  
Use this to focus on the most significant latch contention issues by excluding less impactful latch classes from the results. Default is 95% per Paul Randal's methodology.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 95 |

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
