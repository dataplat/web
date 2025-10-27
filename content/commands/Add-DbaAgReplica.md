---
title: "Add-DbaAgReplica"
slug: "Add-DbaAgReplica"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Adds a replica to an availability group on one or more SQL Server instances."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaAgReplica.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaAgReplica"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaAgReplica</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaAgReplica.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Adds a replica to an availability group on one or more SQL Server instances.

## Description

Adds a replica to an availability group on one or more SQL Server instances.  
  
Automatically creates database mirroring endpoints if required.

## Syntax

```powershell
Add-DbaAgReplica
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String>]
    [[-ClusterType] <String>]
    [[-AvailabilityMode] <String>]
    [[-FailoverMode] <String>]
    [[-BackupPriority] <Int32>]
    [[-ConnectionModeInPrimaryRole] <String>]
    [[-ConnectionModeInSecondaryRole] <String>]
    [[-SeedingMode] <String>]
    [[-Endpoint] <String>]
    [[-EndpointUrl] <String[]>]
    [-Passthru]
    [[-ReadOnlyRoutingList] <String[]>]
    [[-ReadonlyRoutingConnectionUrl] <String>]
    [[-Certificate] <String>]
    [-ConfigureXESession]
    [[-SessionTimeout] <Int32>]
    [-InputObject] <AvailabilityGroup>
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
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017a -AvailabilityGroup SharePoint | Add-DbaAgReplica -SqlInstance sql2017b
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql2017a -AvailabilityGroup SharePoint | Add-DbaAgReplica -SqlInstance sql2017b" }

Adds sql2017b to the SharePoint availability group on sql2017a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017a -AvailabilityGroup SharePoint | Add-DbaAgReplica -SqlInstance sql2017b -FailoverMode Manual
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql2017a -AvailabilityGroup SharePoint | Add-DbaAgReplica -SqlInstance sql2017b -FailoverMode Manual" }

Adds sql2017b to the SharePoint availability group on sql2017a with a manual failover mode.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017a -AvailabilityGroup SharePoint | Add-DbaAgReplica -SqlInstance sql2017b -EndpointUrl 'TCP://sql2017b.specialnet.local:5022'
```
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql2017a -AvailabilityGroup SharePoint | Add-DbaAgReplica -SqlInstance sql2017b -EndpointUrl 'TCP://sql2017b.specialnet.local:5022'" }

Adds sql2017b to the SharePoint availability group on sql2017a with a custom endpoint URL.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2012 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group objects from Get-DbaAvailabilityGroup for pipeline operations. This is the target availability group where the replica will be added.  
Use pipeline scenarios like 'Get-DbaAvailabilityGroup -AvailabilityGroup "AG1" | Add-DbaAgReplica -SqlInstance server2' for streamlined replica management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target instances using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Sets the display name for the availability group replica being added. Defaults to the SQL Server instance's domain instance name.  
Use this when you need a custom replica name that differs from the server name, such as for clarity in multi-subnet scenarios.  
This parameter is only supported when adding a replica to a single instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ClusterType

Specifies the underlying clustering technology for the availability group. Only supported in SQL Server 2017 and above.  
Use 'Wsfc' for traditional Windows Server Failover Cluster setups, 'External' for Linux Pacemaker clusters, or 'None' for read-scale availability groups.  
Defaults to 'Wsfc' which handles most Windows-based high availability scenarios.  
The default can be changed with:  
Set-DbatoolsConfig -FullName 'AvailabilityGroups.Default.ClusterType' -Value '...' -Passthru | Register-DbatoolsConfig

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'AvailabilityGroups.Default.ClusterType' -Fallback 'Wsfc') |
| Accepted Values | Wsfc,External,None |

##### -AvailabilityMode

Controls how the replica commits transactions relative to the primary replica. SynchronousCommit waits for secondary confirmation before committing, ensuring zero data loss but higher latency.  
AsynchronousCommit commits immediately on primary without waiting for secondary confirmation, providing better performance but potential data loss during failover.  
Defaults to SynchronousCommit for maximum data protection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | SynchronousCommit |
| Accepted Values | AsynchronousCommit,SynchronousCommit |

##### -FailoverMode

Determines whether the replica can automatically fail over when the primary becomes unavailable. Automatic failover requires SynchronousCommit availability mode and provides seamless high   
availability.  
Manual failover requires DBA intervention but works with both synchronous and asynchronous commit modes.  
Defaults to Automatic for immediate failover capabilities.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Automatic |
| Accepted Values | Automatic,Manual,External |

