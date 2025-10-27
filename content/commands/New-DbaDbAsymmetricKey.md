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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbAsymmetricKey</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbAsymmetricKey.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stuart Moore (@napalmgram), stuart-moore.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="New-DbaDbAsymmetricKey -SqlInstance Server1" }

You will be prompted to securely enter your password, then an asymmetric key will be created in the master database on server1 if it does not exist.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbAsymmetricKey -SqlInstance Server1 -Database db1 -Confirm:$false
```
{: data-copyable="true" data-clean-code="New-DbaDbAsymmetricKey -SqlInstance Server1 -Database db1 -Confirm:$false" }

Suppresses all prompts to install but prompts to securely enter your password and creates an asymmetric key in the 'db1' database<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbAsymmetricKey -SqlInstance Server1 -Database enctest -KeySourceType File -KeySource c:\keys\NewKey.snk -Name BackupKey -Owner KeyOwner
```
{: data-copyable="true" data-clean-code="New-DbaDbAsymmetricKey -SqlInstance Server1 -Database enctest -KeySourceType File -KeySource c:\keys\NewKey.snk -Name BackupKey -Owner KeyOwner" }

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
