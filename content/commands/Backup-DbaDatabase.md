---
title: "Backup-DbaDatabase"
slug: "Backup-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Creates database backups with flexible destination options and enterprise backup features."
tags:
  - "DisasterRecovery"
  - "Backup"
  - "Restore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Backup-DbaDatabase"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Backup-DbaDatabase</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaDatabase.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stuart Moore (@napalmgram), stuart-moore.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates database backups with flexible destination options and enterprise backup features.

## Description

Creates full, differential, or transaction log backups for SQL Server databases with support for local file systems, Azure blob storage, and advanced backup features like compression, encryption, and striping. Handles backup validation, automatic path creation, and flexible file naming conventions to support both automated and manual backup workflows. Integrates with SQL Server's native backup infrastructure while providing PowerShell-friendly output for backup monitoring and compliance reporting. Replaces manual T-SQL backup commands with a single cmdlet that manages backup destinations, validates paths, and returns detailed backup metadata.

## Syntax

```powershell
Backup-DbaDatabase
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-Path <String[]>]
    [-FilePath <String>]
    [-IncrementPrefix]
    [-ReplaceInName]
    [-NoAppendDbNameInPath]
    [-CopyOnly]
    [-Type <String>]
    [-CreateFolder]
    [-FileCount <Int32>]
    [-CompressBackup]
    [-Checksum]
    [-Verify]
    [-MaxTransferSize <Int32>]
    [-BlockSize <Int32>]
    [-BufferCount <Int32>]
    [-AzureBaseUrl <String[]>]
    [-AzureCredential <String>]
    [-NoRecovery]
    [-BuildPath]
    [-WithFormat]
    [-Initialize]
    [-SkipTapeHeader]
    [-TimeStampFormat <String>]
    [-IgnoreFileChecks]
    [-OutputScriptOnly]
    [-EncryptionAlgorithm <String>]
    [-EncryptionCertificate <String>]
    [-Description <String>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Backup-DbaDatabase -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-Path <String[]>]
    [-FilePath <String>]
    [-IncrementPrefix]
    [-ReplaceInName]
    [-NoAppendDbNameInPath]
    [-CopyOnly]
    [-Type <String>]
    [-CreateFolder]
    [-FileCount <Int32>]
    [-CompressBackup]
    [-Checksum]
    [-Verify]
    [-MaxTransferSize <Int32>]
    [-BlockSize <Int32>]
    [-BufferCount <Int32>]
    [-AzureBaseUrl <String[]>]
    [-AzureCredential <String>]
    [-NoRecovery]
    [-BuildPath]
    [-WithFormat]
    [-Initialize]
    [-SkipTapeHeader]
    [-TimeStampFormat <String>]
    [-IgnoreFileChecks]
    [-OutputScriptOnly]
    [-EncryptionAlgorithm <String>]
    [-EncryptionCertificate <String>]
    [-Description <String>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Backup-DbaDatabase
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-Path <String[]>]
    [-FilePath <String>]
    [-IncrementPrefix]
    [-ReplaceInName]
    [-NoAppendDbNameInPath]
    [-CopyOnly]
    [-Type <String>]
    -InputObject <Object[]>
    [-CreateFolder]
    [-FileCount <Int32>]
    [-CompressBackup]
    [-Checksum]
    [-Verify]
    [-MaxTransferSize <Int32>]
    [-BlockSize <Int32>]
    [-BufferCount <Int32>]
    [-AzureBaseUrl <String[]>]
    [-AzureCredential <String>]
    [-NoRecovery]
    [-BuildPath]
    [-WithFormat]
    [-Initialize]
    [-SkipTapeHeader]
    [-TimeStampFormat <String>]
    [-IgnoreFileChecks]
    [-OutputScriptOnly]
    [-EncryptionAlgorithm <String>]
    [-EncryptionCertificate <String>]
    [-Description <String>]
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
PS C:\> Backup-DbaDatabase -SqlInstance Server1 -Database HR, Finance
```
{: data-copyable="true" data-clean-code="Backup-DbaDatabase -SqlInstance Server1 -Database HR, Finance" }

This will perform a full database backup on the databases HR and Finance on SQL Server Instance Server1 to Server1 default backup directory.<br>

#####  Example:  2 

