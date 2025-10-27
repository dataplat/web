---
title: "Backup-DbaServiceMasterKey"
slug: "Backup-DbaServiceMasterKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Exports SQL Server Service Master Key to an encrypted backup file for disaster recovery."
tags:
  - "CertBackup"
  - "Certificate"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaServiceMasterKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Backup-DbaServiceMasterKey"
draft: false
---

# Backup-DbaServiceMasterKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Backup-DbaServiceMasterKey](https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaServiceMasterKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Backup-DbaServiceMasterKey](https://dataplat.github.io/boh#Backup-DbaServiceMasterKey).

## Synopsis

Exports SQL Server Service Master Key to an encrypted backup file for disaster recovery.

## Description

Creates an encrypted backup of the SQL Server Service Master Key (SMK), which sits at the top of SQL Server's encryption hierarchy. The Service Master Key encrypts Database Master Keys and certificates, making its backup critical for disaster recovery scenarios where encrypted databases need to be restored or moved between servers. The backup file is password-protected and can be stored in the default backup directory or a custom location. This prevents the need to manually recreate encryption keys and certificates when rebuilding servers or migrating encrypted databases.

## Syntax

```powershell
Backup-DbaServiceMasterKey
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-KeyCredential] <PSCredential>]
    [[-SecurePassword] <SecureString>]
    [[-Path] <String>]
    [[-FileBaseName] <String>]
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
PS C:\> Backup-DbaServiceMasterKey -SqlInstance server1\sql2016
>> ComputerName : SERVER1
>> InstanceName : SQL2016
>> SqlInstance  : SERVER1\SQL2016
>> Filename     : E:\MSSQL13.SQL2016\MSSQL\Backup\server1$sql2016-SMK-20170614162311.key
>> Status       : Success
```

Prompts for export password, then logs into server1\sql2016 with Windows credentials then backs up the service master key to the default backup directory.<br>

#####  Example:  2 

```powershell
PS C:\> Backup-DbaServiceMasterKey -SqlInstance Server1 -Path \\nas\sqlbackups\keys
```

Logs into sql2016 with Windows credentials then backs up the service master key to the \\nas\sqlbackups\keys directory.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -KeyCredential

Provides an alternative way to pass the encryption password using a PowerShell credential object.  
Use this when you need to automate the backup process without interactive password prompts or when integrating with credential management systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurePassword

Sets the password used to encrypt the Service Master Key backup file. Must be provided as a SecureString object for security.  
If not specified, you'll be prompted to enter the password interactively. Store this password securely as it's required to restore the Service Master Key during disaster recovery.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory where the Service Master Key backup file will be created. Defaults to the SQL Server instance's configured backup directory if not specified.  
Use this when you need to store the backup in a specific location for compliance, network storage, or organizational requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileBaseName

Overrides the default naming convention to use a custom base name for the backup file. The system automatically appends ".key" to whatever name you provide.  
Use this when you need predictable file names for automation scripts or when following specific naming standards in your environment.

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
