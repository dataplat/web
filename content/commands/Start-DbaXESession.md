---
title: "Start-DbaXESession"
slug: "Start-DbaXESession"
date: 2024-01-01
layout: "single"
author: "Doug Meyers"
availability: "Windows, Linux, macOS"
synopsis: "Starts Extended Events sessions on SQL Server instances for monitoring and troubleshooting."
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Start-DbaXESession.ps1"
bohUrl: "https://dataplat.github.io/boh#Start-DbaXESession"
draft: false
---

# Start-DbaXESession

| Property | Value |
| --- | --- |
| **Author** | Doug Meyers |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Start-DbaXESession](https://github.com/dataplat/dbatools/blob/master/public/Start-DbaXESession.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Start-DbaXESession](https://dataplat.github.io/boh#Start-DbaXESession).

## Synopsis

Starts Extended Events sessions on SQL Server instances for monitoring and troubleshooting.

## Description

Activates Extended Events sessions that have been created but are not currently running. Extended Events sessions are SQL Server's lightweight monitoring framework used for troubleshooting performance issues, security auditing, and capturing specific database activity patterns.  
  
The function can start individual sessions by name, all user-created sessions at once, or sessions scheduled to start and stop at specific times. When using -AllSessions, it automatically excludes built-in system sessions (AlwaysOn_health, system_health, telemetry_xevents) so you don't accidentally interfere with SQL Server's internal monitoring.  
  
For scheduled operations, the function creates temporary SQL Agent jobs that execute at the specified times and then delete themselves. This is particularly useful for capturing data during specific time windows or off-hours troubleshooting sessions.

## Syntax

```powershell
Start-DbaXESession
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -Session <Object[]>
    [-StartAt <DateTime>]
    [-StopAt <DateTime>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Start-DbaXESession
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-StartAt <DateTime>]
    [-StopAt <DateTime>]
    -AllSessions
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Start-DbaXESession
    [-StartAt <DateTime>]
    [-StopAt <DateTime>]
    -InputObject <Session[]>
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
PS C:\> Start-DbaXESession -SqlInstance sqlserver2012 -AllSessions
```

Starts all Extended Event Session on the sqlserver2014 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Start-DbaXESession -SqlInstance sqlserver2012 -Session xesession1,xesession2
```

Starts the xesession1 and xesession2 Extended Event sessions.<br>

#####  Example:  3 

```powershell
PS C:\> Start-DbaXESession -SqlInstance sqlserver2012 -Session xesession1,xesession2 -StopAt (Get-Date).AddMinutes(30)
```

Starts the xesession1 and xesession2 Extended Event sessions and stops them in 30 minutes.<br>

#####  Example:  4 

```powershell
PS C:\> Start-DbaXESession -SqlInstance sqlserver2012 -Session AlwaysOn_health -StartAt (Get-Date).AddMinutes(1)
```

Starts the AlwaysOn_health Extended Event sessions in 1 minute. The command will return immediately.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sqlserver2012 -Session xesession1 | Start-DbaXESession
```

Starts the sessions returned from the Get-DbaXESession function.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Session

Specifies the names of specific Extended Events sessions to start. Accepts multiple session names as an array.  
Use this when you need to start only certain sessions rather than all user-created sessions on the instance.

| Property | Value |
| --- | --- |
| Alias | Sessions |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -AllSessions

Starts all user-created Extended Events sessions on the instance while excluding system sessions (AlwaysOn_health, system_health, telemetry_xevents).  
Use this when you want to activate all custom monitoring sessions without interfering with SQL Server's built-in diagnostics.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts Extended Events session objects from Get-DbaXESession for pipeline operations.  
Use this when you need to filter sessions with Get-DbaXESession first, then start only the matching sessions.

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

##### -StartAt

Schedules the Extended Events sessions to start at a specific date and time using a temporary SQL Agent job.  
The command returns immediately while the job handles starting sessions at the scheduled time, useful for capturing activity during specific time windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StopAt

Schedules the Extended Events sessions to stop at a specific date and time using a temporary SQL Agent job.  
Use this with StartAt or on already running sessions to create time-bounded monitoring windows for troubleshooting specific issues.

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
