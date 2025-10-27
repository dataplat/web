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

# Set-DbaMaxDop

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@claudioessilva) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaMaxDop](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaMaxDop.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaMaxDop](https://dataplat.github.io/boh#Set-DbaMaxDop).

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

Sets Max DOP to the recommended value for servers sql2008 and sql2012.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaMaxDop -SqlInstance sql2014 -MaxDop 4
```

Sets Max DOP to 4 for server sql2014.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaMaxDop -SqlInstance sql2008 | Set-DbaMaxDop
```

Gets the recommended Max DOP from Test-DbaMaxDop and applies it to to sql2008.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaMaxDop -SqlInstance sql2016 -Database db1
```

Set recommended Max DOP for database db1 on server sql2016.<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaMaxDop -SqlInstance sql2016 -AllDatabases
```

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
