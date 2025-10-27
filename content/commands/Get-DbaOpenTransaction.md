---
title: "Get-DbaOpenTransaction"
slug: "Get-DbaOpenTransaction"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed information about open database transactions across SQL Server instances."
tags:
  - "Diagnostic"
  - "Process"
  - "Session"
  - "ActivityMonitor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaOpenTransaction.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaOpenTransaction"
draft: false
---

# Get-DbaOpenTransaction

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaOpenTransaction](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaOpenTransaction.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaOpenTransaction](https://dataplat.github.io/boh#Get-DbaOpenTransaction).

## Synopsis

Retrieves detailed information about open database transactions across SQL Server instances.

## Description

Queries SQL Server dynamic management views to identify open transactions that may be causing blocking, consuming transaction log space, or impacting performance. Returns comprehensive details including session information, database context, transaction duration, log space usage, and the last executed query with its execution plan.  
  
This is particularly useful when troubleshooting blocking issues, investigating long-running transactions, or monitoring transaction log growth. The function helps DBAs quickly identify which sessions are holding transactions open and assess their potential impact on system performance.  
  
This command is based on the open transaction monitoring script published by Paul Randal.  
Reference: https://www.sqlskills.com/blogs/paul/script-open-transactions-with-text-and-plans/

## Syntax

```powershell
Get-DbaOpenTransaction
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
PS C:\> Get-DbaOpenTransaction -SqlInstance sqlserver2014a
```

Returns open transactions for sqlserver2014a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaOpenTransaction -SqlInstance sqlserver2014a -SqlCredential sqladmin
```

Logs into sqlserver2014a using the login "sqladmin"<br>

### Required Parameters

##### -SqlInstance

The SQL Server instance

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
