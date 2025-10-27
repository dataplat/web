---
title: "Add-DbaDbRoleMember"
slug: "Add-DbaDbRoleMember"
date: 2024-01-01
layout: "single"
author: "Ben Miller (@DBAduck)"
availability: "Windows, Linux, macOS"
synopsis: "Adds database users or roles as members to database roles across SQL Server instances"
tags:
  - "Role"
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaDbRoleMember.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaDbRoleMember"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaDbRoleMember</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaDbRoleMember.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Adds database users or roles as members to database roles across SQL Server instances

## Description

Manages database security by adding users or roles as members to database roles, automating what would otherwise require manual T-SQL commands or SQL Server Management Studio clicks. This function handles membership validation to ensure the user or role exists in the database before attempting to add them, and checks existing membership to prevent duplicate assignments. You can add multiple users to multiple roles across multiple databases and instances in a single operation, making it ideal for bulk security configuration or automated permission management workflows.

## Syntax

```powershell
Add-DbaDbRoleMember
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Role] <String[]>]
    [-Member] <String[]>
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
PS C:\> Add-DbaDbRoleMember -SqlInstance localhost -Database mydb -Role db_owner -Member user1
```
{: data-copyable="true" data-clean-code="Add-DbaDbRoleMember -SqlInstance localhost -Database mydb -Role db_owner -Member user1" }

Adds user1 to the role db_owner in the database mydb on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Add-DbaDbRoleMember -SqlInstance localhost, sql2016 -Role SqlAgentOperatorRole -Member user1 -Database msdb
```
{: data-copyable="true" data-clean-code="Add-DbaDbRoleMember -SqlInstance localhost, sql2016 -Role SqlAgentOperatorRole -Member user1 -Database msdb" }

Adds user1 in servers localhost and sql2016 in the msdb database to the SqlAgentOperatorRole<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Add-DbaDbRoleMember -Role SqlAgentOperatorRole -Member user1 -Database msdb
```
{: data-copyable="true" data-clean-code="$servers = Get-Content C:\servers.txt
$servers | Add-DbaDbRoleMember -Role SqlAgentOperatorRole -Member user1 -Database msdb" }

Adds user1 to the SqlAgentOperatorROle in the msdb database in every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> Add-DbaDbRoleMember -SqlInstance localhost -Role "db_datareader","db_datawriter" -Member user1 -Database DEMODB
```
{: data-copyable="true" data-clean-code="Add-DbaDbRoleMember -SqlInstance localhost -Role &quot;db_datareader&quot;,&quot;db_datawriter&quot; -Member user1 -Database DEMODB" }

Adds user1 in the database DEMODB on the server localhost to the roles db_datareader and db_datawriter<br>

#####  Example:  5 

```powershell
PS C:\> $roles = Get-DbaDbRole -SqlInstance localhost -Role "db_datareader","db_datawriter" -Database DEMODB
PS C:\> $roles | Add-DbaDbRoleMember -Member user1
```
{: data-copyable="true" data-clean-code="$roles = Get-DbaDbRole -SqlInstance localhost -Role &quot;db_datareader&quot;,&quot;db_datawriter&quot; -Database DEMODB
$roles | Add-DbaDbRoleMember -Member user1" }

Adds user1 in the database DEMODB on the server localhost to the roles db_datareader and db_datawriter<br>

### Required Parameters

##### -Member

Specifies the database user(s) or role(s) to add as members to the target roles. Can be individual users, Windows groups, or other database roles.  
The function validates that each member exists in the database before attempting to add them, preventing errors from typos or missing objects.

| Property | Value |
| --- | --- |
| Alias | User |
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

Specifies which databases to process for role membership changes. Accepts multiple database names and supports wildcards.  
When omitted, the function processes all databases on the target instances, making it useful for organization-wide security standardization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Role

Specifies the database role(s) to add members to. Accepts multiple role names including built-in roles like db_datareader, db_datawriter, db_owner, or custom database roles.  
Use this when you need to grant specific database permissions by adding users or roles to appropriate database roles.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts piped input from Get-DbaDbRole, Get-DbaDatabase, or SQL Server instances for streamlined workflows.  
Use this when chaining commands together, such as filtering specific roles first then adding members to those filtered results.

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
