---
title: "Get-DbaNetworkActivity"
slug: "Get-DbaNetworkActivity"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves real-time network traffic statistics for all network interfaces on SQL Server host computers."
tags:
  - "Server"
  - "Management"
  - "Network"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaNetworkActivity.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaNetworkActivity"
draft: false
---

# Get-DbaNetworkActivity

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaNetworkActivity](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaNetworkActivity.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaNetworkActivity](https://dataplat.github.io/boh#Get-DbaNetworkActivity).

## Synopsis

Retrieves real-time network traffic statistics for all network interfaces on SQL Server host computers.

## Description

Retrieves current network activity metrics including bytes received, sent, and total throughput per second for every network interface on target computers. This function helps DBAs monitor network performance and identify bandwidth bottlenecks that could impact SQL Server performance, especially during large data transfers, backup operations, or heavy replication traffic.  
  
The function queries Windows performance counters via CIM/WMI and displays bandwidth utilization alongside interface capacity (10Gb, 1Gb, 100Mb, etc.) to quickly identify saturated network links. Essential for troubleshooting connectivity issues, monitoring backup network performance, or validating network capacity before major data migration operations.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Get-DbaNetworkActivity
    [[-ComputerName] <String[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaNetworkActivity -ComputerName sqlserver2014a
```

Gets the Current traffic on every Network Interface on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Get-DbaNetworkActivity
```

Gets the Current traffic on every Network Interface on computers sql1, sql2 and sql3.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaNetworkActivity -ComputerName sql1,sql2
```

Gets the Current traffic on every Network Interface on computers sql1 and sql2.<br>

### Optional Parameters

##### -ComputerName

Specifies the computer names or SQL Server instances to monitor network activity.  
Function extracts the computer name from full instance names and resolves them to fully qualified domain names.  
Defaults to the local computer when not specified.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the computer as a different user.

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


&nbsp;
