---
title: "Set-DbaAgentJob"
slug: "Set-DbaAgentJob"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Modifies existing SQL Server Agent job properties and notification settings."
tags:
  - "Agent"
  - "Job"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJob.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgentJob"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaAgentJob</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJob.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Modifies existing SQL Server Agent job properties and notification settings.

## Description

Updates various properties of SQL Server Agent jobs including job name, description, owner, enabled/disabled status, notification settings, and schedule assignments. This function lets you modify jobs without using SQL Server Management Studio, making it useful for standardizing job configurations across multiple instances or automating job maintenance tasks. You can update individual jobs or perform bulk changes across multiple jobs and SQL Server instances simultaneously.

## Syntax

```powershell
Set-DbaAgentJob
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Job] <Object[]>]
    [[-Schedule] <Object[]>]
    [[-ScheduleId] <Int32[]>]
    [[-NewName] <String>]
    [-Enabled]
    [-Disabled]
    [[-Description] <String>]
    [[-StartStepId] <Int32>]
    [[-Category] <String>]
    [[-OwnerLogin] <String>]
    [[-EventLogLevel] <Object>]
    [[-EmailLevel] <Object>]
    [[-NetsendLevel] <Object>]
    [[-PageLevel] <Object>]
    [[-EmailOperator] <String>]
    [[-NetsendOperator] <String>]
    [[-PageOperator] <String>]
    [[-DeleteLevel] <Object>]
    [-Force]
    [[-InputObject] <Job[]>]
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
PS C:\> Set-DbaAgentJob sql1 -Job Job1 -Disabled
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJob sql1 -Job Job1 -Disabled" }

Changes the job to disabled<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaAgentJob sql1 -Job Job1 -OwnerLogin user1
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJob sql1 -Job Job1 -OwnerLogin user1" }

Changes the owner of the job<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaAgentJob -SqlInstance sql1 -Job Job1 -EventLogLevel OnSuccess
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJob -SqlInstance sql1 -Job Job1 -EventLogLevel OnSuccess" }

Changes the job and sets the notification to write to the Windows Application event log on success<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaAgentJob -SqlInstance sql1 -Job Job1 -EmailLevel OnFailure -EmailOperator dba
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJob -SqlInstance sql1 -Job Job1 -EmailLevel OnFailure -EmailOperator dba" }

Changes the job and sets the notification to send an e-mail to the e-mail operator<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaAgentJob -SqlInstance sql1 -Job Job1, Job2, Job3 -Enabled
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJob -SqlInstance sql1 -Job Job1, Job2, Job3 -Enabled" }

Changes multiple jobs to enabled<br>

#####  Example:  6 

```powershell
PS C:\> Set-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job Job1, Job2, Job3 -Enabled
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job Job1, Job2, Job3 -Enabled" }

Changes multiple jobs to enabled on multiple servers<br>

#####  Example:  7 

```powershell
PS C:\> Set-DbaAgentJob -SqlInstance sql1 -Job Job1 -Description 'Just another job' -Whatif
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJob -SqlInstance sql1 -Job Job1 -Description 'Just another job' -Whatif" }

Doesn't Change the job but shows what would happen.<br>

#####  Example:  8 

```powershell
PS C:\> Set-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job 'Job One' -Description 'Job One'
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job 'Job One' -Description 'Job One'" }

Changes a job with the name "Job1" on multiple servers to have another description<br>

#####  Example:  9 

```powershell
PS C:\> sql1, sql2, sql3 | Set-DbaAgentJob -Job Job1 -Description 'Job One'
```
{: data-copyable="true" data-clean-code="sql1, sql2, sql3 | Set-DbaAgentJob -Job Job1 -Description 'Job One'" }

Changes a job with the name "Job1" on multiple servers to have another description using pipe line<br>

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

##### -Job

Specifies the name of the SQL Server Agent job to modify. Accepts wildcards and multiple job names.  
Use this to target specific jobs for configuration changes rather than modifying all jobs on an instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schedule

