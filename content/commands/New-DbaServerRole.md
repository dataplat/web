---
title: "New-DbaServerRole"
slug: "New-DbaServerRole"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Creates custom server-level roles on SQL Server instances for role-based access control."
tags:
  - "Role"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaServerRole.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaServerRole"
draft: false
---

# New-DbaServerRole

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaServerRole](https://github.com/dataplat/dbatools/blob/master/public/New-DbaServerRole.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaServerRole](https://dataplat.github.io/boh#New-DbaServerRole).

## Synopsis

Creates custom server-level roles on SQL Server instances for role-based access control.

## Description

Creates new server-level roles on one or more SQL Server instances, allowing you to implement custom security frameworks without manually using SSMS or T-SQL. Server roles provide a way to group server-level permissions and assign them to logins, making it easier to manage security across your environment. The function checks for existing roles before creation and optionally allows you to specify a role owner other than the default dbo.

## Syntax

```powershell
New-DbaServerRole
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-ServerRole] <String[]>]
    [[-Owner] <String>]
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
PS C:\> New-DbaServerRole -SqlInstance sql2017a -ServerRole 'dbExecuter' -Owner sa
```

Will create a new server role named dbExecuter and grant ownership to the login sa on sql2017a instance.<br>

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

##### -ServerRole

Specifies the name of the custom server-level role to create. Accepts multiple role names to create several roles in one operation.  
Use this when implementing role-based security models or when you need custom permission groups beyond the built-in server roles like sysadmin or dbcreator.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Owner

Sets the login that will own the newly created server role. Defaults to 'dbo' if not specified.  
Specify a different owner when you need the role managed by a specific login for security or organizational requirements.

| Property | Value |
| --- | --- |
| Alias |  |
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
