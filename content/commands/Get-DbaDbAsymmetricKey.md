---
title: "Get-DbaDbAsymmetricKey"
slug: "Get-DbaDbAsymmetricKey"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves asymmetric keys from SQL Server databases for encryption management and security auditing"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbAsymmetricKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbAsymmetricKey"
draft: false
---

# Get-DbaDbAsymmetricKey

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbAsymmetricKey](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbAsymmetricKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbAsymmetricKey](https://dataplat.github.io/boh#Get-DbaDbAsymmetricKey).

## Synopsis

Retrieves asymmetric keys from SQL Server databases for encryption management and security auditing

## Description

Retrieves asymmetric keys stored in SQL Server databases, including their encryption algorithms, key lengths, owners, and thumbprints.  
This function is essential for security audits and encryption key management, allowing DBAs to inventory all asymmetric keys across databases without manually querying system catalogs.  
Asymmetric keys are used for encryption, digital signatures, and certificate creation in SQL Server's transparent data encryption and column-level encryption features.  
Returns detailed key properties to help with compliance reporting and security assessments.

## Syntax

```powershell
Get-DbaDbAsymmetricKey
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Name] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbAsymmetricKey -SqlInstance sql2016
```

Gets all Asymmetric Keys<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbAsymmetricKey -SqlInstance Server1 -Database db1
```

Gets the Asymmetric Keys for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbAsymmetricKey -SqlInstance Server1 -Database db1 -Name key1
```

Gets the key1 Asymmetric Key within the db1 database<br>

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

Specifies which databases to scan for asymmetric keys. Accepts wildcards for pattern matching.  
Use this when you need to audit encryption keys in specific databases instead of scanning all databases on the instance.  
Essential for targeted security assessments or compliance audits of particular applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the asymmetric key scan. Accepts wildcards for pattern matching.  
Use this to skip system databases, test databases, or databases known to not contain encryption keys.  
Helps focus audits on production databases and reduces noise in security assessments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Filters results to asymmetric keys with specific names. Accepts wildcards and multiple key names.  
Use this when tracking specific keys during key rotation, compliance audits, or troubleshooting encryption issues.  
Common when validating that required encryption keys exist across multiple databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from the pipeline, typically from Get-DbaDatabase.  
Use this to chain database filtering with key retrieval, such as getting keys from databases with specific properties.  
Enables advanced filtering scenarios like scanning only databases created after a certain date or with particular owners.

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
