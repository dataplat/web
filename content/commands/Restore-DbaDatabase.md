---
title: "Restore-DbaDatabase"
slug: "Restore-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Restores SQL Server databases from backup files with intelligent backup chain selection and point-in-time recovery."
tags:
  - "DisasterRecovery"
  - "Backup"
  - "Restore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Restore-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Restore-DbaDatabase"
draft: false
---

# Restore-DbaDatabase

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Restore-DbaDatabase](https://github.com/dataplat/dbatools/blob/master/public/Restore-DbaDatabase.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Restore-DbaDatabase](https://dataplat.github.io/boh#Restore-DbaDatabase).

## Synopsis

Restores SQL Server databases from backup files with intelligent backup chain selection and point-in-time recovery.

## Description

Scans backup files and automatically selects the optimal restore sequence to recover databases to a specific point in time.  
This function handles the complex task of building complete backup chains from full, differential, and transaction log backups,  
so you don't have to manually determine which files are needed or in what order to restore them.  
  
The function excels at disaster recovery scenarios where you need to quickly restore from a collection of backup files.  
It validates backup headers, ensures restore chains are complete, and can recover to any point in time within your backup coverage.  
Whether restoring from local files, network shares, or Azure blob storage, it automatically handles file discovery and validation.  
  
By default, all file paths must be accessible to the target SQL Server instance. The function uses xp_dirtree for remote file scanning  
and supports various input methods including direct file lists, folder scanning, and pipeline input from other dbatools commands.  
It integrates seamlessly with Ola Hallengren's maintenance solution backup structures for faster processing.

## Syntax

```powershell
Restore-DbaDatabase -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    -Path <Object[]>
    [-DatabaseName <Object[]>]
    [-DestinationDataDirectory <String>]
    [-DestinationLogDirectory <String>]
    [-DestinationFileStreamDirectory <String>]
    [-RestoreTime <DateTime>]
    [-NoRecovery]
    [-WithReplace]
    [-KeepReplication]
    [-XpDirTree]
    [-NoXpDirRecurse]
    [-OutputScriptOnly]
    [-VerifyOnly]
    [-MaintenanceSolutionBackup]
    [-FileMapping <Hashtable>]
    [-IgnoreLogBackup]
    [-IgnoreDiffBackup]
    [-UseDestinationDefaultDirectories]
    [-ReuseSourceFolderStructure]
    [-DestinationFilePrefix <String>]
    [-RestoredDatabaseNamePrefix <String>]
    [-TrustDbBackupHistory]
    [-MaxTransferSize <Int32>]
    [-BlockSize <Int32>]
    [-BufferCount <Int32>]
    [-DirectoryRecurse]
    [-EnableException]
    [-StandbyDirectory <String>]
    [-Continue]
    [-ExecuteAs <String>]
    [-AzureCredential <String>]
    [-ReplaceDbNameInFile]
    [-DestinationFileSuffix <String>]
    [-KeepCDC]
    [-GetBackupInformation <String>]
    [-StopAfterGetBackupInformation]
    [-SelectBackupInformation <String>]
    [-StopAfterSelectBackupInformation]
    [-FormatBackupInformation <String>]
    [-StopAfterFormatBackupInformation]
    [-TestBackupInformation <String>]
    [-StopAfterTestBackupInformation]
    [-StopBefore]
    [-StopMark <String>]
    [-StopAfterDate <DateTime>]
    [-StatementTimeout <Int32>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Restore-DbaDatabase -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    -Path <Object[]>
    [-DatabaseName <Object[]>]
    [-OutputScriptOnly]
    [-TrustDbBackupHistory]
    [-MaxTransferSize <Int32>]
    [-BlockSize <Int32>]
    [-BufferCount <Int32>]
    [-EnableException]
    [-AzureCredential <String>]
    [-GetBackupInformation <String>]
    [-StopAfterGetBackupInformation]
    [-SelectBackupInformation <String>]
    [-StopAfterSelectBackupInformation]
    [-FormatBackupInformation <String>]
    [-StopAfterFormatBackupInformation]
    [-TestBackupInformation <String>]
    [-StopAfterTestBackupInformation]
    -PageRestore <Object>
    -PageRestoreTailFolder <String>
    [-StopBefore]
    [-StopMark <String>]
    [-StopAfterDate <DateTime>]
    [-StatementTimeout <Int32>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Restore-DbaDatabase -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    [-DatabaseName <Object[]>]
    [-OutputScriptOnly]
    [-EnableException]
    [-AzureCredential <String>]
    [-Recover]
    [-GetBackupInformation <String>]
    [-StopAfterGetBackupInformation]
    [-SelectBackupInformation <String>]
    [-StopAfterSelectBackupInformation]
    [-FormatBackupInformation <String>]
    [-StopAfterFormatBackupInformation]
    [-TestBackupInformation <String>]
    [-StopAfterTestBackupInformation]
    [-StopBefore]
    [-StopMark <String>]
    [-StopAfterDate <DateTime>]
    [-StatementTimeout <Int32>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Restore-DbaDatabase -SqlInstance server1\instance1 -Path \\server2\backups
```

Scans all the backup files in \\server2\backups, filters them and restores the database to server1\instance1<br>

#####  Example:  2 

```powershell
PS C:\> Restore-DbaDatabase -SqlInstance server1\instance1 -Path \\server2\backups -MaintenanceSolutionBackup -DestinationDataDirectory c:\restores
```

Scans all the backup files in \\server2\backups$ stored in an Ola Hallengren style folder structure,<br>
filters them and restores the database to the c:\restores folder on server1\instance1<br>

#####  Example:  3 

```powershell
PS C:\> Get-ChildItem c:\SQLbackups1\, \\server\sqlbackups2 | Restore-DbaDatabase -SqlInstance server1\instance1
```

Takes the provided files from multiple directories and restores them on  server1\instance1<br>

#####  Example:  4 

```powershell
PS C:\> $RestoreTime = Get-Date('11:19 23/12/2016')
PS C:\> Restore-DbaDatabase -SqlInstance server1\instance1 -Path \\server2\backups -MaintenanceSolutionBackup -DestinationDataDirectory c:\restores -RestoreTime $RestoreTime
```

Scans all the backup files in \\server2\backups stored in an Ola Hallengren style folder structure,<br>
filters them and restores the database to the c:\restores folder on server1\instance1 up to 11:19 23/12/2016<br>

#####  Example:  5 

```powershell
PS C:\> $result = Restore-DbaDatabase -SqlInstance server1\instance1 -Path \\server2\backups -DestinationDataDirectory c:\restores -OutputScriptOnly
PS C:\> $result | Out-File -Filepath c:\scripts\restore.sql
```

Scans all the backup files in \\server2\backups, filters them and generate the T-SQL Scripts to restore the database to the latest point in time, and then stores the output in a file for later <br>
retrieval<br>

#####  Example:  6 

```powershell
PS C:\> Restore-DbaDatabase -SqlInstance server1\instance1 -Path c:\backups -DestinationDataDirectory c:\DataFiles -DestinationLogDirectory c:\LogFile
```

Scans all the files in c:\backups and then restores them onto the SQL Server Instance server1\instance1, placing data files<br>
c:\DataFiles and all the log files into c:\LogFiles<br>

#####  Example:  7 

```powershell
PS C:\> Restore-DbaDatabase -SqlInstance server1\instance1 -Path http://demo.blob.core.windows.net/backups/dbbackup.bak -AzureCredential MyAzureCredential
```

Will restore the backup held at  http://demo.blob.core.windows.net/backups/dbbackup.bak to server1\instance1. The connection to Azure will be made using the<br>
credential MyAzureCredential held on instance Server1\instance1<br>

#####  Example:  8 

```powershell
PS C:\> Restore-DbaDatabase -SqlInstance server1\instance1 -Path http://demo.blob.core.windows.net/backups/dbbackup.bak
```

Will attempt to restore the backups from http://demo.blob.core.windows.net/backups/dbbackup.bak if a SAS credential with the name http://demo.blob.core.windows.net/backups exists on server1\instance1<br>

#####  Example:  9 

```powershell
PS C:\> $File = Get-ChildItem c:\backups, \\server1\backups
PS C:\> $File | Restore-DbaDatabase -SqlInstance Server1\Instance -UseDestinationDefaultDirectories
```

This will take all of the files found under the folders c:\backups and \\server1\backups, and pipeline them into<br>
Restore-DbaDatabase. Restore-DbaDatabase will then scan all of the files, and restore all of the databases included<br>
to the latest point in time covered by their backups. All data and log files will be moved to the default SQL Server<br>
folder for those file types as defined on the target instance.<br>

#####  Example:  10 

```powershell
PS C:\> $files = Get-ChildItem C:\dbatools\db1
PS C:\> $params = @{
>> SqlInstance = 'server\instance1'
>> DestinationFilePrefix = 'prefix'
>> DatabaseName ='Restored'
>> RestoreTime = (get-date "14:58:30 22/05/2017")
>> NoRecovery = $true
>> WithReplace = $true
>> StandbyDirectory = 'C:\dbatools\standby'
>> }
>>
PS C:\> $files | Restore-DbaDatabase @params
PS C:\> Invoke-DbaQuery -SQLInstance server\instance1 -Query "select top 1 * from Restored.dbo.steps order by dt desc"
PS C:\> $params.RestoreTime = (get-date "15:09:30 22/05/2017")
PS C:\> $params.NoRecovery = $false
PS C:\> $params.Add("Continue",$true)
PS C:\> $files | Restore-DbaDatabase @params
PS C:\> Invoke-DbaQuery -SQLInstance server\instance1 -Query "select top 1 * from Restored.dbo.steps order by dt desc"
PS C:\> Restore-DbaDatabase -SqlInstance server\instance1 -DestinationFilePrefix prefix -DatabaseName Restored -Continue -WithReplace
```

In this example we step through the backup files held in c:\dbatools\db1 folder.<br>
First we restore the database to a point in time in standby mode. This means we can check some details in the databases<br>
We then roll it on a further 9 minutes to perform some more checks<br>
And finally we continue by rolling it all the way forward to the latest point in the backup.<br>
At each step, only the log files needed to roll the database forward are restored.<br>

#####  Example:  11 

```powershell
PS C:\> Restore-DbaDatabase -SqlInstance server\instance1 -Path c:\backups -DatabaseName example1 -NoRecovery
PS C:\> Restore-DbaDatabase -SqlInstance server\instance1 -Recover -DatabaseName example1
```

In this example we restore example1 database with no recovery, and then the second call is to set the database to recovery.<br>

#####  Example:  12 

```powershell
PS C:\> $SuspectPage = Get-DbaSuspectPage -SqlInstance server\instance1 -Database ProdFinance
PS C:\> Get-DbaDbBackupHistory -SqlInstance server\instance1 -Database ProdFinance -Last | Restore-DbaDatabase -PageRestore $SuspectPage -PageRestoreTailFolder c:\temp -TrustDbBackupHistory
```

Gets a list of Suspect Pages using Get-DbaSuspectPage. Then uses Get-DbaDbBackupHistory and Restore-DbaDatabase to perform a restore of the suspect pages and bring them up to date<br>
If server\instance1 is Enterprise edition this will be done online, if not it will be performed offline<br>

#####  Example:  13 

```powershell
PS C:\> $BackupHistory = Get-DbaBackupInformation -SqlInstance sql2005 -Path \\backups\sql2000\ProdDb
PS C:\> $BackupHistory | Restore-DbaDatabase -SqlInstance sql2000 -TrustDbBackupHistory
```

Due to SQL Server 2000 not returning all the backup headers we cannot restore directly. As this is an issues with the SQL engine all we can offer is the following workaround<br>
This will use a SQL Server instance > 2000 to read the headers, and then pass them in to Restore-DbaDatabase as a BackupHistory object.<br>

#####  Example:  14 

```powershell
PS C:\> Restore-DbaDatabase -SqlInstance server1\instance1 -Path "C:\Temp\devops_prod_full.bak" -DatabaseName "DevOps_DEV" -ReplaceDbNameInFile
PS C:\> Rename-DbaDatabase -SqlInstance server1\instance1 -Database "DevOps_DEV" -LogicalName "<DBN>_<FT>"
```

This will restore the database from the "C:\Temp\devops_prod_full.bak" file, with the new name "DevOps_DEV" and store the different physical files with the new name. It will use the system default <br>
configured data and log locations.<br>
After the restore the logical names of the database files will be renamed with the "DevOps_DEV_ROWS" for MDF/NDF and "DevOps_DEV_LOG" for LDF<br>

#####  Example:  15 

```powershell
PS C:\> $FileStructure = @{
>> 'database_data' = 'C:\Data\database_data.mdf'
>> 'database_log' = 'C:\Log\database_log.ldf'
>> }
>>
PS C:\> Restore-DbaDatabase -SqlInstance server1 -Path \\ServerName\ShareName\File -DatabaseName database -FileMapping $FileStructure
```

Restores 'database' to 'server1' and moves the files to new locations. The format for the $FileStructure HashTable is the file logical name as the Key, and the new location as the Value.<br>

#####  Example:  16 

```powershell
PS C:\> $filemap = Get-DbaDbFileMapping -SqlInstance sql2016 -Database test
PS C:\> Get-ChildItem \\nas\db\backups\test | Restore-DbaDatabase -SqlInstance sql2019 -Database test -FileMapping $filemap.FileMapping
```

Restores test to sql2019 using the file structure built from the existing database on sql2016<br>

#####  Example:  17 

```powershell
PS C:\> Restore-DbaDatabase -SqlInstance server1 -Path \\ServerName\ShareName\File -DatabaseName database -StopMark OvernightStart -StopBefore -StopAfterDate Get-Date('21:00 10/05/2020')
```

Restores the backups from \\ServerName\ShareName\File as database, stops before the first 'OvernightStart' mark that occurs after '21:00 10/05/2020'.<br>
Note that Date time needs to be specified in your local SQL Server culture<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the location of backup files to restore from, supporting local drives, UNC paths, or Azure blob storage URLs.  
Use this when you need to restore from a specific backup location or when piping backup files from Get-ChildItem.  
Accepts multiple comma-separated paths for complex restore scenarios spanning multiple locations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -PageRestore

Performs targeted restoration of specific damaged pages using output from Get-DbaSuspectPages.  
Use this for repairing isolated page corruption without restoring the entire database.  
Enterprise Edition enables online page restore while Standard Edition requires the database offline during repair.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -PageRestoreTailFolder

Specifies where to create the tail log backup required for page restore operations.  
Use this to designate a safe location for the automatic tail log backup that page restore creates.  
The folder must be accessible to the SQL Server service account and have sufficient space for the tail log backup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -DatabaseName

Defines the target database name for the restored database when different from the original name.  
Use this when creating a copy of a production database for testing or when restoring to avoid name conflicts.  
Required when restoring a single database to a different name than what's stored in the backup files.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -DestinationDataDirectory

Sets the target directory path where data files (.mdf, .ndf) will be restored on the destination instance.  
Use this when you need to restore to a different drive or storage location than the original database.  
When specified alone, log files will also be placed here unless DestinationLogDirectory is provided.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationLogDirectory

Defines the target directory for transaction log files (.ldf) separate from data files.  
Use this to follow best practices by placing log files on different drives for performance and disaster recovery.  
Must be used together with DestinationDataDirectory for proper file separation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationFileStreamDirectory

Specifies where FILESTREAM data containers will be restored, separate from regular database files.  
Use this when your database contains FILESTREAM data and you need to place it on specific storage.  
Requires DestinationDataDirectory to be specified and the target instance to have FILESTREAM enabled.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreTime

Sets the point-in-time recovery target for restoring the database to a specific moment.  
Use this for recovering from logical errors, unwanted changes, or data corruption that occurred at a known time.  
Requires a complete backup chain including transaction logs covering the specified time period.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-Date).AddYears(1) |

