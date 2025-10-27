---
title: "Get-DbaLastBackup"
slug: "Get-DbaLastBackup"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves last backup dates and times for database backup compliance monitoring"
tags:
  - "DisasterRecovery"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLastBackup.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaLastBackup"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaLastBackup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLastBackup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDBAKlaas)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves last backup dates and times for database backup compliance monitoring

## Description

Queries msdb backup history to retrieve the most recent full, differential, and transaction log backup dates for each database. This function helps DBAs quickly identify backup gaps and verify compliance with backup policies by showing when each backup type was last performed. The function also calculates elapsed time since each backup and provides status indicators to highlight potential issues, such as databases with no recent backups or transaction log backups that are overdue in full recovery model databases. Default output includes Server, Database, LastFullBackup, LastDiffBackup, and LastLogBackup columns.

## Syntax

```powershell
Get-DbaLastBackup
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaLastBackup -SqlInstance ServerA\sql987
```
{: data-copyable="true" data-clean-code="Get-DbaLastBackup -SqlInstance ServerA\sql987" }

Returns a custom object with Server name, Database name, and the date the last time backups were performed.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaLastBackup -SqlInstance ServerA\sql987 | Select-Object *
```
{: data-copyable="true" data-clean-code="Get-DbaLastBackup -SqlInstance ServerA\sql987 | Select-Object *" }

Returns a custom object with Server name, Database name, and the date the last time backups were performed, and also recoverymodel and calculations on how long ago backups were taken and what the <br>
status is.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLastBackup -SqlInstance ServerA\sql987 | Select-Object * | Out-Gridview
```
{: data-copyable="true" data-clean-code="Get-DbaLastBackup -SqlInstance ServerA\sql987 | Select-Object * | Out-Gridview" }

Returns a gridview displaying ComputerName, InstanceName, SqlInstance, Database, RecoveryModel, LastFullBackup, LastDiffBackup, LastLogBackup, SinceFull, SinceDiff, SinceLog, <br>
LastFullBackupIsCopyOnly, LastDiffBackupIsCopyOnly, LastLogBackupIsCopyOnly, DatabaseCreated, DaysSinceDbCreated, Status<br>

#####  Example:  4 

```powershell
PS C:\> $MyInstances | Get-DbaLastBackup | Where-Object -FilterScript { $_.LastFullBackup.Date -lt (Get-Date).AddDays(-3) } | Format-Table -Property SqlInstance, Database, LastFullBackup
```
{: data-copyable="true" data-clean-code="$MyInstances | Get-DbaLastBackup | Where-Object -FilterScript { $_.LastFullBackup.Date -lt (Get-Date).AddDays(-3) } | Format-Table -Property SqlInstance, Database, LastFullBackup" }

Returns all databases on the given instances without a full backup in the last three days.<br>
Note that the property LastFullBackup is a custom object, with the subproperty Date of type datetime and therefore suitable for comparison with dates.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaLastBackup -SqlInstance ServerA\sql987 | Where-Object { $_.LastFullBackupIsCopyOnly -eq $true }
```
{: data-copyable="true" data-clean-code="Get-DbaLastBackup -SqlInstance ServerA\sql987 | Where-Object { $_.LastFullBackupIsCopyOnly -eq $true }" }

Filters for the databases that had a copy_only full backup done as the last backup.<br>

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

Specifies which databases to check for backup history. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases rather than scanning all databases on the instance.  
Helpful for monitoring critical production databases or troubleshooting backup issues on particular databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the backup history check. Commonly used to skip system databases or test databases.  
Use this when you want to check most databases but exclude certain ones like tempdb, development databases, or databases with known backup exemptions.

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
