---
title: "Read-DbaBackupHeader"
slug: "Read-DbaBackupHeader"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Extracts backup metadata from SQL Server backup files without restoring them"
tags:
  - "DisasterRecovery"
  - "Backup"
  - "Restore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Read-DbaBackupHeader.ps1"
bohUrl: "https://dataplat.github.io/boh#Read-DbaBackupHeader"
draft: false
---

# Read-DbaBackupHeader

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Read-DbaBackupHeader](https://github.com/dataplat/dbatools/blob/master/public/Read-DbaBackupHeader.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Read-DbaBackupHeader](https://dataplat.github.io/boh#Read-DbaBackupHeader).

## Synopsis

Extracts backup metadata from SQL Server backup files without restoring them

## Description

Uses SQL Server's RESTORE HEADERONLY functionality to extract detailed metadata from backup files including database name, backup type, creation date, file lists, and backup size information. This lets you validate backups, plan restores, and audit backup inventory without actually performing a restore operation.  
  
The function can process full, differential, and transaction log backups from local file systems, network shares, and Azure blob storage. It requires an online SQL Server instance to parse the backup files since it leverages SQL Server's built-in backup reading capabilities.  
  
Supports multithreaded processing for improved performance when scanning multiple backup files. The backup file paths must be accessible from the target SQL Server instance, not your local workstation.

## Syntax

```powershell
Read-DbaBackupHeader
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-Path] <Object[]>
    [-Simple]
    [-FileList]
    [[-AzureCredential] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Read-DbaBackupHeader -SqlInstance sql2016 -Path S:\backups\mydb\mydb.bak
```

Logs into sql2016 using Windows authentication and reads the local file on sql2016, S:\backups\mydb\mydb.bak.<br>
If you are running this command on a workstation and connecting remotely, remember that sql2016 cannot access files on your own workstation.<br>

#####  Example:  2 

```powershell
PS C:\> Read-DbaBackupHeader -SqlInstance sql2016 -Path \\nas\sql\backups\mydb\mydb.bak, \\nas\sql\backups\otherdb\otherdb.bak
```

Logs into sql2016 and reads two backup files - mydb.bak and otherdb.bak. The SQL Server service account must have rights to read this file.<br>

#####  Example:  3 

```powershell
PS C:\> Read-DbaBackupHeader -SqlInstance . -Path C:\temp\myfile.bak -Simple
```

Logs into the local workstation (or computer) and shows simplified output about C:\temp\myfile.bak. The SQL Server service account must have rights to read this file.<br>

#####  Example:  4 

```powershell
PS C:\> $backupinfo = Read-DbaBackupHeader -SqlInstance . -Path C:\temp\myfile.bak
PS C:\> $backupinfo.FileList
```

Displays detailed information about each of the datafiles contained in the backupset.<br>

#####  Example:  5 

```powershell
PS C:\> Read-DbaBackupHeader -SqlInstance . -Path C:\temp\myfile.bak -FileList
```

Also returns detailed information about each of the datafiles contained in the backupset.<br>

#####  Example:  6 

```powershell
PS C:\> "C:\temp\myfile.bak", "\backupserver\backups\myotherfile.bak" | Read-DbaBackupHeader -SqlInstance sql2016  | Where-Object { $_.BackupSize.Megabyte -gt 100 }
```

Reads the two files and returns only backups larger than 100 MB<br>

#####  Example:  7 

```powershell
PS C:\> Get-ChildItem \\nas\sql\*.bak | Read-DbaBackupHeader -SqlInstance sql2016
```

Gets a list of all .bak files on the \\nas\sql share and reads the headers using the server named "sql2016". This means that the server, sql2016, must have read access to the \\nas\sql share.<br>

#####  Example:  8 

```powershell
PS C:\> Read-DbaBackupHeader -SqlInstance sql2016 -Path https://dbatoolsaz.blob.core.windows.net/azbackups/restoretime/restoretime_201705131850.bak -AzureCredential AzureBackupUser
```

Gets the backup header information from the SQL Server backup file stored at https://dbatoolsaz.blob.core.windows.net/azbackups/restoretime/restoretime_201705131850.bak on Azure<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the file path to SQL Server backup files including full, differential, and transaction log backups. Supports local paths, UNC network shares, and Azure blob storage URLs.  
The backup files must be accessible from the target SQL Server instance, not your local workstation. Use this to read backup metadata without performing an actual restore.

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

##### -Simple

Returns a simplified output with only essential columns: DatabaseName, BackupFinishDate, RecoveryModel, BackupSize, CompressedBackupSize, DatabaseCreationDate, UserName, ServerName, SqlVersion, and   
BackupPath.  
Use this when you need a quick overview of backup files without the full 50+ columns of detailed metadata.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FileList

Returns detailed information about each data and log file contained within the backup set, including logical names, physical paths, file sizes, and file types.  
Use this when planning restores to different locations or when you need to understand the file structure before performing a restore operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AzureCredential

Specifies the name of a SQL Server credential object that contains the authentication information for accessing Azure blob storage.  
Required when reading backup files stored in Azure blob storage. The credential must already exist on the target SQL Server instance and contain valid Azure storage account keys or SAS tokens.

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
