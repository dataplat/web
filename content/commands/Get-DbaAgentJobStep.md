---
title: "Get-DbaAgentJobStep"
slug: "Get-DbaAgentJobStep"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas), powerdba.eu"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed SQL Agent job step information including execution status and configuration from SQL Server instances."
tags:
  - "Agent"
  - "Job"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobStep.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentJobStep"
draft: false
---

# Get-DbaAgentJobStep

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas), powerdba.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentJobStep](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobStep.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentJobStep](https://dataplat.github.io/boh#Get-DbaAgentJobStep).

## Synopsis

Retrieves detailed SQL Agent job step information including execution status and configuration from SQL Server instances.

## Description

Collects comprehensive details about SQL Agent job steps across one or more SQL Server instances. Returns information about each step's subsystem type, last execution date, outcome, and current state, which is essential for monitoring job performance and troubleshooting failed automation tasks. You can filter results by specific jobs, exclude disabled jobs, or process job objects from Get-DbaAgentJob to focus on particular maintenance routines or scheduled processes.

## Syntax

```powershell
Get-DbaAgentJobStep
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Job] <String[]>]
    [[-ExcludeJob] <String[]>]
    [[-InputObject] <Job[]>]
    [-ExcludeDisabledJobs]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentJobStep -SqlInstance localhost
```

Returns all SQL Agent Job Steps on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJobStep -SqlInstance localhost, sql2016
```

Returns all SQL Agent Job Steps for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentJobStep -SqlInstance localhost -Job BackupData, BackupDiff
```

Returns all SQL Agent Job Steps for the jobs named BackupData and BackupDiff from the local SQL Server instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJobStep -SqlInstance localhost -ExcludeJob BackupDiff
```

Returns all SQL Agent Job Steps for the local SQL Server instances, except for the BackupDiff Job.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentJobStep -SqlInstance localhost -ExcludeDisabledJobs
```

Returns all SQL Agent Job Steps for the local SQL Server instances, excluding the disabled jobs.<br>

#####  Example:  6 

```powershell
PS C:\> $servers | Get-DbaAgentJobStep
```

Find all of your Job Steps from SQL Server instances in the $servers collection<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Specifies which SQL Agent jobs to include by name when retrieving job steps. Accepts wildcards for pattern matching.  
Use this when you need to examine steps for specific jobs like backup routines or maintenance tasks instead of processing all jobs on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Specifies which SQL Agent jobs to exclude by name when retrieving job steps. Accepts wildcards for pattern matching.  
Use this when you want to review most jobs but skip certain ones like test jobs or jobs that generate excessive output.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Agent job objects from the pipeline, typically from Get-DbaAgentJob output.  
Use this when you want to process job steps for a pre-filtered set of jobs or when building complex pipelines that combine job filtering with step analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ExcludeDisabledJobs

Filters out disabled SQL Agent jobs from the results, showing only currently active jobs.  
Use this when troubleshooting production issues or monitoring active automation to avoid reviewing steps from jobs that aren't currently running.

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
