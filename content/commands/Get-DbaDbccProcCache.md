---
title: "Get-DbaDbccProcCache"
slug: "Get-DbaDbccProcCache"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves plan cache memory usage statistics from SQL Server instances"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccProcCache.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbccProcCache"
draft: false
---

# Get-DbaDbccProcCache

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbccProcCache](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccProcCache.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbccProcCache](https://dataplat.github.io/boh#Get-DbaDbccProcCache).

## Synopsis

Retrieves plan cache memory usage statistics from SQL Server instances

## Description

Executes DBCC PROCCACHE against SQL Server instances and returns structured information about plan cache memory utilization. This command reveals how much memory is allocated for storing compiled execution plans, how much is currently being used, and how many plan entries are active. Essential for diagnosing memory pressure issues, understanding plan cache efficiency, and monitoring whether the plan cache is consuming excessive memory or experiencing frequent evictions that could impact query performance.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-proccache-transact-sql

## Syntax

```powershell
Get-DbaDbccProcCache
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbccProcCache -SqlInstance Server1
```

Get results of DBCC PROCCACHE for Instance Server1<br>

#####  Example:  2 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbccProcCache
```

Get results of DBCC PROCCACHE for Instances Sql1 and Sql2/sqlexpress<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbccProcCache -SqlInstance Server1 -SqlCredential $cred
```

Connects using sqladmin credential and gets results of DBCC PROCCACHE for Instance Server1<br>

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
