---
title: "Get-DbaServerRoleMember"
slug: "Get-DbaServerRoleMember"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves server-level role memberships for security auditing and compliance reporting."
tags:
  - "Role"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaServerRoleMember.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaServerRoleMember"
draft: false
---

# Get-DbaServerRoleMember

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaServerRoleMember](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaServerRoleMember.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaServerRoleMember](https://dataplat.github.io/boh#Get-DbaServerRoleMember).

## Synopsis

Retrieves server-level role memberships for security auditing and compliance reporting.

## Description

Returns detailed information about which logins are members of server-level roles like sysadmin, dbcreator, and securityadmin. Essential for security audits, compliance reviews, and troubleshooting permission issues. Shows both the role assignments and provides access to the underlying SMO objects for further analysis. Supports filtering by specific roles or logins to focus on particular security concerns.

## Syntax

```powershell
Get-DbaServerRoleMember
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-ServerRole] <String[]>]
    [[-ExcludeServerRole] <String[]>]
    [[-Login] <Object[]>]
    [-ExcludeFixedRole]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaServerRoleMember -SqlInstance localhost
```

Returns all members of all server roles on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaServerRoleMember -SqlInstance localhost, sql2016
```

Returns all members of all server roles on the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Get-DbaServerRoleMember
```

Returns all members of all server roles for every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaServerRoleMember -SqlInstance localhost -ServerRole 'sysadmin', 'dbcreator'
```

Returns all members of the sysadmin or dbcreator roles on localhost.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaServerRoleMember -SqlInstance localhost -ExcludeServerRole 'sysadmin'
```

Returns all members of server-level roles other than sysadmin.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaServerRoleMember -SqlInstance sql2017a -ExcludeFixedRole
```

Returns all members of server-level role(s) that are not fixed roles on sql2017a instance.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaServerRoleMember -SqlInstance localhost -Login 'MyFriendlyDeveloper'
```

Returns all server-level role(s) for the MyFriendlyDeveloper login on localhost.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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
| Alias | Credential |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerRole

Specifies which server roles to check for membership. Accepts role names like 'sysadmin', 'dbcreator', 'securityadmin', or custom server roles.  
Use this when you need to focus your audit on specific high-privilege roles or investigate particular security concerns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeServerRole

Excludes specified server roles from the membership report. Useful when you want to see all role memberships except certain roles.  
Commonly used to exclude low-privilege roles like 'public' when focusing on elevated permissions during security reviews.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Filters results to show only server role memberships for specific logins. Accepts login names including Windows accounts, SQL logins, and service accounts.  
Use this when investigating permissions for particular users or troubleshooting access issues for specific accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeFixedRole

Excludes built-in server roles like sysadmin, securityadmin, and dbcreator, showing only custom server roles created by your organization.  
Only available on SQL Server 2017 and later which supports user-defined server roles. Use this to audit custom role assignments in environments with specialized security models.

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


&nbsp;