```powershell
PS C:\> Backup-DbaDatabase -SqlInstance sql2016 -Path C:\temp -Database AdventureWorks2014 -Type Full
```
{: data-copyable="true" data-clean-code="Backup-DbaDatabase -SqlInstance sql2016 -Path C:\temp -Database AdventureWorks2014 -Type Full" }

Backs up AdventureWorks2014 to sql2016 C:\temp folder.<br>

#####  Example:  3 

```powershell
PS C:\> Backup-DbaDatabase -SqlInstance sql2016 -AzureBaseUrl https://dbatoolsaz.blob.core.windows.net/azbackups/ -AzureCredential dbatoolscred -Type Full -CreateFolder
```
{: data-copyable="true" data-clean-code="Backup-DbaDatabase -SqlInstance sql2016 -AzureBaseUrl https://dbatoolsaz.blob.core.windows.net/azbackups/ -AzureCredential dbatoolscred -Type Full -CreateFolder" }

Performs a full backup of all databases on the sql2016 instance to their own containers under the https://dbatoolsaz.blob.core.windows.net/azbackups/ container on Azure blob storage using the sql <br>
credential "dbatoolscred" registered on the sql2016 instance.<br>

#####  Example:  4 

```powershell
PS C:\> Backup-DbaDatabase -SqlInstance sql2016 -AzureBaseUrl https://dbatoolsaz.blob.core.windows.net/azbackups/  -Type Full
```
{: data-copyable="true" data-clean-code="Backup-DbaDatabase -SqlInstance sql2016 -AzureBaseUrl https://dbatoolsaz.blob.core.windows.net/azbackups/  -Type Full" }

Performs a full backup of all databases on the sql2016 instance to the https://dbatoolsaz.blob.core.windows.net/azbackups/ container on Azure blob storage using the Shared Access Signature sql <br>
credential "https://dbatoolsaz.blob.core.windows.net/azbackups" registered on the sql2016 instance.<br>

#####  Example:  5 

```powershell
PS C:\> Backup-DbaDatabase -SqlInstance Server1\Prod -Database db1 -Path \\filestore\backups\servername\instancename\dbname\backuptype -Type Full -ReplaceInName
```
{: data-copyable="true" data-clean-code="Backup-DbaDatabase -SqlInstance Server1\Prod -Database db1 -Path \\filestore\backups\servername\instancename\dbname\backuptype -Type Full -ReplaceInName" }

Performs a full backup of db1 into the folder \\filestore\backups\server1\prod\db1\Full<br>

#####  Example:  6 

```powershell
PS C:\> Backup-DbaDatabase -SqlInstance Server1\Prod -Path \\filestore\backups\servername\instancename\dbname\backuptype -FilePath dbname-backuptype-timestamp.trn -Type Log -ReplaceInName
```
{: data-copyable="true" data-clean-code="Backup-DbaDatabase -SqlInstance Server1\Prod -Path \\filestore\backups\servername\instancename\dbname\backuptype -FilePath dbname-backuptype-timestamp.trn -Type Log -ReplaceInName" }

Performs a log backup for every database. For the database db1 this would results in backup files in \\filestore\backups\server1\prod\db1\Log\db1-log-31102018.trn<br>

#####  Example:  7 

```powershell
PS C:\> Backup-DbaDatabase -SqlInstance Sql2017 -Database master -FilePath NUL
```
{: data-copyable="true" data-clean-code="Backup-DbaDatabase -SqlInstance Sql2017 -Database master -FilePath NUL" }

Performs a backup of master, but sends the output to the NUL device (ie; throws it away)<br>

#####  Example:  8 

```powershell
PS C:\> Backup-DbaDatabase -SqlInstance Sql2016 -Database stripetest -AzureBaseUrl https://az.blob.core.windows.net/sql,https://dbatools.blob.core.windows.net/sql
```
{: data-copyable="true" data-clean-code="Backup-DbaDatabase -SqlInstance Sql2016 -Database stripetest -AzureBaseUrl https://az.blob.core.windows.net/sql,https://dbatools.blob.core.windows.net/sql" }

Performs a backup of the database stripetest, striping it across the 2 Azure blob containers at https://az.blob.core.windows.net/sql and https://dbatools.blob.core.windows.net/sql, assuming that <br>
Shared Access Signature credentials for both containers exist on the source instance<br>

#####  Example:  9 

