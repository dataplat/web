---
title: "Remove-DbaRegServer"
slug: "Remove-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes registered servers from SQL Server Central Management Server or local registered server groups."
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaRegServer"
draft: false
---

# Remove-DbaRegServer

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaRegServer](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaRegServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaRegServer](https://dataplat.github.io/boh#Remove-DbaRegServer).

## Synopsis

Removes registered servers from SQL Server Central Management Server or local registered server groups.

## Description

Removes registered servers from SQL Server Central Management Server (CMS) or local registered server groups within SQL Server Management Studio. This command helps DBAs clean up outdated server registrations, remove decommissioned servers, or reorganize server inventory without manually navigating through SSMS interfaces.  
  
You can remove servers by specifying individual server names, registered server display names, or entire groups. The function works with both CMS hierarchies and local registered server groups, but cannot modify Azure Data Studio registered servers.

## Syntax

```powershell
Remove-DbaRegServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-ServerName] <String[]>]
    [[-Group] <String[]>]
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
PS C:\> Remove-DbaRegServer -SqlInstance sql2012 -Group HR, Accounting
```

Removes all servers from the HR and Accounting groups on sql2012<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaRegServer -SqlInstance sql2012 -Group HR\Development
```

Removes all servers from the HR and sub-group Development from the CMS on sql2012.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaRegServer -SqlInstance sql2012 -Confirm:$false
```

Removes all registered servers on sql2012 and turns off all prompting<br>

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

Specifies registered server display names to remove from CMS or local registered servers.  
Use this when you need to remove servers by their friendly names as shown in the SSMS Registered Servers pane rather than actual server instance names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerName

Specifies actual SQL Server instance names to remove from registered servers.  
Use this when you need to remove servers by their connection strings or network names rather than display names, which is helpful when cleaning up instances that may have been registered with   
different friendly names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Group

Removes all registered servers from specified Central Management Server groups. Supports hierarchical paths using backslash notation (e.g., "Production\Database Servers").  
Use this when you need to clean out entire groups during environment changes, server migrations, or organizational restructuring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts registered server objects from Get-DbaRegServer for targeted removal operations.  
Use this for complex removal scenarios where you first query and filter servers, then pipe the results to remove specific servers based on properties or conditions.

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
