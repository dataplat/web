---
title: "Disable-DbaDbEncryption"
slug: "Disable-DbaDbEncryption"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Disables Transparent Data Encryption (TDE) on SQL Server databases and removes encryption keys"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaDbEncryption.ps1"
bohUrl: "https://dataplat.github.io/boh#Disable-DbaDbEncryption"
draft: false
---

# Disable-DbaDbEncryption

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disable-DbaDbEncryption](https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaDbEncryption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disable-DbaDbEncryption](https://dataplat.github.io/boh#Disable-DbaDbEncryption).

## Synopsis

Disables Transparent Data Encryption (TDE) on SQL Server databases and removes encryption keys

## Description

Disables Transparent Data Encryption (TDE) on specified databases by setting EncryptionEnabled to false and monitoring the decryption process until completion. Since TDE is not fully disabled until the Database Encryption Key (DEK) is removed, this command drops the encryption key by default to complete the decryption process.  
  
This is commonly used when decommissioning databases that no longer require encryption, migrating databases to environments without TDE requirements, or troubleshooting TDE-related performance issues. The function monitors the decryption state and waits for the database to reach an "Unencrypted" state before proceeding with key removal.  
  
Use the -NoEncryptionKeyDrop parameter if you want to disable TDE but retain the encryption key for future use, though the database will remain in a partially encrypted state until the key is manually dropped.

## Syntax

```powershell
Disable-DbaDbEncryption
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-InputObject] <Database[]>]
    [-NoEncryptionKeyDrop]
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
PS C:\> Disable-DbaDbEncryption -SqlInstance sql2017, sql2016 -Database pubs
```

Disables database encryption on the pubs database on sql2017 and sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Disable-DbaDbEncryption -SqlInstance sql2017 -Database db1 -Confirm:$false
```

Suppresses all prompts to disable database encryption on the db1 database on sql2017<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017 -Database db1 | Disable-DbaDbEncryption -Confirm:$false
```

Suppresses all prompts to disable database encryption on the db1 database on sql2017 (using piping)<br>

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

Specifies which databases to disable TDE encryption on. Accepts multiple database names as an array.  
Required when using SqlInstance parameter to target specific databases instead of processing all encrypted databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline processing. This allows you to filter databases using Get-DbaDatabase criteria before disabling TDE.  
Useful when you need to disable encryption on databases that match specific conditions like owner, compatibility level, or encryption status.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -NoEncryptionKeyDrop

Prevents the Database Encryption Key (DEK) from being automatically dropped after disabling TDE. By default, the function removes the DEK to complete the decryption process.  
Use this switch when you need to retain the encryption key for future re-encryption or compliance requirements, though the database will remain in a partially encrypted state until the key is   
manually removed.

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
