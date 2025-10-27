---
title: "Add-DbaRegServerGroup"
slug: "Add-DbaRegServerGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates organizational server groups within SQL Server Central Management Server (CMS)"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaRegServerGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaRegServerGroup"
draft: false
---

# Add-DbaRegServerGroup

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Add-DbaRegServerGroup](https://github.com/dataplat/dbatools/blob/master/public/Add-DbaRegServerGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Add-DbaRegServerGroup](https://dataplat.github.io/boh#Add-DbaRegServerGroup).

## Synopsis

Creates organizational server groups within SQL Server Central Management Server (CMS)

## Description

Creates new server groups in SQL Server Central Management Server to organize registered servers into logical hierarchies. This allows DBAs to group servers by environment, application, location, or any other classification system for easier management at scale. Supports nested group structures using backslash notation (Group\SubGroup) and automatically creates parent groups if they don't exist. If you need to import existing groups and servers from other sources, use Import-DbaRegServer instead.

## Syntax

```powershell
Add-DbaRegServerGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [-Name] <String>
    [[-Description] <String>]
    [[-Group] <String>]
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
PS C:\> Add-DbaRegServerGroup -SqlInstance sql2012 -Name HR
```

Creates a registered server group called HR, in the root of sql2012's CMS<br>

#####  Example:  2 

```powershell
PS C:\> Add-DbaRegServerGroup -SqlInstance sql2012, sql2014 -Name sub-folder -Group HR
```

Creates a registered server group on sql2012 and sql2014 called sub-folder within the HR group<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sql2012, sql2014 -Group HR | Add-DbaRegServerGroup -Name sub-folder
```

Creates a registered server group on sql2012 and sql2014 called sub-folder within the HR group of each server<br>

### Required Parameters

##### -Name

Specifies the name for the new server group within Central Management Server. Use descriptive names that reflect your organizational structure like 'Production', 'Development', or 'HR-Databases'.  
Group names can include backslashes to create nested hierarchies (e.g., 'Production\WebServers' creates a WebServers subgroup under Production).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance

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

##### -Description

Provides additional details about the server group's purpose or contents. Use this to document the group's role, maintenance schedules, or contact information.  
Helpful for team environments where multiple DBAs need to understand each group's function.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Group

Specifies the parent group where the new server group will be created. If omitted, creates the group at the root level of Central Management Server.  
Use backslash notation to specify nested paths like 'Production\WebServers' - this automatically creates any missing parent groups in the hierarchy.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts server group objects from Get-DbaRegServerGroup through the pipeline. Use this when you need to create subgroups within existing groups from multiple CMS instances.  
Enables bulk operations where you can pipe existing groups and create new subgroups within each one simultaneously.

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
