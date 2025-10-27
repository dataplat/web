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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaLatchStatistic</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLatchStatistic.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaLatchStatistic -SqlInstance sql2008, sqlserver2012" }

Check latch statistics for servers sql2008 and sqlserver2012<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaLatchStatistic -SqlInstance sql2008 -Threshold 98
```
{: data-copyable="true" data-clean-code="Get-DbaLatchStatistic -SqlInstance sql2008 -Threshold 98" }

Check latch statistics on server sql2008 for thresholds above 98%<br>

#####  Example:  3 

```powershell
PS C:\> $output = Get-DbaLatchStatistic -SqlInstance sql2008 -Threshold 100 | Select-Object * | ConvertTo-DbaDataTable
```
{: data-copyable="true" data-clean-code="$output = Get-DbaLatchStatistic -SqlInstance sql2008 -Threshold 100 | Select-Object * | ConvertTo-DbaDataTable" }

Collects all latch statistics on server sql2008 into a Data Table.<br>

#####  Example:  4 

```powershell
PS C:\> 'sql2008','sqlserver2012' | Get-DbaLatchStatistic
```
{: data-copyable="true" data-clean-code="'sql2008','sqlserver2012' | Get-DbaLatchStatistic" }

Get latch statistics for servers sql2008 and sqlserver2012 via pipline<br>

#####  Example:  5 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaLatchStatistic -SqlInstance sql2008 -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Get-DbaLatchStatistic -SqlInstance sql2008 -SqlCredential $cred" }

Connects using sqladmin credential and returns latch statistics from sql2008<br>

#####  Example:  6 

```powershell
PS C:\> $output = Get-DbaLatchStatistic -SqlInstance sql2008
PS C:\> $output
PS C:\> foreach ($row in ($output | Sort-Object -Unique Url)) { Start-Process ($row).Url }
```
{: data-copyable="true" data-clean-code="$output = Get-DbaLatchStatistic -SqlInstance sql2008
$output
foreach ($row in ($output | Sort-Object -Unique Url)) { Start-Process ($row).Url }" }

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
