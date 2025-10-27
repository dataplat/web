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

# Add-DbaAgReplica

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Add-DbaAgReplica](https://github.com/dataplat/dbatools/blob/master/public/Add-DbaAgReplica.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Add-DbaAgReplica](https://dataplat.github.io/boh#Add-DbaAgReplica).

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

Adds sql2017b to the SharePoint availability group on sql2017a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017a -AvailabilityGroup SharePoint | Add-DbaAgReplica -SqlInstance sql2017b -FailoverMode Manual
```

Adds sql2017b to the SharePoint availability group on sql2017a with a manual failover mode.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017a -AvailabilityGroup SharePoint | Add-DbaAgReplica -SqlInstance sql2017b -EndpointUrl 'TCP://sql2017b.specialnet.local:5022'
```

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
