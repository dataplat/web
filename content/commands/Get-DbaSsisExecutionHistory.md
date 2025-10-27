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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaSsisExecutionHistory</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSsisExecutionHistory.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chris Tucker (@ChrisTuc47368095)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaSsisExecutionHistory -SqlInstance SMTQ01 -Folder SMTQ_PRC" }

Get all history items for SMTQ01 in folder SMTQ_PRC.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSsisExecutionHistory -SqlInstance SMTQ01 -Status Failed,Cancelled
```
{: data-copyable="true" data-clean-code="Get-DbaSsisExecutionHistory -SqlInstance SMTQ01 -Status Failed,Cancelled" }

Gets all failed or canceled executions for SMTQ01.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaSsisExecutionHistory -SqlInstance SMTQ01,SMTQ02 -Status Failed,Cancelled
```
{: data-copyable="true" data-clean-code="Get-DbaSsisExecutionHistory -SqlInstance SMTQ01,SMTQ02 -Status Failed,Cancelled" }

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
