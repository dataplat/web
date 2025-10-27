---
title: "Set-DbaDbOwner"
slug: "Set-DbaDbOwner"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Changes database ownership to a specified login when current ownership doesn't match the target."
tags:
  - "Database"
  - "Owner"
  - "DbOwner"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbOwner.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbOwner"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaDbOwner</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbOwner.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Michael Fal (@Mike_Fal), mikefal.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Changes database ownership to a specified login when current ownership doesn't match the target.

## Description

Changes database ownership to standardize who owns your databases across an instance. This is particularly useful for maintaining consistent ownership patterns after restoring databases from other environments, where databases may have orphaned owners or inconsistent ownership.  
  
By default, the function sets ownership to 'sa' (or the renamed sysadmin account), but you can specify any valid login. The function only processes user databases and includes safety checks to ensure the target login exists, isn't a Windows group, and isn't already mapped as a user within the database. You can target all databases on an instance or filter to specific databases.  
  
Best Practice reference: http://weblogs.sqlteam.com/dang/archive/2008/01/13/Database-Owner-Troubles.aspx

## Syntax

```powershell
Set-DbaDbOwner
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-InputObject] <Database[]>]
    [[-TargetLogin] <String>]
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
PS C:\> Set-DbaDbOwner -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Set-DbaDbOwner -SqlInstance localhost" }

Sets database owner to 'sa' on all databases where the owner does not match 'sa'.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbOwner -SqlInstance localhost -TargetLogin DOMAIN\account
```
{: data-copyable="true" data-clean-code="Set-DbaDbOwner -SqlInstance localhost -TargetLogin DOMAIN\account" }

Sets the database owner to DOMAIN\account on all databases where the owner does not match DOMAIN\account.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaDbOwner -SqlInstance sqlserver -Database db1, db2
```
{: data-copyable="true" data-clean-code="Set-DbaDbOwner -SqlInstance sqlserver -Database db1, db2" }

Sets database owner to 'sa' on the db1 and db2 databases if their current owner does not match 'sa'.<br>

#####  Example:  4 

```powershell
PS C:\> $db = Get-DbaDatabase -SqlInstance localhost -Database db1, db2
PS C:\> $db | Set-DbaDbOwner -TargetLogin DOMAIN\account
```
{: data-copyable="true" data-clean-code="$db = Get-DbaDatabase -SqlInstance localhost -Database db1, db2
$db | Set-DbaDbOwner -TargetLogin DOMAIN\account" }

Sets database owner to 'sa' on the db1 and db2 databases if their current owner does not match 'sa'.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to change ownership for. Accepts database names and supports wildcards for pattern matching.  
When omitted, all user databases on the instance will be processed. System databases are automatically excluded.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during ownership changes. Useful when processing all databases but need to exclude specific ones.  
Accepts database names and supports wildcards for pattern matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline operations. Use this when you need to filter databases with specific criteria before changing ownership.  
Allows for complex database selection logic beyond simple name matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -TargetLogin

Specifies the login to set as the new database owner. Defaults to 'sa' (or the renamed sysadmin account if sa was renamed).  
The login must exist on the server, cannot be a Windows group, and cannot already be mapped as a user within the target database. Common values include service accounts or standardized admin logins.

| Property | Value |
| --- | --- |
| Alias | Login |
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
