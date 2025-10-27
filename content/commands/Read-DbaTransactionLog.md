---
title: "Read-DbaTransactionLog"
slug: "Read-DbaTransactionLog"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves raw transaction log records from a database using fn_dblog for forensic analysis and troubleshooting"
tags:
  - "Log"
  - "LogFile"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Read-DbaTransactionLog.ps1"
bohUrl: "https://dataplat.github.io/boh#Read-DbaTransactionLog"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Read-DbaTransactionLog</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Read-DbaTransactionLog.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stuart Moore (@napalmgram), stuart-moore.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves raw transaction log records from a database using fn_dblog for forensic analysis and troubleshooting

## Description

Uses SQL Server's built-in fn_dblog function to extract raw transaction log records from a live database, returning detailed information about every transaction in the format used by the SQL Server logging subsystem. This gives you access to the same low-level data that SQL Server uses internally to track database changes.  
  
This is primarily useful for forensic analysis when you need to understand exactly what happened to your data - like tracking down who deleted records, when specific changes occurred, or analyzing transaction patterns for troubleshooting performance issues. The raw log data includes LSN numbers, transaction IDs, operation types, and other metadata that can help reconstruct the sequence of database modifications.  
  
A safety limit of 0.5GB has been implemented to prevent performance issues, since reading large transaction logs can impact both the target database and the system running this command. This limit is based on testing and can be overridden using the -IgnoreLimit switch, but be aware that processing very large logs may cause performance degradation on your SQL Server instance.

## Syntax

```powershell
Read-DbaTransactionLog
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-Database] <Object>
    [-IgnoreLimit]
    [[-RowLimit] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $Log = Read-DbaTransactionLog -SqlInstance sql2016 -Database MyDatabase
```
{: data-copyable="true" data-clean-code="$Log = Read-DbaTransactionLog -SqlInstance sql2016 -Database MyDatabase" }

Will read the contents of the transaction log of MyDatabase on SQL Server Instance sql2016 into the local PowerShell object $Log<br>

#####  Example:  2 

```powershell
PS C:\> $Log = Read-DbaTransactionLog -SqlInstance sql2016 -Database MyDatabase -IgnoreLimit
```
{: data-copyable="true" data-clean-code="$Log = Read-DbaTransactionLog -SqlInstance sql2016 -Database MyDatabase -IgnoreLimit" }

Will read the contents of the transaction log of MyDatabase on SQL Server Instance sql2016 into the local PowerShell object $Log, ignoring the recommendation of not returning more that 0.5GB of log<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the database whose transaction log records you want to analyze. The database must be online and in a normal state.  
Use this to target the specific database where you need to investigate transaction activity or perform forensic analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -IgnoreLimit

Bypasses the built-in 0.5GB safety limit that prevents performance issues when reading large transaction logs.  
Use this when you need to analyze databases with large active logs, but be aware it may impact SQL Server performance during execution.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RowLimit

Limits the number of transaction log records returned by adding a TOP clause to the fn_dblog query.  
Use this when you only need recent transactions or want to prevent memory issues with very large logs. Automatically enables IgnoreLimit when specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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
