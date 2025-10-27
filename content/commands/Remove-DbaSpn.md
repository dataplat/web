---
title: "Remove-DbaSpn"
slug: "Remove-DbaSpn"
date: 2024-01-01
layout: "single"
author: "Drew Furgiuele (@pittfurg), port1433.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes Service Principal Names from Active Directory service accounts and cleans up related Kerberos delegation"
tags:
  - "SPN"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaSpn.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaSpn"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaSpn</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaSpn.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Removes Service Principal Names from Active Directory service accounts and cleans up related Kerberos delegation

## Description

Connects to Active Directory to remove specified SPNs from SQL Server service accounts and automatically cleans up associated Kerberos delegation settings. This is essential when decommissioning SQL Server instances, changing service accounts, or troubleshooting Kerberos authentication issues where duplicate or incorrect SPNs exist. The function searches for the service account (user or computer), removes the SPN from the servicePrincipalName property, and also removes any corresponding delegation entries from msDS-AllowedToDelegateTo to maintain a clean AD environment.  
  
Requires write access to Active Directory through the provided credentials.

## Syntax

```powershell
Remove-DbaSpn
    [-SPN] <String>
    [-ServiceAccount] <String>
    [[-Credential] <PSCredential>]
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
PS C:\> Remove-DbaSpn -SPN MSSQLSvc\SQLSERVERA.domain.something -ServiceAccount domain\account
```
{: data-copyable="true" data-clean-code="Remove-DbaSpn -SPN MSSQLSvc\SQLSERVERA.domain.something -ServiceAccount domain\account" }

Connects to Active Directory and removes a provided SPN from the given account (and also the relative delegation)<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaSpn -SPN MSSQLSvc\SQLSERVERA.domain.something -ServiceAccount domain\account -EnableException
```
{: data-copyable="true" data-clean-code="Remove-DbaSpn -SPN MSSQLSvc\SQLSERVERA.domain.something -ServiceAccount domain\account -EnableException" }

Connects to Active Directory and removes a provided SPN from the given account, suppressing all error messages and throw exceptions that can be caught instead<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaSpn -SPN MSSQLSvc\SQLSERVERA.domain.something -ServiceAccount domain\account -Credential ad\sqldba
```
{: data-copyable="true" data-clean-code="Remove-DbaSpn -SPN MSSQLSvc\SQLSERVERA.domain.something -ServiceAccount domain\account -Credential ad\sqldba" }

Connects to Active Directory and removes a provided SPN to the given account. Uses alternative account to connect to AD.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaSpn -ComputerName sql2005 | Where-Object { $_.isSet -eq $true } | Remove-DbaSpn -WhatIf
```
{: data-copyable="true" data-clean-code="Test-DbaSpn -ComputerName sql2005 | Where-Object { $_.isSet -eq $true } | Remove-DbaSpn -WhatIf" }

Shows what would happen trying to remove all set SPNs for sql2005 and the relative delegations<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaSpn -ComputerName sql2005 | Where-Object { $_.isSet -eq $true } | Remove-DbaSpn
```
{: data-copyable="true" data-clean-code="Test-DbaSpn -ComputerName sql2005 | Where-Object { $_.isSet -eq $true } | Remove-DbaSpn" }

Removes all set SPNs for sql2005 and the relative delegations<br>

### Required Parameters

##### -SPN

Specifies the exact Service Principal Name to remove from Active Directory. Must include the full SPN format like 'MSSQLSvc/servername:port' or 'MSSQLSvc/servername.domain.com'.  
Use this when decommissioning SQL instances, changing service accounts, or cleaning up duplicate SPNs that cause Kerberos authentication failures.

| Property | Value |
| --- | --- |
| Alias | RequiredSPN |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -ServiceAccount

Specifies the Active Directory account (user or computer) that currently owns the SPN to be removed. Use domain\username format for user accounts or COMPUTERNAME$ for computer accounts.  
This should match the account currently running the SQL Server service that you're decommissioning or reconfiguring.

| Property | Value |
| --- | --- |
| Alias | InstanceServiceAccount,AccountName |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -Credential

The credential you want to use to connect to Active Directory to make the changes

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
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

Shows what would happen if the command was executed

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Turns confirmations before changes on or off

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
