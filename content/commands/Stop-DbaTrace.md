---
title: "Stop-DbaTrace"
slug: "Stop-DbaTrace"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Stops running SQL Server traces using sp_trace_setstatus"
tags:
  - "Trace"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaTrace.ps1"
bohUrl: "https://dataplat.github.io/boh#Stop-DbaTrace"
draft: false
---

# Stop-DbaTrace

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Stop-DbaTrace](https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaTrace.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Stop-DbaTrace](https://dataplat.github.io/boh#Stop-DbaTrace).

## Synopsis

Stops running SQL Server traces using sp_trace_setstatus

## Description

Stops one or more running SQL Server traces by calling sp_trace_setstatus with a status of 0. This is useful when you need to stop traces created for troubleshooting, performance monitoring, or security auditing that are no longer needed or are impacting server performance. The function prevents you from accidentally stopping the default trace and provides guidance to use Set-DbaSpConfigure if you need to disable it. Works with trace IDs or accepts piped input from Get-DbaTrace for selective stopping of traces.

## Syntax

```powershell
Stop-DbaTrace
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Id] <Int32[]>]
    [[-InputObject] <Object[]>]
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
PS C:\> Stop-DbaTrace -SqlInstance sql2008
```

Stops all traces on sql2008<br>

#####  Example:  2 

```powershell
PS C:\> Stop-DbaTrace -SqlInstance sql2008 -Id 1
```

Stops all trace with ID 1 on sql2008<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2008 | Out-GridView -PassThru | Stop-DbaTrace
```

Stops selected traces on sql2008<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance

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

##### -Id

Specifies the trace IDs to stop. Accepts one or more trace ID numbers as integers.  
Use this when you need to stop specific traces instead of all running traces on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts trace objects from the pipeline, typically from Get-DbaTrace output.  
This enables selective stopping of traces by piping Get-DbaTrace results through filtering commands like Out-GridView or Where-Object.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
