---
title: "Remove-DbaXESession"
slug: "Remove-DbaXESession"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes Extended Events sessions from SQL Server instances."
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaXESession.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaXESession"
draft: false
---

# Remove-DbaXESession

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaXESession](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaXESession.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaXESession](https://dataplat.github.io/boh#Remove-DbaXESession).

## Synopsis

Removes Extended Events sessions from SQL Server instances.

## Description

Removes Extended Events sessions from SQL Server instances, giving you the option to target specific sessions by name or remove all user-created sessions at once. This function preserves critical system sessions (system_health, telemetry_xevents, and AlwaysOn_health) when using the AllSessions parameter, so you can safely clean up monitoring sessions without breaking SQL Server's built-in diagnostics. Useful for removing outdated monitoring configurations or cleaning up test sessions that are no longer needed.

## Syntax

```powershell
Remove-DbaXESession
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -Session <Object[]>
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaXESession
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -AllSessions
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaXESession -InputObject <Session[]>
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
PS C:\> Remove-DbaXESession -SqlInstance sql2012 -AllSessions
```

Removes all Extended Event Session on the sqlserver2014 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaXESession -SqlInstance sql2012 -Session xesession1,xesession2
```

Removes the xesession1 and xesession2 Extended Event sessions.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2017 | Remove-DbaXESession -Confirm:$false
```

Removes all sessions from sql2017, bypassing prompts.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2012 -Session xesession1 | Remove-DbaXESession
```

Removes the sessions returned from the Get-DbaXESession function.<br>

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

Specifies one or more Extended Events session names to remove from the target instance.  
Use this when you want to selectively remove specific monitoring sessions rather than all user sessions.  
Accepts session names as strings, with support for arrays to remove multiple sessions in one command.

| Property | Value |
| --- | --- |
| Alias | Name,Sessions |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -AllSessions

Removes all user-created Extended Events sessions while preserving critical system sessions.  
Use this for cleanup operations when you want to clear all monitoring sessions without breaking SQL Server's built-in diagnostics.  
Automatically excludes system_health, telemetry_xevents, and AlwaysOn_health sessions to maintain server functionality.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts Extended Events session objects directly from Get-DbaXESession for pipeline operations.  
Use this when you need to filter sessions with Get-DbaXESession first, then remove the filtered results.  
Enables complex filtering scenarios and integration with other dbatools XE functions.

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
