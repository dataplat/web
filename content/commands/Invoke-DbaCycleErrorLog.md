---
title: "Invoke-DbaCycleErrorLog"
slug: "Invoke-DbaCycleErrorLog"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Cycles the current SQL Server error log and/or SQL Agent error log to start fresh log files"
tags:
  - "Instance"
  - "ErrorLog"
  - "Logging"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaCycleErrorLog.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaCycleErrorLog"
draft: false
---

# Invoke-DbaCycleErrorLog

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaCycleErrorLog](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaCycleErrorLog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaCycleErrorLog](https://dataplat.github.io/boh#Invoke-DbaCycleErrorLog).

## Synopsis

Cycles the current SQL Server error log and/or SQL Agent error log to start fresh log files

## Description

Archives the current error log files and creates new ones for SQL Server instance and/or SQL Agent. This operation is typically performed during maintenance windows to manage log file sizes and establish clean baselines for troubleshooting. When cycled, the current error log becomes the archived log (errorlog.1) and a new error log starts capturing events.

## Syntax

```powershell
Invoke-DbaCycleErrorLog
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Type] <String>]
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
PS C:\> Invoke-DbaCycleLog -SqlInstance sql2016 -Type agent
```

Cycles the current error log for the SQL Server Agent on SQL Server instance sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaCycleLog -SqlInstance sql2016 -Type instance
```

Cycles the current error log for the SQL Server instance on SQL Server instance sql2016<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaCycleLog -SqlInstance sql2016
```

Cycles the current error log for both SQL Server instance and SQL Server Agent on SQL Server instance sql2016<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.You must have sysadmin access and server version must be SQL Server version 2000 or higher.

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

##### -Type

Specifies which error log to cycle: 'instance' for SQL Server instance log, 'agent' for SQL Agent log.  
When omitted, cycles both logs simultaneously which is the typical maintenance approach.  
Use specific values when you need to manage log sizes independently or troubleshoot specific services.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | instance,agent |

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
