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

# Get-DbaPermission

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPermission](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPermission.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPermission](https://dataplat.github.io/boh#Get-DbaPermission).

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

Returns a custom object with Server name, Database name, permission state, permission type, grantee and securable.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPermission -SqlInstance ServerA\sql987 | Format-Table -AutoSize
```

Returns a formatted table displaying Server, Database, permission state, permission type, grantee, granteetype, securable and securabletype.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPermission -SqlInstance ServerA\sql987 -ExcludeSystemObjects -IncludeServerLevel
```

Returns a custom object with Server name, Database name, permission state, permission type, grantee and securable<br>
in all databases and on the server level, but not on system securables.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPermission -SqlInstance sql2016 -Database master
```

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
