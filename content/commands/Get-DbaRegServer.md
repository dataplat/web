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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaRegServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Bryan Hamby (@galador) , Chrissy LeMaire (@cl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaRegServer" }

Gets a list of servers from the local registered servers and azure data studio<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sqlserver2014a" }

Gets a list of servers from the CMS on sqlserver2014a, using Windows Credentials.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -IncludeSelf
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sqlserver2014a -IncludeSelf" }

Gets a list of servers from the CMS on sqlserver2014a and includes sqlserver2014a in the output results.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -SqlCredential $credential | Select-Object -Unique -ExpandProperty ServerName
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sqlserver2014a -SqlCredential $credential | Select-Object -Unique -ExpandProperty ServerName" }

Returns only the server names from the CMS on sqlserver2014a, using SQL Authentication to authenticate to the server.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -Group HR, Accounting
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sqlserver2014a -Group HR, Accounting" }

Gets a list of servers in the HR and Accounting groups from the CMS on sqlserver2014a.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a -Group HR\Development
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sqlserver2014a -Group HR\Development" }

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
