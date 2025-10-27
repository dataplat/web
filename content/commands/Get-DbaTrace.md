---
title: "Get-DbaTrace"
slug: "Get-DbaTrace"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server trace information including status, file paths, and configuration details"
tags:
  - "Trace"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTrace.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaTrace"
draft: false
---

# Get-DbaTrace

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaTrace](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTrace.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaTrace](https://dataplat.github.io/boh#Get-DbaTrace).

## Synopsis

Retrieves SQL Server trace information including status, file paths, and configuration details

## Description

Queries the sys.traces system view to return detailed information about active and configured traces on a SQL Server instance. This includes trace status, file locations, buffer settings, event counts, and timing data. Commonly used for monitoring trace activity, auditing trace configurations, and locating the default system trace file for troubleshooting and compliance purposes.

## Syntax

```powershell
Get-DbaTrace
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Id] <Int32[]>]
    [-Default]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2016
```

Lists all the trace files on the sql2016 SQL Server.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2016 -Default
```

Lists the default trace information on the sql2016 SQL Server.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

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

##### -Id

Specifies the trace ID(s) to retrieve information for. Accepts single values or arrays of trace IDs.  
Use this when you need to check specific traces instead of retrieving all configured traces on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Default

Returns only the default system trace (usually trace ID 1) which SQL Server automatically creates for auditing DDL operations.  
Use this when you need to locate the default trace file for troubleshooting schema changes, login events, or security auditing.

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
