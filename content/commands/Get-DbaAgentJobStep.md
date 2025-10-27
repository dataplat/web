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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaAgentJobStep</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobStep.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDbaKlaas), powerdba.eu</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaAgentJobStep -SqlInstance localhost" }

Returns all SQL Agent Job Steps on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJobStep -SqlInstance localhost, sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJobStep -SqlInstance localhost, sql2016" }

Returns all SQL Agent Job Steps for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentJobStep -SqlInstance localhost -Job BackupData, BackupDiff
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJobStep -SqlInstance localhost -Job BackupData, BackupDiff" }

Returns all SQL Agent Job Steps for the jobs named BackupData and BackupDiff from the local SQL Server instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJobStep -SqlInstance localhost -ExcludeJob BackupDiff
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJobStep -SqlInstance localhost -ExcludeJob BackupDiff" }

Returns all SQL Agent Job Steps for the local SQL Server instances, except for the BackupDiff Job.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentJobStep -SqlInstance localhost -ExcludeDisabledJobs
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJobStep -SqlInstance localhost -ExcludeDisabledJobs" }

Returns all SQL Agent Job Steps for the local SQL Server instances, excluding the disabled jobs.<br>

#####  Example:  6 

```powershell
PS C:\> $servers | Get-DbaAgentJobStep
```
{: data-copyable="true" data-clean-code="$servers | Get-DbaAgentJobStep" }

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
