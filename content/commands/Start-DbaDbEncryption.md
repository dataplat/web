---
title: "Start-DbaDbEncryption"
slug: "Start-DbaDbEncryption"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Implements Transparent Data Encryption (TDE) on user databases with automated key infrastructure and backup management"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Start-DbaDbEncryption.ps1"
bohUrl: "https://dataplat.github.io/boh#Start-DbaDbEncryption"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Start-DbaDbEncryption</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Start-DbaDbEncryption.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Implements Transparent Data Encryption (TDE) on user databases with automated key infrastructure and backup management

## Description

Automates the complete TDE implementation process from start to finish, handling all the complex key management steps that would otherwise require multiple manual commands. This function sets up the entire encryption infrastructure including master keys, certificates or asymmetric keys, database encryption keys, and automatically backs up all encryption components to protect against data loss.  
  
The function performs these operations in sequence: ensures a service master key exists in the master database and backs it up, creates or validates a database certificate or asymmetric key in master and backs it up, creates a database encryption key in each target database, and finally enables encryption on the databases. This eliminates the tedious manual process of running separate commands for each TDE component and ensures you don't miss critical backup steps that could leave your encrypted databases unrecoverable.  
  
Most valuable for compliance initiatives where you need to encrypt multiple databases quickly while maintaining proper key backup procedures. Also essential for disaster recovery planning since it ensures all encryption keys are properly backed up during the initial setup process.

## Syntax

```powershell
Start-DbaDbEncryption
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-EncryptorName] <String>]
    [[-EncryptorType] <String>]
    [[-Database] <String[]>]
    [-BackupPath] <String>
    [-MasterKeySecurePassword] <SecureString>
    [[-CertificateSubject] <String>]
    [[-CertificateStartDate] <DateTime>]
    [[-CertificateExpirationDate] <DateTime>]
    [-CertificateActiveForServiceBrokerDialog]
    [-BackupSecurePassword] <SecureString>
    [[-InputObject] <Database[]>]
    [-AllUserDatabases]
    [-Force]
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
PS C:\> $masterkeypass = (Get-Credential justneedpassword).Password
PS C:\> $certbackuppass = (Get-Credential justneedpassword).Password
PS C:\> $params = @{
>>      SqlInstance             = "sql01"
>>      AllUserDatabases        = $true
>>      MasterKeySecurePassword = $masterkeypass
>>      BackupSecurePassword    = $certbackuppass
>>      BackupPath              = "C:\temp"
>>      EnableException         = $true
>>  }
PS C:\> Start-DbaDbEncryption @params
```
{: data-copyable="true" data-clean-code="$masterkeypass = (Get-Credential justneedpassword).Password
$certbackuppass = (Get-Credential justneedpassword).Password
$params = @{
SqlInstance             = &quot;sql01&quot;
AllUserDatabases        = $true
MasterKeySecurePassword = $masterkeypass
BackupSecurePassword    = $certbackuppass
BackupPath              = &quot;C:\temp&quot;
EnableException         = $true
}
Start-DbaDbEncryption @params" }

Prompts for two passwords (the username doesn't matter, this is just an easy & secure way to get a secure password)<br>
Then encrypts all user databases on sql01, creating master keys and certificates as needed, and backing all of them up to C:\temp, securing them with the password set in $certbackuppass<br>

### Required Parameters

##### -BackupPath

Directory path where master key and certificate backup files will be stored, accessible by the SQL Server service account.  
Critical for disaster recovery as these backups are required to restore TDE-encrypted databases.  
Ensure this path has appropriate security permissions and is included in your backup strategy.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -MasterKeySecurePassword

Secure password used to create and protect the service master key in the master database if one doesn't exist.  
Required for all TDE operations because the function cannot determine if master key creation is needed until runtime.  
This password protects the root of the encryption hierarchy and is critical for disaster recovery.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -BackupSecurePassword

Secure password used to encrypt backup files for master keys and certificates created during TDE setup.  
Essential for disaster recovery as these backups are required to restore encrypted databases on different servers.  
Must be stored securely as losing this password makes the encrypted data unrecoverable.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

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

##### -EncryptorName

Specifies the name of the certificate or asymmetric key in the master database that will encrypt the database encryption keys.  
If not specified, the function will automatically find an existing certificate or asymmetric key. When used with -Force, creates a new certificate with this name if none exists.  
For asymmetric keys, the key must reside on an extensible key management provider to encrypt database encryption keys.

| Property | Value |
| --- | --- |
| Alias | Certificate,CertificateName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EncryptorType

Determines whether to use a certificate or asymmetric key for TDE encryption. Defaults to Certificate.  
Certificate is the most common choice for standard TDE implementations. Use AsymmetricKey when integrating with extensible key management providers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Certificate |
| Accepted Values | AsymmetricKey,Certificate |

##### -Database

Specifies which user databases to encrypt with Transparent Data Encryption (TDE). Accepts single database names, arrays, or wildcards.  
Use this when you need to encrypt specific databases instead of all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CertificateSubject

Sets the subject field for TDE certificates created during the encryption process.  
Use this to standardize certificate naming for compliance or organizational requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CertificateStartDate

Specifies when TDE certificates become valid. Defaults to the current date and time.  
Useful for planned encryption rollouts where certificates need to activate at a specific time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-Date) |

##### -CertificateExpirationDate

Sets when TDE certificates will expire. Defaults to 5 years from the current date.  
Plan certificate renewals well before expiration to avoid service disruptions during database operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-Date).AddYears(5) |

##### -CertificateActiveForServiceBrokerDialog

Enables the TDE certificate for Service Broker dialog security in addition to database encryption.  
Use this when your databases utilize Service Broker and need certificate-based dialog security.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects from Get-DbaDatabase for TDE encryption via pipeline.  
Allows filtering and processing specific databases before encryption, useful for complex selection criteria.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -AllUserDatabases

Encrypts all user databases on the instance, excluding system databases (master, model, tempdb, msdb).  
Use this for compliance initiatives when you need to encrypt every user database quickly.  
System databases are automatically excluded as they cannot be encrypted with TDE.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Creates a new certificate with the specified EncryptorName if it doesn't exist in the master database.  
Requires EncryptorName to be specified. Use this when you need to establish new TDE infrastructure with specific naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
