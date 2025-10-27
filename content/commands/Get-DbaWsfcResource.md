---
title: "Get-DbaWsfcResource"
slug: "Get-DbaWsfcResource"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed information about cluster resources in a Windows Server Failover Cluster"
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcResource.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcResource"
draft: false
---

# Get-DbaWsfcResource

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcResource](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcResource.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcResource](https://dataplat.github.io/boh#Get-DbaWsfcResource).

## Synopsis

Retrieves detailed information about cluster resources in a Windows Server Failover Cluster

## Description

Retrieves comprehensive information about cluster resources including SQL Server instances, disks, network names, and other services managed by the failover cluster. Shows current state, ownership, dependencies, restart policies, and timeout settings for each resource, which is essential for troubleshooting cluster issues and monitoring SQL Server FCI health.  
  
Use this when diagnosing cluster resource failures, planning maintenance windows, or investigating why SQL Server services aren't failing over properly. The state information helps identify stuck resources, while ownership details show which node currently hosts each resource.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcResource
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
PS C:\> Get-DbaWsfcResource -ComputerName cluster01
```

Gets resource information from the failover cluster cluster01<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWsfcResource -ComputerName cluster01 | Select-Object *
```

Shows all resource values, including the ones not shown in the default view<br>

### Optional Parameters

##### -ComputerName

Specifies the target cluster to query for resource information. Can be any cluster node name or the cluster name itself.  
Use this when managing multiple clusters or when connecting from outside the cluster to gather resource status and configuration details.

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
