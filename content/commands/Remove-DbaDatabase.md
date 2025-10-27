---
title: "Remove-DbaDatabase"
slug: "Remove-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes user databases using multiple fallback methods to handle stuck or locked databases."
tags:
  - "Delete"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDatabase"
draft: false
---

# Remove-DbaDatabase

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDatabase](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDatabase.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDatabase](https://dataplat.github.io/boh#Remove-DbaDatabase).

## Synopsis

Removes user databases using multiple fallback methods to handle stuck or locked databases.

## Description

Removes user databases by attempting three different drop methods in sequence until one succeeds. First tries the standard KillDatabase() method, then attempts to set the database to single-user mode with rollback immediate before dropping, and finally uses the SMO Drop() method. This approach handles databases that are stuck due to active connections, replication, mirroring, or other locks that prevent normal removal. System databases are automatically excluded from removal operations.

## Syntax

```powershell
Remove-DbaDatabase
    [-SqlCredential <PSCredential>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDatabase -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -Database <Object[]>
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDatabase
    [-SqlCredential <PSCredential>]
    -InputObject <Database[]>
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Remove-DbaDatabase -SqlInstance sql2016 -Database containeddb
```

Prompts then removes the database containeddb on SQL Server sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDatabase -SqlInstance sql2016 -Database containeddb, mydb
```

Prompts then removes the databases containeddb and mydb on SQL Server sql2016<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDatabase -SqlInstance sql2016 -Database containeddb -Confirm:$false
```

Does not prompt and swiftly removes containeddb on SQL Server sql2016<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance server\instance | Remove-DbaDatabase
```

Removes all the user databases from server\instance<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance server\instance | Remove-DbaDatabase -Confirm:$false
```

Removes all the user databases from server\instance without any confirmation<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.You must have sysadmin access and server version must be SQL Server version 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the user database(s) to remove from the SQL Server instance. Accepts multiple database names and supports wildcards for pattern matching.  
Use this when you need to remove specific databases rather than all user databases. System databases (master, model, msdb, tempdb, resource) are automatically excluded and cannot be removed.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from the pipeline, typically from Get-DbaDatabase or other dbatools database commands.  
Use this for pipeline operations when you want to filter databases first, then remove the filtered results. This provides more flexibility than specifying database names directly.

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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
