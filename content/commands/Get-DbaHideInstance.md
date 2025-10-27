---
title: "Get-DbaHideInstance"
slug: "Get-DbaHideInstance"
date: 2024-01-01
layout: "single"
author: "Tracy Boggiano @TracyBoggiano, databaseuperhero.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves the Hide Instance setting from SQL Server registry configuration"
tags:
  - "Instance"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaHideInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaHideInstance"
draft: false
---

# Get-DbaHideInstance

| Property | Value |
| --- | --- |
| **Author** | Tracy Boggiano @TracyBoggiano, databaseuperhero.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaHideInstance](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaHideInstance.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaHideInstance](https://dataplat.github.io/boh#Get-DbaHideInstance).

## Synopsis

Retrieves the Hide Instance setting from SQL Server registry configuration

## Description

Retrieves the Hide Instance setting from the Windows registry for SQL Server instances. This security setting controls whether the instance appears when clients browse the network for available SQL Server instances. When Hide Instance is enabled, the SQL Server instance will not respond to broadcast requests from SQL Server Browser service, making it invisible to network discovery tools. DBAs use this setting as a security hardening measure to reduce the attack surface by preventing unauthorized discovery of SQL Server instances. Note that this requires Windows administrative access to the target server, not SQL Server permissions.

## Syntax

```powershell
Get-DbaHideInstance
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaHideInstance
```

Gets Hide Instance properties on the default (MSSQLSERVER) instance on localhost - requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaHideInstance -SqlInstance sql01\SQL2008R2SP2
```

Gets Force Network Encryption for the SQL2008R2SP2 on sql01. Uses Windows Credentials to both login and view the registry.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to the computer (not sql instance) using alternative Windows credentials

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
