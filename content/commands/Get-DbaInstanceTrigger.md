---
title: "Get-DbaInstanceTrigger"
slug: "Get-DbaInstanceTrigger"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves server-level DDL triggers from SQL Server instances for auditing and documentation"
tags:
  - "Database"
  - "Trigger"
  - "General"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceTrigger.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaInstanceTrigger"
draft: false
---

# Get-DbaInstanceTrigger

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaInstanceTrigger](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceTrigger.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaInstanceTrigger](https://dataplat.github.io/boh#Get-DbaInstanceTrigger).

## Synopsis

Retrieves server-level DDL triggers from SQL Server instances for auditing and documentation

## Description

Returns server-level DDL triggers that monitor and respond to instance-wide events like CREATE, ALTER, and DROP statements. Server triggers are commonly used for security auditing, change tracking, and preventing unauthorized schema modifications across all databases on an instance. This function helps identify what automated responses are configured at the server level, which is essential for troubleshooting unexpected DDL blocking and documenting compliance controls.

## Syntax

```powershell
Get-DbaInstanceTrigger
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
PS C:\> Get-DbaInstanceTrigger -SqlInstance sql2017
```

Returns all server triggers on sql2017<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

SqlLogin to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance..

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
