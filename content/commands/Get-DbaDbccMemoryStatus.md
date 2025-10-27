---
title: "Get-DbaDbccMemoryStatus"
slug: "Get-DbaDbccMemoryStatus"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Executes DBCC MEMORYSTATUS and returns memory usage details in a structured format"
tags:
  - "DBCC"
  - "Memory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccMemoryStatus.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbccMemoryStatus"
draft: false
---

# Get-DbaDbccMemoryStatus

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbccMemoryStatus](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccMemoryStatus.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbccMemoryStatus](https://dataplat.github.io/boh#Get-DbaDbccMemoryStatus).

## Synopsis

Executes DBCC MEMORYSTATUS and returns memory usage details in a structured format

## Description

Runs DBCC MEMORYSTATUS against SQL Server instances and parses the output into a structured PowerShell object for analysis. This replaces the need to manually execute DBCC MEMORYSTATUS and interpret its raw text output, making memory troubleshooting and monitoring much easier. The function organizes memory statistics by type (like Memory Manager, Buffer Manager, Resource Pool, etc.) and provides both the metric names and values in a consistent format across multiple instances. Useful for diagnosing memory pressure, understanding memory allocation patterns, and comparing memory usage across environments.  
  
Reference:  
    - https://blogs.msdn.microsoft.com/timchapman/2012/08/16/how-to-parse-dbcc-memorystatus-via-powershell/  
    - https://support.microsoft.com/en-us/help/907877/how-to-use-the-dbcc-memorystatus-command-to-monitor-memory-usage-on-sq

## Syntax

```powershell
Get-DbaDbccMemoryStatus
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
PS C:\> Get-DbaDbccMemoryStatus -SqlInstance sqlcluster, sqlserver2012
```

Get output of DBCC MEMORYSTATUS for instances "sqlcluster" and "sqlserver2012". Returns results in a single recordset.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlcluster | Get-DbaDbccMemoryStatus
```

Get output of DBCC MEMORYSTATUS for all servers in Server Central Management Server<br>

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
