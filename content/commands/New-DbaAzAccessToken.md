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

# New-DbaAzAccessToken

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaAzAccessToken](https://github.com/dataplat/dbatools/blob/master/public/New-DbaAzAccessToken.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaAzAccessToken](https://dataplat.github.io/boh#New-DbaAzAccessToken).

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

Returns a plain-text token for Managed Identities for SQL Azure Db.<br>

#####  Example:  2 

```powershell
PS C:\> $token = New-DbaAzAccessToken -Type ManagedIdentity -Subtype AzureSqlDb
PS C:\> $server = Connect-DbaInstance -SqlInstance myserver.database.windows.net -Database mydb -AccessToken $token -DisableException
```

Generates a token then uses it to connect to Azure SQL DB then connects to an Azure SQL Db<br>

#####  Example:  3 

```powershell
PS C:\> $token = New-DbaAzAccessToken -Type ServicePrincipal -Tenant whatup.onmicrosoft.com -Credential ee590f55-9b2b-55d4-8bca-38ab123db670
PS C:\> $server = Connect-DbaInstance -SqlInstance myserver.database.windows.net -Database mydb -AccessToken $token -DisableException
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```

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