##### -NoRecovery

Leaves the database in a restoring state to allow additional transaction log restores or log shipping setup.  
Use this when you need to apply additional log backups, set up availability groups, or prepare for continuous log shipping.  
The database will remain inaccessible until recovered with the RESTORE WITH RECOVERY statement.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -WithReplace

Allows overwriting an existing database with the same name during the restore operation.  
Use this when you need to refresh a test environment or replace a corrupted database with a backup.  
Essential for disaster recovery scenarios where you're restoring over a damaged database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepReplication

Maintains replication settings and objects when restoring databases involved in replication topologies.  
Use this when restoring publisher or subscriber databases where you need to preserve replication configuration.  
Essential for disaster recovery scenarios involving replicated databases to avoid reconfiguring publications and subscriptions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -XpDirTree

Forces backup file discovery to use SQL Server's xp_dirtree instead of PowerShell file system access.  
Use this when backup files are on network shares that PowerShell cannot access but SQL Server can.  
Requires sysadmin privileges and may be needed for environments with strict network security policies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoXpDirRecurse

If specified, prevents the XpDirTree process from recursing (its default behaviour).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -OutputScriptOnly

Generates the T-SQL RESTORE statements without executing them, allowing for script review or manual execution.  
Use this to validate restore commands, create deployment scripts, or when you need approval before running restores.  
Helpful for compliance environments where all database changes must be reviewed before execution.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -VerifyOnly

