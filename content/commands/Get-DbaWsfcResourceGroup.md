---
title: "Get-DbaWsfcResourceGroup"
slug: "Get-DbaWsfcResourceGroup"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows Server Failover Cluster resource group status and ownership information"
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcResourceGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcResourceGroup"
draft: false
---

# Get-DbaWsfcResourceGroup

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcResourceGroup](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcResourceGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcResourceGroup](https://dataplat.github.io/boh#Get-DbaWsfcResourceGroup).

## Synopsis

Retrieves Windows Server Failover Cluster resource group status and ownership information

## Description

Retrieves detailed information about Windows Server Failover Cluster resource groups, including their current state, persistent state, and which node currently owns them. This function helps DBAs monitor and troubleshoot SQL Server Failover Cluster Instances and Availability Groups by providing visibility into the underlying cluster resource groups that control SQL Server services and resources.  
  
Use this command when you need to verify resource group health during maintenance windows, troubleshoot failover issues, or confirm which node is currently hosting specific SQL Server resources. The function translates numeric state codes into readable status values (Online, Offline, Failed, Unknown) so you can quickly identify problematic resource groups.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcResourceGroup
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-Name] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaWsfcResourceGroup -ComputerName cluster01
```

Gets resource group information from the failover cluster cluster01<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWsfcResourceGroup -ComputerName cluster01 | Select-Object *
```

Shows all resource values, including the ones not shown in the default view<br>

### Optional Parameters

##### -ComputerName

Specifies the target Windows Server Failover Cluster to query, either as a cluster name or any node name within the cluster.  
Use this when connecting to specific failover clusters hosting SQL Server FCI or Availability Group resources.  
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

##### -Name

Filters results to only include resource groups with the specified names. Supports multiple values.  
Use this when you need to check specific SQL Server resource groups like 'SQL Server (MSSQLSERVER)' or named Availability Groups.  
Omit this parameter to retrieve all resource groups in the cluster.

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
