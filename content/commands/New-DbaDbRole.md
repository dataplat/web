---
title: "New-DbaDbRole"
slug: "New-DbaDbRole"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Creates new database roles in one or more SQL Server databases."
tags:
  - "Role"
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbRole.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbRole"
draft: false
---

# New-DbaDbRole

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbRole](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbRole.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbRole](https://dataplat.github.io/boh#New-DbaDbRole).

## Synopsis

Creates new database roles in one or more SQL Server databases.

## Description

Creates custom database roles for implementing role-based security in SQL Server databases. This function handles the creation of user-defined database roles that can later be granted specific permissions and have users or other roles assigned to them. You can create the same role across multiple databases for consistency, and optionally specify a custom owner instead of the default dbo. This eliminates the need to manually create roles through SSMS or T-SQL for each database.

## Syntax

```powershell
New-DbaDbRole
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Role] <String[]>]
    [[-Owner] <String>]
    [[-InputObject] <Database[]>]
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
PS C:\> New-DbaDbRole -SqlInstance sql2017a -Database db1 -Role 'dbExecuter'
```

Will create a new role named dbExecuter within db1 on sql2017a instance.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

Specifies which databases to create the new role(s) in. Accepts wildcards for pattern matching.  
Use this when you need to create roles in specific databases instead of all databases on the instance.  
If unspecified, the role will be created in all accessible databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude from role creation when processing all databases.  
Use this to skip system databases or specific user databases where the role shouldn't be created.  
Particularly useful when creating standardized roles across most but not all databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Role

Specifies the name(s) of the custom database role(s) to create.  
Use meaningful names that reflect the role's intended permissions like 'AppReadOnly' or 'ReportUsers'.  
The function will create each specified role in all target databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Owner

Specifies the database principal that will own the new role. Defaults to 'dbo' if not specified.  
Use this when you need a specific user or role to own the new database role for security or organizational requirements.  
The owner must exist in each target database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase for role creation.  
Use this for advanced filtering or when working with databases from multiple instances.  
This parameter allows you to chain Get-DbaDatabase with specific filters before creating roles.

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
