---
title: "New-DbaAvailabilityGroup"
slug: "New-DbaAvailabilityGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates SQL Server availability groups with automated replica setup, database seeding, and listener configuration."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAvailabilityGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAvailabilityGroup"
draft: false
---

# New-DbaAvailabilityGroup

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaAvailabilityGroup](https://github.com/dataplat/dbatools/blob/master/public/New-DbaAvailabilityGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaAvailabilityGroup](https://dataplat.github.io/boh#New-DbaAvailabilityGroup).

## Synopsis

Creates SQL Server availability groups with automated replica setup, database seeding, and listener configuration.

## Description

Creates availability groups with full automation, eliminating the manual multi-step process typically required through T-SQL or SSMS. This command handles the entire workflow from initial validation through final configuration, so you don't have to manually coordinate across multiple servers and troubleshoot common setup issues.  
  
Perfect for setting up high availability environments, disaster recovery solutions, or read-scale deployments. Supports both traditional Windows Server Failover Cluster (WSFC) environments and modern cluster-less configurations for containers and Linux.  
  
* Validates prerequisites across all instances  
* Creates availability group and configures primary replica  
* Sets up database mirroring endpoints with proper authentication  
* Adds and joins secondary replicas automatically  
* Seeds databases using backup/restore or direct seeding  
* Configures listeners with static IP or DHCP  
* Grants necessary cluster and endpoint permissions  
* Enables AlwaysOn_health extended events sessions  
  
The command handles the complex coordination between servers that trips up manual setups - endpoint permissions, service account access, database seeding modes, and cluster integration.  
  
NOTES:  
- If a backup / restore is performed, the backups will be left intact on the network share.  
- If you're using SQL Server on Linux and a fully qualified domain name is required, please use the FQDN to create a proper Endpoint  
  
PLEASE NOTE THE CHANGED DEFAULTS:  
Starting with version 1.1.x we changed the defaults of the following parameters to have the same defaults  
as the T-SQL command "CREATE AVAILABILITY GROUP" and the wizard in SQL Server Management Studio:  
* ClusterType from External to Wsfc (Windows Server Failover Cluster).  
* FailureConditionLevel from OnServerDown (Level 1) to OnCriticalServerErrors (Level 3).  
* ConnectionModeInSecondaryRole from AllowAllConnections (ALL) to AllowNoConnections (NO).  
To change these defaults we have introduced configuration parameters for all of them, see documentation of the parameters for details.  
  
Thanks for this, Thomas Stringer! https://blogs.technet.microsoft.com/heyscriptingguy/2013/04/29/set-up-an-alwayson-availability-group-with-powershell/

## Syntax

```powershell
New-DbaAvailabilityGroup
    [[-Primary] <DbaInstanceParameter>]
    [[-PrimarySqlCredential] <PSCredential>]
    [[-Secondary] <DbaInstanceParameter[]>]
    [[-SecondarySqlCredential] <PSCredential>]
    [-Name] <String>
    [-IsContained]
    [-ReuseSystemDatabases]
    [-DtcSupport]
    [[-ClusterType] <String>]
    [[-AutomatedBackupPreference] <String>]
    [[-FailureConditionLevel] <String>]
    [[-HealthCheckTimeout] <Int32>]
    [-Basic]
    [-DatabaseHealthTrigger]
    [-Passthru]
    [[-Database] <String[]>]
    [[-SharedPath] <String>]
    [-UseLastBackup]
    [-Force]
    [[-AvailabilityMode] <String>]
    [[-FailoverMode] <String>]
    [[-BackupPriority] <Int32>]
    [[-ConnectionModeInPrimaryRole] <String>]
    [[-ConnectionModeInSecondaryRole] <String>]
    [[-SeedingMode] <String>]
    [[-Endpoint] <String>]
    [[-EndpointUrl] <String[]>]
    [[-Certificate] <String>]
    [-ConfigureXESession]
    [[-IPAddress] <IPAddress[]>]
    [[-SubnetMask] <IPAddress>]
    [[-Port] <Int32>]
    [-Dhcp]
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
PS C:\> New-DbaAvailabilityGroup -Primary sql2016a -Name SharePoint
```

Creates a new availability group on sql2016a named SharePoint<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaAvailabilityGroup -Primary sql2016a -Name SharePoint -Secondary sql2016b
```

Creates a new availability group on sql2016a named SharePoint with a secondary replica, sql2016b<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaAvailabilityGroup -Primary sql2016std -Name BAG1 -Basic -Confirm:$false
```

Creates a basic availability group named BAG1 on sql2016std and does not confirm when setting up<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaAvailabilityGroup -Primary sql2022n01 -Secondary sql2022n02 -Name AgContained -IsContained
```

Creates a contained availability group named AgContained on nodes sql2022n01 and sql2022n02<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaAvailabilityGroup -Primary sql2016b -Name AG1 -Dhcp -Database db1 -UseLastBackup
```

Creates an availability group on sql2016b with the name ag1. Uses the last backups available to add the database db1 to the AG.<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaAvailabilityGroup -Primary sql2017 -Name SharePoint -ClusterType None -FailoverMode Manual
```

Creates a new availability group on sql2017 named SharePoint with a cluster type of none and a failover mode of manual<br>

#####  Example:  7 

```powershell
PS C:\> New-DbaAvailabilityGroup -Primary sql1 -Secondary sql2 -Name ag1 -Database pubs -ClusterType None -SeedingMode Automatic -FailoverMode Manual
```

Creates a new availability group with a primary replica on sql1 and a secondary on sql2. Automatically adds the database pubs.<br>

#####  Example:  8 

```powershell
PS C:\> New-DbaAvailabilityGroup -Primary sql1 -Secondary sql2 -Name ag1 -Database pubs -EndpointUrl 'TCP://sql1.specialnet.local:5022', 'TCP://sql2.specialnet.local:5022'
```

Creates a new availability group with a primary replica on sql1 and a secondary on sql2 with custom endpoint urls. Automatically adds the database pubs.<br>

#####  Example:  9 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> $params = @{
>> Primary = "sql1"
>> PrimarySqlCredential = $cred
>> Secondary = "sql2"
>> SecondarySqlCredential = $cred
>> Name = "test-ag"
>> Database = "pubs"
>> ClusterType = "None"
>> SeedingMode = "Automatic"
>> FailoverMode = "Manual"
>> Confirm = $false
>> }
PS C:\> New-DbaAvailabilityGroup @params
```

This exact command was used to create an availability group on docker!<br>

### Required Parameters

##### -Name

Specifies the name for the new availability group.  
This name must be unique across all availability groups in the Windows Server Failover Cluster.  
Choose a descriptive name that reflects the application or purpose, as this will be used for monitoring and management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Primary

Specifies the SQL Server instance that will host the primary replica of the availability group.  
This instance must have AlwaysOn Availability Groups enabled and be running SQL Server 2012 or higher.  
Use this when setting up the main server that will handle write operations and coordinate with secondary replicas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Specifies one or more SQL Server instances that will host secondary replicas in the availability group.  
All instances must have AlwaysOn enabled and be running SQL Server 2012 or higher.  
These servers will receive synchronized copies of your databases and can serve read-only workloads or provide disaster recovery.

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

##### -IsContained

Creates a contained availability group that includes system databases alongside user databases.  
Only supported in SQL Server 2022 and above, this eliminates the need to manually synchronize logins and jobs.  
Use this for simplified management when you need consistent security objects across all replicas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ReuseSystemDatabases

Reuses existing system databases when recreating a contained availability group with the same name.  
Only applicable with contained availability groups (-IsContained).  
Use this when rebuilding an AG to avoid conflicts with previously created system database copies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DtcSupport

Enables support for distributed transactions using Microsoft Distributed Transaction Coordinator (DTC).  
Required when applications use distributed transactions that span databases in the availability group.  
Note that DTC support is not available on Linux SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ClusterType

Defines the clustering technology used by the availability group (SQL Server 2017+).  
Options: Wsfc (Windows Server Failover Cluster), External (Linux Pacemaker), or None (no cluster).  
Use 'None' for read-scale scenarios without automatic failover, 'External' for Linux environments, or 'Wsfc' for traditional Windows clustering.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'AvailabilityGroups.Default.ClusterType' -Fallback 'Wsfc') |
| Accepted Values | Wsfc,External,None |

