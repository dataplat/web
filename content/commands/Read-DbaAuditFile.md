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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Read-DbaAuditFile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Read-DbaAuditFile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Read-DbaAuditFile -Path C:\temp\logins.sqlaudit" }

Returns events from C:\temp\logins.sqlaudit.<br>

#####  Example:  2 

```powershell
PS C:\> Get-ChildItem C:\temp\audit\*.sqlaudit | Read-DbaAuditFile
```
{: data-copyable="true" data-clean-code="Get-ChildItem C:\temp\audit\*.sqlaudit | Read-DbaAuditFile" }

Returns events from all .sqlaudit files in C:\temp\audit.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaInstanceAudit -SqlInstance sql2014 -Audit LoginTracker | Read-DbaAuditFile
```
{: data-copyable="true" data-clean-code="Get-DbaInstanceAudit -SqlInstance sql2014 -Audit LoginTracker | Read-DbaAuditFile" }

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
