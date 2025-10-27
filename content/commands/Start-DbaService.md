---
title: "Start-DbaService"
slug: "Start-DbaService"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar)"
availability: "Windows, Linux, macOS"
synopsis: "Starts SQL Server related services across multiple computers while respecting service dependencies."
tags:
  - "Service"
  - "SqlServer"
  - "Instance"
  - "Connect"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Start-DbaService.ps1"
bohUrl: "https://dataplat.github.io/boh#Start-DbaService"
draft: false
---

# Start-DbaService

| Property | Value |
| --- | --- |
| **Author** | Kirill Kravtsov (@nvarscar) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Start-DbaService](https://github.com/dataplat/dbatools/blob/master/public/Start-DbaService.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Start-DbaService](https://dataplat.github.io/boh#Start-DbaService).

## Synopsis

Starts SQL Server related services across multiple computers while respecting service dependencies.

## Description

Starts SQL Server services (Engine, Agent, Browser, FullText, SSAS, SSIS, SSRS) on one or more computers following proper dependency order. This function handles the complexity of starting services in the correct sequence so you don't have to manually determine which services depend on others. Commonly used after maintenance windows, server reboots, or when troubleshooting stopped services across an environment.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Start-DbaService
    [[-ComputerName] <DbaInstanceParameter[]>]
    [-InstanceName <String[]>]
    [-SqlInstance <DbaInstanceParameter[]>]
    [-Type <String[]>]
    [-Timeout <Int32>]
    [-Credential <PSCredential>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Start-DbaService
    [-InstanceName <String[]>]
    [-Type <String[]>]
    -InputObject <Object[]>
    [-Timeout <Int32>]
    [-Credential <PSCredential>]
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
PS C:\> Start-DbaService -ComputerName sqlserver2014a
```

Starts the SQL Server related services on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3'| Get-DbaService | Start-DbaService
```

Gets the SQL Server related services on computers sql1, sql2 and sql3 and starts them.<br>

#####  Example:  3 

```powershell
PS C:\> Start-DbaService -ComputerName sql1,sql2 -Instance MSSQLSERVER
```

Starts the SQL Server services related to the default instance MSSQLSERVER on computers sql1 and sql2.<br>

#####  Example:  4 

```powershell
PS C:\> Start-DbaService -ComputerName $MyServers -Type SSRS
```

Starts the SQL Server related services of type "SSRS" (Reporting Services) on computers in the variable MyServers.<br>

### Required Parameters

##### -InputObject

Accepts service objects from Get-DbaService through the pipeline for targeted service operations.  
Use this when you need fine-grained control over which specific services to start, such as when Get-DbaService has filtered to stopped services only.

| Property | Value |
| --- | --- |
| Alias | ServiceCollection |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the computer names where SQL Server services should be started. Accepts multiple computer names for bulk operations.  
Use this when you need to start services across multiple servers simultaneously, such as after a maintenance window or environment-wide restart.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -InstanceName

Filters services to only those belonging to specific named instances. Does not affect default instance (MSSQLSERVER) services.  
Use this when you have multiple instances on the same server and only want to start services for specific named instances like SQL2019 or REPORTING.

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

Filters to specific SQL Server service types rather than starting all services. Valid types: Agent, Browser, Engine, FullText, SSAS, SSIS, SSRS.  
Use this when you need to start only specific service types, such as starting just SQL Agent after maintenance or only SSRS services on reporting servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Agent,Browser,Engine,FullText,SSAS,SSIS,SSRS |

##### -Timeout

Sets the maximum time in seconds to wait for each service to start before moving to the next service. Defaults to 60 seconds.  
Increase this value for slow-starting services or when starting services on heavily loaded servers. Set to 0 to wait indefinitely.

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
