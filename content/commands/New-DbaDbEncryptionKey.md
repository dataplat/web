---
title: "New-DbaDbEncryptionKey"
slug: "New-DbaDbEncryptionKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates database encryption keys for Transparent Data Encryption (TDE)"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbEncryptionKey.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbEncryptionKey"
draft: false
---

# New-DbaDbEncryptionKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbEncryptionKey](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbEncryptionKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbEncryptionKey](https://dataplat.github.io/boh#New-DbaDbEncryptionKey).

## Synopsis

Creates database encryption keys for Transparent Data Encryption (TDE)

## Description

Creates database encryption keys (DEKs) required for Transparent Data Encryption, using certificates or asymmetric keys from the master database. This is the essential first step before enabling TDE on any database to encrypt data at rest. The function automatically validates that certificates have been backed up before creating encryption keys, preventing potential data loss scenarios. If no encryptor is specified, it will automatically select an appropriate certificate or asymmetric key from master database.

## Syntax

```powershell
New-DbaDbEncryptionKey
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-EncryptorName] <String>]
    [[-Type] <String>]
    [[-EncryptionAlgorithm] <String>]
    [[-InputObject] <Database[]>]
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
PS C:\> $dbs = Get-DbaDatabase -SqlInstance sql01 -Database pubs
PS C:\> $db | New-DbaDbEncryptionKey
```

Creates an Aes256 encryption key for the pubs database on sql01. Automatically selects a cert database in master if one (and only one) non-system certificate exists.<br>
Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbEncryptionKey -SqlInstance sql01 -Database db1 -EncryptorName "sql01 cert" -EncryptionAlgorithm Aes192 -Confirm:$false
```

Creates an Aes192 encryption key for the pubs database on sql01 using the certiciated named "sql01 cert" in master.<br>
Does not prompt for confirmation.<br>

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

##### -Database

Specifies the database where the encryption key will be created to enable Transparent Data Encryption.  
This is the user database you want to encrypt, not the master database where certificates are stored.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -EncryptorName

Specifies the name of the certificate or asymmetric key in the master database to encrypt the database encryption key.  
If not provided, the function automatically selects an appropriate certificate from master (requires exactly one non-system certificate to exist).  
For asymmetric keys, the key must reside on an extensible key management provider like Azure Key Vault or Hardware Security Module.

| Property | Value |
| --- | --- |
| Alias | Certificate,CertificateName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies whether to use a Certificate or AsymmetricKey from the master database as the encryptor.  
Certificates are more common for TDE implementations, while asymmetric keys are typically used with external key management providers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Certificate |
| Accepted Values | Certificate,AsymmetricKey |

##### -EncryptionAlgorithm

Specifies the symmetric encryption algorithm used for the database encryption key.  
Aes256 provides the strongest encryption and is recommended for production environments, while Aes128 offers faster performance.  
TripleDes is legacy and should be avoided for new implementations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Aes256 |
| Accepted Values | Aes128,Aes192,Aes256,TripleDes |

##### -InputObject

Accepts database objects from Get-DbaDatabase to create encryption keys for multiple databases.  
Use this when you need to enable TDE on several databases across one or more SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Bypasses the safety check that prevents creating encryption keys with unbackup certificates, which could lead to unrecoverable data loss.  
Also creates the specified certificate automatically if it doesn't exist in the master database.  
Use this only in development environments or when you have verified certificate backups exist through other means.

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
