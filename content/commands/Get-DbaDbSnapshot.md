---
title: "Get-DbaDbSnapshot"
slug: "Get-DbaDbSnapshot"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database snapshots with their source databases, creation times, and disk usage"
tags:
  - "Snapshot"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSnapshot.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbSnapshot"
draft: false
---

# Get-DbaDbSnapshot

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto (@niphlod) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbSnapshot](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSnapshot.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbSnapshot](https://dataplat.github.io/boh#Get-DbaDbSnapshot).

## Synopsis

Retrieves database snapshots with their source databases, creation times, and disk usage

## Description

Collects information about all database snapshots on a SQL Server instance, showing which database each snapshot was created from, when it was created, and how much disk space it's consuming. This is useful for snapshot management, cleanup activities, and monitoring storage usage of point-in-time database copies. You can filter results by specific base databases or snapshot names to focus on particular snapshots of interest.

## Syntax

```powershell
Get-DbaDbSnapshot
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Snapshot] <Object[]>]
    [[-ExcludeSnapshot] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sqlserver2014a
```

Returns a custom object displaying Server, Database, DatabaseCreated, SnapshotOf, SizeMB, DatabaseCreated<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR, Accounting
```

Returns information for database snapshots having HR and Accounting as base dbs<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sqlserver2014a -Snapshot HR_snapshot, Accounting_snapshot
```

Returns information for database snapshots HR_snapshot and Accounting_snapshot<br>

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

Filters results to snapshots created from specific base databases. Use this when you want to see all snapshots created from particular source databases like 'HR' or 'Accounting'.  
Accepts multiple database names and is useful for focusing on snapshots from databases you're actively managing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes snapshots created from specific base databases from the results. Use this to filter out snapshots from databases you don't want to see, such as system databases or databases managed by other   
teams.  
Helpful when you want a comprehensive view but need to omit certain source databases from the output.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Snapshot

Returns information for specific database snapshots by their snapshot names. Use this when you need details about particular snapshots like 'HR_BeforeUpdate_20240101' or 'Production_Backup_Snapshot'.  
Accepts multiple snapshot names and is ideal for checking the status or disk usage of known snapshots.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSnapshot

Excludes specific database snapshots from the results by their snapshot names. Use this to filter out snapshots you don't want to see in the output, such as automated system snapshots or snapshots   
from other environments.  
Helpful for focusing on production snapshots while excluding development or test snapshots.

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
