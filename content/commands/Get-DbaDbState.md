---
title: "Get-DbaDbState"
slug: "Get-DbaDbState"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database state information including read/write status, availability, and user access mode"
tags:
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbState.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbState"
draft: false
---

# Get-DbaDbState

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto (@niphold) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbState](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbState.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbState](https://dataplat.github.io/boh#Get-DbaDbState).

## Synopsis

Retrieves database state information including read/write status, availability, and user access mode

## Description

Gets three key database state properties from sys.databases that DBAs frequently need to check:  
- "RW" options: READ_ONLY or READ_WRITE (whether database accepts modifications)  
- "Status" options: ONLINE, OFFLINE, EMERGENCY, RESTORING (database availability state)  
- "Access" options: SINGLE_USER, RESTRICTED_USER, MULTI_USER (user connection restrictions)  
  
This function is useful for quickly auditing database configurations across instances, especially when troubleshooting connectivity issues or preparing for maintenance operations. System databases (master, model, msdb, tempdb, distribution) are excluded by default since their states rarely change.  
  
Returns an object with SqlInstance, DatabaseName, RW, Status, and Access properties for each user database.

## Syntax

```powershell
Get-DbaDbState
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
PS C:\> Get-DbaDbState -SqlInstance sqlserver2014a
```

Gets options for all databases of the sqlserver2014a instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbState -SqlInstance sqlserver2014a -Database HR, Accounting
```

Gets options for both HR and Accounting database of the sqlserver2014a instance<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbState -SqlInstance sqlserver2014a -Exclude HR
```

Gets options for all databases of the sqlserver2014a instance except HR<br>

#####  Example:  4 

```powershell
PS C:\> 'sqlserver2014a', 'sqlserver2014b' | Get-DbaDbState
```

Gets options for all databases of sqlserver2014a and sqlserver2014b instances<br>

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

##### -Database

Specifies which user databases to check for state information. Accepts multiple database names as an array.  
Use this when you need to audit specific databases rather than checking all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which user databases to exclude from the state check. Accepts multiple database names as an array.  
Use this when you want to check most databases but skip specific ones, such as databases under maintenance.

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
