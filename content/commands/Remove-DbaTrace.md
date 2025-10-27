---
title: "Remove-DbaTrace"
slug: "Remove-DbaTrace"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Stops and removes SQL Server traces by ID or piped input from Get-DbaTrace."
tags:
  - "Trace"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaTrace.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaTrace"
draft: false
---

# Remove-DbaTrace

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaTrace](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaTrace.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaTrace](https://dataplat.github.io/boh#Remove-DbaTrace).

## Synopsis

Stops and removes SQL Server traces by ID or piped input from Get-DbaTrace.

## Description

Stops active SQL Server traces and permanently removes their definitions from the server using sp_trace_setstatus. This function helps clean up unnecessary traces that may be consuming server resources or disk space from previous troubleshooting sessions. The default trace is protected and cannot be removed - use Set-DbaSpConfigure to disable it instead. Traces are stopped first, then their definitions are deleted in a two-step process to ensure clean removal.

## Syntax

```powershell
Remove-DbaTrace
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
PS C:\> Remove-DbaTrace -SqlInstance sql2008
```

Stops and removes all traces on sql2008<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaTrace -SqlInstance sql2008 -Id 1
```

Stops and removes all trace with ID 1 on sql2008<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2008 | Out-GridView -PassThru | Remove-DbaTrace
```

Stops and removes selected traces on sql2008<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies the trace IDs to stop and remove from the SQL Server instance. Accepts one or more integer values.  
Use this when you know the specific trace IDs you want to remove, which you can obtain from Get-DbaTrace or SQL Server Profiler.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts trace objects from Get-DbaTrace via the pipeline for removal operations.  
This enables filtering traces with Get-DbaTrace before removing specific ones, such as removing only traces with certain characteristics.

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
