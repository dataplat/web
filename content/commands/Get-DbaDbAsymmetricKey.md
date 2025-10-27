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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbAsymmetricKey</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbAsymmetricKey.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stuart Moore (@napalmgram), stuart-moore.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaDbAsymmetricKey -SqlInstance sql2016" }

Gets all Asymmetric Keys<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbAsymmetricKey -SqlInstance Server1 -Database db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbAsymmetricKey -SqlInstance Server1 -Database db1" }

Gets the Asymmetric Keys for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbAsymmetricKey -SqlInstance Server1 -Database db1 -Name key1
```
{: data-copyable="true" data-clean-code="Get-DbaDbAsymmetricKey -SqlInstance Server1 -Database db1 -Name key1" }

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
