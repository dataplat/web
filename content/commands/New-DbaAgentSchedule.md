---
title: "New-DbaAgentSchedule"
slug: "New-DbaAgentSchedule"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new SQL Server Agent schedule for automated job execution"
tags:
  - "Agent"
  - "Job"
  - "JobStep"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentSchedule.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAgentSchedule"
draft: false
---

# New-DbaAgentSchedule

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaAgentSchedule](https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentSchedule.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaAgentSchedule](https://dataplat.github.io/boh#New-DbaAgentSchedule).

## Synopsis

Creates a new SQL Server Agent schedule for automated job execution

## Description

Creates a new schedule in the msdb database that defines when SQL Server Agent jobs should execute. Schedules can be created as standalone objects or immediately attached to existing jobs, allowing you to standardize timing across multiple jobs without recreating the same schedule repeatedly. This replaces the need to manually create schedules through SQL Server Management Studio or T-SQL, while providing comprehensive validation of schedule parameters and frequency options. Supports all SQL Server Agent scheduling options including one-time, daily, weekly, monthly, and relative monthly frequencies with full control over start/end dates, times, and recurrence patterns.

## Syntax

```powershell
New-DbaAgentSchedule
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Job] <Object[]>]
    [[-Schedule] <Object>]
    [-Disabled]
    [[-FrequencyType] <Object>]
    [[-FrequencyInterval] <Object[]>]
    [[-FrequencySubdayType] <Object>]
    [[-FrequencySubdayInterval] <Int32>]
    [[-FrequencyRelativeInterval] <Object>]
    [[-FrequencyRecurrenceFactor] <Int32>]
    [[-FrequencyText] <String>]
    [[-StartDate] <String>]
    [[-EndDate] <String>]
    [[-StartTime] <String>]
    [[-EndTime] <String>]
    [[-Owner] <String>]
    [-Force]
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
PS C:\> New-DbaAgentSchedule -SqlInstance sql01 -Schedule DailyAt6 -FrequencyType Daily -StartTime "060000" -Force
```

Creates a schedule that runs jobs every day at 6 in the morning. It assumes default values for the start date, start time, end date and end time due to -Force.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaAgentSchedule -SqlInstance localhost\SQL2016 -Schedule daily -FrequencyType Daily -FrequencyInterval Everyday -Force
```

Creates a schedule with a daily frequency every day. It assumes default values for the start date, start time, end date and end time due to -Force.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaAgentSchedule -SqlInstance sstad-pc -Schedule MonthlyTest -FrequencyType Monthly -FrequencyInterval 10 -FrequencyRecurrenceFactor 1 -Force
```

Create a schedule with a monthly frequency occuring every 10th of the month. It assumes default values for the start date, start time, end date and end time due to -Force.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaAgentSchedule -SqlInstance sstad-pc -Schedule RunWeekly -FrequencyType Weekly -FrequencyInterval Sunday -StartTime 010000 -Force
```

Create a schedule that will run jobs once a week on Sunday @ 1:00AM<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaAgentSchedule -SqlInstance sstad-pc -FrequencyText 'Every sunday at 02:00:00'
```

Create a schedule with the name "Every sunday at 02:00:00" that will run jobs once a week on Sunday @ 2:00AM<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

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

##### -Job

Specifies existing SQL Server Agent jobs to immediately attach this schedule to after creation.  
Use this when you want to apply the same schedule to multiple jobs without manually attaching it later through SSMS.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schedule

The name for the new schedule that will appear in SQL Server Agent.  
Choose descriptive names like "DailyAt6AM" or "WeeklyMaintenanceWindow" to make schedule management easier for your team.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Disabled

Creates the schedule in a disabled state, preventing any attached jobs from running until the schedule is manually enabled.  
Use this when you need to set up schedules in advance but don't want them active immediately.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FrequencyType

Determines the basic execution pattern for jobs using this schedule.  
Daily runs every day or every N days, Weekly runs on specific days of the week, Monthly runs on specific dates, and MonthlyRelative runs on relative dates like "first Monday."  
Once/OneTime creates single-execution schedules, while AgentStart/AutoStart and IdleComputer/OnIdle create event-triggered schedules.  
Allowed values: 'Once', 'OneTime', 'Daily', 'Weekly', 'Monthly', 'MonthlyRelative', 'AgentStart', 'AutoStart', 'IdleComputer', 'OnIdle'  
The following synonyms provide flexibility to the allowed values for this function parameter:  
Once=OneTime  
AgentStart=AutoStart  
IdleComputer=OnIdle  
If force is used the default will be "Once".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Once,OneTime,Daily,Weekly,Monthly,MonthlyRelative,AgentStart,AutoStart,IdleComputer,OnIdle |

##### -FrequencyInterval

Defines which specific days the job executes based on the FrequencyType selected.  
For Daily: use numbers 1-365 for "every N days" or "EveryDay" for daily execution.  
For Weekly: specify day names like "Monday,Friday" or use "Weekdays," "Weekend," or "EveryDay."  
For Monthly: use numbers 1-31 to run on specific dates of each month.  
Allowed values for FrequencyType 'Daily': EveryDay or a number between 1 and 365.  
Allowed values for FrequencyType 'Weekly': Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Weekdays, Weekend or EveryDay.  
Allowed values for FrequencyType 'Monthly': Numbers 1 to 31 for each day of the month.  
If "Weekdays", "Weekend" or "EveryDay" is used it over writes any other value that has been passed before.  
If force is used the default will be 1.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FrequencySubdayType

Sets the time interval unit when jobs need to run multiple times per day.  
Use "Once" for single daily execution, "Hours" for hourly intervals, "Minutes" for minute-based intervals, or "Seconds" for very frequent execution.  
Most maintenance jobs use "Once" while monitoring jobs might use "Minutes" or "Hours."  
Allowed values: 'Once', 'Time', 'Seconds', 'Second', 'Minutes', 'Minute', 'Hours', 'Hour'  
The following synonyms provide flexibility to the allowed values for this function parameter:  
Once=Time  
Seconds=Second  
Minutes=Minute  
Hours=Hour

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Once,Time,Seconds,Second,Minutes,Minute,Hours,Hour |

##### -FrequencySubdayInterval

Specifies how often the job repeats within a day when FrequencySubdayType is not "Once."  
For example, with FrequencySubdayType "Hours" and FrequencySubdayInterval 4, the job runs every 4 hours.  
Minimum interval is 10 seconds for second-based scheduling.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -FrequencyRelativeInterval

Determines which occurrence of a day type to use for MonthlyRelative schedules.  
Use "First" for first occurrence, "Second" for second occurrence, etc., or "Last" for the final occurrence of that day in the month.  
For example, "Second" with "Friday" runs on the second Friday of each month.  
Allowed values: First, Second, Third, Fourth or Last

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Unused,First,Second,Third,Fourth,Last |

##### -FrequencyRecurrenceFactor

Controls how many weeks or months to skip between executions for Weekly, Monthly, and MonthlyRelative schedules.  
Use 1 for every week/month, 2 for every other week/month, 3 for every third, etc.  
This allows schedules like "every 2 weeks on Monday" or "every 3 months on the 15th."  
FrequencyRecurrenceFactor is used only if FrequencyType is "Weekly", "Monthly" or "MonthlyRelative".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -FrequencyText

Describe common frequencies as a text. Sample text:  
Every minute  
Every 5 minutes  
Every 10 minutes starting at 00:02:30  
Every hour  
Every 2 hours  
Every 4 hours starting at 02:00:00  
Every day at 05:00:00  
Every sunday at 02:00:00  
This is the used regex: every(\s+(?<interval>\d+))?\s+(?<unit>minute|hour|day|sunday|monday|tuesday|wednesday|thursday|friday|saturday)s?(\s+starting)?(\s+at\s+(?<start>\d\d:\d\d:\d\d))?  
If parameter Schedule is not provided, the FrequencyText will be used as the name of the schedule.  
Parameter Force will be set to $true.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StartDate

The earliest date this schedule can execute jobs, formatted as yyyyMMdd (e.g., "20240315" for March 15, 2024).  
Use this to delay schedule activation until a future date or to document when recurring maintenance should begin.  
With -Force, defaults to today's date.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EndDate

The latest date this schedule can execute jobs, formatted as yyyyMMdd (e.g., "20241231" for December 31, 2024).  
Use this for temporary schedules or to automatically deactivate seasonal jobs.  
With -Force, defaults to "99991231" (no expiration).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StartTime

The time of day when job execution can begin, formatted as HHmmss in 24-hour format (e.g., "143000" for 2:30 PM).  
For subday schedules, this is when the first execution occurs each day.  
With -Force, defaults to "000000" (midnight).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EndTime

The time of day when job execution must stop, formatted as HHmmss in 24-hour format (e.g., "180000" for 6:00 PM).  
For subday schedules, no new executions start after this time, but running jobs can complete.  
With -Force, defaults to "235959" (one second before midnight).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Owner

The SQL Server login that owns this schedule, which determines permissions for schedule modification.  
Defaults to the login running this command, but you can specify a service account or DBA login for centralized schedule management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Bypasses parameter validation and applies default values for missing required parameters like dates and times.  
Also removes any existing schedule with the same name before creating the new one, preventing naming conflicts.

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
