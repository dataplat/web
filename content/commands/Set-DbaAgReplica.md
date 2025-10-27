---
title: "Set-DbaAgReplica"
slug: "Set-DbaAgReplica"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Modifies configuration properties of existing availability group replicas."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgReplica.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgReplica"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaAgReplica</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgReplica.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Modifies configuration properties of existing availability group replicas.

## Description

Modifies configuration properties of existing availability group replicas such as availability mode, failover behavior, backup priority, and read-only routing settings. This function is used for ongoing management and tuning of availability groups after initial setup, allowing you to adjust replica behavior without recreating the availability group.  
  
Common use cases include changing synchronous replicas to asynchronous for performance, adjusting backup priorities to control where backups run, configuring automatic failover settings, and setting up read-only routing for load balancing read workloads across secondary replicas.

## Syntax

```powershell
Set-DbaAgReplica
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String>]
    [[-Replica] <String>]
    [[-AvailabilityMode] <String>]
    [[-FailoverMode] <String>]
    [[-BackupPriority] <Int32>]
    [[-ConnectionModeInPrimaryRole] <String>]
    [[-ConnectionModeInSecondaryRole] <String>]
    [[-SeedingMode] <String>]
    [[-SessionTimeout] <Int32>]
    [[-EndpointUrl] <String>]
    [[-ReadonlyRoutingConnectionUrl] <String>]
    [[-ReadOnlyRoutingList] <Object[]>]
    [[-InputObject] <AvailabilityReplica>]
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
PS C:\> Set-DbaAgReplica -SqlInstance sql2016 -Replica sql2016 -AvailabilityGroup SharePoint -BackupPriority 5000
```
{: data-copyable="true" data-clean-code="Set-DbaAgReplica -SqlInstance sql2016 -Replica sql2016 -AvailabilityGroup SharePoint -BackupPriority 5000" }

Sets the backup priority to 5000 for the sql2016 replica for the SharePoint availability group on sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgReplica -SqlInstance sql2016 | Out-GridView -Passthru | Set-DbaAgReplica -BackupPriority 5000
```
{: data-copyable="true" data-clean-code="Get-DbaAgReplica -SqlInstance sql2016 | Out-GridView -Passthru | Set-DbaAgReplica -BackupPriority 5000" }

Sets the backup priority to 5000 for the selected availability groups.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgReplica -SqlInstance sql2016 -Replica Replica1 |
>> Set-DbaAgReplica -ReadOnlyRoutingList Replica2, Replica3
```
{: data-copyable="true" data-clean-code="Get-DbaAgReplica -SqlInstance sql2016 -Replica Replica1 |
Set-DbaAgReplica -ReadOnlyRoutingList Replica2, Replica3" }

Equivalent to running "ALTER AVAILABILITY GROUP... MODIFY REPLICA... (READ_ONLY_ROUTING_LIST = ('Replica2', 'Replica3'));"<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgReplica -SqlInstance sql2016 -Replica Replica1 |
>> Set-DbaAgReplica -ReadOnlyRoutingList @(,('Replica2','Replica3'));
```
{: data-copyable="true" data-clean-code="Get-DbaAgReplica -SqlInstance sql2016 -Replica Replica1 |
Set-DbaAgReplica -ReadOnlyRoutingList @(,('Replica2','Replica3'));" }

Equivalent to running "ALTER AVAILABILITY GROUP... MODIFY REPLICA... (READ_ONLY_ROUTING_LIST = (('Replica2', 'Replica3')));" setting a load balanced routing list for when Replica1 is the primary <br>
replica.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2012 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -AvailabilityGroup

Specifies the name of the availability group that contains the replica to modify.  
Required when using SqlInstance parameter to identify which availability group the replica belongs to.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Replica

Specifies the name of the availability group replica to modify. This is the server instance name that hosts the replica.  
Use this when targeting a specific replica within an availability group for configuration changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityMode

Controls the data synchronization mode between primary and secondary replicas. SynchronousCommit ensures zero data loss but may impact performance, while AsynchronousCommit prioritizes performance   
over guaranteed data protection.  
Change this when you need to balance performance requirements against data protection needs across different replicas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | AsynchronousCommit,SynchronousCommit |

##### -FailoverMode

Determines whether the replica can automatically failover when the primary becomes unavailable. Automatic failover requires SynchronousCommit availability mode and is typically used for high   
availability scenarios.  
Set to Manual when you want to control failover decisions or when using AsynchronousCommit replicas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Automatic,Manual,External |

##### -BackupPriority

Sets the backup priority for this replica on a scale of 0-100, where higher values indicate higher priority for backup operations.  
Use this to control which replica should be preferred for automated backup jobs, with 0 excluding the replica from backup consideration entirely.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -ConnectionModeInPrimaryRole

Controls what types of connections are allowed when this replica is the primary. AllowAllConnections permits both read-write and read-only connections, while AllowReadWriteConnections only allows   
read-write access.  
Typically left as AllowAllConnections unless you need to restrict read-only workloads from connecting to the primary.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | AllowAllConnections,AllowReadWriteConnections |

##### -ConnectionModeInSecondaryRole

Determines connection access when this replica is secondary. Options include AllowNoConnections, AllowReadIntentConnectionsOnly (for read-only workloads), or AllowAllConnections.  
Configure this to enable read-only workloads on secondary replicas for reporting or to completely block connections for backup-only replicas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | AllowAllConnections,AllowNoConnections,AllowReadIntentConnectionsOnly,No,Read-intent only,Yes |

##### -SeedingMode

Controls the database initialization method for new databases added to the availability group. Automatic performs direct seeding over the network without manual backup/restore steps, while Manual   
requires traditional backup and restore operations.  
Choose Automatic for convenience and reduced administrative overhead, or Manual when you need control over backup/restore timing or have network bandwidth constraints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Automatic,Manual |

##### -SessionTimeout

Sets the timeout period in seconds for detecting communication failures between availability replicas. Values below 10 seconds can cause false failure detection in busy environments.  
Increase this value in high-latency network environments or decrease it when you need faster failure detection, keeping the 10-second minimum recommendation in mind.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -EndpointUrl

Specifies the URL endpoint used for data mirroring communication between replicas, typically in the format 'TCP://servername:port'.  
Update this when changing network configurations, server names, or port assignments for availability group communication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReadonlyRoutingConnectionUrl

Specifies the connection string used by the availability group listener to route read-only connections to this secondary replica.  
Required when setting up read-only routing to distribute read workloads across secondary replicas for load balancing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReadOnlyRoutingList

Defines the ordered list of secondary replicas that should receive read-only connections when this replica is primary. Accepts arrays for load-balanced routing or simple arrays for priority-based   
routing.  
Use this to establish read-only routing policies that distribute read workloads across available secondary replicas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group replica objects from Get-DbaAgReplica for pipeline operations.  
Use this to modify multiple replicas or when working with replica objects retrieved from previous commands.

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
