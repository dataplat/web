---
title: "Get-DbaDbTrigger"
slug: "Get-DbaDbTrigger"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database-level DDL triggers from SQL Server instances for security auditing and change tracking analysis."
tags:
  - "Database"
  - "Trigger"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbTrigger.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbTrigger"
draft: false
---

# Get-DbaDbTrigger

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbTrigger](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbTrigger.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbTrigger](https://dataplat.github.io/boh#Get-DbaDbTrigger).

## Synopsis

Retrieves database-level DDL triggers from SQL Server instances for security auditing and change tracking analysis.

## Description

Retrieves all database-level DDL triggers from one or more SQL Server instances. Database triggers fire in response to DDL events like CREATE, ALTER, or DROP statements within a specific database, making them useful for change auditing and security monitoring. This function helps DBAs inventory these triggers for compliance reporting, troubleshooting performance issues, or documenting automated database change tracking mechanisms. Returns trigger details including name, enabled status, and last modification date.

## Syntax

```powershell
Get-DbaDbTrigger
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbTrigger -SqlInstance sql2017
```

Returns all database triggers<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017 -Database supa | Get-DbaDbTrigger
```

Returns all triggers for database supa on sql2017<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbTrigger -SqlInstance sql2017 -Database supa
```

Returns all triggers for database supa on sql2017<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

SqlLogin to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance..

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to scan for DDL triggers. Accepts wildcards for pattern matching.  
Use this when you need to audit triggers in specific databases rather than checking all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the trigger scan. Useful for skipping system databases or databases under maintenance.  
Commonly used to exclude tempdb, model, or databases that don't require trigger auditing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input for targeted trigger analysis.  
Use this when you want to process a pre-filtered set of database objects instead of specifying database names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
