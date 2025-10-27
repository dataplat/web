---
title: "Format-DbaBackupInformation"
slug: "Format-DbaBackupInformation"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Modifies backup history metadata to prepare database restores with different names, paths, or locations"
tags:
  - "DisasterRecovery"
  - "Backup"
  - "Restore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Format-DbaBackupInformation.ps1"
bohUrl: "https://dataplat.github.io/boh#Format-DbaBackupInformation"
draft: false
---

# Format-DbaBackupInformation

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Format-DbaBackupInformation](https://github.com/dataplat/dbatools/blob/master/public/Format-DbaBackupInformation.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Format-DbaBackupInformation](https://dataplat.github.io/boh#Format-DbaBackupInformation).

## Synopsis

Modifies backup history metadata to prepare database restores with different names, paths, or locations

## Description

Takes backup history objects from Select-DbaBackupInformation and transforms them for restore scenarios where you need to change database names, file locations, or backup paths. This is essential for disaster recovery situations where you're restoring to different servers, renaming databases, or moving files to new storage locations. The function handles all the metadata transformations needed so you don't have to manually edit restore paths and database references before running Restore-DbaDatabase.

## Syntax

```powershell
Format-DbaBackupInformation
    [-BackupHistory] <Object[]>
    [[-ReplaceDatabaseName] <Object>]
    [-ReplaceDbNameInFile]
    [[-DataFileDirectory] <String>]
    [[-LogFileDirectory] <String>]
    [[-DestinationFileStreamDirectory] <String>]
    [[-DatabaseNamePrefix] <String>]
    [[-DatabaseFilePrefix] <String>]
    [[-DatabaseFileSuffix] <String>]
    [[-RebaseBackupFolder] <String>]
    [-Continue]
    [[-FileMapping] <Hashtable>]
    [[-PathSep] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $History | Format-DbaBackupInformation -ReplaceDatabaseName NewDb -ReplaceDbNameInFile
```

Changes as database name references to NewDb, both in the database name and any restore paths. Note, this will fail if the BackupHistory object contains backups for more than 1 database<br>

#####  Example:  2 

```powershell
PS C:\> $History | Format-DbaBackupInformation -ReplaceDatabaseName @{'OldB'='NewDb';'ProdHr'='DevHr'}
```

Will change all occurrences of original database name in the backup history (names and restore paths) using the mapping in the hashtable.<br>
In this example any occurrence of OldDb will be replaced with NewDb and ProdHr with DevPR<br>

#####  Example:  3 

```powershell
PS C:\> $History | Format-DbaBackupInformation -DataFileDirectory 'D:\DataFiles\' -LogFileDirectory 'E:\LogFiles\
```

This example with change the restore path for all data files (everything that is not a log file) to d:\datafiles<br>
And all Transaction Log files will be restored to E:\Logfiles<br>

#####  Example:  4 

```powershell
PS C:\> $History | Format-DbaBackupInformation -RebaseBackupFolder f:\backups
```

This example changes the location that SQL Server will look for the backups. This is useful if you've moved the backups to a different location<br>

### Required Parameters

##### -BackupHistory

Backup history objects from Select-DbaBackupInformation that contain metadata about database backups.  
Use this to pass backup information that needs to be modified for restore operations to different locations or with different names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -ReplaceDatabaseName

Changes the database name in backup history to prepare for restoring with a different name. Pass a single string to rename one database, or a hashtable to map multiple old names to new names.  
Use this when restoring databases to different environments or creating copies with new names.  
Database names in file paths are also updated, but logical file names require separate ALTER DATABASE commands after restore.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReplaceDbNameInFile

Replaces occurrences of the original database name within physical file names with the new database name.  
Use this in combination with ReplaceDatabaseName to ensure file names match the new database name and avoid confusion during restore operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DataFileDirectory

Sets the destination directory for all data files during restore. This overrides the original file locations stored in the backup.  
Use this when restoring to servers with different drive configurations or when consolidating database files to specific storage locations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LogFileDirectory

Sets the destination directory specifically for transaction log files during restore. This takes precedence over DataFileDirectory for log files only.  
Use this to place log files on separate storage from data files for performance optimization or storage management requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationFileStreamDirectory

Sets the destination directory for FileStream data files during restore. This takes precedence over DataFileDirectory for FileStream files only.  
Use this when databases contain FileStream data that needs to be stored on specific storage optimized for large file handling.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DatabaseNamePrefix

Adds a prefix to all database names during the restore operation. The prefix is applied after any name replacements from ReplaceDatabaseName.  
Use this to create standardized naming conventions like adding environment identifiers (Dev_, Test_, etc.) to restored databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DatabaseFilePrefix

Adds a prefix to the physical file names of all restored database files (both data and log files).  
Use this to avoid file name conflicts when restoring to servers that already have files with the same names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DatabaseFileSuffix

Adds a suffix to the physical file names of all restored database files (both data and log files).  
Use this to create unique file names when restoring multiple copies of the same database or to add version identifiers to restored files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RebaseBackupFolder

Changes the path where SQL Server will look for backup files during the restore operation.  
Use this when backup files have been moved to a different location since the backup was created, such as copying backups to a disaster recovery site.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Continue

Marks this as part of an ongoing restore sequence that will have additional transaction log backups applied later.  
Use this when performing point-in-time recovery scenarios where you need to restore a full backup followed by multiple log backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FileMapping

Maps specific logical file names to custom physical file paths during restore. Use hashtable format like @{'LogicalName1'='C:\NewPath\file1.mdf'}.  
Use this when you need granular control over where individual database files are restored, overriding directory-based parameters.  
Files not specified in the mapping retain their original locations, and this parameter takes precedence over all other file location settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PathSep

Specifies the path separator character for file paths. Defaults to backslash (\) for Windows.  
Use forward slash (/) when working with Linux SQL Server instances or when backup history contains Unix-style paths.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | \ |

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