```powershell
PS C:\> Backup-DbaDatabase -SqlInstance Sql2017 -Database master -EncryptionAlgorithm AES256 -EncryptionCertificate BackupCert
```
{: data-copyable="true" data-clean-code="Backup-DbaDatabase -SqlInstance Sql2017 -Database master -EncryptionAlgorithm AES256 -EncryptionCertificate BackupCert" }

Backs up the master database using the BackupCert certificate and the AES256 algorithm.<br>

### Required Parameters

##### -SqlInstance

The SQL Server instance hosting the databases to be backed up.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from pipeline for backup operations.  
Allows piping databases from Get-DbaDatabase or other dbatools commands.  
Internal parameter primarily used for pipeline processing and automation scenarios.

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

Specifies which databases to include in the backup operation. Accepts database names, wildcards, or arrays.  
When omitted, all user databases are backed up (tempdb is automatically excluded).  
Use this to target specific databases instead of backing up the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to exclude from the backup operation. Accepts database names, wildcards, or arrays.  
Useful when you want to backup most databases but skip specific ones like test or temporary databases.  
Combined with Database parameter, exclusions are applied after inclusions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Sets the directory path where backup files will be created. Defaults to the instance's default backup location.  
Multiple paths enable striping for improved performance and overrides FileCount parameter.  
SQL Server creates missing directories automatically if it has permissions. Striped files are numbered x-of-y for set identification.

| Property | Value |
| --- | --- |
| Alias | BackupDirectory |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FilePath

Specifies the complete backup file name including extension. Only valid for single database backups.  
When omitted, files are auto-named as DatabaseName_yyyyMMddHHmm with appropriate extensions (.bak, .trn, .dif).  
Repeated use appends to the same file at incrementing positions. Use 'NUL' to discard backup output for testing.  
All paths are relative to the SQL Server instance, not the local machine running the command.

| Property | Value |
| --- | --- |
| Alias | BackupFileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncrementPrefix

Prefixes backup files with incremental numbers (1-, 2-, etc.) when striping across multiple files.  
Primarily used for Azure SQL Database platforms where this naming convention may improve restore performance.  
Only applies when FileCount is greater than 1 or multiple paths are specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ReplaceInName

Enables dynamic token replacement in file paths and names for flexible backup naming schemes.  
Replaces: instancename, servername, dbname, timestamp, backuptype with actual values.  
Essential for standardized backup naming across environments and automated backup scripts with consistent file organization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoAppendDbNameInPath

Prevents automatic database name folder creation when using CreateFolder parameter.  
By default, CreateFolder adds a database-specific subdirectory for organization.  
Use this when you want files directly in the specified path without database name folders.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CopyOnly

Creates copy-only backups that don't break the restore chain or affect log backup sequences.  
Essential for ad-hoc backups during maintenance, before major changes, or for moving databases to other environments.  
Copy-only backups don't reset differential bases or interfere with scheduled backup strategies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Type

Specifies the backup type to perform: Full, Log, Differential, or Database (same as Full).  
Log backups require full recovery model and prior full backup. Differential backups require prior full backup.  
Choose based on your recovery objectives and backup strategy requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Database |
| Accepted Values | Full,Log,Differential,Diff,Database |

##### -CreateFolder

Creates a separate subdirectory for each database within the backup path for better organization.  
Results in paths like 'BackupPath\DatabaseName\BackupFile.bak' instead of all files in one directory.  
Particularly useful for multi-database backups and maintaining organized backup directory structures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FileCount

Specifies the number of files to stripe the backup across for improved performance.  
Higher values increase backup speed but require more disk space and coordination during restores.  
Automatically overridden when multiple Path values are provided. Typically use 2-4 files for optimal performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CompressBackup

Forces backup compression when supported by SQL Server edition and version (Enterprise/Standard 2008+).  
Reduces backup file size by 50-80% but increases CPU usage during backup operations.  
When omitted, uses server default compression setting. Explicitly false disables compression entirely.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Checksum

Enables backup checksum calculation to detect backup corruption during creation and restore.  
Adds minimal overhead but provides important data integrity verification for critical backups.  
Recommended for production environments to ensure backup reliability and early corruption detection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Verify

