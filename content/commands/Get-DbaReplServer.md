---
title: "Get-DbaReplServer"
slug: "Get-DbaReplServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves replication configuration and server role information from SQL Server instances"
tags:
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaReplServer"
draft: false
---

# Get-DbaReplServer

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaReplServer](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaReplServer](https://dataplat.github.io/boh#Get-DbaReplServer).

## Synopsis

Retrieves replication configuration and server role information from SQL Server instances

## Description

Returns a ReplicationServer object that shows whether each SQL Server instance is configured as a distributor, publisher, or both in the replication topology. This helps DBAs quickly identify server roles and distribution database configurations when troubleshooting replication issues or documenting replication environments. The function reveals which databases are enabled for replication, though these may not necessarily be actively replicated.  
  
Note: The ReplicationDatabases property gets the databases enabled for replication in the connected instance of Microsoft SQL Server/.  
Not necessarily the databases that are actually replicated.

## Syntax

```powershell
Get-DbaReplServer
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaReplServer -SqlInstance sql2016
```

Gets the replication server object for sql2016 using Windows authentication<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplServer -SqlInstance sql2016 -SqlCredential repadmin
```

Gets the replication server object for sql2016 using SQL authentication<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

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