Validates backup files and restore paths without performing the actual restore operation.  
Use this to test backup file integrity, verify backup chains are complete, and confirm restore feasibility.  
Essential for disaster recovery planning and backup validation routines without impacting production systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MaintenanceSolutionBackup

Optimizes backup file scanning for Ola Hallengren's Maintenance Solution folder structure.  
Use this when your backups follow the standard Ola Hallengren folder layout with separate FULL, DIFF, and LOG subdirectories.  
Significantly improves performance by using predictable file locations rather than reading every backup header.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FileMapping

Provides precise control over where individual database files are restored using logical file names.  
Use this when you need granular file placement, such as putting specific filegroups on different drives for performance.  
Create a hashtable mapping logical names to physical paths: @{'DataFile1'='C:\Data\File1.mdf'; 'LogFile1'='D:\Logs\File1.ldf'}

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -IgnoreLogBackup

Excludes transaction log backups from the restore operation, stopping at the latest full or differential backup.  
Use this when you only need to restore to a recent backup checkpoint rather than the latest point in time.  
Useful for creating a baseline copy of a database without applying the most recent transactions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IgnoreDiffBackup

Skips differential backups and restores using only full backups plus transaction logs.  
Use this when differential backups are corrupted or when you need to restore using a specific full backup as the baseline.  
Results in longer restore times as all transaction log backups since the full backup must be applied.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -UseDestinationDefaultDirectories

