---
title: "Remove-DbaDbAsymmetricKey"
slug: "Remove-DbaDbAsymmetricKey"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes asymmetric keys from SQL Server databases"
tags:
  - "Security"
  - "Key"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbAsymmetricKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbAsymmetricKey"
draft: false
---

# Remove-DbaDbAsymmetricKey

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbAsymmetricKey](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbAsymmetricKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbAsymmetricKey](https://dataplat.github.io/boh#Remove-DbaDbAsymmetricKey).

## Synopsis

Removes asymmetric keys from SQL Server databases

## Description

Removes asymmetric keys from SQL Server databases by executing DROP ASYMMETRIC KEY commands. Asymmetric keys are part of SQL Server's cryptographic hierarchy used for encryption, digital signatures, and protecting symmetric keys or certificates. This function helps DBAs clean up unused encryption objects during security audits, decommission old encryption schemes, or remove keys that are no longer needed for compliance requirements. Supports both direct parameter input and pipeline input from Get-DbaDbAsymmetricKey for bulk operations.

## Syntax

```powershell
Remove-DbaDbAsymmetricKey
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-Database] <String[]>]
    [[-InputObject] <AsymmetricKey[]>]
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
PS C:\> Remove-DbaDbAsymmetricKey -SqlInstance Server1 -Database Enctest -Name AsCert1
```

The Asymmetric Key AsCert1 will be removed from the Enctest database on Instance Server1<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbAsymmetricKey -SqlInstance Server1 -Database Enctest  | Remove-DbaDbAsymmetricKey
```

Will remove all the asymmetric keys found in the Enctrst databae on the Server1 instance<br>

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

Specifies the name of the asymmetric key to remove from the database.  
Use this when you know the exact key name to target specific encryption objects for deletion.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the database containing the asymmetric key to be removed. Defaults to 'master' if not specified.  
Use this to target specific databases when cleaning up encryption objects during security audits or decommissioning operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -InputObject

Accepts AsymmetricKey objects from Get-DbaDbAsymmetricKey for pipeline operations.  
Use this when you need to remove multiple keys or when filtering keys based on specific criteria before deletion.

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
