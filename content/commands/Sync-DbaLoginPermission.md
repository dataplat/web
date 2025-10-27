---
title: "Sync-DbaLoginPermission"
slug: "Sync-DbaLoginPermission"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Synchronizes login permissions and role memberships between SQL Server instances."
tags:
  - "Migration"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Sync-DbaLoginPermission.ps1"
bohUrl: "https://dataplat.github.io/boh#Sync-DbaLoginPermission"
draft: false
---

# Sync-DbaLoginPermission

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Sync-DbaLoginPermission](https://github.com/dataplat/dbatools/blob/master/public/Sync-DbaLoginPermission.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Sync-DbaLoginPermission](https://dataplat.github.io/boh#Sync-DbaLoginPermission).

## Synopsis

Synchronizes login permissions and role memberships between SQL Server instances.

## Description

Syncs comprehensive login security settings from a source to destination SQL Server instance, ensuring logins have consistent permissions across environments. This function only modifies permissions for existing logins - it will not create or drop logins themselves.  
  
The sync process handles server roles (sysadmin, bulkadmin, etc.), server-level permissions (Connect SQL, View any database, etc.), SQL Agent job ownership, credential mappings, database user mappings, database roles (db_owner, db_datareader, etc.), and database-level permissions. This is particularly useful for maintaining consistent security configurations across development, staging, and production environments, or when rebuilding servers and needing to restore login permissions without recreating the logins.  
  
If a login exists on the source but not the destination, that login is skipped entirely. The function also protects against syncing permissions for system logins, host-based logins, and the currently connected login to prevent accidental lockouts.

## Syntax

```powershell
Sync-DbaLoginPermission
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Login] <String[]>]
    [[-ExcludeLogin] <String[]>]
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
PS C:\> Sync-DbaLoginPermission -Source sqlserver2014a -Destination sqlcluster
```

Syncs only SQL Server login permissions, roles, etc. Does not add or drop logins or users. To copy logins and their permissions, use Copy-SqlLogin.<br>

#####  Example:  2 

```powershell
PS C:\> Sync-DbaLoginPermission -Source sqlserver2014a -Destination sqlcluster -Exclude realcajun -SourceSqlCredential $scred -DestinationSqlCredential $dcred
```

Copies all login permissions except for realcajun using SQL Authentication to connect to each server. If a login already exists on the destination, the permissions will not be migrated.<br>

#####  Example:  3 

```powershell
PS C:\> Sync-DbaLoginPermission -Source sqlserver2014a -Destination sqlcluster -Login realcajun, netnerds
```

Copies permissions ONLY for logins netnerds and realcajun.<br>

### Required Parameters

##### -Source

Specifies the source SQL Server instance containing the login permissions to copy from. The login permissions, server roles, database roles, and security settings will be read from this instance.  
You must have sysadmin access and the server version must be SQL Server 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Destination

Specifies the destination SQL Server instance(s) where login permissions will be applied. Accepts multiple instances to sync permissions to several servers simultaneously.  
The logins must already exist on the destination - this function only syncs permissions, not the logins themselves. You must have sysadmin access and the server must be SQL Server 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Specifies alternative credentials to connect to the source SQL Server instance. Use this when your current Windows credentials don't have access to the source server.  
Accepts PowerShell credentials created with Get-Credential. Supports Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Specifies alternative credentials to connect to the destination SQL Server instance(s). Use this when your current Windows credentials don't have access to the destination server(s).  
Accepts PowerShell credentials created with Get-Credential. Supports Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies which specific logins to sync permissions for. Use this when you only want to sync permissions for certain accounts rather than all logins.  
Accepts multiple login names as an array. If not specified, permissions for all logins on the source server will be synced (excluding system and host-based logins).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeLogin

Specifies login names to exclude from the permission sync process. Use this to skip specific accounts that shouldn't have their permissions synced.  
Commonly used to exclude service accounts, shared accounts, or logins with environment-specific permissions that should remain different between servers.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
