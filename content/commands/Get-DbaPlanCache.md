---
title: "Get-DbaPlanCache"
slug: "Get-DbaPlanCache"
date: 2024-01-01
layout: "single"
author: "Tracy Boggiano, databasesuperhero.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves single-use plan cache usage to identify memory waste from adhoc and prepared statements"
tags:
  - "Diagnostic"
  - "Cache"
  - "Memory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPlanCache.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPlanCache"
draft: false
---

# Get-DbaPlanCache

| Property | Value |
| --- | --- |
| **Author** | Tracy Boggiano, databasesuperhero.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPlanCache](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPlanCache.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPlanCache](https://dataplat.github.io/boh#Get-DbaPlanCache).

## Synopsis

Retrieves single-use plan cache usage to identify memory waste from adhoc and prepared statements

## Description

Analyzes the plan cache to identify memory consumed by single-use adhoc and prepared statements that are unlikely to be reused. These plans accumulate over time and can consume significant memory without providing performance benefits.  
  
When applications generate dynamic SQL without proper parameterization, each unique statement creates its own execution plan. These single-use plans waste memory and can cause plan cache pressure, leading to performance issues and increased compilation overhead.  
  
The function queries sys.dm_exec_cached_plans to calculate the total size and count of single-use plans. If the results show over 100 MB of single-use plans, consider enabling "optimize for adhoc workloads" (SQL Server 2008+) or use Remove-DbaQueryPlan to clear the cache during maintenance windows.  
  
References: https://www.sqlskills.com/blogs/kimberly/plan-cache-adhoc-workloads-and-clearing-the-single-use-plan-cache-bloat/  
  
Note: This command returns results from all SQL server instances on the destination server but the process column is specific to -SqlInstance passed.

## Syntax

```powershell
Get-DbaPlanCache
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
PS C:\> Get-DbaPlanCache -SqlInstance sql2017
```

Returns the single use plan cache usage information for SQL Server instance 2017<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPlanCache -SqlInstance sql2017 -SqlCredential sqladmin
```

Returns the single use plan cache usage information for SQL Server instance 2017 using login 'sqladmin'<br>

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
