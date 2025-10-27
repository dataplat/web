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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaCredential</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaCredential.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="New-DbaCredential -SqlInstance Server1 -Name MyCredential -Identity &quot;ad\user&quot; -SecurePassword (Get-Credential NoUsernameNeeded).Password" }

It will create a credential named "MyCredential" that as "ad\user" as identity and a password on server1 if it does not exist.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaCredential -SqlInstance Server1 -Identity "MyIdentity"
```
{: data-copyable="true" data-clean-code="New-DbaCredential -SqlInstance Server1 -Identity &quot;MyIdentity&quot;" }

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
{: data-copyable="true" data-clean-code="$params = @{
SqlInstance = &quot;Server1&quot;
Name = &quot;AzureBackupBlobStore&quot;
Identity = &quot;https://&lt;Azure Storage Account Name&gt;.blob.core.windows.net/&lt;Blob Container Name&gt;&quot;
SecurePassword = (Get-Credential NoUsernameNeeded).Password # &lt;Azure Storage Account Access Key&gt;
}
New-DbaCredential @params" }

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
{: data-copyable="true" data-clean-code="$sasParams = @{
SqlInstance = &quot;server1&quot;
Name = &quot;https://&lt;azure storage account name&gt;.blob.core.windows.net/&lt;blob container&gt;&quot;
Identity = &quot;SHARED ACCESS SIGNATURE&quot;
SecurePassword = (Get-Credential NoUsernameNeeded).Password # &lt;Shared Access Token&gt;
}
New-DbaCredential @sasParams" }

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
{: data-copyable="true" data-clean-code="$managedIdentityParams = @{
SqlInstance = &quot;server1&quot;
Name = &quot;https://&lt;azure storage account name&gt;.blob.core.windows.net/&lt;blob container&gt;&quot;
Identity = &quot;Managed Identity&quot;
}
New-DbaCredential @managedIdentityParams" }

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