Places restored database files in the SQL Server instance's default data and log directories.  
Use this when you want to follow the target instance's standard file location configuration.  
The function will attempt to create directories if they don't exist, ensuring consistent file placement.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ReuseSourceFolderStructure

Maintains the original database file directory structure from the source server during restore.  
Use this when migrating between servers that share similar drive layouts or when preserving application-specific paths.  
Consider version differences in SQL Server default paths (MSSQL12, MSSQL13, etc.) when restoring between versions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DestinationFilePrefix

This value will be prefixed to ALL restored files (log and data). This is just a simple string prefix.  
If you want to perform more complex rename operations then please use the FileMapping parameter.  
This will apply to all file move options, except for FileMapping.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoredDatabaseNamePrefix

A string which will be prefixed to the start of the restore Database's Name.  
Useful if restoring a copy to the same sql server for testing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TrustDbBackupHistory

Bypasses backup header validation when using piped input from Get-DbaDbBackupHistory or similar commands.  
Use this to significantly speed up restores when you're confident in the backup chain integrity.  
Trades verification safety for performance - backup file issues won't be detected until the restore attempt.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MaxTransferSize

Controls the size of each data transfer between storage and SQL Server during restore operations.  
Use this to optimize restore performance based on your storage subsystem characteristics.  
Must be a multiple of 64KB with higher values potentially improving performance on high-speed storage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BlockSize

