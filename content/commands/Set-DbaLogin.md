---
title: "Set-DbaLogin"
slug: "Set-DbaLogin"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Modifies SQL Server login properties including passwords, permissions, roles, and account status"
tags:
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaLogin"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaLogin</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaLogin.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad), sqlstad.nl</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Modifies SQL Server login properties including passwords, permissions, roles, and account status

## Description

Manages SQL Server login accounts by modifying passwords, account status, security settings, and server role memberships in a single operation. Handles common DBA tasks like unlocking accounts, resetting passwords with force-change requirements, and applying password policies for security compliance. Includes a special unlock feature that preserves existing passwords by temporarily disabling policy checks, eliminating the need to reset passwords when unlocking accounts. Works across multiple instances and logins simultaneously, making it ideal for bulk user management and security maintenance workflows.

## Syntax

```powershell
Set-DbaLogin
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Login] <String[]>]
    [[-SecurePassword] <Object>]
    [[-DefaultDatabase] <String>]
    [-Unlock]
    [-PasswordMustChange]
    [[-NewName] <String>]
    [-Disable]
    [-Enable]
    [-DenyLogin]
    [-GrantLogin]
    [-PasswordPolicyEnforced]
    [-PasswordExpirationEnabled]
    [[-AddRole] <String[]>]
    [[-RemoveRole] <String[]>]
    [[-InputObject] <Login[]>]
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
PS C:\> $SecurePassword = (Get-Credential NoUsernameNeeded).Password
PS C:\> $cred = New-Object System.Management.Automation.PSCredential ("username", $SecurePassword)
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1 -SecurePassword $cred -Unlock -PasswordMustChange
```
{: data-copyable="true" data-clean-code="$SecurePassword = (Get-Credential NoUsernameNeeded).Password
$cred = New-Object System.Management.Automation.PSCredential (&quot;username&quot;, $SecurePassword)
Set-DbaLogin -SqlInstance sql1 -Login login1 -SecurePassword $cred -Unlock -PasswordMustChange" }

Set the new password for login1 using a credential, unlock the account and set the option<br>
that the user must change password at next logon.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1 -Enable
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login login1 -Enable" }

Enable the login<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1, login2, login3, login4 -Enable
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login login1, login2, login3, login4 -Enable" }

Enable multiple logins<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1, sql2, sql3 -Login login1, login2, login3, login4 -Enable
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1, sql2, sql3 -Login login1, login2, login3, login4 -Enable" }

Enable multiple logins on multiple instances<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1 -Disable
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login login1 -Disable" }

Disable the login<br>

#####  Example:  6 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1 -DenyLogin
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login login1 -DenyLogin" }

Deny the login to connect to the instance<br>

#####  Example:  7 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1 -GrantLogin
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login login1 -GrantLogin" }

Grant the login to connect to the instance<br>

#####  Example:  8 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1 -PasswordPolicyEnforced
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login login1 -PasswordPolicyEnforced" }

Enforces the password policy on a login<br>

#####  Example:  9 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1 -PasswordPolicyEnforced:$false
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login login1 -PasswordPolicyEnforced:$false" }

Disables enforcement of the password policy on a login<br>

#####  Example:  10 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login test -AddRole serveradmin
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login test -AddRole serveradmin" }

Add the server role "serveradmin" to the login<br>

#####  Example:  11 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login test -RemoveRole bulkadmin
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login test -RemoveRole bulkadmin" }

Remove the server role "bulkadmin" to the login<br>

#####  Example:  12 

```powershell
PS C:\> $login = Get-DbaLogin -SqlInstance sql1 -Login test
PS C:\> $login | Set-DbaLogin -Disable
```
{: data-copyable="true" data-clean-code="$login = Get-DbaLogin -SqlInstance sql1 -Login test
$login | Set-DbaLogin -Disable" }

Disable the login from the pipeline<br>

#####  Example:  13 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1 -DefaultDatabase master
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login login1 -DefaultDatabase master" }

Set the default database to master on a login<br>

#####  Example:  14 

```powershell
PS C:\> Set-DbaLogin -SqlInstance sql1 -Login login1 -Unlock -Force
```
{: data-copyable="true" data-clean-code="Set-DbaLogin -SqlInstance sql1 -Login login1 -Unlock -Force" }

Unlocks the login1 on the sql1 instance using the technique described at https://www.mssqltips.com/sqlservertip/2758/how-to-unlock-a-sql-login-without-resetting-the-password/<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

Specifies one or more SQL Server login names to modify. Accepts an array for batch operations.  
Use this to target specific login accounts when performing password resets, account management, or role assignments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurePassword

Sets a new password for the login using either a PSCredential object or SecureString. Required when using -PasswordMustChange.  
Create secure passwords with Get-Credential or ConvertTo-SecureString to avoid plain text exposure in scripts.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DefaultDatabase

Changes the default database that the login connects to after authentication. Must be an existing database name.  
Use this when users need to land in a specific database instead of master, such as application-specific databases.

| Property | Value |
| --- | --- |
| Alias | DefaultDB |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Unlock

Unlocks a locked SQL Server login account that has been disabled due to failed authentication attempts.  
Use with -SecurePassword to set a new password while unlocking, or with -Force to unlock without changing the password.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PasswordMustChange

Forces the user to change their password at next login. Requires -SecurePassword and both PasswordPolicyEnforced and PasswordExpirationEnabled to be enabled.  
Use this for security compliance when setting temporary passwords or after potential password compromises.

| Property | Value |
| --- | --- |
| Alias | MustChange |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NewName

Renames the login to a new name. The new name must not already exist on the SQL Server instance.  
Use this when standardizing login naming conventions or correcting login names during organizational changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Disable

Disables the login account, preventing authentication while preserving the account and its permissions.  
Use this for temporary account suspension during investigations or when employees are on extended leave.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Enable

Enables a previously disabled login account, restoring authentication access with all existing permissions intact.  
Use this to reactivate accounts after temporary suspension or when employees return from extended leave.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DenyLogin

Explicitly denies the login permission to connect to the SQL Server instance. The account remains but cannot authenticate.  
Use this for permanent access restriction while maintaining the login for audit trails or future reference.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -GrantLogin

Grants or restores the login permission to connect to the SQL Server instance, reversing a previous deny action.  
Use this to restore access for logins that were previously denied without recreating the entire account.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PasswordPolicyEnforced

Enables or disables Windows password policy enforcement for the login (check_policy). Must be enabled to use password expiration checks.  
Use this to apply corporate password complexity and lockout policies to SQL Server authentication accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PasswordExpirationEnabled

Enables or disables password expiration checking for the login (check_expiration). Requires PasswordPolicyEnforced to be enabled first.  
Use this to enforce regular password changes according to Windows password age policies for SQL Server accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AddRole

Grants one or more server-level roles to the login. Accepts: bulkadmin, dbcreator, diskadmin, processadmin, public, securityadmin, serveradmin, setupadmin, sysadmin.  
Use this to assign specific server privileges without granting full sysadmin rights, following the principle of least privilege.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | bulkadmin,dbcreator,diskadmin,processadmin,public,securityadmin,serveradmin,setupadmin,sysadmin |

##### -RemoveRole

Revokes one or more server-level roles from the login. Accepts: bulkadmin, dbcreator, diskadmin, processadmin, public, securityadmin, serveradmin, setupadmin, sysadmin.  
Use this to reduce login privileges during access reviews or when job responsibilities change.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | bulkadmin,dbcreator,diskadmin,processadmin,public,securityadmin,serveradmin,setupadmin,sysadmin |

##### -InputObject

Accepts login objects from Get-DbaLogin for pipeline operations. Enables processing multiple logins from filtered queries.  
Use this for bulk operations when you need to modify logins based on specific criteria like locked status or role membership.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Unlocks a login account without requiring a password reset by temporarily manipulating password policy settings.  
Use this when you need to unlock accounts but cannot change the password, preserving the original password for the user.

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
