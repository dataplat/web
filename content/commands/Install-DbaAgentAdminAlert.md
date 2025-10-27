---
title: "Install-DbaAgentAdminAlert"
slug: "Install-DbaAgentAdminAlert"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates standard SQL Server Agent alerts for critical system errors and disk I/O failures"
tags:
  - "Agent"
  - "Alert"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Install-DbaAgentAdminAlert.ps1"
bohUrl: "https://dataplat.github.io/boh#Install-DbaAgentAdminAlert"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Install-DbaAgentAdminAlert</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Install-DbaAgentAdminAlert.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates standard SQL Server Agent alerts for critical system errors and disk I/O failures

## Description

Creates a predefined set of SQL Server Agent alerts that monitor for critical system errors (severity levels 17-25) and disk I/O corruption errors (messages 823-825). These alerts catch serious issues like hardware failures, database corruption, insufficient resources, and fatal system errors that require immediate DBA attention.  
  
The function automatically creates alerts for severity levels 17-25 and error messages 823-825 unless specifically excluded. It can create missing operators and alert categories as needed, making it easy to establish consistent monitoring across multiple SQL Server instances.  
  
You can specify an operator to use for the alert, or it will use any operator it finds if there is just one. Alternatively, if you specify both an operator name and an email, it will create the operator if it does not exist.

## Syntax

```powershell
Install-DbaAgentAdminAlert
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Category] <String>]
    [[-Database] <String>]
    [[-Operator] <String>]
    [[-OperatorEmail] <String>]
    [[-DelayBetweenResponses] <Int32>]
    [-Disabled]
    [[-EventDescriptionKeyword] <String>]
    [[-EventSource] <String>]
    [[-JobId] <String>]
    [[-ExcludeSeverity] <Int32[]>]
    [[-ExcludeMessageId] <Int32[]>]
    [[-NotificationMessage] <String>]
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
PS C:\> Install-DbaAgentAdminAlert -SqlInstance sql1
```
{: data-copyable="true" data-clean-code="Install-DbaAgentAdminAlert -SqlInstance sql1" }

Creates alerts for severity 17-25 and messages 823-825 on sql1<br>

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

##### -Category

Assigns the alerts to a specific SQL Server Agent alert category for better organization and management. Defaults to 'Uncategorized' if not specified.  
Use this to group related alerts together, making it easier to manage alert policies and review alert activity in SQL Server Management Studio. If the category doesn't exist, it will be created   
automatically.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Restricts the alerts to fire only for errors occurring in the specified database. If not specified, alerts will fire for errors in any database on the instance.  
Use this when you want to monitor only specific critical databases and avoid noise from test or development databases on the same instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Operator

Specifies the SQL Server Agent operator who will receive notifications when these alerts are triggered. The operator must already exist on the target instance unless you also provide OperatorEmail.  
If not specified and only one operator exists on the instance, that operator will be used automatically. Required for alert notifications to function properly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -OperatorEmail

Creates a new SQL Server Agent operator with this email address if the specified operator name doesn't exist. Must be used together with the Operator parameter.  
This allows you to set up both the operator and alerts in a single command when configuring monitoring on a new instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DelayBetweenResponses

Sets the minimum time in seconds that must pass before the alert can fire again for the same condition. Prevents notification spam when errors occur repeatedly.  
Use this to avoid flooding your inbox during cascading failures or when the same error occurs multiple times in rapid succession.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Disabled

Creates the alerts in a disabled state, preventing them from firing until manually enabled. By default, alerts are created in an enabled state.  
Use this when you want to set up the alert infrastructure first and enable specific alerts later after testing or validation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -EventDescriptionKeyword

Filters alerts to fire only when the error message text contains this specific keyword or phrase. Applied in addition to the standard severity and message ID criteria.  
Use this to create more targeted alerts that focus on specific error conditions within the broader categories of critical system errors.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EventSource

Restricts alerts to fire only for errors originating from a specific event source or application. If not specified, alerts will fire regardless of the error source.  
Use this to focus monitoring on specific applications or services that interact with your SQL Server instance when you want to isolate alerts from particular systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -JobId

Specifies a SQL Server Agent job to execute automatically when any of these alerts fire. Must be a valid job GUID that exists on the target instance.  
Use this to trigger automated response scripts, such as collecting diagnostic information, attempting automatic recovery, or escalating to additional monitoring systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 00000000-0000-0000-0000-000000000000 |

##### -ExcludeSeverity

Excludes specific error severity levels from the standard alert creation. By default, the function creates alerts for severity levels 17-25 which cover resource issues, internal errors, and fatal   
system problems.  
Use this when you want to skip certain severities, perhaps because you already have custom alerts configured for them or they're not relevant to your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeMessageId

Excludes specific SQL Server error message IDs from the standard alert creation. By default, the function creates alerts for messages 823-825 which detect disk I/O hardware errors and database   
corruption issues.  
Use this when you want to skip certain message IDs, perhaps because you have existing custom alerts for these errors or they don't apply to your storage configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NotificationMessage

Customizes the message content sent to operators when an alert fires. If not specified, SQL Server uses the default system-generated message.  
Use this to include specific instructions, contact information, or troubleshooting steps that help your team respond more effectively to critical errors.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NotifyMethod

Specifies how the operator should be notified when the alert fires. Valid options are 'NotifyEmail', 'Pager', 'NetSend', 'NotifyAll', or 'None'. Defaults to 'NotifyAll'.  
Use 'NotifyEmail' for email-only notifications, 'NotifyAll' to use all configured notification methods for the operator, or 'None' to create alerts without notifications (useful for logging only).

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
