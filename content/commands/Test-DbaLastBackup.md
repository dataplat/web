---
title: "Test-DbaLastBackup"
slug: "Test-DbaLastBackup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Quickly and easily tests the last set of full backups for a server."
tags:
  - "DisasterRecovery"
  - "Backup"
  - "Restore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaLastBackup.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaLastBackup"
draft: false
---

# Test-DbaLastBackup

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaLastBackup](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaLastBackup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaLastBackup](https://dataplat.github.io/boh#Test-DbaLastBackup).

## Synopsis

Quickly and easily tests the last set of full backups for a server.

## Description

Restores all or some of the latest backups and performs a DBCC CHECKDB.  
  
1. Gathers information about the last full backups  
2. Restores the backups to the Destination with a new name. If no Destination is specified, the originating SQL Server instance wil be used.  
3. The database is restored as "dbatools-testrestore-$databaseName" by default, but you can change dbatools-testrestore to whatever you would like using -Prefix  
4. The internal file names are also renamed to prevent conflicts with original database  
5. A DBCC CHECKDB is then performed  
6. And the test database is finally dropped

## Syntax

```powershell
Test-DbaLastBackup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Destination] <DbaInstanceParameter>]
    [[-DestinationSqlCredential] <Object>]
    [[-DataDirectory] <String>]
    [[-LogDirectory] <String>]
    [[-FileStreamDirectory] <String>]
    [[-Prefix] <String>]
    [-VerifyOnly]
    [-NoCheck]
    [-NoDrop]
    [-CopyFile]
    [[-CopyPath] <String>]
    [[-MaxSize] <Int32>]
    [[-DeviceType] <String[]>]
    [-IncludeCopyOnly]
    [-IgnoreLogBackup]
    [[-AzureCredential] <String>]
    [[-InputObject] <Database[]>]
    [[-MaxTransferSize] <Int32>]
    [[-BufferCount] <Int32>]
    [-IgnoreDiffBackup]
    [[-MaxDop] <Int32>]
    [-ReuseSourceFolderStructure]
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
PS C:\> Test-DbaLastBackup -SqlInstance sql2016
```

Determines the last full backup for ALL databases, attempts to restore all databases (with a different name and file structure), then performs a DBCC CHECKDB. Once the test is complete, the test <br>
restore will be dropped.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaLastBackup -SqlInstance sql2016 -Database SharePoint_Config
```

Determines the last full backup for SharePoint_Config, attempts to restore it, then performs a DBCC CHECKDB.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016, sql2017 | Test-DbaLastBackup
```

Tests every database backup on sql2016 and sql2017<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016, sql2017 -Database SharePoint_Config | Test-DbaLastBackup
```

Tests the database backup for the SharePoint_Config database on sql2016 and sql2017<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaLastBackup -SqlInstance sql2016 -Database model, master -VerifyOnly
```

Skips performing an action restore of the database and simply verifies the backup using VERIFYONLY option of the restore.<br>

#####  Example:  6 

```powershell
PS C:\> Test-DbaLastBackup -SqlInstance sql2016 -NoCheck -NoDrop
```

Skips the DBCC CHECKDB check. This can help speed up the tests but makes it less tested. The test restores will remain on the server.<br>

#####  Example:  7 

```powershell
PS C:\> Test-DbaLastBackup -SqlInstance sql2016 -DataDirectory E:\bigdrive -LogDirectory L:\bigdrive -MaxSize 10240
```

Restores data and log files to alternative locations and only restores databases that are smaller than 10 GB.<br>

#####  Example:  8 

```powershell
PS C:\> Test-DbaLastBackup -SqlInstance sql2014 -Destination sql2016 -CopyFile
```

Copies the backup files for sql2014 databases to sql2016 default backup locations and then attempts restore from there.<br>

#####  Example:  9 

```powershell
PS C:\> Test-DbaLastBackup -SqlInstance sql2014 -Destination sql2016 -CopyFile -CopyPath "\\BackupShare\TestRestore\"
```

Copies the backup files for sql2014 databases to sql2016 default backup locations and then attempts restore from there.<br>

#####  Example:  10 

```powershell
PS C:\> Test-DbaLastBackup -SqlInstance sql2016 -NoCheck -MaxTransferSize 4194302 -BufferCount 24
```

Determines the last full backup for ALL databases, attempts to restore all databases (with a different name and file structure).<br>
The Restore will use more memory for reading the backup files. Do not set these values to high or you can get an Out of Memory error!!!<br>
When running the restore with these additional parameters and there is other server activity it could affect server OLTP performance. Please use with caution.<br>
Prior to running, you should check memory and server resources before configure it to run automatically.<br>
More information:<br>
https://www.mssqltips.com/sqlservertip/4935/optimize-sql-server-database-restore-performance/<br>

#####  Example:  11 

```powershell
PS C:\> Test-DbaLastBackup -SqlInstance sql2016 -MaxDop 4
```

The use of the MaxDop parameter will limit the number of processors used during the DBCC command<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Unlike many of the other commands, you cannot specify more than one server.

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

Specifies which databases to include in the backup test. Accepts wildcards for pattern matching.  
Use this to limit testing to specific databases instead of all databases on the instance.  
Helpful when you only want to verify critical databases or troubleshoot specific backup issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude from backup testing. Accepts wildcards for pattern matching.  
Use this to skip non-critical databases, large databases, or databases with known backup issues.  
Commonly used to exclude system databases or databases that would take too long to test.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Destination

Specifies the SQL Server instance where test restores will be performed. Defaults to the source server if not specified.  
Use this when you want to test restores on a different server, such as isolating test operations from production workloads.  
When using a different destination server, backup files must be accessible from that server via shared storage or use -CopyFile.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance when different from the source.  
Use this when the destination server requires different authentication than the source server.  
Accepts PowerShell credentials (Get-Credential) and supports Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DataDirectory

Specifies the directory where restored database data files (.mdf, .ndf) will be placed. Defaults to the SQL Server's default data directory.  
Use this when you need to direct test restores to specific storage, such as faster drives for testing or isolated storage locations.  
The SQL Server service account must have write permissions to this directory.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LogDirectory

Specifies the directory where restored database log files (.ldf) will be placed. Defaults to the SQL Server's default log directory.  
Use this when you want to separate test database logs from production logs or direct them to faster storage for testing.  
The SQL Server service account must have write permissions to this directory.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileStreamDirectory

Specifies the directory where FileStream data will be restored for databases that use FileStream storage.  
Use this when testing databases with FileStream-enabled tables to ensure the FileStream data is properly restored and accessible.  
Required only for databases that contain FileStream data and when not using -ReuseSourceFolderStructure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Prefix

Specifies the naming prefix for test databases. Defaults to 'dbatools-testrestore-' resulting in names like 'dbatools-testrestore-MyDB'.  
Use this to customize test database naming for organizational standards or to avoid naming conflicts.  
Choose prefixes that clearly identify databases as temporary test restores.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbatools-testrestore- |

##### -VerifyOnly

Performs backup verification only without actually restoring the database. Uses T-SQL RESTORE VERIFYONLY command.  
Use this for faster backup validation when you only need to confirm backup file integrity without full restore testing.  
Skips DBCC CHECKDB since no actual database is restored.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoCheck

Skips the DBCC CHECKDB operation after restoring the test database.  
Use this to speed up the testing process when you only need to verify that backups can be restored successfully.  
Reduces testing time but provides less thorough validation of database integrity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoDrop

Prevents the test database from being automatically dropped after the test completes.  
Use this when you need to examine the restored database manually or perform additional testing.  
Remember to manually clean up test databases later to avoid storage issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CopyFile

Copies backup files to the destination server's default backup directory before attempting the restore.  
Use this when backup files are not accessible from the destination server, such as local backups on different servers.  
Cannot be used with Azure SQL Database backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CopyPath

Specifies the destination directory where backup files will be copied when using -CopyFile. Defaults to the destination server's default backup directory.  
Use this to control where backup files are temporarily stored during testing, such as directing them to faster storage.  
Path must be accessible to the destination SQL Server service account.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaxSize

Maximum database size in MB. Databases with backups larger than this value will be skipped.  
Use this to avoid testing extremely large databases that would consume excessive time or storage resources.  
Helps focus testing on databases that can be practically tested within available resources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -DeviceType

Filters backups by device type such as 'Disk', 'Tape', or 'Virtual Device'. Accepts multiple values.  
Use this when you need to test only backups from specific backup devices or exclude certain device types.  
Commonly used to test only disk backups or exclude tape backups that may be offline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeCopyOnly

Includes copy-only backups when determining the most recent backup to test.  
Use this when you want to test copy-only backups that were created for specific purposes like migrations or testing.  
Copy-only backups don't break the backup chain but are normally excluded from 'last backup' queries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IgnoreLogBackup

Skips transaction log backups during restore, stopping at the most recent full or differential backup.  
Use this for faster testing when point-in-time recovery precision isn't critical for the test.  
Results in some data loss compared to a complete restore chain but significantly reduces testing time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AzureCredential

Specifies the name of the SQL Server credential that contains the key for accessing Azure Storage where backups are stored.  
Use this when testing backups stored in Azure Blob Storage that require credential-based authentication.  
The credential must already exist on the destination SQL Server instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline processing.  
Use this to test backups for databases selected through Get-DbaDatabase filtering options.  
Enables complex database selection scenarios beyond simple name matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -MaxTransferSize

Sets the data transfer unit size for backup restoration. Must be a multiple of 64KB with a maximum of 4GB.  
Use this to optimize restore performance by increasing buffer size, especially for large databases on high-speed storage.  
Higher values can improve performance but consume more memory during the restore operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BufferCount

Specifies the number of I/O buffers used during the restore operation.  
Use this to optimize restore performance by controlling memory allocation for the restore process.  
Higher values can improve performance but consume more memory, so balance against other server activity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -IgnoreDiffBackup

Skips differential backups during restore, using only full and transaction log backups.  
Use this to test restore scenarios that don't rely on differential backups or when differential backups are suspected to be problematic.  
May significantly increase restore time due to processing more transaction log backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MaxDop

Sets the maximum degree of parallelism for the DBCC CHECKDB operation. Limits the number of parallel processes used.  
Use this to control resource usage during integrity checks, especially on busy servers or when testing multiple databases.  
Lower values reduce CPU usage but increase DBCC runtime.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -ReuseSourceFolderStructure

Maintains the original file paths and directory structure from the source database during restore.  
Use this when testing databases that have specific file location requirements or when simulating exact production restore scenarios.  
Ensures the destination server has the same directory structure as the source or the restore will fail.

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