Defines the physical block size used for backup file reading during restore operations.  
Use this to match the block size used during backup creation for optimal performance.  
Valid values: 0.5KB, 1KB, 2KB, 4KB, 8KB, 16KB, 32KB, or 64KB, with larger blocks typically faster on modern storage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BufferCount

Sets the number of I/O buffers SQL Server uses for the restore operation to improve throughput.  
Use this to optimize restore performance by allowing more parallel I/O operations.  
Higher values can improve performance but consume more memory - typically set between 2-64 based on available RAM.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -DirectoryRecurse

If specified the specified directory will be recursed into (overriding the default behaviour).

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

##### -StandbyDirectory

Places restored databases in STANDBY mode with undo files created in the specified directory.  
Use this for log shipping secondary servers or when you need read-only access during restore operations.  
The directory must exist and be writable by the SQL Server service account for undo file creation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Continue

Resumes log restore operations on databases currently in RESTORING or STANDBY states.  
Use this to apply additional transaction log backups to advance the recovery point of an existing restore chain.  
Essential for log shipping scenarios or when performing point-in-time recovery in multiple steps.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExecuteAs

If value provided the restore will be executed under this login's context. The login must exist, and have the relevant permissions to perform the restore.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AzureCredential

Specifies the SQL Server credential name for authenticating to Azure blob storage during restore operations.  
Use this when restoring from Azure blob storage backups that require authentication beyond SAS tokens.  
The credential must be created on the SQL Server instance with the appropriate storage account access keys.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReplaceDbNameInFile

