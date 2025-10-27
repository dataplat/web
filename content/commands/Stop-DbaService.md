---
title: "Stop-DbaService"
slug: "Stop-DbaService"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar)"
availability: "Windows, Linux, macOS"
synopsis: "Stops SQL Server-related Windows services with proper dependency handling."
tags:
  - "Service"
  - "Stop"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaService.ps1"
bohUrl: "https://dataplat.github.io/boh#Stop-DbaService"
draft: false
---

# Stop-DbaService

| Property | Value |
| --- | --- |
| **Author** | Kirill Kravtsov (@nvarscar) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Stop-DbaService](https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaService.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Stop-DbaService](https://dataplat.github.io/boh#Stop-DbaService).

## Synopsis

Stops SQL Server-related Windows services with proper dependency handling.

## Description

Stops SQL Server services including Database Engine, SQL Agent, Reporting Services, Analysis Services, Integration Services, and other components across one or more computers. Automatically handles service dependencies to prevent dependency conflicts during shutdown operations.  
  
Particularly useful for planned maintenance windows, troubleshooting service issues, or preparing servers for patching and reboots. The Force parameter allows stopping dependent services automatically, which is essential when stopping Database Engine services that have SQL Agent dependencies.  
  
Supports targeting specific service types or instances, making it ideal for selective service management in multi-instance environments. Can be combined with Get-DbaService for advanced filtering and bulk operations across entire SQL Server environments.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Stop-DbaService
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

Stop-DbaService
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
PS C:\> Stop-DbaService -ComputerName sqlserver2014a
```

Stops the SQL Server related services on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3'| Get-DbaService | Stop-DbaService
```

Gets the SQL Server related services on computers sql1, sql2 and sql3 and stops them.<br>

#####  Example:  3 

```powershell
PS C:\> Stop-DbaService -ComputerName sql1,sql2 -Instance MSSQLSERVER
```

Stops the SQL Server services related to the default instance MSSQLSERVER on computers sql1 and sql2.<br>

#####  Example:  4 

```powershell
PS C:\> Stop-DbaService -ComputerName $MyServers -Type SSRS
```

Stops the SQL Server related services of type "SSRS" (Reporting Services) on computers in the variable MyServers.<br>

#####  Example:  5 

```powershell
PS C:\> Stop-DbaService -ComputerName sql1 -Type Engine -Force
```

Stops SQL Server database engine services on sql1 forcing dependent SQL Server Agent services to stop as well.<br>

### Required Parameters

##### -InputObject

Accepts service objects directly from Get-DbaService, allowing for advanced filtering and pipeline operations.  
Use this approach when you need complex service filtering that goes beyond the built-in ComputerName, InstanceName, and Type parameters.

| Property | Value |
| --- | --- |
| Alias | ServiceCollection |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) containing SQL Server services to stop. Accepts multiple computer names for bulk service management.  
Use this when you need to stop SQL Server services across multiple servers during maintenance windows or troubleshooting scenarios.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -InstanceName

Targets services belonging to specific SQL Server named instances. Filters results to match only the specified instance names.  
Essential in multi-instance environments where you need to stop services for particular instances while leaving others running.

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

Filters which SQL Server service types to stop. Valid options: Agent, Browser, Engine, FullText, SSAS, SSIS, SSRS.  
Use this when you need to stop specific service types across instances, such as stopping all SQL Agent services for patching while keeping Database Engine services running.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Agent,Browser,Engine,FullText,SSAS,SSIS,SSRS |

##### -Timeout

Sets the maximum wait time in seconds for each service stop operation before timing out. Default is 60 seconds, specify 0 to wait indefinitely.  
Increase this value for services that take longer to shut down gracefully, particularly in environments with large databases or heavy workloads.

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

Automatically stops dependent services when stopping SQL Server Database Engine services. Prevents dependency conflicts that would otherwise block the stop operation.  
Required when stopping Engine services that have dependent SQL Agent services running, as SQL Agent must be stopped first to avoid service dependency errors.

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
