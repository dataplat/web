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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Format-DbaBackupInformation</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Format-DbaBackupInformation.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="$History | Format-DbaBackupInformation -ReplaceDatabaseName NewDb -ReplaceDbNameInFile" }

Changes as database name references to NewDb, both in the database name and any restore paths. Note, this will fail if the BackupHistory object contains backups for more than 1 database<br>

#####  Example:  2 

```powershell
PS C:\> $History | Format-DbaBackupInformation -ReplaceDatabaseName @{'OldB'='NewDb';'ProdHr'='DevHr'}
```
{: data-copyable="true" data-clean-code="$History | Format-DbaBackupInformation -ReplaceDatabaseName @{'OldB'='NewDb';'ProdHr'='DevHr'}" }

Will change all occurrences of original database name in the backup history (names and restore paths) using the mapping in the hashtable.<br>
In this example any occurrence of OldDb will be replaced with NewDb and ProdHr with DevPR<br>

#####  Example:  3 

```powershell
PS C:\> $History | Format-DbaBackupInformation -DataFileDirectory 'D:\DataFiles\' -LogFileDirectory 'E:\LogFiles\
```
{: data-copyable="true" data-clean-code="$History | Format-DbaBackupInformation -DataFileDirectory 'D:\DataFiles\' -LogFileDirectory 'E:\LogFiles\" }

This example with change the restore path for all data files (everything that is not a log file) to d:\datafiles<br>
And all Transaction Log files will be restored to E:\Logfiles<br>

#####  Example:  4 

```powershell
PS C:\> $History | Format-DbaBackupInformation -RebaseBackupFolder f:\backups
```
{: data-copyable="true" data-clean-code="$History | Format-DbaBackupInformation -RebaseBackupFolder f:\backups" }

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
