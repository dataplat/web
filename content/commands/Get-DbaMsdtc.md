---
title: "Get-DbaMsdtc"
slug: "Get-DbaMsdtc"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@powerdbaklaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Microsoft Distributed Transaction Coordinator (MSDTC) service status and configuration details"
tags:
  - "Msdtc"
  - "dtc"
  - "General"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMsdtc.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaMsdtc"
draft: false
---

# Get-DbaMsdtc

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@powerdbaklaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaMsdtc](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMsdtc.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaMsdtc](https://dataplat.github.io/boh#Get-DbaMsdtc).

## Synopsis

Retrieves Microsoft Distributed Transaction Coordinator (MSDTC) service status and configuration details

## Description

Returns comprehensive MSDTC information including service state, security settings, and component identifiers (CIDs) from target servers. MSDTC is essential for SQL Server distributed transactions, linked server operations, and cross-database transactions that span multiple servers or instances.  
  
This function helps DBAs troubleshoot distributed transaction failures, verify MSDTC configuration for linked servers, and audit security settings across multiple servers. It queries both the Windows service status and registry settings to provide a complete picture of the MSDTC configuration.  
  
Requires: Windows administrator access on target servers

## Syntax

```powershell
Get-DbaMsdtc
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaMsdtc -ComputerName srv0042
```

Get DTC status for the server srv0042<br>

#####  Example:  2 

```powershell
PS C:\> $Computers = (Get-Content D:\configfiles\SQL\MySQLInstances.txt | % {$_.split('\')[0]})
PS C:\> $Computers | Get-DbaMsdtc
```

Get DTC status for all the computers in a .txt file<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaMsdtc -Computername $Computers | Where-Object { $_.dtcservicestate -ne 'running' }
```

Get DTC status for all the computers where the MSDTC Service is not running<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaMsdtc -ComputerName srv0042 | Out-Gridview
```

Get DTC status for the computer srv0042 and show in a grid view<br>

### Optional Parameters

##### -ComputerName

Specifies the server or computer names where MSDTC information should be retrieved. Accepts multiple values and supports pipeline input.  
Use this when checking MSDTC configuration across multiple SQL Server hosts, especially when troubleshooting distributed transactions or linked server issues.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Alternative credential

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