##### -AutomatedBackupPreference

Controls which replicas are preferred for automated backup operations.  
Options: Primary, Secondary, SecondaryOnly, or None.  
Use 'Secondary' to offload backup I/O from the primary, or 'SecondaryOnly' to ensure backups never impact primary performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Secondary |
| Accepted Values | None,Primary,Secondary,SecondaryOnly |

##### -FailureConditionLevel

Determines what conditions trigger automatic failover in the availability group.  
Default is Level 3 (OnCriticalServerErrors), which balances protection against false positives.  
Use Level 1 for fastest failover, Level 5 for maximum sensitivity, or adjust based on your tolerance for automatic failover events.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'AvailabilityGroups.Default.FailureConditionLevel' -Fallback 'OnCriticalServerErrors') |
| Accepted Values | OnAnyQualifiedFailureCondition,OnCriticalServerErrors,OnModerateServerErrors,OnServerDown,OnServerUnresponsive |

##### -HealthCheckTimeout

Sets the timeout in milliseconds for health check responses from the sp_server_diagnostics procedure.  
Default is 30000 (30 seconds). Lower values provide faster failure detection but may cause false positives.  
Increase this value in environments with high I/O load or slower storage to prevent unnecessary failovers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 30000 |

##### -Basic

Creates a Basic Availability Group limited to one database and two replicas.  
Available in SQL Server 2016 Standard Edition and above as an alternative to Database Mirroring.  
Use this for simple two-node high availability scenarios when you don't need multiple databases or advanced features.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DatabaseHealthTrigger

Enables database-level health monitoring that can trigger automatic failover.  
When enabled, database corruption or other critical database errors can initiate failover.  
Use this for additional protection when database integrity is more critical than minimizing failover events.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Passthru

