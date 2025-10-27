---
title: "Get-DbaDbEncryption"
slug: "Get-DbaDbEncryption"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves comprehensive encryption inventory from SQL Server databases including TDE status, certificates, and keys."
tags:
  - "Encryption"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbEncryption.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbEncryption"
draft: false
---

# Get-DbaDbEncryption

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbEncryption](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbEncryption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbEncryption](https://dataplat.github.io/boh#Get-DbaDbEncryption).

## Synopsis

Retrieves comprehensive encryption inventory from SQL Server databases including TDE status, certificates, and keys.

## Description

Audits database-level encryption across SQL Server instances by examining TDE encryption status, certificates, asymmetric keys, and symmetric keys within each database. Returns detailed information including key algorithms, lengths, owners, backup dates, and expiration dates for compliance reporting and security assessments. Particularly useful for encryption audits, certificate lifecycle management, and ensuring regulatory compliance across your SQL Server environment.

## Syntax

```powershell
Get-DbaDbEncryption
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-IncludeSystemDBs]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbEncryption -SqlInstance DEV01
```

List all encryption found on the instance by database<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbEncryption -SqlInstance DEV01 -Database MyDB
```

List all encryption found for the MyDB database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbEncryption -SqlInstance DEV01 -ExcludeDatabase MyDB
```

List all encryption found for all databases except MyDB.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbEncryption -SqlInstance DEV01 -IncludeSystemDBs
```

List all encryption found for all databases including the system databases.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.

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

##### -Database

Specifies which databases to examine for encryption objects including TDE, certificates, and keys. Accepts database names as strings or arrays.  
Use this to focus encryption audits on specific databases rather than scanning all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the encryption inventory scan. Useful when you need to audit most databases but skip certain ones.  
Commonly used to exclude databases with known encryption issues or maintenance databases that don't require encryption compliance checks.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemDBs

Includes system databases (master, model, msdb, tempdb) in the encryption inventory. By default, only user databases are scanned.  
Use this when conducting comprehensive security audits that require visibility into system database encryption objects and TDE configurations.

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


&nbsp;
