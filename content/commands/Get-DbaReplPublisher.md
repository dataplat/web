---
title: "Get-DbaReplPublisher"
slug: "Get-DbaReplPublisher"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server replication publisher configuration and status from distribution servers."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplPublisher.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaReplPublisher"
draft: false
---

# Get-DbaReplPublisher

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaReplPublisher](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplPublisher.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaReplPublisher](https://dataplat.github.io/boh#Get-DbaReplPublisher).

## Synopsis

Retrieves SQL Server replication publisher configuration and status from distribution servers.

## Description

Retrieves detailed information about SQL Server replication publishers configured on distribution servers. This function connects to instances acting as distributors and returns publisher details including status, working directory, distribution database, and publication counts. Use this to audit replication topology, troubleshoot publisher connectivity issues, or verify publisher configurations across your replication environment.

## Syntax

```powershell
Get-DbaReplPublisher
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
PS C:\> Get-DbaReplPublisher -SqlInstance mssql1
```

Gets publisher for the mssql1 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Connect-DbaInstance -SqlInstance mssql1 |  Get-DbaReplPublisher
```

Pipes a SQL Server object to get publisher information for the mssql1 instance.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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
