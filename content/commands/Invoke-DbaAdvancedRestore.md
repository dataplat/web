---
title: "Invoke-DbaAdvancedRestore"
slug: "Invoke-DbaAdvancedRestore"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Executes database restores from processed BackupHistory objects with advanced customization options"
tags:
  - "Restore"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAdvancedRestore.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaAdvancedRestore"
draft: false
---

# Invoke-DbaAdvancedRestore

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaAdvancedRestore](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAdvancedRestore.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaAdvancedRestore](https://dataplat.github.io/boh#Invoke-DbaAdvancedRestore).

## Synopsis

Executes database restores from processed BackupHistory objects with advanced customization options

## Description

This is the final execution step in the dbatools restore pipeline. It takes pre-processed BackupHistory objects and performs the actual SQL Server database restoration with support for complex scenarios that aren't handled by the standard Restore-DbaDatabase command.  
  
The typical pipeline flow is: Get-DbaBackupInformation | Select-DbaBackupInformation | Format-DbaBackupInformation | Test-DbaBackupInformation | Invoke-DbaAdvancedRestore  
  
This function handles advanced restore scenarios including point-in-time recovery, page-level restores, Azure blob storage backups, custom file relocations, and specialized options like CDC preservation or standby mode. It can generate T-SQL scripts for review before execution, verify backup integrity, or perform the actual restore operations.  
  
Most DBAs should use Restore-DbaDatabase for standard scenarios. This function is designed for situations requiring custom backup processing logic, complex migrations with file redirection, or when you need granular control over the restore process that isn't available in the simplified commands.  
  
Always validate your BackupHistory objects with Test-DbaBackupInformation before using this function to ensure the restore chain is logically consistent.

## Syntax

```powershell
Invoke-DbaAdvancedRestore
    [-BackupHistory] <Object[]>
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [-OutputScriptOnly]
    [-VerifyOnly]
    [[-RestoreTime] <DateTime>]
    [[-StandbyDirectory] <String>]
    [-NoRecovery]
    [[-MaxTransferSize] <Int32>]
    [[-BlockSize] <Int32>]
    [[-BufferCount] <Int32>]
    [-Continue]
    [[-AzureCredential] <String>]
    [-WithReplace]
    [-KeepReplication]
    [-KeepCDC]
    [[-PageRestore] <Object[]>]
    [[-ExecuteAs] <String>]
    [-StopBefore]
    [[-StopMark] <String>]
    [[-StopAfterDate] <DateTime>]
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
PS C:\> $BackupHistory | Invoke-DbaAdvancedRestore -SqlInstance MyInstance
```

Will restore all the backups in the BackupHistory object according to the transformations it contains<br>

#####  Example:  2 

```powershell
PS C:\> $BackupHistory | Invoke-DbaAdvancedRestore -SqlInstance MyInstance -OutputScriptOnly
PS C:\> $BackupHistory | Invoke-DbaAdvancedRestore -SqlInstance MyInstance
```

First generates just the T-SQL restore scripts so they can be sanity checked, and then if they are good perform the full restore.<br>
By reusing the BackupHistory object there is no need to rescan all the backup files again<br>

### Required Parameters

##### -BackupHistory

Processed BackupHistory objects from the dbatools restore pipeline containing backup file metadata and restore instructions.  
Typically comes from Format-DbaBackupInformation after running Get-DbaBackupInformation and Select-DbaBackupInformation.  
Each object contains the backup file paths, database name, file relocations, and sequencing information needed for the restore operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The SqlInstance to which the backups should be restored

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

##### -OutputScriptOnly

Generates T-SQL RESTORE scripts without executing them, allowing you to review the commands before running.  
Useful for validating complex restores, creating deployment scripts, or troubleshooting restore logic.  
The generated scripts can be saved and executed manually or through other automation tools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -VerifyOnly

Performs RESTORE VERIFYONLY operations to check backup file integrity without actually restoring the database.  
Use this to validate backup files are readable and not corrupted before attempting a full restore.  
Particularly valuable when testing backup files from different environments or after transferring backup files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RestoreTime

Specifies the exact point-in-time for log restore operations when performing point-in-time recovery.  
Use this for recovering to a specific moment before data corruption or unwanted changes occurred.  
Must be within the timeframe covered by your transaction log backups and should match the value used in earlier pipeline stages.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-Date).AddDays(2) |

