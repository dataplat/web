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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Clear-DbaPlanCache</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Clear-DbaPlanCache.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Tracy Boggiano, databasesuperhero.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Clear-DbaPlanCache -SqlInstance sql2017 -Threshold 200" }

Logs into the SQL Server instance "sql2017" and removes plan caches if over 200 MB.<br>

#####  Example:  2 

```powershell
PS C:\> Clear-DbaPlanCache -SqlInstance sql2017 -SqlCredential sqladmin
```
{: data-copyable="true" data-clean-code="Clear-DbaPlanCache -SqlInstance sql2017 -SqlCredential sqladmin" }

Logs into the SQL instance using the SQL Login 'sqladmin' and then Windows instance as 'ad\sqldba'<br>
and removes if Threshold over 100 MB.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaInstance -ComputerName localhost | Get-DbaPlanCache | Clear-DbaPlanCache -Threshold 200
```
{: data-copyable="true" data-clean-code="Find-DbaInstance -ComputerName localhost | Get-DbaPlanCache | Clear-DbaPlanCache -Threshold 200" }

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
