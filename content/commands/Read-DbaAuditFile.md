---
title: "Read-DbaAuditFile"
slug: "Read-DbaAuditFile"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Parses SQL Server audit files (.sqlaudit) into structured event data for security analysis and compliance reporting."
tags:
  - "XE"
  - "Audit"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Read-DbaAuditFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Read-DbaAuditFile"
draft: false
---

# Read-DbaAuditFile

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Read-DbaAuditFile](https://github.com/dataplat/dbatools/blob/master/public/Read-DbaAuditFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Read-DbaAuditFile](https://dataplat.github.io/boh#Read-DbaAuditFile).

## Synopsis

Parses SQL Server audit files (.sqlaudit) into structured event data for security analysis and compliance reporting.

## Description

Reads and parses SQL Server audit files (.sqlaudit) created by SQL Server Audit functionality, converting binary audit data into readable PowerShell objects. Each audit event is returned with its timestamp, event details, fields, and actions in a structured format that's easy to filter, export, or analyze. This is essential for security investigations, compliance reporting, and monitoring database access patterns since SQL Server audit files are stored in a proprietary binary format that can't be read directly. Works with local files, UNC paths, or can be piped from Get-DbaInstanceAudit to automatically locate and read audit files from remote instances.

## Syntax

```powershell
Read-DbaAuditFile
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
PS C:\> Read-DbaAuditFile -Path C:\temp\logins.sqlaudit
```

Returns events from C:\temp\logins.sqlaudit.<br>

#####  Example:  2 

```powershell
PS C:\> Get-ChildItem C:\temp\audit\*.sqlaudit | Read-DbaAuditFile
```

Returns events from all .sqlaudit files in C:\temp\audit.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaInstanceAudit -SqlInstance sql2014 -Audit LoginTracker | Read-DbaAuditFile
```

Reads remote Audit details by accessing the file over the admin UNC share.<br>

### Required Parameters

##### -Path

Specifies the path to SQL Server audit files (.sqlaudit) to read and parse. Accepts file paths, FileInfo objects from Get-ChildItem, or Audit objects from Get-DbaInstanceAudit.  
Supports UNC paths for reading remote files and automatically expands wildcards to process multiple related audit files. Use this when you need to analyze audit data from specific files or when   
piping from other dbatools audit commands.

| Property | Value |
| --- | --- |
| Alias | FullName |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Raw

Returns the unprocessed enumeration object instead of structured PowerShell objects.  
Use this when you need access to the raw audit data structure for custom processing or when working with audit parsing tools that expect the native format.

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
