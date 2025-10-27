---
title: "Get-DbaRegServer"
slug: "Get-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Bryan Hamby (@galador) | Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves registered SQL Server instances from SSMS, Azure Data Studio, and Central Management Server"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRegServer"
draft: false
---

# Get-DbaRegServer

| Property | Value |
| --- | --- |
| **Author** | Bryan Hamby (@galador) , Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRegServer](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRegServer](https://dataplat.github.io/boh#Get-DbaRegServer).

## Synopsis

Retrieves registered SQL Server instances from SSMS, Azure Data Studio, and Central Management Server

## Description

Retrieves SQL Server instances from registered server configurations stored in SQL Server Management Studio (SSMS), Azure Data Studio, and Central Management Server (CMS). DBAs use registered servers to organize and quickly connect to multiple SQL Server instances across their environment.  
  
When no SqlInstance is specified, returns local registered servers from SSMS and Azure Data Studio. When SqlInstance is provided, connects to that Central Management Server to retrieve its registered server inventory. This is essential for discovering what SQL Server instances are documented and organized in your environment.  
  
Local Registered Servers and Azure Data Studio support alternative authentication (excluding MFA) but Central Management Server does not.

## Syntax

```powershell
Get-DbaRegServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-ServerName] <String[]>]
    [[-Group] <String[]>]
    [[-ExcludeGroup] <String[]>]
    [[-Id] <Int32[]>]
    [-IncludeSelf]
    [-ResolveNetworkName]
    [-IncludeLocal]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRegServer
```

Gets a list of servers from the local registered servers and azure data studio<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a
```

Gets a list of servers from the CMS on sqlserver2014a, using Windows Credentials.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -IncludeSelf
```

Gets a list of servers from the CMS on sqlserver2014a and includes sqlserver2014a in the output results.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -SqlCredential $credential | Select-Object -Unique -ExpandProperty ServerName
```

Returns only the server names from the CMS on sqlserver2014a, using SQL Authentication to authenticate to the server.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -Group HR, Accounting
```

Gets a list of servers in the HR and Accounting groups from the CMS on sqlserver2014a.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -Group HR\Development
```

Returns a list of servers in the HR and sub-group Development from the CMS on sqlserver2014a.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | (Get-DbatoolsConfigValue -FullName 'commands.get-dbaregserver.defaultcms') |

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

Filters results to registered servers with specific display names as they appear in SSMS Registered Servers pane.  
Use this when you need to find servers by their friendly names rather than actual server names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerName

Filters results to registered servers with specific server instance names (the actual SQL Server connection strings).  
Use this when you need to find servers by their network names or instance names rather than display names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Group

Filters results to registered servers within specific Central Management Server groups.  
Supports hierarchical paths using backslash notation (e.g., "Production\Database Servers"). Use this to target servers organized by environment, department, or function.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeGroup

Excludes registered servers from specific Central Management Server groups.  
Use this when you want to retrieve most servers but skip certain groups like "Test" or "Decommissioned" environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Id

Filters results to registered servers with specific internal ID numbers.  
Use this when you need to retrieve specific servers by their unique identifiers, typically when working with programmatic scripts or automation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSelf

Includes the Central Management Server instance itself in the results along with all registered servers.  
Use this when you need to perform operations on both the CMS and its registered servers in the same workflow.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ResolveNetworkName

Performs DNS lookups to return NetBIOS names, FQDN, and IP addresses for each registered server.  
Use this when you need network information for servers, but be aware this adds processing time due to DNS queries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeLocal

Includes local SSMS and Azure Data Studio registered servers in addition to Central Management Server results.  
Use this when querying a CMS but also want to see servers registered locally on your workstation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'commands.get-dbaregserver.includelocal') |

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
