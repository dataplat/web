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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbatoolsLog</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsLog.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbatoolsLog" }

Returns all log entries currently in memory.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbatoolsLog -LastError
```
{: data-copyable="true" data-clean-code="Get-DbatoolsLog -LastError" }

Returns the last log entry type of error.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbatoolsLog -Target "a" -Last 1 -Skip 1
```
{: data-copyable="true" data-clean-code="Get-DbatoolsLog -Target &quot;a&quot; -Last 1 -Skip 1" }

Returns all log entries that targeted the object "a" in the second last execution sent.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbatoolsLog -Tag "fail" -Last 5
```
{: data-copyable="true" data-clean-code="Get-DbatoolsLog -Tag &quot;fail&quot; -Last 5" }

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
