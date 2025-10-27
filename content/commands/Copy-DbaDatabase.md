---
title: "Copy-DbaDatabase"
slug: "Copy-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Migrates SQL Server databases between instances using backup/restore or detach/attach methods."
tags:
  - "Migration"
  - "Backup"
  - "Restore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaDatabase"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaDatabase</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDatabase.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Migrates SQL Server databases between instances using backup/restore or detach/attach methods.

## Description

Moves user databases from one SQL Server instance to another, supporting both on-premises and Azure SQL Managed Instance destinations. Ideal for server migrations, environment refreshes, disaster recovery testing, and cloud migrations where you need to relocate entire databases with their data and structure intact.  
  
Offers two migration methods: backup/restore (safer, supports cross-version migrations) and detach/attach (faster, requires same SQL Server version). The backup/restore method creates copy-only backups to avoid breaking your existing backup chain, while detach/attach physically moves database files via administrative shares.  
  
Automatically handles file path mapping, preserves database properties like ownership chaining and trustworthy settings, and includes safety checks for Availability Groups, mirroring, and replication. By default, databases are placed in the destination server's default data and log directories, but you can preserve the original folder structure.  
  
Works with named instances, clusters, SQL Server Express Edition, and Azure blob storage for cloud scenarios. Supports multiple destination servers, database renaming, and batch operations for migrating multiple databases efficiently.  
  
If you are experiencing issues with Copy-DbaDatabase, please use Backup-DbaDatabase | Restore-DbaDatabase instead.

## Syntax

```powershell
Copy-DbaDatabase
    [-Source <DbaInstanceParameter>]
    [-SourceSqlCredential <PSCredential>]
    -Destination <DbaInstanceParameter[]>
    [-DestinationSqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    -BackupRestore
    [-AdvancedBackupParams <Hashtable>]
    [-SharedPath <String>]
    [-AzureCredential <String>]
    [-WithReplace]
    [-NoRecovery]
    [-NoBackupCleanup]
    [-NumberFiles <Int32>]
    [-SetSourceReadOnly]
    [-ReuseSourceFolderStructure]
    [-IncludeSupportDbs]
    [-UseLastBackup]
    [-Continue]
    [-InputObject <Database[]>]
    [-NoCopyOnly]
    [-KeepCDC]
    [-KeepReplication]
    [-SetSourceOffline]
    [-NewName <String>]
    [-Prefix <String>]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Copy-DbaDatabase
    [-Source <DbaInstanceParameter>]
    [-SourceSqlCredential <PSCredential>]
    -Destination <DbaInstanceParameter[]>
    [-DestinationSqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    [-AzureCredential <String>]
    -DetachAttach
    [-Reattach]
    [-SetSourceReadOnly]
    [-ReuseSourceFolderStructure]
    [-IncludeSupportDbs]
    [-InputObject <Database[]>]
    [-NoCopyOnly]
    [-SetSourceOffline]
    [-NewName <String>]
    [-Prefix <String>]
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
PS C:\> Copy-DbaDatabase -Source sql2014a -Destination sql2014b -Database TestDB -BackupRestore -SharedPath \\fileshare\sql\migration
```
{: data-copyable="true" data-clean-code="Copy-DbaDatabase -Source sql2014a -Destination sql2014b -Database TestDB -BackupRestore -SharedPath \\fileshare\sql\migration" }

Migrates a single user database TestDB using Backup and restore from instance sql2014a to sql2014b. Backup files are stored in \\fileshare\sql\migration.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaDatabase -Source sql2012 -Destination sql2014, sql2016 -DetachAttach -Reattach
```
{: data-copyable="true" data-clean-code="Copy-DbaDatabase -Source sql2012 -Destination sql2014, sql2016 -DetachAttach -Reattach" }

Databases will be migrated from sql2012 to both sql2014 and sql2016 using the detach/copy files/attach method. The following will be performed: kick all users out of the database, detach all data/log <br>
files, files copied to the admin share (\\SqlSERVER\M$\MSSql...) of destination server, attach file on destination server, reattach at source. If the database files (*.mdf, *.ndf, *.ldf) on <br>
*destination* exist and aren't in use, they will be overwritten.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaDatabase -Source sql2014a -Destination sqlcluster, sql2016 -BackupRestore -UseLastBackup -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaDatabase -Source sql2014a -Destination sqlcluster, sql2016 -BackupRestore -UseLastBackup -Force" }

Migrates all user databases to sqlcluster and sql2016 using the last Full, Diff and Log backups from sql204a. If the databases exist on the destinations, they will be dropped prior to attach.<br>
Note that the backups must exist in a location accessible by all destination servers, such a network share.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaDatabase -Source sql2014a -Destination sqlcluster -ExcludeDatabase Northwind, pubs -IncludeSupportDbs -Force -BackupRestore -SharedPath \\fileshare\sql\migration
```
{: data-copyable="true" data-clean-code="Copy-DbaDatabase -Source sql2014a -Destination sqlcluster -ExcludeDatabase Northwind, pubs -IncludeSupportDbs -Force -BackupRestore -SharedPath \\fileshare\sql\migration" }

