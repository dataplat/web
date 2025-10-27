---
title: "Remove-DbaRegServerGroup"
slug: "Remove-DbaRegServerGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes server groups from SQL Server Central Management Server (CMS)."
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaRegServerGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaRegServerGroup"
draft: false
---

# Remove-DbaRegServerGroup

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaRegServerGroup](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaRegServerGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaRegServerGroup](https://dataplat.github.io/boh#Remove-DbaRegServerGroup).

## Synopsis

Removes server groups from SQL Server Central Management Server (CMS).

## Description

Deletes specified server groups from Central Management Server, including all nested subgroups and registered servers within those groups. This permanently removes the organizational structure you've built in CMS, so use with caution. The function works with both local registered servers and CMS-based groups, and supports piping from Get-DbaRegServerGroup for targeted removal operations.

## Syntax

```powershell
Remove-DbaRegServerGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-InputObject] <ServerGroup[]>]
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
PS C:\> Remove-DbaRegServerGroup -SqlInstance sql2012 -Group HR, Accounting
```

Removes the HR and Accounting groups on sql2012<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaRegServerGroup -SqlInstance sql2012 -Group HR\Development -Confirm:$false
```

Removes the Development subgroup within the HR group on sql2012 and turns off all prompting<br>

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

##### -Name

Specifies the name of one or more server groups to remove from Central Management Server or local registered servers. Supports hierarchical paths like "HR\Development" to target subgroups within   
parent groups.  
Use this when you know the exact group names to delete and want to remove specific organizational structures from your CMS or local registered server configuration.

| Property | Value |
| --- | --- |
| Alias | Group |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts ServerGroup objects from Get-DbaRegServerGroup for pipeline operations. This allows you to first filter or query specific server groups, then remove them in a controlled manner.  
Use this approach when you need to perform complex filtering, review groups before deletion, or process large numbers of groups with conditional logic.

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
