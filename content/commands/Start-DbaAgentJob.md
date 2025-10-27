---
title: "Start-DbaAgentJob"
slug: "Start-DbaAgentJob"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Starts SQL Server Agent jobs and optionally waits for completion"
tags:
  - "Job"
  - "Agent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Start-DbaAgentJob.ps1"
bohUrl: "https://dataplat.github.io/boh#Start-DbaAgentJob"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Start-DbaAgentJob</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Start-DbaAgentJob.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Starts SQL Server Agent jobs and optionally waits for completion

## Description

Starts one or more SQL Server Agent jobs that are currently idle. This function validates jobs are in an idle state before starting them and can optionally wait for job completion before returning results. You can start all jobs, specific jobs by name, or exclude certain jobs from execution. It also supports starting jobs at specific steps rather than from the beginning, which is useful for resuming failed jobs or testing individual job steps.

## Syntax

```powershell
Start-DbaAgentJob
    [-SqlCredential <PSCredential>]
    [-Job <String[]>]
    [-StepName <String>]
    [-ExcludeJob <String[]>]
    [-AllJobs]
    [-Wait]
    [-Parallel]
    [-WaitPeriod <Int32>]
    [-SleepPeriod <Int32>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Start-DbaAgentJob -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Job <String[]>]
    [-StepName <String>]
    [-ExcludeJob <String[]>]
    [-AllJobs]
    [-Wait]
    [-Parallel]
    [-WaitPeriod <Int32>]
    [-SleepPeriod <Int32>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Start-DbaAgentJob
    [-SqlCredential <PSCredential>]
    [-Job <String[]>]
    [-StepName <String>]
    [-ExcludeJob <String[]>]
    -InputObject <Job[]>
    [-AllJobs]
    [-Wait]
    [-Parallel]
    [-WaitPeriod <Int32>]
    [-SleepPeriod <Int32>]
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
PS C:\> Start-DbaAgentJob -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Start-DbaAgentJob -SqlInstance localhost" }

Starts all running SQL Agent Jobs on the local SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 -Job cdc.DBWithCDC_capture | Start-DbaAgentJob
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJob -SqlInstance sql2016 -Job cdc.DBWithCDC_capture | Start-DbaAgentJob" }

Starts the cdc.DBWithCDC_capture SQL Agent Job on sql2016<br>

#####  Example:  3 

```powershell
PS C:\> Start-DbaAgentJob -SqlInstance sql2016 -Job cdc.DBWithCDC_capture
```
{: data-copyable="true" data-clean-code="Start-DbaAgentJob -SqlInstance sql2016 -Job cdc.DBWithCDC_capture" }

Starts the cdc.DBWithCDC_capture SQL Agent Job on sql2016<br>

#####  Example:  4 

```powershell
PS C:\> $servers | Find-DbaAgentJob -IsFailed | Start-DbaAgentJob
```
{: data-copyable="true" data-clean-code="$servers | Find-DbaAgentJob -IsFailed | Start-DbaAgentJob" }

Restarts all failed jobs on all servers in the $servers collection<br>

#####  Example:  5 

```powershell
PS C:\> Start-DbaAgentJob -SqlInstance sql2016 -AllJobs
```
{: data-copyable="true" data-clean-code="Start-DbaAgentJob -SqlInstance sql2016 -AllJobs" }

Start all the jobs<br>

#####  Example:  6 

```powershell
PS C:\> Start-DbaAgentJob -SqlInstance sql2016 -Job @('Job1', 'Job2', 'Job3') -Wait
```
{: data-copyable="true" data-clean-code="Start-DbaAgentJob -SqlInstance sql2016 -Job @('Job1', 'Job2', 'Job3') -Wait" }

This is a serialized approach to submitting jobs and waiting for each job to continue the next.<br>
Starts Job1, waits for completion of Job1<br>
Starts Job2, waits for completion of Job2<br>
Starts Job3, Waits for completion of Job3<br>

#####  Example:  7 

```powershell
PS C:\> Start-DbaAgentJob -SqlInstance sql2016 -Job @('Job1', 'Job2', 'Job3') -Wait -Parallel
```
{: data-copyable="true" data-clean-code="Start-DbaAgentJob -SqlInstance sql2016 -Job @('Job1', 'Job2', 'Job3') -Wait -Parallel" }

This is a parallel approach to submitting all jobs and waiting for them all to complete.<br>
Starts Job1, starts Job2, starts Job3 and waits for completion of Job1, Job2, and Job3.<br>

#####  Example:  8 

```powershell
PS C:\> Start-DbaAgentJob -SqlInstance sql2016 -Job JobWith5Steps -StepName Step4
```
{: data-copyable="true" data-clean-code="Start-DbaAgentJob -SqlInstance sql2016 -Job JobWith5Steps -StepName Step4" }

Starts the JobWith5Steps SQL Agent Job at step Step4.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Agent job objects from the pipeline, typically from Get-DbaAgentJob or other dbatools functions.  
Use this when chaining dbatools commands together to start jobs that meet specific criteria, such as failed jobs or jobs with certain schedules.

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

Specifies the names of specific SQL Agent jobs to start. Accepts job names as strings and supports multiple job names in an array.  
Use this when you need to start only certain jobs instead of all jobs on the server. Job names are case-sensitive and must match exactly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StepName

Specifies the job step name where job execution should begin instead of starting from the first step.  
Use this to resume a failed job at a specific step or to test individual job steps without running the entire job sequence.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Specifies job names to exclude from starting when using -AllJobs or when no specific jobs are specified.  
Use this to start all jobs except certain ones, such as excluding maintenance jobs during business hours or problematic jobs that need special handling.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllJobs

Starts all SQL Agent jobs that are currently in an idle state on the target instance.  
Use this switch when you need to start all available jobs, typically after server maintenance or during bulk job execution scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Wait

Waits for each job to complete execution before returning results or proceeding to the next job.  
Use this when you need to ensure job completion before continuing your script, or when jobs have dependencies that require sequential execution.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Parallel

Starts all specified jobs simultaneously and waits for all to complete, rather than starting and waiting for each job sequentially.  
Use this when jobs can run concurrently without conflicts to reduce total execution time. Requires the -Wait parameter to function.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -WaitPeriod

Sets the polling interval in seconds for checking job status when using the -Wait parameter. Defaults to 3 seconds.  
Adjust this value based on your job duration - use shorter intervals for quick jobs or longer intervals for jobs that run for hours to reduce server load.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 3 |

##### -SleepPeriod

Sets the initial wait time in milliseconds after starting a job before checking its status. Defaults to 300 milliseconds.  
Increase this value if you experience issues with jobs not showing as started immediately, which can occur on heavily loaded servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 300 |

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
