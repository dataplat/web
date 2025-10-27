---
title: "Copy-DbaResourceGovernor"
slug: "Copy-DbaResourceGovernor"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Server Resource Governor configuration including pools, workload groups, and classifier functions between instances"
tags:
  - "Migration"
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaResourceGovernor.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaResourceGovernor"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaResourceGovernor</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaResourceGovernor.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies SQL Server Resource Governor configuration including pools, workload groups, and classifier functions between instances

## Description

Migrates your entire SQL Server Resource Governor setup from one instance to another, including custom resource pools, workload groups, and classifier functions. This saves you from manually recreating complex Resource Governor configurations when setting up new servers or during migrations.  
  
The function copies all non-system resource pools (excludes the built-in "internal" and "default" pools) along with their associated workload groups and settings. It also migrates any custom classifier function you've configured to automatically assign incoming requests to appropriate resource pools.  
  
If a resource pool already exists on the destination server, it will be skipped unless you use -Force to overwrite it. Resource Governor will be properly reconfigured after the migration to ensure all changes take effect.  
  
Note that Resource Governor is only available in Enterprise, Datacenter, and Developer editions of SQL Server. The -ResourcePool parameter is auto-populated for command-line completion and can be used to copy only specific objects.

## Syntax

```powershell
Copy-DbaResourceGovernor
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-ResourcePool] <Object[]>]
    [[-ExcludeResourcePool] <Object[]>]
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
PS C:\> Copy-DbaResourceGovernor -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaResourceGovernor -Source sqlserver2014a -Destination sqlcluster" }

Copies all all non-system resource pools from sqlserver2014a to sqlcluster using Windows credentials to connect to the SQL Server instances..<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaResourceGovernor -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```
{: data-copyable="true" data-clean-code="Copy-DbaResourceGovernor -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred" }

Copies all all non-system resource pools from sqlserver2014a to sqlcluster using SQL credentials to connect to sqlserver2014a and Windows credentials to connect to sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaResourceGovernor -Source sqlserver2014a -Destination sqlcluster -WhatIf
```
{: data-copyable="true" data-clean-code="Copy-DbaResourceGovernor -Source sqlserver2014a -Destination sqlcluster -WhatIf" }

Shows what would happen if the command were executed.<br>

### Required Parameters

##### -Source

Specifies the source SQL Server instance containing the Resource Governor configuration to copy. Must have sysadmin privileges and be SQL Server 2008 or later.  
Use this to identify which server contains the Resource Governor setup you want to migrate to other instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Specifies the destination SQL Server instance(s) where the Resource Governor configuration will be copied. Accepts multiple instances and requires sysadmin privileges on each.  
Use this to define which servers should receive the migrated Resource Governor pools, workload groups, and classifier functions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Provides alternative credentials for connecting to the source SQL Server instance. Accepts PowerShell credential objects from Get-Credential.  
Use this when your current Windows credentials don't have access to the source server or when you need to use SQL Server authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Provides alternative credentials for connecting to the destination SQL Server instance(s). Accepts PowerShell credential objects from Get-Credential.  
Use this when your current Windows credentials don't have access to the destination servers or when you need to use SQL Server authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ResourcePool

Specifies which resource pools to copy by name. Supports tab completion with pools from the source server and accepts multiple pool names.  
Use this when you only want to migrate specific resource pools rather than the entire Resource Governor configuration. Excludes system pools (internal, default) automatically.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeResourcePool

Specifies which resource pools to skip during the copy operation. Supports tab completion and accepts multiple pool names.  
Use this when you want to migrate most of your Resource Governor configuration but exclude certain pools that shouldn't be copied to the destination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops and recreates existing resource pools, workload groups, and classifier functions on the destination server.  
Use this when you need to overwrite existing Resource Governor objects that would otherwise be skipped due to name conflicts.

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
