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

# Read-DbaTransactionLog

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Read-DbaTransactionLog](https://github.com/dataplat/dbatools/blob/master/public/Read-DbaTransactionLog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Read-DbaTransactionLog](https://dataplat.github.io/boh#Read-DbaTransactionLog).

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

Will read the contents of the transaction log of MyDatabase on SQL Server Instance sql2016 into the local PowerShell object $Log<br>

#####  Example:  2 

```powershell
PS C:\> $Log = Read-DbaTransactionLog -SqlInstance sql2016 -Database MyDatabase -IgnoreLimit
```

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
