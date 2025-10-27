---
title: "Stop-DbaAgentJob"
slug: "Stop-DbaAgentJob"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Stops running SQL Server Agent jobs by calling their Stop() method."
tags:
  - "Job"
  - "Agent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaAgentJob.ps1"
bohUrl: "https://dataplat.github.io/boh#Stop-DbaAgentJob"
draft: false
---

# Stop-DbaAgentJob

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Stop-DbaAgentJob](https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaAgentJob.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Stop-DbaAgentJob](https://dataplat.github.io/boh#Stop-DbaAgentJob).

## Synopsis

Stops running SQL Server Agent jobs by calling their Stop() method.

## Description

Stops currently executing SQL Server Agent jobs and returns the job objects for verification after the stop attempt.  
Perfect for halting runaway jobs during maintenance windows, stopping jobs that are causing blocking or performance issues, or clearing job queues before scheduled operations.  
The function automatically skips jobs that are already idle and can optionally wait until jobs have completely finished stopping before returning results.  
Works with individual job names, exclusion filters, or accepts piped job objects from Get-DbaAgentJob and other dbatools commands.

## Syntax

```powershell
Stop-DbaAgentJob
    [-SqlCredential <PSCredential>]
    [-Job <String[]>]
    [-ExcludeJob <String[]>]
    [-Wait]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Stop-DbaAgentJob -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Job <String[]>]
    [-ExcludeJob <String[]>]
    [-Wait]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Stop-DbaAgentJob
    [-SqlCredential <PSCredential>]
    [-Job <String[]>]
    [-ExcludeJob <String[]>]
    -InputObject <Job[]>
    [-Wait]
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
PS C:\> Stop-DbaAgentJob -SqlInstance localhost
```

Stops all running SQL Agent Jobs on the local SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 -Job cdc.DBWithCDC_capture | Stop-DbaAgentJob
```

Stops the cdc.DBWithCDC_capture SQL Agent Job on sql2016<br>

#####  Example:  3 

```powershell
PS C:\> Stop-DbaAgentJob -SqlInstance sql2016 -Job cdc.DBWithCDC_capture
```

Stops the cdc.DBWithCDC_capture SQL Agent Job on sql2016<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Agent job objects from pipeline operations, typically from Get-DbaAgentJob or other dbatools commands.  
This allows you to filter jobs using complex criteria upstream and then pipe the results directly to Stop-DbaAgentJob for processing.

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

Specifies which SQL Agent jobs to stop by name. Accepts exact job names from the target instance.  
Use this when you need to stop specific jobs instead of all running jobs. If unspecified, all currently running jobs will be processed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Specifies SQL Agent job names to exclude from the stop operation. Accepts exact job names from the target instance.  
Use this when you want to stop most jobs but preserve critical ones like backup jobs, monitoring jobs, or maintenance routines during troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Wait

Waits for each job to completely finish stopping before returning results. Without this switch, the function returns immediately after sending the stop command.  
Use this when you need to ensure jobs have fully terminated before proceeding with subsequent operations like maintenance or troubleshooting steps.

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
