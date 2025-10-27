---
title: "Get-DbaDeprecatedFeature"
slug: "Get-DbaDeprecatedFeature"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies deprecated SQL Server features currently in use with their usage counts from performance counters."
tags:
  - "Deprecated"
  - "General"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDeprecatedFeature.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDeprecatedFeature"
draft: false
---

# Get-DbaDeprecatedFeature

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDeprecatedFeature](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDeprecatedFeature.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDeprecatedFeature](https://dataplat.github.io/boh#Get-DbaDeprecatedFeature).

## Synopsis

Identifies deprecated SQL Server features currently in use with their usage counts from performance counters.

## Description

Queries the sys.dm_os_performance_counters system view to identify which deprecated SQL Server features have been used on your instances and how frequently they've been accessed. This information is essential for upgrade planning, as deprecated features may be removed in future SQL Server versions and could cause application failures.  
  
The function returns only features that have been used (usage count greater than zero), helping you prioritize which code needs to be modernized before upgrading SQL Server. Common deprecated features include old JOIN syntax, legacy data types, and obsolete T-SQL functions.  
  
More information: https://learn.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-deprecated-features-object

## Syntax

```powershell
Get-DbaDeprecatedFeature
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
PS C:\> Get-DbaDeprecatedFeature -SqlInstance sql2008, sqlserver2012
```

Get usage information relating to deprecated features on the servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDeprecatedFeature -SqlInstance sql2008
```

Get usage information relating to deprecated features on server sql2008.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance

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
