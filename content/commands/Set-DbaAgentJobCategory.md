---
title: "Set-DbaAgentJobCategory"
slug: "Set-DbaAgentJobCategory"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Renames SQL Server Agent job categories to standardize naming conventions across instances."
tags:
  - "Agent"
  - "Job"
  - "JobCategory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJobCategory.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgentJobCategory"
draft: false
---

# Set-DbaAgentJobCategory

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaAgentJobCategory](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJobCategory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaAgentJobCategory](https://dataplat.github.io/boh#Set-DbaAgentJobCategory).

## Synopsis

Renames SQL Server Agent job categories to standardize naming conventions across instances.

## Description

Renames existing SQL Server Agent job categories by updating their names in the msdb database. This is particularly useful for standardizing job category naming conventions across multiple environments or correcting categories that were created with inconsistent names. The function validates that source categories exist and prevents renaming to names that already exist, helping maintain clean job organization within SQL Server Agent.

## Syntax

```powershell
Set-DbaAgentJobCategory
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Category] <String[]>]
    [[-NewName] <String[]>]
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
PS C:\> New-DbaAgentJobCategory -SqlInstance sql1 -Category 'Category 1' -NewName 'Category 2'
```

Change the name of the category from 'Category 1' to 'Category 2'.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaAgentJobCategory -SqlInstance sql1, sql2 -Category Category1, Category2 -NewName cat1, cat2
```

Rename multiple jobs in one go on multiple servers.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

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

Specifies the existing job category name(s) to rename. The category must already exist in the SQL Server Agent on the target instance.  
Use this to identify which job categories need standardized naming across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NewName

Specifies the new name(s) for the job category. The new name cannot already exist on the target instance.  
When renaming multiple categories, provide names in the same order as the Category parameter values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Bypasses confirmation prompts and performs the rename operation without asking for user confirmation.  
Use this when scripting bulk category renames where manual confirmation would be impractical.

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
