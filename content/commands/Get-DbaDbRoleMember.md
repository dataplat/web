---
title: "Get-DbaDbRoleMember"
slug: "Get-DbaDbRoleMember"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves all users and nested roles that are members of database roles across SQL Server instances"
tags:
  - "Role"
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRoleMember.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbRoleMember"
draft: false
---

# Get-DbaDbRoleMember

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbRoleMember](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRoleMember.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbRoleMember](https://dataplat.github.io/boh#Get-DbaDbRoleMember).

## Synopsis

Retrieves all users and nested roles that are members of database roles across SQL Server instances

## Description

This function enumerates the membership of database roles, showing which users and nested roles belong to each role. Essential for security audits, permission troubleshooting, and compliance reporting, it reveals the complete role hierarchy within your databases. By default, system users are excluded to focus on business-relevant accounts, but you can include them for comprehensive security reviews. The function works across multiple instances and databases simultaneously, making it perfect for enterprise-wide role membership documentation and access reviews.

## Syntax

```powershell
Get-DbaDbRoleMember
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Role] <String[]>]
    [[-ExcludeRole] <String[]>]
    [-ExcludeFixedRole]
    [-IncludeSystemUser]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbRoleMember -SqlInstance localhost
```

Returns all members of all database roles on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbRoleMember -SqlInstance localhost, sql2016
```

Returns all members of all database roles on the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Get-DbaDbRoleMember
```

Returns all members of all database roles for every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbRoleMember -SqlInstance localhost -Database msdb
```

Returns non-system members of all roles in the msdb database on localhost.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbRoleMember -SqlInstance localhost -Database msdb -IncludeSystemUser -ExcludeFixedRole
```

Returns all members of non-fixed roles in the msdb database on localhost.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbRoleMember -SqlInstance localhost -Database msdb -Role 'db_owner'
```

Returns all members of the db_owner role in the msdb database on localhost.<br>

#####  Example:  7 

```powershell
PS C:\> $roles = Get-DbaDbRole -SqlInstance localhost -Database msdb -Role 'db_owner'
PS C:\> $roles | Get-DbaDbRoleMember
```

Returns all members of the db_owner role in the msdb database on localhost.<br>

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

##### -Database

Specifies which databases to analyze for role membership. Accepts wildcards for pattern matching.  
Use this to focus on specific databases rather than scanning all databases on the instance. Helpful when you only need role membership data for particular applications or business units.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from role membership analysis. Supports wildcards for pattern matching.  
Use this to skip system databases like tempdb or databases under maintenance when performing enterprise-wide role audits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Role

Limits the analysis to specific database roles by name. Accepts wildcards for pattern matching.  
Use this when investigating membership of particular roles like 'db_owner', 'db_datareader', or custom application roles during security reviews or troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeRole

Excludes specific database roles from the membership analysis. Supports wildcards for pattern matching.  
Use this to filter out roles you're not interested in, such as excluding 'public' role or application-specific roles during focused security audits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeFixedRole

Excludes members of SQL Server's built-in database roles like db_owner, db_datareader, db_datawriter, etc.  
Use this when you want to focus only on custom application roles and their memberships, filtering out the standard SQL Server role assignments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSystemUser

Includes SQL Server system users like 'dbo', 'guest', 'sys', and 'INFORMATION_SCHEMA' in the results.  
Use this for comprehensive security audits or when troubleshooting system-level permission issues. Normally these accounts are excluded to focus on business user accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts piped objects from Get-DbaDbRole, Get-DbaDatabase, or SQL Server instances for processing.  
Use this to chain commands together, such as first filtering roles with Get-DbaDbRole then analyzing their membership, or to process multiple database objects efficiently.

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


&nbsp;
