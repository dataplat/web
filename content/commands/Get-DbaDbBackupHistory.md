---
title: "Get-DbaDbBackupHistory"
slug: "Get-DbaDbBackupHistory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl) | Stuart Moore (@napalmgram)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves backup history records from MSDB for analysis and compliance reporting."
tags:
  - "DisasterRecovery"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbBackupHistory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbBackupHistory"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbBackupHistory</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbBackupHistory.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl) , Stuart Moore (@napalmgram)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves backup history records from MSDB for analysis and compliance reporting.

## Description

Queries the MSDB database backup tables to extract detailed backup history information including file paths, sizes, compression ratios, and LSN sequences. Essential for compliance auditing, disaster recovery planning, and troubleshooting backup issues without having to manually query system tables. The function automatically groups striped backup sets into single objects and excludes copy-only backups by default, making the output more practical for restoration scenarios. You can filter results by database name, backup type, date range, or retrieve only the most recent backup chains needed for point-in-time recovery.  
  
Reference: http://www.sqlhub.com/2011/07/find-your-backup-history-in-sql-server.html

## Syntax

```powershell
Get-DbaDbBackupHistory -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-IncludeCopyOnly]
    [-Since <PSObject>]
    [-RecoveryFork <String>]
    [-Last]
    [-LastFull]
    [-LastDiff]
    [-LastLog]
    [-DeviceType <String[]>]
    [-Raw]
    [-LastLsn <BigInteger>]
    [-IncludeMirror]
    [-Type <String[]>]
    [-AgCheck]
    [-IgnoreDiffBackup]
    [-LsnSort <String>]
    [-EnableException]
    [<CommonParameters>]

Get-DbaDbBackupHistory -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-IncludeCopyOnly]
    [-Force]
    [-Since <PSObject>]
    [-RecoveryFork <String>]
    [-Last]
    [-LastFull]
    [-LastDiff]
    [-LastLog]
    [-DeviceType <String[]>]
    [-Raw]
    [-LastLsn <BigInteger>]
    [-IncludeMirror]
    [-Type <String[]>]
    [-AgCheck]
    [-IgnoreDiffBackup]
    [-LsnSort <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance SqlInstance2014a
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance SqlInstance2014a" }

Returns server name, database, username, backup type, date for all database backups still in msdb history on SqlInstance2014a. This may return many rows; consider using filters that are included in <br>
other examples.<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential sqladmin
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin" }

Get-DbaDbBackupHistory -SqlInstance SqlInstance2014a -SqlCredential $cred<br>
Does the same as above but connect to SqlInstance2014a as SQL user "sqladmin"<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance SqlInstance2014a -Database db1, db2 -Since ([DateTime]'2016-07-01 10:47:00')
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance SqlInstance2014a -Database db1, db2 -Since ([DateTime]'2016-07-01 10:47:00')" }

Returns backup information only for databases db1 and db2 on SqlInstance2014a since July 1, 2016 at 10:47 AM.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014, pubs -Force | Format-Table
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014, pubs -Force | Format-Table" }

Returns information only for AdventureWorks2014 and pubs and formats the results as a table.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -Last
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -Last" }

Returns information about the most recent full, differential and log backups for AdventureWorks2014 on sql2014.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -Last -DeviceType Disk
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -Last -DeviceType Disk" }

Returns information about the most recent full, differential and log backups for AdventureWorks2014 on sql2014, but only for backups to disk.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -Last -DeviceType 148,107
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -Last -DeviceType 148,107" }

Returns information about the most recent full, differential and log backups for AdventureWorks2014 on sql2014, but only for backups with device_type 148 and 107.<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -LastFull
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -LastFull" }

Returns information about the most recent full backup for AdventureWorks2014 on sql2014.<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -Type Full
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance sql2014 -Database AdventureWorks2014 -Type Full" }

Returns information about all Full backups for AdventureWorks2014 on sql2014.<br>

#####  Example:  10 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2016 | Get-DbaDbBackupHistory
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sql2016 | Get-DbaDbBackupHistory" }

Returns database backup information for every database on every server listed in the Central Management Server on sql2016.<br>

#####  Example:  11 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance SqlInstance2014a, sql2016 -Force
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance SqlInstance2014a, sql2016 -Force" }

Returns detailed backup history for all databases on SqlInstance2014a and sql2016.<br>

#####  Example:  12 

```powershell
PS C:\> Get-DbaDbBackupHistory -SqlInstance sql2016 -Database db1 -RecoveryFork 38e5e84a-3557-4643-a5d5-eed607bef9c6 -Last
```
{: data-copyable="true" data-clean-code="Get-DbaDbBackupHistory -SqlInstance sql2016 -Database db1 -RecoveryFork 38e5e84a-3557-4643-a5d5-eed607bef9c6 -Last" }

If db1 has multiple recovery forks, specifying the RecoveryFork GUID will restrict the search to that fork.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Credential object used to connect to the SQL Server instance as a different user. This can be a Windows or SQL Server account. Windows users are determined by the existence of a backslash, so if you   
are intending to use an alternative Windows connection instead of a SQL login, ensure it contains a backslash.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies one or more databases to include in the backup history search. Accepts wildcards for pattern matching.  
Use this when you need backup history for specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies one or more databases to exclude from the backup history search.  
Useful when you want history for most databases but need to skip system databases or specific user databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeCopyOnly

Includes copy-only backups in the results, which are normally excluded by default.  
Copy-only backups don't break the backup chain and are commonly used for ad-hoc backups or moving databases to other environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Returns all columns from the MSDB backup tables instead of the filtered standard output.  
Use this when you need access to additional backup metadata fields for detailed analysis or troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Since

Filters backup history to only include backups taken after the specified date and time.  
Accepts DateTime objects or TimeSpan objects (which get added to the current time). Times are compared using the SQL Server instance's timezone.  
Essential for limiting results when dealing with databases that have extensive backup history.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | ([DateTime]::ParseExact("1970-01-01", "yyyy-MM-dd", [System.Globalization.CultureInfo]::InvariantCulture)) |

##### -RecoveryFork

Filters results to a specific recovery fork GUID when a database has multiple recovery paths.  
Use this when a database has been restored from different backup chains or has experienced recovery fork scenarios, ensuring you get the correct backup sequence.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Last

Returns the most recent complete backup chain (full, differential, and log backups) needed for point-in-time recovery.  
This provides the exact backup sequence you'd need to restore a database to its most current state.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LastFull

Returns only the most recent full backup for each database.  
Use this to quickly identify the base backup needed for restore operations or to verify when the last full backup was taken.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LastDiff

Returns only the most recent differential backup for each database.  
Useful for verifying differential backup schedules or identifying the latest differential backup in a restore scenario.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LastLog

Returns only the most recent transaction log backup for each database.  
Critical for monitoring log backup frequency and identifying the latest point-in-time recovery option available.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DeviceType

Filters backups by device type such as 'Disk', 'Tape', 'URL', or 'Virtual Device'.  
Use this to find backups stored on specific media types, particularly useful when backups go to different destinations like local disk vs cloud storage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Raw

Returns one object per backup file instead of grouping striped backup sets into single objects.  
Use this when you need to see individual backup file details for striped backups or need to analyze backup file distribution.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LastLsn

Filters to only include backups with LSNs greater than the specified value, improving query performance on large backup histories.  
Use this when you know the LSN range you're interested in, typically when building restore sequences or analyzing backup chains.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeMirror

Includes mirror backup copies in the results, which are excluded by default.  
Use this when you need to see all backup copies created through backup mirroring, useful for verifying mirror backup configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Type

Filters results to specific backup types: 'Full', 'Log', 'Differential', 'File', 'Differential File', 'Partial Full', or 'Partial Differential'.  
Use this to focus on particular backup types when analyzing backup strategies or troubleshooting specific backup issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Full,Log,Differential,File,Differential File,Partial Full,Partial Differential |

##### -AgCheck

Deprecated parameter. Use Get-DbaAgBackupHistory instead to retrieve backup history from all replicas in an Availability Group.  
This parameter is maintained for backward compatibility but no longer functions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IgnoreDiffBackup

Excludes differential backups from the results, showing only full and log backups.  
Useful when analyzing backup chains that don't use differential backups or when you want to focus on full and log backup patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LsnSort

Determines which LSN column to use for sorting results: 'FirstLsn', 'DatabaseBackupLsn', or 'LastLsn' (default).  
Use this to control backup ordering when working with complex backup scenarios or when you need results sorted by specific LSN checkpoints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | LastLsn |
| Accepted Values | FirstLsn,DatabaseBackupLsn,LastLsn |

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
