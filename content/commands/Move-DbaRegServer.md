---
title: "Move-DbaRegServer"
slug: "Move-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Moves registered servers between groups within SQL Server Central Management Server (CMS)"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Move-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Move-DbaRegServer"
draft: false
---

# Move-DbaRegServer

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Move-DbaRegServer](https://github.com/dataplat/dbatools/blob/master/public/Move-DbaRegServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Move-DbaRegServer](https://dataplat.github.io/boh#Move-DbaRegServer).

## Synopsis

Moves registered servers between groups within SQL Server Central Management Server (CMS)

## Description

Moves registered server entries from one group to another within Central Management Server hierarchy. This helps reorganize CMS structure when server roles change or you need to restructure your server groupings for better management. The function updates the CMS database to reflect the new group membership while preserving all server connection details and properties.

## Syntax

```powershell
Move-DbaRegServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-ServerName] <String[]>]
    [[-Group] <String>]
    [[-InputObject] <RegisteredServer[]>]
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
PS C:\> Move-DbaRegServer -SqlInstance sql2012 -Name 'Web SQL Cluster' -Group HR\Prod
```

Moves the registered server on sql2012 titled 'Web SQL Cluster' to the Prod group within the HR group<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2017 -Name 'Web SQL Cluster' | Move-DbaRegServer -Group Web
```

Moves the registered server 'Web SQL Cluster' on sql2017 to the Web group, also on sql2017<br>

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

Specifies one or more registered servers to move by their display name as shown in SSMS CMS interface. This is the friendly name you see in the registered servers tree, which may differ from the   
actual server instance name.  
Use this when you know the descriptive name assigned to servers in CMS but not necessarily their technical instance names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerName

Specifies one or more registered servers to move by their actual SQL Server instance name. This is the technical server\instance connection string used to connect to SQL Server.  
Use this when you need to target servers by their network instance names rather than their CMS display names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Group

Specifies the destination group where the registered servers will be moved. Use backslash notation for nested groups like 'Production\WebServers'.  
If not specified, servers are moved to the root level of the CMS hierarchy. The target group must already exist in CMS.

| Property | Value |
| --- | --- |
| Alias | NewGroup |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts registered server objects from the pipeline, typically from Get-DbaRegServer output. This allows you to filter servers first and then move the results.  
Use this approach when you need complex filtering or when working with servers from multiple CMS instances.

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
