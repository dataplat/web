---
title: "New-DbaServiceMasterKey"
slug: "New-DbaServiceMasterKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a service master key in the master database for instance-level encryption hierarchy"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaServiceMasterKey.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaServiceMasterKey"
draft: false
---

# New-DbaServiceMasterKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaServiceMasterKey](https://github.com/dataplat/dbatools/blob/master/public/New-DbaServiceMasterKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaServiceMasterKey](https://dataplat.github.io/boh#New-DbaServiceMasterKey).

## Synopsis

Creates a service master key in the master database for instance-level encryption hierarchy

## Description

Creates a service master key in the master database, which sits at the top of SQL Server's encryption hierarchy. The service master key automatically encrypts and protects database master keys, certificates, and other encryption objects across all databases on the instance. This is typically the first step when implementing any encryption strategy on a SQL Server instance, as it eliminates the need to manually manage individual database master key passwords.

## Syntax

```powershell
New-DbaServiceMasterKey
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-SecurePassword] <SecureString>]
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
PS C:\> New-DbaServiceMasterKey -SqlInstance Server1
```

You will be prompted to securely enter your Service Key password, then a master key will be created in the master database on server1 if it does not exist.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
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

##### -Credential

Provides an alternative way to specify the service master key password using a PSCredential object.  
The password from the credential will be used to encrypt the service master key, offering a convenient method when you already have credentials stored.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurePassword

Specifies the password used to encrypt the service master key. Must be a SecureString object for security.  
Use this when you need to set a specific password for the service master key instead of being prompted interactively.

| Property | Value |
| --- | --- |
| Alias | Password |
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
