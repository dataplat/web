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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaXEReplay</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaXEReplay.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Read-DbaXEFile -Path C:\temp\sample.xel | Invoke-DbaXEReplay -SqlInstance sql2017" }

Runs all batch_text for sql_batch_completed against tempdb on sql2017.<br>

#####  Example:  2 

```powershell
PS C:\> Read-DbaXEFile -Path C:\temp\sample.xel | Invoke-DbaXEReplay -SqlInstance sql2017 -Database planning -Event sql_batch_completed
```
{: data-copyable="true" data-clean-code="Read-DbaXEFile -Path C:\temp\sample.xel | Invoke-DbaXEReplay -SqlInstance sql2017 -Database planning -Event sql_batch_completed" }

Sets the *initial* database to planning then runs only sql_batch_completed against sql2017.<br>

#####  Example:  3 

```powershell
PS C:\> Read-DbaXEFile -Path C:\temp\sample.xel | Invoke-DbaXEReplay -SqlInstance sql2017, sql2016
```
{: data-copyable="true" data-clean-code="Read-DbaXEFile -Path C:\temp\sample.xel | Invoke-DbaXEReplay -SqlInstance sql2017, sql2016" }

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
