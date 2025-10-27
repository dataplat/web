---
title: "Get-DbaXESession"
slug: "Get-DbaXESession"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Extended Events sessions with detailed configuration and status information from SQL Server instances."
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXESession.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaXESession"
draft: false
---

# Get-DbaXESession

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaXESession](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXESession.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaXESession](https://dataplat.github.io/boh#Get-DbaXESession).

## Synopsis

Retrieves Extended Events sessions with detailed configuration and status information from SQL Server instances.

## Description

This function connects to one or more SQL Server instances and returns comprehensive information about Extended Events sessions, including their current status, configuration details, target files, and memory settings. Extended Events sessions are SQL Server's modern event-handling system used for performance monitoring, troubleshooting, and auditing. This command helps DBAs inventory existing sessions, verify their operational status, and locate output files across multiple SQL Server instances without manually connecting to each server. The function automatically resolves target file paths and provides both local and UNC path information for easier file access from remote management stations.

## Syntax

```powershell
Get-DbaXESession
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Session] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaXESession -SqlInstance ServerA\sql987
```

Returns a custom object with ComputerName, SQLInstance, Session, StartTime, Status and other properties.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaXESession -SqlInstance ServerA\sql987 | Format-Table ComputerName, SqlInstance, Session, Status -AutoSize
```

Returns a formatted table displaying ComputerName, SqlInstance, Session, and Status.<br>

#####  Example:  3 

```powershell
PS C:\> 'ServerA\sql987','ServerB' | Get-DbaXESession
```

Returns a custom object with ComputerName, SqlInstance, Session, StartTime, Status and other properties, from multiple SQL instances.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

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

Filters results to specific Extended Events sessions by name. Accepts multiple session names as an array.  
Use this when you need to check status or configuration of particular sessions rather than viewing all XE sessions on the instance.

| Property | Value |
| --- | --- |
| Alias | Sessions |
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
