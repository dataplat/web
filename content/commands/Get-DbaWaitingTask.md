---
title: "Get-DbaWaitingTask"
slug: "Get-DbaWaitingTask"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed information about currently waiting sessions and their wait types from SQL Server dynamic management views."
tags:
  - "Diagnostic"
  - "Waits"
  - "Task"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWaitingTask.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWaitingTask"
draft: false
---

# Get-DbaWaitingTask

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWaitingTask](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWaitingTask.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWaitingTask](https://dataplat.github.io/boh#Get-DbaWaitingTask).

## Synopsis

Retrieves detailed information about currently waiting sessions and their wait types from SQL Server dynamic management views.

## Description

Queries sys.dm_os_waiting_tasks and related DMVs to identify sessions that are currently waiting, along with comprehensive diagnostic information including wait types, durations, blocking sessions, SQL text, and query plans. This function helps DBAs quickly identify performance bottlenecks, troubleshoot blocking issues, and analyze what's causing slowdowns in real-time. The output includes helpful context like degree of parallelism for CXPACKET waits, resource descriptions, and direct links to SQLSkills wait type documentation for further analysis.  
  
This command is based on the waiting task T-SQL script published by Paul Randal.  
Reference: https://www.sqlskills.com/blogs/paul/updated-sys-dm_os_waiting_tasks-script-2/

## Syntax

```powershell
Get-DbaWaitingTask
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Spid] <Object[]>]
    [-IncludeSystemSpid]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaWaitingTask -SqlInstance sqlserver2014a
```

Returns the waiting task for all sessions on sqlserver2014a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWaitingTask -SqlInstance sqlserver2014a -IncludeSystemSpid
```

Returns the waiting task for all sessions (user and system) on sqlserver2014a<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version XXXX or higher.

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

##### -Spid

Filters results to show waiting tasks for specific session IDs only. Accepts one or more SPIDs as an array.  
Use this when troubleshooting known problematic sessions or when you want to focus on specific user connections instead of scanning all active sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -IncludeSystemSpid

Includes system sessions (SPIDs) in the results along with user sessions. By default, only user sessions are returned.  
Enable this when diagnosing system-level performance issues or when system processes might be causing blocking or resource contention.

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
