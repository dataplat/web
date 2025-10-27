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

# Add-DbaServerRoleMember

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Add-DbaServerRoleMember](https://github.com/dataplat/dbatools/blob/master/public/Add-DbaServerRoleMember.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Add-DbaServerRoleMember](https://dataplat.github.io/boh#Add-DbaServerRoleMember).

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

Adds login1 to the dbcreator fixed server-level role on the instance server1.<br>

#####  Example:  2 

```powershell
PS C:\> Add-DbaServerRoleMember -SqlInstance server1, sql2016 -ServerRole customrole -Login login1
```

Adds login1 in customrole custom server-level role on the instance server1 and sql2016.<br>

#####  Example:  3 

```powershell
PS C:\> Add-DbaServerRoleMember -SqlInstance server1 -ServerRole customrole -Role dbcreator
```

Adds customrole custom server-level role to dbcreator fixed server-level role.<br>

#####  Example:  4 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Add-DbaServerRoleMember -ServerRole sysadmin -Login login1
```

Adds login1 to the sysadmin fixed server-level role in every server in C:\servers.txt.<br>

#####  Example:  5 

```powershell
PS C:\> Add-DbaServerRoleMember -SqlInstance localhost -ServerRole bulkadmin, dbcreator -Login login1
```

Adds login1 on the server localhost to the bulkadmin and dbcreator fixed server-level roles.<br>

#####  Example:  6 

```powershell
PS C:\> $roles = Get-DbaServerRole -SqlInstance localhost -ServerRole bulkadmin, dbcreator
PS C:\> $roles | Add-DbaServerRoleMember -Login login1
```

Adds login1 on the server localhost to the bulkadmin and dbcreator fixed server-level roles.<br>

#####  Example:  7 

```powershell
PS C:\> PS C:\ $logins = Get-Content C:\logins.txt
```

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
