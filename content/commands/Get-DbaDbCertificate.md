---
title: "Get-DbaDbCertificate"
slug: "Get-DbaDbCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database-level certificates from SQL Server databases for security auditing and certificate management"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbCertificate"
draft: false
---

# Get-DbaDbCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbCertificate](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbCertificate](https://dataplat.github.io/boh#Get-DbaDbCertificate).

## Synopsis

Retrieves database-level certificates from SQL Server databases for security auditing and certificate management

## Description

Retrieves all certificates stored within SQL Server databases, providing detailed information about each certificate including expiration dates, issuers, and encryption properties. This function is essential for DBAs managing Transparent Data Encryption (TDE), Service Broker security, or other database-level encryption features. Use this to audit certificate inventory across your environment, monitor approaching expiration dates for proactive renewal planning, and ensure compliance with security policies that require certificate tracking and rotation.

## Syntax

```powershell
Get-DbaDbCertificate
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Certificate] <Object[]>]
    [[-Subject] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbCertificate -SqlInstance sql2016
```

Gets all certificates<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbCertificate -SqlInstance Server1 -Database db1
```

Gets the certificate for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbCertificate -SqlInstance Server1 -Database db1 -Certificate cert1
```

Gets the cert1 certificate within the db1 database<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbCertificate -SqlInstance Server1 -Database db1 -Subject 'Availability Group Cert'
```

Gets the certificate within the db1 database that has the subject 'Availability Group Cert'<br>

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

Specifies which databases to search for certificates. Accepts one or more database names as strings.  
Use this when you need to audit certificates in specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to skip when retrieving certificates. Accepts one or more database names as strings.  
Useful when you want to audit most databases but exclude system databases or specific databases that don't contain certificates of interest.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Certificate

Filters results to specific certificates by their name property. Accepts one or more certificate names as strings.  
Use this when you need to check the status of known certificates across multiple databases, such as tracking TDE certificates or Service Broker certificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Subject

Filters results to certificates with specific subject names. Accepts one or more subject strings for exact matching.  
Helpful when searching for certificates based on their distinguished name or common name, particularly when certificate names aren't descriptive but subjects are standardized.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase through the PowerShell pipeline.  
This allows you to chain commands like Get-DbaDatabase | Get-DbaDbCertificate for more complex filtering scenarios.

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
