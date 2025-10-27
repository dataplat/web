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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Sync-DbaLoginPermission</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Sync-DbaLoginPermission.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Sync-DbaLoginPermission -Source sqlserver2014a -Destination sqlcluster" }

Syncs only SQL Server login permissions, roles, etc. Does not add or drop logins or users. To copy logins and their permissions, use Copy-SqlLogin.<br>

#####  Example:  2 

```powershell
PS C:\> Sync-DbaLoginPermission -Source sqlserver2014a -Destination sqlcluster -Exclude realcajun -SourceSqlCredential $scred -DestinationSqlCredential $dcred
```
{: data-copyable="true" data-clean-code="Sync-DbaLoginPermission -Source sqlserver2014a -Destination sqlcluster -Exclude realcajun -SourceSqlCredential $scred -DestinationSqlCredential $dcred" }

Copies all login permissions except for realcajun using SQL Authentication to connect to each server. If a login already exists on the destination, the permissions will not be migrated.<br>

#####  Example:  3 

```powershell
PS C:\> Sync-DbaLoginPermission -Source sqlserver2014a -Destination sqlcluster -Login realcajun, netnerds
```
{: data-copyable="true" data-clean-code="Sync-DbaLoginPermission -Source sqlserver2014a -Destination sqlcluster -Login realcajun, netnerds" }

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
