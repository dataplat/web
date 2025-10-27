---
title: "Restore-DbaDbSnapshot"
slug: "Restore-DbaDbSnapshot"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold)"
availability: "Windows, Linux, macOS"
synopsis: "Restores SQL Server databases from database snapshots, reverting to the snapshot's point-in-time state"
tags:
  - "Snapshot"
  - "Backup"
  - "Restore"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Restore-DbaDbSnapshot.ps1"
bohUrl: "https://dataplat.github.io/boh#Restore-DbaDbSnapshot"
draft: false
---

# Restore-DbaDbSnapshot

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto (@niphold) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Restore-DbaDbSnapshot](https://github.com/dataplat/dbatools/blob/master/public/Restore-DbaDbSnapshot.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Restore-DbaDbSnapshot](https://dataplat.github.io/boh#Restore-DbaDbSnapshot).

## Synopsis

Restores SQL Server databases from database snapshots, reverting to the snapshot's point-in-time state

## Description

Restores SQL Server databases to their exact state when a database snapshot was created, discarding all changes made since that point. This is particularly useful for quickly reverting development databases after testing, rolling back problematic changes, or returning to a known good state without restoring from backup files.  
  
The function uses SQL Server's RESTORE DATABASE FROM DATABASE_SNAPSHOT command and automatically handles SQL Server's requirement that all other snapshots of the same database be dropped before restoration. It also fixes a SQL Server bug where log file growth settings get reset to their defaults during snapshot restoration.  
  
When Force is specified, the command will terminate active connections to both the target database and snapshot to ensure the restore operation completes successfully.

## Syntax

```powershell
Restore-DbaDbSnapshot
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Snapshot] <Object[]>]
    [[-InputObject] <Database[]>]
    [-Force]
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
PS C:\> Restore-DbaDbSnapshot -SqlInstance sql2014 -Database HR, Accounting
```

Restores HR and Accounting databases using the latest snapshot available<br>

#####  Example:  2 

```powershell
PS C:\> Restore-DbaDbSnapshot -SqlInstance sql2014 -Database HR -Force
```

Restores HR database from latest snapshot and kills any active connections in the database on sql2014.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2016 -Database HR | Restore-DbaDbSnapshot -Force
```

Restores HR database from latest snapshot and kills any active connections in the database on sql2016.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2016 | Out-GridView -PassThru | Restore-DbaDbSnapshot
```

Allows the selection of snapshots on sql2016 to restore<br>

#####  Example:  5 

```powershell
PS C:\> Restore-DbaDbSnapshot -SqlInstance sql2014 -Snapshot HR_snap_20161201, Accounting_snap_20161101
```

Restores databases from snapshots named HR_snap_20161201 and Accounting_snap_20161101<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

##### -Database

Specifies which databases to restore from their most recent snapshots. Accepts multiple database names and wildcards for pattern matching.  
Use this when you want to restore specific databases to their snapshot state rather than working with snapshot names directly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from being restored when using wildcard patterns or restoring multiple databases.  
Helpful when you want to restore most databases from snapshots but skip certain critical production databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Snapshot

Specifies the exact snapshot names to restore from, giving you precise control over which snapshot is used for each database.  
Use this when you need to restore from specific snapshots rather than automatically using the most recent ones.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts snapshot objects from other dbatools commands like Get-DbaDbSnapshot through the PowerShell pipeline.  
This enables you to filter and select specific snapshots before restoring, such as using Out-GridView for interactive selection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Automatically drops other snapshots of the same database that would prevent the restore operation, as required by SQL Server.  
Also terminates active connections to both the target database and snapshot to ensure the restore completes successfully.  
Required when multiple snapshots exist for the database being restored or when active sessions could block the operation.

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

Shows what would happen if the command were to run

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts for confirmation of every step.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
