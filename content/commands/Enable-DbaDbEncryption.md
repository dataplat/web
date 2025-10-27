---
title: "Enable-DbaDbEncryption"
slug: "Enable-DbaDbEncryption"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Enables Transparent Data Encryption (TDE) on SQL Server databases"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaDbEncryption.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaDbEncryption"
draft: false
---

# Enable-DbaDbEncryption

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Enable-DbaDbEncryption](https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaDbEncryption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Enable-DbaDbEncryption](https://dataplat.github.io/boh#Enable-DbaDbEncryption).

## Synopsis

Enables Transparent Data Encryption (TDE) on SQL Server databases

## Description

Enables Transparent Data Encryption (TDE) on specified databases to protect data at rest. This is essential for compliance with regulations like HIPAA, PCI-DSS, and organizational security policies. The function automatically creates a Database Encryption Key (DEK) if one doesn't exist, using a certificate from the master database to encrypt it. By default, it verifies that the certificate has been backed up before proceeding, helping prevent data loss scenarios.

## Syntax

```powershell
Enable-DbaDbEncryption
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-EncryptorName] <String>]
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
PS C:\> Enable-DbaDbEncryption -SqlInstance sql2017, sql2016 -Database pubs
```

Enables database encryption on the pubs database on sql2017 and sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Enable-DbaDbEncryption -SqlInstance sql2017 -Database db1 -Confirm:$false
```

Suppresses all prompts to enable database encryption on the db1 database on sql2017<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017 -Database db1 | Enable-DbaDbEncryption -Confirm:$false
```

Suppresses all prompts to enable database encryption on the db1 database on sql2017<br>

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

Specifies which databases to enable Transparent Data Encryption (TDE) on. Accepts multiple database names.  
Use this when you need to enable encryption on specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EncryptorName

Specifies the certificate name in the master database to use for encrypting the Database Encryption Key (DEK).  
If not specified, the function will attempt to find an existing certificate. Use this when you have multiple certificates and need to specify which one to use for TDE.  
The certificate must exist in the master database and should be backed up to prevent data loss.

| Property | Value |
| --- | --- |
| Alias | Certificate,CertificateName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase through the pipeline.  
Use this when you want to filter databases first with Get-DbaDatabase and then enable TDE on the results.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Bypasses the certificate backup verification check and enables TDE even if the certificate hasn't been backed up.  
Use with extreme caution as this could lead to data loss if the certificate is lost without a backup.  
Only use this in development environments or when you have confirmed the certificate is backed up through other means.

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
