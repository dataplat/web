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

# Copy-DbaResourceGovernor

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaResourceGovernor](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaResourceGovernor.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaResourceGovernor](https://dataplat.github.io/boh#Copy-DbaResourceGovernor).

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

Copies all all non-system resource pools from sqlserver2014a to sqlcluster using Windows credentials to connect to the SQL Server instances..<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaResourceGovernor -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```

Copies all all non-system resource pools from sqlserver2014a to sqlcluster using SQL credentials to connect to sqlserver2014a and Windows credentials to connect to sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaResourceGovernor -Source sqlserver2014a -Destination sqlcluster -WhatIf
```

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
