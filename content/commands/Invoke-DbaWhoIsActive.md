---
title: "Invoke-DbaWhoIsActive"
slug: "Invoke-DbaWhoIsActive"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves real-time information about active SQL Server sessions and currently running queries"
tags:
  - "Community"
  - "WhoIsActive"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaWhoIsActive.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaWhoIsActive"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaWhoIsActive</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaWhoIsActive.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Retrieves real-time information about active SQL Server sessions and currently running queries

## Description

Executes Adam Machanic's sp_WhoIsActive stored procedure to display detailed information about currently running sessions, active queries, and their resource consumption. This is the go-to command for troubleshooting performance issues, identifying blocking chains, and monitoring SQL Server activity in real-time. Provides comprehensive session details including wait statistics, query plans, lock information, and transaction details that would otherwise require querying multiple DMVs manually.  
  
This command was built with Adam's permission. To read more about sp_WhoIsActive, please visit:  
  
Updates: http://sqlblog.com/blogs/adam_machanic/archive/tags/who+is+active/default.aspx  
  
Also, consider donating to Adam if you find this stored procedure helpful: http://tinyurl.com/WhoIsActiveDonate

## Syntax

```powershell
Invoke-DbaWhoIsActive
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-Filter] <String>]
    [[-FilterType] <String>]
    [[-NotFilter] <String>]
    [[-NotFilterType] <String>]
    [-ShowOwnSpid]
    [-ShowSystemSpids]
    [[-ShowSleepingSpids] <Int32>]
    [-GetFullInnerText]
    [[-GetPlans] <Int32>]
    [-GetOuterCommand]
    [-GetTransactionInfo]
    [[-GetTaskInfo] <Int32>]
    [-GetLocks]
    [-GetAverageTime]
    [-GetAdditonalInfo]
    [-FindBlockLeaders]
    [[-DeltaInterval] <Int32>]
    [[-OutputColumnList] <String>]
    [[-SortOrder] <String>]
    [[-FormatOutput] <Int32>]
    [[-DestinationTable] <String>]
    [-ReturnSchema]
    [[-Schema] <String>]
    [-Help]
    [[-As] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a
```
{: data-copyable="true" data-clean-code="Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a" }

Execute sp_whoisactive on sqlserver2014a. This command expects sp_WhoIsActive to be in the master database. Logs into the SQL Server with Windows credentials.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a -SqlCredential $credential -Database dbatools
```
{: data-copyable="true" data-clean-code="Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a -SqlCredential $credential -Database dbatools" }

Execute sp_whoisactive on sqlserver2014a. This command expects sp_WhoIsActive to be in the dbatools database. Logs into the SQL Server with SQL Authentication.<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a -GetAverageTime
```
{: data-copyable="true" data-clean-code="Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a -GetAverageTime" }

