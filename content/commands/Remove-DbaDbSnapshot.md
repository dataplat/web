---
title: "Remove-DbaDbSnapshot"
slug: "Remove-DbaDbSnapshot"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold)"
availability: "Windows, Linux, macOS"
synopsis: "Drops database snapshots from SQL Server instances"
tags:
  - "Snapshot"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSnapshot.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbSnapshot"
draft: false
---

# Remove-DbaDbSnapshot

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto (@niphold) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbSnapshot](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSnapshot.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbSnapshot](https://dataplat.github.io/boh#Remove-DbaDbSnapshot).

## Synopsis

Drops database snapshots from SQL Server instances

## Description

Removes database snapshots by executing DROP DATABASE statements against the target SQL Server instances. Database snapshots are point-in-time, read-only copies of databases that consume minimal space through copy-on-write technology. This function helps DBAs clean up obsolete snapshots that are no longer needed for reporting, testing, or recovery purposes. The Force parameter can terminate active connections to snapshots that might otherwise prevent the drop operation from succeeding.

## Syntax

```powershell
Remove-DbaDbSnapshot
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Snapshot] <String[]>]
    [[-InputObject] <Database[]>]
    [-AllSnapshots]
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
PS C:\> Remove-DbaDbSnapshot -SqlInstance sql2014 -Snapshot HR_snap_20161201, HR_snap_20161101
```

Removes database snapshots named HR_snap_20161201 and HR_snap_20161101<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbSnapshot -SqlInstance sql2014 -Database HR, Accounting
```

Removes all database snapshots having HR and Accounting as base dbs<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2014 -Database HR, Accounting | Remove-DbaDbSnapshot
```

Removes all database snapshots having HR and Accounting as base dbs<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaDbSnapshot -SqlInstance sql2014 -Snapshot HR_snapshot, Accounting_snapshot
```

Removes HR_snapshot and Accounting_snapshot<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2016 | Where-Object SnapshotOf -like '*dumpsterfire*' | Remove-DbaDbSnapshot
```

Removes all snapshots associated with databases that have dumpsterfire in the name<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2016 | Out-GridView -PassThru | Remove-DbaDbSnapshot
```

Allows the selection of snapshots on sql2016 to remove<br>

#####  Example:  7 

```powershell
PS C:\> Remove-DbaDbSnapshot -SqlInstance sql2014 -AllSnapshots
```

Removes all database snapshots from sql2014<br>

#####  Example:  8 

```powershell
PS C:\> Remove-DbaDbSnapshot -SqlInstance sql2014 -AllSnapshots -Confirm
```

Removes all database snapshots from sql2014 and prompts for each database<br>

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

Specifies the base database(s) whose snapshots should be removed. Only snapshots created from these source databases will be dropped.  
Use this when you need to clean up snapshots for specific databases while leaving other snapshots intact.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes snapshots from the specified base database(s) from removal. All other snapshots on the instance will be removed.  
Use this when you want to remove most snapshots but preserve those from critical databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Snapshot

Specifies the exact snapshot name(s) to remove. Accepts multiple snapshot names for targeted removal operations.  
Use this when you know the specific snapshot names you want to drop, such as outdated test or reporting snapshots.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database snapshot objects from Get-DbaDbSnapshot for pipeline operations. This allows filtering and processing snapshots before removal.  
Use this for complex filtering scenarios where you first identify specific snapshots with Get-DbaDbSnapshot.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -AllSnapshots

Removes all database snapshots found on the target SQL Server instance(s). This affects every snapshot regardless of source database.  
Use this for complete snapshot cleanup operations, typically during maintenance windows or server decommissioning.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Terminates active connections and running queries against snapshots to allow the drop operation to complete successfully.  
Use this when snapshots have active sessions that would normally block the removal process.

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
