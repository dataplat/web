---
title: "New-DbaDbMasterKey"
slug: "New-DbaDbMasterKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a database master key for encryption operations"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbMasterKey.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbMasterKey"
draft: false
---

# New-DbaDbMasterKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbMasterKey](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbMasterKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbMasterKey](https://dataplat.github.io/boh#New-DbaDbMasterKey).

## Synopsis

Creates a database master key for encryption operations

## Description

Creates a database master key, which is required for implementing Transparent Data Encryption (TDE), Always Encrypted, or other database-level encryption features. The master key serves as the root encryption key that protects other encryption keys within the database. Defaults to creating the key in the master database if no specific database is specified, and will prompt securely for a password if none is provided.

## Syntax

```powershell
New-DbaDbMasterKey
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-Database] <String[]>]
    [[-SecurePassword] <SecureString>]
    [[-InputObject] <Database[]>]
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
PS C:\> New-DbaDbMasterKey -SqlInstance Server1
```

You will be prompted to securely enter your password, then a master key will be created in the master database on server1 if it does not exist.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbMasterKey -SqlInstance Server1 -Credential usernamedoesntmatter
```

You will be prompted by a credential interface to securely enter your password, then a master key will be created in the master database on server1 if it does not exist.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbMasterKey -SqlInstance Server1 -Database db1 -Confirm:$false
```

Suppresses all prompts to install but prompts in th console to securely enter your password and creates a master key in the 'db1' database<br>

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

##### -Credential

Provides an alternative way to supply the master key password using a PSCredential object.  
Use this when you need to pass the password programmatically or when integrating with credential management systems. The password portion of the credential is used to encrypt the master key.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the database where the master key will be created. Defaults to master database if not specified.  
Use this when implementing encryption features like TDE or Always Encrypted in specific user databases rather than just the system master database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -SecurePassword

Provides the password used to encrypt the database master key as a SecureString object.  
If not specified, you'll be prompted to enter the password securely via console. This password is required for SQL Server to decrypt the master key when the service starts.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from the pipeline, typically from Get-DbaDatabase.  
Use this when you want to create master keys across multiple databases in a single pipeline operation or when working with pre-filtered database collections.

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
