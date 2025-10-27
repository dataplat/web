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

# ConvertTo-DbaXESession

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [ConvertTo-DbaXESession](https://github.com/dataplat/dbatools/blob/master/public/ConvertTo-DbaXESession.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [ConvertTo-DbaXESession](https://dataplat.github.io/boh#ConvertTo-DbaXESession).

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

Converts Trace with ID 2 to a Session named Test on SQL Server instances named sql2017 and sql2012 and creates the Session on each respective server.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2014 | Out-GridView -PassThru | ConvertTo-DbaXESession -Name 'Test' | Start-DbaXESession
```

Converts selected traces on sql2014 to sessions, creates the session, and starts it.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2014 | Where-Object Id -eq 1 | ConvertTo-DbaXESession -Name 'Test' -OutputScriptOnly
```

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
