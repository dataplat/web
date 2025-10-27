---
title: "Get-DbaDbLogSpace"
slug: "Get-DbaDbLogSpace"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret, JessPomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves transaction log space usage and capacity information from SQL Server databases."
tags:
  - "Storage"
  - "Space"
  - "Log"
  - "File"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbLogSpace.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbLogSpace"
draft: false
---

# Get-DbaDbLogSpace

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret, JessPomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbLogSpace](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbLogSpace.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbLogSpace](https://dataplat.github.io/boh#Get-DbaDbLogSpace).

## Synopsis

Retrieves transaction log space usage and capacity information from SQL Server databases.

## Description

Collects detailed transaction log metrics including total size, used space percentage, and used space in bytes for databases across SQL Server instances. Uses the sys.dm_db_log_space_usage DMV on SQL Server 2012+ or DBCC SQLPERF(logspace) on older versions.  
  
Essential for proactive log space monitoring to prevent unexpected transaction log growth, identify databases approaching log capacity limits, and plan log file sizing. Helps DBAs avoid transaction failures caused by full transaction logs and optimize log file allocation strategies.

## Syntax

```powershell
Get-DbaDbLogSpace
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [-ExcludeSystemDatabase]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbLogSpace -SqlInstance Server1
```

Returns the transaction log usage information for all databases on Server1<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbLogSpace -SqlInstance Server1 -Database Database1, Database2
```

Returns the transaction log usage information for both Database1 and Database 2 on Server1<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbLogSpace -SqlInstance Server1 -ExcludeDatabase Database3
```

Returns the transaction log usage information for all databases on Server1, except Database3<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbLogSpace -SqlInstance Server1 -ExcludeSystemDatabase
```

Returns the transaction log usage information for all databases on Server1, except the system databases<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaRegisteredServer -SqlInstance cmsServer | Get-DbaDbLogSpace -Database Database1
```

Returns the transaction log usage information for Database1 for a group of servers from SQL Server Central Management Server (CMS).<br>

### Required Parameters

##### -SqlInstance

SQL Server name or SMO object representing the SQL Server to connect to. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
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

##### -Database

Specifies which databases to check for transaction log space usage. Accepts wildcards for pattern matching.  
Use this when you need to monitor specific databases instead of checking all databases on the instance, particularly useful for focusing on high-growth or critical databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when checking transaction log space usage. Accepts wildcards for pattern matching.  
Use this to exclude databases you don't need to monitor regularly, such as test databases, read-only databases, or databases with known stable log usage patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemDatabase

Excludes system databases (master, model, msdb, tempdb) from the transaction log space report.  
Use this when focusing on user databases only, as system database log usage is typically managed differently and may not require the same monitoring attention.

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
