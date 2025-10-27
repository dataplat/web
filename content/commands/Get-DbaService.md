---
title: "Get-DbaService"
slug: "Get-DbaService"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server-related Windows services from local or remote computers."
tags:
  - "Service"
  - "SqlServer"
  - "Instance"
  - "Connect"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaService.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaService"
draft: false
---

# Get-DbaService

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaService](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaService.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaService](https://dataplat.github.io/boh#Get-DbaService).

## Synopsis

Retrieves SQL Server-related Windows services from local or remote computers.

## Description

Retrieves detailed information about SQL Server-related Windows services across one or more computers, including Database Engine, SQL Agent, Reporting Services, Analysis Services, Integration Services, and other SQL Server components. This function replaces manual service management tasks by providing a unified view of service status, startup modes, and service accounts across your SQL Server environment.  
  
Particularly useful for inventory management, troubleshooting service issues, and performing bulk service operations across multiple servers. The function can filter by service type, instance name, or specific service names, and optionally includes advanced properties like SQL Server version and service pack levels.  
  
Returns service objects with built-in methods for common operations like Start(), Stop(), Restart(), and ChangeStartMode(), eliminating the need to use separate service management commands.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Get-DbaService
    [[-ComputerName] <DbaInstanceParameter[]>]
    [-InstanceName <String[]>]
    [-SqlInstance <DbaInstanceParameter[]>]
    [-Credential <PSCredential>]
    [-Type <String[]>]
    [-AdvancedProperties]
    [-EnableException]
    [<CommonParameters>]

Get-DbaService
    [[-ComputerName] <DbaInstanceParameter[]>]
    [-Credential <PSCredential>]
    [-ServiceName <String[]>]
    [-AdvancedProperties]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaService -ComputerName sqlserver2014a
```

Gets the SQL Server related services on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Get-DbaService -AdvancedProperties
```

Gets the SQL Server related services on computers sql1, sql2 and sql3. Includes Advanced Properties from the SqlServiceAdvancedProperty Namespace<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential WindowsUser
PS C:\> Get-DbaService -ComputerName sql1,sql2 -Credential $cred  | Out-GridView
```

Gets the SQL Server related services on computers sql1 and sql2 via the user WindowsUser, and shows them in a grid view.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaService -ComputerName sql1,sql2 -InstanceName MSSQLSERVER
```

Gets the SQL Server related services related to the default instance MSSQLSERVER on computers sql1 and sql2.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaService -SqlInstance sql1, sql1\test, sql2\test
```

Gets the SQL Server related services related to the default instance MSSQLSERVER on computers sql1, the named instances test on sql1 and sql2.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaService -ComputerName $MyServers -Type SSRS
```

Gets the SQL Server related services of type "SSRS" (Reporting Services) on computers in the variable MyServers.<br>

#####  Example:  7 

```powershell
PS C:\> $MyServers =  Get-Content .\servers.txt
PS C:\> Get-DbaService -ComputerName $MyServers -ServiceName MSSQLSERVER,SQLSERVERAGENT
```

Gets the SQL Server related services with ServiceName MSSQLSERVER or SQLSERVERAGENT  for all the servers that are stored in the file. Every line in the file can only contain one hostname for a server.<br>

#####  Example:  8 

```powershell
PS C:\> $services = Get-DbaService -ComputerName sql1 -Type Agent,Engine
PS C:\> $services.ChangeStartMode('Manual')
```

Gets the SQL Server related services of types Sql Agent and DB Engine on computer sql1 and changes their startup mode to 'Manual'.<br>

#####  Example:  9 

```powershell
PS C:\> (Get-DbaService -ComputerName sql1 -Type Engine).Restart($true)
```

Calls a Restart method for each Engine service on computer sql1.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) to retrieve SQL Server services from. Accepts computer names, IP addresses, or FQDN.  
Use this when you need to check service status across multiple servers in your environment.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -InstanceName

Filters results to show only services belonging to the specified SQL Server instance names.  
Use this when you need to focus on specific instances rather than all SQL Server services on the target computers.

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

##### -Credential

Credential object used to connect to the computer as a different user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Filters results to specific SQL Server service types such as Database Engine, SQL Agent, or Reporting Services.  
Use this when troubleshooting specific service types or performing targeted service management operations. Can be one of the following: "Agent", "Browser", "Engine", "FullText", "SSAS", "SSIS",   
"SSRS", "PolyBase", "Launchpad"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Agent,Browser,Engine,FullText,SSAS,SSIS,SSRS,PolyBase,Launchpad |

##### -ServiceName

Specifies exact Windows service names to retrieve, bypassing automatic service discovery.  
Use this when you know the specific service names and want to avoid the overhead of scanning for all SQL Server services.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AdvancedProperties

Includes additional service properties such as SQL Server version, service pack level, SKU name, and cluster information.  
Use this when you need detailed service information for inventory, compliance, or troubleshooting purposes. Note that this adds processing time to the command.

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


&nbsp;
