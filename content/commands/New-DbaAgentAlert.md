---
title: "New-DbaAgentAlert"
slug: "New-DbaAgentAlert"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates SQL Server Agent alerts for automated monitoring and notification of errors, performance conditions, or system events"
tags:
  - "Agent"
  - "Alert"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentAlert.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAgentAlert"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaAgentAlert</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentAlert.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates SQL Server Agent alerts for automated monitoring and notification of errors, performance conditions, or system events

## Description

Creates new SQL Server Agent alerts that monitor for specific error severities, message IDs, performance conditions, or WMI events. Alerts can automatically notify operators via email, pager, or net send when triggered, and optionally execute jobs in response to the monitored condition. Supports configurable notification delays to prevent alert spam and can target specific databases or system-wide monitoring scenarios.

## Syntax

```powershell
New-DbaAgentAlert
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Alert] <String>
    [[-Category] <String>]
    [[-Database] <String>]
    [[-Operator] <String[]>]
    [[-DelayBetweenResponses] <Int32>]
    [-Disabled]
    [[-EventDescriptionKeyword] <String>]
    [[-EventSource] <String>]
    [[-JobId] <String>]
    [[-Severity] <Int32>]
    [[-MessageId] <Int32>]
    [[-NotificationMessage] <String>]
    [[-PerformanceCondition] <String>]
    [[-WmiEventNamespace] <String>]
    [[-WmiEventQuery] <String>]
    [[-NotifyMethod] <String>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $parms = @{
```
{: data-copyable="true" data-clean-code="$parms = @{" }

SqlInstance           = "sql01"<br>
        Severity              = 18<br>
        Alert                 = "Severity 018 - Nonfatal Internal Error"<br>
        DelayBetweenResponses = 60<br>
        NotifyMethod          = "NotifyEmail"<br>
    }<br>

```powershell
PS C:\> $alert = New-DbaAgentAlert @parms
```
{: data-copyable="true" data-clean-code="$alert = New-DbaAgentAlert @parms" }

Creates a new alert for severity 18 with the name Severity 018 - Nonfatal Internal Error.<br>
It will send an email to the default operator and wait 60 seconds before sending another email.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Alert

Specifies the name for the new SQL Server Agent alert. Must be unique within the SQL Server instance.  
Use descriptive names that clearly identify the alert's purpose, such as 'High Severity Errors' or 'Database Full'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -Category

Assigns the alert to a specific category for organization and management purposes.  
Categories help group related alerts together in SQL Server Management Studio and can be used for filtering in reports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Restricts the alert to monitor events occurring only in the specified database.  
Leave blank to monitor all databases on the instance, or specify a database name to limit scope and reduce false positives.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Operator

Specifies which SQL Server Agent operators will receive notifications when this alert fires.  
The operators must already exist and be configured with valid email addresses, pager numbers, or net send addresses.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DelayBetweenResponses

Sets the minimum time in seconds between alert notifications to prevent notification spam.  
Use higher values like 300-900 seconds for recurring issues to avoid overwhelming operators with repeated alerts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 60 |

##### -Disabled

Creates the alert in a disabled state, preventing it from triggering until manually enabled.  
Useful when setting up alerts during maintenance windows or when you need to configure notifications before activating monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -EventDescriptionKeyword

Filters alert triggers to only events containing this keyword in the error message text.  
Use this to create targeted alerts for specific error conditions like 'deadlock', 'timeout', or 'corruption' within broader error categories.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EventSource

Identifies the source application or component for WMI event monitoring.  
Required when creating WMI-based alerts to specify which system component's events should trigger the alert.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -JobId

Specifies the GUID of a SQL Server Agent job to automatically execute when the alert fires.  
Use this for automated responses like running diagnostics, performing cleanup, or triggering failover procedures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 00000000-0000-0000-0000-000000000000 |

##### -Severity

Sets the SQL Server error severity level that triggers this alert, ranging from 0-25.  
Common values include 16-18 for user errors, 19-21 for resource issues, and 22-25 for system errors requiring immediate attention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MessageId

Creates an alert that triggers on a specific SQL Server error message number.  
Use this for precise monitoring of known error conditions like message 9002 (transaction log full) or 825 (read-retry errors).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -NotificationMessage

Defines custom text to include in alert notifications sent to operators.  
Use this to provide context, troubleshooting steps, or escalation procedures specific to this alert condition.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PerformanceCondition

Defines a performance counter condition that triggers the alert when threshold values are exceeded.  
Specify conditions like 'SQLServer:General Statistics|Logins/sec|>|100' to monitor performance metrics and respond to resource issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WmiEventNamespace

Specifies the WMI namespace to monitor for events, typically 'root\cimv2' for system events.  
Required when creating WMI-based alerts to monitor Windows system events, hardware failures, or application-specific WMI providers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WmiEventQuery

Defines the WQL (WMI Query Language) query that determines which WMI events trigger the alert.  
Use queries like 'SELECT * FROM Win32_VolumeChangeEvent' to monitor specific system events outside of SQL Server's direct control.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NotifyMethod

The method to use to notify the user of the alert. Valid values are 'None', 'NotifyEmail', 'Pager', 'NetSend', 'NotifyAll'. It is NotifyAll by default.  
The Pager and net send options will be removed from SQL Server Agent in a future version of Microsoft SQL Server.  
Avoid using these features in new development work, and plan to modify applications that currently use these features.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | NotifyAll |
| Accepted Values | None,NotifyEmail,Pager,NetSend,NotifyAll |

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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
