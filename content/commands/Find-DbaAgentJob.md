---
title: "Find-DbaAgentJob"
slug: "Find-DbaAgentJob"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Searches and filters SQL Agent jobs across SQL Server instances using multiple criteria."
tags:
  - "Agent"
  - "Job"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaAgentJob.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaAgentJob"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaAgentJob</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaAgentJob.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stephen Bennett, sqlnotesfromtheunderground.wordpress.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Searches and filters SQL Agent jobs across SQL Server instances using multiple criteria.

## Description

Searches SQL Agent jobs across one or more SQL Server instances using various filter criteria including job name, step name, execution status, schedule status, and notification settings. Helps DBAs identify problematic jobs that have failed, haven't run recently, are disabled, lack schedules, or missing email notifications. Useful for maintenance audits, troubleshooting job issues, and identifying cleanup candidates in environments with many automated processes.

## Syntax

```powershell
Find-DbaAgentJob
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-JobName] <String[]>]
    [[-ExcludeJobName] <String[]>]
    [[-StepName] <String[]>]
    [[-LastUsed] <Int32>]
    [-IsDisabled]
    [-IsFailed]
    [-IsNotScheduled]
    [-IsNoEmailNotification]
    [[-Category] <String[]>]
    [[-Owner] <String>]
    [[-Since] <DateTime>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaAgentJob -SqlInstance Dev01 -JobName *backup*
```
{: data-copyable="true" data-clean-code="Find-DbaAgentJob -SqlInstance Dev01 -JobName *backup*" }

Returns all agent job(s) that have backup in the name<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaAgentJob -SqlInstance Dev01, Dev02 -JobName Mybackup
```
{: data-copyable="true" data-clean-code="Find-DbaAgentJob -SqlInstance Dev01, Dev02 -JobName Mybackup" }

Returns all agent job(s) that are named exactly Mybackup<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaAgentJob -SqlInstance Dev01 -LastUsed 10
```
{: data-copyable="true" data-clean-code="Find-DbaAgentJob -SqlInstance Dev01 -LastUsed 10" }

