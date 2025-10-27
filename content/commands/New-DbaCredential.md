---
title: "New-DbaCredential"
slug: "New-DbaCredential"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a SQL Server credential for authentication to external resources"
tags:
  - "Certificate"
  - "Credential"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaCredential.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaCredential"
draft: false
---

# New-DbaCredential

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaCredential](https://github.com/dataplat/dbatools/blob/master/public/New-DbaCredential.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaCredential](https://dataplat.github.io/boh#New-DbaCredential).

## Synopsis

Creates a SQL Server credential for authentication to external resources

## Description

Creates a SQL Server credential that stores authentication information for connecting to external resources like Azure storage accounts, network shares, or service accounts. Credentials are commonly used for backup to URL operations, SQL Agent job authentication, and accessing external data sources. The function supports various authentication methods including traditional username/password, Azure storage access keys, SAS tokens, and managed identities.

## Syntax

```powershell
New-DbaCredential
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String>]
    [-Identity] <String>
    [[-SecurePassword] <SecureString>]
    [[-MappedClassType] <String>]
    [[-ProviderName] <String>]
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
PS C:\> New-DbaCredential -SqlInstance Server1 -Name MyCredential -Identity "ad\user" -SecurePassword (Get-Credential NoUsernameNeeded).Password
```

It will create a credential named "MyCredential" that as "ad\user" as identity and a password on server1 if it does not exist.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaCredential -SqlInstance Server1 -Identity "MyIdentity"
```

It will create a credential with identity value "MyIdentity" and same name but without a password on server1 if it does not exist.<br>

#####  Example:  3 

```powershell
PS C:\> $params = @{
>>SqlInstance = "Server1"
>>Name = "AzureBackupBlobStore"
>>Identity = "https://<Azure Storage Account Name>.blob.core.windows.net/<Blob Container Name>"
>>SecurePassword = (Get-Credential NoUsernameNeeded).Password # <Azure Storage Account Access Key>
>>}
PS C:\> New-DbaCredential @params
```

Creates a credential, "AzureBackupBlobStore", on Server1 using the Access Keys for Backup To URL. Identity must be the full URI for the blob container that will be the backup target. The <br>
SecurePassword supplied is one of the two Access Keys for the Azure Storage Account.<br>

#####  Example:  4 

```powershell
PS C:\> $sasParams = @{
>>SqlInstance = "server1"
>>Name = "https://<azure storage account name>.blob.core.windows.net/<blob container>"
>>Identity = "SHARED ACCESS SIGNATURE"
>>SecurePassword = (Get-Credential NoUsernameNeeded).Password # <Shared Access Token>
>>}
PS C:\> New-DbaCredential @sasParams
```

Create a credential on Server1 using a SAS token for Backup To URL. The Name is the full URI for the blob container that will be the backup target.<br>
The SecurePassword will be the Shared Access Token (SAS), as a SecureString.<br>

#####  Example:  5 

```powershell
PS C:\> $managedIdentityParams = @{
>>SqlInstance = "server1"
>>Name = "https://<azure storage account name>.blob.core.windows.net/<blob container>"
>>Identity = "Managed Identity"
>>}
PS C:\> New-DbaCredential @managedIdentityParams
```

Create a credential on Server1 using a Managed Identity for Backup To URL. The Name is the full URI for the blob container that will be the backup target.<br>
As no password is needed in this case, we just don't pass the -SecurePassword parameter.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server(s)

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Identity

Defines the authentication identity for the credential. Can be a Windows account, service account, Azure storage URI, or special values like 'SHARED ACCESS SIGNATURE' or 'Managed Identity'.  
For Azure backup scenarios, use the full blob container URI or SAS/Managed Identity authentication methods.

| Property | Value |
| --- | --- |
| Alias | CredentialIdentity |
| Required | True |
| Pipeline | false |
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

##### -Name

Specifies the name for the SQL Server credential object. Defaults to the Identity value if not provided.  
Use a descriptive name that identifies the purpose, like 'AzureBackupStorage' or 'NetworkShareAccess'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $Identity |

##### -SecurePassword

Provides the password or access key as a SecureString for credential authentication. Required for most authentication methods except Managed Identity.  
For Azure storage, this would be the access key or SAS token. Use Get-Credential or ConvertTo-SecureString to create the SecureString.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MappedClassType

Specifies the credential mapping class type. Use 'CryptographicProvider' for credentials that will use cryptographic providers, or 'None' for standard credentials.  
Most common scenarios use 'None' (default). Only specify 'CryptographicProvider' when working with EKM or custom cryptographic providers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | None |
| Accepted Values | CryptographicProvider,None |

##### -ProviderName

Specifies the name of the cryptographic provider when MappedClassType is 'CryptographicProvider'.  
Only required when using Extensible Key Management (EKM) scenarios with third-party cryptographic providers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops and recreates the credential if it already exists on the target instance.  
Use this when you need to update an existing credential's identity or password, as SQL Server credentials cannot be modified once created.

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

Shows what would happen if the command were to run. No actions are actually performed

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
