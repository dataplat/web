---
title: "Get-DbaWsfcAvailableDisk"
slug: "Get-DbaWsfcAvailableDisk"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves shared storage disks available for clustering but not yet assigned to a Windows Server Failover Cluster."
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcAvailableDisk.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcAvailableDisk"
draft: false
---

# Get-DbaWsfcAvailableDisk

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcAvailableDisk](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcAvailableDisk.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcAvailableDisk](https://dataplat.github.io/boh#Get-DbaWsfcAvailableDisk).

## Synopsis

Retrieves shared storage disks available for clustering but not yet assigned to a Windows Server Failover Cluster.

## Description

Identifies shared storage disks that are visible to all cluster nodes and eligible for clustering, but have not yet been added to the cluster's storage pool. This is essential when planning to expand SQL Server Failover Cluster Instances (FCIs) or troubleshooting storage connectivity issues. The function queries each cluster node to ensure disks are properly accessible across the entire cluster before attempting to add them as cluster resources.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcAvailableDisk
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
PS C:\> Get-DbaWsfcAvailableDisk -ComputerName cluster01
```

Gets available disks from the failover cluster cluster01<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows Server Failover Cluster name or any cluster node name to query for available disks.  
Use this when you need to check shared storage from a specific cluster, especially when managing multiple clusters or troubleshooting storage visibility across cluster nodes.  
Accepts multiple values to query several clusters simultaneously.

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
