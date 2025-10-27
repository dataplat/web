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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbRoleMember</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRoleMember.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDBAKlaas)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaDbRoleMember -SqlInstance localhost" }

Returns all members of all database roles on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbRoleMember -SqlInstance localhost, sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaDbRoleMember -SqlInstance localhost, sql2016" }

Returns all members of all database roles on the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Get-DbaDbRoleMember
```
{: data-copyable="true" data-clean-code="$servers = Get-Content C:\servers.txt
$servers | Get-DbaDbRoleMember" }

Returns all members of all database roles for every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbRoleMember -SqlInstance localhost -Database msdb
```
{: data-copyable="true" data-clean-code="Get-DbaDbRoleMember -SqlInstance localhost -Database msdb" }

Returns non-system members of all roles in the msdb database on localhost.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbRoleMember -SqlInstance localhost -Database msdb -IncludeSystemUser -ExcludeFixedRole
```
{: data-copyable="true" data-clean-code="Get-DbaDbRoleMember -SqlInstance localhost -Database msdb -IncludeSystemUser -ExcludeFixedRole" }

Returns all members of non-fixed roles in the msdb database on localhost.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbRoleMember -SqlInstance localhost -Database msdb -Role 'db_owner'
```
{: data-copyable="true" data-clean-code="Get-DbaDbRoleMember -SqlInstance localhost -Database msdb -Role 'db_owner'" }

Returns all members of the db_owner role in the msdb database on localhost.<br>

#####  Example:  7 

```powershell
PS C:\> $roles = Get-DbaDbRole -SqlInstance localhost -Database msdb -Role 'db_owner'
PS C:\> $roles | Get-DbaDbRoleMember
```
{: data-copyable="true" data-clean-code="$roles = Get-DbaDbRole -SqlInstance localhost -Database msdb -Role 'db_owner'
$roles | Get-DbaDbRoleMember" }

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
