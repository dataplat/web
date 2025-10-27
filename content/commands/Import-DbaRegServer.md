---
title: "Import-DbaRegServer"
slug: "Import-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Imports registered servers and server groups into SQL Server Central Management Server from XML files, other CMS instances, or custom objects"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Import-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Import-DbaRegServer"
draft: false
---

# Import-DbaRegServer

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Import-DbaRegServer](https://github.com/dataplat/dbatools/blob/master/public/Import-DbaRegServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Import-DbaRegServer](https://dataplat.github.io/boh#Import-DbaRegServer).

## Synopsis

Imports registered servers and server groups into SQL Server Central Management Server from XML files, other CMS instances, or custom objects

## Description

Imports registered servers and server groups into a SQL Server Central Management Server (CMS) from multiple sources including exported XML files, other CMS instances, or custom objects like CSVs. The function automatically creates missing server groups during import and supports importing to specific group locations within the CMS hierarchy. This is essential for migrating CMS configurations between environments, consolidating server inventories from multiple sources, or bulk-loading server lists into a new CMS setup.

## Syntax

```powershell
Import-DbaRegServer
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Path] <String[]>]
    [[-InputObject] <Object[]>]
    [[-Group] <Object>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Import-DbaRegServer -SqlInstance sql2012 -Path C:\temp\corp-regservers.xml
```

Imports C:\temp\corp-regservers.xml to the CMS on sql2012<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbaRegServer -SqlInstance sql2008 -Group hr\Seattle -Path C:\temp\Seattle.xml
```

Imports C:\temp\Seattle.xml to Seattle subgroup within the hr group on sql2008<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2008, sql2012 | Import-DbaRegServer -SqlInstance sql2017
```

Imports all registered servers from sql2008 and sql2012 to sql2017<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sql2008 -Group hr\Seattle | Import-DbaRegServer -SqlInstance sql2017 -Group Seattle
```

Imports all registered servers from the hr\Seattle group on sql2008 to the Seattle group on sql2017<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -Path

Specifies the file path to XML files containing exported registered server configurations from SQL Server Management Studio or Export-DbaRegServer.  
Use this when migrating CMS configurations between environments or restoring server lists from backup exports.

| Property | Value |
| --- | --- |
| Alias | FullName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts registered server objects, server group objects, or custom objects like CSV data for bulk import operations. Supports piping from Get-DbaRegServer and Get-DbaRegServerGroup cmdlets.  
When importing from CSV or custom objects, ServerName column is required while Name, Description, and Group columns are optional. Use this for consolidating servers from multiple CMS instances or   
bulk-loading server inventories.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Group

Specifies the target group within the CMS hierarchy where servers will be imported. Accepts group paths using backslash notation like "hr\Seattle" or ServerGroup objects from Get-DbaRegServerGroup.  
Use this when you need to organize imported servers into specific groups rather than importing to the root level.

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
