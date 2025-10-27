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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbUser</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbUser.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDbaKlaas)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaDbUser -SqlInstance sql2016" }

Gets all database users<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -Database db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbUser -SqlInstance Server1 -Database db1" }

Gets the users for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -ExcludeDatabase db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbUser -SqlInstance Server1 -ExcludeDatabase db1" }

Gets the users for all databases except db1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -ExcludeSystemUser
```
{: data-copyable="true" data-clean-code="Get-DbaDbUser -SqlInstance Server1 -ExcludeSystemUser" }

Gets the users for all databases that are not system objects, like 'dbo', 'guest' or 'INFORMATION_SCHEMA'<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbUser
```
{: data-copyable="true" data-clean-code="'Sql1','Sql2/sqlexpress' | Get-DbaDbUser" }

Gets the users for the databases on Sql1 and Sql2/sqlexpress<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -Database db1 -User user1, user2
```
{: data-copyable="true" data-clean-code="Get-DbaDbUser -SqlInstance Server1 -Database db1 -User user1, user2" }

Gets the users 'user1' and 'user2' from the db1 database<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDbUser -SqlInstance Server1 -Login login1, login2
```
{: data-copyable="true" data-clean-code="Get-DbaDbUser -SqlInstance Server1 -Login login1, login2" }

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
