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

# Get-DbaWaitStatistic

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWaitStatistic](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWaitStatistic.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWaitStatistic](https://dataplat.github.io/boh#Get-DbaWaitStatistic).

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

Check wait statistics for servers sql2008 and sqlserver2012<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWaitStatistic -SqlInstance sql2008 -Threshold 98 -IncludeIgnorable
```

Check wait statistics on server sql2008 for thresholds above 98% and include wait stats that are most often, but not always, ignorable<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaWaitStatistic -SqlInstance sql2008 | Select-Object *
```

Shows detailed notes, if available, from Paul's post<br>

#####  Example:  4 

```powershell
PS C:\> $output = Get-DbaWaitStatistic -SqlInstance sql2008 -Threshold 100 -IncludeIgnorable | Select-Object * | ConvertTo-DbaDataTable
```

Collects all Wait Statistics (including ignorable waits) on server sql2008 into a Data Table.<br>

#####  Example:  5 

```powershell
PS C:\> $output = Get-DbaWaitStatistic -SqlInstance sql2008
PS C:\> foreach ($row in ($output | Sort-Object -Unique Url)) { Start-Process ($row).Url }
```

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
