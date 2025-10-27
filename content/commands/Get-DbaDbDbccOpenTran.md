---
title: "Get-DbaDbDbccOpenTran"
slug: "Get-DbaDbDbccOpenTran"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Identifies the oldest active transactions in database transaction logs using DBCC OPENTRAN"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbDbccOpenTran.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbDbccOpenTran"
draft: false
---

# Get-DbaDbDbccOpenTran

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbDbccOpenTran](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbDbccOpenTran.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbDbccOpenTran](https://dataplat.github.io/boh#Get-DbaDbDbccOpenTran).

## Synopsis

Identifies the oldest active transactions in database transaction logs using DBCC OPENTRAN

## Description

Executes DBCC OPENTRAN against specified databases to identify long-running or problematic transactions that may be causing blocking, transaction log growth, or replication delays.  
  
This function helps DBAs troubleshoot performance issues by revealing the oldest active transaction and any distributed or replicated transactions within each database's transaction log. When transactions remain open for extended periods, they prevent log truncation and can cause cascading blocking issues throughout your SQL Server instance.  
  
The output includes detailed transaction information in structured PowerShell objects, making it easy to identify which transactions need attention. If no active transactions are found, the function clearly indicates this status for each database checked.  
  
This is particularly valuable when investigating sudden transaction log growth, diagnosing blocking chains, or troubleshooting replication latency issues where old transactions may be preventing log reader processes from advancing.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-opentran-transact-sql

## Syntax

```powershell
Get-DbaDbDbccOpenTran
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbDbccOpenTran -SqlInstance SQLServer2017
```

Connects to instance SqlServer2017 using Windows Authentication and runs the command DBCC OPENTRAN WITH TABLERESULTS, NO_INFOMSGS against each database.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbDbccOpenTran -SqlInstance SQLServer2017 -Database CurrentDB
```

Connects to instance SqlServer2017 using Windows Authentication and runs the command DBCC OPENTRAN(CurrentDB) WITH TABLERESULTS, NO_INFOMSGS against the CurrentDB database.<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbDbccOpenTran -SqlCredential $cred
```

Connects to instances Sql1 and Sql2/sqlexpress using sqladmin credential and runs the command DBCC OPENTRAN WITH TABLERESULTS, NO_INFOMSGS against each database.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to check for open transactions. Accepts database names or database IDs.  
Use this when investigating transaction issues in specific databases rather than scanning all databases on the instance.  
If omitted, DBCC OPENTRAN runs against all accessible databases, which may take longer on instances with many databases.

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
