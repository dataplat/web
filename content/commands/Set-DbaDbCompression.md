---
title: "Set-DbaDbCompression"
slug: "Set-DbaDbCompression"
date: 2024-01-01
layout: "single"
author: "Jason Squires (@js_0505), jstexasdba@gmail.com"
availability: "Windows, Linux, macOS"
synopsis: "Applies data compression to SQL Server tables and indexes to reduce storage space and improve performance."
tags:
  - "Compression"
  - "Table"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbCompression.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbCompression"
draft: false
---

# Set-DbaDbCompression

| Property | Value |
| --- | --- |
| **Author** | Jason Squires (@js_0505), jstexasdba@gmail.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbCompression](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbCompression.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbCompression](https://dataplat.github.io/boh#Set-DbaDbCompression).

## Synopsis

Applies data compression to SQL Server tables and indexes to reduce storage space and improve performance.

## Description

Compresses tables, indexes, and heaps across one or more databases using Row, Page, or intelligent recommendations based on Microsoft's Tiger Team compression analysis. Automatically handles the complex process of analyzing usage patterns, applying appropriate compression types, and rebuilding objects online when possible. Saves significant storage space, reduces backup sizes, and improves I/O performance without requiring manual compression analysis for each object. Particularly valuable for large production databases where storage costs and backup windows are concerns.

## Syntax

```powershell
Set-DbaDbCompression
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Table] <String[]>]
    [[-CompressionType] <String>]
    [[-MaxRunTime] <Int32>]
    [[-PercentCompression] <Int32>]
    [-ForceOfflineRebuilds]
    [[-InputObject] <Object>]
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
PS C:\> Set-DbaDbCompression -SqlInstance localhost -MaxRunTime 60 -PercentCompression 25
```

Set the compression run time to 60 minutes and will start the compression of tables/indexes that have a difference of 25% or higher between current and recommended.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbCompression -SqlInstance ServerA -Database DBName -CompressionType Page -Table table1, table2
```

Utilizes Page compression for tables table1 and table2 in DBName on ServerA with no time limit.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaDbCompression -SqlInstance ServerA -Database DBName -PercentCompression 25 | Out-GridView
```

Will compress tables/indexes within the specified database that would show any % improvement with compression and with no time limit. The results will be piped into a nicely formatted GridView.<br>

#####  Example:  4 

```powershell
PS C:\> $testCompression = Test-DbaDbCompression -SqlInstance ServerA -Database DBName
PS C:\> Set-DbaDbCompression -SqlInstance ServerA -Database DBName -InputObject $testCompression
```

Gets the compression suggestions from Test-DbaDbCompression into a variable, this can then be reviewed and passed into Set-DbaDbCompression.<br>

#####  Example:  5 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Set-DbaDbCompression -SqlInstance ServerA -ExcludeDatabase Database -SqlCredential $cred -MaxRunTime 60 -PercentCompression 25
```

Set the compression run time to 60 minutes and will start the compression of tables/indexes for all databases except the specified excluded database. Only objects that have a difference of 25% or <br>
higher between current and recommended will be compressed.<br>

#####  Example:  6 

```powershell
PS C:\> $servers = 'Server1','Server2'
PS C:\> foreach ($svr in $servers) {
>> Set-DbaDbCompression -SqlInstance $svr -MaxRunTime 60 -PercentCompression 25 | Export-Csv -Path C:\temp\CompressionAnalysisPAC.csv -Append
>> }
```

Set the compression run time to 60 minutes and will start the compression of tables/indexes across all listed servers that have a difference of 25% or higher between current and recommended. Output <br>
of command is exported to a csv.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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

Specifies which databases to apply compression to. Accepts wildcard patterns and multiple database names.  
When omitted, all non-system databases on the instance will be processed. Use this to target specific databases when you don't want to compress everything.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the compression operation. Accepts wildcard patterns and multiple database names.  
Use this when you want to compress most databases but exclude specific ones like databases under maintenance or with special requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies which tables to compress within the selected databases. Accepts multiple table names and works with wildcard patterns.  
When omitted, all eligible tables in the database will be processed. Use this to target specific large tables or avoid compressing certain tables.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CompressionType

Specifies the type of compression to apply: Recommended, Page, Row, or None. Default is 'Recommended' which analyzes each object and applies the optimal compression type.  
Use 'Page' or 'Row' to force all objects to the same compression level, or 'None' to remove compression. Recommended is best for mixed workloads where different objects benefit from different   
compression types.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Recommended |
| Accepted Values | Recommended,Page,Row,None |

##### -MaxRunTime

Sets a time limit in minutes for the compression operation to prevent it from running indefinitely. When the time limit is reached, the function stops processing additional objects.  
Use this during business hours to ensure the operation completes within a maintenance window. A value of 0 (default) means no time limit.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -PercentCompression

Sets the minimum space savings threshold (as a percentage) required before an object will be compressed. Only objects that would achieve this level of savings or higher are processed.  
Use this to focus compression efforts on objects that will provide the most benefit. For example, setting this to 25 will only compress objects that would save at least 25% of their current space.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -ForceOfflineRebuilds

Forces compression operations to use offline rebuilds instead of the default online rebuilds when possible. Online rebuilds keep tables accessible during compression but use more resources.  
Use this switch when you need to minimize resource usage during compression or when experiencing issues with online operations. Offline rebuilds will make tables unavailable during the compression   
process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts compression recommendations from Test-DbaDbCompression and applies those specific recommendations instead of running a new analysis.  
Use this when you want to review compression recommendations first, then apply only the ones you approve of. This approach gives you more control over which objects get compressed.

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
