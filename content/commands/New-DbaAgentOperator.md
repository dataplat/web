---
title: "New-DbaAgentOperator"
slug: "New-DbaAgentOperator"
date: 2024-01-01
layout: "single"
author: "Tracy Boggiano (@TracyBoggiano), databasesuperhero.com"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new SQL Server Agent operator with notification settings for alerts and job failures."
tags:
  - "Agent"
  - "Operator"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentOperator.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAgentOperator"
draft: false
---

# New-DbaAgentOperator

| Property | Value |
| --- | --- |
| **Author** | Tracy Boggiano (@TracyBoggiano), databasesuperhero.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaAgentOperator](https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentOperator.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaAgentOperator](https://dataplat.github.io/boh#New-DbaAgentOperator).

## Synopsis

Creates a new SQL Server Agent operator with notification settings for alerts and job failures.

## Description

Creates SQL Server Agent operators who receive notifications when alerts fire or jobs fail. Operators are contacts that SQL Server Agent can notify via email, pager, or net send when specific events occur. You can configure pager schedules with different time windows for weekdays, weekends, and specific days to control when pager notifications are sent. This replaces the manual process of creating operators through SQL Server Management Studio and ensures consistent operator setup across multiple instances. If the operator already exists, it will not be created unless -Force is used to drop and recreate it.

## Syntax

```powershell
New-DbaAgentOperator
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [-Operator] <String>
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
    [[-FailsafeNotificationMethod] <String>]
    [-Force]
    [[-InputObject] <Server[]>]
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
PS C:\> New-DbaAgentOperator -SqlInstance sql01 -Operator DBA -EmailAddress operator@operator.com -PagerDay Everyday -Force
```

This sets a new operator named DBA with the above email address with default values to alerts everyday<br>
for all hours of the day.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaAgentOperator -SqlInstance sql01 -Operator DBA -EmailAddress operator@operator.com `
>>  -NetSendAddress dbauser1 -PagerAddress dbauser1@pager.dbatools.io -PagerDay Everyday `
>>  -SaturdayStartTime 070000 -SaturdayEndTime 180000 -SundayStartTime 080000 `
>>  -SundayEndTime 170000 -WeekdayStartTime 060000 -WeekdayEndTime 190000
```

Creates a new operator named DBA on the sql01 instance with email address operator@operator.com, net send address of dbauser1, pager address of dbauser1@pager.dbatools.io, page day as every day, <br>
Saturday start time of 7am, Saturday end time of 6pm, Sunday start time of 8am, Sunday end time of 5pm, Weekday start time of 6am, and Weekday end time of 7pm.<br>

### Required Parameters

##### -Operator

Name of the SQL Server Agent operator to create. This becomes the operator name that shows up in SSMS and can be referenced by alerts and jobs for notifications.  
Use descriptive names like 'DBA Team' or 'On-Call Admin' to identify who receives notifications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

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

##### -EmailAddress

Email address where SQL Server Agent sends alert notifications and job failure notifications. This is the primary notification method for most operators.  
Specify a monitored email address or distribution list that reaches the appropriate support staff.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NetSendAddress

Network address for receiving net send messages from SQL Server Agent. This is a legacy Windows messaging system rarely used in modern environments.  
Most organizations use email notifications instead since net send requires specific network configurations and may not work across subnets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PagerAddress

Email address for pager notifications, typically used for SMS gateways or mobile alerts. This works with email-to-SMS services provided by cellular carriers.  
Configure pager schedules with PagerDay and time parameters to control when these urgent notifications are sent.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PagerDay

Controls which days pager notifications are active for this operator. Use this to match on-call schedules or business hours when immediate alerts are needed.  
Choose 'Weekdays' for business-hour coverage, 'EveryDay' for 24/7 support, or specific days like 'Monday' through 'Sunday' for rotation schedules.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | EveryDay,Weekdays,Weekend,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday |

##### -SaturdayStartTime

Starting time for Saturday pager notifications in HHMMSS format (e.g., '080000' for 8:00 AM). Required when PagerDay includes Saturday, Weekend, or EveryDay.  
Use '000000' for midnight start times or specify business hours to limit when urgent alerts are sent.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SaturdayEndTime

Ending time for Saturday pager notifications in HHMMSS format (e.g., '180000' for 6:00 PM). Must be specified with SaturdayStartTime.  
Use '235959' for end-of-day coverage or match your organization's Saturday support hours.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SundayStartTime

Starting time for Sunday pager notifications in HHMMSS format (e.g., '090000' for 9:00 AM). Required when PagerDay includes Sunday, Weekend, or EveryDay.  
Configure based on your weekend support schedule or emergency-only coverage requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SundayEndTime

Ending time for Sunday pager notifications in HHMMSS format (e.g., '170000' for 5:00 PM). Must be specified with SundayStartTime.  
Set to match your organization's weekend support availability or use '235959' for full-day coverage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WeekdayStartTime

Starting time for weekday pager notifications in HHMMSS format (e.g., '060000' for 6:00 AM). Required when PagerDay includes Weekdays or individual weekdays.  
Typically set to business hours start time or earlier for critical production monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WeekdayEndTime

Ending time for weekday pager notifications in HHMMSS format (e.g., '190000' for 7:00 PM). Must be specified with WeekdayStartTime.  
Configure to match business hours end time or extend for after-hours support coverage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IsFailsafeOperator

Designates this operator as the failsafe operator for the SQL Server instance. The failsafe operator receives notifications when all other operators are unavailable.  
Only one failsafe operator can exist per instance, and this setting replaces any existing failsafe operator configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FailsafeNotificationMethod

Specifies how the failsafe operator receives notifications when used with IsFailsafeOperator. Choose 'NotifyEmail' for email notifications or 'NotifyPager' for pager alerts.  
Defaults to 'NotifyEmail' which works with most modern notification systems and email-to-SMS gateways.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | NotifyEmail |

##### -Force

Drops and recreates the operator if it already exists on the target instance. Without this switch, the function will skip existing operators to prevent accidental overwrites.  
Use this when updating operator configurations or when you need to ensure consistent settings across multiple environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts SQL Server Management Objects (SMO) server instances from Connect-DbaInstance via pipeline. This allows you to create operators on pre-authenticated server connections.  
Use this when you have existing server connections or need to process multiple instances with specific connection properties.

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
