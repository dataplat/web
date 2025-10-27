---
title: "Set-DbaAgentSchedule"
slug: "Set-DbaAgentSchedule"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Modifies properties of existing SQL Agent job schedules"
tags:
  - "Agent"
  - "Job"
  - "JobStep"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentSchedule.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgentSchedule"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaAgentSchedule</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentSchedule.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad, sqlstad.nl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Modifies properties of existing SQL Agent job schedules

## Description

Modifies the timing, frequency, and other properties of existing SQL Agent job schedules without recreating them. You can update schedule frequency (daily, weekly, monthly), change start/end times and dates, enable or disable schedules, and rename them. The function works with schedules already attached to jobs and validates all timing parameters to prevent invalid configurations.

## Syntax

```powershell
Set-DbaAgentSchedule
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Job] <Object[]>
    [-ScheduleName] <String>
    [[-NewName] <String>]
    [-Enabled]
    [-Disabled]
    [[-FrequencyType] <Object>]
    [[-FrequencyInterval] <Object[]>]
    [[-FrequencySubdayType] <Object>]
    [[-FrequencySubdayInterval] <Int32>]
    [[-FrequencyRelativeInterval] <Object>]
    [[-FrequencyRecurrenceFactor] <Int32>]
    [[-StartDate] <String>]
    [[-EndDate] <String>]
    [[-StartTime] <String>]
    [[-EndTime] <String>]
    [-EnableException]
    [-Force]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbaAgentSchedule -SqlInstance sql1 -Job Job1 -ScheduleName daily -Enabled
```
{: data-copyable="true" data-clean-code="Set-DbaAgentSchedule -SqlInstance sql1 -Job Job1 -ScheduleName daily -Enabled" }

Changes the schedule for Job1 with the name 'daily' to enabled<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaAgentSchedule -SqlInstance sql1 -Job Job1 -ScheduleName daily -NewName weekly -FrequencyType Weekly -FrequencyInterval Monday, Wednesday, Friday
```
{: data-copyable="true" data-clean-code="Set-DbaAgentSchedule -SqlInstance sql1 -Job Job1 -ScheduleName daily -NewName weekly -FrequencyType Weekly -FrequencyInterval Monday, Wednesday, Friday" }

Changes the schedule for Job1 with the name daily to have a new name weekly<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaAgentSchedule -SqlInstance sql1 -Job Job1, Job2, Job3 -ScheduleName daily -StartTime '230000'
```
{: data-copyable="true" data-clean-code="Set-DbaAgentSchedule -SqlInstance sql1 -Job Job1, Job2, Job3 -ScheduleName daily -StartTime '230000'" }

