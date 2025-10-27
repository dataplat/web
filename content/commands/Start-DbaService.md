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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Start-DbaService</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Start-DbaService.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Start-DbaService -ComputerName sqlserver2014a" }

Starts the SQL Server related services on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3'| Get-DbaService | Start-DbaService
```
{: data-copyable="true" data-clean-code="'sql1','sql2','sql3'| Get-DbaService | Start-DbaService" }

Gets the SQL Server related services on computers sql1, sql2 and sql3 and starts them.<br>

#####  Example:  3 

```powershell
PS C:\> Start-DbaService -ComputerName sql1,sql2 -Instance MSSQLSERVER
```
{: data-copyable="true" data-clean-code="Start-DbaService -ComputerName sql1,sql2 -Instance MSSQLSERVER" }

Starts the SQL Server services related to the default instance MSSQLSERVER on computers sql1 and sql2.<br>

#####  Example:  4 

```powershell
PS C:\> Start-DbaService -ComputerName $MyServers -Type SSRS
```
{: data-copyable="true" data-clean-code="Start-DbaService -ComputerName $MyServers -Type SSRS" }

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