Attaches existing shared schedules to the job by name. Accepts multiple schedule names.  
Use this when you need to assign predefined schedules to jobs without recreating scheduling logic.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ScheduleId

Attaches existing shared schedules to the job by their numeric ID. Accepts multiple schedule IDs.  
Use this when you know the specific schedule ID numbers and want to avoid potential name conflicts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NewName

Renames the job to the specified name. The new name must be unique within the SQL Server instance.  
Use this when standardizing job names across environments or fixing naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Enabled

Enables the job so it can be executed by SQL Server Agent schedules or manual execution.  
Use this when reactivating disabled jobs or deploying jobs that should run immediately.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Disabled

Disables the job to prevent it from running on schedule or manual execution.  
Use this when temporarily stopping jobs during maintenance windows or permanently deactivating obsolete jobs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Description

Updates the job's description field with explanatory text about the job's purpose or functionality.  
Use this to document what the job does, when it should run, or special requirements for maintenance teams.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StartStepId

Sets which job step should execute first when the job runs. Must correspond to an existing step ID within the job.  
Use this when you need to change the job's execution flow or skip initial steps during testing or maintenance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Category

Assigns the job to a specific job category for organizational purposes. Creates the category if it doesn't exist when used with -Force.  
Use this to group related jobs together for easier management and reporting in SQL Server Management Studio.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -OwnerLogin

Changes the job owner to the specified SQL Server login. The login must already exist on the instance.  
Use this when reassigning job ownership for security compliance or when the current owner login is being removed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EventLogLevel

Controls when job execution results are logged to the Windows Application Event Log. Values: Never, OnSuccess, OnFailure, Always (or 0-3).  
Use this to integrate job monitoring with Windows event log monitoring systems or reduce log noise by only logging failures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,Never,1,OnSuccess,2,OnFailure,3,Always |

##### -EmailLevel

Determines when to send email notifications about job completion. Values: Never, OnSuccess, OnFailure, Always (or 0-3).  
Must be used with EmailOperator parameter. Use this to set up automated job failure notifications to the DBA team.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,Never,1,OnSuccess,2,OnFailure,3,Always |

##### -NetsendLevel

Controls when to send network messages (net send) about job completion. Values: Never, OnSuccess, OnFailure, Always (or 0-3).  
Must be used with NetsendOperator parameter. Note that net send is deprecated and rarely used in modern environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,Never,1,OnSuccess,2,OnFailure,3,Always |

##### -PageLevel

Determines when to send pager notifications about job completion. Values: Never, OnSuccess, OnFailure, Always (or 0-3).  
Must be used with PageOperator parameter. Use this for critical jobs requiring immediate attention when they fail.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,Never,1,OnSuccess,2,OnFailure,3,Always |

##### -EmailOperator

Specifies which SQL Server Agent operator receives email notifications when EmailLevel conditions are met. The operator must already exist.  
Use this to assign job failure notifications to specific DBA team members or distribution lists.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NetsendOperator

Specifies which SQL Server Agent operator receives network messages when NetsendLevel conditions are met. The operator must already exist.  
Rarely used in modern environments due to the deprecation of the net send functionality.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PageOperator

Specifies which SQL Server Agent operator receives pager notifications when PageLevel conditions are met. The operator must already exist.  
Use this for high-priority jobs where immediate mobile notification is required for on-call DBAs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DeleteLevel

Controls when the job should automatically delete itself after execution. Values: Never, OnSuccess, OnFailure, Always (or 0-3).  
Use this for one-time jobs like data migrations or temporary maintenance tasks that should clean up after completion.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,Never,1,OnSuccess,2,OnFailure,3,Always |

##### -Force

Bypasses validation checks and creates missing job categories when specified with the Category parameter.  
Use this when you want to create new categories during job updates without having to pre-create them separately.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts SQL Server Agent job objects from the pipeline, typically from Get-DbaAgentJob output.  
Use this to chain job operations together or when working with job objects retrieved from other dbatools commands.

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
