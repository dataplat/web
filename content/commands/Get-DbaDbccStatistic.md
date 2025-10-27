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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbccStatistic</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccStatistic.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Patrick Flynn (@sqllensman)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaDbccStatistic -SqlInstance SQLServer2017" }

Will run the statement SHOW_STATISTICS WITH STAT_HEADER against all Statistics on all User Tables or views for every accessible database on instance SQLServer2017. Connects using Windows <br>
Authentication.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbccStatistic -SqlInstance SQLServer2017 -Database MyDb -Option DensityVector
```
{: data-copyable="true" data-clean-code="Get-DbaDbccStatistic -SqlInstance SQLServer2017 -Database MyDb -Option DensityVector" }

Will run the statement SHOW_STATISTICS WITH DENSITY_VECTOR against all Statistics on all User Tables or views for database MyDb on instance SQLServer2017. Connects using Windows Authentication.<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbccStatistic -SqlInstance SQLServer2017 -SqlCredential $cred -Database MyDb -Object UserTable -Option Histogram
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Get-DbaDbccStatistic -SqlInstance SQLServer2017 -SqlCredential $cred -Database MyDb -Object UserTable -Option Histogram" }

Will run the statement SHOW_STATISTICS WITH HISTOGRAM against all Statistics on table UserTable for database MyDb on instance SQLServer2017. Connects using sqladmin credential.<br>

#####  Example:  4 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbccStatistic -SqlInstance SQLServer2017 -Database MyDb -Object 'dbo.UserTable' -Target MyStatistic -Option StatsStream
```
{: data-copyable="true" data-clean-code="'Sql1','Sql2/sqlexpress' | Get-DbaDbccStatistic -SqlInstance SQLServer2017 -Database MyDb -Object 'dbo.UserTable' -Target MyStatistic -Option StatsStream" }

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
