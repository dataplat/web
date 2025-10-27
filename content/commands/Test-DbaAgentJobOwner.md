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

# Test-DbaAgentJobOwner

| Property | Value |
| --- | --- |
| **Author** | Michael Fal (@Mike_Fal), mikefal.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaAgentJobOwner](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaAgentJobOwner.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaAgentJobOwner](https://dataplat.github.io/boh#Test-DbaAgentJobOwner).

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

Returns all SQL Agent Jobs where the owner does not match 'sa'.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaAgentJobOwner -SqlInstance localhost -ExcludeJob 'syspolicy_purge_history'
```

Returns SQL Agent Jobs except for the syspolicy_purge_history job<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaAgentJobOwner -SqlInstance localhost -Login DOMAIN\account
```

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
