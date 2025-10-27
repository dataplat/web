---
title: "Set-DbaDbState"
slug: "Set-DbaDbState"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold)"
availability: "Windows, Linux, macOS"
synopsis: "Modifies database read/write access, online status, and user access modes"
tags:
  - "Database"
  - "State"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbState.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbState"
draft: false
---

# Set-DbaDbState

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto (@niphold) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbState](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbState.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbState](https://dataplat.github.io/boh#Set-DbaDbState).

## Synopsis

Modifies database read/write access, online status, and user access modes

## Description

Modifies database access modes and availability states through ALTER DATABASE commands, eliminating the need to write T-SQL manually for common database administration tasks.  
  
This function handles three categories of database state changes:  
- Read/Write access: Sets databases to READ_ONLY for reporting scenarios or READ_WRITE for normal operations  
- Online status: Brings databases ONLINE, takes them OFFLINE for maintenance, or sets EMERGENCY mode for corruption recovery  
- User access: Restricts database access to SINGLE_USER for maintenance, RESTRICTED_USER for admin-only access, or MULTI_USER for normal operations  
- Database detachment: Safely detaches databases by first removing them from Availability Groups and breaking mirroring relationships when -Force is specified  
  
The -Force parameter rolls back open transactions immediately, allowing state changes to proceed even when active connections exist. Without -Force, operations use NO_WAIT and may fail if connections are blocking the change.  
  
Returns an object with SqlInstance, Database, RW, Status, Access, and Notes properties. The Notes field contains error details when state changes fail.

## Syntax

```powershell
Set-DbaDbState
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    [-ReadOnly]
    [-ReadWrite]
    [-Online]
    [-Offline]
    [-Emergency]
    [-Detached]
    [-SingleUser]
    [-RestrictedUser]
    [-MultiUser]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaDbState -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    [-ReadOnly]
    [-ReadWrite]
    [-Online]
    [-Offline]
    [-Emergency]
    [-Detached]
    [-SingleUser]
    [-RestrictedUser]
    [-MultiUser]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaDbState
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    [-ReadOnly]
    [-ReadWrite]
    [-Online]
    [-Offline]
    [-Emergency]
    [-Detached]
    [-SingleUser]
    [-RestrictedUser]
    [-MultiUser]
    [-Force]
    [-EnableException]
    -InputObject <PSObject[]>
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbaDbState -SqlInstance sqlserver2014a -Database HR -Offline
```

Sets the HR database as OFFLINE<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbState -SqlInstance sqlserver2014a -AllDatabases -Exclude HR -ReadOnly -Force
```

Sets all databases of the sqlserver2014a instance, except for HR, as READ_ONLY<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbState -SqlInstance sql2016 | Where-Object Status -eq 'Offline' | Set-DbaDbState -Online
```

Finds all offline databases and sets them to online<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaDbState -SqlInstance sqlserver2014a -Database HR -SingleUser
```

Sets the HR database as SINGLE_USER<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaDbState -SqlInstance sqlserver2014a -Database HR -SingleUser -Force
```

Sets the HR database as SINGLE_USER, dropping all other connections (and rolling back open transactions)<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqlserver2014a -Database HR | Set-DbaDbState -SingleUser -Force
```

Gets the databases from Get-DbaDatabase, and sets them as SINGLE_USER, dropping all other connections (and rolling back open transactions)<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase or Get-DbaDbState through the pipeline.  
Use this to chain commands together, allowing you to filter databases first then modify their states in a single operation.

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

Specifies which databases to modify state for. Accepts single database name, comma-separated list, or wildcards.  
Use this when you need to target specific databases instead of all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the state change operation when using -AllDatabases.  
Useful when you want to modify most databases but skip critical production databases or those undergoing maintenance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllDatabases

Indicates that the operation should target all user databases on the instance.  
Required safety parameter to prevent accidental modification of all databases when no specific database is specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ReadOnly

Sets the database to read_ONLY mode, preventing any data modifications.  
Use this for creating reporting databases, preparing for backups, or when you need to ensure data integrity during maintenance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ReadWrite

Sets the database to read_WRITE mode, allowing normal data modifications.  
Use this to restore normal operations after maintenance or to enable writes on a previously read-only database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Online

Brings the database online and makes it available for normal operations.  
Use this to restore database availability after maintenance, upgrades, or recovery operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Offline

Takes the database offline, making it inaccessible to users and applications.  
Use this for maintenance tasks like file moves, hardware upgrades, or when you need to ensure no connections during critical operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Emergency

Sets the database to EMERGENCY mode for corruption recovery scenarios.  
Use this when the database won't start normally due to corruption and you need to attempt data recovery or run emergency repairs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Detached

Safely detaches the database from the SQL Server instance, removing it from sys.databases.  
Use this when moving databases between instances or when you need to work with database files directly. Requires -Force for mirrored or AG databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SingleUser

Restricts database access to a single connection, typically for administrative tasks.  
Use this during maintenance operations, database restores, or when you need exclusive access to prevent user interference.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RestrictedUser

Limits database access to members of db_owner, dbcreator, or sysadmin roles only.  
Use this during maintenance windows when you need to allow admin access while blocking regular users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MultiUser

Restores normal multi-user access to the database, allowing all authorized connections.  
Use this to return the database to normal operations after completing single-user or restricted-user maintenance tasks.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Rolls back open transactions immediately and kills active connections to allow the state change to proceed.  
Use this when normal state changes fail due to blocking connections, but be aware it will cause transaction rollbacks and connection drops.  
Required for detaching databases that are in Availability Groups or mirroring relationships.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
