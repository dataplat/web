---
title: "Repair-DbaDbOrphanUser"
slug: "Repair-DbaDbOrphanUser"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva) | Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Repairs orphaned database users by remapping them to matching server logins or optionally removing them."
tags:
  - "Orphan"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaDbOrphanUser.ps1"
bohUrl: "https://dataplat.github.io/boh#Repair-DbaDbOrphanUser"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Repair-DbaDbOrphanUser</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaDbOrphanUser.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Repairs orphaned database users by remapping them to matching server logins or optionally removing them.

## Description

Identifies and repairs orphaned database users - users that exist in a database but are no longer associated with a server login. This commonly occurs after database restores, migrations, or when logins are recreated.  
  
The function searches each database for users where the Login property is empty, then attempts to remap them to existing server logins with matching names. For a login to be eligible for remapping, it must be enabled, not a system object, not locked, and have the exact same name as the orphaned user.  
  
Uses modern ALTER USER syntax for SQL Server 2005+ or the legacy sp_change_users_login procedure for SQL Server 2000. Optionally removes orphaned users that have no matching server login when -RemoveNotExisting is specified.

## Syntax

```powershell
Repair-DbaDbOrphanUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Users] <Object[]>]
    [-RemoveNotExisting]
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
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sql2005
```
{: data-copyable="true" data-clean-code="Repair-DbaDbOrphanUser -SqlInstance sql2005" }

Finds and repairs all orphan users of all databases present on server 'sql2005'<br>

#####  Example:  2 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -SqlCredential $cred" }

Finds and repair all orphan users in all databases present on server 'sqlserver2014a'. SQL credentials are used to authenticate to the server.<br>

#####  Example:  3 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -Database db1, db2
```
{: data-copyable="true" data-clean-code="Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -Database db1, db2" }

Finds and repairs all orphan users in both db1 and db2 databases.<br>

#####  Example:  4 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -Database db1 -Users OrphanUser
```
{: data-copyable="true" data-clean-code="Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -Database db1 -Users OrphanUser" }

Finds and repairs user 'OrphanUser' in 'db1' database.<br>

#####  Example:  5 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -Users OrphanUser
```
{: data-copyable="true" data-clean-code="Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -Users OrphanUser" }

Finds and repairs user 'OrphanUser' on all databases<br>

#####  Example:  6 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -RemoveNotExisting
```
{: data-copyable="true" data-clean-code="Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -RemoveNotExisting" }

Finds all orphan users of all databases present on server 'sqlserver2014a'. Removes all users that do not have  matching Logins.<br>

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

Specifies which databases to scan for orphaned users. Accepts wildcards for pattern matching and multiple database names.  
Use this when you only need to repair orphaned users in specific databases rather than scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when scanning for orphaned users. Useful for avoiding system databases or databases under maintenance.  
Commonly used to exclude tempdb, distribution databases, or databases where orphaned users should remain untouched.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Users

Specifies specific database users to repair rather than processing all orphaned users found.  
Use this when you need to target specific problematic users or when working with large databases where selective repair is preferred.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -RemoveNotExisting

Removes orphaned database users that have no corresponding server login instead of just reporting them.  
Use this after database migrations or when cleaning up databases where some users should no longer exist. Exercise caution as this permanently removes users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Bypasses confirmation prompts and forces schema ownership changes to dbo when removing orphaned users.  
Required when orphaned users own database schemas that prevent their removal. Use with caution as it can affect database object ownership.

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
