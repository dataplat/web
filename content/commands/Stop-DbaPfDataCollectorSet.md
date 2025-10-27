---
title: "Stop-DbaPfDataCollectorSet"
slug: "Stop-DbaPfDataCollectorSet"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Stops Windows Performance Monitor Data Collector Sets used for SQL Server performance monitoring."
tags:
  - "PerfMon"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaPfDataCollectorSet.ps1"
bohUrl: "https://dataplat.github.io/boh#Stop-DbaPfDataCollectorSet"
draft: false
---

# Stop-DbaPfDataCollectorSet

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Stop-DbaPfDataCollectorSet](https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaPfDataCollectorSet.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Stop-DbaPfDataCollectorSet](https://dataplat.github.io/boh#Stop-DbaPfDataCollectorSet).

## Synopsis

Stops Windows Performance Monitor Data Collector Sets used for SQL Server performance monitoring.

## Description

Stops running Performance Monitor Data Collector Sets that are actively collecting performance counters for SQL Server monitoring and analysis. This function interacts with the Windows Performance Logs and Alerts (PLA) service to gracefully halt data collection processes. Commonly used to stop baseline data collection after capturing sufficient performance metrics, or to halt monitoring during maintenance windows when counter data isn't needed.

## Syntax

```powershell
Stop-DbaPfDataCollectorSet
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
PS C:\> Stop-DbaPfDataCollectorSet
```

Attempts to stop all ready Collectors on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Stop-DbaPfDataCollectorSet -ComputerName sql2017
```

Attempts to stop all ready Collectors on localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Stop-DbaPfDataCollectorSet -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```

Stops the 'System Correlation' Collector on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Stop-DbaPfDataCollectorSet
```

Stops the 'System Correlation' Collector.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer where Performance Monitor Data Collector Sets are running. Accepts multiple computer names for bulk operations.  
Use this when stopping collectors on remote SQL Server instances or when managing multiple servers from a central location.  
Defaults to localhost when not specified.

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

Specifies the exact name of the Data Collector Set to stop. Supports multiple collector names for stopping several sets simultaneously.  
Use this when you need to stop specific performance monitoring sets without affecting other running collectors on the system.  
Common SQL Server collector sets include 'SQL Server Data Collector Set' and custom monitoring configurations.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Data Collector Set objects from Get-DbaPfDataCollectorSet via pipeline input.  
Use this approach when you need to filter or examine collector properties before stopping them, or when building complex monitoring workflows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -NoWait

Returns control immediately after initiating the stop command without waiting for the collector to fully terminate.  
Use this in automated scripts where you need to stop multiple collectors quickly or when the stopping process might take time due to large data buffers being flushed.

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
