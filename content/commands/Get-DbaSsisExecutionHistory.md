---
title: "Get-DbaSsisExecutionHistory"
slug: "Get-DbaSsisExecutionHistory"
date: 2024-01-01
layout: "single"
author: "Chris Tucker (@ChrisTuc47368095)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SSIS package execution history from the SSIS catalog database (SSISDB)."
tags:
  - "General"
  - "SSIS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSsisExecutionHistory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaSsisExecutionHistory"
draft: false
---

# Get-DbaSsisExecutionHistory

| Property | Value |
| --- | --- |
| **Author** | Chris Tucker (@ChrisTuc47368095) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaSsisExecutionHistory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSsisExecutionHistory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaSsisExecutionHistory](https://dataplat.github.io/boh#Get-DbaSsisExecutionHistory).

## Synopsis

Retrieves SSIS package execution history from the SSIS catalog database (SSISDB).

## Description

Retrieves detailed execution history for SSIS packages from the SSIS catalog database, including execution status, timing, and environment details. This function queries the catalog.executions view in SSISDB to provide comprehensive execution information for troubleshooting failed packages, monitoring performance, and analyzing SSIS workloads.  
  
Useful for identifying failed or long-running packages, tracking execution patterns over time, and investigating SSIS deployment issues. Results can be filtered by project, folder, environment, execution status, or date range to focus on specific troubleshooting scenarios.

## Syntax

```powershell
Get-DbaSsisExecutionHistory
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Since] <DateTime>]
    [[-Status] <String[]>]
    [[-Project] <String[]>]
    [[-Folder] <String[]>]
    [[-Environment] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaSsisExecutionHistory -SqlInstance SMTQ01 -Folder SMTQ_PRC
```

Get all history items for SMTQ01 in folder SMTQ_PRC.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSsisExecutionHistory -SqlInstance SMTQ01 -Status Failed,Cancelled
```

Gets all failed or canceled executions for SMTQ01.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaSsisExecutionHistory -SqlInstance SMTQ01,SMTQ02 -Status Failed,Cancelled
```

Shows what would happen if the command were executed and would return the SQL statement that would be executed per instance.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.  
This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

##### -Since

Limits results to executions that started on or after the specified date and time. Accepts datetime objects or strings.  
Use this to focus on recent executions when analyzing current issues or to exclude older historical data from large catalogs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Status

Filters results to specific execution statuses such as Failed, Succeeded, or Running. Accepts multiple status values.  
Commonly used to find failed executions for troubleshooting or to monitor currently running packages during peak processing times.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Created,Running,Cancelled,Failed,Pending,Halted,Succeeded,Stopping,Completed |

##### -Project

Filters results to specific SSIS projects deployed to the catalog. Accepts an array of project names for multiple projects.  
Use this when troubleshooting issues within particular projects or analyzing execution patterns for specific deployments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Folder

Filters results to specific SSIS catalog folders that contain projects and packages. Accepts an array of folder names.  
Useful for focusing on executions within specific organizational folders or when troubleshooting deployments in particular environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Environment

Filters results to specific SSIS environments that were used during package execution. Accepts an array of environment names.  
Use this to analyze executions that used particular environment variables or to troubleshoot environment-specific configuration issues.

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
