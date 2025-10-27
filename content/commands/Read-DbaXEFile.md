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

# Read-DbaXEFile

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Read-DbaXEFile](https://github.com/dataplat/dbatools/blob/master/public/Read-DbaXEFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Read-DbaXEFile](https://dataplat.github.io/boh#Read-DbaXEFile).

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

Returns events from C:\temp\deadocks.xel.<br>

#####  Example:  2 

```powershell
PS C:\> Get-ChildItem C:\temp\xe\*.xel | Read-DbaXEFile
```

Returns events from all .xel files in C:\temp\xe.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2019 -Session deadlocks | Read-DbaXEFile
```

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
