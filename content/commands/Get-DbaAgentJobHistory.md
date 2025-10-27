---
title: "Get-DbaAgentJobHistory"
slug: "Get-DbaAgentJobHistory"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas) | Simone Bizzotto (@niphold)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent job execution history from msdb database for troubleshooting and compliance reporting."
tags:
  - "Agent"
  - "Job"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobHistory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentJobHistory"
draft: false
---

# Get-DbaAgentJobHistory

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) , Simone Bizzotto (@niphold) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentJobHistory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobHistory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentJobHistory](https://dataplat.github.io/boh#Get-DbaAgentJobHistory).

## Synopsis

Retrieves SQL Server Agent job execution history from msdb database for troubleshooting and compliance reporting.

## Description

Get-DbaAgentJobHistory queries the msdb database to retrieve detailed execution records for SQL Server Agent jobs, helping you troubleshoot failures, monitor performance trends, and generate compliance reports. This function accesses the same historical data you'd find in SQL Server Management Studio's Job Activity Monitor, but with powerful filtering and output options.  
  
The function is essential when investigating why jobs failed, analyzing execution patterns over time, or preparing audit documentation. You can filter results by specific jobs, date ranges, or outcome types (failed, succeeded, retry, etc.), and optionally include job step details or just summary-level information.  
  
Results include calculated fields like duration, formatted start/end dates, and readable status descriptions. When used with -WithOutputFile, it resolves SQL Agent token placeholders in output file paths, making it easier to locate job logs for further investigation.  
  
Historical data availability depends on your SQL Agent history cleanup settings - older executions may have been purged based on your retention configuration.  
  
https://msdn.microsoft.com/en-us/library/ms201680.aspx  
https://msdn.microsoft.com/en-us/library/microsoft.sqlserver.management.smo.agent.jobhistoryfilter(v=sql.120).aspx

## Syntax

```powershell
Get-DbaAgentJobHistory
    [-SqlCredential <PSCredential>]
    [-Job <Object[]>]
    [-ExcludeJob <Object[]>]
    [-StartDate <DateTime>]
    [-EndDate <DateTime>]
    [-OutcomeType {Failed | Succeeded | Retry | Cancelled | InProgress | Unknown}]
    [-ExcludeJobSteps]
    [-WithOutputFile]
    [-EnableException]
    [<CommonParameters>]

Get-DbaAgentJobHistory -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Job <Object[]>]
    [-ExcludeJob <Object[]>]
    [-StartDate <DateTime>]
    [-EndDate <DateTime>]
    [-OutcomeType {Failed | Succeeded | Retry | Cancelled | InProgress | Unknown}]
    [-ExcludeJobSteps]
    [-WithOutputFile]
    [-EnableException]
    [<CommonParameters>]

Get-DbaAgentJobHistory
    [-SqlCredential <PSCredential>]
    [-Job <Object[]>]
    [-ExcludeJob <Object[]>]
    [-StartDate <DateTime>]
    [-EndDate <DateTime>]
    [-OutcomeType {Failed | Succeeded | Retry | Cancelled | InProgress | Unknown}]
    [-ExcludeJobSteps]
    [-WithOutputFile]
    -JobCollection <Job>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentJobHistory -SqlInstance localhost
```

Returns all SQL Agent Job execution results on the local default SQL Server instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJobHistory -SqlInstance localhost, sql2016
```

Returns all SQL Agent Job execution results for the local and sql2016 SQL Server instances.<br>

#####  Example:  3 

```powershell
PS C:\> 'sql1','sql2\Inst2K17' | Get-DbaAgentJobHistory
```

Returns all SQL Agent Job execution results for sql1 and sql2\Inst2K17.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJobHistory -SqlInstance sql2\Inst2K17 | Select-Object *
```

Returns all properties for all SQl Agent Job execution results on sql2\Inst2K17.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentJobHistory -SqlInstance sql2\Inst2K17 -Job 'Output File Cleanup'
```

Returns all properties for all SQl Agent Job execution results of the 'Output File Cleanup' job on sql2\Inst2K17.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaAgentJobHistory -SqlInstance sql2\Inst2K17 -Job 'Output File Cleanup' -WithOutputFile
```

Returns all properties for all SQl Agent Job execution results of the 'Output File Cleanup' job on sql2\Inst2K17,<br>
with additional properties that show the output filename path<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaAgentJobHistory -SqlInstance sql2\Inst2K17 -ExcludeJobSteps
```

Returns the SQL Agent Job execution results for the whole jobs on sql2\Inst2K17, leaving out job step execution results.<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaAgentJobHistory -SqlInstance sql2\Inst2K17 -StartDate '2017-05-22' -EndDate '2017-05-23 12:30:00'
```

Returns the SQL Agent Job execution results between 2017/05/22 00:00:00 and 2017/05/23 12:30:00 on sql2\Inst2K17.<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 | Where-Object Name -Match backup | Get-DbaAgentJobHistory
```

Gets all jobs with the name that match the regex pattern "backup" and then gets the job history from those. You can also use -Like *backup* in this example.<br>

#####  Example:  10 

```powershell
PS C:\> Get-DbaAgentJobHistory -SqlInstance sql2016 -OutcomeType Failed
```

Returns only the failed SQL Agent Job execution results for the sql2016 SQL Server instance.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -JobCollection

Accepts an array of SQL Server Management Objects (SMO) job objects instead of job names. Enables pipeline input from Get-DbaAgentJob.  
Use this when you need to filter jobs by complex criteria first, then get their history, such as jobs matching specific patterns or properties.

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

Specifies specific SQL Agent jobs to retrieve history for by name. Accepts wildcards and arrays for multiple jobs.  
Use this when investigating specific job failures or monitoring particular maintenance routines instead of reviewing all job history.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Excludes specified jobs from the history results by name. Accepts arrays for multiple job exclusions.  
Useful when you want to review most jobs but skip noisy or less critical ones like frequent maintenance jobs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StartDate

Sets the earliest date and time for job history records to include. Defaults to 1900-01-01 to include all available history.  
Specify this when investigating issues within a specific timeframe or when older history isn't relevant to your troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1900-01-01 |

##### -EndDate

Sets the latest date and time for job history records to include. Defaults to current date and time.  
Use this with StartDate to focus on a specific time window when troubleshooting incidents or analyzing patterns during maintenance windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $(Get-Date) |

##### -OutcomeType

Filters job history to only show executions with a specific completion result. Valid values are Failed, Succeeded, Retry, Cancelled, InProgress, Unknown.  
Most commonly used with 'Failed' when troubleshooting job failures or 'Succeeded' when verifying successful completion patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Failed,Succeeded,Retry,Cancelled,InProgress,Unknown |

##### -ExcludeJobSteps

Returns only job-level execution summaries, excluding individual step details. Shows overall job success/failure without step-by-step breakdown.  
Use this when you need high-level job completion status for reporting or when step details aren't needed for your analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -WithOutputFile

Includes resolved output file paths for job steps that write to files. Automatically resolves SQL Agent token placeholders like $(SQLLOGDIR) to actual paths.  
Essential when you need to locate and review job output files for troubleshooting failures or verifying job step results.

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


&nbsp;