##### -BackupPriority

Sets the replica's preference for hosting backups within the availability group, ranging from 0-100 where higher values indicate higher priority.  
Use this to designate specific replicas for backup operations, such as setting secondary replicas to higher values to offload backup workloads from the primary.  
Defaults to 50, giving all replicas equal backup preference.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50 |

##### -ConnectionModeInPrimaryRole

Controls which client connections are allowed when this replica is the primary. AllowAllConnections permits both read-write and read-only connections.  
AllowReadWriteConnections restricts access to connections that specify read-write intent, blocking read-only connection attempts.  
Defaults to AllowAllConnections for maximum compatibility with existing applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | AllowAllConnections |
| Accepted Values | AllowAllConnections,AllowReadWriteConnections |

##### -ConnectionModeInSecondaryRole

Controls client access to secondary replicas for read operations. AllowNoConnections blocks all client connections to the secondary.  
AllowReadIntentConnectionsOnly permits only connections that specify ApplicationIntent=ReadOnly, ideal for reporting workloads.  
AllowAllConnections allows any client connection regardless of intent. Defaults to AllowNoConnections for security and performance.  
The default can be changed with:  
Set-DbatoolsConfig -FullName 'AvailabilityGroups.Default.ConnectionModeInSecondaryRole' -Value '...' -Passthru | Register-DbatoolsConfig

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'AvailabilityGroups.Default.ConnectionModeInSecondaryRole' -Fallback 'AllowNoConnections') |
| Accepted Values | AllowNoConnections,AllowReadIntentConnectionsOnly,AllowAllConnections,No,Read-intent only,Yes |

##### -SeedingMode

Controls how databases are initially synchronized on the secondary replica. Requires SQL Server 2016 or later.  
Automatic seeding transfers data directly over the network without manual backup/restore operations, ideal for large databases or automated deployments.  
Manual seeding requires you to manually backup databases on the primary and restore them on the secondary, providing more control over the timing and process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Automatic,Manual |

##### -Endpoint

Specifies the name of the database mirroring endpoint to use for availability group communication. Automatically locates existing endpoints or creates one if needed.  
Use this when you need a custom endpoint name instead of the default "hadr_endpoint" that gets created automatically.  
Each SQL Server instance requires a database mirroring endpoint for Always On availability group replication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EndpointUrl

Overrides the default endpoint URL with custom network addresses for availability group communication. Defaults to the FQDN from the existing endpoint.  
Required for special network configurations like multi-subnet deployments, NAT environments, or when replicas need specific IP addresses for cross-network communication.  
Must be in format 'TCP://system-address:port' with one entry per instance. When creating new endpoints, IPv4 addresses in the URL will be used for endpoint configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Passthru

Returns the replica object without actually creating it in the availability group, allowing for additional customization before final creation.  
Use this when you need to modify replica properties that aren't exposed as direct parameters before adding it to the availability group.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ReadOnlyRoutingList

Defines the priority order of replica server names for routing read-only connections when this replica serves as the primary. Requires SQL Server 2016 or later.  
Use this to direct reporting queries to specific secondary replicas, creating an ordered list like @('Server2', 'Server3') to balance read-only workloads.  
This parameter is only supported when adding a replica to a single instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReadonlyRoutingConnectionUrl

Specifies the connection URL that clients use when connecting to this replica for read-only operations via read-only routing. Requires SQL Server 2016 or later.  
Must be in format 'TCP://system-address:port' and typically differs from the regular endpoint URL when using custom network configurations for read workloads.  
This parameter is only supported when adding a replica to a single instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Certificate

Configures certificate-based authentication for the database mirroring endpoint instead of Windows authentication. Requires the certificate name to exist on the SQL Server instance.  
Use this in environments where SQL Server instances run under different domain accounts or in workgroup configurations where Windows authentication isn't feasible.  
The remote replica must have a matching certificate with the corresponding public key for secure communication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ConfigureXESession

Automatically configures the AlwaysOn_health extended events session to start with SQL Server, matching the behavior of the SSMS availability group wizard.  
Use this to enable automatic collection of availability group health data for monitoring and troubleshooting replica connectivity, failover events, and performance issues.  
The session captures critical Always On events and is essential for proactive availability group management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SessionTimeout

Sets the timeout period in seconds for detecting replica connectivity failures. The replica waits this long for ping responses before marking a connection as failed.  
Lower values provide faster failure detection but may cause false failures under network stress. Higher values prevent false failures but delay failover detection.  
Microsoft recommends keeping this at 10 seconds or higher for stable operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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
