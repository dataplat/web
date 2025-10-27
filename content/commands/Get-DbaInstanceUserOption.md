---
title: "Get-DbaInstanceUserOption"
slug: "Get-DbaInstanceUserOption"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@powerdbaklaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves instance-level user option defaults that affect new database connections"
tags:
  - "Instance"
  - "Configure"
  - "UserOption"
  - "General"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceUserOption.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaInstanceUserOption"
draft: false
---

# Get-DbaInstanceUserOption

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@powerdbaklaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaInstanceUserOption](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceUserOption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaInstanceUserOption](https://dataplat.github.io/boh#Get-DbaInstanceUserOption).

## Synopsis

Retrieves instance-level user option defaults that affect new database connections

## Description

Returns the default user options configured at the SQL Server instance level that are automatically applied to new database connections. These settings include ANSI compliance options like ANSI_NULLS, QUOTED_IDENTIFIER, date format preferences, and other connection-level defaults. This is useful when standardizing connection behavior across environments or troubleshooting why applications behave differently on different instances. Unlike Get-DbaDbccUserOption which shows current session settings, this command shows the instance defaults that would be inherited by new connections.

## Syntax

```powershell
Get-DbaInstanceUserOption
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
PS C:\> Get-DbaInstanceUserOption -SqlInstance localhost
```

Returns SQL Instance user options on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaInstanceUserOption -SqlInstance sql2, sql4\sqlexpress
```

Returns SQL Instance user options on default instance on sql2 and sqlexpress instance on sql4<br>

#####  Example:  3 

```powershell
PS C:\> 'sql2','sql4' | Get-DbaInstanceUserOption
```

Returns SQL Instance user options on sql2 and sql4<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.  
This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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
