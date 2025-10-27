---
title: "New-DbaAgentJobCategory"
slug: "New-DbaAgentJobCategory"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Creates new SQL Server Agent job categories for organizing and managing jobs."
tags:
  - "Agent"
  - "Job"
  - "JobCategory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentJobCategory.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAgentJobCategory"
draft: false
---

# New-DbaAgentJobCategory

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaAgentJobCategory](https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentJobCategory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaAgentJobCategory](https://dataplat.github.io/boh#New-DbaAgentJobCategory).

## Synopsis

Creates new SQL Server Agent job categories for organizing and managing jobs.

## Description

Creates custom job categories in SQL Server Agent to help organize and classify jobs by function, department, or priority level. Job categories provide a way to group related jobs together for easier management and reporting, replacing the need to manually create categories through SQL Server Management Studio. You can specify whether the category is for local jobs, multi-server jobs, or general use, with LocalJob being the default type.

## Syntax

```powershell
New-DbaAgentJobCategory
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Category] <String[]>
    [[-CategoryType] <String>]
    [-Force]
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
PS C:\> New-DbaAgentJobCategory -SqlInstance sql1 -Category 'Category 1'
```

Creates a new job category with the name 'Category 1'.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaAgentJobCategory -SqlInstance sql1 -Category 'Category 2' -CategoryType MultiServerJob
```

Creates a new job category with the name 'Category 2' and assign the category type for a multi server job.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Category

Specifies the name of the SQL Agent job category to create. Accepts multiple category names when you need to create several categories at once.  
Use descriptive names that reflect job functions like 'Database Maintenance', 'ETL Jobs', or 'Reporting' to help organize jobs by purpose or department.

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

##### -CategoryType

Defines the scope and purpose of the job category. Valid options are "LocalJob" for jobs that run on the local instance, "MultiServerJob" for jobs in multi-server environments, or "None" for   
general-purpose categories.  
Defaults to "LocalJob" when not specified, which is appropriate for most standalone SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | LocalJob,MultiServerJob,None |

##### -Force

Suppresses confirmation prompts during category creation. Sets the confirmation preference to bypass interactive confirmation requests.  
Use this when automating category creation in scripts where manual confirmation is not desired or possible.

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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
