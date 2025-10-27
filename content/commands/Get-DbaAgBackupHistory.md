---
title: "Get-DbaAgBackupHistory"
slug: "Get-DbaAgBackupHistory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl) | Stuart Moore (@napalmgram), Andreas Jordan"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves backup history from msdb across all replicas in a SQL Server Availability Group"
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgBackupHistory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgBackupHistory"
draft: false
---

# Get-DbaAgBackupHistory

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl) , Stuart Moore (@napalmgram), Andreas Jordan |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgBackupHistory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgBackupHistory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgBackupHistory](https://dataplat.github.io/boh#Get-DbaAgBackupHistory).

## Synopsis

Retrieves backup history from msdb across all replicas in a SQL Server Availability Group

## Description

Queries the msdb backup history tables across all replicas in an Availability Group and aggregates the results into a unified view. This function automatically discovers all replicas (either through a listener or by querying individual replicas) and combines their backup history data, which is essential since backups can be taken from any replica but are only recorded in the local msdb.  
  
This solves the common AG challenge where DBAs need to piece together backup history from multiple replicas for compliance reporting, recovery planning, or troubleshooting backup strategies. You can filter by backup type, date ranges, or get just the latest backups, and the function adds availability group context to help identify which replica performed each backup.  
  
Reference: http://www.sqlhub.com/2011/07/find-your-backup-history-in-sql-server.html

## Syntax

```powershell
Get-DbaAgBackupHistory -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -AvailabilityGroup <String>
    [-Database <String[]>]
    [-ExcludeDatabase <String[]>]
    [-IncludeCopyOnly]
    [-Since <DateTime>]
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
    [-LsnSort <String>]
    [-EnableException]
    [<CommonParameters>]

Get-DbaAgBackupHistory -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -AvailabilityGroup <String>
    [-Database <String[]>]
    [-ExcludeDatabase <String[]>]
    [-IncludeCopyOnly]
    [-Force]
    [-Since <DateTime>]
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
    [-LsnSort <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgBackupHistory -SqlInstance AgListener -AvailabilityGroup AgTest1
```

Returns information for all database backups still in msdb history on all replicas of availability group AgTest1 using the listener AgListener to determine all replicas.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgBackupHistory -SqlInstance Replica1, Replica2, Replica3 -AvailabilityGroup AgTest1
```

Returns information for all database backups still in msdb history on the given replicas of availability group AgTest1.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgBackupHistory -SqlInstance 'Replica1:14331', 'Replica2:14332', 'Replica3:14333' -AvailabilityGroup AgTest1
```

Returns information for all database backups still in msdb history on the given replicas of availability group AgTest1 using custom ports.<br>

#####  Example:  4 

```powershell
PS C:\> $ListOfReplicas | Get-DbaAgBackupHistory -AvailabilityGroup AgTest1
```

Returns information for all database backups still in msdb history on the replicas in $ListOfReplicas of availability group AgTest1.<br>

#####  Example:  5 

```powershell
PS C:\> $serverWithAllAgs = Connect-DbaInstance -SqlInstance MyServer
PS C:\> $allAgResults = foreach ( $ag in $serverWithAllAgs.AvailabilityGroups ) {
>>     Get-DbaAgBackupHistory -SqlInstance $ag.AvailabilityReplicas.Name -AvailabilityGroup $ag.Name
>> }
>>
PS C:\> $allAgResults | Format-Table
```

Returns information for all database backups on all replicas for all availability groups on SQL instance MyServer.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.  
If you pass in one availability group listener, all replicas are automatically determined and queried.  
If you pass in a list of individual replicas, they will be queried. This enables you to use custom ports for the replicas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -AvailabilityGroup

Specifies the name of the availability group to query for backup history.  
Required parameter that identifies which AG's databases should be included in the backup history retrieval.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

Specifies which databases within the availability group to include in the backup history.  
If omitted, backup history for all databases in the availability group will be returned.  
Useful when you need backup history for specific databases rather than the entire AG.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases within the availability group to exclude from backup history results.  
Use this when you want most AG databases but need to omit specific ones like test or temporary databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeCopyOnly

Includes copy-only backups in the results, which are normally excluded by default.  
Copy-only backups don't affect the backup chain sequence and are often used for ad-hoc copies or third-party backup tools.  
Enable this when you need a complete view of all backup activity including copy-only operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Returns detailed backup information including additional metadata fields normally hidden for readability.  
Use this when you need comprehensive backup details for troubleshooting or detailed analysis beyond the standard summary view.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Since

Filters backup history to only include backups taken after this date and time.  
Defaults to January 1, 1970 if not specified, effectively including all backup history.  
Use this to limit results to recent backups or investigate backup activity within a specific timeframe.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-Date '01/01/1970') |

##### -RecoveryFork

Filters backup history to a specific recovery fork identified by its GUID.  
Recovery forks occur after point-in-time restores and create branching backup chains.  
Use this when investigating backup history related to a specific restore operation or recovery scenario.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Last

Returns the most recent complete backup chain (full, differential, and log backups) needed for point-in-time recovery.  
This provides the minimum set of backups required to restore each database to its most recent recoverable state.  
Essential for recovery planning and validating that you have all necessary backup files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LastFull

Returns only the most recent full backup for each database in the availability group.  
Use this to quickly identify the latest full backup baseline for each database, which is the foundation for any restore operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LastDiff

Returns only the most recent differential backup for each database in the availability group.  
Useful for identifying the latest differential backup that can reduce restore time by applying changes since the last full backup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LastLog

Returns only the most recent transaction log backup for each database in the availability group.  
Critical for determining the latest point-in-time recovery option and ensuring log backup chains are current.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DeviceType

Filters backup history by the storage device type where backups were written.  
Common values include 'Disk' for local/network storage, 'URL' for Azure/S3 cloud storage, or 'Tape' for tape devices.  
Use this when you need to locate backups stored on specific media types or troubleshoot backup destinations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Raw

Returns individual backup file details instead of grouping striped backup files into single backup set objects.  
Enable this when you need to see each physical backup file separately, useful for investigating striped backups or file-level backup issues.  
By default, related backup files are grouped together as logical backup sets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LastLsn

Filters backup history to only include backups with Log Sequence Numbers greater than this value.  
Use this to find backups taken after a specific point in the transaction log, improving performance when dealing with large backup histories.  
Commonly used when building incremental backup chains or investigating activity after a known LSN checkpoint.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeMirror

Includes mirrored backup sets in the results, which are normally excluded for clarity.  
Mirrored backups are identical copies written simultaneously to multiple destinations during backup operations.  
Enable this when you need to see all backup copies or verify mirror backup destinations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Type

Filters results to specific backup types such as 'Full', 'Log', or 'Differential'.  
Use this when you need to focus on particular backup types, like reviewing only transaction log backups for log shipping validation.  
If not specified, all backup types are included unless using one of the Last switches.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Full,Log,Differential,File,Differential File,Partial Full,Partial Differential |

##### -LsnSort

Determines which LSN field to use for sorting when filtering with Last switches (LastFull, LastDiff, LastLog).  
Options are 'FirstLsn' (default), 'DatabaseBackupLsn', or 'LastLsn' to control chronological ordering.  
Use 'LastLsn' when you need backups sorted by their ending checkpoint rather than starting point.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | FirstLsn |
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
