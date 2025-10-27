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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbCertificate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbCertificate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="New-DbaDbCertificate -SqlInstance Server1" }

You will be prompted to securely enter your password, then a certificate will be created in the master database on server1 if it does not exist.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbCertificate -SqlInstance Server1 -Database db1 -Confirm:$false
```
{: data-copyable="true" data-clean-code="New-DbaDbCertificate -SqlInstance Server1 -Database db1 -Confirm:$false" }

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
