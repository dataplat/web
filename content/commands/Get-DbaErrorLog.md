---
title: "Get-DbaErrorLog"
slug: "Get-DbaErrorLog"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server error log entries for troubleshooting and monitoring"
tags:
  - "Logging"
  - "Instance"
  - "ErrorLog"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaErrorLog.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaErrorLog"
draft: false
---

# Get-DbaErrorLog

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaErrorLog](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaErrorLog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaErrorLog](https://dataplat.github.io/boh#Get-DbaErrorLog).

## Synopsis

Retrieves SQL Server error log entries for troubleshooting and monitoring

## Description

Retrieves entries from SQL Server error logs across all available log files (0-99, where 0 is current and 99 is oldest).  
Essential for troubleshooting SQL Server issues, monitoring login failures, tracking system events, and compliance auditing.  
Supports filtering by log number, source type, text patterns, and date ranges to quickly locate specific errors or events.  
Reads from all available error logs by default, so you don't have to check each log file manually.

## Syntax

```powershell
Get-DbaErrorLog
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-LogNumber] <Int32[]>]
    [[-Source] <Object[]>]
    [[-Text] <String>]
    [[-After] <DateTime>]
    [[-Before] <DateTime>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint
```

Returns every log entry from sql01\sharepoint SQL Server instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -LogNumber 3, 6
```

Returns all log entries for log number 3 and 6 on sql01\sharepoint SQL Server instance.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -Source Logon
```

Returns every log entry, with a source of Logon, from sql01\sharepoint SQL Server instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -LogNumber 3 -Text "login failed"
```

Returns every log entry for log number 3, with "login failed" in the text, from sql01\sharepoint SQL Server instance.<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2014","sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaErrorLog -LogNumber 0
```

Returns the most recent SQL Server error logs for "sql2014","sql2016" and "sqlcluster\sharepoint"<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -After '2016-11-14 00:00:00'
```

Returns every log entry found after the date 14 November 2016 from sql101\sharepoint SQL Server instance.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -Before '2016-08-16 00:00:00'
```

Returns every log entry found before the date 16 August 2016 from sql101\sharepoint SQL Server instance.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -LogNumber

Specifies which error log file to read by index number (0-99), where 0 is the current active log and higher numbers are older archived logs.  
Use this to target specific log files when troubleshooting issues from a particular time period or to avoid reading all logs for performance.  
SQL Server keeps 6 log files by default but can be configured up to 99 archived logs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Source

Filters log entries by the source component that generated the message, such as "Logon", "Server", "Backup", or "spid123".  
Use this to focus on specific SQL Server subsystems when troubleshooting authentication issues, backup problems, or tracking activity from particular processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Text

Searches for log entries containing specific text patterns using wildcard matching (supports * wildcards).  
Use this to find specific error messages, user names, database names, or any text string within log entries for targeted troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -After

Returns only log entries that occurred after the specified date and time.  
Use this to focus on recent events or investigate issues that started after a known point in time, such as after a deployment or configuration change.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Before

Returns only log entries that occurred before the specified date and time.  
Use this to investigate historical issues, exclude recent events from analysis, or focus on problems that existed prior to a specific incident or change.

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


&nbsp;
