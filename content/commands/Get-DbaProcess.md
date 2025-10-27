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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaProcess</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaProcess.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaProcess -SqlInstance sqlserver2014a -Login base\ctrlb, sa" }

Shows information about the processes for base\ctrlb and sa on sqlserver2014a. Windows Authentication is used in connecting to sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaProcess -SqlInstance sqlserver2014a -SqlCredential $credential -Spid 56, 77
```
{: data-copyable="true" data-clean-code="Get-DbaProcess -SqlInstance sqlserver2014a -SqlCredential $credential -Spid 56, 77" }

Shows information about the processes for spid 56 and 57. Uses alternative (SQL or Windows) credentials to authenticate to sqlserver2014a.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaProcess -SqlInstance sqlserver2014a -Program 'Microsoft SQL Server Management Studio'
```
{: data-copyable="true" data-clean-code="Get-DbaProcess -SqlInstance sqlserver2014a -Program 'Microsoft SQL Server Management Studio'" }

Shows information about the processes that were created in Microsoft SQL Server Management Studio.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaProcess -SqlInstance sqlserver2014a -Host workstationx, server100
```
{: data-copyable="true" data-clean-code="Get-DbaProcess -SqlInstance sqlserver2014a -Host workstationx, server100" }

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
