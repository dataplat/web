---
title: "Backup-DbaDbCertificate"
slug: "Backup-DbaDbCertificate"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret)"
availability: "Windows, Linux, macOS"
synopsis: "Exports database certificates and private keys to physical backup files on SQL Server instances."
tags:
  - "CertBackup"
  - "Certificate"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaDbCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Backup-DbaDbCertificate"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Backup-DbaDbCertificate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaDbCertificate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Jess Pomfret (@jpomfret)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Exports database certificates and private keys to physical backup files on SQL Server instances.

## Description

Backs up database certificates by exporting them to .cer (certificate) and .pvk (private key) files on the SQL Server file system. This is essential for disaster recovery scenarios where you need to restore encrypted databases or migrate certificates to another instance. Without backing up certificates, you cannot decrypt TDE-enabled databases or access data encrypted with certificate-based encryption. Files are saved to the instance's default backup directory unless a custom path is specified.

## Syntax

```powershell
Backup-DbaDbCertificate
    [-SqlCredential <PSCredential>]
    [-EncryptionPassword <SecureString>]
    [-DecryptionPassword <SecureString>]
    [-Path <FileInfo>]
    [-Suffix <String>]
    [-FileBaseName <String>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Backup-DbaDbCertificate -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Certificate <Object[]>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-EncryptionPassword <SecureString>]
    [-DecryptionPassword <SecureString>]
    [-Path <FileInfo>]
    [-Suffix <String>]
    [-FileBaseName <String>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Backup-DbaDbCertificate
    [-SqlCredential <PSCredential>]
    [-EncryptionPassword <SecureString>]
    [-DecryptionPassword <SecureString>]
    [-Path <FileInfo>]
    [-Suffix <String>]
    [-FileBaseName <String>]
    [-InputObject <Certificate[]>]
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
PS C:\> Backup-DbaDbCertificate -SqlInstance Server1
```
{: data-copyable="true" data-clean-code="Backup-DbaDbCertificate -SqlInstance Server1" }

Exports all the certificates on the specified SQL Server to the default data path for the instance.<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Backup-DbaDbCertificate -SqlInstance Server1 -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Backup-DbaDbCertificate -SqlInstance Server1 -SqlCredential $cred" }

Connects using sqladmin credential and exports all the certificates on the specified SQL Server to the default data path for the instance.<br>

#####  Example:  3 

```powershell
PS C:\> Backup-DbaDbCertificate -SqlInstance Server1 -Certificate Certificate1
```
{: data-copyable="true" data-clean-code="Backup-DbaDbCertificate -SqlInstance Server1 -Certificate Certificate1" }

Exports only the certificate named Certificate1 on the specified SQL Server to the default data path for the instance.<br>

#####  Example:  4 

```powershell
PS C:\> Backup-DbaDbCertificate -SqlInstance Server1 -Database AdventureWorks
```
{: data-copyable="true" data-clean-code="Backup-DbaDbCertificate -SqlInstance Server1 -Database AdventureWorks" }

Exports only the certificates for AdventureWorks on the specified SQL Server to the default data path for the instance.<br>

#####  Example:  5 

```powershell
PS C:\> Backup-DbaDbCertificate -SqlInstance Server1 -ExcludeDatabase AdventureWorks
```
{: data-copyable="true" data-clean-code="Backup-DbaDbCertificate -SqlInstance Server1 -ExcludeDatabase AdventureWorks" }

Exports all certificates except those for AdventureWorks on the specified SQL Server to the default data path for the instance.<br>

#####  Example:  6 

```powershell
PS C:\> Backup-DbaDbCertificate -SqlInstance Server1 -Path \\Server1\Certificates -EncryptionPassword (Get-Credential NoUsernameNeeded).Password
```
{: data-copyable="true" data-clean-code="Backup-DbaDbCertificate -SqlInstance Server1 -Path \\Server1\Certificates -EncryptionPassword (Get-Credential NoUsernameNeeded).Password" }

Exports all the certificates and private keys on the specified SQL Server.<br>

#####  Example:  7 

```powershell
PS C:\> $EncryptionPassword = (Get-Credential NoUsernameNeeded).Password
PS C:\> $DecryptionPassword = (Get-Credential NoUsernameNeeded).Password
PS C:\> Backup-DbaDbCertificate -SqlInstance Server1 -EncryptionPassword $EncryptionPassword -DecryptionPassword $DecryptionPassword
```
{: data-copyable="true" data-clean-code="$EncryptionPassword = (Get-Credential NoUsernameNeeded).Password
$DecryptionPassword = (Get-Credential NoUsernameNeeded).Password
Backup-DbaDbCertificate -SqlInstance Server1 -EncryptionPassword $EncryptionPassword -DecryptionPassword $DecryptionPassword" }

Exports all the certificates on the specified SQL Server using the supplied DecryptionPassword, since an EncryptionPassword is specified private keys are also exported.<br>

#####  Example:  8 

```powershell
PS C:\> Backup-DbaDbCertificate -SqlInstance Server1 -Path \\Server1\Certificates
```
{: data-copyable="true" data-clean-code="Backup-DbaDbCertificate -SqlInstance Server1 -Path \\Server1\Certificates" }

Exports all certificates on the specified SQL Server to the specified path.<br>

#####  Example:  9 

```powershell
PS C:\> Backup-DbaDbCertificate -SqlInstance Server1 -Suffix DbaTools
```
{: data-copyable="true" data-clean-code="Backup-DbaDbCertificate -SqlInstance Server1 -Suffix DbaTools" }

Exports all certificates on the specified SQL Server to the specified path, appends DbaTools to the end of the filenames.<br>

#####  Example:  10 

```powershell
PS C:\> Get-DbaDbCertificate -SqlInstance sql2016 | Backup-DbaDbCertificate
```
{: data-copyable="true" data-clean-code="Get-DbaDbCertificate -SqlInstance sql2016 | Backup-DbaDbCertificate" }

Exports all certificates found on sql2016 to the default data directory.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -Certificate

Specifies the names of specific certificates to export instead of backing up all certificates on the instance.  
Use this when you only need to backup certain certificates, such as TDE certificates or specific application certificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Limits the backup operation to certificates associated with specific databases only.  
Use this when you need to backup certificates for particular databases, especially before database migrations or when creating targeted disaster recovery plans.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases whose certificates should be excluded from the backup operation.  
Use this to skip system databases or test databases when performing bulk certificate exports across the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EncryptionPassword

Secure password used to encrypt the private key (.pvk) file during export, enabling backup of both certificate and private key components.  
Required when you need to backup the private key for disaster recovery scenarios where the certificate must be restored with the ability to decrypt data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DecryptionPassword

Password required to decrypt the certificate's existing private key before it can be re-encrypted for backup.  
Use this when the certificate was created with a password or imported from another source that had password protection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Directory path on the SQL Server where certificate backup files will be saved, specified from the SQL Server's perspective.  
Defaults to the instance's backup directory if not specified. Use UNC paths for network storage or local paths accessible by the SQL Server service account.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Suffix

Text appended to the end of backup file names to help organize or identify different backup sets.  
Use this to distinguish between different backup runs or environments, such as "Prod" or "DR-Test".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileBaseName

Custom base name for the backup files instead of the default "instance-database-certificate" naming format.  
Use this when exporting a single certificate and you want specific file names for easier identification or scripted restore processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Certificate objects piped from Get-DbaDbCertificate for processing specific certificates found by that command.  
Use this parameter when you need to filter or validate certificates before backing them up.

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
