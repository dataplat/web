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

# New-DbaAgentJob

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaAgentJob](https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentJob.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaAgentJob](https://dataplat.github.io/boh#New-DbaAgentJob).

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

Creates a job with the name "Job1" and a small description<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -Disabled
```

Creates the job but sets it to disabled<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -EventLogLevel OnSuccess
```

Creates the job and sets the notification to write to the Windows Application event log on success<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance SSTAD-PC -Job 'Job One' -EmailLevel OnFailure -EmailOperator dba
```

Creates the job and sets the notification to send an e-mail to the e-mail operator<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance sql1 -Job 'Job One' -Description 'Just another job' -Whatif
```

Doesn't create the job but shows what would happen.<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job 'Job One'
```

Creates a job with the name "Job One" on multiple servers<br>

#####  Example:  7 

```powershell
PS C:\> "sql1", "sql2", "sql3" | New-DbaAgentJob -Job 'Job One'
```

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
