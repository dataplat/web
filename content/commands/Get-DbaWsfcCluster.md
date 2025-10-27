---
title: "Get-DbaWsfcCluster"
slug: "Get-DbaWsfcCluster"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows Server Failover Cluster configuration and status information for SQL Server high availability environments."
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcCluster.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcCluster"
draft: false
---

# Get-DbaWsfcCluster

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcCluster](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcCluster.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcCluster](https://dataplat.github.io/boh#Get-DbaWsfcCluster).

## Synopsis

Retrieves Windows Server Failover Cluster configuration and status information for SQL Server high availability environments.

## Description

Retrieves detailed configuration and operational status information from Windows Server Failover Clusters that host SQL Server instances. This function connects to cluster nodes or the cluster name itself to gather essential cluster properties including quorum configuration, shared volume settings, and current operational state.  
  
DBAs use this when troubleshooting cluster issues, validating cluster health before SQL Server installations, or documenting high availability configurations. The function returns key cluster metadata needed for capacity planning and disaster recovery preparation.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcCluster
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaWsfcCluster -ComputerName cluster01
```

Gets failover cluster information about cluster01<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWsfcCluster -ComputerName cluster01 | Select-Object *
```

Shows all cluster values, including the ones not shown in the default view<br>

### Optional Parameters

##### -ComputerName

Specifies the target Windows Server Failover Cluster to query, either by cluster name or individual node name.  
Use the cluster name when connecting to an active cluster, or specify a node name when the cluster service may be down.  
Defaults to the local computer if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to the cluster using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
