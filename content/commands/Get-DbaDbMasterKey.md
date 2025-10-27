---
title: "Get-DbaDbMasterKey"
slug: "Get-DbaDbMasterKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database master key information from SQL Server databases"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMasterKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMasterKey"
draft: false
---

# Get-DbaDbMasterKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMasterKey](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMasterKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMasterKey](https://dataplat.github.io/boh#Get-DbaDbMasterKey).

## Synopsis

Retrieves database master key information from SQL Server databases

## Description

Retrieves database master key objects and their metadata from one or more SQL Server databases. Database master keys are used to encrypt sensitive data through features like Transparent Data Encryption (TDE), column-level encryption, and certificate-based encryption. This function helps DBAs inventory encryption keys across their environment for security audits, compliance reporting, and encryption management. Returns key details including creation date, last modified date, and server encryption status.

## Syntax

```powershell
Get-DbaDbMasterKey
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
PS C:\> Get-DbaDbMasterKey -SqlInstance sql2016
```

Gets all master database keys<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMasterKey -SqlInstance Server1 -Database db1
```

Gets the master key for the db1 database<br>

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

Specifies which databases to check for database master keys. Accepts wildcards for pattern matching.  
Use this when you need to audit encryption keys for specific databases instead of scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when checking for master keys. Accepts wildcards for pattern matching.  
Use this to exclude system databases or databases you know don't use encryption features during security audits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase through the pipeline for master key analysis.  
Use this when you need to check master keys for databases that match specific criteria like compatibility level or size.

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
