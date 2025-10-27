---
title: "Backup-DbaDbMasterKey"
slug: "Backup-DbaDbMasterKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Exports database master keys to encrypted backup files for disaster recovery and compliance."
tags:
  - "CertBackup"
  - "Certificate"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaDbMasterKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Backup-DbaDbMasterKey"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Backup-DbaDbMasterKey</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaDbMasterKey.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Exports database master keys to encrypted backup files for disaster recovery and compliance.

## Description

Creates encrypted backup files of database master keys from one or more SQL Server databases. Database master keys are essential for Transparent Data Encryption (TDE), column-level encryption, and other SQL Server encryption features.  
  
This function is critical for disaster recovery planning since losing a database master key makes encrypted data permanently inaccessible. The exported keys are password-protected and can be restored using Restore-DbaDbMasterKey or T-SQL commands.  
  
Works with databases that contain master keys and saves backup files to the server's default backup directory or a specified path. Each backup file uses a unique naming convention to prevent overwrites during multiple exports.

## Syntax

```powershell
Backup-DbaDbMasterKey
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-SecurePassword] <SecureString>]
    [[-Path] <String>]
    [[-FileBaseName] <String>]
    [[-InputObject] <Database[]>]
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
PS C:\> Backup-DbaDbMasterKey -SqlInstance server1\sql2016
>> ComputerName : SERVER1
>> InstanceName : SQL2016
>> SqlInstance  : SERVER1\SQL2016
>> Filename     : E:\MSSQL13.SQL2016\MSSQL\Backup\server1$sql2016-SMK-20170614162311.key
>> Status       : Success
```
{: data-copyable="true" data-clean-code="Backup-DbaDbMasterKey -SqlInstance server1\sql2016
ComputerName : SERVER1
InstanceName : SQL2016
SqlInstance  : SERVER1\SQL2016
Filename     : E:\MSSQL13.SQL2016\MSSQL\Backup\server1$sql2016-SMK-20170614162311.key
Status       : Success" }

Prompts for export password, then logs into server1\sql2016 with Windows credentials then backs up all database keys to the default backup directory.<br>

#####  Example:  2 

```powershell
PS C:\> Backup-DbaDbMasterKey -SqlInstance Server1 -Database db1 -Path \\nas\sqlbackups\keys
```
{: data-copyable="true" data-clean-code="Backup-DbaDbMasterKey -SqlInstance Server1 -Database db1 -Path \\nas\sqlbackups\keys" }

Logs into sql2016 with Windows credentials then backs up db1's keys to the \\nas\sqlbackups\keys directory.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Credential

Pass a credential object for the password

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to export master keys from. Only databases containing master keys will be processed.  
Use this when you need to backup encryption keys from specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from master key backup operations. Auto-completes with available database names.  
Useful when backing up master keys from most databases but skipping test, development, or non-encrypted databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurePassword

Password used to encrypt the exported master key backup files. Must be provided as a SecureString object.  
This password will be required when restoring the master keys, so store it securely with your backup documentation.  
If not specified, you'll be prompted to enter the password interactively for each database.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Directory path where master key backup files will be saved. Accepts local paths or UNC network shares.  
Defaults to the SQL Server instance's configured backup directory if not specified.  
The SQL Server service account must have write permissions to the specified location.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileBaseName

Overrides the default file naming convention with a custom base name for the backup file.  
Useful when exporting a single database's master key and you want a specific filename for documentation or automation.  
The ".key" extension is automatically appended to whatever name you specify.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase or other dbatools database commands.  
Allows you to filter databases using Get-DbaDatabase parameters before piping to this function for master key backup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
