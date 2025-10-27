---
title: "Set-DbaAgentOperator"
slug: "Set-DbaAgentOperator"
date: 2024-01-01
layout: "single"
author: "Tracy Boggiano (@TracyBoggiano), databasesuperhero.com"
availability: "Windows, Linux, macOS"
synopsis: "Modifies existing SQL Agent operator contact details, pager schedules, and failsafe settings."
tags:
  - "Agent"
  - "Operator"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentOperator.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgentOperator"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaAgentOperator</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentOperator.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Tracy Boggiano (@TracyBoggiano), databasesuperhero.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Modifies existing SQL Agent operator contact details, pager schedules, and failsafe settings.

## Description

Modifies existing SQL Agent operators by updating their contact information, pager notification schedules, and failsafe operator configuration. This lets you change email addresses, pager contacts, net send addresses, and specify when pager notifications should be active without having to manually update operators through SQL Server Management Studio. You can also designate an operator as the failsafe operator that receives notifications when the primary assigned operators are unavailable.

## Syntax

```powershell
Set-DbaAgentOperator
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Operator] <String[]>]
    [[-Name] <String>]
    [[-EmailAddress] <String>]
    [[-NetSendAddress] <String>]
    [[-PagerAddress] <String>]
    [[-PagerDay] <String>]
    [[-SaturdayStartTime] <String>]
    [[-SaturdayEndTime] <String>]
    [[-SundayStartTime] <String>]
    [[-SundayEndTime] <String>]
    [[-WeekdayStartTime] <String>]
    [[-WeekdayEndTime] <String>]
    [-IsFailsafeOperator]
    [[-FailsafeNotificationMethod] <String[]>]
    [[-InputObject] <Operator[]>]
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
PS C:\> Set-DbaAgentOperator -SqlInstance sql01 -Operator DBA -EmailAddress operator@operator.com -PagerDay Everyday
```
{: data-copyable="true" data-clean-code="Set-DbaAgentOperator -SqlInstance sql01 -Operator DBA -EmailAddress operator@operator.com -PagerDay Everyday" }

This sets the operator named DBA with the above email address with default values to alerts everyday for all hours of the day.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaAgentOperator -SqlInstance sql01 -Operator DBA -EmailAddress operator@operator.com `
>>  -NetSendAddress dbauser1 -PagerAddress dbauser1@pager.dbatools.io -PagerDay Everyday `
>>  -SaturdayStartTime 070000 -SaturdayEndTime 180000 -SundayStartTime 080000 `
>>  -SundayEndTime 170000 -WeekdayStartTime 060000 -WeekdayEndTime 190000
```
{: data-copyable="true" data-clean-code="Set-DbaAgentOperator -SqlInstance sql01 -Operator DBA -EmailAddress operator@operator.com `
-NetSendAddress dbauser1 -PagerAddress dbauser1@pager.dbatools.io -PagerDay Everyday `
-SaturdayStartTime 070000 -SaturdayEndTime 180000 -SundayStartTime 080000 `
-SundayEndTime 170000 -WeekdayStartTime 060000 -WeekdayEndTime 190000" }

Creates a new operator named DBA on the sql01 instance with email address operator@operator.com, net send address of dbauser1, pager address of dbauser1@pager.dbatools.io, page day as every day, <br>
Saturday start time of 7am, Saturday end time of 6pm, Sunday start time of 8am, Sunday end time of 5pm, Weekday start time of 6am, and Weekday end time of 7pm.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

##### -Operator

Specifies the name of the existing SQL Agent operator to modify. Use this when targeting a specific operator by name instead of piping operator objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Renames the operator to the specified value. Use this when you need to change an operator's name while preserving all other settings and alert assignments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EmailAddress

Sets the email address where SQL Agent will send email notifications for this operator. This is the primary contact method for most alert notifications and job failure messages.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NetSendAddress

Specifies the network computer name for net send notifications. This legacy notification method sends popup messages to Windows computers on the same network domain.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PagerAddress

Sets the pager email address for urgent notifications. Typically used for SMS gateways or mobile email addresses when immediate notification is required outside normal business hours.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PagerDay

Controls which days pager notifications are active for this operator. Use 'Weekdays' for business hours coverage, 'Weekend' for off-hours support, or specific days for rotating on-call schedules.  
Valid values are 'EveryDay', 'Weekdays', 'Weekend', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', and 'Saturday'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | EveryDay,Weekdays,Weekend,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday |

##### -SaturdayStartTime

Sets when pager notifications begin on Saturday in HHMMSS format (e.g., '080000' for 8:00 AM). Use this to define weekend on-call coverage hours for the operator.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SaturdayEndTime

Sets when pager notifications end on Saturday in HHMMSS format (e.g., '180000' for 6:00 PM). Notifications outside this window will use email instead of pager for the operator.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SundayStartTime

Sets when pager notifications begin on Sunday in HHMMSS format (e.g., '080000' for 8:00 AM). Use this to define weekend on-call coverage hours for the operator.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SundayEndTime

Sets when pager notifications end on Sunday in HHMMSS format (e.g., '170000' for 5:00 PM). Notifications outside this window will use email instead of pager for the operator.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WeekdayStartTime

Sets when pager notifications begin on weekdays (Monday-Friday) in HHMMSS format (e.g., '060000' for 6:00 AM). Use this to define business hours pager coverage for the operator.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WeekdayEndTime

Sets when pager notifications end on weekdays (Monday-Friday) in HHMMSS format (e.g., '190000' for 7:00 PM). Notifications outside this window will use email instead of pager for the operator.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IsFailsafeOperator

Designates this operator as the failsafe operator who receives notifications when primary operators are unavailable. Only one failsafe operator can exist per SQL Server instance, so this replaces any   
existing failsafe operator.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FailsafeNotificationMethod

Specifies how the failsafe operator receives notifications when primary operators cannot be reached. Use 'NotifyEmail' for standard alerts, 'Pager' for urgent notifications, or 'NotifyAll' for   
maximum coverage.  
Valid values are 'None', 'NotifyEmail', 'Pager', 'NetSend', 'NotifyAll'. Multiple methods can be combined except 'None' and 'NotifyAll' which must be used alone.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | NotifyEmail |
| Accepted Values | None,NotifyEmail,Pager,NetSend,NotifyAll |

##### -InputObject

Accepts SQL Agent operator objects from the pipeline, typically from Get-DbaAgentOperator. Use this to modify multiple operators or when working with operator objects in a pipeline workflow.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
