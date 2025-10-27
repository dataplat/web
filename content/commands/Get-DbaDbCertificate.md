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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbCertificate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbCertificate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaDbCertificate -SqlInstance sql2016" }

Gets all certificates<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbCertificate -SqlInstance Server1 -Database db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbCertificate -SqlInstance Server1 -Database db1" }

Gets the certificate for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbCertificate -SqlInstance Server1 -Database db1 -Certificate cert1
```
{: data-copyable="true" data-clean-code="Get-DbaDbCertificate -SqlInstance Server1 -Database db1 -Certificate cert1" }

Gets the cert1 certificate within the db1 database<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbCertificate -SqlInstance Server1 -Database db1 -Subject 'Availability Group Cert'
```
{: data-copyable="true" data-clean-code="Get-DbaDbCertificate -SqlInstance Server1 -Database db1 -Subject 'Availability Group Cert'" }

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
