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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Stop-DbaService</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaService.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Kirill Kravtsov (@nvarscar)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Stop-DbaService -ComputerName sqlserver2014a" }

Stops the SQL Server related services on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3'| Get-DbaService | Stop-DbaService
```
{: data-copyable="true" data-clean-code="'sql1','sql2','sql3'| Get-DbaService | Stop-DbaService" }

Gets the SQL Server related services on computers sql1, sql2 and sql3 and stops them.<br>

#####  Example:  3 

```powershell
PS C:\> Stop-DbaService -ComputerName sql1,sql2 -Instance MSSQLSERVER
```
{: data-copyable="true" data-clean-code="Stop-DbaService -ComputerName sql1,sql2 -Instance MSSQLSERVER" }

Stops the SQL Server services related to the default instance MSSQLSERVER on computers sql1 and sql2.<br>

#####  Example:  4 

```powershell
PS C:\> Stop-DbaService -ComputerName $MyServers -Type SSRS
```
{: data-copyable="true" data-clean-code="Stop-DbaService -ComputerName $MyServers -Type SSRS" }

Stops the SQL Server related services of type "SSRS" (Reporting Services) on computers in the variable MyServers.<br>

#####  Example:  5 

```powershell
PS C:\> Stop-DbaService -ComputerName sql1 -Type Engine -Force
```
{: data-copyable="true" data-clean-code="Stop-DbaService -ComputerName sql1 -Type Engine -Force" }

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
