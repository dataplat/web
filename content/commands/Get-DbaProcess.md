---
title: "Get-DbaProcess"
slug: "Get-DbaProcess"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves active SQL Server processes and sessions with detailed connection and activity information."
tags:
  - "Diagnostic"
  - "Process"
  - "Session"
  - "ActivityMonitor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaProcess.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaProcess"
draft: false
---

# Get-DbaProcess

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaProcess](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaProcess.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaProcess](https://dataplat.github.io/boh#Get-DbaProcess).

## Synopsis

Retrieves active SQL Server processes and sessions with detailed connection and activity information.

## Description

Displays comprehensive information about SQL Server processes including session details, connection properties, timing data, and the last executed SQL statement. This function combines data from multiple system views to provide a complete picture of current database activity.  
  
Use this to monitor active connections, identify blocking processes, track application connections, troubleshoot performance issues, or audit database access patterns. The output includes connection timing, network transport details, authentication schemes, client information, and recent query activity.  
  
You can filter results by login name, hostname, program name, database, or specific session IDs to focus on particular processes of interest. This is especially useful for identifying connection leaks, monitoring specific applications, or investigating security concerns.  
  
Thanks to Michael J Swart at https://sqlperformance.com/2017/07/sql-performance/find-database-connection-leaks for the query to get the last executed SQL statement, minutesasleep and host process ID.

## Syntax

```powershell
Get-DbaProcess
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Spid] <Int32[]>]
    [[-ExcludeSpid] <Int32[]>]
    [[-Database] <String[]>]
    [[-Login] <String[]>]
    [[-Hostname] <String[]>]
    [[-Program] <String[]>]
    [-ExcludeSystemSpids]
    [-EnableException]
    [-Intersect]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaProcess -SqlInstance sqlserver2014a -Login base\ctrlb, sa
```

Shows information about the processes for base\ctrlb and sa on sqlserver2014a. Windows Authentication is used in connecting to sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaProcess -SqlInstance sqlserver2014a -SqlCredential $credential -Spid 56, 77
```

Shows information about the processes for spid 56 and 57. Uses alternative (SQL or Windows) credentials to authenticate to sqlserver2014a.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaProcess -SqlInstance sqlserver2014a -Program 'Microsoft SQL Server Management Studio'
```

Shows information about the processes that were created in Microsoft SQL Server Management Studio.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaProcess -SqlInstance sqlserver2014a -Host workstationx, server100
```

Shows information about the processes that were initiated by hosts (computers/clients) workstationx and server 1000.<br>

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

##### -Spid

Filters results to specific process IDs (SPIDs) you want to monitor. Also includes any processes that are blocked by the specified SPIDs.  
Use this when investigating specific connections or troubleshooting blocking issues where you need to see both the blocker and blocked processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSpid

Excludes specific process IDs (SPIDs) from the results, even if they match other filter criteria.  
Use this to remove known processes like monitoring tools, maintenance jobs, or your own session from the output. This filter is applied last, overriding all other inclusion filters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Filters results to sessions currently connected to specific databases.  
Use this when monitoring activity on particular databases, investigating database-specific performance issues, or auditing access to sensitive databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Filters results to sessions connected with specific SQL Server login names or Windows authentication accounts.  
Use this to monitor connections from specific applications, service accounts, or users when investigating security concerns or connection patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Hostname

Filters results to sessions originating from specific client machines or server names.  
Use this when tracking connections from particular workstations, application servers, or investigating connection leaks from specific hosts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Program

Filters results to sessions created by specific client applications such as 'Microsoft SQL Server Management Studio' or custom application names.  
Use this to monitor connections from particular applications, identify connection patterns, or troubleshoot application-specific database issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemSpids

Excludes system processes (SPIDs 1-50) from the results to focus only on user connections and application processes.  
Use this when you want to see only actual user sessions and application connections, filtering out SQL Server internal processes like checkpoints, log writers, and system tasks.

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

##### -Intersect

If this switch is enabled, take the intersection of Spid, Login, Hostname, Program, and Database rather than the union.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
