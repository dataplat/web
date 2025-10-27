---
title: "Get-DbaDbccStatistic"
slug: "Get-DbaDbccStatistic"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves statistics information from tables and indexed views for query performance analysis"
tags:
  - "DBCC"
  - "Statistics"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccStatistic.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbccStatistic"
draft: false
---

# Get-DbaDbccStatistic

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbccStatistic](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccStatistic.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbccStatistic](https://dataplat.github.io/boh#Get-DbaDbccStatistic).

## Synopsis

Retrieves statistics information from tables and indexed views for query performance analysis

## Description

Executes DBCC SHOW_STATISTICS to extract detailed information about statistics objects, including distribution histograms, density vectors, and header information. This helps DBAs diagnose query performance issues when the optimizer makes poor execution plan choices due to outdated or skewed statistics. You can analyze specific statistics objects or scan all statistics across databases to identify when UPDATE STATISTICS should be run. Returns different data sets based on the selected option: StatHeader shows when statistics were last updated and row counts, DensityVector reveals data uniqueness patterns, Histogram displays value distribution across column ranges, and StatsStream provides the raw binary statistics data.

## Syntax

```powershell
Get-DbaDbccStatistic
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Object] <String>]
    [[-Target] <String>]
    [[-Option] <String>]
    [-NoInformationalMessages]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbccStatistic -SqlInstance SQLServer2017
```

Will run the statement SHOW_STATISTICS WITH STAT_HEADER against all Statistics on all User Tables or views for every accessible database on instance SQLServer2017. Connects using Windows <br>
Authentication.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbccStatistic -SqlInstance SQLServer2017 -Database MyDb -Option DensityVector
```

Will run the statement SHOW_STATISTICS WITH DENSITY_VECTOR against all Statistics on all User Tables or views for database MyDb on instance SQLServer2017. Connects using Windows Authentication.<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbccStatistic -SqlInstance SQLServer2017 -SqlCredential $cred -Database MyDb -Object UserTable -Option Histogram
```

Will run the statement SHOW_STATISTICS WITH HISTOGRAM against all Statistics on table UserTable for database MyDb on instance SQLServer2017. Connects using sqladmin credential.<br>

#####  Example:  4 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbccStatistic -SqlInstance SQLServer2017 -Database MyDb -Object 'dbo.UserTable' -Target MyStatistic -Option StatsStream
```

Runs the statement SHOW_STATISTICS('dbo.UserTable', 'MyStatistic') WITH STATS_STREAM against database MyDb on instances Sql1 and Sql2/sqlexpress. Connects using Windows Authentication.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to analyze for statistics information. Accepts multiple database names as an array.  
When omitted, the function processes all accessible databases on the instance, which is useful for instance-wide statistics analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Object

Specifies the table or indexed view to analyze for statistics information. Use this to focus on a specific object rather than all tables in the database.  
Format two-part names as 'Schema.ObjectName' (e.g., 'dbo.Orders'). When specified without Target, all statistics on the object are analyzed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Target

Specifies the exact statistics object, index, or column name to analyze. Use this when you need to examine a specific statistic rather than all statistics on an object.  
Accepts statistics names (like '_WA_Sys_CustomerID'), index names (like 'IX_Orders_CustomerID'), or column names. Can be enclosed in brackets, quotes, or left unquoted.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Option

Controls which type of statistics data to return from DBCC SHOW_STATISTICS. Defaults to 'StatHeader' which shows when statistics were last updated and row counts.  
Use 'Histogram' to analyze data distribution patterns, 'DensityVector' to examine column uniqueness, or 'StatsStream' to get raw binary statistics data for advanced analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | StatHeader |
| Accepted Values | StatHeader,DensityVector,Histogram,StatsStream |

##### -NoInformationalMessages

Suppresses informational messages from DBCC SHOW_STATISTICS output, providing cleaner results focused only on the statistics data.  
Use this when running automated scripts or when you only need the statistics data without additional DBCC messaging.

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


&nbsp;
