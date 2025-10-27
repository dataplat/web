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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbSnapshot</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSnapshot.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Remove-DbaDbSnapshot -SqlInstance sql2014 -Snapshot HR_snap_20161201, HR_snap_20161101" }

Removes database snapshots named HR_snap_20161201 and HR_snap_20161101<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbSnapshot -SqlInstance sql2014 -Database HR, Accounting
```
{: data-copyable="true" data-clean-code="Remove-DbaDbSnapshot -SqlInstance sql2014 -Database HR, Accounting" }

Removes all database snapshots having HR and Accounting as base dbs<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2014 -Database HR, Accounting | Remove-DbaDbSnapshot
```
{: data-copyable="true" data-clean-code="Get-DbaDbSnapshot -SqlInstance sql2014 -Database HR, Accounting | Remove-DbaDbSnapshot" }

Removes all database snapshots having HR and Accounting as base dbs<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaDbSnapshot -SqlInstance sql2014 -Snapshot HR_snapshot, Accounting_snapshot
```
{: data-copyable="true" data-clean-code="Remove-DbaDbSnapshot -SqlInstance sql2014 -Snapshot HR_snapshot, Accounting_snapshot" }

Removes HR_snapshot and Accounting_snapshot<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2016 | Where-Object SnapshotOf -like '*dumpsterfire*' | Remove-DbaDbSnapshot
```
{: data-copyable="true" data-clean-code="Get-DbaDbSnapshot -SqlInstance sql2016 | Where-Object SnapshotOf -like '*dumpsterfire*' | Remove-DbaDbSnapshot" }

Removes all snapshots associated with databases that have dumpsterfire in the name<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbSnapshot -SqlInstance sql2016 | Out-GridView -PassThru | Remove-DbaDbSnapshot
```
{: data-copyable="true" data-clean-code="Get-DbaDbSnapshot -SqlInstance sql2016 | Out-GridView -PassThru | Remove-DbaDbSnapshot" }

Allows the selection of snapshots on sql2016 to remove<br>

#####  Example:  7 

```powershell
PS C:\> Remove-DbaDbSnapshot -SqlInstance sql2014 -AllSnapshots
```
{: data-copyable="true" data-clean-code="Remove-DbaDbSnapshot -SqlInstance sql2014 -AllSnapshots" }

Removes all database snapshots from sql2014<br>

#####  Example:  8 

```powershell
PS C:\> Remove-DbaDbSnapshot -SqlInstance sql2014 -AllSnapshots -Confirm
```
{: data-copyable="true" data-clean-code="Remove-DbaDbSnapshot -SqlInstance sql2014 -AllSnapshots -Confirm" }

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
