---
title: "Get-DbaCredential"
slug: "Get-DbaCredential"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Credentials configured for external authentication and resource access."
tags:
  - "Security"
  - "Credential"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCredential.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaCredential"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaCredential</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCredential.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Garry Bargsley (@gbargsley), blog.garrybargsley.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves SQL Server Credentials configured for external authentication and resource access.

## Description

Retrieves SQL Server Credentials that are stored securely on the server and used by SQL Server services to authenticate to external resources like file shares, web services, or other SQL Server instances. These credentials are essential for operations like backups to network locations, accessing external data sources, or running SQL Agent jobs that interact with external systems. The function returns detailed information about each credential including its name, associated identity, and provider configuration.

## Syntax

```powershell
Get-DbaCredential
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <String[]>]
    [[-ExcludeCredential] <String[]>]
    [[-Identity] <String[]>]
    [[-ExcludeIdentity] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaCredential -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Get-DbaCredential -SqlInstance localhost" }

Returns all SQL Credentials on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCredential -SqlInstance localhost, sql2016 -Name 'PowerShell Proxy'
```
{: data-copyable="true" data-clean-code="Get-DbaCredential -SqlInstance localhost, sql2016 -Name 'PowerShell Proxy'" }

Returns the SQL Credentials named 'PowerShell Proxy' for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaCredential -SqlInstance localhost, sql2016 -Identity ad\powershell
```
{: data-copyable="true" data-clean-code="Get-DbaCredential -SqlInstance localhost, sql2016 -Identity ad\powershell" }

Returns the SQL Credentials for the account 'ad\powershell' on the local and sql2016 SQL Server instances<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

##### -Credential

Filters results to only include SQL Server credentials with specific names. Accepts multiple credential names and supports wildcards.  
Use this when you need to check configuration for specific credentials like backup service accounts or external data source connections.  
Enclose names with spaces in quotes, such as "My Backup Credential".

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeCredential

Excludes SQL Server credentials with specified names from the results. Accepts multiple credential names to filter out.  
Useful when auditing all credentials except system or known service credentials that don't require review.

| Property | Value |
| --- | --- |
| Alias | ExcludeName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Identity

Filters results to only include credentials that use specific Windows identities or SQL logins. Accepts multiple identity names.  
Use this to find all credentials associated with a particular service account or user across different credential objects.  
Enclose identities with spaces in quotes, such as "DOMAIN\Service Account".

| Property | Value |
| --- | --- |
| Alias | CredentialIdentity |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeIdentity

Excludes credentials that use specified Windows identities or SQL logins from the results. Accepts multiple identity names.  
Helpful when auditing credentials but excluding known system accounts or service identities from the output.

| Property | Value |
| --- | --- |
| Alias | ExcludeCredentialIdentity |
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
