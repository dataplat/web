---
title: "Remove-DbaServerRole"
slug: "Remove-DbaServerRole"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva), claudioessilva.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes custom server-level roles from SQL Server instances."
tags:
  - "Role"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaServerRole.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaServerRole"
draft: false
---

# Remove-DbaServerRole

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva), claudioessilva.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaServerRole](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaServerRole.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaServerRole](https://dataplat.github.io/boh#Remove-DbaServerRole).

## Synopsis

Removes custom server-level roles from SQL Server instances.

## Description

Removes custom server-level roles that are no longer needed from SQL Server instances. This function helps clean up security configurations by permanently dropping user-defined server roles while preserving built-in system roles. Use this when decommissioning applications, consolidating permissions, or cleaning up after security audits. The operation requires confirmation due to its permanent nature and potential security impact.

## Syntax

```powershell
Remove-DbaServerRole
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-ServerRole] <String[]>]
    [[-InputObject] <ServerRole[]>]
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
PS C:\> Remove-DbaServerRole -SqlInstance Server1 -ServerRole 'serverExecuter'
```

Server-role 'serverExecuter' on Server1 will be removed if it exists.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaServerRole -SqlInstance Server1 -ServerRole 'serverExecuter' -Confirm:$false
```

Suppresses all prompts to remove the server-role 'serverExecuter' on 'Server1'.<br>

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

##### -ServerRole

Specifies the name of the custom server-level role to remove from the SQL Server instance.  
Only user-defined server roles can be removed - built-in roles like sysadmin or serveradmin are protected.  
Use this when you need to clean up obsolete custom roles after application decommissioning or security reviews.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts server role objects from Get-DbaServerRole for pipeline operations.  
Use this when you need to remove multiple roles or want to filter roles before removal.  
Allows for more complex scenarios like removing all custom roles that match specific criteria.

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
