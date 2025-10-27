---
title: "Get-DbaDbMirrorMonitor"
slug: "Get-DbaDbMirrorMonitor"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database mirroring performance metrics and monitoring history from SQL Server instances"
tags:
  - "Mirroring"
  - "Mirror"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMirrorMonitor.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMirrorMonitor"
draft: false
---

# Get-DbaDbMirrorMonitor

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMirrorMonitor](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMirrorMonitor.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMirrorMonitor](https://dataplat.github.io/boh#Get-DbaDbMirrorMonitor).

## Synopsis

Retrieves database mirroring performance metrics and monitoring history from SQL Server instances

## Description

Retrieves detailed database mirroring performance statistics from the msdb monitoring tables, helping you track mirroring health and identify performance bottlenecks. This function executes sp_dbmmonitorresults to pull metrics like log generation rates, send rates, transaction delays, and recovery progress from both principal and mirror databases.  
  
Use this when troubleshooting mirroring performance issues, monitoring replication lag, or generating compliance reports for high availability configurations. You can optionally refresh the monitoring data before retrieval and filter results by time periods or row counts to focus on specific timeframes.  
  
The function returns comprehensive metrics including unsent log size, recovery rates, average delays, and witness status - all the key indicators DBAs need to assess mirroring health without manually querying system tables.

## Syntax

```powershell
Get-DbaDbMirrorMonitor
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-InputObject] <Database[]>]
    [-Update]
    [[-LimitResults] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbMirrorMonitor -SqlInstance sql2008, sql2012
```

Returns last two hours' worth of status rows for a monitored database from the status table on sql2008 and sql2012.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMirrorMonitor -SqlInstance sql2005 -LimitResults LastDay -Update
```

Updates monitor stats then returns the last 24 hours worth of status rows for a monitored database from the status table on sql2008 and sql2012.<br>

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

##### -Database

Specifies which mirrored databases to monitor. Only databases configured for mirroring will return results.  
Use this to focus monitoring on specific databases instead of checking all mirrored databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase pipeline input.  
Use this when you want to filter databases first before checking their mirroring status.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Update

Forces a refresh of mirroring statistics before retrieving results by calling sp_dbmmonitorupdate.  
Use this when you need the most current metrics, though SQL Server automatically limits updates to once every 15 seconds and requires sysadmin privileges.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LimitResults

Controls how much historical monitoring data to retrieve from the msdb.dbo.dbm_monitor_data table.  
Choose shorter time periods for recent performance analysis or longer periods for trend analysis. Row-based options return the most recent entries regardless of time.  
Options include:  
LastRow  
LastTwoHours  
LastFourHours  
LastEightHours  
LastDay  
LastTwoDays  
Last100Rows  
Last500Rows  
Last1000Rows  
Last1000000Rows

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | LastTwoHours |
| Accepted Values | LastRow,LastTwoHours,LastFourHours,LastEightHours,LastDay,LastTwoDays,Last100Rows,Last500Rows,Last1000Rows,Last1000000Rows |

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
