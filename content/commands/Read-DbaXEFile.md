---
title: "Read-DbaXEFile"
slug: "Read-DbaXEFile"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Parses Extended Events trace files (.xel/.xem) into structured PowerShell objects for analysis"
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Read-DbaXEFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Read-DbaXEFile"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Read-DbaXEFile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Read-DbaXEFile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Parses Extended Events trace files (.xel/.xem) into structured PowerShell objects for analysis

## Description

Converts Extended Events trace files into PowerShell objects so you can analyze captured SQL Server events without needing SQL Server Management Studio. This function takes the raw XEvent data from .xel or .xem files and transforms it into structured objects with properties for each field and action in the trace.  
  
Perfect for post-incident analysis of deadlocks, performance issues, or security events that were captured by your Extended Events sessions. You can pipe the results to other PowerShell cmdlets for filtering, sorting, exporting to CSV, or building reports.  
  
When using pipeline input from Get-DbaXESession, the function automatically skips the file currently being written to avoid access conflicts, and can read files from remote servers via admin shares.

## Syntax

```powershell
Read-DbaXEFile
    [-Path] <Object[]>
    [-Raw]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Read-DbaXEFile -Path C:\temp\deadocks.xel
```
{: data-copyable="true" data-clean-code="Read-DbaXEFile -Path C:\temp\deadocks.xel" }

Returns events from C:\temp\deadocks.xel.<br>

#####  Example:  2 

```powershell
PS C:\> Get-ChildItem C:\temp\xe\*.xel | Read-DbaXEFile
```
{: data-copyable="true" data-clean-code="Get-ChildItem C:\temp\xe\*.xel | Read-DbaXEFile" }

Returns events from all .xel files in C:\temp\xe.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2019 -Session deadlocks | Read-DbaXEFile
```
{: data-copyable="true" data-clean-code="Get-DbaXESession -SqlInstance sql2019 -Session deadlocks | Read-DbaXEFile" }

Reads remote XEvents by accessing the file over the admin UNC share.<br>

### Required Parameters

##### -Path

Specifies the Extended Events file path (.xel or .xem), file objects, or XEvent session objects to read from. Supports local paths, UNC paths for remote files, and pipeline input from Get-ChildItem   
or Get-DbaXESession.  
When using session objects from Get-DbaXESession, automatically accesses files via admin shares and skips the current file being written to prevent access conflicts.

| Property | Value |
| --- | --- |
| Alias | FullName |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Raw

Returns the native Microsoft.SqlServer.XEvent.XELite.XEvent objects instead of structured PowerShell objects. Use this when you need direct access to the XEvent object properties and methods for   
advanced programmatic processing.  
By default, events are converted to PSCustomObjects with all fields and actions as individual properties for easier analysis and reporting.

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
