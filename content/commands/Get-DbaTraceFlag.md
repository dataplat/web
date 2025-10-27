---
title: "Get-DbaTraceFlag"
slug: "Get-DbaTraceFlag"
date: 2024-01-01
layout: "single"
author: "Kevin Bullen (@sqlpadawan)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves currently enabled global trace flags from SQL Server instances."
tags:
  - "Diagnostic"
  - "TraceFlag"
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTraceFlag.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaTraceFlag"
draft: false
---

# Get-DbaTraceFlag

| Property | Value |
| --- | --- |
| **Author** | Kevin Bullen (@sqlpadawan) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaTraceFlag](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTraceFlag.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaTraceFlag](https://dataplat.github.io/boh#Get-DbaTraceFlag).

## Synopsis

Retrieves currently enabled global trace flags from SQL Server instances.

## Description

Queries SQL Server instances to identify which global trace flags are currently active, returning detailed status information for monitoring and compliance purposes. This is essential for auditing server configurations, troubleshooting performance issues, and ensuring trace flag consistency across environments. You can filter results to specific trace flag numbers or retrieve all enabled flags across multiple instances.

## Syntax

```powershell
Get-DbaTraceFlag
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-TraceFlag] <Int32[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaTraceFlag -SqlInstance localhost
```

Returns all Trace Flag information on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaTraceFlag -SqlInstance localhost, sql2016
```

Returns all Trace Flag(s) for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTraceFlag -SqlInstance localhost -TraceFlag 4199,3205
```

Returns Trace Flag status for TF 4199 and 3205 for the local SQL Server instance if they are enabled.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

##### -TraceFlag

Specifies one or more trace flag numbers to filter the results. Only returns information for the specified trace flags if they are currently enabled.  
Use this when you need to check the status of specific trace flags rather than reviewing all enabled flags on the instance.

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
