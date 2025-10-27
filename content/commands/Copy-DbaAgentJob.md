---
title: "Copy-DbaAgentJob"
slug: "Copy-DbaAgentJob"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Migrates SQL Server Agent jobs between instances with dependency validation"
tags:
  - "Migration"
  - "Agent"
  - "Job"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentJob.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaAgentJob"
draft: false
---

# Copy-DbaAgentJob

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaAgentJob](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentJob.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaAgentJob](https://dataplat.github.io/boh#Copy-DbaAgentJob).

## Synopsis

Migrates SQL Server Agent jobs between instances with dependency validation

## Description

Copies SQL Server Agent jobs from one instance to another while automatically validating all dependencies including databases, logins, proxy accounts, and operators. This eliminates the manual process of checking prerequisites before moving jobs during migrations, disaster recovery, or environment promotions.  
  
The function intelligently skips jobs associated with maintenance plans and provides detailed validation messages for any missing dependencies. By default, existing jobs are preserved unless -Force is specified to overwrite them.

## Syntax

```powershell
Copy-DbaAgentJob
    [[-Source] <DbaInstanceParameter>]
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Job] <Object[]>]
    [[-ExcludeJob] <Object[]>]
    [-DisableOnSource]
    [-DisableOnDestination]
    [-Force]
    [[-InputObject] <Job[]>]
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
PS C:\> Copy-DbaAgentJob -Source sqlserver2014a -Destination sqlcluster
```

Copies all jobs from sqlserver2014a to sqlcluster, using Windows credentials. If jobs with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaAgentJob -Source sqlserver2014a -Destination sqlcluster -Job PSJob -SourceSqlCredential $cred -Force
```

Copies a single job, the PSJob job from sqlserver2014a to sqlcluster, using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If a job with the same name exists on <br>
sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaAgentJob -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sqlserver2014a | Where-Object Category -eq "Report Server" | Copy-DbaAgentJob -Destination sqlserver2014b
```

Copies all SSRS jobs (subscriptions) from AlwaysOn Primary SQL instance sqlserver2014a to AlwaysOn Secondary SQL instance sqlserver2014b<br>

### Required Parameters

##### -Destination

Destination SQL Server instance(s) where jobs will be created. You must have sysadmin access and the server must be SQL Server 2000 or higher.  
Supports multiple destinations to copy jobs to multiple servers simultaneously during migrations or DR setup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Source

Source SQL Server instance containing the jobs to copy. You must have sysadmin access and server version must be SQL Server version 2000 or higher.  
Use this when copying jobs from a specific instance rather than piping job objects with InputObject.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SourceSqlCredential

Alternative credentials for connecting to the source SQL Server instance. Accepts PowerShell credentials (Get-Credential).  
Use this when the source server requires different authentication than your current Windows session, such as SQL authentication or cross-domain scenarios.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Alternative credentials for connecting to the destination SQL Server instance. Accepts PowerShell credentials (Get-Credential).  
Use this when the destination server requires different authentication than your current Windows session, such as SQL authentication or cross-domain scenarios.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Job

Specifies which SQL Agent jobs to copy by name. Accepts wildcards and multiple job names.  
Use this to copy specific jobs instead of all jobs, such as during selective migrations or when testing job deployments.  
If unspecified, all jobs will be processed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Specifies which SQL Agent jobs to skip during the copy operation. Accepts wildcards and multiple job names.  
Use this to exclude specific jobs from bulk operations, such as skipping environment-specific jobs or maintenance tasks that shouldn't be migrated.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DisableOnSource

Disables the job on the source server after successfully copying it to the destination.  
Use this during server migrations or failover scenarios where you want to prevent the job from running on the old server while it runs on the new one.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableOnDestination

Creates the job on the destination server but leaves it disabled.  
Use this when deploying jobs to test environments or when you need to review and modify job steps before enabling them in the new environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Overwrites existing jobs on the destination server and automatically sets missing job owners to the 'sa' login.  
Use this when you need to replace existing jobs or when source job owners don't exist on the destination server during migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts SQL Agent job objects from the pipeline, typically from Get-DbaAgentJob.  
Use this to copy pre-filtered jobs or when combining with other job management cmdlets for complex workflows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
