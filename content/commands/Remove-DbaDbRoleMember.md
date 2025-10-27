---
title: "Remove-DbaDbRoleMember"
slug: "Remove-DbaDbRoleMember"
date: 2024-01-01
layout: "single"
author: "Ben Miller (@DBAduck)"
availability: "Windows, Linux, macOS"
synopsis: "Removes database users from database roles across SQL Server instances."
tags:
  - "Role"
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbRoleMember.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbRoleMember"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbRoleMember</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbRoleMember.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Ben Miller (@DBAduck)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Removes database users from database roles across SQL Server instances.

## Description

Removes database users from specified database roles, supporting both built-in roles (like db_datareader, db_datawriter, db_owner) and custom database roles. This function streamlines user access management when you need to revoke permissions during employee transitions, security reviews, or role-based access cleanup.  
  
Handles user removal from multiple roles simultaneously and works across multiple databases and instances. Particularly useful for bulk permission changes, compliance requirements, or when migrating users between different security models. The function validates that users are actually members of the specified roles before attempting removal, preventing unnecessary errors.

## Syntax

```powershell
Remove-DbaDbRoleMember
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Role] <String[]>]
    [-User] <String[]>
    [[-InputObject] <Object[]>]
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
PS C:\> Remove-DbaDbRoleMember -SqlInstance localhost -Database mydb -Role db_owner -User user1
```
{: data-copyable="true" data-clean-code="Remove-DbaDbRoleMember -SqlInstance localhost -Database mydb -Role db_owner -User user1" }

Removes user1 from the role db_owner in the database mydb on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbRoleMember -SqlInstance localhost, sql2016 -Role SqlAgentOperatorRole -User user1 -Database msdb
```
{: data-copyable="true" data-clean-code="Remove-DbaDbRoleMember -SqlInstance localhost, sql2016 -Role SqlAgentOperatorRole -User user1 -Database msdb" }

Removes user1 in servers localhost and sql2016 in the msdb database from the SqlAgentOperatorRole<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Remove-DbaDbRoleMember -Role SqlAgentOperatorRole -User user1 -Database msdb
```
{: data-copyable="true" data-clean-code="$servers = Get-Content C:\servers.txt
$servers | Remove-DbaDbRoleMember -Role SqlAgentOperatorRole -User user1 -Database msdb" }

Removes user1 from the SqlAgentOperatorRole in the msdb database in every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> $db = Get-DbaDataabse -SqlInstance localhost -Database DEMODB
PS C:\> $db | Remove-DbaDbRoleMember -Role "db_datareader","db_datawriter" -User user1
```
{: data-copyable="true" data-clean-code="$db = Get-DbaDataabse -SqlInstance localhost -Database DEMODB
$db | Remove-DbaDbRoleMember -Role &quot;db_datareader&quot;,&quot;db_datawriter&quot; -User user1" }

Removes user1 in the database DEMODB on the server localhost from the roles db_datareader and db_datawriter<br>

#####  Example:  5 

```powershell
PS C:\> $roles = Get-DbaDbRole -SqlInstance localhost -Role "db_datareader","db_datawriter"
PS C:\> $roles | Remove-DbaDbRoleMember -User user1
```
{: data-copyable="true" data-clean-code="$roles = Get-DbaDbRole -SqlInstance localhost -Role &quot;db_datareader&quot;,&quot;db_datawriter&quot;
$roles | Remove-DbaDbRoleMember -User user1" }

### Required Parameters

##### -User

Specifies the database users to remove from the specified roles. Accepts multiple usernames for bulk operations.  
The function validates that users are actually members of the roles before attempting removal, preventing errors when users aren't currently assigned to the roles.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

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

Specifies which databases to process for role member removal. Accepts wildcards for pattern matching.  
When omitted, the function processes all databases on the instance. Use this to target specific databases during security reviews or when cleaning up permissions in development environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Role

Specifies the database roles to remove users from, such as db_datareader, db_datawriter, db_owner, or custom roles.  
Accepts multiple roles to remove users from several roles simultaneously. Required unless you're piping in DatabaseRole objects from Get-DbaDbRole.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts piped input from Get-DbaDatabase, Get-DbaDbRole, or SQL Server instance objects.  
Use this to chain commands together, such as piping specific databases or roles to process only those objects instead of specifying them via parameters.

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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
