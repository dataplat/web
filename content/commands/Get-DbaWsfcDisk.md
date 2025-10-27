---
title: "Get-DbaWsfcDisk"
slug: "Get-DbaWsfcDisk"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed information about clustered physical disks from Windows Server Failover Clusters."
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcDisk.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcDisk"
draft: false
---

# Get-DbaWsfcDisk

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcDisk](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcDisk.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcDisk](https://dataplat.github.io/boh#Get-DbaWsfcDisk).

## Synopsis

Retrieves detailed information about clustered physical disks from Windows Server Failover Clusters.

## Description

Retrieves comprehensive disk information from Windows Server Failover Clusters including disk space usage, file systems, mount points, and cluster resource states. This function is essential for DBAs managing SQL Server Failover Cluster Instances who need to monitor storage health and capacity across cluster nodes. Returns detailed disk properties like total size, free space, volume labels, and serial numbers for each clustered disk resource, helping identify storage bottlenecks and plan capacity upgrades.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcDisk
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
PS C:\> Get-DbaWsfcDisk -ComputerName cluster01
```

Gets disk information from the failover cluster cluster01<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows Server Failover Cluster to query for disk information. Accepts either a cluster node name or the cluster name itself.  
Use this when managing SQL Server Failover Cluster Instances to monitor storage across different cluster environments.

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
