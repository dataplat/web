---
title: "Add-DbaRegServerGroup"
slug: "Add-DbaRegServerGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates organizational server groups within SQL Server Central Management Server (CMS)"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaRegServerGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaRegServerGroup"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaRegServerGroup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaRegServerGroup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates organizational server groups within SQL Server Central Management Server (CMS)

## Description

Creates new server groups in SQL Server Central Management Server to organize registered servers into logical hierarchies. This allows DBAs to group servers by environment, application, location, or any other classification system for easier management at scale. Supports nested group structures using backslash notation (Group\SubGroup) and automatically creates parent groups if they don't exist. If you need to import existing groups and servers from other sources, use Import-DbaRegServer instead.

## Syntax

```powershell
Add-DbaRegServerGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [-Name] <String>
    [[-Description] <String>]
    [[-Group] <String>]
    [[-InputObject] <ServerGroup[]>]
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
PS C:\> Add-DbaRegServerGroup -SqlInstance sql2012 -Name HR
```
{: data-copyable="true" data-clean-code="Add-DbaRegServerGroup -SqlInstance sql2012 -Name HR" }

Creates a registered server group called HR, in the root of sql2012's CMS<br>

#####  Example:  2 

```powershell
PS C:\> Add-DbaRegServerGroup -SqlInstance sql2012, sql2014 -Name sub-folder -Group HR
```
{: data-copyable="true" data-clean-code="Add-DbaRegServerGroup -SqlInstance sql2012, sql2014 -Name sub-folder -Group HR" }

Creates a registered server group on sql2012 and sql2014 called sub-folder within the HR group<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sql2012, sql2014 -Group HR | Add-DbaRegServerGroup -Name sub-folder
```
{: data-copyable="true" data-clean-code="Get-DbaRegServerGroup -SqlInstance sql2012, sql2014 -Group HR | Add-DbaRegServerGroup -Name sub-folder" }

Creates a registered server group on sql2012 and sql2014 called sub-folder within the HR group of each server<br>

### Required Parameters

##### -Name

Specifies the name for the new server group within Central Management Server. Use descriptive names that reflect your organizational structure like 'Production', 'Development', or 'HR-Databases'.  
Group names can include backslashes to create nested hierarchies (e.g., 'Production\WebServers' creates a WebServers subgroup under Production).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

##### -Description

Provides additional details about the server group's purpose or contents. Use this to document the group's role, maintenance schedules, or contact information.  
Helpful for team environments where multiple DBAs need to understand each group's function.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Group

Specifies the parent group where the new server group will be created. If omitted, creates the group at the root level of Central Management Server.  
Use backslash notation to specify nested paths like 'Production\WebServers' - this automatically creates any missing parent groups in the hierarchy.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts server group objects from Get-DbaRegServerGroup through the pipeline. Use this when you need to create subgroups within existing groups from multiple CMS instances.  
Enables bulk operations where you can pipe existing groups and create new subgroups within each one simultaneously.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
