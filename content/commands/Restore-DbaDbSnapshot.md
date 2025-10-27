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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Restore-DbaDbSnapshot</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Restore-DbaDbSnapshot.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Restore-DbaDbSnapshot -SqlInstance sql2014 -Database HR, Accounting" }

Restores HR and Accounting databases using the latest snapshot available<br>

#####  Example:  2 

```powershell
PS C:\> Restore-DbaDbSnapshot -SqlInstance sql2014 -Database HR -Force
```
{: data-copyable="true" data-clean-code="Restore-DbaDbSnapshot -SqlInstance sql2014 -Database HR -Force" }

Restores HR database from latest snapshot and kills any active connections in the database on sql2014.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2016 -Database HR | Restore-DbaDbSnapshot -Force
```
{: data-copyable="true" data-clean-code="Get-DbaDbSnapshot -SqlInstance sql2016 -Database HR | Restore-DbaDbSnapshot -Force" }

Restores HR database from latest snapshot and kills any active connections in the database on sql2016.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2016 | Out-GridView -PassThru | Restore-DbaDbSnapshot
```
{: data-copyable="true" data-clean-code="Get-DbaDbSnapshot -SqlInstance sql2016 | Out-GridView -PassThru | Restore-DbaDbSnapshot" }

Allows the selection of snapshots on sql2016 to restore<br>

#####  Example:  5 

```powershell
PS C:\> Restore-DbaDbSnapshot -SqlInstance sql2014 -Snapshot HR_snap_20161201, Accounting_snap_20161101
```
{: data-copyable="true" data-clean-code="Restore-DbaDbSnapshot -SqlInstance sql2014 -Snapshot HR_snap_20161201, Accounting_snap_20161101" }

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
