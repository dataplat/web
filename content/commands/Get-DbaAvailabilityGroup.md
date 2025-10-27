---
title: "Get-DbaAvailabilityGroup"
slug: "Get-DbaAvailabilityGroup"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton) | Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Availability Group configuration and status information from SQL Server instances."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAvailabilityGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAvailabilityGroup"
draft: false
---

# Get-DbaAvailabilityGroup

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton) , Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAvailabilityGroup](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAvailabilityGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAvailabilityGroup](https://dataplat.github.io/boh#Get-DbaAvailabilityGroup).

## Synopsis

Retrieves Availability Group configuration and status information from SQL Server instances.

## Description

Retrieves detailed Availability Group information including replica roles, cluster configuration, database membership, and listener details from SQL Server 2012+ instances.  
  
This command helps DBAs monitor AG health, identify primary replicas for failover planning, and generate inventory reports for compliance or troubleshooting. The default view shows essential properties like replica roles, primary replica location, and cluster type, while the full object contains comprehensive AG configuration details.

## Syntax

```powershell
Get-DbaAvailabilityGroup
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [-IsPrimary]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sqlserver2014a
```

Returns basic information on all the Availability Group(s) found on sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sqlserver2014a -AvailabilityGroup AG-a
```

Shows basic information on the Availability Group AG-a on sqlserver2014a.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sqlserver2014a | Select-Object *
```

Returns full object properties on all Availability Group(s) on sqlserver2014a.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sqlserver2014a | Select-Object -ExpandProperty PrimaryReplicaServerName
```

Returns the SQL Server instancename of the primary replica as a string<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sqlserver2014a -AvailabilityGroup AG-a -IsPrimary
```

Returns true/false if the server, sqlserver2014a, is the primary replica for AG-a Availability Group.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2012 or higher.

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

##### -AvailabilityGroup

Specifies one or more Availability Group names to filter results to specific AGs. Supports wildcards for pattern matching.  
Use this when you need to check status or configuration of particular AGs rather than retrieving information for all AGs on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IsPrimary

Returns a boolean value indicating whether the queried SQL Server instance is currently serving as the Primary replica for each Availability Group.  
Use this switch when you need to quickly identify which replica in your AG topology is currently primary, particularly useful for automated failover scripts or health monitoring.

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


&nbsp;
