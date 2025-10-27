---
title: "New-DbaAgentJob"
slug: "New-DbaAgentJob"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Creates SQL Server Agent jobs with notification settings and schedule assignments"
tags:
  - "Agent"
  - "Job"
  - "JobStep"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentJob.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAgentJob"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaAgentJob</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentJob.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates SQL Server Agent jobs with notification settings and schedule assignments

## Description

Creates SQL Server Agent jobs with full configuration options including owner assignment, job categories, and comprehensive notification settings.  
You can configure email, event log, pager, and netsend notifications with specific operators and trigger conditions (success, failure, completion).  
The function also supports attaching existing schedules during job creation and can automatically create missing job categories when using -Force.  
This replaces the manual process of using SQL Server Management Studio or T-SQL scripts to create and configure Agent jobs across multiple instances.

## Syntax

```powershell
New-DbaAgentJob
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Job] <String>
    [[-Schedule] <Object[]>]
    [[-ScheduleId] <Int32[]>]
    [-Disabled]
    [[-Description] <String>]
    [[-StartStepId] <Int32>]
    [[-Category] <String>]
    [[-OwnerLogin] <String>]
    [[-EventLogLevel] <Object>]
    [[-EmailLevel] <Object>]
    [[-PageLevel] <Object>]
    [[-EmailOperator] <String>]
    [[-NetsendOperator] <String>]
    [[-PageOperator] <String>]
    [[-DeleteLevel] <Object>]
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
PS C:\> New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -Description 'Just another job'
```
{: data-copyable="true" data-clean-code="New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -Description 'Just another job'" }

Creates a job with the name "Job1" and a small description<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -Disabled
```
{: data-copyable="true" data-clean-code="New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -Disabled" }

Creates the job but sets it to disabled<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -EventLogLevel OnSuccess
```
{: data-copyable="true" data-clean-code="New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -EventLogLevel OnSuccess" }

Creates the job and sets the notification to write to the Windows Application event log on success<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance SSTAD-PC -Job 'Job One' -EmailLevel OnFailure -EmailOperator dba
```
{: data-copyable="true" data-clean-code="New-DbaAgentJob -SqlInstance SSTAD-PC -Job 'Job One' -EmailLevel OnFailure -EmailOperator dba" }

Creates the job and sets the notification to send an e-mail to the e-mail operator<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -Description 'Just another job' -Whatif
```
{: data-copyable="true" data-clean-code="New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -Description 'Just another job' -Whatif" }

Doesn't create the job but shows what would happen.<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job 'Job One'
```
{: data-copyable="true" data-clean-code="New-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job 'Job One'" }

Creates a job with the name "Job One" on multiple servers<br>

#####  Example:  7 

```powershell
PS C:\> "sql1", "sql2", "sql3" | New-DbaAgentJob -Job 'Job One'
```
{: data-copyable="true" data-clean-code="&quot;sql1&quot;, &quot;sql2&quot;, &quot;sql3&quot; | New-DbaAgentJob -Job 'Job One'" }

Creates a job with the name "Job One" on multiple servers using the pipe line<br>

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

The name of the job. The name must be unique and cannot contain the percent (%) character.

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

##### -Schedule

Schedule to attach to job. This can be more than one schedule.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ScheduleId

Schedule ID to attach to job. This can be more than one schedule ID.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Disabled

Sets the status of the job to disabled. By default a job is enabled.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Description

The description of the job.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StartStepId

The identification number of the first step to execute for the job.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Category

The category of the job.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -OwnerLogin

The name of the login that owns the job.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EventLogLevel

Specifies when to place an entry in the Microsoft Windows application log for this job.  
Allowed values 0, "Never", 1, "OnSuccess", 2, "OnFailure", 3, "Always"  
The text value can either be lowercase, uppercase or something in between as long as the text is correct.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,Never,1,OnSuccess,2,OnFailure,3,Always |

##### -EmailLevel

Specifies when to send an e-mail upon the completion of this job.  
Allowed values 0, "Never", 1, "OnSuccess", 2, "OnFailure", 3, "Always"  
The text value can either be lowercase, uppercase or something in between as long as the text is correct.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,Never,1,OnSuccess,2,OnFailure,3,Always |

##### -PageLevel

Specifies when to send a page upon the completion of this job.  
Allowed values 0, "Never", 1, "OnSuccess", 2, "OnFailure", 3, "Always"  
The text value can either be lowercase, uppercase or something in between as long as the text is correct.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,Never,1,OnSuccess,2,OnFailure,3,Always,0,Never,1,OnSuccess,2,OnFailure,3,Always |

##### -EmailOperator

The e-mail name of the operator to whom the e-mail is sent when EmailLevel is reached.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NetsendOperator

The name of the operator to whom the network message is sent.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PageOperator

The name of the operator to whom a page is sent.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DeleteLevel

Specifies when to delete the job.  
Allowed values 0, "Never", 1, "OnSuccess", 2, "OnFailure", 3, "Always"  
The text value can either be lowercase, uppercase or something in between as long as the text is correct.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,Never,1,OnSuccess,2,OnFailure,3,Always |

##### -Force

The force parameter will ignore some errors in the parameters and assume defaults.

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
