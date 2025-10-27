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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaService</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaService.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDbaKlaas)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaService -ComputerName sqlserver2014a" }

Gets the SQL Server related services on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Get-DbaService -AdvancedProperties
```
{: data-copyable="true" data-clean-code="'sql1','sql2','sql3' | Get-DbaService -AdvancedProperties" }

Gets the SQL Server related services on computers sql1, sql2 and sql3. Includes Advanced Properties from the SqlServiceAdvancedProperty Namespace<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential WindowsUser
PS C:\> Get-DbaService -ComputerName sql1,sql2 -Credential $cred  | Out-GridView
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential WindowsUser
Get-DbaService -ComputerName sql1,sql2 -Credential $cred  | Out-GridView" }

Gets the SQL Server related services on computers sql1 and sql2 via the user WindowsUser, and shows them in a grid view.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaService -ComputerName sql1,sql2 -InstanceName MSSQLSERVER
```
{: data-copyable="true" data-clean-code="Get-DbaService -ComputerName sql1,sql2 -InstanceName MSSQLSERVER" }

Gets the SQL Server related services related to the default instance MSSQLSERVER on computers sql1 and sql2.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaService -SqlInstance sql1, sql1\test, sql2\test
```
{: data-copyable="true" data-clean-code="Get-DbaService -SqlInstance sql1, sql1\test, sql2\test" }

Gets the SQL Server related services related to the default instance MSSQLSERVER on computers sql1, the named instances test on sql1 and sql2.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaService -ComputerName $MyServers -Type SSRS
```
{: data-copyable="true" data-clean-code="Get-DbaService -ComputerName $MyServers -Type SSRS" }

Gets the SQL Server related services of type "SSRS" (Reporting Services) on computers in the variable MyServers.<br>

#####  Example:  7 

```powershell
PS C:\> $MyServers =  Get-Content .\servers.txt
PS C:\> Get-DbaService -ComputerName $MyServers -ServiceName MSSQLSERVER,SQLSERVERAGENT
```
{: data-copyable="true" data-clean-code="$MyServers =  Get-Content .\servers.txt
Get-DbaService -ComputerName $MyServers -ServiceName MSSQLSERVER,SQLSERVERAGENT" }

Gets the SQL Server related services with ServiceName MSSQLSERVER or SQLSERVERAGENT  for all the servers that are stored in the file. Every line in the file can only contain one hostname for a server.<br>

#####  Example:  8 

```powershell
PS C:\> $services = Get-DbaService -ComputerName sql1 -Type Agent,Engine
PS C:\> $services.ChangeStartMode('Manual')
```
{: data-copyable="true" data-clean-code="$services = Get-DbaService -ComputerName sql1 -Type Agent,Engine
$services.ChangeStartMode('Manual')" }

Gets the SQL Server related services of types Sql Agent and DB Engine on computer sql1 and changes their startup mode to 'Manual'.<br>

#####  Example:  9 

```powershell
PS C:\> (Get-DbaService -ComputerName sql1 -Type Engine).Restart($true)
```
{: data-copyable="true" data-clean-code="(Get-DbaService -ComputerName sql1 -Type Engine).Restart($true)" }

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
