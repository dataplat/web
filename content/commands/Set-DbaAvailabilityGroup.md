---
title: "Set-DbaAvailabilityGroup"
slug: "Set-DbaAvailabilityGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Modifies availability group configuration settings including DTC support, backup preferences, and failover conditions"
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAvailabilityGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAvailabilityGroup"
draft: false
---

# Set-DbaAvailabilityGroup

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaAvailabilityGroup](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAvailabilityGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaAvailabilityGroup](https://dataplat.github.io/boh#Set-DbaAvailabilityGroup).

## Synopsis

Modifies availability group configuration settings including DTC support, backup preferences, and failover conditions

## Description

Modifies configuration properties of existing availability groups without requiring you to script out and recreate the entire AG setup. Commonly used to enable DTC support for distributed transactions, adjust automated backup preferences across replicas, configure failure condition levels for automatic failover, and set health check timeouts for monitoring. This saves time compared to using SQL Server Management Studio or T-SQL ALTER AVAILABILITY GROUP statements for routine configuration changes.

## Syntax

```powershell
Set-DbaAvailabilityGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [-AllAvailabilityGroups]
    [-DtcSupportEnabled]
    [[-ClusterType] <String>]
    [[-AutomatedBackupPreference] <String>]
    [[-FailureConditionLevel] <String>]
    [[-HealthCheckTimeout] <Int32>]
    [-BasicAvailabilityGroup]
    [-DatabaseHealthTrigger]
    [-IsDistributedAvailabilityGroup]
    [[-InputObject] <AvailabilityGroup[]>]
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
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2016 | Set-DbaAvailabilityGroup -DtcSupportEnabled
```

Enables DTC for all availability groups on sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2016 -AvailabilityGroup AG1 | Set-DbaAvailabilityGroup -DtcSupportEnabled:$false
```

Disables DTC support for the availability group AG1<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaAvailabilityGroup -SqlInstance sql2016 -AvailabilityGroup AG1 -DtcSupportEnabled:$false
```

Disables DTC support for the availability group AG1<br>

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

Specifies the name(s) of specific availability groups to modify. Accepts multiple AG names as an array.  
Use this to target individual AGs instead of modifying all AGs on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllAvailabilityGroups

Modifies configuration settings for every availability group on the target SQL Server instance.  
Use this switch when you need to apply the same configuration changes across all AGs simultaneously.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DtcSupportEnabled

Enables or disables Distributed Transaction Coordinator (DTC) support for the availability group.  
Required when applications use distributed transactions across multiple databases in the AG. Set to $false to disable DTC support.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ClusterType

Specifies the clustering technology used by the availability group. Only supported in SQL Server 2017 and above.  
Use 'Wsfc' for Windows Server Failover Clustering, 'External' for third-party cluster managers like Pacemaker on Linux, or 'None' for read-scale AGs without automatic failover.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | External,Wsfc,None |

##### -AutomatedBackupPreference

Controls which replica should be preferred for automated backup operations within the availability group.  
Use 'Secondary' to offload backups from the primary, 'SecondaryOnly' to prevent backups on primary, 'Primary' to always backup on primary, or 'None' to disable preference-based backup routing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | None,Primary,Secondary,SecondaryOnly |

##### -FailureConditionLevel

Sets the sensitivity level for automatic failover conditions in the availability group.  
Use 'OnServerDown' for basic failover, 'OnServerUnresponsive' for SQL Service issues, 'OnCriticalServerErrors' for critical SQL errors, 'OnModerateServerErrors' for moderate SQL errors, or   
'OnAnyQualifiedFailureCondition' for maximum sensitivity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | OnAnyQualifiedFailureCondition,OnCriticalServerErrors,OnModerateServerErrors,OnServerDown,OnServerUnresponsive |

##### -HealthCheckTimeout

Sets the timeout in milliseconds for health check responses from sp_server_diagnostics before marking the AG as unresponsive.  
Increase this value for busy systems or slow storage to reduce false failovers. Decrease for faster failover detection in stable environments.  
Default is 30000 (30 seconds). Changes take effect immediately without restart.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BasicAvailabilityGroup

Configures the availability group as a Basic AG with limited functionality for Standard Edition licensing.  
Basic AGs support only one database, two replicas, and no read-access to secondary replicas. Used when full AG features aren't needed or licensed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DatabaseHealthTrigger

Enables database-level health monitoring that can trigger automatic failovers based on individual database health status.  
When enabled, databases that become offline or experience critical errors can initiate AG failover. Useful for comprehensive monitoring beyond SQL Server instance health.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsDistributedAvailabilityGroup

Configures the availability group as a Distributed AG that spans multiple WSFC clusters or standalone instances.  
Used for disaster recovery scenarios across geographic locations or different domains. Requires SQL Server 2016 or later.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts availability group objects from Get-DbaAvailabilityGroup for pipeline operations.  
Use this to pipe specific AG objects directly to the function instead of specifying SqlInstance and AG names separately.

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
