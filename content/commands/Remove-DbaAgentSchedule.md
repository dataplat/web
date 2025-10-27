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

# Remove-DbaAgentSchedule

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgentSchedule](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentSchedule.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgentSchedule](https://dataplat.github.io/boh#Remove-DbaAgentSchedule).

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

Remove the schedule weekly.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaAgentSchedule -SqlInstance sql1 -Schedule weekly -Force
```

Remove the schedule weekly even if the schedule is being used by jobs.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaAgentSchedule -SqlInstance sql1 -Schedule daily, weekly
```

Remove multiple schedules.<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaAgentSchedule -SqlInstance sql1, sql2, sql3 -Schedule daily, weekly
```

Remove the schedule on multiple servers for multiple schedules.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance sql1 -Schedule sched1, sched2, sched3 | Remove-DbaAgentSchedule
```

Remove the schedules using a pipeline.<br>

#####  Example:  6 

```powershell
PS C:\> Remove-DbaAgentSchedule -SqlInstance sql1, sql2, sql3 -ScheduleUid 'bf57fa7e-7720-4936-85a0-87d279db7eb7'
```

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
