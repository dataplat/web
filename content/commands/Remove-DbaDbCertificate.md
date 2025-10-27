---
title: "Remove-DbaDbCertificate"
slug: "Remove-DbaDbCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes database certificates from SQL Server databases"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbCertificate"
draft: false
---

# Remove-DbaDbCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbCertificate](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbCertificate](https://dataplat.github.io/boh#Remove-DbaDbCertificate).

## Synopsis

Removes database certificates from SQL Server databases

## Description

Removes database certificates from specified SQL Server databases using the DROP CERTIFICATE statement. This function is commonly used during certificate rotation, security cleanup, or when decommissioning encryption features like Transparent Data Encryption (TDE) or Always Encrypted. Certificates can be targeted individually by name or removed in bulk using pipeline input from Get-DbaDbCertificate.

## Syntax

```powershell
Remove-DbaDbCertificate
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Certificate] <String[]>]
    [[-InputObject] <Certificate[]>]
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
PS C:\> Remove-DbaDbCertificate -SqlInstance Server1
```

The certificate in the master database on server1 will be removed if it exists.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbCertificate -SqlInstance Server1 -Database db1 -Confirm:$false
```

Suppresses all prompts to remove the certificate in the 'db1' database and drops the key.<br>

### Optional Parameters

##### -SqlInstance

The SQL Server to create the certificates on.

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

Specifies the target databases containing certificates to remove. Accepts multiple database names.  
When omitted, the function will process certificates from all databases that contain the specified certificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Certificate

Specifies the names of certificates to remove from the target databases. Supports multiple certificate names.  
Use this to target specific certificates rather than removing all certificates found by Get-DbaDbCertificate.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts certificate objects from Get-DbaDbCertificate via pipeline input.  
This allows for advanced filtering and bulk operations when combined with other dbatools certificate functions.

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
