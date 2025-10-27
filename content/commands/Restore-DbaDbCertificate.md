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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Restore-DbaDbCertificate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Restore-DbaDbCertificate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Jess Pomfret (@jpomfret), jesspomfret.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="$securepass = Get-Credential usernamedoesntmatter | Select-Object -ExpandProperty Password
Restore-DbaDbCertificate -SqlInstance Server1 -Path \\Server1\Certificates -DecryptionPassword $securepass" }

Restores all the certificates in the specified path, password is used to both decrypt and encrypt the private key.<br>

#####  Example:  2 

```powershell
PS C:\> Restore-DbaDbCertificate -SqlInstance Server1 -Path \\Server1\Certificates\DatabaseTDE.cer -DecryptionPassword (Get-Credential usernamedoesntmatter).Password
```
{: data-copyable="true" data-clean-code="Restore-DbaDbCertificate -SqlInstance Server1 -Path \\Server1\Certificates\DatabaseTDE.cer -DecryptionPassword (Get-Credential usernamedoesntmatter).Password" }

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
