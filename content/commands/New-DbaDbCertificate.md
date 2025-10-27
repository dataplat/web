---
title: "New-DbaDbCertificate"
slug: "New-DbaDbCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new database certificate for encryption and security purposes"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbCertificate"
draft: false
---

# New-DbaDbCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbCertificate](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbCertificate](https://dataplat.github.io/boh#New-DbaDbCertificate).

## Synopsis

Creates a new database certificate for encryption and security purposes

## Description

Creates a new database certificate within a specified database using SQL Server Management Objects. Database certificates are essential for implementing Transparent Data Encryption (TDE), encrypting stored procedures and functions, securing Service Broker dialogs, and enabling column-level encryption. The certificate can be password-protected or secured by the database master key, with configurable expiration dates and subject information. If no database is specified, the certificate will be created in the master database.

## Syntax

```powershell
New-DbaDbCertificate
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-Database] <String[]>]
    [[-Subject] <String[]>]
    [[-StartDate] <DateTime>]
    [[-ExpirationDate] <DateTime>]
    [-ActiveForServiceBrokerDialog]
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
PS C:\> New-DbaDbCertificate -SqlInstance Server1
```

You will be prompted to securely enter your password, then a certificate will be created in the master database on server1 if it does not exist.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbCertificate -SqlInstance Server1 -Database db1 -Confirm:$false
```

Suppresses all prompts to install but prompts to securely enter your password and creates a certificate in the 'db1' database<br>

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

Specifies the name for the certificate. Defaults to the database name if not provided.  
Use descriptive names that indicate the certificate's purpose, such as 'TDE_Certificate' or 'ColumnEncryption_Cert'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the database where the certificate will be created. Defaults to master if not specified.  
Use this when you need certificates in specific databases for TDE, column-level encryption, or Service Broker security.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -Subject

Specifies the certificate subject field for identification purposes. Defaults to '[DatabaseName] Database Certificate'.  
Use meaningful subjects like 'CN=MyApp TDE Certificate' to help identify certificate purposes in production environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StartDate

Specifies when the certificate becomes valid for use. Defaults to the current date and time.  
Set future start dates when you need to prepare certificates in advance for scheduled encryption implementations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-Date) |

##### -ExpirationDate

Specifies when the certificate expires and becomes invalid. Defaults to 5 years from the start date.  
Plan expiration dates carefully as expired certificates will prevent access to encrypted data and require certificate renewal procedures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $StartDate.AddYears(5) |

##### -ActiveForServiceBrokerDialog

Enables the certificate for Service Broker dialog security and message encryption. Disabled by default.  
Use this when implementing Service Broker applications that require encrypted message communication between services.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SecurePassword

Specifies a password to encrypt the certificate's private key. If not provided, the database master key protects the certificate.  
Use passwords when you need to backup/restore certificates across instances or when the database master key is not available.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline operations.  
Use this to create certificates across multiple databases efficiently by piping database objects from Get-DbaDatabase.

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
