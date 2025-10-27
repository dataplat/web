---
title: "Stop-DbaDbEncryption"
slug: "Stop-DbaDbEncryption"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Disables Transparent Data Encryption (TDE) on all user databases across a SQL Server instance"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaDbEncryption.ps1"
bohUrl: "https://dataplat.github.io/boh#Stop-DbaDbEncryption"
draft: false
---

# Stop-DbaDbEncryption

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Stop-DbaDbEncryption](https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaDbEncryption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Stop-DbaDbEncryption](https://dataplat.github.io/boh#Stop-DbaDbEncryption).

## Synopsis

Disables Transparent Data Encryption (TDE) on all user databases across a SQL Server instance

## Description

Disables Transparent Data Encryption (TDE) on all user databases within a SQL Server instance by calling Disable-DbaDbEncryption for each encrypted database found. This function automatically excludes system databases (master, model, tempdb, msdb, resource) and only processes databases that currently have encryption enabled.  
  
This is commonly used during instance decommissioning, migration scenarios where TDE is not required in the target environment, or when standardizing security configurations across multiple databases. The function provides a convenient way to decrypt multiple databases at once rather than handling each database individually.  
  
Each database is fully decrypted and the Database Encryption Key (DEK) is dropped to complete the TDE removal process. Certificates and master keys remain untouched and available for other purposes.

## Syntax

```powershell
Stop-DbaDbEncryption
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
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
PS C:\> Stop-DbaDbEncryption -SqlInstance sql01
```

Removes this does that<br>

#####  Example:  2 

```powershell
PS C:\> Stop-DbaDbEncryption -SqlInstance sql01 -Confirm:$false
```

Removes this does that<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

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
