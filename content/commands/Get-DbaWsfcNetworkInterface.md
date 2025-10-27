---
title: "Get-DbaWsfcNetworkInterface"
slug: "Get-DbaWsfcNetworkInterface"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves network interface configuration from Windows Server Failover Cluster nodes."
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcNetworkInterface.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcNetworkInterface"
draft: false
---

# Get-DbaWsfcNetworkInterface

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcNetworkInterface](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcNetworkInterface.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcNetworkInterface](https://dataplat.github.io/boh#Get-DbaWsfcNetworkInterface).

## Synopsis

Retrieves network interface configuration from Windows Server Failover Cluster nodes.

## Description

Retrieves detailed network adapter information from all nodes in a Windows Server Failover Cluster, including IP addresses, DHCP settings, and network assignments. This information is essential for troubleshooting SQL Server Failover Cluster Instance connectivity issues and verifying cluster network configuration.  
  
Use this command to identify network misconfigurations that could impact SQL Server availability, document cluster network topology for compliance, or diagnose connectivity problems between cluster nodes.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcNetworkInterface
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
PS C:\> Get-DbaWsfcNetworkInterface -ComputerName cluster01
```

Gets network interface information from the failover cluster cluster01<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWsfcNetworkInterface -ComputerName cluster01 | Select-Object *
```

Shows all network interface  values, including the ones not shown in the default view<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows Server Failover Cluster name or any cluster node name to query for network interface information.  
Use this when troubleshooting SQL Server FCI connectivity issues or documenting cluster network topology.  
Accepts cluster names, node names, or IP addresses of cluster resources.

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
