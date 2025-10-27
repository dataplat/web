---
title: "Set-DbaAgentJobOwner"
slug: "Set-DbaAgentJobOwner"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Updates SQL Server Agent job ownership to ensure jobs are owned by a specific login"
tags:
  - "Agent"
  - "Job"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJobOwner.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgentJobOwner"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaAgentJobOwner</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJobOwner.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Michael Fal (@Mike_Fal), mikefal.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Updates SQL Server Agent job ownership to ensure jobs are owned by a specific login

## Description

This function standardizes SQL Agent job ownership by updating jobs that don't match a specified owner login. It's commonly used for security compliance, post-migration cleanup, and environment standardization where consistent job ownership is required.  
  
By default, jobs are reassigned to the 'sa' account (or the renamed sysadmin account if 'sa' was renamed), but you can specify any valid login. The function automatically detects renamed 'sa' accounts by finding the login with ID 1.  
  
Only local (non-MultiServer) jobs are processed by default, though you can target specific jobs or exclude certain ones. The function validates that the target login exists and prevents assignment to Windows groups, which cannot own SQL Agent jobs.  
  
Jobs already owned by the target login are skipped, and detailed status information is returned for each job processed.  
  
Best practice reference: https://www.itprotoday.com/sql-server-tip-assign-ownership-jobs-sysadmin-account

## Syntax

```powershell
Set-DbaAgentJobOwner
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Job] <Object[]>]
    [[-ExcludeJob] <Object[]>]
    [[-InputObject] <Job[]>]
    [[-Login] <String>]
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
PS C:\> Set-DbaAgentJobOwner -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJobOwner -SqlInstance localhost" }

Sets SQL Agent Job owner to sa on all jobs where the owner does not match sa.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaAgentJobOwner -SqlInstance localhost -Login DOMAIN\account
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJobOwner -SqlInstance localhost -Login DOMAIN\account" }

Sets SQL Agent Job owner to 'DOMAIN\account' on all jobs where the owner does not match 'DOMAIN\account'. Note<br>
that Login must be a valid security principal that exists on the target server.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaAgentJobOwner -SqlInstance localhost -Job job1, job2
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJobOwner -SqlInstance localhost -Job job1, job2" }

Sets SQL Agent Job owner to 'sa' on the job1 and job2 jobs if their current owner does not match 'sa'.<br>

#####  Example:  4 

```powershell
PS C:\> 'sqlserver','sql2016' | Set-DbaAgentJobOwner
```
{: data-copyable="true" data-clean-code="'sqlserver','sql2016' | Set-DbaAgentJobOwner" }

Sets SQL Agent Job owner to sa on all jobs where the owner does not match sa on both sqlserver and sql2016.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance vmsql | Where-Object OwnerLoginName -eq login1 | Set-DbaAgentJobOwner -TargetLogin login2 | Out-Gridview
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJob -SqlInstance vmsql | Where-Object OwnerLoginName -eq login1 | Set-DbaAgentJobOwner -TargetLogin login2 | Out-Gridview" }

Sets SQL Agent Job owner to login2 where their current owner is login1 on instance vmsql. Send result to gridview.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which SQL Agent jobs to update ownership for. Accepts job names as strings and supports tab completion from the target server.  
Use this when you need to update ownership for specific jobs rather than processing all jobs on the instance.

| Property | Value |
| --- | --- |
| Alias | Jobs |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Specifies SQL Agent jobs to skip during the ownership update process. Accepts job names as strings with tab completion.  
Useful for excluding critical jobs or jobs that must retain their current ownership for security or operational reasons.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Agent job objects from the pipeline, typically from Get-DbaAgentJob output.  
Use this for advanced filtering scenarios where you need to process jobs based on complex criteria like owner, category, or schedule properties.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Login

Specifies the target login account that should own the SQL Agent jobs. Defaults to 'sa' or automatically detects the renamed sysadmin account (login ID 1).  
Must be a valid SQL login or Windows account that exists on the server. Cannot be a Windows group as they cannot own SQL Agent jobs.

| Property | Value |
| --- | --- |
| Alias | TargetLogin |
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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