Performs RESTORE VERIFYONLY after backup completion to confirm backup integrity and restorability.  
Adds time to backup operations but ensures backups are usable before considering the job complete.  
Critical for validating backups in automated processes and compliance requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MaxTransferSize

Controls the size of each data transfer unit during backup operations. Must be a multiple of 64KB with 4MB maximum.  
Larger values can improve performance for fast storage but may cause memory pressure.  
Automatically set to 128KB for TDE-encrypted databases with compression to avoid conflicts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BlockSize

Sets the physical block size for backup devices. Must be 0.5KB, 1KB, 2KB, 4KB, 8KB, 16KB, 32KB, or 64KB.  
Affects backup file structure and restore performance. Larger blocks may improve performance for fast storage.  
Cannot be used with Azure page blob backups (when AzureCredential is specified).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BufferCount

Specifies the number of I/O buffers allocated for the backup operation.  
More buffers can improve performance on fast storage but consume additional memory.  
SQL Server calculates optimal values automatically, so specify only when performance tuning specific scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -AzureBaseUrl

Specifies Azure blob storage container URLs for cloud backup destinations.  
Single URL required for page blobs (with AzureCredential), multiple URLs supported for block blobs with SAS.  
Requires corresponding SQL Server credentials for authentication. Limits other parameter usage to core backup options.  
Essential for backing up to Azure storage for cloud-native or hybrid SQL Server deployments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AzureCredential

Specifies the SQL Server credential name for Azure storage access key authentication.  
Creates page blob backups with automatic single-file restriction and ignores BlockSize/MaxTransferSize.  
For SAS authentication, use credentials named to match the AzureBaseUrl. Required for Azure storage access key scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoRecovery

Performs transaction log backup without truncating the log, leaving database in restoring state.  
Essential for tail-log backups during disaster recovery or before restoring to a point in time.  
Only applicable to log backups and prevents normal database operations until recovery is completed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BuildPath

Enables automatic creation of missing directory paths when SQL Server has permissions.  
By default, the function expects backup paths to exist and will fail if they don't.  
Useful for automated backup scripts where destination folders might not exist yet.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -WithFormat

Formats the backup media before writing, destroying any existing backup sets on the device.  
Automatically enables Initialize and SkipTapeHeader options for complete media initialization.  
Use when starting fresh backup sets or when media corruption requires reformatting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Initialize

Overwrites existing backup sets on the media to start a new backup set.  
Destroys all previous backups on the target files/devices but preserves media formatting.  
Use when you want to replace old backups without formatting the entire media.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SkipTapeHeader

Skips tape header information during backup operations, primarily for compatibility.  
Mainly relevant for tape devices and legacy backup scenarios.  
Automatically enabled with WithFormat parameter for proper media initialization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -TimeStampFormat

Customizes the timestamp format used in auto-generated backup file names. Defaults to yyyyMMddHHmm.  
Must use valid Get-Date format strings (e.g., 'yyyy-MM-dd_HH-mm-ss' for readable timestamps).  
Applied when FilePath is not specified and ReplaceInName contains 'timestamp' placeholder.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IgnoreFileChecks

Skips path validation checks before backup operations, useful when SQL Server has limited filesystem access.  
Bypasses safety checks that normally prevent backup failures due to permissions or missing paths.  
Use with caution as it may result in backup failures that could have been prevented.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -OutputScriptOnly

Generates and returns the T-SQL BACKUP commands without executing them.  
Useful for reviewing backup commands, incorporating into scripts, or troubleshooting backup parameter combinations.  
No actual backup operations occur and no paths are created when using this option.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -EncryptionAlgorithm

Specifies the encryption algorithm for backup encryption: AES128, AES192, AES256, or TRIPLEDES.  
Requires either EncryptionCertificate or EncryptionKey for the encryption process.  
AES256 recommended for maximum security, though it may impact backup performance on older hardware.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | AES128,AES192,AES256,TRIPLEDES |

##### -EncryptionCertificate

Specifies the certificate name in the master database for backup encryption.  
Certificate existence is validated before backup begins to prevent failures mid-operation.  
Mutually exclusive with EncryptionKey. Essential for protecting sensitive data in backup files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Description

Adds a description to the backup set metadata for documentation and identification purposes.  
Limited to 255 characters and stored in MSDB backup history for backup set identification.  
Useful for tracking backup purposes, change sets, or special circumstances around the backup timing.

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
