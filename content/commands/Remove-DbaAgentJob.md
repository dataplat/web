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

# Remove-DbaAgentJob

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad, sqlstad.nl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgentJob](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentJob.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgentJob](https://dataplat.github.io/boh#Remove-DbaAgentJob).

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

Removes the job from the instance with the name Job1<br>

#####  Example:  2 

```powershell
PS C:\> GetDbaAgentJob -SqlInstance sql1 -Job Job1 | Remove-DbaAgentJob -KeepHistory
```

Removes the job but keeps the history<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaAgentJob -SqlInstance sql1 -Job Job1 -KeepUnusedSchedule
```

Removes the job but keeps the unused schedules<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaAgentJob -SqlInstance sql1, sql2, sql3 -Job Job1
```

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
