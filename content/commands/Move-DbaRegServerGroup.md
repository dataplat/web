---
title: "Move-DbaRegServerGroup"
slug: "Move-DbaRegServerGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Moves registered server groups to different parent groups within SQL Server Central Management Server (CMS)"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Move-DbaRegServerGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Move-DbaRegServerGroup"
draft: false
---

# Move-DbaRegServerGroup

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Move-DbaRegServerGroup](https://github.com/dataplat/dbatools/blob/master/public/Move-DbaRegServerGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Move-DbaRegServerGroup](https://dataplat.github.io/boh#Move-DbaRegServerGroup).

## Synopsis

Moves registered server groups to different parent groups within SQL Server Central Management Server (CMS)

## Description

Moves registered server groups to new locations within your Central Management Server hierarchy. This lets you reorganize your CMS group structure without using SQL Server Management Studio manually. You can move groups between different parent groups or relocate them to the root level, helping you maintain organized server collections as your environment grows or changes.

## Syntax

```powershell
Move-DbaRegServerGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Group] <String[]>]
    [-NewGroup] <String>
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
PS C:\> Move-DbaRegServerGroup -SqlInstance sql2012 -Group HR\Development -NewGroup AD\Prod
```

Moves the Development group within HR to the Prod group within AD<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sql2017 -Group HR\Development| Move-DbaRegServerGroup -NewGroup Web
```

Moves the Development group within HR to the Web group<br>

### Required Parameters

##### -NewGroup

Specifies the destination group where the selected groups will be moved. Accepts group paths like 'AD\Prod' or 'Web', or use 'Default' to move to the root level.  
The destination group must already exist in the Central Management Server hierarchy.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

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

##### -Group

Specifies the registered server group(s) to move within your Central Management Server hierarchy. Accepts group paths like 'HR\Development' or 'Production\WebServers'.  
Use this when you need to select specific groups to relocate rather than piping group objects from Get-DbaRegServerGroup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts registered server group objects from Get-DbaRegServerGroup for pipeline operations. Use this when you want to filter or manipulate groups before moving them.  
This parameter enables advanced scenarios like moving multiple groups based on complex criteria or properties.

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
