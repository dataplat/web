---
title: "ConvertTo-DbaXESession"
slug: "ConvertTo-DbaXESession"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Converts SQL Server Traces to Extended Events sessions using intelligent column and event mapping."
tags:
  - "Trace"
  - "ExtendedEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/ConvertTo-DbaXESession.ps1"
bohUrl: "https://dataplat.github.io/boh#ConvertTo-DbaXESession"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>ConvertTo-DbaXESession</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/ConvertTo-DbaXESession.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Converts SQL Server Traces to Extended Events sessions using intelligent column and event mapping.

## Description

Converts existing SQL Server Traces to Extended Events sessions by analyzing trace definitions and mapping events, columns, actions, and filters to their Extended Events equivalents. This eliminates the need to manually recreate monitoring configurations when migrating from the deprecated SQL Trace to Extended Events.  
  
The function uses a comprehensive mapping table that translates trace events like RPC:Completed, SQL:BatchCompleted, and Lock events to their corresponding Extended Events such as rpc_completed, sql_batch_completed, and lock_acquired. It preserves filters and column selections from the original trace, ensuring equivalent monitoring capabilities in the new Extended Events session.  
  
By default, the function creates and starts the Extended Events session on the target server. Alternatively, you can generate just the T-SQL script for review or manual execution. This is particularly useful for compliance environments where script review is required before deployment.  
  
T-SQL code by: Jonathan M. Kehayias, SQLskills.com. T-SQL can be found in this module directory and at  
https://www.sqlskills.com/blogs/jonathan/converting-sql-trace-to-extended-events-in-sql-server-2012/

## Syntax

```powershell
ConvertTo-DbaXESession
    [-InputObject] <Object[]>
    [-Name] <String>
    [-OutputScriptOnly]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2017, sql2012 | Where-Object Id -eq 2 | ConvertTo-DbaXESession -Name 'Test'
```
{: data-copyable="true" data-clean-code="Get-DbaTrace -SqlInstance sql2017, sql2012 | Where-Object Id -eq 2 | ConvertTo-DbaXESession -Name 'Test'" }

Converts Trace with ID 2 to a Session named Test on SQL Server instances named sql2017 and sql2012 and creates the Session on each respective server.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2014 | Out-GridView -PassThru | ConvertTo-DbaXESession -Name 'Test' | Start-DbaXESession
```
{: data-copyable="true" data-clean-code="Get-DbaTrace -SqlInstance sql2014 | Out-GridView -PassThru | ConvertTo-DbaXESession -Name 'Test' | Start-DbaXESession" }

Converts selected traces on sql2014 to sessions, creates the session, and starts it.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2014 | Where-Object Id -eq 1 | ConvertTo-DbaXESession -Name 'Test' -OutputScriptOnly
```
{: data-copyable="true" data-clean-code="Get-DbaTrace -SqlInstance sql2014 | Where-Object Id -eq 1 | ConvertTo-DbaXESession -Name 'Test' -OutputScriptOnly" }

Converts trace ID 1 on sql2014 to an Extended Event and outputs the resulting T-SQL.<br>

### Required Parameters

##### -InputObject

Specifies the SQL Server Trace objects to convert to Extended Events sessions. Must be trace objects returned by Get-DbaTrace.  
Use this to convert existing traces from SQL Trace to Extended Events, preserving event mappings and filter configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Name

Specifies the name for the new Extended Events session. If a session with this name already exists, the function automatically appends the trace ID or a random number to avoid conflicts.  
Choose a descriptive name that identifies the monitoring purpose, as this becomes the session name visible in SQL Server Management Studio and sys.server_event_sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -OutputScriptOnly

Returns the T-SQL CREATE EVENT SESSION script without executing it on the server. Use this when you need to review the generated script before deployment or save it for later execution.  
Particularly useful in compliance environments where all scripts require approval before running against production databases.

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
