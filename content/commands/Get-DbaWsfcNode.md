---
title: "Get-DbaWsfcNode"
slug: "Get-DbaWsfcNode"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed node information from Windows Server Failover Clusters hosting SQL Server instances."
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcNode.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcNode"
draft: false
---

# Get-DbaWsfcNode

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcNode](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcNode.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcNode](https://dataplat.github.io/boh#Get-DbaWsfcNode).

## Synopsis

Retrieves detailed node information from Windows Server Failover Clusters hosting SQL Server instances.

## Description

Retrieves configuration and status details for individual nodes (servers) within Windows Server Failover Clusters that host SQL Server FCIs or Availability Groups. This function connects to cluster nodes to gather essential node properties including ownership details, version information, and operational status.  
  
DBAs use this when troubleshooting cluster node issues, validating node configurations before SQL Server failover operations, or auditing cluster member server details. The function returns key node metadata needed for capacity planning, patch management coordination, and high availability troubleshooting.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcNode
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
PS C:\> Get-DbaWsfcNode -ComputerName cluster01
```

Gets node information from the failover cluster cluster01<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWsfcNode -ComputerName cluster01 | Select-Object *
```

Shows all node values, including the ones not shown in the default view<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows Server Failover Cluster or individual cluster node to query for node information. Accepts either the cluster name or any member node name.  
Use this when you need to connect to a specific cluster hosting SQL Server FCIs or Availability Groups to retrieve node details.

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
