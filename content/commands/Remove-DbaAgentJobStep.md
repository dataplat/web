---
title: "Remove-DbaAgentJobStep"
slug: "Remove-DbaAgentJobStep"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Removes specified job steps from SQL Server Agent jobs."
tags:
  - "Agent"
  - "Job"
  - "JobStep"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentJobStep.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgentJobStep"
draft: false
---

# Remove-DbaAgentJobStep

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgentJobStep](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentJobStep.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgentJobStep](https://dataplat.github.io/boh#Remove-DbaAgentJobStep).

## Synopsis

Removes specified job steps from SQL Server Agent jobs.

## Description

Removes individual job steps from SQL Server Agent jobs by step name. This function validates that both the job and step exist before attempting removal, preventing errors when cleaning up outdated or broken job steps. Useful for job maintenance tasks like removing obsolete backup steps, failed notification steps, or deprecated processes without affecting the rest of the job workflow.

## Syntax

```powershell
Remove-DbaAgentJobStep
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Job] <Object[]>
    [-StepName] <String>
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
PS C:\> Remove-DbaAgentJobStep -SqlInstance sql1 -Job Job1 -StepName Step1
```

Remove 'Step1' from job 'Job1' on sql1.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaAgentJobStep -SqlInstance sql1 -Job Job1, Job2, Job3 -StepName Step1
```

Remove the job step from multiple jobs.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaAgentJobStep -SqlInstance sql1, sql2, sql3 -Job Job1 -StepName Step1
```

Remove the job step from the job on multiple servers.<br>

#####  Example:  4 

```powershell
PS C:\> sql1, sql2, sql3 | Remove-DbaAgentJobStep -Job Job1 -StepName Step1
```

Remove the job step from the job on multiple servers using pipeline.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Job

Specifies the SQL Agent job(s) from which to remove the step. Accepts multiple job names for bulk operations.  
Use this when you need to remove the same step from multiple jobs, such as cleaning up outdated notification steps across maintenance jobs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -StepName

Specifies the exact name of the job step to remove from the specified jobs. Step names are case-sensitive and must match exactly.  
Use this when you need to remove specific steps like obsolete backup verification steps, deprecated notification steps, or failed job components.

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