Substitutes the original database name with the new DatabaseName in physical file names during restore.  
Use this when restoring databases with descriptive file names to maintain naming consistency.  
Requires DatabaseName parameter and helps avoid confusing file names like "Production_Data.mdf" in test environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DestinationFileSuffix

This value will be suffixed to ALL restored files (log and data). This is just a simple string suffix.  
If you want to perform more complex rename operations then please use the FileMapping parameter.  
This will apply to all file move options, except for FileMapping.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Recover

Brings databases currently in RESTORING state online by executing RESTORE WITH RECOVERY.  
Use this to complete restore operations that were left in NoRecovery state or to finalize standby databases.  
Makes previously inaccessible databases available for normal read/write operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepCDC

Preserves Change Data Capture (CDC) configuration and data during the restore operation.  
Use this when restoring databases with CDC enabled and you need to maintain change tracking functionality.  
Cannot be combined with NoRecovery or Standby modes as CDC requires the database to be fully recovered.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -GetBackupInformation

Passing a string value into this parameter will cause a global variable to be created holding the output of Get-DbaBackupInformation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StopAfterGetBackupInformation

Switch which will cause the function to exit after returning GetBackupInformation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SelectBackupInformation

Passing a string value into this parameter will cause a global variable to be created holding the output of Select-DbaBackupInformation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StopAfterSelectBackupInformation

Switch which will cause the function to exit after returning SelectBackupInformation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FormatBackupInformation

Passing a string value into this parameter will cause a global variable to be created holding the output of Format-DbaBackupInformation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StopAfterFormatBackupInformation

Switch which will cause the function to exit after returning FormatBackupInformation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -TestBackupInformation

Passing a string value into this parameter will cause a global variable to be created holding the output of Test-DbaBackupInformation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StopAfterTestBackupInformation

Switch which will cause the function to exit after returning TestBackupInformation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -StopBefore

Switch to indicate the restore should stop before StopMark occurs, default is to stop when mark is created.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -StopMark

Marked point in the transaction log to stop the restore at (Mark is created via BEGIN TRANSACTION   
(https://docs.microsoft.com/en-us/sql/t-sql/language-elements/begin-transaction-transact-sql?view=sql-server-ver15)).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StopAfterDate

By default the restore will stop at the first occurence of StopMark found in the chain, passing a datetime where will cause it to stop the first StopMark atfer that datetime.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-Date '01/01/1971') |

##### -StatementTimeout

Sets the maximum time in minutes to wait for restore operations before timing out.  
Use this to prevent extremely long-running restores from hanging indefinitely in automated scripts.  
Defaults to unlimited since large database restores can take hours depending on size and storage speed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -WhatIf

Shows what would happen if the command would execute, but does not actually perform the command.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts to confirm certain actions.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
