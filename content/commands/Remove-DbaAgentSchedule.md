---
title: "Remove-DbaAgentSchedule"
slug: "Remove-DbaAgentSchedule"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server Agent schedules from one or more instances."
tags:
  - "Agent"
  - "Job"
  - "Schedule"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentSchedule.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgentSchedule"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaAgentSchedule</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentSchedule.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad), sqlstad.nl</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Removes SQL Server Agent schedules from one or more instances.

## Description

Removes SQL Server Agent schedules from the msdb database, handling both unused schedules and those currently assigned to jobs. The function first removes schedule associations from any jobs using the schedule, then drops the schedule itself to prevent orphaned references. Use this when cleaning up unused schedules during maintenance, consolidating multiple schedules, or removing schedules as part of job reorganization. By default, schedules in use by jobs are protected and require the -Force parameter to remove.

## Syntax

```powershell
Remove-DbaAgentSchedule
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Schedule] <String[]>]
    [[-ScheduleUid] <String[]>]
    [[-Id] <Int32[]>]
    [[-InputObject] <ScheduleBase[]>]
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
PS C:\> Remove-DbaAgentSchedule -SqlInstance sql1 -Schedule weekly
```
{: data-copyable="true" data-clean-code="Remove-DbaAgentSchedule -SqlInstance sql1 -Schedule weekly" }

Remove the schedule weekly.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaAgentSchedule -SqlInstance sql1 -Schedule weekly -Force
```
{: data-copyable="true" data-clean-code="Remove-DbaAgentSchedule -SqlInstance sql1 -Schedule weekly -Force" }

Remove the schedule weekly even if the schedule is being used by jobs.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaAgentSchedule -SqlInstance sql1 -Schedule daily, weekly
```
{: data-copyable="true" data-clean-code="Remove-DbaAgentSchedule -SqlInstance sql1 -Schedule daily, weekly" }

Remove multiple schedules.<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaAgentSchedule -SqlInstance sql1, sql2, sql3 -Schedule daily, weekly
```
{: data-copyable="true" data-clean-code="Remove-DbaAgentSchedule -SqlInstance sql1, sql2, sql3 -Schedule daily, weekly" }

Remove the schedule on multiple servers for multiple schedules.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance sql1 -Schedule sched1, sched2, sched3 | Remove-DbaAgentSchedule
```
{: data-copyable="true" data-clean-code="Get-DbaAgentSchedule -SqlInstance sql1 -Schedule sched1, sched2, sched3 | Remove-DbaAgentSchedule" }

Remove the schedules using a pipeline.<br>

#####  Example:  6 

```powershell
PS C:\> Remove-DbaAgentSchedule -SqlInstance sql1, sql2, sql3 -ScheduleUid 'bf57fa7e-7720-4936-85a0-87d279db7eb7'
```
{: data-copyable="true" data-clean-code="Remove-DbaAgentSchedule -SqlInstance sql1, sql2, sql3 -ScheduleUid 'bf57fa7e-7720-4936-85a0-87d279db7eb7'" }

Remove the schedules using the schedule uid.<br>

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

##### -Schedule

Specifies the name(s) of SQL Server Agent schedules to remove from the msdb database.  
Use this when you know the schedule name but need to be aware that multiple schedules can share the same name.  
When multiple schedules have identical names, you'll need to use -Id or -ScheduleUid to target a specific schedule.

| Property | Value |
| --- | --- |
| Alias | Schedules,Name |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ScheduleUid

Specifies the unique GUID identifier of specific SQL Server Agent schedules to remove.  
Use this when you need to target an exact schedule, especially when multiple schedules share the same name.  
The ScheduleUid ensures you're removing the precise schedule without ambiguity.

| Property | Value |
| --- | --- |
| Alias | Uid |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Id

Specifies the numeric schedule ID(s) to remove from SQL Server Agent.  
Use this when you have the specific schedule ID number, typically obtained from Get-DbaAgentSchedule output.  
The ID provides an alternative to name-based removal when dealing with duplicate schedule names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts schedule objects from the pipeline, typically from Get-DbaAgentSchedule output.  
Use this when you want to filter schedules first with Get-DbaAgentSchedule, then pipe the results for removal.  
This approach allows for complex filtering and review before deletion.

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

##### -Force

Bypasses the protection that prevents removal of schedules currently assigned to jobs.  
Without this parameter, schedules in use by jobs are protected and will not be removed.  
Use this when you need to clean up schedules and automatically remove their job associations first.

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
