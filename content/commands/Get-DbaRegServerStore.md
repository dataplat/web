---
title: "Get-DbaRegServerStore"
slug: "Get-DbaRegServerStore"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a RegisteredServersStore object for managing Central Management Server configurations"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegServerStore.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRegServerStore"
draft: false
---

# Get-DbaRegServerStore

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRegServerStore](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegServerStore.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRegServerStore](https://dataplat.github.io/boh#Get-DbaRegServerStore).

## Synopsis

Creates a RegisteredServersStore object for managing Central Management Server configurations

## Description

Creates a RegisteredServersStore object that serves as the foundation for working with SQL Server Central Management Server (CMS). This object provides access to server groups and registered servers stored in the CMS repository, allowing you to programmatically manage multiple SQL Server instances from a centralized location. When no SqlInstance is specified, it returns the local file store which contains your locally registered servers from SQL Server Management Studio. The returned object can be used with other dbatools CMS commands like Get-DbaRegServer and Get-DbaRegServerGroup to retrieve and manage your registered server configurations.

## Syntax

```powershell
Get-DbaRegServerStore
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRegServerStore -SqlInstance sqlserver2014a
```

Returns a SQL Server Registered Server Store Object from sqlserver2014a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServerStore -SqlInstance sqlserver2014a -SqlCredential sqladmin
```

Returns a SQL Server Registered Server Store Object from sqlserver2014a  by logging in with the sqladmin login<br>

### Optional Parameters

##### -SqlInstance

Specifies the SQL Server instance hosting the Central Management Server to retrieve the registered server store from.  
When omitted, returns the local file store containing your locally registered servers from SQL Server Management Studio.  
Use this when you need to access server groups and registered servers stored in a centralized CMS repository.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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
