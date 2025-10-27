---
title: "Disable-DbaTraceFlag"
slug: "Disable-DbaTraceFlag"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Disables globally running trace flags on SQL Server instances"
tags:
  - "Diagnostic"
  - "TraceFlag"
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaTraceFlag.ps1"
bohUrl: "https://dataplat.github.io/boh#Disable-DbaTraceFlag"
draft: false
---

# Disable-DbaTraceFlag

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disable-DbaTraceFlag](https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaTraceFlag.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disable-DbaTraceFlag](https://dataplat.github.io/boh#Disable-DbaTraceFlag).

## Synopsis

Disables globally running trace flags on SQL Server instances

## Description

Turns off trace flags that are currently enabled globally across SQL Server instances using DBCC TRACEOFF.  
Useful when you need to disable diagnostic trace flags that were enabled for troubleshooting or testing without requiring a restart.  
Only affects flags currently running in memory - does not modify startup parameters or persistent trace flag settings.  
Use Set-DbaStartupParameter to manage trace flags that persist after restarts.

## Syntax

```powershell
Disable-DbaTraceFlag
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-TraceFlag] <Int32[]>
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
PS C:\> Disable-DbaTraceFlag -SqlInstance sql2016 -TraceFlag 3226
```

Disable the globally running trace flag 3226 on SQL Server instance sql2016<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -TraceFlag

Specifies the trace flag numbers to disable globally across all sessions on the SQL Server instance.  
Only trace flags that are currently running will be disabled - flags not currently active are skipped with a warning.  
Supports multiple trace flag numbers to disable several flags in a single operation.

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
