---
title: "Get-DbaSpn"
slug: "Get-DbaSpn"
date: 2024-01-01
layout: "single"
author: "Drew Furgiuele (@pittfurg), port1433.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves existing Service Principal Names (SPNs) from Active Directory for SQL Server services"
tags:
  - "SPN"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSpn.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaSpn"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaSpn</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSpn.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Drew Furgiuele (@pittfurg), port1433.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves existing Service Principal Names (SPNs) from Active Directory for SQL Server services

## Description

Queries Active Directory to return SPNs that are currently registered for SQL Server services on specified computers or service accounts. This is essential for troubleshooting Kerberos authentication issues, as missing or duplicate SPNs prevent clients from authenticating to SQL Server using integrated security. Use this command to audit your current SPN configuration before making changes with Set-DbaSpn or when investigating authentication failures. The function returns detailed information including the service class (MSSQLSvc), port numbers, and associated Active Directory accounts.

## Syntax

```powershell
Get-DbaSpn
    [[-ComputerName] <String[]>]
    [[-AccountName] <String[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaSpn -ComputerName SQLSERVERA -Credential ad\sqldba
```
{: data-copyable="true" data-clean-code="Get-DbaSpn -ComputerName SQLSERVERA -Credential ad\sqldba" }

Returns a custom object with SearchTerm (ServerName) and the SPNs that were found<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSpn -AccountName domain\account -Credential ad\sqldba
```
{: data-copyable="true" data-clean-code="Get-DbaSpn -AccountName domain\account -Credential ad\sqldba" }

Returns a custom object with SearchTerm (domain account) and the SPNs that were found<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaSpn -ComputerName SQLSERVERA,SQLSERVERB -Credential ad\sqldba
```
{: data-copyable="true" data-clean-code="Get-DbaSpn -ComputerName SQLSERVERA,SQLSERVERB -Credential ad\sqldba" }

Returns a custom object with SearchTerm (ServerName) and the SPNs that were found for multiple computers<br>

### Optional Parameters

##### -ComputerName

Specifies the SQL Server computer names to retrieve registered SPNs for. Defaults to localhost if not specified.  
Use this when you need to audit SPN configuration on specific servers or when troubleshooting Kerberos authentication issues across multiple SQL instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -AccountName

Specifies the Active Directory service accounts to search for registered SQL Server SPNs. Accepts both user accounts and computer accounts ending with '$'.  
Use this when you need to audit which SPNs are registered under specific service accounts or when investigating authentication issues related to particular accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Credential

User credential to connect to the remote servers or active directory.

| Property | Value |
| --- | --- |
| Alias |  |
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


&nbsp;
