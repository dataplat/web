---
title: "Get-DbaPermission"
slug: "Get-DbaPermission"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves explicit and implicit permissions across SQL Server instances and databases for security auditing"
tags:
  - "Permissions"
  - "Instance"
  - "Database"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPermission.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPermission"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaPermission</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPermission.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Retrieves explicit and implicit permissions across SQL Server instances and databases for security auditing

## Description

Retrieves comprehensive permission information from SQL Server instances and databases, including both explicit permissions and implicit permissions from fixed roles.  
  
This function queries sys.server_permissions and sys.database_permissions to capture all granted, denied, and revoked permissions across server and database levels.  
Perfect for security audits, compliance reporting, troubleshooting access issues, and planning permission migrations between environments.  
  
The output includes permission state (GRANT/DENY/REVOKE), permission type (SELECT, CONNECT, EXECUTE, etc.), grantee information, and the specific securable being protected.  
Also captures implicit CONTROL permissions for dbo users, db_owner role members, and schema owners that aren't explicitly stored in system tables.  
Each result includes ready-to-use GRANT and REVOKE statements for easy permission replication or cleanup.  
  
Permissions link principals (logins, users, roles) to securables (servers, databases, schemas, objects).  
Principals exist at Windows, instance, and database levels, while securables exist at instance and database levels.  
  
See https://msdn.microsoft.com/en-us/library/ms191291.aspx for more information about SQL Server permissions

## Syntax

```powershell
Get-DbaPermission
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-IncludeServerLevel]
    [-ExcludeSystemObjects]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPermission -SqlInstance ServerA\sql987
```
{: data-copyable="true" data-clean-code="Get-DbaPermission -SqlInstance ServerA\sql987" }

Returns a custom object with Server name, Database name, permission state, permission type, grantee and securable.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPermission -SqlInstance ServerA\sql987 | Format-Table -AutoSize
```
{: data-copyable="true" data-clean-code="Get-DbaPermission -SqlInstance ServerA\sql987 | Format-Table -AutoSize" }

Returns a formatted table displaying Server, Database, permission state, permission type, grantee, granteetype, securable and securabletype.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPermission -SqlInstance ServerA\sql987 -ExcludeSystemObjects -IncludeServerLevel
```
{: data-copyable="true" data-clean-code="Get-DbaPermission -SqlInstance ServerA\sql987 -ExcludeSystemObjects -IncludeServerLevel" }

Returns a custom object with Server name, Database name, permission state, permission type, grantee and securable<br>
in all databases and on the server level, but not on system securables.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPermission -SqlInstance sql2016 -Database master
```
{: data-copyable="true" data-clean-code="Get-DbaPermission -SqlInstance sql2016 -Database master" }

Returns a custom object with permissions for the master database.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost.

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

Specifies which databases to analyze for permissions. Accepts wildcards and multiple database names.  
When omitted, all accessible databases on the instance are processed, which is useful for comprehensive security audits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from permission analysis. Accepts wildcards and multiple database names.  
Commonly used to skip system databases like TempDB or exclude sensitive databases from security reports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeServerLevel

Includes server-level permissions in the output, such as CONTROL SERVER, VIEW SERVER STATE, and fixed server roles like sysadmin.  
Essential for complete security audits as it captures instance-wide permissions that affect all databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeSystemObjects

Excludes permissions on system objects like system tables, views, and stored procedures from the output.  
Use this when focusing on user-created objects to reduce noise in permission reports and compliance audits.

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
