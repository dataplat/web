---
title: "Set-DbaMaxDop"
slug: "Set-DbaMaxDop"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@claudioessilva)"
availability: "Windows, Linux, macOS"
synopsis: "Configures SQL Server maximum degree of parallelism (MaxDOP) at instance or database level"
tags:
  - "MaxDop"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaMaxDop.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaMaxDop"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaMaxDop</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaMaxDop.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Claudio Silva (@claudioessilva)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Configures SQL Server maximum degree of parallelism (MaxDOP) at instance or database level

## Description

Configures the max degree of parallelism setting to control how many processors SQL Server uses for parallel query execution. Without a specified value, the function automatically applies recommended settings based on your server's hardware configuration using Test-DbaMaxDop. This prevents performance issues caused by excessive parallelism on multi-core servers, especially in OLTP environments where parallel queries can create more overhead than benefit. For SQL Server 2016 and higher, you can set database-scoped MaxDOP configurations to fine-tune performance for specific workloads.

## Syntax

```powershell
Set-DbaMaxDop
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-MaxDop] <Int32>]
    [[-InputObject] <PSObject>]
    [-AllDatabases]
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
PS C:\> Set-DbaMaxDop -SqlInstance sql2008, sql2012
```
{: data-copyable="true" data-clean-code="Set-DbaMaxDop -SqlInstance sql2008, sql2012" }

Sets Max DOP to the recommended value for servers sql2008 and sql2012.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaMaxDop -SqlInstance sql2014 -MaxDop 4
```
{: data-copyable="true" data-clean-code="Set-DbaMaxDop -SqlInstance sql2014 -MaxDop 4" }

Sets Max DOP to 4 for server sql2014.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaMaxDop -SqlInstance sql2008 | Set-DbaMaxDop
```
{: data-copyable="true" data-clean-code="Test-DbaMaxDop -SqlInstance sql2008 | Set-DbaMaxDop" }

Gets the recommended Max DOP from Test-DbaMaxDop and applies it to to sql2008.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaMaxDop -SqlInstance sql2016 -Database db1
```
{: data-copyable="true" data-clean-code="Set-DbaMaxDop -SqlInstance sql2016 -Database db1" }

Set recommended Max DOP for database db1 on server sql2016.<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaMaxDop -SqlInstance sql2016 -AllDatabases
```
{: data-copyable="true" data-clean-code="Set-DbaMaxDop -SqlInstance sql2016 -AllDatabases" }

Set recommended Max DOP for all databases on server sql2016.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost.

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

##### -Database

Specifies which databases to configure with database-scoped MaxDOP settings. Only works on SQL Server 2016 and higher.  
Use this when you need different MaxDOP values for specific databases with unique workload characteristics.  
Cannot be combined with AllDatabases or ExcludeDatabase parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to skip when applying database-scoped MaxDOP settings. Only works on SQL Server 2016 and higher.  
Use this when you want to configure most databases but leave certain ones (like system databases) unchanged.  
Cannot be combined with Database or AllDatabases parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaxDop

Sets a specific MaxDOP value instead of using the recommended value from Test-DbaMaxDop.  
Use this when you have specific performance requirements or want to override the automatic recommendations.  
Common values are 1 (disable parallelism), 2-4 (typical OLTP), or higher values for data warehouse workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | -1 |

##### -InputObject

Accepts the output from Test-DbaMaxDop to avoid re-analyzing server hardware and current settings.  
Use this when you want to review the recommendations first or apply settings from a previously saved analysis.  
Can be piped directly from Test-DbaMaxDop for streamlined workflows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -AllDatabases

Applies database-scoped MaxDOP settings to all databases on the instance. Only works on SQL Server 2016 and higher.  
Use this when you want consistent MaxDOP values across all databases rather than relying on instance-level settings.  
Cannot be combined with Database or ExcludeDatabase parameters.

| Property | Value |
| --- | --- |
| Alias | All |
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
