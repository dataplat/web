---
title: "Get-DbaWsfcSharedVolume"
slug: "Get-DbaWsfcSharedVolume"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Cluster Shared Volume configuration and status from Windows Server Failover Clusters hosting SQL Server instances."
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcSharedVolume.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcSharedVolume"
draft: false
---

# Get-DbaWsfcSharedVolume

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcSharedVolume](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcSharedVolume.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcSharedVolume](https://dataplat.github.io/boh#Get-DbaWsfcSharedVolume).

## Synopsis

Retrieves Cluster Shared Volume configuration and status from Windows Server Failover Clusters hosting SQL Server instances.

## Description

Retrieves detailed configuration and operational information about Cluster Shared Volumes (CSVs) from Windows Server Failover Clusters. CSVs provide the shared storage foundation for SQL Server Failover Cluster Instances (FCIs) and other clustered applications, making this function essential for monitoring storage health and troubleshooting cluster storage issues.  
  
DBAs use this when validating CSV health before SQL Server installations, investigating storage-related performance problems in clustered environments, or documenting shared storage configurations for disaster recovery planning. The function returns CSV properties along with cluster context including state information and fully qualified cluster names.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcSharedVolume
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
PS C:\> Get-DbaWsfcSharedVolume -ComputerName cluster01
```

Gets shared volume (CSV) information from the failover cluster cluster01<br>

### Optional Parameters

##### -ComputerName

Specifies the target Windows Server Failover Cluster to query for Cluster Shared Volume information. Accepts either individual cluster node names or the cluster name itself.  
Use this when you need to check CSV health and configuration on remote clusters hosting SQL Server FCIs. Defaults to the local computer if not specified.

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
