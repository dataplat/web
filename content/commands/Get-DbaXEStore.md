---
title: "Get-DbaXEStore"
slug: "Get-DbaXEStore"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves the Extended Events store object for managing XEvent sessions and configurations"
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXEStore.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaXEStore"
draft: false
---

# Get-DbaXEStore

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaXEStore](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXEStore.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaXEStore](https://dataplat.github.io/boh#Get-DbaXEStore).

## Synopsis

Retrieves the Extended Events store object for managing XEvent sessions and configurations

## Description

Retrieves the Extended Events store object from SQL Server instances, which serves as the foundation for working with Extended Events sessions, packages, and configurations. The store object provides access to session management, event package information, and running session counts. This is typically the first step when building Extended Events monitoring solutions or auditing XEvent configurations across your environment.

## Syntax

```powershell
Get-DbaXEStore
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
PS C:\> Get-DbaXEStore -SqlInstance ServerA\sql987
```

Returns an XEvent Store.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

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
