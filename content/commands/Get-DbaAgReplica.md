---
title: "Get-DbaAgReplica"
slug: "Get-DbaAgReplica"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton) | Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves availability group replica configuration and status information from SQL Server instances."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgReplica.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgReplica"
draft: false
---

# Get-DbaAgReplica

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton) , Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgReplica](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgReplica.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgReplica](https://dataplat.github.io/boh#Get-DbaAgReplica).

## Synopsis

Retrieves availability group replica configuration and status information from SQL Server instances.

## Description

Retrieves detailed information about availability group replicas including their current role, connection state, synchronization status, and failover configuration. This function helps DBAs monitor replica health, verify failover readiness, and troubleshoot availability group issues without manually querying system views. Returns comprehensive replica properties like backup priority, endpoint URLs, session timeouts, and read-only routing lists for availability group management and compliance reporting.

## Syntax

```powershell
Get-DbaAgReplica
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [[-Replica] <String[]>]
    [[-InputObject] <AvailabilityGroup[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgReplica -SqlInstance sql2017a
```

Returns basic information on all the availability group replicas found on sql2017a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgReplica -SqlInstance sql2017a -AvailabilityGroup SharePoint
```

Shows basic information on the replicas found on availability group SharePoint on sql2017a<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgReplica -SqlInstance sql2017a | Select-Object *
```

Returns full object properties on all availability group replicas found on sql2017a<br>

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

Specifies which availability groups to query for replica information. Accepts multiple values and wildcards for pattern matching.  
Use this when you need to focus on specific availability groups instead of retrieving replicas from all AGs on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Replica

Filters results to return only the specified replica names. Accepts multiple values for querying specific replicas across availability groups.  
Use this when troubleshooting specific replicas or when you only need information about particular secondary replicas in your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group objects piped from Get-DbaAvailabilityGroup, allowing for more efficient processing in pipeline scenarios.  
Use this when chaining commands or when you already have availability group objects and want to retrieve their replica details without additional server queries.

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


&nbsp;
