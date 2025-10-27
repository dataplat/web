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

# Add-DbaDbRoleMember

| Property | Value |
| --- | --- |
| **Author** | Ben Miller (@DBAduck) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Add-DbaDbRoleMember](https://github.com/dataplat/dbatools/blob/master/public/Add-DbaDbRoleMember.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Add-DbaDbRoleMember](https://dataplat.github.io/boh#Add-DbaDbRoleMember).

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

Adds user1 to the role db_owner in the database mydb on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Add-DbaDbRoleMember -SqlInstance localhost, sql2016 -Role SqlAgentOperatorRole -Member user1 -Database msdb
```

Adds user1 in servers localhost and sql2016 in the msdb database to the SqlAgentOperatorRole<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Add-DbaDbRoleMember -Role SqlAgentOperatorRole -Member user1 -Database msdb
```

Adds user1 to the SqlAgentOperatorROle in the msdb database in every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> Add-DbaDbRoleMember -SqlInstance localhost -Role "db_datareader","db_datawriter" -Member user1 -Database DEMODB
```

Adds user1 in the database DEMODB on the server localhost to the roles db_datareader and db_datawriter<br>

#####  Example:  5 

```powershell
PS C:\> $roles = Get-DbaDbRole -SqlInstance localhost -Role "db_datareader","db_datawriter" -Database DEMODB
PS C:\> $roles | Add-DbaDbRoleMember -Member user1
```

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
