---
title: "Copy-DbaAgentSchedule"
slug: "Copy-DbaAgentSchedule"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Migrates SQL Agent shared job schedules between SQL Server instances for job schedule standardization."
tags:
  - "Migration"
  - "Agent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentSchedule.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaAgentSchedule"
draft: false
---

# Copy-DbaAgentSchedule

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaAgentSchedule](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentSchedule.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaAgentSchedule](https://dataplat.github.io/boh#Copy-DbaAgentSchedule).

## Synopsis

Migrates SQL Agent shared job schedules between SQL Server instances for job schedule standardization.

## Description

Copies shared job schedules (not job-specific schedules) from the source SQL Server Agent to one or more destination instances using T-SQL scripting. This is essential when standardizing job schedules across multiple servers or migrating Agent configurations to new instances. Existing schedules are skipped by default unless -Force is specified, and schedules with associated jobs cannot be overwritten even with Force to prevent breaking existing job assignments. Use this instead of manually recreating complex recurring schedules with specific timing requirements across your SQL Server environment.

## Syntax

```powershell
Copy-DbaAgentSchedule
    [[-Source] <DbaInstanceParameter>]
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Schedule] <String[]>]
    [[-Id] <Int32[]>]
    [[-InputObject] <JobSchedule[]>]
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
PS C:\> Copy-DbaAgentSchedule -Source sqlserver2014a -Destination sqlcluster
```

Copies all shared job schedules from sqlserver2014a to sqlcluster using Windows credentials. If shared job schedules with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaAgentSchedule -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance sql2016 | Out-GridView -Passthru | Copy-DbaAgentSchedule -Destination sqlcluster
```

Gets a list of schedule, outputs to a gridview which can be selected from, then copies to SqlInstance<br>

### Required Parameters

##### -Destination

Specifies one or more destination SQL Server instances where the shared job schedules will be copied. This parameter accepts multiple instances, allowing you to deploy schedules to several servers   
simultaneously.  
Use this when standardizing schedules across multiple instances or when migrating Agent configurations to new servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Source

Specifies the source SQL Server instance containing the shared job schedules to copy. When specified, all shared schedules (or those filtered by Schedule/Id parameters) will be copied from this   
instance.  
Use this parameter when copying schedules from a specific server, or omit it when piping schedules from Get-DbaAgentSchedule.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SourceSqlCredential

Specifies alternative credentials for connecting to the source SQL Server instance. Use this when the current Windows user lacks sufficient permissions or when connecting with SQL Server   
authentication.  
Accepts credentials created with Get-Credential or saved credential objects. Required when copying from instances that don't accept your current Windows authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Specifies alternative credentials for connecting to the destination SQL Server instances. Use this when the current Windows user lacks sufficient permissions on the target servers or when connecting   
with SQL Server authentication.  
Accepts credentials created with Get-Credential or saved credential objects. Required when copying to instances that don't accept your current Windows authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schedule

Filters the operation to copy only schedules with specific names. Accepts an array of schedule names using wildcard patterns for flexible matching.  
Use this when you need to copy only certain schedules instead of all shared schedules. Since SQL Server allows duplicate schedule names, combine with Id parameter for precise targeting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Id

Filters the operation to copy only schedules with specific numeric IDs. Accepts an array of schedule IDs for targeting multiple specific schedules.  
Use this instead of schedule names when you need precise identification, especially when duplicate schedule names exist on the source instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts job schedule objects from the pipeline, typically from Get-DbaAgentSchedule. When provided, these specific schedule objects will be copied instead of querying the source instance.  
Use this for advanced scenarios like selective copying based on complex filtering or when working with schedules from multiple source instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Forces the overwrite of existing schedules on the destination instances by dropping and recreating them. Without this switch, existing schedules are skipped.  
Use this when you need to update existing schedules with new configurations. Note that schedules currently assigned to jobs cannot be overwritten, even with Force enabled.

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
