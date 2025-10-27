---
title: "New-DbaAzAccessToken"
slug: "New-DbaAzAccessToken"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Generates OAuth2 access tokens for Azure SQL Database and other Azure services authentication."
tags:
  - "Connect"
  - "Connection"
  - "Azure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAzAccessToken.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAzAccessToken"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaAzAccessToken</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaAzAccessToken.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Generates OAuth2 access tokens for Azure SQL Database and other Azure services authentication.

## Description

Creates OAuth2 access tokens for connecting to Azure SQL Database and other Azure services without storing passwords in scripts. Supports Managed Identity authentication from Azure VMs, Service Principal authentication for applications, and renewable tokens for long-running connections. The generated tokens can be used directly with Connect-DbaInstance and other dbatools commands to establish secure, modern authentication to Azure resources.  
  
Want to know more about Access Tokens? This page explains it well: https://dzone.com/articles/using-managed-identity-to-securely-access-azure-re

## Syntax

```powershell
New-DbaAzAccessToken
    [-Type] <String>
    [[-Subtype] <String>]
    [[-Config] <Object>]
    [[-Credential] <PSCredential>]
    [[-Tenant] <String>]
    [[-Thumbprint] <String>]
    [[-Store] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> New-DbaAzAccessToken -Type ManagedIdentity
```
{: data-copyable="true" data-clean-code="New-DbaAzAccessToken -Type ManagedIdentity" }

Returns a plain-text token for Managed Identities for SQL Azure Db.<br>

#####  Example:  2 

```powershell
PS C:\> $token = New-DbaAzAccessToken -Type ManagedIdentity -Subtype AzureSqlDb
PS C:\> $server = Connect-DbaInstance -SqlInstance myserver.database.windows.net -Database mydb -AccessToken $token -DisableException
```
{: data-copyable="true" data-clean-code="$token = New-DbaAzAccessToken -Type ManagedIdentity -Subtype AzureSqlDb
$server = Connect-DbaInstance -SqlInstance myserver.database.windows.net -Database mydb -AccessToken $token -DisableException" }

Generates a token then uses it to connect to Azure SQL DB then connects to an Azure SQL Db<br>

#####  Example:  3 

```powershell
PS C:\> $token = New-DbaAzAccessToken -Type ServicePrincipal -Tenant whatup.onmicrosoft.com -Credential ee590f55-9b2b-55d4-8bca-38ab123db670
PS C:\> $server = Connect-DbaInstance -SqlInstance myserver.database.windows.net -Database mydb -AccessToken $token -DisableException
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```
{: data-copyable="true" data-clean-code="$token = New-DbaAzAccessToken -Type ServicePrincipal -Tenant whatup.onmicrosoft.com -Credential ee590f55-9b2b-55d4-8bca-38ab123db670
$server = Connect-DbaInstance -SqlInstance myserver.database.windows.net -Database mydb -AccessToken $token -DisableException
Invoke-DbaQuery -SqlInstance $server -Query &quot;select 1 as test&quot;" }

Generates a token then uses it to connect to Azure SQL DB then connects to an Azure SQL Db.<br>
Once the connection is made, it is used to perform a test query.<br>

### Required Parameters

##### -Type

Specifies the authentication method for generating the access token. ManagedIdentity uses Azure VM identity for password-free authentication, ServicePrincipal uses application credentials for   
automated scripts, and RenewableServicePrincipal creates tokens that automatically refresh for long-running connections.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | ManagedIdentity,ServicePrincipal,RenewableServicePrincipal |

### Optional Parameters

##### -Subtype

Determines which Azure service resource to generate the token for. AzureSqlDb creates tokens for Azure SQL Database connections, while other options like KeyVault, Storage, and ResourceManager target   
their respective Azure services. Defaults to AzureSqlDb for database connections.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | AzureSqlDb |
| Accepted Values | AzureSqlDb,ResourceManager,DataLake,EventHubs,KeyVault,ResourceManager,ServiceBus,Storage |

##### -Config

Optional configuration object for advanced token generation scenarios. Typically auto-generated based on the Subtype parameter and rarely needs manual specification. Use this only when you need   
custom resource URLs or API versions not covered by standard subtypes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Credential

When using the ServicePrincipal type, a Credential is required. The username is the App ID and Password is the App Password  
https://docs.microsoft.com/en-us/azure/active-directory/user-help/multi-factor-authentication-end-user-app-passwords

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Tenant

Specifies the Azure Active Directory tenant ID or domain name for Service Principal authentication. Required when using ServicePrincipal or RenewableServicePrincipal types. Use your organization's   
tenant ID (GUID format) or domain name like 'contoso.onmicrosoft.com'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'azure.tenantid') |

##### -Thumbprint

Certificate thumbprint for Managed Service Identity authentication. Use this when your Azure VM or service uses certificate-based authentication instead of the default metadata endpoint. Defaults to   
the value stored in dbatools configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'azure.certificate.thumbprint') |

##### -Store

Specifies the certificate store location for MSI certificates. Choose CurrentUser for user-specific certificates or LocalMachine for system-wide certificates. Use with Thumbprint parameter for   
certificate-based Managed Service Identity authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'azure.certificate.store') |
| Accepted Values | CurrentUser,LocalMachine |

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
