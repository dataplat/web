---
title: "Get-DbaDbMailLog"
slug: "Get-DbaDbMailLog"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Database Mail event logs from msdb for troubleshooting email delivery issues"
tags:
  - "Mail"
  - "DbMail"
  - "Email"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailLog.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMailLog"
draft: false
---

# Get-DbaDbMailLog

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMailLog](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailLog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMailLog](https://dataplat.github.io/boh#Get-DbaDbMailLog).

## Synopsis

Retrieves Database Mail event logs from msdb for troubleshooting email delivery issues

## Description

Retrieves Database Mail event logs from the msdb.dbo.sysmail_event_log table, providing detailed information about email send attempts, failures, and system events. This function is essential for diagnosing Database Mail problems, monitoring email delivery status, and identifying configuration issues. You can filter results by date range and event type (Error, Warning, Success, Information, Internal) to focus on specific troubleshooting scenarios rather than manually querying the mail log tables.

## Syntax

```powershell
Get-DbaDbMailLog
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Since] <DateTime>]
    [[-Type] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbMailLog -SqlInstance sql01\sharepoint
```

Returns the entire DBMail log on sql01\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMailLog -SqlInstance sql01\sharepoint | Select-Object *
```

Returns the entire DBMail log on sql01\sharepoint, includes all returned information.<br>

#####  Example:  3 

```powershell
PS C:\> $servers = "sql2014","sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaDbMailLog -Type Error, Information
```

Returns only the Error and Information DBMail log for "sql2014","sql2016" and "sqlcluster\sharepoint"<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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

##### -Since

Filters log entries to only include events that occurred on or after the specified date and time.  
Use this when troubleshooting recent mail delivery issues or investigating problems within a specific timeframe.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Filters log entries by event type to focus troubleshooting on specific mail system behaviors.  
Use 'Error' to identify failed deliveries, 'Warning' for potential issues, 'Success' to verify deliveries, 'Information' for general events, or 'Internal' for system-level Database Mail operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Error,Warning,Success,Information,Internal |

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
