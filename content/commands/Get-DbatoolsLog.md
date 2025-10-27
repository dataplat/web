---
title: "Get-DbatoolsLog"
slug: "Get-DbatoolsLog"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves internal log entries and error messages from dbatools module execution"
tags:
  - "Module"
  - "Support"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsLog.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbatoolsLog"
draft: false
---

# Get-DbatoolsLog

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbatoolsLog](https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsLog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbatoolsLog](https://dataplat.github.io/boh#Get-DbatoolsLog).

## Synopsis

Retrieves internal log entries and error messages from dbatools module execution

## Description

Retrieves log entries from dbatools' internal logging system, allowing you to troubleshoot command execution and track what happened during script runs. Use this when dbatools commands aren't behaving as expected or when you need to see detailed execution information for debugging purposes. The function can filter logs by specific functions, modules, targets, execution history, or message levels, making it easier to isolate issues during SQL Server automation tasks.

## Syntax

```powershell
Get-DbatoolsLog
    [[-FunctionName] <String>]
    [[-ModuleName] <String>]
    [[-Target] <Object>]
    [[-Tag] <String[]>]
    [[-Last] <Int32>]
    [-LastError]
    [[-Skip] <Int32>]
    [[-Runspace] <Guid>]
    [[-Level] {Critical | Important | Output | Significant | VeryVerbose | Verbose | SomewhatVerbose | System | Debug | InternalComment | Warning}]
    [-Raw]
    [-Errors]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbatoolsLog
```

Returns all log entries currently in memory.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbatoolsLog -LastError
```

Returns the last log entry type of error.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbatoolsLog -Target "a" -Last 1 -Skip 1
```

Returns all log entries that targeted the object "a" in the second last execution sent.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbatoolsLog -Tag "fail" -Last 5
```

Returns all log entries within the last 5 executions that contained the tag "fail"<br>

### Optional Parameters

##### -FunctionName

Filters log entries to show only messages from dbatools functions matching this pattern. Supports wildcards.  
Use this when troubleshooting specific commands like 'Backup-DbaDatabase' or when you want to see all backup-related functions with 'Backup-Dba*'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

##### -ModuleName

Filters log entries to show only messages from modules matching this pattern. Supports wildcards.  
Use this when working with multiple PowerShell modules and you only want to see dbatools-related log entries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

##### -Target

Filters log entries to show only messages related to a specific target object like a server name, database name, or other SQL Server component.  
Use this when troubleshooting issues with a particular SQL Server instance or database to see only relevant log entries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Tag

Filters log entries to show only messages that contain any of the specified tags.  
Use this to find specific types of operations like 'backup', 'restore', or 'migration' when tracking down issues with particular dbatools workflows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Last

Returns log entries from only the last X PowerShell command executions in your current session.  
Use this to focus on recent activity when troubleshooting the most recent dbatools commands you ran. Excludes Get-DbatoolsLog commands from the execution count to avoid confusion.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -LastError

Returns only the most recent error message from the dbatools logging system.  
Use this as a quick way to see what went wrong with your last dbatools command execution without scrolling through all log entries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Skip

Specifies how many recent executions to skip when using the -Last parameter.  
Use this when you want to see log entries from earlier executions, like '-Last 3 -Skip 2' to see the 3rd, 4th, and 5th most recent executions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Runspace

Filters log entries to show only messages from the specified PowerShell runspace GUID.  
Use this when troubleshooting parallel or background dbatools operations to isolate messages from specific execution threads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Level

Filters log entries by message severity level (Critical, Error, Warning, Info, Verbose, etc.).  
Use this to focus on specific severity levels, like only errors and warnings, or to see verbose details during troubleshooting. Supports arrays and ranges like (1..6).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Raw

Returns log messages in their original format without flattening multiline content like SQL statements.  
Use this when you need to see the exact formatting of SQL queries or error messages for detailed troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Errors

Returns error entries from dbatools' error tracking system instead of regular log entries.  
Use this when you specifically need to see exceptions and errors that occurred during dbatools command execution, separate from informational logging.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
