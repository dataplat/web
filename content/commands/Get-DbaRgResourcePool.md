---
title: "Get-DbaRgResourcePool"
slug: "Get-DbaRgResourcePool"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Resource Governor resource pools with their CPU, memory, and IOPS configuration settings"
tags:
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRgResourcePool.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRgResourcePool"
draft: false
---

# Get-DbaRgResourcePool

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRgResourcePool](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRgResourcePool.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRgResourcePool](https://dataplat.github.io/boh#Get-DbaRgResourcePool).

## Synopsis

Retrieves SQL Server Resource Governor resource pools with their CPU, memory, and IOPS configuration settings

## Description

Retrieves detailed information about SQL Server Resource Governor resource pools, including both internal (CPU/memory) and external (R/Python) pools. Shows current configuration settings for minimum and maximum CPU percentages, memory percentages, and IOPS limits per volume. Essential for monitoring resource allocation, troubleshooting performance bottlenecks, and auditing resource governance policies across your SQL Server instances.

## Syntax

```powershell
Get-DbaRgResourcePool
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Type] <String>]
    [[-InputObject] <ResourceGovernor[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRgResourcePool -SqlInstance sql2016
```

Gets the internal resource pools on sql2016<br>

#####  Example:  2 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaResourceGovernor | Get-DbaRgResourcePool
```

Gets the internal resource pools on Sql1 and Sql2/sqlexpress instances<br>

#####  Example:  3 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaResourceGovernor | Get-DbaRgResourcePool -Type External
```

Gets the external resource pools on Sql1 and Sql2/sqlexpress instances<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -Type

Specifies whether to retrieve Internal resource pools (CPU/memory) or External resource pools (R/Python services).  
Internal pools control SQL Server workloads, while External pools govern Machine Learning Services resource consumption.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Internal |
| Accepted Values | Internal,External |

##### -InputObject

Accepts Resource Governor objects from Get-DbaResourceGovernor for pipeline processing.  
Use this when you need to filter or process resource pools from multiple instances collected earlier in your script.

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


&nbsp;
