---
title: "Stop-DbaXESession"
slug: "Stop-DbaXESession"
date: 2024-01-01
layout: "single"
author: "Doug Meyers"
availability: "Windows, Linux, macOS"
synopsis: "Stops running Extended Events sessions on SQL Server instances"
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaXESession.ps1"
bohUrl: "https://dataplat.github.io/boh#Stop-DbaXESession"
draft: false
---

# Stop-DbaXESession

| Property | Value |
| --- | --- |
| **Author** | Doug Meyers |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Stop-DbaXESession](https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaXESession.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Stop-DbaXESession](https://dataplat.github.io/boh#Stop-DbaXESession).

## Synopsis

Stops running Extended Events sessions on SQL Server instances

## Description

Stops active Extended Events sessions that are currently collecting diagnostic data or monitoring SQL Server activity. This function helps DBAs manage resource usage by ending sessions that may be consuming disk space, memory, or CPU cycles. You can stop specific sessions by name, stop all user-created sessions while preserving critical system sessions, or use pipeline input from Get-DbaXESession. The function safely checks if sessions are running before attempting to stop them and provides clear feedback about the operation results.

## Syntax

```powershell
Stop-DbaXESession
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -Session <Object[]>
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Stop-DbaXESession
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -AllSessions
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Stop-DbaXESession -InputObject <Session[]>
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
PS C:\> Stop-DbaXESession -SqlInstance sqlserver2012 -AllSessions
```

Stops all Extended Event Session on the sqlserver2014 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Stop-DbaXESession -SqlInstance sqlserver2012 -Session xesession1,xesession2
```

Stops the xesession1 and xesession2 Extended Event sessions.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sqlserver2012 -Session xesession1 | Stop-DbaXESession
```

Stops the sessions returned from the Get-DbaXESession function.<br>

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

Specifies the names of specific Extended Events sessions to stop by name. Accepts session names as strings or arrays for multiple sessions.  
Use this when you need to stop particular monitoring sessions while leaving others running, such as stopping a performance troubleshooting session while keeping system health sessions active.

| Property | Value |
| --- | --- |
| Alias | Sessions |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -AllSessions

Stops all user-created Extended Events sessions while preserving critical system sessions (AlwaysOn_health, system_health, telemetry_xevents).  
Use this when performing maintenance, reducing resource usage, or cleaning up after troubleshooting activities without disrupting essential SQL Server monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts Extended Events session objects from Get-DbaXESession through the pipeline for stopping sessions.  
Use this approach when you need to filter sessions based on properties like status, start time, or event counts before stopping them, enabling more sophisticated session management workflows.

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