Migrates all user databases except for Northwind and pubs by using backup/restore (copy-only). Backup files are stored in \\fileshare\sql\migration. If the database exists on the destination, it will <br>
be dropped prior to attach.<br>
It also includes the support databases (ReportServer, ReportServerTempDb, SSISDB, distribution).<br>

#####  Example:  5 

```powershell
PS C:\> Copy-DbaDatabase -Source sql2014 -Destination managedinstance.cus19c972e4513d6.database.windows.net -DestinationSqlCredential $cred -AllDatabases -BackupRestore -SharedPath
```
{: data-copyable="true" data-clean-code="Copy-DbaDatabase -Source sql2014 -Destination managedinstance.cus19c972e4513d6.database.windows.net -DestinationSqlCredential $cred -AllDatabases -BackupRestore -SharedPath" }

https://someblob.blob.core.windows.net/sql<br>
Migrate all user databases from instance sql2014 to the specified Azure SQL Manage Instance using the blob storage account https://someblob.blob.core.windows.net/sql using a Shared Access Signature <br>
(SAS) credential with a name matching the blob storage account<br>

#####  Example:  6 

```powershell
PS C:\> Copy-DbaDatabase -Source sql2014 -Destination managedinstance.cus19c972e4513d6.database.windows.net -DestinationSqlCredential $cred -Database MyDb -NewName AzureDb -WithReplace -BackupRestore
```
{: data-copyable="true" data-clean-code="Copy-DbaDatabase -Source sql2014 -Destination managedinstance.cus19c972e4513d6.database.windows.net -DestinationSqlCredential $cred -Database MyDb -NewName AzureDb -WithReplace -BackupRestore" }

-SharedPath https://someblob.blob.core.windows.net/sql -AzureCredential AzBlobCredential<br>
Migrates Mydb from instance sql2014 to AzureDb on the specified Azure SQL Manage Instance, replacing the existing AzureDb if it exists, using the blob storage account <br>
https://someblob.blob.core.windows.net/sql using the Sql Server Credential AzBlobCredential<br>

#####  Example:  7 

```powershell
PS C:\> Copy-DbaDatabase -Source sql2014a -Destination sqlcluster -BackupRestore -SharedPath \\FS\Backup -AdvancedBackupParams @{ CompressBackup = $true }
```
{: data-copyable="true" data-clean-code="Copy-DbaDatabase -Source sql2014a -Destination sqlcluster -BackupRestore -SharedPath \\FS\Backup -AdvancedBackupParams @{ CompressBackup = $true }" }

Migrates all user databases to sqlcluster. Uses the parameter CompressBackup with the backup command to save some space on the shared path.<br>

#####  Example:  8 

```powershell
PS C:\> Copy-DbaDatabase -Source sqlcs -Destination sqlcs -Database t -DetachAttach -NewName t_copy -Reattach
```
{: data-copyable="true" data-clean-code="Copy-DbaDatabase -Source sqlcs -Destination sqlcs -Database t -DetachAttach -NewName t_copy -Reattach" }

Copies database t from sqlcs to the same server (sqlcs) using the detach/copy/attach method. The new database will be named t_copy and the original database will be reattached.<br>

### Required Parameters

##### -Destination

Specifies one or more destination SQL Server instances where databases will be migrated.  
Supports on-premises instances and Azure SQL Managed Instances for cloud migrations.  
When targeting multiple destinations, backups are performed once and shared across all targets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -BackupRestore

Uses backup and restore method for database migration, creating copy-only backups to preserve existing backup chains.  
This is the safest method for cross-version migrations and works with Azure blob storage.  
Requires either -SharedPath for backup location or -UseLastBackup to use existing backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | False |

##### -DetachAttach

Uses detach/copy/attach method for database migration by moving physical database files.  
This method is faster than backup/restore but requires same SQL Server versions and administrative share access.  
Source databases are automatically reattached if destination attachment fails.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | False |

### Optional Parameters

##### -Source

Specifies the source SQL Server instance containing the databases to migrate.  
Supports named instances, clusters, and SQL Server Express editions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SourceSqlCredential

