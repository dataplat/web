---
title: "Clear-DbaPlanCache"
slug: "Clear-DbaPlanCache"
date: 2024-01-01
layout: "single"
author: "Tracy Boggiano, databasesuperhero.com"
availability: "Windows, Linux, macOS"
synopsis: "Clears SQL Server plan cache when single-use adhoc and prepared plans exceed memory threshold"
tags:
  - "Diagnostic"
  - "Memory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Clear-DbaPlanCache.ps1"
bohUrl: "https://dataplat.github.io/boh#Clear-DbaPlanCache"
draft: false
---

# Clear-DbaPlanCache

| Property | Value |
| --- | --- |
| **Author** | Tracy Boggiano, databasesuperhero.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Clear-DbaPlanCache](https://github.com/dataplat/dbatools/blob/master/public/Clear-DbaPlanCache.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Clear-DbaPlanCache](https://dataplat.github.io/boh#Clear-DbaPlanCache).

## Synopsis

Clears SQL Server plan cache when single-use adhoc and prepared plans exceed memory threshold

## Description

Monitors your SQL Server's plan cache for single-use adhoc and prepared plans that consume excessive memory. When these plans exceed the specified threshold (default 100MB), the function clears the entire plan cache using DBCC FREESYSTEMCACHE('SQL Plans').  
  
Single-use plans are a common cause of memory pressure in SQL Server environments with dynamic SQL or applications that don't use parameterized queries. Instead of manually checking sys.dm_exec_cached_plans and running DBCC commands, this function automates the detection and cleanup process.  
  
Use this when you're experiencing memory pressure from plan cache bloat or as part of regular maintenance to prevent cache-related performance issues. The function only clears the cache when necessary, avoiding unnecessary disruption to your server's performance.  
  
References: https://www.sqlskills.com/blogs/kimberly/plan-cache-adhoc-workloads-and-clearing-the-single-use-plan-cache-bloat/

## Syntax

```powershell
Clear-DbaPlanCache
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Threshold] <Int32>]
    [[-InputObject] <Object[]>]
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
PS C:\> Clear-DbaPlanCache -SqlInstance sql2017 -Threshold 200
```

Logs into the SQL Server instance "sql2017" and removes plan caches if over 200 MB.<br>

#####  Example:  2 

```powershell
PS C:\> Clear-DbaPlanCache -SqlInstance sql2017 -SqlCredential sqladmin
```

Logs into the SQL instance using the SQL Login 'sqladmin' and then Windows instance as 'ad\sqldba'<br>
and removes if Threshold over 100 MB.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaInstance -ComputerName localhost | Get-DbaPlanCache | Clear-DbaPlanCache -Threshold 200
```

Scans localhost for instances using the browser service, traverses all instances and gets the plan cache for each, clears them out if they are above 200 MB.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

Specifies the memory threshold in megabytes for single-use adhoc and prepared plans before the plan cache is cleared. Default is 100 MB.  
Use this to control when plan cache cleanup occurs based on your server's memory capacity and workload patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100 |

##### -InputObject

Accepts plan cache objects from Get-DbaPlanCache via pipeline input. Each object contains plan cache statistics including memory usage and instance details.  
Use this to process multiple instances or when you need to filter plan cache results before clearing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
