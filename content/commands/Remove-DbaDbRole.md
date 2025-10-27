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

# Remove-DbaDbRole

| Property | Value |
| --- | --- |
| **Author** | Ben Miller (@DBAduck) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbRole](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbRole.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbRole](https://dataplat.github.io/boh#Remove-DbaDbRole).

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

Removes roles customrole1 and customrole2 from the database dbname on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbRole -SqlInstance localhost, sql2016 -Database db1, db2 -Role role1, role2, role3
```

Removes role1,role2,role3 from db1 and db2 on the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Remove-DbaDbRole -Database db1, db2 -Role role1
```

Removes role1 from db1 and db2 on the servers in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> $roles = Get-DbaDbRole -SqlInstance localhost, sql2016 -Database db1, db2 -Role role1, role2, role3
PS C:\> $roles | Remove-DbaDbRole
```

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
