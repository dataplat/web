---
title: "Start-DbaPfDataCollectorSet"
slug: "Start-DbaPfDataCollectorSet"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Starts Windows Performance Monitor Data Collector Sets on local or remote computers."
tags:
  - "PerfMon"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Start-DbaPfDataCollectorSet.ps1"
bohUrl: "https://dataplat.github.io/boh#Start-DbaPfDataCollectorSet"
draft: false
---

# Start-DbaPfDataCollectorSet

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Start-DbaPfDataCollectorSet](https://github.com/dataplat/dbatools/blob/master/public/Start-DbaPfDataCollectorSet.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Start-DbaPfDataCollectorSet](https://dataplat.github.io/boh#Start-DbaPfDataCollectorSet).

## Synopsis

Starts Windows Performance Monitor Data Collector Sets on local or remote computers.

## Description

Starts Performance Monitor Data Collector Sets that have been configured to gather system performance data. This is useful for SQL Server performance troubleshooting when you need to collect OS-level metrics like CPU, memory, disk I/O, and network statistics alongside your SQL Server monitoring. The function checks the collector set status before starting and will skip sets that are already running or disabled.

## Syntax

```powershell
Start-DbaPfDataCollectorSet
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CollectorSet] <String[]>]
    [[-InputObject] <Object[]>]
    [-NoWait]
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
PS C:\> Start-DbaPfDataCollectorSet
```

Attempts to start all ready Collectors on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Start-DbaPfDataCollectorSet -ComputerName sql2017
```

Attempts to start all ready Collectors on localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Start-DbaPfDataCollectorSet -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```

Starts the 'System Correlation' Collector on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Start-DbaPfDataCollectorSet
```

Starts the 'System Correlation' Collector.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) where Performance Monitor Data Collector Sets will be started. Defaults to localhost.  
Use this when you need to start collector sets on remote SQL Server machines or when managing multiple servers from a central location.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to $ComputerName using alternative credentials. To use:  
$cred = Get-Credential, then pass $cred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CollectorSet

Specifies the name(s) of specific Performance Monitor Data Collector Sets to start. When omitted, all ready collector sets will be started.  
Use this when you only need to start particular collector sets like 'System Performance' or custom sets created for SQL Server monitoring.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Performance Monitor Data Collector Set objects from Get-DbaPfDataCollectorSet via the pipeline. Objects must contain DataCollectorSetObject property.  
Use this when you want to filter collector sets with Get-DbaPfDataCollectorSet first, then start only the matching sets through the pipeline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -NoWait

When specified, starts the collector set and returns results immediately without waiting for the startup process to complete.  
Use this when starting multiple collector sets in scripts where you don't need to confirm each one fully initialized before proceeding.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
