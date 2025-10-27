---
title: "Remove-DbaAgentJobCategory"
slug: "Remove-DbaAgentJobCategory"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server Agent job categories from one or more instances."
tags:
  - "Agent"
  - "Job"
  - "JobCategory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentJobCategory.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgentJobCategory"
draft: false
---

# Remove-DbaAgentJobCategory

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad, sqlstad.nl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgentJobCategory](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentJobCategory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgentJobCategory](https://dataplat.github.io/boh#Remove-DbaAgentJobCategory).

## Synopsis

Removes SQL Server Agent job categories from one or more instances.

## Description

Removes custom SQL Server Agent job categories that are no longer needed for job organization and management.  
This is useful when cleaning up obsolete categories after reorganizing jobs or migrating workloads between environments.  
Any jobs currently assigned to a removed category will automatically be reassigned to the default "[Uncategorized (Local)]" category.  
The function provides safety controls and detailed status reporting to ensure successful cleanup operations.

## Syntax

```powershell
Remove-DbaAgentJobCategory
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Category <String[]>]
    [-CategoryType <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaAgentJobCategory -InputObject <JobCategory[]>
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
PS C:\> Remove-DbaAgentJobCategory -SqlInstance sql1 -Category 'Category 1'
```

Remove the job category Category 1 from the instance.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaAgentJobCategory -SqlInstance sql1 -Category Category1, Category2, Category3
```

Remove multiple job categories from the instance.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaAgentJobCategory -SqlInstance sql1, sql2, sql3 -Category Category1, Category2, Category3
```

Remove multiple job categories from the multiple instances.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJobCategory -SqlInstance SRV1 | Out-GridView -Title 'Select SQL Agent job category(-ies) to drop' -OutputMode Multiple | Remove-DbaAgentJobCategory
```

Using a pipeline this command gets all SQL Agent job category(-ies) on SRV1, lets the user select those to remove and then removes the selected SQL Agent job category(-ies).<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Agent job category objects from the pipeline, typically from Get-DbaAgentJobCategory.  
Use this for interactive category selection workflows or when you need to filter categories before removal using Get-DbaAgentJobCategory's filtering options.

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

Specifies the name of the SQL Agent job category to remove from the instance. Accepts multiple category names for batch operations.  
Use this when you need to clean up specific custom categories that are no longer needed for job organization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CategoryType

Filters categories by their type: "LocalJob" for single-server jobs, "MultiServerJob" for multi-server administration jobs, or "None" for uncategorized jobs.  
Use this to target specific category types when cleaning up job organization structures. If omitted, all category types will be processed.

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
