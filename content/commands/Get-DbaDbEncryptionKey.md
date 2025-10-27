---
title: "Get-DbaDbEncryptionKey"
slug: "Get-DbaDbEncryptionKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Transparent Data Encryption (TDE) database encryption keys from SQL Server databases"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbEncryptionKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbEncryptionKey"
draft: false
---

# Get-DbaDbEncryptionKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbEncryptionKey](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbEncryptionKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbEncryptionKey](https://dataplat.github.io/boh#Get-DbaDbEncryptionKey).

## Synopsis

Retrieves Transparent Data Encryption (TDE) database encryption keys from SQL Server databases

## Description

Retrieves detailed information about Transparent Data Encryption (TDE) database encryption keys including encryption state, algorithm, and certificate details. This function helps DBAs audit encrypted databases, verify TDE configuration, and gather key information for compliance reporting or troubleshooting encryption issues. Returns comprehensive key properties like thumbprint, encryption type, and important dates for certificate rotation planning.

## Syntax

```powershell
Get-DbaDbEncryptionKey
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbEncryptionKey -SqlInstance sql2016
```

Gets all encryption keys from sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbEncryptionKey -SqlInstance sql01 -Database db1
```

Gets the encryption key for the db1 database on the sql01 instance<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbEncryptionKey -SqlInstance sql01 -Database db1 -Certificate cert1
```

Gets the cert1 encryption key within the db1 database<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbEncryptionKey -SqlInstance sql01 -Database db1 -Subject 'Availability Group Cert'
```

Gets the encryption key within the db1 database that has the subject 'Availability Group Cert' on sql01<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance

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

Specifies which databases to retrieve TDE encryption keys from. Accepts wildcards for pattern matching.  
Use this when you need to check encryption status for specific databases instead of all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the encryption key retrieval operation. Useful when scanning all databases except certain ones like system databases or test databases.  
Commonly used to skip tempdb or databases that are known to be unencrypted.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase or other dbatools commands. This allows you to filter databases using Get-DbaDatabase's extensive filtering options before checking encryption keys.  
Particularly useful for complex database selection scenarios or when working with specific database collections.

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


&nbsp;
