---
title: "Copy-DbaCredential"
slug: "Copy-DbaCredential"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Migrates SQL Server credentials between instances while preserving encrypted passwords."
tags:
  - "WSMan"
  - "Migration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaCredential.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaCredential"
draft: false
---

# Copy-DbaCredential

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaCredential](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaCredential.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaCredential](https://dataplat.github.io/boh#Copy-DbaCredential).

## Synopsis

Migrates SQL Server credentials between instances while preserving encrypted passwords.

## Description

Copies SQL Server credentials from source to destination instances without losing the original passwords, which normally can't be retrieved through standard methods. This function uses a Dedicated Admin Connection (DAC) and password decryption techniques to extract the actual credential passwords from the source server and recreate them identically on the destination.  
  
This is essential for server migrations, disaster recovery setup, or environment synchronization where you need to move service accounts, proxy credentials, or linked server authentication without having to reset passwords or contact application teams for credentials.  
  
The function requires sysadmin privileges on both servers, Windows administrator access, and DAC enabled on the source instance. It supports filtering by credential name or identity and can handle cryptographic provider credentials used for Extensible Key Management (EKM).  
  
Credit: Based on password decryption techniques by Antti Rantasaari (NetSPI, 2014)  
https://blog.netspi.com/decrypting-mssql-database-link-server-passwords/

## Syntax

```powershell
Copy-DbaCredential
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-ExcludeName] <String[]>]
    [[-Identity] <String[]>]
    [[-ExcludeIdentity] <String[]>]
    [-Force]
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
PS C:\> Copy-DbaCredential -Source sqlserver2014a -Destination sqlcluster
```

Copies all SQL Server Credentials on sqlserver2014a to sqlcluster. If Credentials exist on destination, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaCredential -Source sqlserver2014a -Destination sqlcluster -Name "PowerShell Proxy Account" -Force
```

Copies over one SQL Server Credential (PowerShell Proxy Account) from sqlserver to sqlcluster. If the Credential already exists on the destination, it will be dropped and recreated.<br>

### Required Parameters

##### -Source

Source SQL Server. You must have sysadmin access and server version must be SQL Server version 2005 or higher.  
You must be able to open a dedicated admin connection (DAC) to the source SQL Server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server. You must have sysadmin access and the server must be SQL Server 2005 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

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

This command requires access to the Windows OS via PowerShell remoting. Use this credential to connect to Windows using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Specifies the credential names to copy from the source server. Supports wildcards for pattern matching.  
Use this when you only need to migrate specific credentials instead of all credentials on the server.  
Note: if spaces exist in the credential name, you will have to type "" or '' around it.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeName

Specifies credential names to exclude from the copy operation. Supports wildcards for pattern matching.  
Use this when you want to copy most credentials but skip specific ones like test accounts or deprecated credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Identity

Specifies the credential identities (user accounts) to copy from the source server. Supports wildcards for pattern matching.  
Use this when you need to migrate credentials for specific service accounts or domain users rather than filtering by credential name.  
Note: if spaces exist in the credential identity, you will have to type "" or '' around it.

| Property | Value |
| --- | --- |
| Alias | CredentialIdentity |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeIdentity

Specifies credential identities (user accounts) to exclude from the copy operation. Supports wildcards for pattern matching.  
Use this when you want to copy most credentials but skip those associated with specific service accounts or domain users.

| Property | Value |
| --- | --- |
| Alias | ExcludeCredentialIdentity |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Overwrites existing credentials on the destination server by dropping and recreating them with the source values.  
Use this when you need to update credential passwords or identities that have changed on the source server since the last migration.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
