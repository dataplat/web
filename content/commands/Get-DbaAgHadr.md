---
title: "Get-DbaAgHadr"
slug: "Get-DbaAgHadr"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves the High Availability Disaster Recovery (HADR) service status for SQL Server instances."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgHadr.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgHadr"
draft: false
---

# Get-DbaAgHadr

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgHadr](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgHadr.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgHadr](https://dataplat.github.io/boh#Get-DbaAgHadr).

## Synopsis

Retrieves the High Availability Disaster Recovery (HADR) service status for SQL Server instances.

## Description

Checks whether Availability Groups are enabled at the service level on SQL Server instances. This is a prerequisite for creating and managing Availability Groups, as HADR must be enabled before you can configure any AG functionality. Returns the computer name, instance name, and the current HADR enabled status (true/false) for each specified instance, making it useful for environment audits and troubleshooting AG setup issues.

## Syntax

```powershell
Get-DbaAgHadr
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
PS C:\> Get-DbaAgHadr -SqlInstance sql2016
```

Returns a status of the Hadr setting for sql2016 SQL Server instance.<br>

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
