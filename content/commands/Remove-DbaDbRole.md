---
title: "Remove-DbaDbRole"
slug: "Remove-DbaDbRole"
date: 2024-01-01
layout: "single"
author: "Ben Miller (@DBAduck)"
availability: "Windows, Linux, macOS"
synopsis: "Removes custom database roles from SQL Server databases"
tags:
  - "Role"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbRole.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbRole"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbRole</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbRole.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Removes custom database roles from SQL Server databases

## Description

Removes user-defined database roles from SQL Server databases while protecting against accidental deletion of system roles. This function automatically excludes fixed database roles (like db_owner, db_datareader) and the public role, ensuring only custom roles created for specific security requirements can be removed.  
  
The function performs safety checks before removal, preventing deletion of roles that own database schemas to avoid orphaning database objects. This is particularly useful when cleaning up deprecated security configurations or removing roles from development databases that were copied from production.  
  
You can target specific roles across multiple databases and instances, making it ideal for standardizing security configurations or bulk cleanup operations. By default, system databases are excluded unless explicitly included with the IncludeSystemDbs parameter.

## Syntax

```powershell
Remove-DbaDbRole
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Role] <String[]>]
    [[-ExcludeRole] <String[]>]
    [-IncludeSystemDbs]
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
PS C:\> Remove-DbaDbRole -SqlInstance localhost -Database dbname -Role "customrole1", "customrole2"
```
{: data-copyable="true" data-clean-code="Remove-DbaDbRole -SqlInstance localhost -Database dbname -Role &quot;customrole1&quot;, &quot;customrole2&quot;" }

Removes roles customrole1 and customrole2 from the database dbname on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbRole -SqlInstance localhost, sql2016 -Database db1, db2 -Role role1, role2, role3
```
{: data-copyable="true" data-clean-code="Remove-DbaDbRole -SqlInstance localhost, sql2016 -Database db1, db2 -Role role1, role2, role3" }

Removes role1,role2,role3 from db1 and db2 on the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Remove-DbaDbRole -Database db1, db2 -Role role1
```
{: data-copyable="true" data-clean-code="$servers = Get-Content C:\servers.txt
$servers | Remove-DbaDbRole -Database db1, db2 -Role role1" }

Removes role1 from db1 and db2 on the servers in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> $roles = Get-DbaDbRole -SqlInstance localhost, sql2016 -Database db1, db2 -Role role1, role2, role3
PS C:\> $roles | Remove-DbaDbRole
```
{: data-copyable="true" data-clean-code="$roles = Get-DbaDbRole -SqlInstance localhost, sql2016 -Database db1, db2 -Role role1, role2, role3
$roles | Remove-DbaDbRole" }

Removes role1,role2,role3 from db1 and db2 on the local and sql2016 SQL Server instances<br>

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

Specifies which databases to remove roles from. Accepts multiple database names and supports wildcards for pattern matching.  
When omitted, the function processes all user databases on the instance. Use this when you need to clean up roles from specific databases only.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from role removal operations. Accepts multiple database names and supports wildcards.  
Use this when processing all databases except certain ones, such as excluding production databases during cleanup operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Role

Specifies which custom database roles to remove. Accepts multiple role names and supports wildcards for pattern matching.  
When omitted, all custom roles in the target databases will be removed. Fixed database roles (db_owner, db_datareader, etc.) and the public role are automatically protected from deletion.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeRole

Excludes specific roles from removal operations. Accepts multiple role names and supports wildcards.  
Use this when you want to remove most custom roles but preserve certain ones, such as keeping application-specific roles while cleaning up deprecated security configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemDbs

Allows role removal operations to target system databases (master, model, msdb, tempdb).  
By default, system databases are excluded to prevent accidental removal of roles that may be required for SQL Server operations. Only use this when you specifically need to clean up custom roles from   
system databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts piped objects from Get-DbaDbRole, Get-DbaDatabase, or SQL Server instances for processing.  
Use this for pipeline operations where you first retrieve specific roles or databases, then remove roles from them. This allows for more complex filtering and processing scenarios.

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
