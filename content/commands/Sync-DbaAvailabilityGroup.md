---
title: "Sync-DbaAvailabilityGroup"
slug: "Sync-DbaAvailabilityGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Synchronizes server-level objects from primary to secondary replicas in availability groups"
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Sync-DbaAvailabilityGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Sync-DbaAvailabilityGroup"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Sync-DbaAvailabilityGroup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Sync-DbaAvailabilityGroup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Synchronizes server-level objects from primary to secondary replicas in availability groups

## Description

Copies server-level objects from the primary replica to all secondary replicas in an availability group. Availability groups only synchronize databases, not the server-level dependencies that applications need to function properly after failover.  
  
This command ensures that logins, SQL Agent jobs, linked servers, and other critical server objects exist on all replicas so your applications work seamlessly regardless of which replica becomes primary. By default, it synchronizes these object types:  
  
SpConfigure  
CustomErrors  
Credentials  
DatabaseMail  
LinkedServers  
Logins  
LoginPermissions  
SystemTriggers  
DatabaseOwner  
AgentCategory  
AgentOperator  
AgentAlert  
AgentProxy  
AgentSchedule  
AgentJob  
  
Any of these object types can be excluded using the -Exclude parameter. For granular control over specific objects (like excluding individual jobs or logins), use the -ExcludeJob, -ExcludeLogin parameters or the underlying Copy-Dba* commands directly.  
  
The command copies ALL objects of each enabled type - it doesn't filter based on which objects are actually used by the availability group databases. Use the exclusion parameters to limit scope when needed.

## Syntax

```powershell
Sync-DbaAvailabilityGroup
    [[-Primary] <DbaInstanceParameter>]
    [[-PrimarySqlCredential] <PSCredential>]
    [[-Secondary] <DbaInstanceParameter[]>]
    [[-SecondarySqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String>]
    [[-Exclude] <String[]>]
    [[-Login] <String[]>]
    [[-ExcludeLogin] <String[]>]
    [[-Job] <String[]>]
    [[-ExcludeJob] <String[]>]
    [-DisableJobOnDestination]
    [[-InputObject] <AvailabilityGroup[]>]
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
PS C:\> Sync-DbaAvailabilityGroup -Primary sql2016a -AvailabilityGroup db3
```
{: data-copyable="true" data-clean-code="Sync-DbaAvailabilityGroup -Primary sql2016a -AvailabilityGroup db3" }

Syncs the following on all replicas found in the db3 AG:<br>
SpConfigure, CustomErrors, Credentials, DatabaseMail, LinkedServers<br>
Logins, LoginPermissions, SystemTriggers, DatabaseOwner, AgentCategory,<br>
AgentOperator, AgentAlert, AgentProxy, AgentSchedule, AgentJob<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2016a | Sync-DbaAvailabilityGroup -ExcludeType LoginPermissions, LinkedServers -ExcludeLogin login1, login2 -Job job1, job2
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql2016a | Sync-DbaAvailabilityGroup -ExcludeType LoginPermissions, LinkedServers -ExcludeLogin login1, login2 -Job job1, job2" }

Syncs the following on all replicas found in all AGs on the specified instance:<br>
SpConfigure, CustomErrors, Credentials, DatabaseMail, Logins,<br>
SystemTriggers, DatabaseOwner, AgentCategory, AgentOperator<br>
AgentAlert, AgentProxy, AgentSchedule, AgentJob.<br>
Copies all logins except for login1 and login2 and only syncs job1 and job2<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2016a | Sync-DbaAvailabilityGroup -WhatIf
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql2016a | Sync-DbaAvailabilityGroup -WhatIf" }

Shows what would happen if the command were to run but doesn't actually perform the action.<br>

### Optional Parameters

##### -Primary

The primary replica SQL Server instance for the availability group. This is the source server from which all server-level objects will be copied.  
Required when not using InputObject parameter. Server version must be SQL Server 2012 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PrimarySqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Secondary

The secondary replica SQL Server instances where server-level objects will be copied to. Can specify multiple instances.  
If not specified, the function will automatically discover all secondary replicas in the availability group. Server version must be SQL Server 2012 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecondarySqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

The name of the specific availability group to synchronize server objects for.  
When specified, the function will identify all replicas in this AG and sync objects from primary to all secondaries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Exclude

Excludes specific object types from being synchronized to avoid conflicts or reduce sync time.  
Useful when you need to manually manage certain objects or when some object types cause issues in your environment. Valid values:  
SpConfigure, CustomErrors, Credentials, DatabaseMail, LinkedServers, Logins, LoginPermissions,  
SystemTriggers, DatabaseOwner, AgentCategory, AgentOperator, AgentAlert, AgentProxy, AgentSchedule, AgentJob

| Property | Value |
| --- | --- |
| Alias | ExcludeType |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | AgentCategory,AgentOperator,AgentAlert,AgentProxy,AgentSchedule,AgentJob,Credentials,CustomErrors,DatabaseMail,DatabaseOwner,LinkedServers,Logins,LoginPermissions,SpConfigure,SystemTriggers |

##### -Login

Specifies which login accounts to synchronize to secondary replicas. Accepts an array of login names.  
Use this when you only need to sync specific service accounts or application logins rather than all logins on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeLogin

Specifies login accounts to skip during synchronization. Accepts an array of login names.  
Commonly used to exclude system accounts, sa, or logins that should remain unique per replica for monitoring or maintenance purposes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Job

Specifies which SQL Agent jobs to synchronize to secondary replicas. Accepts an array of job names.  
Use this when you only need to sync critical jobs like backup jobs or maintenance tasks rather than all jobs on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Specifies SQL Agent jobs to skip during synchronization. Accepts an array of job names.  
Commonly used to exclude replica-specific jobs like log shipping, local backups, or jobs that should only run on the primary replica.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DisableJobOnDestination

Disables all synchronized jobs on secondary replicas after copying them from the primary.  
Use this when jobs should only run on the primary replica or when you need to manually control which jobs run on each replica after failover.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts availability group objects from Get-DbaAvailabilityGroup for pipeline processing.  
Use this to sync multiple availability groups at once or to process specific AGs returned by filtering commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Drops and recreates existing objects on secondary replicas instead of skipping them.  
Use this when you need to update objects that already exist on secondaries or when objects have configuration differences that need to be synchronized.

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
