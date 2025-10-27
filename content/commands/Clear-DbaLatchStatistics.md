---
title: "Clear-DbaLatchStatistics"
slug: "Clear-DbaLatchStatistics"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Resets SQL Server latch statistics counters to establish a fresh performance baseline"
tags:
  - "Diagnostic"
  - "LatchStatistic"
  - "Waits"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Clear-DbaLatchStatistics.ps1"
bohUrl: "https://dataplat.github.io/boh#Clear-DbaLatchStatistics"
draft: false
---

# Clear-DbaLatchStatistics

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Clear-DbaLatchStatistics](https://github.com/dataplat/dbatools/blob/master/public/Clear-DbaLatchStatistics.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Clear-DbaLatchStatistics](https://dataplat.github.io/boh#Clear-DbaLatchStatistics).

## Synopsis

Resets SQL Server latch statistics counters to establish a fresh performance baseline

## Description

Clears all accumulated latch statistics from the sys.dm_os_latch_stats dynamic management view by executing DBCC SQLPERF (N'sys.dm_os_latch_stats', CLEAR). This resets counters for latch types like BUFFER, ACCESS_METHODS_DATASET_PARENT, and others to zero values.  
  
Use this when troubleshooting latch contention to get a clean baseline before running your workload, or during performance testing to measure the impact of specific queries or operations. After clearing statistics, you can monitor sys.dm_os_latch_stats to see which latch types are experiencing the most waits and timeouts in your current workload.

## Syntax

```powershell
Clear-DbaLatchStatistics
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Clear-DbaLatchStatistics -SqlInstance sql2008, sqlserver2012
```

After confirmation, clears latch statistics on servers sql2008 and sqlserver2012<br>

#####  Example:  2 

```powershell
PS C:\> Clear-DbaLatchStatistics -SqlInstance sql2008, sqlserver2012 -Confirm:$false
```

Clears latch statistics on servers sql2008 and sqlserver2012, without prompting<br>

#####  Example:  3 

```powershell
PS C:\> 'sql2008','sqlserver2012' | Clear-DbaLatchStatistics
```

After confirmation, clears latch statistics on servers sql2008 and sqlserver2012<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Clear-DbaLatchStatistics -SqlInstance sql2008 -SqlCredential $cred
```

Connects using sqladmin credential and clears latch statistics on servers sql2008 and sqlserver2012<br>

### Required Parameters

##### -SqlInstance

Allows you to specify a comma separated list of servers to query.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
