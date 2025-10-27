---
title: "Remove-DbaDbMirrorMonitor"
slug: "Remove-DbaDbMirrorMonitor"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Stops and deletes the mirroring monitor job for all the databases on the server instance."
tags:
  - "Mirroring"
  - "Mirror"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMirrorMonitor.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbMirrorMonitor"
draft: false
---

# Remove-DbaDbMirrorMonitor

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbMirrorMonitor](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMirrorMonitor.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbMirrorMonitor](https://dataplat.github.io/boh#Remove-DbaDbMirrorMonitor).

## Synopsis

Stops and deletes the mirroring monitor job for all the databases on the server instance.

## Description

Stops and deletes the mirroring monitor job for all the databases on the server instance.  
  
Basically executes sp_dbmmonitordropmonitoring.

## Syntax

```powershell
Remove-DbaDbMirrorMonitor
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
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
PS C:\> Remove-DbaDbMirrorMonitor -SqlInstance sql2008, sql2012
```

Stops and deletes the mirroring monitor job for all the databases on sql2008 and sql2012.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
