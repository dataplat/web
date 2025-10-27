---
title: "Get-DbaDbOrphanUser"
slug: "Get-DbaDbOrphanUser"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva) | Garry Bargsley (@gbargsley) | Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Get orphaned users."
tags:
  - "Orphan"
  - "Database"
  - "User"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbOrphanUser.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbOrphanUser"
draft: false
---

# Get-DbaDbOrphanUser

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva) , Garry Bargsley (@gbargsley) , Simone Bizzotto (@niphlod) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbOrphanUser](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbOrphanUser.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbOrphanUser](https://dataplat.github.io/boh#Get-DbaDbOrphanUser).

## Synopsis

Get orphaned users.

## Description

An orphan user is defined by a user that does not have their matching login. (Login property = "").

## Syntax

```powershell
Get-DbaDbOrphanUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbOrphanUser -SqlInstance localhost\sql2016
```

Finds all orphan users without matching Logins in all databases present on server 'localhost\sql2016'.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbOrphanUser -SqlInstance localhost\sql2016 -SqlCredential $cred
```

Finds all orphan users without matching Logins in all databases present on server 'localhost\sql2016'. SQL Server authentication will be used in connecting to the server.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbOrphanUser -SqlInstance localhost\sql2016 -Database db1
```

Finds orphan users without matching Logins in the db1 database present on server 'localhost\sql2016'.<br>

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

##### -Database

Specifies which databases to check for orphaned users. Accepts database names, wildcards, or arrays.  
Use this when you need to focus the orphaned user search on specific databases rather than checking all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when checking for orphaned users. Useful for excluding system databases or databases under maintenance.  
Commonly used to exclude tempdb, distribution, or databases where orphaned users are expected and acceptable.

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
