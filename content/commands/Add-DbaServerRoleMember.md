---
title: "Add-DbaServerRoleMember"
slug: "Add-DbaServerRoleMember"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton)"
availability: "Windows, Linux, macOS"
synopsis: "Adds logins or server roles to server-level roles for SQL Server security administration."
tags:
  - "Role"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaServerRoleMember.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaServerRoleMember"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaServerRoleMember</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaServerRoleMember.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Shawn Melton (@wsmelton)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Adds logins or server roles to server-level roles for SQL Server security administration.

## Description

Grants server-level role membership to SQL logins or nests server roles within other server roles. Use this command when setting up security permissions, implementing role-based access control, or managing server-level privileges across multiple SQL Server instances. Supports both built-in roles (sysadmin, dbcreator, etc.) and custom server roles, so you don't have to manually assign permissions through SSMS or T-SQL scripts.

## Syntax

```powershell
Add-DbaServerRoleMember
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-ServerRole] <String[]>]
    [[-Login] <String[]>]
    [[-Role] <String[]>]
    [[-InputObject] <Object[]>]
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
PS C:\> Add-DbaServerRoleMember -SqlInstance server1 -ServerRole dbcreator -Login login1
```
{: data-copyable="true" data-clean-code="Add-DbaServerRoleMember -SqlInstance server1 -ServerRole dbcreator -Login login1" }

Adds login1 to the dbcreator fixed server-level role on the instance server1.<br>

#####  Example:  2 

```powershell
PS C:\> Add-DbaServerRoleMember -SqlInstance server1, sql2016 -ServerRole customrole -Login login1
```
{: data-copyable="true" data-clean-code="Add-DbaServerRoleMember -SqlInstance server1, sql2016 -ServerRole customrole -Login login1" }

Adds login1 in customrole custom server-level role on the instance server1 and sql2016.<br>

#####  Example:  3 

```powershell
PS C:\> Add-DbaServerRoleMember -SqlInstance server1 -ServerRole customrole -Role dbcreator
```
{: data-copyable="true" data-clean-code="Add-DbaServerRoleMember -SqlInstance server1 -ServerRole customrole -Role dbcreator" }

Adds customrole custom server-level role to dbcreator fixed server-level role.<br>

#####  Example:  4 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Add-DbaServerRoleMember -ServerRole sysadmin -Login login1
```
{: data-copyable="true" data-clean-code="$servers = Get-Content C:\servers.txt
$servers | Add-DbaServerRoleMember -ServerRole sysadmin -Login login1" }

Adds login1 to the sysadmin fixed server-level role in every server in C:\servers.txt.<br>

#####  Example:  5 

```powershell
PS C:\> Add-DbaServerRoleMember -SqlInstance localhost -ServerRole bulkadmin, dbcreator -Login login1
```
{: data-copyable="true" data-clean-code="Add-DbaServerRoleMember -SqlInstance localhost -ServerRole bulkadmin, dbcreator -Login login1" }

Adds login1 on the server localhost to the bulkadmin and dbcreator fixed server-level roles.<br>

#####  Example:  6 

```powershell
PS C:\> $roles = Get-DbaServerRole -SqlInstance localhost -ServerRole bulkadmin, dbcreator
PS C:\> $roles | Add-DbaServerRoleMember -Login login1
```
{: data-copyable="true" data-clean-code="$roles = Get-DbaServerRole -SqlInstance localhost -ServerRole bulkadmin, dbcreator
$roles | Add-DbaServerRoleMember -Login login1" }

Adds login1 on the server localhost to the bulkadmin and dbcreator fixed server-level roles.<br>

#####  Example:  7 

```powershell
PS C:\> PS C:\ $logins = Get-Content C:\logins.txt
```
{: data-copyable="true" data-clean-code="PS C:\ $logins = Get-Content C:\logins.txt" }

PS C:\ $srvLogins = Get-DbaLogin -SqlInstance server1 -Login $logins<br>
PS C:\ New-DbaServerRole -SqlInstance server1 -ServerRole mycustomrole -Owner sa | Add-DbaServerRoleMember -Login $logins<br>
Adds all the logins found in C:\logins.txt to the newly created server-level role mycustomrole on server1.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -ServerRole

Specifies the server-level role(s) that will receive new members. Accepts both built-in roles (sysadmin, dbcreator, securityadmin, etc.) and custom server roles.  
Use this when you need to grant server-level permissions by adding logins or nesting roles within these target roles.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Login

Specifies the SQL Server login(s) to be granted membership in the target server roles. Accepts Windows accounts, SQL logins, and Active Directory accounts.  
Use this when you need to give specific users or service accounts server-level permissions rather than nesting entire roles.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Role

Specifies existing server-level role(s) to be nested as members within the target ServerRole(s). Creates a role hierarchy where one role inherits permissions from another.  
Use this when implementing role-based security designs where you want to group permissions through role membership rather than individual login assignments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts server role objects piped from Get-DbaServerRole or New-DbaServerRole commands. Allows you to chain commands together for workflow automation.  
Use this when you want to operate on roles retrieved by other dbatools commands rather than specifying role names as strings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
