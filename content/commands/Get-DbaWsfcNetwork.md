---
title: "Get-DbaWsfcNetwork"
slug: "Get-DbaWsfcNetwork"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves network configuration details from Windows Server Failover Clustering for SQL Server high availability troubleshooting."
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcNetwork.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcNetwork"
draft: false
---

# Get-DbaWsfcNetwork

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcNetwork](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcNetwork.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcNetwork](https://dataplat.github.io/boh#Get-DbaWsfcNetwork).

## Synopsis

Retrieves network configuration details from Windows Server Failover Clustering for SQL Server high availability troubleshooting.

## Description

Retrieves detailed network information from Windows Server Failover Cluster nodes, including IP addresses, subnet masks, and network roles. This information is essential for diagnosing connectivity issues with SQL Server Failover Cluster Instances (FCIs) and Availability Groups, especially when troubleshooting network-related failures or validating cluster network configuration. The function returns comprehensive network details like IPv4/IPv6 addresses, prefix lengths, and quorum settings that help DBAs understand how cluster networks are configured and identify potential communication problems between nodes.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcNetwork
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
PS C:\> Get-DbaWsfcNetwork -ComputerName cluster01
```

Gets network information from the failover cluster cluster01<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows Server Failover Cluster name or any cluster node name to retrieve network configuration from.  
Use this to target a specific cluster when troubleshooting network connectivity issues with SQL Server FCIs or Availability Groups.  
Accepts multiple cluster names for bulk network configuration analysis.

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
