---
title: "New-DbaDbAsymmetricKey"
slug: "New-DbaDbAsymmetricKey"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Creates RSA asymmetric keys in SQL Server databases for encryption and digital signing"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbAsymmetricKey.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbAsymmetricKey"
draft: false
---

# New-DbaDbAsymmetricKey

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbAsymmetricKey](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbAsymmetricKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbAsymmetricKey](https://dataplat.github.io/boh#New-DbaDbAsymmetricKey).

## Synopsis

Creates RSA asymmetric keys in SQL Server databases for encryption and digital signing

## Description

Creates asymmetric keys within SQL Server databases using RSA encryption algorithms (512-4096 bit). These keys are essential for database-level encryption features like Transparent Data Encryption (TDE), column-level encryption, and digital signing of assemblies or stored procedures. You can generate new key pairs directly on the server or import existing keys from files, executables, or assemblies. Keys can be password-protected or secured using the database master key, and ownership can be assigned to specific database users.

## Syntax

```powershell
New-DbaDbAsymmetricKey
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-Database] <String[]>]
    [[-SecurePassword] <SecureString>]
    [[-Owner] <String>]
    [[-KeySource] <String>]
    [[-KeySourceType] <String>]
    [[-InputObject] <Database[]>]
    [[-Algorithm] <String>]
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
PS C:\> New-DbaDbAsymmetricKey -SqlInstance Server1
```

You will be prompted to securely enter your password, then an asymmetric key will be created in the master database on server1 if it does not exist.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbAsymmetricKey -SqlInstance Server1 -Database db1 -Confirm:$false
```

Suppresses all prompts to install but prompts to securely enter your password and creates an asymmetric key in the 'db1' database<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbAsymmetricKey -SqlInstance Server1 -Database enctest -KeySourceType File -KeySource c:\keys\NewKey.snk -Name BackupKey -Owner KeyOwner
```

Installs the key pair held in NewKey.snk into the enctest database creating an AsymmetricKey called BackupKey, which will be owned by KeyOwner<br>

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

##### -Name

Specifies the name for the asymmetric key object within the database. Defaults to the database name if not provided.  
Choose meaningful names that reflect the key's purpose, such as 'TDE_Key' or 'BackupKey' for easier identification.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the target database where the asymmetric key will be created. Defaults to master database if not specified.  
Use this when creating encryption keys for specific user databases rather than system-wide keys.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -SecurePassword

Provides a password to encrypt the asymmetric key's private key. If omitted, the database master key protects the private key.  
Use this when you need explicit password control or when the database master key is not available.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Owner

Specifies the database user who will own the asymmetric key. Defaults to the current user if not specified.  
The specified user must already exist in the target database before creating the key.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -KeySource

Specifies the path or name of the external key source (file, executable, or SQL assembly name).  
The path must be accessible by the SQL Server service account when using File or Executable types.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -KeySourceType

Specifies the type of external key source when importing existing keys. Valid values are Executable, File, or SqlAssembly.  
Required when using KeySource parameter to import keys from external files rather than generating new ones.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Executable,File,SqlAssembly |

##### -InputObject

Accepts database objects from Get-DbaDatabase through the pipeline for batch key creation.  
Use this when creating asymmetric keys across multiple databases in a single operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Algorithm

Sets the RSA encryption algorithm strength for newly generated keys. Valid options are Rsa512, Rsa1024, Rsa2048, Rsa3072, or Rsa4096.  
Defaults to Rsa2048 which provides good security for most scenarios. Higher bit strengths offer stronger encryption but slower performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Rsa2048 |
| Accepted Values | Rsa4096,Rsa3072,Rsa2048,Rsa1024,Rsa512 |

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
