---
title: "Add-DbaDbMirrorMonitor"
slug: "Add-DbaDbMirrorMonitor"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a database mirroring monitor job that periodically updates the mirroring status for every mirrored database on the server instance."
tags:
  - "Mirroring"
  - "Mirror"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaDbMirrorMonitor.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaDbMirrorMonitor"
draft: false
---

# Add-DbaDbMirrorMonitor

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Add-DbaDbMirrorMonitor](https://github.com/dataplat/dbatools/blob/master/public/Add-DbaDbMirrorMonitor.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Add-DbaDbMirrorMonitor](https://dataplat.github.io/boh#Add-DbaDbMirrorMonitor).

## Synopsis

Creates a database mirroring monitor job that periodically updates the mirroring status for every mirrored database on the server instance.

## Description

Creates a database mirroring monitor job that periodically updates the mirroring status for every mirrored database on the server instance.  
  
Basically executes sp_dbmmonitoraddmonitoring.

## Syntax

```powershell
Add-DbaDbMirrorMonitor
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
PS C:\> Add-DbaDbMirrorMonitor -SqlInstance sql2008, sql2012
```

Creates a database mirroring monitor job that periodically updates the mirroring status for every mirrored database on sql2008 and sql2012.<br>

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
