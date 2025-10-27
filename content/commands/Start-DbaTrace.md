---
title: "Start-DbaTrace"
slug: "Start-DbaTrace"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Starts existing SQL Server traces that are currently stopped"
tags:
  - "Trace"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Start-DbaTrace.ps1"
bohUrl: "https://dataplat.github.io/boh#Start-DbaTrace"
draft: false
---

# Start-DbaTrace

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Start-DbaTrace](https://github.com/dataplat/dbatools/blob/master/public/Start-DbaTrace.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Start-DbaTrace](https://dataplat.github.io/boh#Start-DbaTrace).

## Synopsis

Starts existing SQL Server traces that are currently stopped

## Description

Starts SQL Server traces that have been defined but are not currently running. This function activates traces by setting their status to 1 using sp_trace_setstatus, allowing you to begin collecting trace data for performance monitoring, auditing, or troubleshooting. The default trace cannot be started with this function - use Set-DbaSpConfigure to enable it instead.

## Syntax

```powershell
Start-DbaTrace
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
PS C:\> Start-DbaTrace -SqlInstance sql2008
```

Starts all traces on sql2008<br>

#####  Example:  2 

```powershell
PS C:\> Start-DbaTrace -SqlInstance sql2008 -Id 1
```

Starts all trace with ID 1 on sql2008<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2008 | Out-GridView -PassThru | Start-DbaTrace
```

Starts selected traces on sql2008<br>

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

Specifies the numeric IDs of specific traces to start. When omitted, all stopped traces on the instance will be started.  
Use this when you need to start only particular traces rather than all available stopped traces.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts trace objects from the pipeline, typically from Get-DbaTrace. This allows you to filter traces first, then start only the selected ones.  
Use this parameter when piping trace objects or when you have trace objects from a previous Get-DbaTrace command.

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
