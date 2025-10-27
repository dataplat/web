---
title: "Set-DbaSpn"
slug: "Set-DbaSpn"
date: 2024-01-01
layout: "single"
author: "Drew Furgiuele (@pittfurg), port1433.com"
availability: "Windows, Linux, macOS"
synopsis: "Sets an SPN for a given service account in active directory (and also enables delegation to the same SPN by default)"
tags:
  - "SPN"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaSpn.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaSpn"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaSpn</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaSpn.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Sets an SPN for a given service account in active directory (and also enables delegation to the same SPN by default)

## Description

This function will connect to Active Directory and search for an account. If the account is found, it will attempt to add an SPN. Once the SPN is added, the function will also set delegation to that service, unless -NoDelegation is specified. In order to run this function, the credential you provide must have write access to Active Directory.  
  
Note: This function supports -WhatIf

## Syntax

```powershell
Set-DbaSpn
    [-SPN] <String>
    [-ServiceAccount] <String>
    [[-Credential] <PSCredential>]
    [-NoDelegation]
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
PS C:\> Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account
PS C:\> Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account -EnableException
```
{: data-copyable="true" data-clean-code="Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account
Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account -EnableException" }

Connects to Active Directory and adds a provided SPN to the given account.<br>
Connects to Active Directory and adds a provided SPN to the given account, suppressing all error messages and throw exceptions that can be caught instead<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account -Credential ad\sqldba
```
{: data-copyable="true" data-clean-code="Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account -Credential ad\sqldba" }

Connects to Active Directory and adds a provided SPN to the given account. Uses alternative account to connect to AD.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account -NoDelegation
```
{: data-copyable="true" data-clean-code="Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account -NoDelegation" }

Connects to Active Directory and adds a provided SPN to the given account, without the delegation.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaSpn -ComputerName sql2016 | Where-Object { $_.isSet -eq $false } | Set-DbaSpn
```
{: data-copyable="true" data-clean-code="Test-DbaSpn -ComputerName sql2016 | Where-Object { $_.isSet -eq $false } | Set-DbaSpn" }

Sets all missing SPNs for sql2016<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaSpn -ComputerName sql2016 | Where-Object { $_.isSet -eq $false } | Set-DbaSpn -WhatIf
```
{: data-copyable="true" data-clean-code="Test-DbaSpn -ComputerName sql2016 | Where-Object { $_.isSet -eq $false } | Set-DbaSpn -WhatIf" }

Displays what would happen trying to set all missing SPNs for sql2016<br>

### Required Parameters

##### -SPN

Specifies the Service Principal Name to register in Active Directory for SQL Server Kerberos authentication.  
Must follow the format 'MSSQLSvc/hostname:port' or 'MSSQLSvc/FQDN:port' for named instances.  
Use this to enable Kerberos authentication and eliminate double-hop authentication issues.

| Property | Value |
| --- | --- |
| Alias | RequiredSPN |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -ServiceAccount

Specifies the Active Directory account that runs the SQL Server service and will own the SPN.  
Can be a domain user account (domain\username) or computer account (computername$) depending on your SQL Server service configuration.  
This account must exist in Active Directory and you must have permissions to modify its properties.

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

##### -NoDelegation

Prevents automatic configuration of Kerberos constrained delegation for the specified SPN.  
Use this when you want to manually configure delegation later or when delegation is not required for your environment.  
By default, the function enables constrained delegation to allow the service account to authenticate to other services.

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
