---
title: "Get-DbaDbSharePoint"
slug: "Get-DbaDbSharePoint"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies all databases belonging to a SharePoint farm by querying the SharePoint Configuration database."
tags:
  - "SharePoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSharePoint.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbSharePoint"
draft: false
---

# Get-DbaDbSharePoint

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbSharePoint](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSharePoint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbSharePoint](https://dataplat.github.io/boh#Get-DbaDbSharePoint).

## Synopsis

Identifies all databases belonging to a SharePoint farm by querying the SharePoint Configuration database.

## Description

Discovers and returns database objects for all databases that are part of a SharePoint farm by querying the SharePoint Configuration database's internal tables and stored procedures. This helps DBAs identify which databases on their SQL Server instance are actively used by SharePoint, eliminating guesswork when planning maintenance, migrations, or troubleshooting SharePoint connectivity issues.  
  
The function queries the SharePoint Configuration database to find registered SharePoint databases using SharePoint's internal proc_getObjectsByBaseClass stored procedure and Objects table. By default, this command checks SharePoint_Config. To use an alternate configuration database, use the ConfigDatabase parameter.

## Syntax

```powershell
Get-DbaDbSharePoint
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-ConfigDatabase] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbSharePoint -SqlInstance sqlcluster
```

Returns databases that are part of a SharePoint Farm, as found in SharePoint_Config on sqlcluster<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqlcluster -Database SharePoint_Config_2016 | Get-DbaDbSharePoint
```

Returns databases that are part of a SharePoint Farm, as found in SharePoint_Config_2016 on sqlcluster<br>

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

##### -ConfigDatabase

Specifies the name of the SharePoint Configuration database to query for farm database information. Defaults to SharePoint_Config.  
Use this when your SharePoint farm uses a non-standard configuration database name, such as SharePoint_Config_2016 or when managing multiple SharePoint versions on the same SQL instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | SharePoint_Config |

##### -InputObject

Accepts database objects from Get-DbaDatabase to directly analyze specific SharePoint Configuration databases.  
Use this when you want to target a specific configuration database without connecting to the SQL instance again, or when working with multiple SharePoint farms across different instances.

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


&nbsp;
