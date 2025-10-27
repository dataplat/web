---
title: "Remove-DbaDbOrphanUser"
slug: "Remove-DbaDbOrphanUser"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva) | Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Removes orphaned database users that no longer have corresponding SQL Server logins"
tags:
  - "User"
  - "Orphan"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbOrphanUser.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbOrphanUser"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbOrphanUser</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbOrphanUser.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Claudio Silva (@ClaudioESSilva) , Simone Bizzotto (@niphlod)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Removes orphaned database users that no longer have corresponding SQL Server logins

## Description

Removes orphaned database users from one or more databases, handling schema ownership transfers automatically to prevent dependency issues.  
  
Orphaned users occur when a database user exists but its corresponding login in the master database has been deleted or doesn't exist on the current server. This commonly happens after login deletions, database migrations, or restores to servers where the original logins don't exist.  
  
The function intelligently handles schema ownership:  
- Drops empty schemas that have the same name as the orphaned user  
- Transfers ownership of other schemas to 'dbo' to maintain database integrity  
- Requires -Force parameter when schemas contain objects, ensuring you make conscious decisions about ownership changes  
  
When a login with the same name exists on the server (suggesting the user could be repaired with Repair-DbaDbOrphanUser instead), removal is blocked unless -Force is specified. This safety check prevents accidental deletions when remediation might be more appropriate than removal.  
  
Contained databases are automatically skipped since they manage authentication differently and cannot have orphaned users in the traditional sense.

## Syntax

```powershell
Remove-DbaDbOrphanUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-User] <Object[]>]
    [-Force]
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
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sql2005
```
{: data-copyable="true" data-clean-code="Remove-DbaDbOrphanUser -SqlInstance sql2005" }

Finds and drops all orphan users without matching Logins in all databases present on server 'sql2005'.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -SqlCredential $cred" }

Finds and drops all orphan users without matching Logins in all databases present on server 'sqlserver2014a'. SQL Server authentication will be used in connecting to the server.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -Database db1, db2 -Force
```
{: data-copyable="true" data-clean-code="Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -Database db1, db2 -Force" }

Finds and drops orphan users even if they have a matching Login on both db1 and db2 databases.<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -ExcludeDatabase db1, db2 -Force
```
{: data-copyable="true" data-clean-code="Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -ExcludeDatabase db1, db2 -Force" }

Finds and drops orphan users even if they have a matching Login from all databases except db1 and db2.<br>

#####  Example:  5 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -User OrphanUser
```
{: data-copyable="true" data-clean-code="Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -User OrphanUser" }

Removes user OrphanUser from all databases only if there is no matching login.<br>

#####  Example:  6 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -User OrphanUser -Force
```
{: data-copyable="true" data-clean-code="Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -User OrphanUser -Force" }

Removes user OrphanUser from all databases even if they have a matching Login. Any schema that the user owns will change ownership to dbo.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to check for orphaned users. Accepts single database names, comma-separated lists, or arrays.  
When omitted, all accessible, non-read-only databases on the instance are processed. Contained databases are automatically skipped since they cannot have orphaned users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during orphaned user removal. Useful when you want to process most databases but avoid specific ones.  
Commonly used to exclude system databases, databases undergoing maintenance, or databases where user cleanup should be handled separately.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -User

Specifies specific orphaned users to target for removal instead of processing all orphaned users found.  
Use this when you need to remove only certain orphaned users rather than all orphans in the database. The function will verify these users are actually orphaned before removal.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Bypasses safety checks that normally prevent orphaned user removal in potentially problematic scenarios.  
Required when the user owns schemas containing objects (ownership transfers to 'dbo') or when a matching login exists on the server (suggesting repair might be more appropriate than removal).  
Use with caution as this can change schema ownership and remove users that could potentially be repaired instead.

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
