---
title: "Get-DbaRunningJob"
slug: "Get-DbaRunningJob"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent jobs that are currently executing"
tags:
  - "Agent"
  - "Job"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRunningJob.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRunningJob"
draft: false
---

# Get-DbaRunningJob

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRunningJob](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRunningJob.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRunningJob](https://dataplat.github.io/boh#Get-DbaRunningJob).

## Synopsis

Retrieves SQL Server Agent jobs that are currently executing

## Description

This function returns SQL Server Agent jobs that are actively running at the moment you call it, filtering out any jobs in idle state.  
Use this to monitor job execution during maintenance windows, troubleshoot performance issues by identifying resource-consuming jobs, or verify that no jobs are running before performing maintenance operations.  
The function refreshes job status information to provide real-time execution details rather than cached data.

## Syntax

```powershell
Get-DbaRunningJob
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <Job[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRunningJob -SqlInstance sql2017
```

Returns any active jobs on sql2017<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2017, sql2019 | Get-DbaRunningJob
```

Returns all active jobs on multiple instances piped into the function.<br>

#####  Example:  3 

```powershell
PS C:\> $servers | Get-DbaRunningJob
```

Returns all active jobs on multiple instances piped into the function.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

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

##### -InputObject

Accepts SQL Server Agent job objects piped from Get-DbaAgentJob for filtering to only running jobs.  
Use this when you need to check execution status on a specific set of jobs rather than all jobs on an instance.

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


&nbsp;
