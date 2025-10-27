---
title: "Get-DbaWsfcResourceType"
slug: "Get-DbaWsfcResourceType"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves available resource types from Windows Server Failover Cluster for SQL Server FCI configuration."
tags:
  - "WSFC"
  - "FCI"
  - "WindowsCluster"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcResourceType.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWsfcResourceType"
draft: false
---

# Get-DbaWsfcResourceType

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWsfcResourceType](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWsfcResourceType.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWsfcResourceType](https://dataplat.github.io/boh#Get-DbaWsfcResourceType).

## Synopsis

Retrieves available resource types from Windows Server Failover Cluster for SQL Server FCI configuration.

## Description

Retrieves detailed information about all resource types available in a Windows Server Failover Cluster. Resource types define what kinds of cluster resources can be created, including SQL Server instances, network names, IP addresses, and shared storage. This information is essential when configuring or troubleshooting SQL Server Failover Cluster Instances (FCI), as it shows which resource types are installed and their dependencies.  
  
Returns resource type properties including display names, DLL locations, and required dependency relationships. This helps DBAs understand the available building blocks for creating clustered SQL Server resources and diagnose configuration issues.  
  
All Windows Server Failover Clustering (Wsfc) commands require local admin on each member node.

## Syntax

```powershell
Get-DbaWsfcResourceType
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
PS C:\> Get-DbaWsfcResourceType -ComputerName cluster01
```

Gets resource type information from the failover cluster cluster01<br>

### Optional Parameters

##### -ComputerName

Specifies the target Windows Server Failover Cluster by providing either a cluster node name or the cluster name itself.  
Use this when connecting to a specific cluster to retrieve its available resource types for SQL Server FCI planning or troubleshooting.  
Defaults to the local computer name if not specified.

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
