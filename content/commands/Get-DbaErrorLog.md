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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaErrorLog</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaErrorLog.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaErrorLog -SqlInstance sql01\sharepoint" }

Returns every log entry from sql01\sharepoint SQL Server instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -LogNumber 3, 6
```
{: data-copyable="true" data-clean-code="Get-DbaErrorLog -SqlInstance sql01\sharepoint -LogNumber 3, 6" }

Returns all log entries for log number 3 and 6 on sql01\sharepoint SQL Server instance.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -Source Logon
```
{: data-copyable="true" data-clean-code="Get-DbaErrorLog -SqlInstance sql01\sharepoint -Source Logon" }

Returns every log entry, with a source of Logon, from sql01\sharepoint SQL Server instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -LogNumber 3 -Text "login failed"
```
{: data-copyable="true" data-clean-code="Get-DbaErrorLog -SqlInstance sql01\sharepoint -LogNumber 3 -Text &quot;login failed&quot;" }

Returns every log entry for log number 3, with "login failed" in the text, from sql01\sharepoint SQL Server instance.<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2014","sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaErrorLog -LogNumber 0
```
{: data-copyable="true" data-clean-code="$servers = &quot;sql2014&quot;,&quot;sql2016&quot;, &quot;sqlcluster\sharepoint&quot;
$servers | Get-DbaErrorLog -LogNumber 0" }

Returns the most recent SQL Server error logs for "sql2014","sql2016" and "sqlcluster\sharepoint"<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -After '2016-11-14 00:00:00'
```
{: data-copyable="true" data-clean-code="Get-DbaErrorLog -SqlInstance sql01\sharepoint -After '2016-11-14 00:00:00'" }

Returns every log entry found after the date 14 November 2016 from sql101\sharepoint SQL Server instance.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaErrorLog -SqlInstance sql01\sharepoint -Before '2016-08-16 00:00:00'
```
{: data-copyable="true" data-clean-code="Get-DbaErrorLog -SqlInstance sql01\sharepoint -Before '2016-08-16 00:00:00'" }

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