Changes the start time of the schedule for Job1 to 11 PM for multiple jobs<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaAgentSchedule -SqlInstance sql1, sql2, sql3 -Job Job1 -ScheduleName daily -Enabled
```
{: data-copyable="true" data-clean-code="Set-DbaAgentSchedule -SqlInstance sql1, sql2, sql3 -Job Job1 -ScheduleName daily -Enabled" }

Changes the schedule for Job1 with the name daily to enabled on multiple servers<br>

#####  Example:  5 

```powershell
PS C:\> sql1, sql2, sql3 | Set-DbaAgentSchedule -Job Job1 -ScheduleName daily -Enabled
```
{: data-copyable="true" data-clean-code="sql1, sql2, sql3 | Set-DbaAgentSchedule -Job Job1 -ScheduleName daily -Enabled" }

Changes the schedule for Job1 with the name 'daily' to enabled on multiple servers using pipe line<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Job

Specifies the name of the SQL Agent job that contains the schedule to modify. You can provide multiple job names to update schedules across different jobs.  
Use this when you need to change schedule properties for specific jobs without affecting other jobs that might share the same schedule name.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ScheduleName

Specifies the name of the existing schedule to modify within the specified job. Schedule names are case-sensitive.  
Use this to target the specific schedule when a job has multiple schedules attached to it.

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

##### -NewName

Renames the schedule to the specified new name. The new name must be unique within the job's schedules.  
Use this when you need to rename schedules for better organization or to follow naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Enabled

Activates the schedule so the job will run according to its configured timing. This overrides any disabled state.  
Use this to reactivate schedules that were previously disabled without changing their timing configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Disabled

Deactivates the schedule so the job will not run, even if it meets the timing criteria. The schedule configuration remains unchanged.  
Use this to temporarily stop jobs without deleting their schedules during maintenance windows or troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FrequencyType

Sets the overall pattern for when the job should execute. This is the primary schedule type that determines how often the job runs.  
Use 'Daily' for jobs that run every day or every few days, 'Weekly' for jobs on specific weekdays, 'Monthly' for jobs on specific dates, 'MonthlyRelative' for jobs like "first Monday of the month",   
'Once' for one-time execution, 'AgentStart' to run when SQL Agent starts, or 'OnIdle' when server is idle.  
This parameter works with FrequencyInterval to create the complete schedule pattern.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Once,OneTime,Daily,Weekly,Monthly,MonthlyRelative,AgentStart,AutoStart,IdleComputer,OnIdle,1,4,8,16,32,64,128 |

##### -FrequencyInterval

Specifies which days or intervals the job should run based on the FrequencyType. The values depend on the schedule type you choose.  
For 'Daily': Use a number (1-365) for every N days or 'EveryDay'. For 'Weekly': Use day names like Monday, Tuesday or shortcuts like 'Weekdays', 'Weekend'. For 'Monthly': Use day numbers 1-31. For   
'MonthlyRelative': Use day names for "first Monday" type schedules.  
This parameter works together with FrequencyType to define the exact timing pattern for your job schedule.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FrequencySubdayType

Defines the unit of time for running jobs multiple times within a single day. This controls what the FrequencySubdayInterval value represents.  
Use 'Once' for jobs that run only once per day, 'Hours' for jobs that repeat every few hours, 'Minutes' for jobs that run every few minutes, or 'Seconds' for very frequent execution.  
This parameter is only relevant when you need jobs to execute more than once per day at regular intervals.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 1,Once,Time,2,Seconds,Second,4,Minutes,Minute,8,Hours,Hour |

##### -FrequencySubdayInterval

Specifies how many units of the FrequencySubdayType to wait between job executions within a day. For example, 2 with 'Hours' means every 2 hours.  
Use this to control the frequency of recurring jobs throughout the day, such as every 15 minutes for monitoring jobs or every 4 hours for maintenance tasks.  
Valid ranges are 1-59 for seconds/minutes and 1-23 for hours.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -FrequencyRelativeInterval

Specifies which occurrence of the day within the month for MonthlyRelative schedules. Controls whether you want the first, second, third, fourth, or last occurrence.  
Use this for schedules like "first Monday of every month" (First + Monday) or "last Friday of every month" (Last + Friday). Only applies when FrequencyType is 'MonthlyRelative'.  
Common values are 'First', 'Second', 'Third', 'Fourth', or 'Last'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Unused,First,Second,Third,Fourth,Last |

##### -FrequencyRecurrenceFactor

Controls how often the schedule repeats by specifying the interval between occurrences. For weekly schedules, this is the number of weeks between runs; for monthly schedules, it's the number of   
months.  
Use this to create schedules like "every 2 weeks on Monday" (FrequencyRecurrenceFactor=2) or "every 3 months on the 15th" (FrequencyRecurrenceFactor=3). Only applies to Weekly, Monthly, and   
MonthlyRelative frequency types.  
Must be at least 1, and is commonly used for less frequent maintenance tasks or reports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -StartDate

Sets the earliest date when the schedule becomes active and the job can start running. Must be in yyyyMMdd format (e.g., '20240315').  
Use this to delay job execution until a future date or to replace an existing start date. The schedule will not run before this date even if other timing conditions are met.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EndDate

Sets the last date when the schedule will be active and can execute the job. Must be in yyyyMMdd format and cannot be before StartDate.  
Use this to automatically disable schedules after a specific date, useful for temporary jobs or time-limited maintenance tasks. After this date, the schedule remains but will not execute.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StartTime

Sets the daily start time when the job can begin executing, using 24-hour format HHMMSS (e.g., '080000' for 8:00 AM, '143000' for 2:30 PM).  
Use this to schedule jobs during specific maintenance windows or business hours. For jobs with subday frequency, this is when the recurring pattern starts each day.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EndTime

Sets the daily end time when the job can no longer start executing, using 24-hour format HHMMSS (e.g., '180000' for 6:00 PM, '235959' for just before midnight).  
Use this to prevent jobs from starting during peak business hours or to ensure long-running jobs complete before critical operations begin. For recurring jobs, this stops new executions but doesn't   
kill running jobs.

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

##### -Force

Bypasses some parameter validation errors by applying sensible defaults and removes any existing schedules with the same name before creating new ones.  
Use this when you want to overwrite existing schedules or when working with edge cases where strict validation might prevent legitimate schedule modifications.  
Be cautious as this can remove existing schedules without prompting.

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
