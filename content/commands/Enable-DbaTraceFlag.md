---
title: "Enable-DbaTraceFlag"
slug: "Enable-DbaTraceFlag"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Enables one or more trace flags globally on SQL Server instances"
tags:
  - "Diagnostic"
  - "TraceFlag"
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaTraceFlag.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaTraceFlag"
draft: false
---

# Enable-DbaTraceFlag

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Enable-DbaTraceFlag](https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaTraceFlag.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Enable-DbaTraceFlag](https://dataplat.github.io/boh#Enable-DbaTraceFlag).

## Synopsis

Enables one or more trace flags globally on SQL Server instances

## Description

Activates trace flags at the global level using DBCC TRACEON, affecting all connections and sessions on the target SQL Server instances.  
Commonly used for troubleshooting performance issues, enabling specific SQL Server behaviors, or applying recommended trace flags for your environment.  
Changes take effect immediately but are lost after a SQL Server restart - use Set-DbaStartupParameter to make trace flags persistent across restarts.  
The function automatically checks for already-enabled trace flags to prevent duplicate operations.

## Syntax

```powershell
Enable-DbaTraceFlag
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
PS C:\> Enable-DbaTraceFlag -SqlInstance sql2016 -TraceFlag 3226
```

Enable the trace flag 3226 on SQL Server instance sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Enable-DbaTraceFlag -SqlInstance sql2016 -TraceFlag 1117, 1118
```

Enable multiple trace flags on SQL Server instance sql2016<br>

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

Specifies one or more trace flag numbers to enable globally across all sessions on the SQL Server instance.  
Use specific trace flag numbers like 3226 (suppress backup log messages), 1117/1118 (tempdb optimization), or 4199 (query optimizer fixes).  
Multiple trace flags can be specified as an array to enable several flags in a single operation.

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
