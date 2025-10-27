---
title: "Get-DbaDbObjectTrigger"
slug: "Get-DbaDbObjectTrigger"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@claudioessilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves triggers attached to tables and views across SQL Server databases."
tags:
  - "Database"
  - "Trigger"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbObjectTrigger.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbObjectTrigger"
draft: false
---

# Get-DbaDbObjectTrigger

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@claudioessilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbObjectTrigger](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbObjectTrigger.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbObjectTrigger](https://dataplat.github.io/boh#Get-DbaDbObjectTrigger).

## Synopsis

Retrieves triggers attached to tables and views across SQL Server databases.

## Description

Retrieves all DML triggers that are attached to tables and views within specified databases. This function helps DBAs inventory trigger-based business logic, identify potential performance bottlenecks, and document database dependencies. You can filter results by database, object type (tables vs views), or pipe in specific objects from Get-DbaDbTable and Get-DbaDbView. Returns trigger details including enabled status and last modified date for impact analysis and change management.

## Syntax

```powershell
Get-DbaDbObjectTrigger
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Type] <String>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbObjectTrigger -SqlInstance sql2017
```

Returns all database triggers<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017 -Database supa | Get-DbaDbObjectTrigger
```

Returns all triggers for database supa on sql2017<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbObjectTrigger -SqlInstance sql2017 -Database supa
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

Specifies which databases to search for table and view triggers. Accepts wildcards for pattern matching.  
Use this when you need to audit triggers in specific databases rather than scanning the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude from trigger enumeration. Accepts wildcards for pattern matching.  
Useful when you want to skip system databases or databases known to have no custom triggers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Filters triggers by the type of object they are attached to: Table, View, or All (default).  
Use 'Table' or 'View' when you need to focus on triggers for specific object types during auditing or troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | All |
| Accepted Values | All,Table,View |

##### -InputObject

Accepts specific table or view objects from Get-DbaDbTable and Get-DbaDbView via pipeline input.  
Use this when you want to check triggers on particular tables or views rather than scanning entire databases.

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