Similar to running sp_WhoIsActive @get_avg_time<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a -GetOuterCommand -FindBlockLeaders
```
{: data-copyable="true" data-clean-code="Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a -GetOuterCommand -FindBlockLeaders" }

Similar to running sp_WhoIsActive @get_outer_command = 1, @find_block_leaders = 1<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or higher.

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

Specifies the database where sp_WhoIsActive is installed. Defaults to master if not specified.  
Use this when you've installed sp_WhoIsActive in a different database like a DBA utilities database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Filter

Filters results to include only sessions matching the specified criteria. Supports wildcards (% and _) for pattern matching.  
Use this to focus on specific sessions, applications, databases, logins, or hosts when troubleshooting performance issues.  
For session ID filtering, use 0 or an empty string to include all sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FilterType

Specifies what type of filtering to apply with the Filter parameter. Valid options: Session, Program, Database, Login, Host.  
Use 'Program' to filter by application name, 'Login' to filter by SQL login, or 'Host' to filter by client machine name.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Session |
| Accepted Values | Session,Program,Database,Login,Host |

##### -NotFilter

Excludes sessions matching the specified criteria from results. Supports wildcards (% and _) for pattern matching.  
Use this to exclude specific applications, databases, or users when you want to focus on everything else.  
For session ID filtering, use 0 or an empty string to exclude no sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NotFilterType

Specifies what type of exclusion filtering to apply with the NotFilter parameter. Valid options: Session, Program, Database, Login, Host.  
Use this in combination with NotFilter to exclude sessions by application name, database, login, or host.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Session |
| Accepted Values | Session,Program,Database,Login,Host |

##### -ShowOwnSpid

Includes the current session (the one running sp_WhoIsActive) in the results.  
By default, your own session is excluded to reduce clutter in the output.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ShowSystemSpids

Includes internal SQL Server system sessions in the results.  
Use this when troubleshooting system-level performance issues or investigating background processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ShowSleepingSpids

Controls which idle sessions to include based on their transaction status. 0 = no sleeping sessions, 1 = only sleeping sessions with open transactions, 2 = all sleeping sessions.  
Use 1 when investigating blocking issues or long-running transactions, or 2 for comprehensive session auditing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -GetFullInnerText

Retrieves the complete SQL batch or stored procedure text instead of just the current statement.  
Use this when you need to see the full context of what's executing, not just the individual statement within a larger batch.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -GetPlans

Retrieves execution plans for active queries. 1 = plan for current statement only, 2 = entire plan for the batch or procedure.  
Essential for performance troubleshooting to identify inefficient queries, missing indexes, and optimization opportunities.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -GetOuterCommand

Captures the original command that initiated the current batch, including stored procedure calls with parameters.  
Useful for understanding the full call stack when procedures call other procedures or dynamic SQL.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -GetTransactionInfo

Includes transaction log usage and duration information for active sessions.  
Critical for identifying sessions with long-running transactions that may cause blocking or log space issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -GetTaskInfo

Controls task and wait information collection. 0 = no task info, 1 = lightweight mode with primary waits and blockers, 2 = comprehensive task metrics including I/O and context switches.  
Use level 1 for general troubleshooting or level 2 for detailed performance analysis when you need full wait statistics.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -GetLocks

Retrieves detailed lock information for each session in XML format.  
Essential for troubleshooting blocking issues and understanding what resources sessions are waiting for or holding.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -GetAverageTime

Calculates the average execution time for the currently running query based on historical execution data.  
Helps identify queries that are running longer than usual, indicating potential performance degradation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -GetAdditonalInfo

Includes session configuration details like ANSI settings, isolation level, language, and command type information.  
Useful for troubleshooting application-specific issues where session settings affect query behavior or when investigating SQL Agent job activity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FindBlockLeaders

Identifies the root cause sessions in blocking chains and counts how many sessions each one is blocking.  
Critical for resolving blocking issues by showing you which sessions to focus on first when multiple blocking chains exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DeltaInterval

Captures performance metrics at two points in time separated by the specified interval (in seconds) to show rate-of-change data.  
Excellent for identifying which sessions are actively consuming CPU, I/O, or memory resources during the measurement period.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -OutputColumnList

Specifies which columns to include in the results and their display order using bracket-delimited column names.  
Customize this to focus on specific metrics or reduce output complexity for your monitoring scenarios.  
Only columns related to enabled features will actually appear in the output.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | [dd%][session_id][sql_text][sql_command][login_name][wait_info][tasks][tran_log%][cpu%][temp%][block%][reads%][writes%][context%][physical%][query_plan][locks][%] |

##### -SortOrder

Controls how results are sorted using bracket-delimited column names with optional ASC/DESC direction.  
Sort by CPU, physical_io, or start_time to quickly identify the most resource-intensive or longest-running sessions.  
Defaults to sorting by start_time in ascending order.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | [start_time] ASC |

##### -FormatOutput

Controls output formatting for better readability. 0 = no formatting, 1 = variable-width fonts (default), 2 = fixed-width fonts.  
Use 2 when displaying results in console windows or fixed-width displays for better column alignment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |

##### -DestinationTable

Inserts results directly into a specified table instead of returning them to PowerShell.  
Useful for automated monitoring scripts or building historical performance data repositories.  
Table must already exist with the correct schema structure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReturnSchema

Returns a CREATE TABLE statement showing the schema structure needed for the DestinationTable instead of collecting data.  
Use this to generate the correct table structure before setting up automated data collection with DestinationTable.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Schema

Alternative parameter name for ReturnSchema functionality.  
Returns a CREATE TABLE statement for the result set structure instead of collecting actual data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Help

Returns detailed help information about sp_WhoIsActive parameters and their usage instead of executing the procedure.  
Use this to understand all available options when you're unsure which parameters to use for your specific troubleshooting scenario.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -As

Specifies the PowerShell output format. Options: DataSet, DataTable, DataRow (default), PSObject.  
Use PSObject for advanced scripting scenarios where you need better handling of null values and type conversion.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | DataRow |
| Accepted Values | DataSet,DataTable,DataRow,PSObject |

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
