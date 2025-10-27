---
title: "Copy-DbaRegServer"
slug: "Copy-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies Central Management Server groups and registered server instances between SQL Server instances."
tags:
  - "Migration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaRegServer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaRegServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaRegServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies Central Management Server groups and registered server instances between SQL Server instances.

## Description

Migrates registered servers and server groups from a source Central Management Server to a destination CMS, preserving the hierarchical structure of groups and subgroups. This eliminates the need to manually recreate complex server organization structures when setting up new environments or consolidating server management. The function handles conflicts by either skipping existing items or dropping and recreating them when Force is specified.

## Syntax

```powershell
Copy-DbaRegServer
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Group] <String[]>]
    [-SwitchServerName]
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
PS C:\> Copy-DbaRegServer -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaRegServer -Source sqlserver2014a -Destination sqlcluster" }

All groups, subgroups, and server instances are copied from sqlserver2014a CMS to sqlcluster CMS.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaRegServer -Source sqlserver2014a -Destination sqlcluster -Group Group1,Group3
```
{: data-copyable="true" data-clean-code="Copy-DbaRegServer -Source sqlserver2014a -Destination sqlcluster -Group Group1,Group3" }

Top-level groups Group1 and Group3 along with their subgroups and server instances are copied from sqlserver to sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaRegServer -Source sqlserver2014a -Destination sqlcluster -Group Group1,Group3 -SwitchServerName -SourceSqlCredential $SourceSqlCredential -DestinationSqlCredential
```
{: data-copyable="true" data-clean-code="Copy-DbaRegServer -Source sqlserver2014a -Destination sqlcluster -Group Group1,Group3 -SwitchServerName -SourceSqlCredential $SourceSqlCredential -DestinationSqlCredential" }

$DestinationSqlCredential<br>
Top-level groups Group1 and Group3 along with their subgroups and server instances are copied from sqlserver to sqlcluster. When adding sql instances to sqlcluster, if the server name of the <br>
migrating instance is "sqlcluster", it will be switched to "sqlserver".<br>
If SwitchServerName is not specified, "sqlcluster" will be skipped.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the Central Management Server to copy from. You must have sysadmin access and server version must be SQL Server version 2000 or higher.  
This is where your existing CMS groups and registered servers are currently stored.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server instance where CMS groups and registered servers will be copied to. You must have sysadmin access and the server must be SQL Server 2000 or higher.  
This instance will become the new Central Management Server containing the migrated server registrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance when Windows Authentication is not available. Accepts PowerShell credentials (Get-Credential).  
Use this when the source server requires SQL Authentication or different Windows credentials than your current session.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance when Windows Authentication is not available. Accepts PowerShell credentials (Get-Credential).  
Use this when the destination server requires SQL Authentication or different Windows credentials than your current session.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Group

Specifies which top-level CMS groups to copy from the source server. Accepts one or more group names as an array.  
When omitted, all groups and their registered servers are copied. Use this to selectively migrate specific environments like 'Production' or 'Development' groups.

| Property | Value |
| --- | --- |
| Alias | CMSGroup |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SwitchServerName

Replaces source server name references with the destination server name during migration.  
Use this when the source CMS server itself is registered within the groups and you want it renamed to the destination server name. Prevents conflicts since CMS cannot register itself as a managed   
server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates existing groups and registered servers at the destination instead of skipping them.  
Use this to overwrite conflicting CMS configurations when consolidating multiple Central Management Servers or updating existing registrations.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
