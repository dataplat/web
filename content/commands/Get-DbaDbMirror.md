---
title: "Get-DbaDbMirror"
slug: "Get-DbaDbMirror"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database mirroring configuration and status for mirrored databases and their witness servers"
tags:
  - "Mirroring"
  - "Mirror"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMirror.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMirror"
draft: false
---

# Get-DbaDbMirror

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMirror](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMirror.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMirror](https://dataplat.github.io/boh#Get-DbaDbMirror).

## Synopsis

Retrieves database mirroring configuration and status for mirrored databases and their witness servers

## Description

This command collects detailed mirroring information from databases configured with SQL Server Database Mirroring, including partner servers, witness servers, safety levels, and synchronization status. It queries both the database properties and the sys.database_mirroring_witnesses system view to provide complete mirroring topology details. Use this when you need to audit your mirroring setup, troubleshoot mirroring issues, or verify mirroring configuration across multiple instances without manually checking each database's mirroring properties in SSMS.

## Syntax

```powershell
Get-DbaDbMirror
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbMirror -SqlInstance localhost
```

Gets properties of database mirrors and mirror witnesses on localhost<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMirror -SqlInstance localhost, sql2016
```

Gets properties of database mirrors and mirror witnesses on localhost and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMirror -SqlInstance localhost, sql2016 -Database mymirror
```

Gets properties of database mirrors and mirror witnesses on localhost and sql2016 SQL Server instances for databases named mymirror<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

Specifies which databases to check for mirroring configuration. Accepts multiple database names and supports wildcards.  
Use this when you want to examine mirroring status for specific databases instead of checking all databases on the instance.

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