Specifies credentials for connecting to the source SQL Server instance when Windows authentication is not available.  
Use this when the source server requires SQL authentication or when running under a different security context.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Specifies credentials for connecting to the destination SQL Server instance when Windows authentication is not available.  
Required for Azure SQL Managed Instance destinations or when destination requires SQL authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which user databases to migrate by name.  
Use this when you need to migrate specific databases rather than all databases on the instance.  
Supports tab completion from the source instance and accepts multiple database names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude when using -AllDatabases.  
Use this to skip problematic databases like those in use, under maintenance, or containing sensitive data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllDatabases

Migrates all user databases from the source instance, excluding system databases (master, model, msdb, tempdb).  
Use this for full server migrations or when moving all business databases to a new instance.

| Property | Value |
| --- | --- |
| Alias | All |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AdvancedBackupParams

Specifies additional parameters for the backup operation as a hashtable.  
Use this to enable compression (@{CompressBackup = $true}), checksum verification, or other backup options.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SharedPath

Specifies the storage location accessible by both source and destination SQL Server instances.  
Accepts local paths (C:\Backups), UNC shares (\\server\backups), or Azure blob storage URLs.  
SQL Server service accounts on both instances must have read/write permissions to this location.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AzureCredential

Specifies the SQL Server credential name for Azure blob storage authentication.  
Required when using storage access keys with Azure blob storage paths.  
For SAS tokens, the credential name should match the Azure storage URL.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WithReplace

Overwrites existing databases at the destination with the same name.  
Use this when refreshing existing databases or when you want to replace destination databases completely.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoRecovery

Restores databases in NORECOVERY mode, leaving them ready for additional transaction log restores.  
Use this for staging environments or when setting up log shipping scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoBackupCleanup

Preserves backup files after migration instead of automatically deleting them.  
Use this when you want to keep backups for additional restores or compliance requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NumberFiles

Specifies how many backup files to create for each database backup to improve performance.  
Default is 3 files, which provides good parallelism for most databases.  
Increase for very large databases or high-performance storage systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 3 |

##### -Reattach

Reattaches databases to the source instance after successful detach/attach migration.  
Required when using -DetachAttach with multiple destination servers to restore source functionality.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SetSourceReadOnly

Sets source databases to read-only before migration to prevent data changes during the process.  
Use this to ensure data consistency when databases must remain accessible at the source during migration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ReuseSourceFolderStructure

Maintains the exact file path structure from the source instance on the destination.  
Use this when destination servers have identical drive layouts or when preserving specific organizational folder structures.  
The destination instance must have matching directory paths available.

| Property | Value |
| --- | --- |
| Alias | ReuseFolderStructure |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSupportDbs

Migrates SQL Server feature databases including ReportServer, ReportServerTempDB, SSISDB, and distribution databases.  
Use this when migrating servers that host Reporting Services, Integration Services, or replication components.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -UseLastBackup

Uses existing backups from backup history instead of creating new ones.  
The most recent full, differential, and log backups must be accessible to all destination servers.  
Useful for migration scenarios where fresh backups already exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Continue

Continues restoration by applying transaction log backups to databases in RECOVERING or STANDBY states.  
Use this with -UseLastBackup when resuming interrupted restore operations or applying additional log backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase for migration.  
Use this to migrate databases filtered by specific criteria like size, compatibility level, or other properties.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -NoCopyOnly

Creates regular backups instead of copy-only backups, which affects the database's backup chain.  
Only use this when you want migration backups to be part of the regular backup sequence.  
Default copy-only behavior preserves existing backup chains and is recommended for migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepCDC

Preserves Change Data Capture (CDC) configuration and data during migration.  
Use this when destination databases need to maintain CDC tracking for auditing or replication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepReplication

Preserves replication configuration during database migration.  
Use this when migrating publisher or subscriber databases that participate in replication topologies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SetSourceOffline

Sets source databases to offline status after successful migration.  
Use this for cutover scenarios where source databases should be unavailable after migration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NewName

Renames the database during migration when copying a single database.  
The database name and physical file names are updated to use the new name.  
Cannot be used with multiple databases or together with -Prefix parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Prefix

Adds a prefix to all migrated database names and their physical file names.  
Use this to distinguish migrated databases (e.g., 'DEV_' prefix for development copies).  
Cannot be used together with -NewName parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forcibly overwrites existing databases at the destination and bypasses safety checks.  
Breaks database mirroring, removes databases from Availability Groups, and rolls back blocking transactions.  
Use with caution as this will permanently destroy existing destination databases.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
