---
title: "Get-DbaAgentJobCategory"
slug: "Get-DbaAgentJobCategory"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent job categories with usage counts and filtering options"
tags:
  - "Agent"
  - "Job"
  - "Category"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobCategory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentJobCategory"
draft: false
---

# Get-DbaAgentJobCategory

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentJobCategory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobCategory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentJobCategory](https://dataplat.github.io/boh#Get-DbaAgentJobCategory).

## Synopsis

Retrieves SQL Server Agent job categories with usage counts and filtering options

## Description

Returns SQL Server Agent job categories from one or more instances, showing how many jobs are assigned to each category. Job categories help organize and group related SQL Agent jobs for easier management and reporting. This function retrieves both built-in categories (like Database Maintenance, Log Shipping) and custom categories created by DBAs. You can filter by specific category names or types (LocalJob for single-instance jobs, MultiServerJob for MSX/TSX environments, or None for uncategorized jobs) to focus on particular organizational schemes.

## Syntax

```powershell
Get-DbaAgentJobCategory
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Category] <String[]>]
    [[-CategoryType] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentJobCategory -SqlInstance sql1
```

Return all the job categories.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJobCategory -SqlInstance sql1 -Category 'Log Shipping'
```

Return all the job categories that have the name 'Log Shipping'.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentJobCategory -SqlInstance sstad-pc -CategoryType MultiServerJob
```

Return all the job categories that have a type MultiServerJob.<br>

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

##### -Category

Specifies one or more job category names to return, filtering the results to only those categories. Accepts multiple values and supports built-in categories like 'Database Maintenance', 'Log   
Shipping', 'Replication', and custom categories created by DBAs.  
Use this when you need to check specific categories for job assignments or verify custom organizational schemes. If not specified, all job categories are returned.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CategoryType

Filters job categories by their deployment type: 'LocalJob' for single-instance jobs, 'MultiServerJob' for Master Server/Target Server (MSX/TSX) environments, or 'None' for uncategorized jobs.  
Use this in MSX/TSX configurations to distinguish between locally managed jobs and multi-server jobs, or to identify jobs that haven't been assigned a proper category. If not specified, all category   
types are returned.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | LocalJob,MultiServerJob,None |

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
