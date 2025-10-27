---
title: "Remove-DbaDbEncryptionKey"
slug: "Remove-DbaDbEncryptionKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes database encryption keys from SQL Server databases to disable Transparent Data Encryption"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbEncryptionKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbEncryptionKey"
draft: false
---

# Remove-DbaDbEncryptionKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbEncryptionKey](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbEncryptionKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbEncryptionKey](https://dataplat.github.io/boh#Remove-DbaDbEncryptionKey).

## Synopsis

Removes database encryption keys from SQL Server databases to disable Transparent Data Encryption

## Description

Removes database encryption keys (DEK) from specified databases by executing DROP DATABASE ENCRYPTION KEY. This is typically used when disabling Transparent Data Encryption (TDE) on a database or during encryption key rotation workflows. The database must be unencrypted before the key can be removed, so run ALTER DATABASE [database] SET ENCRYPTION OFF first if TDE is currently active.

## Syntax

```powershell
Remove-DbaDbEncryptionKey
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-InputObject] <DatabaseEncryptionKey[]>]
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
PS C:\> Remove-DbaDbEncryptionKey -SqlInstance sql01 -Database test
```

Removes the encryption key in the master database on sql01 if it exists.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbEncryptionKey -SqlInstance sql01 -Database db1 -Confirm:$false
```

Suppresses all prompts then removes the encryption key in the 'db1' database on sql01.<br>

### Optional Parameters

##### -SqlInstance

The SQL Server to create the encryption keys on.

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

Specifies the database(s) from which to remove the database encryption key (DEK).  
Required when using SqlInstance parameter to target specific databases for encryption key removal.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database encryption key objects from Get-DbaDbEncryptionKey via pipeline.  
Use this when you need to remove keys from a filtered set of databases or when chaining commands together.

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
