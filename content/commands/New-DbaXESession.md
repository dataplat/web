---
title: "New-DbaXESession"
slug: "New-DbaXESession"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new Extended Events session object for programmatic configuration and deployment."
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaXESession.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaXESession"
draft: false
---

# New-DbaXESession

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaXESession](https://github.com/dataplat/dbatools/blob/master/public/New-DbaXESession.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaXESession](https://dataplat.github.io/boh#New-DbaXESession).

## Synopsis

Creates a new Extended Events session object for programmatic configuration and deployment.

## Description

Creates a new Extended Events session object that can be programmatically configured with events, actions, and targets before deployment to SQL Server. This function provides the foundation for building XE sessions through code rather than using predefined templates. The returned session object requires additional configuration using AddEvent(), AddAction(), and AddTarget() methods before calling Create() to deploy it to the server. For most scenarios, Import-DbaXESessionTemplate provides a simpler approach using predefined session configurations, but this function offers complete control when building custom monitoring solutions from scratch.

## Syntax

```powershell
New-DbaXESession
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Name] <String>
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
PS C:\> $session = New-DbaXESession -SqlInstance sql2017 -Name XeSession_Test
PS C:\> $event = $session.AddEvent("sqlserver.file_written")
PS C:\> $event.AddAction("package0.callstack")
PS C:\> $session.Create()
```

Returns a new XE Session object from sql2017 then adds an event, an action then creates it.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Name

Specifies the name for the new Extended Events session. Session names must be unique within the SQL Server instance and follow SQL Server identifier naming rules.  
Choose descriptive names that indicate the monitoring purpose, such as "Query_Performance_Monitor" or "Security_Audit_Session".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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
