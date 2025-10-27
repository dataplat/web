---
title: "Get-DbaDbMailHistory"
slug: "Get-DbaDbMailHistory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Database Mail history from SQL Server's msdb database for troubleshooting and compliance"
tags:
  - "Mail"
  - "DbMail"
  - "Email"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailHistory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMailHistory"
draft: false
---

# Get-DbaDbMailHistory

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMailHistory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailHistory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMailHistory](https://dataplat.github.io/boh#Get-DbaDbMailHistory).

## Synopsis

Retrieves Database Mail history from SQL Server's msdb database for troubleshooting and compliance

## Description

Retrieves comprehensive Database Mail history from the msdb.dbo.sysmail_allitems table, including delivery status, recipients, subject lines, and timestamps. This function helps DBAs troubleshoot email delivery issues, audit mail activity for compliance reporting, and monitor Database Mail performance. You can filter results by send date or delivery status (Sent, Failed, Unsent, Retrying) to focus on specific timeframes or problem emails.

## Syntax

```powershell
Get-DbaDbMailHistory
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Since] <DateTime>]
    [[-Status] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbMailHistory -SqlInstance sql01\sharepoint
```

Returns the entire DBMail history on sql01\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMailHistory -SqlInstance sql01\sharepoint | Select-Object *
```

Returns the entire DBMail history on sql01\sharepoint then return a bunch more columns<br>

#####  Example:  3 

```powershell
PS C:\> $servers = "sql2014","sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaDbMailHistory
```

Returns the all DBMail history for "sql2014","sql2016" and "sqlcluster\sharepoint"<br>

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

Filters mail history to only include emails sent after the specified date and time.  
Use this when troubleshooting recent delivery issues or generating reports for specific time periods.  
Accepts standard PowerShell DateTime objects like (Get-Date).AddDays(-7) for the past week.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Status

Filters results to only show emails with the specified delivery status.  
Use 'Failed' to identify delivery problems, 'Unsent' for queued messages, or 'Retrying' for current retry attempts.  
Accepts multiple values: Unsent, Sent, Failed, and Retrying.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Unsent,Sent,Failed,Retrying |

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
