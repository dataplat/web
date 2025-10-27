---
title: "Get-DbaDbMail"
slug: "Get-DbaDbMail"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Database Mail configuration including profiles, accounts, and settings from SQL Server instances"
tags:
  - "Mail"
  - "DbMail"
  - "Email"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMail.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMail"
draft: false
---

# Get-DbaDbMail

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMail](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMail.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMail](https://dataplat.github.io/boh#Get-DbaDbMail).

## Synopsis

Retrieves Database Mail configuration including profiles, accounts, and settings from SQL Server instances

## Description

Retrieves the complete Database Mail configuration from one or more SQL Server instances, including mail profiles, SMTP accounts, configuration values, and properties. This function provides a quick way to audit your email setup across multiple servers, troubleshoot mail delivery issues, or document your Database Mail configuration for compliance purposes. The output includes server identification details to help when working with multiple instances.

## Syntax

```powershell
Get-DbaDbMail
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
PS C:\> Get-DbaDbMail -SqlInstance sql01\sharepoint
```

Returns the db mail server object on sql01\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMail -SqlInstance sql01\sharepoint | Select-Object *
```

Returns the db mail server object on sql01\sharepoint then return a bunch more columns<br>

#####  Example:  3 

```powershell
PS C:\> $servers = "sql2014","sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaDbMail
```

Returns the db mail server object for "sql2014","sql2016" and "sqlcluster\sharepoint"<br>

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
