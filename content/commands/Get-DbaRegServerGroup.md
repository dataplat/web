---
title: "Get-DbaRegServerGroup"
slug: "Get-DbaRegServerGroup"
date: 2024-01-01
layout: "single"
author: "Tony Wilhelm (@tonywsql)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves server group objects from SQL Server Central Management Server (CMS) for organized server management."
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegServerGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRegServerGroup"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaRegServerGroup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegServerGroup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Tony Wilhelm (@tonywsql)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves server group objects from SQL Server Central Management Server (CMS) for organized server management.

## Description

Returns server group objects from Central Management Server, which are organizational containers that help DBAs manage multiple SQL Server instances in a hierarchical structure. Server groups allow you to categorize registered servers by environment, function, or any logical grouping that makes sense for your infrastructure.  
  
This function is essential for inventory management and automated administration across multiple SQL Server instances. Use it to discover existing server groups before adding new registered servers, or to build dynamic server lists for bulk operations based on your organizational structure.  
  
The function supports targeting specific groups by name or path (including nested subgroups), excluding certain groups from results, or filtering by group ID. You can work with both local CMS stores and remote Central Management Server instances.

## Syntax

```powershell
Get-DbaRegServerGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Group] <Object[]>]
    [[-ExcludeGroup] <Object[]>]
    [[-Id] <Int32[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sqlserver2014a
```
{: data-copyable="true" data-clean-code="Get-DbaRegServerGroup -SqlInstance sqlserver2014a" }

Gets the top level groups from the CMS on sqlserver2014a, using Windows Credentials.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sqlserver2014a -SqlCredential $credential
```
{: data-copyable="true" data-clean-code="Get-DbaRegServerGroup -SqlInstance sqlserver2014a -SqlCredential $credential" }

Gets the top level groups from the CMS on sqlserver2014a, using alternative credentials to authenticate to the server.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sqlserver2014a -Group HR, Accounting
```
{: data-copyable="true" data-clean-code="Get-DbaRegServerGroup -SqlInstance sqlserver2014a -Group HR, Accounting" }

Gets the HR and Accounting groups from the CMS on sqlserver2014a.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sqlserver2014a -Group HR\Development
```
{: data-copyable="true" data-clean-code="Get-DbaRegServerGroup -SqlInstance sqlserver2014a -Group HR\Development" }

Returns the sub-group Development of the HR group from the CMS on sqlserver2014a.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -Group

Specifies one or more server group names to retrieve from Central Management Server. Supports hierarchical paths using backslash notation (e.g., 'Production\WebServers').  
Use this when you need specific organizational groups rather than all groups, or when working with nested subgroups within your CMS structure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeGroup

Specifies one or more server group names to exclude from the results. Accepts the same hierarchical path format as the Group parameter.  
Use this when you want all groups except certain ones, such as excluding test environments from production operations or removing deprecated groups from inventory reports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Id

Retrieves server groups by their numeric identifier. Note that Id 1 always represents the root DatabaseEngineServerGroup, and this parameter only works for groups that contain registered servers.  
Use this when you need to target groups programmatically using their internal CMS identifiers, typically in automated scripts that reference groups by ID rather than name.

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


&nbsp;
