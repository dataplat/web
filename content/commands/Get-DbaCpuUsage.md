---
title: "Get-DbaCpuUsage"
slug: "Get-DbaCpuUsage"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Correlates SQL Server processes with Windows threads to identify which queries are consuming CPU resources"
tags:
  - "Diagnostic"
  - "Performance"
  - "CPU"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCpuUsage.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaCpuUsage"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaCpuUsage</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCpuUsage.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Correlates SQL Server processes with Windows threads to identify which queries are consuming CPU resources

## Description

When CPU usage is high on your SQL Server, it can be difficult to pinpoint which specific SQL queries or processes are responsible using standard SQL Server tools alone. This function bridges that gap by correlating SQL Server process IDs (SPIDs) with Windows kernel process IDs (KPIDs) through system DMVs and Windows performance counters.  
  
The function queries both SQL Server's process information and Windows thread performance data, then matches them together to show you exactly which SQL queries are consuming CPU at the operating system level. This is particularly valuable during performance troubleshooting when you need to identify the root cause of high CPU usage.  
  
Results include detailed thread information such as processor time percentages, thread states, wait reasons, and the actual SQL queries being executed. You can also set a CPU threshold to focus only on processes exceeding a specific percentage.  
  
References: https://www.mssqltips.com/sqlservertip/2454/how-to-find-out-how-much-cpu-a-sql-server-process-is-really-using/  
  
Note: This command returns results from all SQL instances on the destination server but the process  
column is specific to -SqlInstance passed.

## Syntax

```powershell
Get-DbaCpuUsage
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-Threshold] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaCpuUsage -SqlInstance sql2017
```
{: data-copyable="true" data-clean-code="Get-DbaCpuUsage -SqlInstance sql2017" }

Logs into the SQL Server instance "sql2017" and also the Computer itself (via WMI) to gather information<br>

#####  Example:  2 

```powershell
PS C:\> $usage = Get-DbaCpuUsage -SqlInstance sql2017
PS C:\> $usage.Process
```
{: data-copyable="true" data-clean-code="$usage = Get-DbaCpuUsage -SqlInstance sql2017
$usage.Process" }

Explores the processes (from Get-DbaProcess) associated with the usage results<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaCpuUsage -SqlInstance sql2017 -SqlCredential sqladmin -Credential ad\sqldba
```
{: data-copyable="true" data-clean-code="Get-DbaCpuUsage -SqlInstance sql2017 -SqlCredential sqladmin -Credential ad\sqldba" }

Logs into the SQL instance using the SQL Login 'sqladmin' and then Windows instance as 'ad\sqldba'<br>

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

##### -Credential

Allows you to login to the Windows Server using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Threshold

Filters results to only show SQL Server threads with CPU usage at or above this percentage.  
Use this to focus on high-CPU consuming processes and ignore idle or low-activity threads during performance troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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
