---
title: "Remove-DbaAgentJob"
slug: "Remove-DbaAgentJob"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server Agent jobs from one or more instances with options to preserve history and schedules."
tags:
  - "Agent"
  - "Job"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentJob.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgentJob"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaAgentJob</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentJob.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Removes SQL Server Agent jobs from one or more instances with options to preserve history and schedules.

## Description

Removes SQL Server Agent jobs from the target instances using the sp_delete_job system stored procedure. By default, both job history and unused schedules are deleted along with the job itself. You can optionally preserve job execution history for compliance or troubleshooting purposes, and keep unused schedules that might be reused for other jobs. This function is commonly used when decommissioning applications, cleaning up test environments, or removing obsolete maintenance jobs during server consolidation projects.

## Syntax

```powershell
Remove-DbaAgentJob
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Job] <Object[]>]
    [-KeepHistory]
    [-KeepUnusedSchedule]
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
PS C:\> Remove-DbaAgentJob -SqlInstance sql1 -Job Job1
```
{: data-copyable="true" data-clean-code="Remove-DbaAgentJob -SqlInstance sql1 -Job Job1" }

Removes the job from the instance with the name Job1<br>

#####  Example:  2 

```powershell
PS C:\> GetDbaAgentJob -SqlInstance sql1 -Job Job1 | Remove-DbaAgentJob -KeepHistory
```
{: data-copyable="true" data-clean-code="GetDbaAgentJob -SqlInstance sql1 -Job Job1 | Remove-DbaAgentJob -KeepHistory" }

Removes the job but keeps the history<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaAgentJob -SqlInstance sql1 -Job Job1 -KeepUnusedSchedule
```
{: data-copyable="true" data-clean-code="Remove-DbaAgentJob -SqlInstance sql1 -Job Job1 -KeepUnusedSchedule" }

Removes the job but keeps the unused schedules<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job Job1
```
{: data-copyable="true" data-clean-code="Remove-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job Job1" }

Removes the job from multiple servers<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

Specifies the name of the SQL Server Agent job to remove. Accepts one or more job names.  
Use this when you know the specific job names you want to delete, rather than piping job objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -KeepHistory

Preserves job execution history in the msdb.dbo.sysjobhistory tables when removing the job.  
Use this when you need to retain audit trails or troubleshooting information for compliance or analysis purposes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepUnusedSchedule

Preserves job schedules that aren't used by other jobs when removing this job.  
Use this when you plan to reuse the schedule for new jobs or want to maintain schedule definitions for documentation purposes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts SQL Server Agent job objects from the pipeline, typically from Get-DbaAgentJob.  
Use this approach when you need to filter jobs with complex criteria before removal or when processing jobs from multiple instances.

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
