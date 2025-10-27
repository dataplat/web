---
title: "Get-DbaTempdbUsage"
slug: "Get-DbaTempdbUsage"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Gets Tempdb usage for running queries."
tags:
  - "Tempdb"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTempdbUsage.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaTempdbUsage"
draft: false
---

# Get-DbaTempdbUsage

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaTempdbUsage](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTempdbUsage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaTempdbUsage](https://dataplat.github.io/boh#Get-DbaTempdbUsage).

## Synopsis

Gets Tempdb usage for running queries.

## Description

This function queries DMVs for running sessions using tempdb and returns results if those sessions have user or internal space allocated or deallocated against them.

## Syntax

```powershell
Get-DbaTempdbUsage
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
PS C:\> Get-DbaTempdbUsage -SqlInstance localhost\SQLDEV2K14
```

Gets tempdb usage for localhost\SQLDEV2K14<br>

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
