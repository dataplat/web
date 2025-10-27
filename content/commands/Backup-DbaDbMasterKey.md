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

# Backup-DbaDbMasterKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Backup-DbaDbMasterKey](https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaDbMasterKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Backup-DbaDbMasterKey](https://dataplat.github.io/boh#Backup-DbaDbMasterKey).

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

Prompts for export password, then logs into server1\sql2016 with Windows credentials then backs up all database keys to the default backup directory.<br>

#####  Example:  2 

```powershell
PS C:\> Backup-DbaDbMasterKey -SqlInstance Server1 -Database db1 -Path \\nas\sqlbackups\keys
```

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
