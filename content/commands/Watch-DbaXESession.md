---
title: "Watch-DbaXESession"
slug: "Watch-DbaXESession"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Monitors Extended Events sessions in real-time, streaming live event data as it occurs"
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Watch-DbaXESession.ps1"
bohUrl: "https://dataplat.github.io/boh#Watch-DbaXESession"
draft: false
---

# Watch-DbaXESession

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Watch-DbaXESession](https://github.com/dataplat/dbatools/blob/master/public/Watch-DbaXESession.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Watch-DbaXESession](https://dataplat.github.io/boh#Watch-DbaXESession).

## Synopsis

Monitors Extended Events sessions in real-time, streaming live event data as it occurs

## Description

Streams live event data from running Extended Events sessions, allowing real-time monitoring of database activity, performance issues, or security events. Each captured event is processed into a PowerShell object with organized columns for event name, timestamp, fields, and actions. This command runs continuously until you stop the XE session, terminate the PowerShell session, or press Ctrl-C, making it ideal for interactive troubleshooting and live analysis workflows.  
  
Thanks to Dave Mason (@BeginTry) for some straightforward code samples https://itsalljustelectrons.blogspot.be/2017/01/SQL-Server-Extended-Event-Handling-Via-Powershell.html

## Syntax

```powershell
Watch-DbaXESession
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [[-Session] <String>]
    [[-InputObject] <Session[]>]
    [-Raw]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Watch-DbaXESession -SqlInstance sql2017 -Session system_health
```

Shows events for the system_health session as it happens.<br>

#####  Example:  2 

```powershell
PS C:\> Watch-DbaXESession -SqlInstance sql2017 -Session system_health | Export-Csv -NoTypeInformation -Path C:\temp\system_health.csv
```

Exports live events to CSV. Ctrl-C may not not cancel out of it - fastest way is to stop the session.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2017 -Session system_health | Start-DbaXESession | Watch-DbaXESession | Export-Csv -NoTypeInformation -Path C:\temp\system_health.csv
```

Exports live events to CSV. Ctrl-C may not not cancel out of this. The fastest way to do so is to stop the session.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -Session

Specifies the name of the Extended Events session to monitor for live event data. Use this when you want to watch a specific XE session instead of requiring pipeline input.  
Common sessions include system_health for general diagnostics or custom sessions you've created for specific monitoring needs.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts one or more XESession objects from Get-DbaXESession via the pipeline. Use this approach when you want to filter, start, or configure XE sessions before monitoring them.  
This enables workflows like 'Get-DbaXESession | Where Name -like "*perf*" | Start-DbaXESession | Watch-DbaXESession' for batch operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Raw

Returns the raw XEvent enumeration object instead of processed PowerShell objects with organized columns. Use this when you need to work with the native Extended Events data structure for custom   
processing or integration with other tools.  
Most DBAs should use the default processed output which provides cleaner, more readable event data.

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
