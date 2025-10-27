---
title: "Restore-DbaDbCertificate"
slug: "Restore-DbaDbCertificate"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Restores database certificates from .cer and .pvk files into SQL Server databases."
tags:
  - "CertBackup"
  - "Certificate"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Restore-DbaDbCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Restore-DbaDbCertificate"
draft: false
---

# Restore-DbaDbCertificate

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Restore-DbaDbCertificate](https://github.com/dataplat/dbatools/blob/master/public/Restore-DbaDbCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Restore-DbaDbCertificate](https://dataplat.github.io/boh#Restore-DbaDbCertificate).

## Synopsis

Restores database certificates from .cer and .pvk files into SQL Server databases.

## Description

Restores database certificates and their associated private keys from backup files into SQL Server databases. This function is essential for recovering certificates used in TDE (Transparent Data Encryption), backup encryption, Always Encrypted, and other SQL Server security features after database migrations, disaster recovery, or server rebuilds.  
  
The function automatically locates matching private key files (.pvk) for each certificate (.cer) when processing directories, or you can specify key file paths explicitly. Handles password-protected private keys with secure credential management, and allows you to re-encrypt keys during the restore process if needed.

## Syntax

```powershell
Restore-DbaDbCertificate
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-Path] <String[]>
    [[-KeyFilePath] <String[]>]
    [[-EncryptionPassword] <SecureString>]
    [[-Database] <String>]
    [[-Name] <String>]
    [[-DecryptionPassword] <SecureString>]
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
PS C:\> $securepass = Get-Credential usernamedoesntmatter | Select-Object -ExpandProperty Password
PS C:\> Restore-DbaDbCertificate -SqlInstance Server1 -Path \\Server1\Certificates -DecryptionPassword $securepass
```

Restores all the certificates in the specified path, password is used to both decrypt and encrypt the private key.<br>

#####  Example:  2 

```powershell
PS C:\> Restore-DbaDbCertificate -SqlInstance Server1 -Path \\Server1\Certificates\DatabaseTDE.cer -DecryptionPassword (Get-Credential usernamedoesntmatter).Password
```

Restores the DatabaseTDE certificate to Server1 and uses the MasterKey to encrypt the private key.<br>

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

Specifies the file system path to certificate files (.cer) or a directory containing multiple certificates. When pointing to a directory, the function processes all .cer files found within it.  
Use this to restore certificates from your certificate backup location after disaster recovery or server migrations.

| Property | Value |
| --- | --- |
| Alias | FullName,ExportPath |
| Required | True |
| Pipeline | true (ByPropertyName) |
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

##### -KeyFilePath

Specifies the path to the private key file (.pvk) associated with the certificate. If not provided, the function automatically searches for a matching .pvk file in the same directory as the   
certificate.  
Only specify this when your private key files are stored in a different location from your certificate files.

| Property | Value |
| --- | --- |
| Alias | Key |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -EncryptionPassword

Sets a new password to encrypt the private key after restoration to SQL Server. If not specified, the restored certificate will be encrypted with the database master key.  
Use this when you want to change the private key encryption method or set a specific password for the restored certificate.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the target database where the certificate will be restored. Defaults to the master database if not specified.  
Use this when restoring certificates for specific database features like TDE, Always Encrypted, or application-specific encryption within user databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -Name

Specifies a custom name for the restored certificate in SQL Server. If not provided, the function derives the name from the certificate file name, removing instance and database prefixes.  
Use this when you need the certificate to have a specific name that differs from the backup file naming convention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DecryptionPassword

Provides the password required to decrypt the private key file (.pvk) during certificate restoration. This password was set when the certificate was originally backed up.  
Required for all certificate restores since private keys are encrypted by default when exported from SQL Server.

| Property | Value |
| --- | --- |
| Alias | Password,SecurePassword |
| Required | False |
| Pipeline | false |
| Default Value | (Read-Host "Decryption password" -AsSecureString) |

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
