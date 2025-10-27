---
title: "Remove-DbaDbUser"
slug: "Remove-DbaDbUser"
date: 2024-01-01
layout: "single"
author: "Doug Meyers (@dgmyrs)"
availability: "Windows, Linux, macOS"
synopsis: "Removes database users from SQL Server databases with intelligent schema ownership handling"
tags:
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbUser.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbUser"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbUser</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbUser.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Doug Meyers (@dgmyrs)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Removes database users from SQL Server databases with intelligent schema ownership handling

## Description

Safely removes database users from SQL Server databases while automatically handling schema ownership conflicts that would normally prevent user deletion. This eliminates the manual process of identifying and resolving schema ownership issues before removing users.  
  
When a user owns schemas, the function intelligently manages the cleanup: schemas with the same name as the user are dropped (if empty), while other owned schemas have their ownership transferred to 'dbo'. If schemas contain objects, use -Force to allow ownership transfer and proceed with user removal.  
  
The function works across multiple databases and instances, making it ideal for cleanup operations during user deprovisioning or database migrations where you need to remove users without leaving orphaned objects or broken ownership chains.

## Syntax

```powershell
Remove-DbaDbUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    -User <Object[]>
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbUser -InputObject <User[]>
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
PS C:\> Remove-DbaDbUser -SqlInstance sqlserver2014 -User user1
```
{: data-copyable="true" data-clean-code="Remove-DbaDbUser -SqlInstance sqlserver2014 -User user1" }

Drops user1 from all databases it exists in on server 'sqlserver2014'.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbUser -SqlInstance sqlserver2014 -Database database1 -User user1
```
{: data-copyable="true" data-clean-code="Remove-DbaDbUser -SqlInstance sqlserver2014 -Database database1 -User user1" }

Drops user1 from the database1 database on server 'sqlserver2014'.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbUser -SqlInstance sqlserver2014 -ExcludeDatabase model -User user1
```
{: data-copyable="true" data-clean-code="Remove-DbaDbUser -SqlInstance sqlserver2014 -ExcludeDatabase model -User user1" }

Drops user1 from all databases it exists in on server 'sqlserver2014' except for the model database.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbUser sqlserver2014 | Where-Object Name -In "user1" | Remove-DbaDbUser
```
{: data-copyable="true" data-clean-code="Get-DbaDbUser sqlserver2014 | Where-Object Name -In &quot;user1&quot; | Remove-DbaDbUser" }

Drops user1 from all databases it exists in on server 'sqlserver2014'.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -User

Specifies the database user(s) to remove from the target databases. Accepts multiple user names for bulk operations.  
The function will automatically handle schema ownership conflicts that typically prevent user deletion.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts user objects from Get-DbaDbUser for pipeline operations. This allows for advanced filtering scenarios.  
Use this when you need to remove users based on complex criteria like creation date, permissions, or other user properties.

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
For MFA support, please use Connect-DbaInstance..

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the database(s) from which to remove the specified users. Accepts wildcards for pattern matching.  
When omitted, the function processes all accessible databases on the instance to find and remove the specified users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies the database(s) to skip during user removal operations. Use this to protect critical databases like system databases.  
Commonly used to exclude model, tempdb, or production databases during bulk user cleanup operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces schema ownership transfer to 'dbo' when the user owns schemas containing database objects. Without this, user removal fails if owned schemas contain objects.  
Use this during user deprovisioning when you need to ensure complete cleanup regardless of schema dependencies.

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

Shows what would happen if the command were to run. No actions are actually performed.

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
