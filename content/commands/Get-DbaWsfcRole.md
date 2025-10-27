---
title: "Get-DbaWsfcRole"
slug: "Get-DbaWsfcRole"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows Server Failover Cluster role status and ownership information for SQL Server monitoring"
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcRole.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcRole"
draft: false
---

# Get-DbaWsfcRole

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcRole](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcRole.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcRole](https://dataplat.github.io/boh#Get-DbaWsfcRole).

## Synopsis

Retrieves Windows Server Failover Cluster role status and ownership information for SQL Server monitoring

## Description

Retrieves detailed information about Windows Server Failover Cluster roles (resource groups), including their current state, and which node currently owns them. This function helps DBAs monitor and troubleshoot SQL Server Failover Cluster Instances and Availability Groups by providing visibility into the underlying cluster roles that control SQL Server services and resources.  
  
Use this command when you need to verify role health during maintenance windows, troubleshoot failover issues, or confirm which node is currently hosting specific SQL Server resources. The function translates numeric state codes into readable status values (Online, Offline, Failed, Pending) so you can quickly identify problematic roles.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcRole
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
PS C:\> Get-DbaWsfcRole -ComputerName cluster01
```

Gets role information from the failover cluster cluster01<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWsfcRole -ComputerName cluster01 | Select-Object *
```

Shows all role values, including the ones not shown in the default view<br>

### Optional Parameters

##### -ComputerName

Specifies the cluster node name or cluster name to connect to for retrieving role information. Accepts multiple values for querying multiple clusters.  
Use this when you need to check role status on remote clusters or when working with multiple cluster environments.

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
