---
title: "Get-DbaDbUser"
slug: "Get-DbaDbUser"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database user accounts and their associated login mappings from SQL Server databases"
tags:
  - "User"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbUser.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbUser"
draft: false
---

# Get-DbaDbUser

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbUser](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbUser.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbUser](https://dataplat.github.io/boh#Get-DbaDbUser).

## Synopsis

Retrieves database user accounts and their associated login mappings from SQL Server databases

## Description

Retrieves all database user accounts from one or more databases, showing their associated server logins, authentication types, and access states. This function is essential for security audits, user access reviews, and compliance reporting where you need to see who has database-level access and how their accounts are configured. You can filter results by specific users, logins, databases, or exclude system accounts to focus on custom user accounts that require regular review.

## Syntax

```powershell
Get-DbaDbUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemUser]
    [[-User] <String[]>]
    [[-Login] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance sql2016
```

Gets all database users<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -Database db1
```

Gets the users for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the users for all databases except db1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -ExcludeSystemUser
```

Gets the users for all databases that are not system objects, like 'dbo', 'guest' or 'INFORMATION_SCHEMA'<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbUser
```

Gets the users for the databases on Sql1 and Sql2/sqlexpress<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -Database db1 -User user1, user2
```

Gets the users 'user1' and 'user2' from the db1 database<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -Login login1, login2
```

Gets the users associated with the logins 'login1' and 'login2'<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

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
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to query for user accounts. Accepts multiple database names and supports wildcards.  
Use this when you need to audit users in specific databases rather than scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when retrieving user accounts. Useful for excluding system databases or databases you don't manage.  
Common practice is to exclude tempdb, model, or development databases when focusing on production user access reviews.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemUser

Excludes built-in system users like 'dbo', 'guest', 'INFORMATION_SCHEMA', and other system-created accounts.  
Use this switch during security audits to focus only on custom user accounts that require regular access review and management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -User

Filters results to specific database user names. Accepts multiple user names for targeted queries.  
Use this when investigating specific user accounts or verifying permissions for particular users during access reviews or troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Filters results to database users associated with specific server logins. Shows which databases a login has user accounts in.  
Essential for understanding a login's database-level access across the instance, especially during user access audits or when removing departing employees.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
