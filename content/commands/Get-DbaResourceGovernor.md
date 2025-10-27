---
title: "Get-DbaResourceGovernor"
slug: "Get-DbaResourceGovernor"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Resource Governor configuration and status from SQL Server instances"
tags:
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaResourceGovernor.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaResourceGovernor"
draft: false
---

# Get-DbaResourceGovernor

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaResourceGovernor](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaResourceGovernor.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaResourceGovernor](https://dataplat.github.io/boh#Get-DbaResourceGovernor).

## Synopsis

Retrieves Resource Governor configuration and status from SQL Server instances

## Description

Retrieves the Resource Governor object containing configuration details, enabled status, and associated resource pools. Resource Governor allows DBAs to manage SQL Server workload and resource consumption by setting limits on CPU, memory, and I/O usage for different workloads. This function helps you quickly check if Resource Governor is enabled, view classifier functions, and examine current resource pool configurations without writing custom T-SQL queries.

## Syntax

```powershell
Get-DbaResourceGovernor
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaResourceGovernor -SqlInstance sql2016
```

Gets the resource governor object of the SqlInstance sql2016<br>

#####  Example:  2 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaResourceGovernor
```

Gets the resource governor object on Sql1 and Sql2/sqlexpress instances<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

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