##### -StandbyDirectory

Directory path where SQL Server creates standby files for read-only access during restore operations.  
Puts the database in standby mode, allowing read-only queries while maintaining the ability to apply additional transaction log restores.  
Commonly used for log shipping warm standby servers or when you need to query data during a staged restore process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoRecovery

Leaves the database in RESTORING state after the operation, allowing additional transaction log restores to be applied.  
Essential for point-in-time recovery scenarios where you need to apply multiple transaction log backups sequentially.  
The database remains inaccessible until a final restore operation is performed WITH RECOVERY.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MaxTransferSize

Sets the maximum amount of data transferred between SQL Server and backup devices in each read operation.  
Specify in bytes as a multiple of 64KB to optimize restore performance for large databases or slow storage.  
Higher values can improve performance but use more memory; typically ranges from 64KB to 4MB depending on your system.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BlockSize

Physical block size used for backup device I/O operations, must be 512, 1024, 2048, 4096, 8192, 16384, 32768, or 65536 bytes.  
Should match the block size used when the backup was created to avoid performance issues.  
Most backups use the default 64KB unless created with specific block size requirements for tape devices or storage optimization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BufferCount

Number of I/O buffers SQL Server uses during the restore operation to improve throughput.  
Higher buffer counts can speed up restores for large databases, especially when reading from multiple backup files.  
Typically ranges from 2 to 64 buffers depending on available memory and restore performance requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Continue

Continues a previously started restore sequence where the database is already in RESTORING or STANDBY state.  
Use this when applying additional transaction log backups to a database that was restored WITH NORECOVERY.  
Automatically enables WithReplace to allow the operation on existing database objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AzureCredential

Name of the SQL Server credential object required to access backup files stored in Azure Blob Storage.  
The credential must already exist on the target SQL Server instance with proper access keys for the storage account.  
Required when restoring from URLs that point to Azure blob storage containers instead of local file paths.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WithReplace

Allows the restore operation to overwrite an existing database with the same name.  
Without this parameter, the restore will fail if a database with the target name already exists on the instance.  
Commonly used during database migrations, refresh operations, or when restoring over development/test databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepReplication

Preserves replication settings when restoring a database that was part of a replication topology.  
Use this when restoring a replicated database to maintain publisher, subscriber, or distributor configurations.  
Without this parameter, replication metadata is removed during the restore process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepCDC

Preserves Change Data Capture (CDC) configuration and metadata during database restore operations.  
Essential when restoring databases where CDC is actively capturing data changes for auditing or ETL processes.  
Cannot be combined with NoRecovery or StandbyDirectory parameters as CDC requires the database to be fully recovered.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PageRestore

Array of page objects from Get-DbaSuspectPage specifying corrupted pages to restore using page-level restore.  
Use this for targeted repair of specific corrupted pages without restoring the entire database.  
Each object should contain FileId and PageID properties identifying the exact pages needing restoration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExecuteAs

SQL Server login name to impersonate during the restore operation, affecting database ownership.  
When specified, the restore runs under this login context, making them the database owner.  
Typically used to ensure specific ownership patterns or when the current login lacks sufficient permissions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StopBefore

Stops the restore operation just before the specified StopMark rather than after it.  
Use this when you need to exclude a particular marked transaction from the restored database.  
Only effective when used in combination with the StopMark parameter for mark-based recovery scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -StopMark

Named transaction mark in the transaction log where the restore operation should stop.  
Use this for precise point-in-time recovery to a specific marked transaction, typically created with BEGIN TRAN WITH MARK.  
Provides more granular control than timestamp-based recovery for critical business operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StopAfterDate

DateTime value specifying that only StopMark occurrences after this date should be considered for restore termination.  
Use this when the same mark name appears multiple times in your transaction log backups.  
Ensures the restore stops at the correct instance of the mark when identical mark names exist at different times.

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

##### -WhatIf

Shows what would happen if the cmdlet runs. The cmdlet is not run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before running the cmdlet.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
