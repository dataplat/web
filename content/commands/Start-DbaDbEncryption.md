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

# Start-DbaDbEncryption

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Start-DbaDbEncryption](https://github.com/dataplat/dbatools/blob/master/public/Start-DbaDbEncryption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Start-DbaDbEncryption](https://dataplat.github.io/boh#Start-DbaDbEncryption).

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
