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

# Get-DbaCpuUsage

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaCpuUsage](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCpuUsage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaCpuUsage](https://dataplat.github.io/boh#Get-DbaCpuUsage).

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

Logs into the SQL Server instance "sql2017" and also the Computer itself (via WMI) to gather information<br>

#####  Example:  2 

```powershell
PS C:\> $usage = Get-DbaCpuUsage -SqlInstance sql2017
PS C:\> $usage.Process
```

Explores the processes (from Get-DbaProcess) associated with the usage results<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaCpuUsage -SqlInstance sql2017 -SqlCredential sqladmin -Credential ad\sqldba
```

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
