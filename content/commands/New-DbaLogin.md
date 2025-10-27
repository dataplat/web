---
title: "New-DbaLogin"
slug: "New-DbaLogin"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar)"
availability: "Windows, Linux, macOS"
synopsis: "Creates SQL Server logins for authentication with configurable security policies and mapping options"
tags:
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaLogin"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaLogin</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaLogin.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Kirill Kravtsov (@nvarscar)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates SQL Server logins for authentication with configurable security policies and mapping options

## Description

Creates new SQL Server logins supporting Windows Authentication, SQL Authentication, certificate-mapped, asymmetric key-mapped, and Azure AD authentication. Handles password policies, expiration settings, SID preservation for migration scenarios, and credential mapping. Can copy existing logins between instances while preserving or modifying security settings, making it essential for user provisioning, migration projects, and security standardization across environments.

## Syntax

```powershell
New-DbaLogin
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [[-Login] <String[]>]
    [-InputObject <Object[]>]
    [-LoginRenameHashtable <Hashtable>]
    [[-SecurePassword] <SecureString>]
    [-MapToCredential <String>]
    [-Sid <Object>]
    [-DefaultDatabase <String>]
    [-Language <String>]
    [-PasswordExpirationEnabled]
    [-PasswordPolicyEnforced]
    [-PasswordMustChange]
    [-Disabled]
    [-DenyWindowsLogin]
    [-NewSid]
    [-ExternalProvider]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

New-DbaLogin
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Login <String[]>]
    [-InputObject <Object[]>]
    [-LoginRenameHashtable <Hashtable>]
    [-MapToAsymmetricKey <String>]
    [-MapToCredential <String>]
    [-Sid <Object>]
    [-Disabled]
    [-DenyWindowsLogin]
    [-NewSid]
    [-ExternalProvider]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

New-DbaLogin
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Login <String[]>]
    [-InputObject <Object[]>]
    [-LoginRenameHashtable <Hashtable>]
    [-MapToCertificate <String>]
    [-MapToCredential <String>]
    [-Sid <Object>]
    [-Disabled]
    [-DenyWindowsLogin]
    [-NewSid]
    [-ExternalProvider]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

New-DbaLogin
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Login <String[]>]
    [-InputObject <Object[]>]
    [-LoginRenameHashtable <Hashtable>]
    [-HashedPassword <String>]
    [-MapToCredential <String>]
    [-Sid <Object>]
    [-DefaultDatabase <String>]
    [-Language <String>]
    [-PasswordExpirationEnabled]
    [-PasswordPolicyEnforced]
    [-Disabled]
    [-DenyWindowsLogin]
    [-NewSid]
    [-ExternalProvider]
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
PS C:\> New-DbaLogin -SqlInstance Server1,Server2 -Login Newlogin
```
{: data-copyable="true" data-clean-code="New-DbaLogin -SqlInstance Server1,Server2 -Login Newlogin" }

You will be prompted to securely enter the password for a login [Newlogin]. The login would be created on servers Server1 and Server2 with default parameters.<br>

#####  Example:  2 

