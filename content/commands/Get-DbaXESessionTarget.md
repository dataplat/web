---
title: "Get-DbaXESessionTarget"
slug: "Get-DbaXESessionTarget"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Extended Events session targets with their configurations and file locations."
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXESessionTarget.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaXESessionTarget"
draft: false
---

# Get-DbaXESessionTarget

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaXESessionTarget](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXESessionTarget.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaXESessionTarget](https://dataplat.github.io/boh#Get-DbaXESessionTarget).

## Synopsis

Retrieves Extended Events session targets with their configurations and file locations.

## Description

Returns detailed information about Extended Events session targets including their properties, file paths, and current status. This function helps DBAs examine where Extended Events data is being captured, whether sessions are running or stopped, and provides both local and UNC file paths for easy access to target files. Use this when you need to locate XE log files, verify target configurations, or troubleshoot Extended Events sessions that aren't capturing data as expected.

## Syntax

```powershell
Get-DbaXESessionTarget
    [-SqlCredential <PSCredential>]
    [-Session <String[]>]
    [-Target <String[]>]
    [-EnableException]
    [<CommonParameters>]

Get-DbaXESessionTarget -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Session <String[]>]
    [-Target <String[]>]
    [-EnableException]
    [<CommonParameters>]

Get-DbaXESessionTarget
    [-SqlCredential <PSCredential>]
    [-Session <String[]>]
    [-Target <String[]>]
    -InputObject <Session[]>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaXESessionTarget -SqlInstance ServerA\sql987 -Session system_health
```

Shows targets for the system_health session on ServerA\sql987.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2016 -Session system_health | Get-DbaXESessionTarget
```

Returns the targets for the system_health session on sql2016.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2016 -Session system_health | Get-DbaXESessionTarget -Target package0.event_file
```

Return only the package0.event_file target for the system_health session on sql2016.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -InputObject

Accepts Extended Events session objects from Get-DbaXESession through the pipeline. Allows chaining commands for more complex filtering.  
Use this when you've already retrieved specific XE sessions and want to examine their targets without re-querying the server.

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

##### -Session

Filters results to specific Extended Events sessions by name. Supports wildcards and multiple session names.  
Use this when you only need target information from particular XE sessions instead of all sessions on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Target

Filters results to specific target types such as 'event_file', 'ring_buffer', or 'event_counter'. Supports multiple target names.  
Use this when you need information about particular target types, like finding all file-based targets or checking ring buffer configurations.

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


&nbsp;
