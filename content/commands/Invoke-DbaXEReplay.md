---
title: "Invoke-DbaXEReplay"
slug: "Invoke-DbaXEReplay"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Replays SQL queries captured in Extended Event files against target SQL Server instances"
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaXEReplay.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaXEReplay"
draft: false
---

# Invoke-DbaXEReplay

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaXEReplay](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaXEReplay.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaXEReplay](https://dataplat.github.io/boh#Invoke-DbaXEReplay).

## Synopsis

Replays SQL queries captured in Extended Event files against target SQL Server instances

## Description

This command replays SQL workloads captured in Extended Event files against one or more target SQL Server instances for performance testing and load simulation. It extracts SQL statements from Extended Event data piped from Read-DbaXEFile and executes them sequentially against your specified targets.  
  
The function works by collecting SQL queries from the Extended Event stream, writing them to a temporary SQL file with proper batch separators, then executing the file using sqlcmd to ensure batches run correctly. This approach allows you to replay production workloads in test environments to validate performance changes, test capacity, or troubleshoot query behavior under realistic conditions.  
  
By default, it processes sql_batch_completed and rcp_completed events, but you can filter to specific event types. The replay maintains the original SQL structure while allowing you to redirect the workload to different databases or instances as needed.

## Syntax

```powershell
Invoke-DbaXEReplay
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Event] <String[]>]
    [-InputObject] <Object>
    [-Raw]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Read-DbaXEFile -Path C:\temp\sample.xel | Invoke-DbaXEReplay -SqlInstance sql2017
```

Runs all batch_text for sql_batch_completed against tempdb on sql2017.<br>

#####  Example:  2 

```powershell
PS C:\> Read-DbaXEFile -Path C:\temp\sample.xel | Invoke-DbaXEReplay -SqlInstance sql2017 -Database planning -Event sql_batch_completed
```

Sets the *initial* database to planning then runs only sql_batch_completed against sql2017.<br>

#####  Example:  3 

```powershell
PS C:\> Read-DbaXEFile -Path C:\temp\sample.xel | Invoke-DbaXEReplay -SqlInstance sql2017, sql2016
```

Runs all batch_text for sql_batch_completed against tempdb on sql2017 and sql2016.<br>

### Required Parameters

##### -SqlInstance

Target SQL Server(s)

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Extended Event objects from Read-DbaXEFile or Read-DbaXESession containing captured SQL statements for replay.  
This is typically piped from Read-DbaXEFile when processing Extended Event files or from Read-DbaXESession for live session data.

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

##### -Database

Sets the initial database context for the replayed SQL statements. This determines which database sqlcmd connects to before executing the captured queries.  
Use this when you need to replay workloads in a specific database context, especially when the captured queries don't include explicit database references.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Event

Filters which Extended Event types to replay from the input stream. Defaults to sql_batch_completed and rcp_completed events.  
Use this to replay only specific event types when you want to test particular workload patterns or exclude certain query types from the replay.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @('sql_batch_completed', 'rcp_completed') |

##### -Raw

Shows all sqlcmd output immediately without cleanup or formatting. By default, results are collected, cleaned, and filtered for readability.  
Use this when you need to see complete sqlcmd output including headers and formatting, or when troubleshooting query execution issues during replay.

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