```powershell
PS C:\> $securePassword = Read-Host "Input password" -AsSecureString
PS C:\> New-DbaLogin -SqlInstance Server1\sql1 -Login Newlogin -SecurePassword $securePassword -PasswordPolicyEnforced -PasswordExpirationEnabled
```
{: data-copyable="true" data-clean-code="$securePassword = Read-Host &quot;Input password&quot; -AsSecureString
New-DbaLogin -SqlInstance Server1\sql1 -Login Newlogin -SecurePassword $securePassword -PasswordPolicyEnforced -PasswordExpirationEnabled" }

Creates a login on Server1\sql1 with a predefined password. The login will have password and expiration policies enforced onto it.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql1 -Login Oldlogin | New-DbaLogin -SqlInstance sql1 -LoginRenameHashtable @{Oldlogin = 'Newlogin'} -Force -NewSid -Disabled:$false
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql1 -Login Oldlogin | New-DbaLogin -SqlInstance sql1 -LoginRenameHashtable @{Oldlogin = 'Newlogin'} -Force -NewSid -Disabled:$false" }

Copies a login [Oldlogin] to the same instance sql1 with the same parameters (including password). New login will have a new sid, a new name [Newlogin] and will not be disabled. Existing login <br>
[Newlogin] will be removed prior to creation.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql1 -Login Login1,Login2 | New-DbaLogin -SqlInstance sql2 -PasswordPolicyEnforced -PasswordExpirationEnabled -DefaultDatabase tempdb -Disabled
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql1 -Login Login1,Login2 | New-DbaLogin -SqlInstance sql2 -PasswordPolicyEnforced -PasswordExpirationEnabled -DefaultDatabase tempdb -Disabled" }

Copies logins [Login1] and [Login2] from instance sql1 to instance sql2, but enforces password and expiration policies for the new logins. New logins will also have a default database set to [tempdb] <br>
and will be created in a disabled state.<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaLogin -SqlInstance sql1 -Login domain\user
```
{: data-copyable="true" data-clean-code="New-DbaLogin -SqlInstance sql1 -Login domain\user" }

Creates a new Windows Authentication backed login on sql1. The login will be part of the public server role.<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaLogin -SqlInstance sql1 -Login domain\user1, domain\user2 -DenyWindowsLogin
```
{: data-copyable="true" data-clean-code="New-DbaLogin -SqlInstance sql1 -Login domain\user1, domain\user2 -DenyWindowsLogin" }

Creates two new Windows Authentication backed login on sql1. The logins would be denied from logging in.<br>

#####  Example:  7 

```powershell
PS C:\> New-DbaLogin -SqlInstance sql1 -Login "claudio@********.onmicrosoft.com" -ExternalProvider
```
{: data-copyable="true" data-clean-code="New-DbaLogin -SqlInstance sql1 -Login &quot;claudio@********.onmicrosoft.com&quot; -ExternalProvider" }

Creates a new login named 'claudio@********.onmicrosoft.com' mapped to Azure Active Directory (AAD).<br>

### Required Parameters

##### -SqlInstance

The target SQL Server(s)

| Property | Value |
| --- | --- |
| Alias |  |
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

##### -Login

Specifies the name or names of the logins to create. Accepts arrays for bulk login creation.  
Use domain\username format for Windows Authentication logins, or simple names for SQL Server logins.

| Property | Value |
| --- | --- |
| Alias | Name,LoginName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts login objects piped from Get-DbaLogin for copying existing logins to new instances.  
Preserves login properties including passwords, SIDs, and security settings from the source login.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -LoginRenameHashtable

Maps original login names to new names when piping login objects between instances.  
Use format @{'OldLoginName' = 'NewLoginName'} to rename logins during the copy process.

| Property | Value |
| --- | --- |
| Alias | Rename |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurePassword

Sets the password for SQL Server Authentication logins as a secure string object.  
Required for new SQL logins unless using HashedPassword or copying from existing login objects.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -HashedPassword

Provides a pre-hashed password string for SQL Server logins, allowing password preservation during migrations.  
Use this when copying logins between instances while maintaining the original password hash.

| Property | Value |
| --- | --- |
| Alias | Hash,PasswordHash |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MapToCertificate

Associates the login with a specific certificate for certificate-based authentication.  
Specify the certificate name that exists in the master database for secure key-based login access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MapToAsymmetricKey

Links the login to an asymmetric key for public key authentication scenarios.  
Provide the asymmetric key name from master database to enable cryptographic login authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MapToCredential

Connects the login to a server credential for accessing external resources or delegation scenarios.  
Specify the credential name to associate with the login for extended authentication capabilities.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Sid

Forces a specific Security Identifier (SID) for the login instead of generating a new one.  
Essential for login migrations to preserve user-database mappings and avoid orphaned users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DefaultDatabase

Sets the initial database context when the login connects to SQL Server.  
Defaults to master if not specified; useful for directing users to their primary working database.

| Property | Value |
| --- | --- |
| Alias | DefaultDB |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Language

Configures the default language for the login's SQL Server session messages and formatting.  
Affects date formats, error messages, and other locale-specific behaviors for the login.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PasswordExpirationEnabled

Enforces Windows password expiration policy for SQL Server logins when combined with password policy enforcement.  
Requires PasswordPolicyEnforced to be enabled; helps maintain consistent password aging across systems.

| Property | Value |
| --- | --- |
| Alias | Expiration,CheckExpiration |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PasswordPolicyEnforced

Applies Windows password complexity requirements to SQL Server logins including length and character variety.  
Recommended for security compliance; works with domain password policies when available.

| Property | Value |
| --- | --- |
| Alias | Policy,CheckPolicy |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PasswordMustChange

Forces the user to set a new password on their first login attempt after account creation.  
Automatically enables password policy and expiration enforcement as prerequisites for this security feature.

| Property | Value |
| --- | --- |
| Alias | MustChange |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Disabled

Creates the login in a disabled state, preventing authentication until manually enabled.  
Useful for preparing accounts before users need access or temporarily suspending login capabilities.

| Property | Value |
| --- | --- |
| Alias | Disable |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DenyWindowsLogin

Blocks Windows Authentication login access while preserving the login definition for future use.  
Creates the login but prevents actual authentication; often used for security policy enforcement.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NewSid

Generates fresh SIDs when copying logins to the same instance or when SID conflicts exist.  
Prevents SID collision errors during login duplication and ensures unique security identifiers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExternalProvider

Configures the login for Azure Active Directory authentication in Azure SQL Database or Managed Instance.  
Use with Azure AD user principal names or service principal names for cloud-integrated authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Removes any existing login with the same name before creating the new one.  
Allows overwriting existing logins without manual cleanup; use carefully to avoid unintended access loss.

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
