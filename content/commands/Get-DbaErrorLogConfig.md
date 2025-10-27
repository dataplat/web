---
title: "Get-DbaErrorLogConfig"
slug: "Get-DbaErrorLogConfig"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server error log configuration settings including file count, size limits, and storage location"
tags:
  - "Instance"
  - "ErrorLog"
  - "Logging"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaErrorLogConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaErrorLogConfig"
draft: false
---

# Get-DbaErrorLogConfig

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaErrorLogConfig](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaErrorLogConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaErrorLogConfig](https://dataplat.github.io/boh#Get-DbaErrorLogConfig).

## Synopsis

Retrieves SQL Server error log configuration settings including file count, size limits, and storage location

## Description

Retrieves current error log configuration from SQL Server instances, showing how many log files are retained, where they're stored, and size limits if configured. This information helps DBAs understand log retention policies and troubleshoot logging issues without connecting to SQL Server Management Studio. Log size information is only available on SQL Server 2012 and later versions.

## Syntax

```powershell
Get-DbaErrorLogConfig
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
PS C:\> Get-DbaErrorLogConfig -SqlInstance server2017,server2014
```

Returns error log configuration for server2017 and server2014<br>

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
