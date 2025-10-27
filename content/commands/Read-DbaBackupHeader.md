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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Read-DbaBackupHeader</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Read-DbaBackupHeader.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Read-DbaBackupHeader -SqlInstance sql2016 -Path S:\backups\mydb\mydb.bak" }

Logs into sql2016 using Windows authentication and reads the local file on sql2016, S:\backups\mydb\mydb.bak.<br>
If you are running this command on a workstation and connecting remotely, remember that sql2016 cannot access files on your own workstation.<br>

#####  Example:  2 

```powershell
PS C:\> Read-DbaBackupHeader -SqlInstance sql2016 -Path \\nas\sql\backups\mydb\mydb.bak, \\nas\sql\backups\otherdb\otherdb.bak
```
{: data-copyable="true" data-clean-code="Read-DbaBackupHeader -SqlInstance sql2016 -Path \\nas\sql\backups\mydb\mydb.bak, \\nas\sql\backups\otherdb\otherdb.bak" }

Logs into sql2016 and reads two backup files - mydb.bak and otherdb.bak. The SQL Server service account must have rights to read this file.<br>

#####  Example:  3 

```powershell
PS C:\> Read-DbaBackupHeader -SqlInstance . -Path C:\temp\myfile.bak -Simple
```
{: data-copyable="true" data-clean-code="Read-DbaBackupHeader -SqlInstance . -Path C:\temp\myfile.bak -Simple" }

Logs into the local workstation (or computer) and shows simplified output about C:\temp\myfile.bak. The SQL Server service account must have rights to read this file.<br>

#####  Example:  4 

```powershell
PS C:\> $backupinfo = Read-DbaBackupHeader -SqlInstance . -Path C:\temp\myfile.bak
PS C:\> $backupinfo.FileList
```
{: data-copyable="true" data-clean-code="$backupinfo = Read-DbaBackupHeader -SqlInstance . -Path C:\temp\myfile.bak
$backupinfo.FileList" }

Displays detailed information about each of the datafiles contained in the backupset.<br>

#####  Example:  5 

```powershell
PS C:\> Read-DbaBackupHeader -SqlInstance . -Path C:\temp\myfile.bak -FileList
```
{: data-copyable="true" data-clean-code="Read-DbaBackupHeader -SqlInstance . -Path C:\temp\myfile.bak -FileList" }

Also returns detailed information about each of the datafiles contained in the backupset.<br>

#####  Example:  6 

```powershell
PS C:\> "C:\temp\myfile.bak", "\backupserver\backups\myotherfile.bak" | Read-DbaBackupHeader -SqlInstance sql2016  | Where-Object { $_.BackupSize.Megabyte -gt 100 }
```
{: data-copyable="true" data-clean-code="&quot;C:\temp\myfile.bak&quot;, &quot;\backupserver\backups\myotherfile.bak&quot; | Read-DbaBackupHeader -SqlInstance sql2016  | Where-Object { $_.BackupSize.Megabyte -gt 100 }" }

Reads the two files and returns only backups larger than 100 MB<br>

#####  Example:  7 

```powershell
PS C:\> Get-ChildItem \\nas\sql\*.bak | Read-DbaBackupHeader -SqlInstance sql2016
```
{: data-copyable="true" data-clean-code="Get-ChildItem \\nas\sql\*.bak | Read-DbaBackupHeader -SqlInstance sql2016" }

Gets a list of all .bak files on the \\nas\sql share and reads the headers using the server named "sql2016". This means that the server, sql2016, must have read access to the \\nas\sql share.<br>

#####  Example:  8 

```powershell
PS C:\> Read-DbaBackupHeader -SqlInstance sql2016 -Path https://dbatoolsaz.blob.core.windows.net/azbackups/restoretime/restoretime_201705131850.bak -AzureCredential AzureBackupUser
```
{: data-copyable="true" data-clean-code="Read-DbaBackupHeader -SqlInstance sql2016 -Path https://dbatoolsaz.blob.core.windows.net/azbackups/restoretime/restoretime_201705131850.bak -AzureCredential AzureBackupUser" }

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
