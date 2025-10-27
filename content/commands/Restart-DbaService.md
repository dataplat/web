---
title: "Restart-DbaService"
slug: "Restart-DbaService"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar)"
availability: "Windows, Linux, macOS"
synopsis: "Restarts SQL Server services with proper dependency handling and service ordering."
tags:
  - "Service"
  - "Instance"
  - "Restart"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Restart-DbaService.ps1"
bohUrl: "https://dataplat.github.io/boh#Restart-DbaService"
draft: false
---

# Restart-DbaService

| Property | Value |
| --- | --- |
| **Author** | Kirill Kravtsov (@nvarscar) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Restart-DbaService](https://github.com/dataplat/dbatools/blob/master/public/Restart-DbaService.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Restart-DbaService](https://dataplat.github.io/boh#Restart-DbaService).

## Synopsis

Restarts SQL Server services with proper dependency handling and service ordering.

## Description

Restarts SQL Server services across multiple computers while automatically managing service dependencies and restart order. This function performs a controlled stop-then-restart sequence, ensuring that dependent services like SQL Agent are properly handled when restarting the Database Engine. You can target specific service types (Engine, Agent, SSRS, SSAS, etc.) or restart all SQL Server services on a system, making it ideal for maintenance windows or applying configuration changes that require service restarts.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Restart-DbaService
    [[-ComputerName] <DbaInstanceParameter[]>]
    [-InstanceName <String[]>]
    [-SqlInstance <DbaInstanceParameter[]>]
    [-Type <String[]>]
    [-Timeout <Int32>]
    [-Credential <PSCredential>]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Restart-DbaService
    [-InstanceName <String[]>]
    [-Type <String[]>]
    -InputObject <Object[]>
    [-Timeout <Int32>]
    [-Credential <PSCredential>]
    [-Force]
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
PS C:\> Restart-DbaService -ComputerName sqlserver2014a
```

Restarts the SQL Server related services on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3'| Get-DbaService | Restart-DbaService
```

Gets the SQL Server related services on computers sql1, sql2 and sql3 and restarts them.<br>

#####  Example:  3 

```powershell
PS C:\> Restart-DbaService -ComputerName sql1,sql2 -InstanceName MSSQLSERVER
```

Restarts the SQL Server services related to the default instance MSSQLSERVER on computers sql1 and sql2.<br>

#####  Example:  4 

```powershell
PS C:\> Restart-DbaService -ComputerName $MyServers -Type SSRS
```

Restarts the SQL Server related services of type "SSRS" (Reporting Services) on computers in the variable MyServers.<br>

#####  Example:  5 

```powershell
PS C:\> Restart-DbaService -ComputerName sql1 -Type Engine -Force
```

Restarts SQL Server database engine services on sql1 forcing dependent SQL Server Agent services to restart as well.<br>

### Required Parameters

##### -InputObject

Accepts service objects from Get-DbaService to restart specific services that have already been filtered or identified.  
Use this when you need to restart a predefined set of services, typically by piping results from Get-DbaService with custom filtering or from previously saved service collections.

| Property | Value |
| --- | --- |
| Alias | ServiceCollection |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the computer names where SQL Server services will be restarted. Accepts multiple computer names for batch operations.  
Use this when you need to restart services across multiple SQL Server hosts during maintenance windows or after configuration changes.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -InstanceName

Restricts the restart operation to services belonging to specific SQL Server instances (like MSSQLSERVER, SQLEXPRESS, or named instances).  
Use this when you have multiple instances on a server but only need to restart services for specific instances, avoiding unnecessary downtime for other instances.

| Property | Value |
| --- | --- |
| Alias | Instance |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlInstance

Use a combination of computername and instancename to get the SQL Server related services for specific instances on specific computers.  
Parameters ComputerName and InstanceName will be ignored if SqlInstance is used.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies which SQL Server service types to restart: Agent, Browser, Engine, FullText, SSAS, SSIS, SSRS, PolyBase, or Launchpad.  
Use this when you need to restart only specific services rather than all SQL Server services, such as restarting just SQL Agent after job configuration changes or only SSRS after report deployment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Agent,Browser,Engine,FullText,SSAS,SSIS,SSRS,PolyBase,Launchpad |

##### -Timeout

Sets the maximum time in seconds to wait for each service stop/start operation to complete before timing out. Defaults to 60 seconds.  
Increase this value for busy systems or when restarting services with large databases that may take longer to shut down gracefully. Set to 0 for infinite wait.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 60 |

##### -Credential

Credential object used to connect to the computer as a different user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Automatically includes dependent services (SQL Agent, PolyBase, Launchpad) when restarting Database Engine services to ensure proper shutdown sequence.  
Use this when restarting Engine services to avoid dependency conflicts and ensure all related services restart cleanly, particularly important during major configuration changes or patches.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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

Shows what would happen if the cmdlet runs. The cmdlet is not run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before running the cmdlet.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
