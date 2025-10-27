---
title: "Get-DbaWaitStatistic"
slug: "Get-DbaWaitStatistic"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server wait statistics for performance analysis and troubleshooting"
tags:
  - "Diagnostic"
  - "Waits"
  - "WaitStats"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWaitStatistic.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWaitStatistic"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaWaitStatistic</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWaitStatistic.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Retrieves SQL Server wait statistics for performance analysis and troubleshooting

## Description

Analyzes SQL Server wait statistics from sys.dm_os_wait_stats to identify performance bottlenecks and resource contention issues. This function categorizes wait types, calculates timing metrics and percentages, and provides diagnostic explanations based on Paul Randal's methodology. Use this to pinpoint whether your SQL Server is waiting on disk I/O, memory pressure, locking issues, or other resource constraints that are slowing down query performance.  
  
Returns:  
WaitType  
Category  
WaitSeconds  
ResourceSeconds  
SignalSeconds  
WaitCount  
Percentage  
AverageWaitSeconds  
AverageResourceSeconds  
AverageSignalSeconds  
URL  
  
Reference: https://www.sqlskills.com/blogs/paul/wait-statistics-or-please-tell-me-where-it-hurts/

## Syntax

```powershell
Get-DbaWaitStatistic
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Threshold] <Int32>]
    [-IncludeIgnorable]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaWaitStatistic -SqlInstance sql2008, sqlserver2012
```
{: data-copyable="true" data-clean-code="Get-DbaWaitStatistic -SqlInstance sql2008, sqlserver2012" }

Check wait statistics for servers sql2008 and sqlserver2012<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWaitStatistic -SqlInstance sql2008 -Threshold 98 -IncludeIgnorable
```
{: data-copyable="true" data-clean-code="Get-DbaWaitStatistic -SqlInstance sql2008 -Threshold 98 -IncludeIgnorable" }

Check wait statistics on server sql2008 for thresholds above 98% and include wait stats that are most often, but not always, ignorable<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaWaitStatistic -SqlInstance sql2008 | Select-Object *
```
{: data-copyable="true" data-clean-code="Get-DbaWaitStatistic -SqlInstance sql2008 | Select-Object *" }

Shows detailed notes, if available, from Paul's post<br>

#####  Example:  4 

```powershell
PS C:\> $output = Get-DbaWaitStatistic -SqlInstance sql2008 -Threshold 100 -IncludeIgnorable | Select-Object * | ConvertTo-DbaDataTable
```
{: data-copyable="true" data-clean-code="$output = Get-DbaWaitStatistic -SqlInstance sql2008 -Threshold 100 -IncludeIgnorable | Select-Object * | ConvertTo-DbaDataTable" }

Collects all Wait Statistics (including ignorable waits) on server sql2008 into a Data Table.<br>

#####  Example:  5 

```powershell
PS C:\> $output = Get-DbaWaitStatistic -SqlInstance sql2008
PS C:\> foreach ($row in ($output | Sort-Object -Unique Url)) { Start-Process ($row).Url }
```
{: data-copyable="true" data-clean-code="$output = Get-DbaWaitStatistic -SqlInstance sql2008
foreach ($row in ($output | Sort-Object -Unique Url)) { Start-Process ($row).Url }" }

Displays the output then loads the associated sqlskills website for each result. Opens one tab per unique URL.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2005 or higher.

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

Sets the cumulative percentage threshold for filtering wait statistics results. Only wait types that fall within this percentage of total wait time are returned.  
Use this to focus on the most significant waits rather than seeing every minor wait type on your system. For example, 95% shows waits that make up 95% of all wait time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 95 |

##### -IncludeIgnorable

Includes wait types that are typically benign and can be safely ignored during troubleshooting, such as Service Broker idle waits and background task waits.  
Use this when you need to see all wait activity or when investigating unusual issues with specific features like mirroring or Availability Groups.

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
