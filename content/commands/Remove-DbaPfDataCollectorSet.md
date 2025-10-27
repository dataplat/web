---
title: "Remove-DbaPfDataCollectorSet"
slug: "Remove-DbaPfDataCollectorSet"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes Windows Performance Monitor Data Collector Sets from local or remote computers"
tags:
  - "PerfMon"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaPfDataCollectorSet.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaPfDataCollectorSet"
draft: false
---

# Remove-DbaPfDataCollectorSet

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaPfDataCollectorSet](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaPfDataCollectorSet.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaPfDataCollectorSet](https://dataplat.github.io/boh#Remove-DbaPfDataCollectorSet).

## Synopsis

Removes Windows Performance Monitor Data Collector Sets from local or remote computers

## Description

Removes Windows Performance Monitor Data Collector Sets that are no longer needed for SQL Server performance monitoring. This is useful for cleaning up old monitoring configurations, freeing disk space, or standardizing performance monitoring setups across your SQL Server environment. The collector set must be stopped before removal - running collector sets will generate an error and must be stopped first using Stop-DbaPfDataCollectorSet. When removing collector sets from the local computer, administrator privileges are required.

## Syntax

```powershell
Remove-DbaPfDataCollectorSet
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CollectorSet] <String[]>]
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
PS C:\> Remove-DbaPfDataCollectorSet
```

Prompts for confirmation then removes all ready Collectors on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaPfDataCollectorSet -ComputerName sql2017 -Confirm:$false
```

Attempts to remove all ready Collectors on localhost and does not prompt to confirm.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaPfDataCollectorSet -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```

Prompts for confirmation then removes the 'System Correlation' Collector on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Remove-DbaPfDataCollectorSet
```

Removes the 'System Correlation' Collector.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Stop-DbaPfDataCollectorSet | Remove-DbaPfDataCollectorSet
```

Stops and removes the 'System Correlation' Collector.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) where Performance Monitor Data Collector Sets will be removed. Supports multiple computers for bulk operations.  
Use this when removing collector sets from remote SQL Server hosts or when standardizing monitoring configurations across multiple servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to the target computer using alternative credentials. To use:  
$cred = Get-Credential, then pass $cred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CollectorSet

Specifies the exact name(s) of the Performance Monitor Data Collector Sets to remove. Accepts multiple collector set names for batch operations.  
Use this when you need to remove specific monitoring configurations rather than all available collector sets on the target computer.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Data Collector Set objects from Get-DbaPfDataCollectorSet for pipeline operations. Enables chaining commands together for workflow automation.  
Use this when you need to filter collector sets with Get-DbaPfDataCollectorSet first, then remove only the matching results.

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
