---
title: "Move-DbaRegServer"
slug: "Move-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Moves registered servers between groups within SQL Server Central Management Server (CMS)"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Move-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Move-DbaRegServer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Move-DbaRegServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Move-DbaRegServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Moves registered servers between groups within SQL Server Central Management Server (CMS)

## Description

Moves registered server entries from one group to another within Central Management Server hierarchy. This helps reorganize CMS structure when server roles change or you need to restructure your server groupings for better management. The function updates the CMS database to reflect the new group membership while preserving all server connection details and properties.

## Syntax

```powershell
Move-DbaRegServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-ServerName] <String[]>]
    [[-Group] <String>]
    [[-InputObject] <RegisteredServer[]>]
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
PS C:\> Move-DbaRegServer -SqlInstance sql2012 -Name 'Web SQL Cluster' -Group HR\Prod
```
{: data-copyable="true" data-clean-code="Move-DbaRegServer -SqlInstance sql2012 -Name 'Web SQL Cluster' -Group HR\Prod" }

Moves the registered server on sql2012 titled 'Web SQL Cluster' to the Prod group within the HR group<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2017 -Name 'Web SQL Cluster' | Move-DbaRegServer -Group Web
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sql2017 -Name 'Web SQL Cluster' | Move-DbaRegServer -Group Web" }

Moves the registered server 'Web SQL Cluster' on sql2017 to the Web group, also on sql2017<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Name

Specifies one or more registered servers to move by their display name as shown in SSMS CMS interface. This is the friendly name you see in the registered servers tree, which may differ from the   
actual server instance name.  
Use this when you know the descriptive name assigned to servers in CMS but not necessarily their technical instance names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerName

Specifies one or more registered servers to move by their actual SQL Server instance name. This is the technical server\instance connection string used to connect to SQL Server.  
Use this when you need to target servers by their network instance names rather than their CMS display names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Group

Specifies the destination group where the registered servers will be moved. Use backslash notation for nested groups like 'Production\WebServers'.  
If not specified, servers are moved to the root level of the CMS hierarchy. The target group must already exist in CMS.

| Property | Value |
| --- | --- |
| Alias | NewGroup |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts registered server objects from the pipeline, typically from Get-DbaRegServer output. This allows you to filter servers first and then move the results.  
Use this approach when you need complex filtering or when working with servers from multiple CMS instances.

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
