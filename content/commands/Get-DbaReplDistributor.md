---
title: "Get-DbaReplDistributor"
slug: "Get-DbaReplDistributor"
date: 2024-01-01
layout: "single"
author: "William Durkin (@sql_williamd)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves replication distributor configuration and status information from SQL Server instances."
tags:
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplDistributor.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaReplDistributor"
draft: false
---

# Get-DbaReplDistributor

| Property | Value |
| --- | --- |
| **Author** | William Durkin (@sql_williamd) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaReplDistributor](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplDistributor.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaReplDistributor](https://dataplat.github.io/boh#Get-DbaReplDistributor).

## Synopsis

Retrieves replication distributor configuration and status information from SQL Server instances.

## Description

Connects to SQL Server instances and retrieves detailed information about their replication distributor configuration, including distributor status, distribution database details, and publisher relationships. This is essential for DBAs managing replication topologies who need to quickly identify which servers act as distributors, where the distribution database is located, and whether remote publishers are configured. The function returns comprehensive distributor properties that help with replication troubleshooting, topology documentation, and configuration audits.

## Syntax

```powershell
Get-DbaReplDistributor
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
PS C:\> Get-DbaReplDistributor -SqlInstance sql2008, sqlserver2012
```

Retrieve distributor information for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Connect-DbaInstance -SqlInstance mssql1 | Get-DbaReplDistributor
```

Pipe a SQL Server instance to Get-DbaReplDistributor to retrieve distributor information.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances to check for replication distributor configuration.  
Use this to identify which servers in your environment are configured as distributors, where the distribution database is located, and whether they support remote publishers.

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
