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

# Get-DbaCredential

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaCredential](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCredential.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaCredential](https://dataplat.github.io/boh#Get-DbaCredential).

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

Returns all SQL Credentials on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCredential -SqlInstance localhost, sql2016 -Name 'PowerShell Proxy'
```

Returns the SQL Credentials named 'PowerShell Proxy' for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaCredential -SqlInstance localhost, sql2016 -Identity ad\powershell
```

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
