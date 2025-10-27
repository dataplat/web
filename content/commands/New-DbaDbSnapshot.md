---
title: "New-DbaDbSnapshot"
slug: "New-DbaDbSnapshot"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold)"
availability: "Windows, Linux, macOS"
synopsis: "Creates database snapshots for point-in-time recovery and testing scenarios"
tags:
  - "Snapshot"
  - "Restore"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSnapshot.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbSnapshot"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbSnapshot</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSnapshot.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Simone Bizzotto (@niphold)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates database snapshots for point-in-time recovery and testing scenarios

## Description

Creates read-only database snapshots that capture the state of a database at a specific moment in time. Snapshots provide a fast way to revert databases to a previous state without restoring from backup files, making them ideal for pre-maintenance snapshots, testing scenarios, or quick rollback points.  
  
The function automatically generates snapshot file names with timestamps and handles the underlying file structure creation. Snapshots share pages with the source database until changes occur, making them storage-efficient for short-term use. Note that snapshots are not a replacement for regular backups and should be dropped when no longer needed to avoid performance impacts.

## Syntax

```powershell
New-DbaDbSnapshot
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-AllDatabases]
    [[-Name] <String>]
    [[-NameSuffix] <String>]
    [[-Path] <String>]
    [-Force]
    [[-InputObject] <Database[]>]
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
PS C:\> New-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR, Accounting
```
{: data-copyable="true" data-clean-code="New-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR, Accounting" }

Creates snapshot for HR and Accounting, returning a custom object displaying Server, Database, DatabaseCreated, SnapshotOf, SizeMB, DatabaseCreated, PrimaryFilePath, Status, Notes<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR -Name HR_snap
```
{: data-copyable="true" data-clean-code="New-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR -Name HR_snap" }

Creates snapshot named "HR_snap" for HR<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR -NameSuffix 'fool_{0}_snap'
```
{: data-copyable="true" data-clean-code="New-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR -NameSuffix 'fool_{0}_snap'" }

Creates snapshot named "fool_HR_snap" for HR<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR, Accounting -Path F:\snapshotpath
```
{: data-copyable="true" data-clean-code="New-DbaDbSnapshot -SqlInstance sqlserver2014a -Database HR, Accounting -Path F:\snapshotpath" }

Creates snapshots for HR and Accounting databases, storing files under the F:\snapshotpath\ dir<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database df | New-DbaDbSnapshot
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2016 -Database df | New-DbaDbSnapshot" }

Creates a snapshot for the database df on sql2016<br>

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

Specifies which databases to create snapshots for. Accepts an array of database names.  
Use this when you need snapshots for specific databases rather than all databases on the instance.  
Cannot be used together with AllDatabases parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from snapshot creation when using AllDatabases.  
Useful when you want to snapshot most databases but skip certain ones like development or staging databases.  
Accepts an array of database names to exclude from the operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllDatabases

Creates snapshots for all user databases on the instance that support snapshotting.  
Automatically excludes system databases (master, model, tempdb), snapshots, and databases with memory-optimized filegroups.  
Use this when you need to create snapshots for disaster recovery or before major maintenance operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Name

Sets a custom name for the database snapshot. Only works when targeting a single database.  
Use this when you need a meaningful snapshot name like 'Sales_PreUpgrade' instead of the default timestamped name.  
For multiple databases, use NameSuffix parameter instead to avoid naming conflicts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NameSuffix

Customizes the suffix appended to database names when creating snapshots. Defaults to yyyyMMdd_HHmmss format.  
Use simple strings like '_PrePatch' or templates with {0} placeholder where {0} represents the database name.  
Examples: '_BeforeMaintenance' creates 'HR_BeforeMaintenance', or 'Snap_{0}_v1' creates 'Snap_HR_v1'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory where snapshot files will be stored. Defaults to the same location as the source database files.  
Use this when you need snapshots on different storage for performance or capacity reasons.  
The SQL Server service account must have write access to the specified path.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Creates partial snapshots for databases containing FILESTREAM filegroups. FILESTREAM data is excluded and marked offline in the snapshot.  
Use this when you need to snapshot databases with FILESTREAM for testing or point-in-time analysis of non-FILESTREAM data.  
Warning: Databases cannot be restored from partial snapshots due to the missing FILESTREAM data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline operations.  
Enables scenarios like filtering databases with specific criteria before creating snapshots.  
Example: Get-DbaDatabase -SqlInstance sql01 | Where-Object Size -gt 1000 | New-DbaDbSnapshot

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