Returns all agent job(s) that have not ran in 10 days<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaAgentJob -SqlInstance Dev01 -IsDisabled -IsNoEmailNotification -IsNotScheduled
```
{: data-copyable="true" data-clean-code="Find-DbaAgentJob -SqlInstance Dev01 -IsDisabled -IsNoEmailNotification -IsNotScheduled" }

Returns all agent job(s) that are either disabled, have no email notification or don't have a schedule. returned with detail<br>

#####  Example:  5 

```powershell
PS C:\> $servers | Find-DbaAgentJob -IsFailed | Start-DbaAgentJob
```
{: data-copyable="true" data-clean-code="$servers | Find-DbaAgentJob -IsFailed | Start-DbaAgentJob" }

Finds all failed job then starts them. Consider using a -WhatIf at the end of Start-DbaAgentJob to see what it'll do first<br>

#####  Example:  6 

```powershell
PS C:\> Find-DbaAgentJob -SqlInstance Dev01 -LastUsed 10 -ExcludeJobName "Yearly - RollUp Workload", "SMS - Notification"
```
{: data-copyable="true" data-clean-code="Find-DbaAgentJob -SqlInstance Dev01 -LastUsed 10 -ExcludeJobName &quot;Yearly - RollUp Workload&quot;, &quot;SMS - Notification&quot;" }

Returns all agent jobs that have not ran in the last 10 days ignoring jobs "Yearly - RollUp Workload" and "SMS - Notification"<br>

#####  Example:  7 

```powershell
PS C:\> Find-DbaAgentJob -SqlInstance Dev01 -Category "REPL-Distribution", "REPL-Snapshot" | Format-Table -AutoSize -Wrap
```
{: data-copyable="true" data-clean-code="Find-DbaAgentJob -SqlInstance Dev01 -Category &quot;REPL-Distribution&quot;, &quot;REPL-Snapshot&quot; | Format-Table -AutoSize -Wrap" }

Returns all job/s on Dev01 that are in either category "REPL-Distribution" or "REPL-Snapshot"<br>

#####  Example:  8 

```powershell
PS C:\> Find-DbaAgentJob -SqlInstance Dev01, Dev02 -IsFailed -Since '2016-07-01 10:47:00'
```
{: data-copyable="true" data-clean-code="Find-DbaAgentJob -SqlInstance Dev01, Dev02 -IsFailed -Since '2016-07-01 10:47:00'" }

Returns all agent job(s) on Dev01 and Dev02 that have failed since July of 2016 (and still have history in msdb)<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance CMSServer -Group Production | Find-DbaAgentJob -Disabled -IsNotScheduled | Format-Table -AutoSize -Wrap
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance CMSServer -Group Production | Find-DbaAgentJob -Disabled -IsNotScheduled | Format-Table -AutoSize -Wrap" }

Queries CMS server to return all SQL instances in the Production folder and then list out all agent jobs that have either been disabled or have no schedule.<br>

#####  Example:  10 

```powershell
PS C:\> $Instances = 'SQL2017N5','SQL2019N5','SQL2019N20','SQL2019N21','SQL2019N22'
```
{: data-copyable="true" data-clean-code="$Instances = 'SQL2017N5','SQL2019N5','SQL2019N20','SQL2019N21','SQL2019N22'" }

Find-DbaAgentJob -SqlInstance $Instances -JobName *backup* -IsNotScheduled<br>
Returns all agent job(s) wiht backup in the name, that don't have a schedule on 'SQL2017N5','SQL2019N5','SQL2019N20','SQL2019N21','SQL2019N22'<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or higher.

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

##### -JobName

Specifies agent job names to search for using exact matches or wildcard patterns.  
Supports wildcards like *backup*, MyJob*, or *ETL* to find jobs with specific naming conventions.  
Useful when you need to focus on particular job types or troubleshoot specific processes.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJobName

Excludes specific job names from the search results using exact name matches.  
Use this to filter out known good jobs when searching for problematic ones, like excluding maintenance jobs when looking for failed application jobs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StepName

Searches for jobs containing steps with specific names or patterns.  
Supports wildcards to find jobs with steps like *backup*, *index*, or *cleanup*.  
Helpful when troubleshooting issues in multi-step jobs or finding jobs that perform specific operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LastUsed

Finds jobs that haven't executed successfully in the specified number of days.  
Use this to identify stale or potentially broken jobs that may need attention.  
Common values are 7, 30, or 90 days depending on job frequency and business requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -IsDisabled

Finds all jobs with disabled status (not scheduled to run automatically).  
Use this during maintenance windows to identify jobs that were disabled for troubleshooting or may have been forgotten after maintenance.

| Property | Value |
| --- | --- |
| Alias | Disabled |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsFailed

Finds jobs where the last execution resulted in a failure status.  
Essential for daily health checks and identifying jobs that need immediate attention.  
Combine with Since parameter to focus on recent failures or look at historical patterns.

| Property | Value |
| --- | --- |
| Alias | Failed |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsNotScheduled

Finds jobs that exist but have no schedule defined (manual execution only).  
Useful for identifying orphaned jobs, temporary jobs that should be cleaned up, or jobs awaiting proper scheduling configuration.

| Property | Value |
| --- | --- |
| Alias | NoSchedule |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsNoEmailNotification

Finds jobs that lack email notification setup for failures or completion.  
Important for ensuring critical jobs will alert DBAs when they fail.  
Use this during compliance audits or when establishing monitoring standards.

| Property | Value |
| --- | --- |
| Alias | NoEmailNotification |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Category

Filters jobs by their assigned categories such as 'Database Maintenance', 'REPL-Distribution', or custom categories.  
Useful for focusing on specific types of jobs like replication jobs, maintenance tasks, or application-specific processes.  
Categories help organize and manage jobs in environments with many different job types.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Owner

Filters jobs by their owner login name, or excludes jobs by prefixing with a dash (-).  
Use 'DOMAIN\\User' to find jobs owned by specific accounts, or '-sa' to exclude sa-owned jobs.  
Helpful for security audits, identifying jobs that may need ownership changes, or finding jobs created by specific users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Since

Limits results to jobs that last ran on or after the specified date and time.  
Use with IsFailed to find jobs that failed since a specific incident, or combine with other filters to focus on recent activity.  
Accepts standard datetime formats like '2023-01-01' or '2023-01-01 14:30:00'.

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


&nbsp;
