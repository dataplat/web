---
title: "Test-DbaAgentJobOwner"
slug: "Test-DbaAgentJobOwner"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies SQL Agent jobs with incorrect ownership for security compliance auditing"
tags:
  - "Agent"
  - "Job"
  - "Owner"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaAgentJobOwner.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaAgentJobOwner"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaAgentJobOwner</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaAgentJobOwner.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Identifies SQL Agent jobs with incorrect ownership for security compliance auditing

## Description

This function audits SQL Agent job ownership by comparing each job's current owner against a target login, typically 'sa' or another sysadmin account. Jobs owned by inappropriate accounts can pose security risks, especially if those accounts are disabled, deleted, or have reduced permissions. By default, it checks against the 'sa' account (or renamed sysadmin), but you can specify any valid login for your organization's security standards. Returns only jobs that don't match the expected ownership, making it easy to identify compliance violations that need remediation.  
  
Best practice reference: https://www.itprotoday.com/sql-server-tip-assign-ownership-jobs-sysadmin-account

## Syntax

```powershell
Test-DbaAgentJobOwner
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Job] <Object[]>]
    [[-ExcludeJob] <Object[]>]
    [[-Login] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaAgentJobOwner -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Test-DbaAgentJobOwner -SqlInstance localhost" }

Returns all SQL Agent Jobs where the owner does not match 'sa'.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaAgentJobOwner -SqlInstance localhost -ExcludeJob 'syspolicy_purge_history'
```
{: data-copyable="true" data-clean-code="Test-DbaAgentJobOwner -SqlInstance localhost -ExcludeJob 'syspolicy_purge_history'" }

Returns SQL Agent Jobs except for the syspolicy_purge_history job<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaAgentJobOwner -SqlInstance localhost -Login DOMAIN\account
```
{: data-copyable="true" data-clean-code="Test-DbaAgentJobOwner -SqlInstance localhost -Login DOMAIN\account" }

Returns all SQL Agent Jobs where the owner does not match DOMAIN\account. Note<br>
that Login must be a valid security principal that exists on the target server.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies specific SQL Agent jobs to check for ownership compliance. When provided, only these named jobs are evaluated against the target owner.  
Use this to focus on critical jobs or when troubleshooting specific ownership issues. If omitted, all jobs on the instance are processed.

| Property | Value |
| --- | --- |
| Alias | Jobs |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Excludes specific SQL Agent jobs from the ownership compliance check. Useful for skipping system jobs or jobs that legitimately require different owners.  
Commonly used to exclude jobs like 'syspolicy_purge_history' or maintenance jobs that run under service accounts by design.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies the target login that should own SQL Agent jobs for security compliance. Must be an existing login on the server, cannot be a Windows Group.  
Defaults to 'sa' (or the renamed sysadmin account). Common alternatives include service accounts or dedicated job owner logins required by your organization's security policies.

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


&nbsp;
