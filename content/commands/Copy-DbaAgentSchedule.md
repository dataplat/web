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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaAgentSchedule</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentSchedule.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Copy-DbaAgentSchedule -Source sqlserver2014a -Destination sqlcluster" }

Copies all shared job schedules from sqlserver2014a to sqlcluster using Windows credentials. If shared job schedules with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaAgentSchedule -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaAgentSchedule -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force" }

Shows what would happen if the command were executed using force.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance sql2016 | Out-GridView -Passthru | Copy-DbaAgentSchedule -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Get-DbaAgentSchedule -SqlInstance sql2016 | Out-GridView -Passthru | Copy-DbaAgentSchedule -Destination sqlcluster" }

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
