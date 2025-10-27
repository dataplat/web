---
title: "Get-DbaAgentJob"
slug: "Get-DbaAgentJob"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent job details and execution status from one or more instances."
tags:
  - "Agent"
  - "Job"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJob.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentJob"
draft: false
---

# Get-DbaAgentJob

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentJob](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJob.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentJob](https://dataplat.github.io/boh#Get-DbaAgentJob).

## Synopsis

Retrieves SQL Server Agent job details and execution status from one or more instances.

## Description

Retrieves detailed information about SQL Server Agent jobs including their configuration, status, schedules, and execution history. This function connects to SQL instances and queries the msdb database to return job properties like owner, category, last run outcome, and current execution status. Use this to monitor job health across your environment, audit job configurations before deployments, or identify jobs associated with specific databases for maintenance planning.

## Syntax

```powershell
Get-DbaAgentJob
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Job] <String[]>]
    [[-ExcludeJob] <String[]>]
    [[-Database] <String[]>]
    [[-Category] <String[]>]
    [[-ExcludeCategory] <String[]>]
    [-ExcludeDisabledJobs]
    [-IncludeExecution]
    [[-Type] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance localhost
```

Returns all SQL Agent Jobs on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance localhost, sql2016
```

Returns all SQl Agent Jobs for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance localhost -Job BackupData, BackupDiff
```

Returns all SQL Agent Jobs named BackupData and BackupDiff from the local SQL Server instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance localhost -ExcludeJob BackupDiff
```

Returns all SQl Agent Jobs for the local SQL Server instances, except the BackupDiff Job.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance localhost -ExcludeDisabledJobs
```

Returns all SQl Agent Jobs for the local SQL Server instances, excluding the disabled jobs.<br>

#####  Example:  6 

```powershell
PS C:\> $servers | Get-DbaAgentJob | Out-GridView -PassThru | Start-DbaAgentJob -WhatIf
```

Find all of your Jobs from SQL Server instances in the $servers collection, select the jobs you want to start then see jobs would start if you ran Start-DbaAgentJob<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sqlserver2014a | Where-Object Category -eq "Report Server" | Export-DbaScript -Path "C:\temp\sqlserver2014a_SSRSJobs.sql"
```

Exports all SSRS jobs from SQL instance sqlserver2014a to a file.<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sqlserver2014a -Database msdb
```

Finds all jobs on sqlserver2014a that T-SQL job steps associated with msdb database<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

Specifies specific SQL Agent job names to retrieve. Accepts an array of job names for targeting multiple jobs.  
Use this when you need to check status or configuration of specific jobs instead of retrieving all jobs on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Excludes specific SQL Agent job names from the results. Accepts an array of job names to skip.  
Useful when you want most jobs except for specific ones like test jobs or jobs you're not responsible for managing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Filters jobs to only those containing T-SQL job steps that target specific databases.  
Essential for database-specific maintenance planning or identifying which jobs will be affected by database operations like restores or migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Category

Filters jobs by their assigned category such as 'Database Maintenance', 'Report Server', or custom categories.  
Helpful for organizing job management tasks by functional area or finding jobs related to specific SQL Server features.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeCategory

Excludes jobs from specific categories from the results. Accepts an array of category names.  
Use this to filter out jobs you don't manage, such as third-party application jobs or SSRS jobs when focusing on database maintenance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDisabledJobs

Excludes disabled SQL Agent jobs from the results, showing only enabled jobs.  
Use this when focusing on active job monitoring or troubleshooting since disabled jobs won't execute.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeExecution

Adds execution start date information for currently running jobs to the output.  
Essential for troubleshooting long-running jobs or monitoring active job execution in real-time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Type

Specifies whether to return Local jobs, MultiServer jobs, or both. Local jobs run only on the current instance while MultiServer jobs are managed centrally.  
Use 'Local' when managing single-instance environments or 'MultiServer' when working with SQL Server multi-server administration setups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @("MultiServer", "Local") |
| Accepted Values | MultiServer,Local |

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