Returns the availability group object without creating it, allowing further customization.  
Use this when you need to modify advanced properties or add custom configurations before creating the AG.  
The returned object can be passed to other dbatools commands or have properties modified directly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Database

Specifies which databases to add to the availability group during creation.  
Databases must be in Full recovery model and have recent transaction log backups.  
Use this to automatically include databases rather than adding them separately after AG creation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SharedPath

Specifies the network path where database backups will be stored during secondary replica initialization.  
All SQL Server service accounts must have read/write access to this location.  
Required for manual seeding mode when adding databases - backups remain on the share after completion.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -UseLastBackup

Uses existing backup files instead of creating new ones for database initialization.  
The most recent full backup and subsequent log backups will be restored to secondary replicas.  
Use this to save time and storage when recent backups are already available and accessible.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Removes existing databases on secondary replicas before restoring from backup.  
Use this when databases already exist on secondary servers but you want to refresh them.  
Requires SharedPath or UseLastBackup to be specified for the restore operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AvailabilityMode

Controls whether transaction commits wait for secondary replica acknowledgment.  
SynchronousCommit ensures zero data loss but may impact performance over distance.  
Use AsynchronousCommit for disaster recovery replicas or when network latency affects performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | SynchronousCommit |
| Accepted Values | AsynchronousCommit,SynchronousCommit |

##### -FailoverMode

Determines how failover occurs for the availability group.  
Automatic enables cluster-managed failover with synchronous replicas, Manual requires DBA intervention.  
Use External for Linux environments with Pacemaker cluster management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Automatic |
| Accepted Values | Automatic,Manual,External |

##### -BackupPriority

Sets the priority for backup operations on this replica (0-100, default 50).  
Higher values make this replica more preferred for automated backup jobs.  
Use lower values on primary replicas to offload backup I/O, higher values on dedicated backup servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50 |

##### -ConnectionModeInPrimaryRole

Controls what connections are allowed to the primary replica.  
AllowAllConnections (default) permits both read-write and read-intent connections.  
Use AllowReadWriteConnections to restrict read-only workloads to secondary replicas only.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | AllowAllConnections |
| Accepted Values | AllowAllConnections,AllowReadWriteConnections |

##### -ConnectionModeInSecondaryRole

Controls what connections are allowed to secondary replicas.  
Default is AllowNoConnections to prevent accidental writes or outdated reads.  
Use AllowReadIntentConnectionsOnly for reporting workloads, or AllowAllConnections for maximum flexibility.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'AvailabilityGroups.Default.ConnectionModeInSecondaryRole' -Fallback 'AllowNoConnections') |
| Accepted Values | AllowNoConnections,AllowReadIntentConnectionsOnly,AllowAllConnections,No,Read-intent only,Yes |

##### -SeedingMode

Determines how databases are initialized on secondary replicas.  
Manual (default) uses backup/restore through shared storage, Automatic uses direct network streaming.  
Use Automatic for SQL Server 2016+ to simplify setup when network bandwidth is sufficient and shared storage is limited.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Manual |
| Accepted Values | Automatic,Manual |

##### -Endpoint

Specifies the name for the database mirroring endpoint used for availability group communication.  
If not specified, the command searches for existing endpoints or creates 'hadr_endpoint'.  
Use a custom name when you have specific endpoint naming standards or multiple AGs on the same instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EndpointUrl

Specifies custom TCP URLs for availability group endpoints when automatic detection isn't suitable.  
Required format: 'TCP://hostname:port' for each instance (primary first, then secondaries).  
Use this in complex network environments with custom DNS, firewalls, or when instances use non-default ports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Certificate

Specifies the certificate name for endpoint authentication instead of Windows authentication.  
Both endpoints must have matching certificates with corresponding public/private key pairs.  
Use this for cross-domain scenarios or when Windows authentication is not available between replicas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ConfigureXESession

Automatically starts the AlwaysOn_health Extended Events session on all replicas.  
This session captures availability group events for monitoring and troubleshooting.  
Use this to match the behavior of the SQL Server Management Studio AG wizard and enable built-in diagnostics.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IPAddress

Specifies one or more static IP addresses for the availability group listener.  
Each IP should correspond to a different subnet if replicas span multiple subnets.  
Use static IPs when DHCP is not available or when you need predictable listener addresses for applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubnetMask

Specifies the subnet mask for static IP listener configuration.  
Default is 255.255.255.0, which works for most standard network configurations.  
Adjust this to match your network's subnet configuration when using custom IP addressing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 255.255.255.0 |

##### -Port

Specifies the TCP port for the availability group listener.  
Default is 1433 (standard SQL Server port). Applications connect to this port to reach the current primary.  
Use a different port when 1433 is already in use or for security through obscurity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1433 |

##### -Dhcp

Configures the availability group listener to use DHCP for IP address assignment.  
The cluster will request an IP address from DHCP servers on each replica's subnet.  
Use this when static IP management is not desired and DHCP reservations can provide consistent addressing.

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
