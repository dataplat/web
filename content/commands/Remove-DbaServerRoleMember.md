---
title: "Remove-DbaServerRoleMember"
slug: "Remove-DbaServerRoleMember"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Revokes server-level role membership from SQL Server logins and roles."
tags:
  - "Role"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaServerRoleMember.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaServerRoleMember"
draft: false
---

# Remove-DbaServerRoleMember

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaServerRoleMember](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaServerRoleMember.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaServerRoleMember](https://dataplat.github.io/boh#Remove-DbaServerRoleMember).

## Synopsis

Revokes server-level role membership from SQL Server logins and roles.

## Description

Revokes membership from server-level roles by removing logins or nested roles from target roles like sysadmin, dbcreator, or custom server roles. This is essential for security management when you need to reduce user privileges or clean up role assignments after organizational changes. The function works with both fixed server roles (sysadmin, securityadmin, etc.) and user-defined server roles, supporting bulk operations across multiple instances.

## Syntax

```powershell
Remove-DbaServerRoleMember
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
PS C:\> Remove-DbaServerRoleMember -SqlInstance server1 -ServerRole dbcreator -Login login1
```

Removes login1 from the dbcreator fixed server-level role on the instance server1.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaServerRoleMember -SqlInstance server1, sql2016 -ServerRole customrole -Login login1
```

Removes login1 from customrole custom server-level role on the instance server1 and sql2016.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaServerRoleMember -SqlInstance server1 -ServerRole customrole -Role dbcreator
```

Removes customrole custom server-level role from the dbcreator fixed server-level role.<br>

#####  Example:  4 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Remove-DbaServerRoleMember -ServerRole sysadmin -Login login1
```

Removes login1 from the sysadmin fixed server-level role in every server in C:\servers.txt.<br>

#####  Example:  5 

```powershell
PS C:\> Remove-DbaServerRoleMember -SqlInstance localhost -ServerRole bulkadmin, dbcreator -Login login1
```

Removes login1 from the bulkadmin and dbcreator fixed server-level roles on the server localhost.<br>

#####  Example:  6 

```powershell
PS C:\> $roles = Get-DbaServerRole -SqlInstance localhost -ServerRole bulkadmin, dbcreator
PS C:\> $roles | Remove-DbaServerRoleMember -Login login1
```

Removes login1 from the bulkadmin and dbcreator fixed server-level roles on the server localhost.<br>

#####  Example:  7 

```powershell
PS C:\> PS C:\ $logins = Get-Content C:\logins.txt
```

PS C:\ $srvLogins = Get-DbaLogin -SqlInstance server1 -Login $logins<br>
PS C:\ Remove-DbaServerRoleMember -Login $logins -ServerRole mycustomrole<br>
Removes all the logins found in C:\logins.txt from mycustomrole custom server-level role on server1.<br>

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

Specifies the server-level role(s) from which to remove members. Accepts both fixed server roles like sysadmin, securityadmin, dbcreator, and custom user-defined server roles.  
Use this when you need to revoke specific permissions by removing logins or nested roles from elevated privilege roles.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies the login name(s) to remove from the target server role(s). Accepts SQL Server logins, Windows logins, and Active Directory accounts.  
Use this when removing user access after role changes, departures, or security reviews where individual logins need privilege reduction.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Role

Specifies the server role name(s) to remove from the target server role(s), enabling nested role management.  
Use this when restructuring role hierarchies or removing inherited permissions where one server role should no longer be a member of another.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts piped server role objects from Get-DbaServerRole, allowing you to chain role discovery with member removal operations.  
Use this pattern when you need to filter roles first then remove specific members from the filtered results.

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
