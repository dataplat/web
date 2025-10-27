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

# Invoke-DbaWhoIsActive

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaWhoIsActive](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaWhoIsActive.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaWhoIsActive](https://dataplat.github.io/boh#Invoke-DbaWhoIsActive).

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

Execute sp_whoisactive on sqlserver2014a. This command expects sp_WhoIsActive to be in the master database. Logs into the SQL Server with Windows credentials.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a -SqlCredential $credential -Database dbatools
```

Execute sp_whoisactive on sqlserver2014a. This command expects sp_WhoIsActive to be in the dbatools database. Logs into the SQL Server with SQL Authentication.<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a -GetAverageTime
```

Similar to running sp_WhoIsActive @get_avg_time<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaWhoIsActive -SqlInstance sqlserver2014a -GetOuterCommand -FindBlockLeaders
```

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
