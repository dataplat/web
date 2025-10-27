---
title: "Get-DbaRegServerGroup"
slug: "Get-DbaRegServerGroup"
date: 2024-01-01
layout: "single"
author: "Tony Wilhelm (@tonywsql)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves server group objects from SQL Server Central Management Server (CMS) for organized server management."
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegServerGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRegServerGroup"
draft: false
---

# Get-DbaRegServerGroup

| Property | Value |
| --- | --- |
| **Author** | Tony Wilhelm (@tonywsql) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRegServerGroup](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegServerGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRegServerGroup](https://dataplat.github.io/boh#Get-DbaRegServerGroup).

## Synopsis

Retrieves server group objects from SQL Server Central Management Server (CMS) for organized server management.

## Description

Returns server group objects from Central Management Server, which are organizational containers that help DBAs manage multiple SQL Server instances in a hierarchical structure. Server groups allow you to categorize registered servers by environment, function, or any logical grouping that makes sense for your infrastructure.  
  
This function is essential for inventory management and automated administration across multiple SQL Server instances. Use it to discover existing server groups before adding new registered servers, or to build dynamic server lists for bulk operations based on your organizational structure.  
  
The function supports targeting specific groups by name or path (including nested subgroups), excluding certain groups from results, or filtering by group ID. You can work with both local CMS stores and remote Central Management Server instances.

## Syntax

```powershell
Get-DbaRegServerGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Group] <Object[]>]
    [[-ExcludeGroup] <Object[]>]
    [[-Id] <Int32[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sqlserver2014a
```

Gets the top level groups from the CMS on sqlserver2014a, using Windows Credentials.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sqlserver2014a -SqlCredential $credential
```

Gets the top level groups from the CMS on sqlserver2014a, using alternative credentials to authenticate to the server.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sqlserver2014a -Group HR, Accounting
```

Gets the HR and Accounting groups from the CMS on sqlserver2014a.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sqlserver2014a -Group HR\Development
```

Returns the sub-group Development of the HR group from the CMS on sqlserver2014a.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Group

Specifies one or more server group names to retrieve from Central Management Server. Supports hierarchical paths using backslash notation (e.g., 'Production\WebServers').  
Use this when you need specific organizational groups rather than all groups, or when working with nested subgroups within your CMS structure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeGroup

Specifies one or more server group names to exclude from the results. Accepts the same hierarchical path format as the Group parameter.  
Use this when you want all groups except certain ones, such as excluding test environments from production operations or removing deprecated groups from inventory reports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Id

Retrieves server groups by their numeric identifier. Note that Id 1 always represents the root DatabaseEngineServerGroup, and this parameter only works for groups that contain registered servers.  
Use this when you need to target groups programmatically using their internal CMS identifiers, typically in automated scripts that reference groups by ID rather than name.

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


&nbsp;
