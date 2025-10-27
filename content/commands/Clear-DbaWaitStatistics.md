---
title: "Clear-DbaWaitStatistics"
slug: "Clear-DbaWaitStatistics"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Resets SQL Server wait statistics to establish a clean monitoring baseline"
tags:
  - "Diagnostic"
  - "WaitStats"
  - "Waits"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Clear-DbaWaitStatistics.ps1"
bohUrl: "https://dataplat.github.io/boh#Clear-DbaWaitStatistics"
draft: false
---

# Clear-DbaWaitStatistics

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Clear-DbaWaitStatistics](https://github.com/dataplat/dbatools/blob/master/public/Clear-DbaWaitStatistics.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Clear-DbaWaitStatistics](https://dataplat.github.io/boh#Clear-DbaWaitStatistics).

## Synopsis

Resets SQL Server wait statistics to establish a clean monitoring baseline

## Description

Clears all accumulated wait statistics from sys.dm_os_wait_stats by executing DBCC SQLPERF (N'sys.dm_os_wait_stats', CLEAR). This is essential for performance troubleshooting when you need to establish a new baseline for wait analysis. DBAs commonly clear wait stats after resolving performance issues, during maintenance windows, or when beginning focused monitoring periods to isolate specific workload patterns without historical noise.

## Syntax

```powershell
Clear-DbaWaitStatistics
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
PS C:\> Clear-DbaWaitStatistics -SqlInstance sql2008, sqlserver2012
```

After confirmation, clears wait stats on servers sql2008 and sqlserver2012<br>

#####  Example:  2 

```powershell
PS C:\> Clear-DbaWaitStatistics -SqlInstance sql2008, sqlserver2012 -Confirm:$false
```

Clears wait stats on servers sql2008 and sqlserver2012, without prompting<br>

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
