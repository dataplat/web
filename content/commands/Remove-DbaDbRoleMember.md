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

# Remove-DbaDbRoleMember

| Property | Value |
| --- | --- |
| **Author** | Ben Miller (@DBAduck) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbRoleMember](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbRoleMember.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbRoleMember](https://dataplat.github.io/boh#Remove-DbaDbRoleMember).

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

Removes user1 from the role db_owner in the database mydb on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbRoleMember -SqlInstance localhost, sql2016 -Role SqlAgentOperatorRole -User user1 -Database msdb
```

Removes user1 in servers localhost and sql2016 in the msdb database from the SqlAgentOperatorRole<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Remove-DbaDbRoleMember -Role SqlAgentOperatorRole -User user1 -Database msdb
```

Removes user1 from the SqlAgentOperatorRole in the msdb database in every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> $db = Get-DbaDataabse -SqlInstance localhost -Database DEMODB
PS C:\> $db | Remove-DbaDbRoleMember -Role "db_datareader","db_datawriter" -User user1
```

Removes user1 in the database DEMODB on the server localhost from the roles db_datareader and db_datawriter<br>

#####  Example:  5 

```powershell
PS C:\> $roles = Get-DbaDbRole -SqlInstance localhost -Role "db_datareader","db_datawriter"
PS C:\> $roles | Remove-DbaDbRoleMember -User user1
```

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
