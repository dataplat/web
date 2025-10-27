---
title: "Test-DbaReplLatency"
slug: "Test-DbaReplLatency"
date: 2024-01-01
layout: "single"
author: "Colin Douglas"
availability: "Windows, Linux, macOS"
synopsis: "Measures transactional replication latency using tracer tokens across publisher, distributor, and subscriber instances."
tags:
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaReplLatency.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaReplLatency"
draft: false
---

# Test-DbaReplLatency

| Property | Value |
| --- | --- |
| **Author** | Colin Douglas |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaReplLatency](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaReplLatency.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaReplLatency](https://dataplat.github.io/boh#Test-DbaReplLatency).

## Synopsis

Measures transactional replication latency using tracer tokens across publisher, distributor, and subscriber instances.

## Description

Creates tracer tokens in transactional replication publications and measures the time it takes for those tokens to travel from the publisher to the distributor, and from the distributor to each subscriber. This provides real-time latency measurements that help DBAs identify replication performance bottlenecks and validate that data changes are flowing through the replication topology within acceptable timeframes.  
  
The function connects to both the publisher and distributor instances to inject tracer tokens and retrieve timing information. You can monitor latency for all publications on an instance, specific databases, or individual publications. The latency measurements include publisher-to-distributor time, distributor-to-subscriber time, and total end-to-end latency for each subscriber.  
  
This is particularly useful when troubleshooting slow replication, validating replication performance after configuration changes, or establishing baseline performance metrics for replication monitoring.  
  
All replication commands need SQL Server Management Studio installed and are therefore currently not supported.  
Have a look at this issue to get more information: https://github.com/dataplat/dbatools/issues/7428

## Syntax

```powershell
Test-DbaReplLatency
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Database] <Object[]>]
    [[-SqlCredential] <PSCredential>]
    [[-PublicationName] <Object[]>]
    [[-TimeToLive] <Int32>]
    [-RetainToken]
    [-DisplayTokenHistory]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaReplLatency -SqlInstance sql2008, sqlserver2012
```

Return replication latency for all transactional publications for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaReplLatency -SqlInstance sql2008 -Database TestDB
```

Return replication latency for all transactional publications on server sql2008 for only the TestDB database<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaReplLatency -SqlInstance sql2008 -Database TestDB -PublicationName TestDB_Pub
```

Return replication latency for the TestDB_Pub publication for the TestDB database located on the server sql2008.<br>

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

##### -Database

Specifies which databases containing transactional replication publications to test for latency. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific publication databases instead of testing all replicated databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -PublicationName

Specifies which transactional replication publications to test for latency. Accepts wildcards for pattern matching.  
Use this when you need to test specific publications instead of all transactional publications in the specified databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TimeToLive

Sets the maximum time in seconds to wait for tracer tokens to travel from publisher through distributor to all subscribers.  
Use this to prevent the function from hanging indefinitely when replication is severely delayed or broken. If the timeout is reached, the function reports incomplete latency data and continues to the   
next publication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RetainToken

Keeps the tracer tokens in the distribution database after latency testing is complete instead of automatically cleaning them up.  
Use this when you need to preserve tracer token history for further analysis or troubleshooting. Without this switch, tokens are automatically removed to prevent distribution database bloat.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisplayTokenHistory

Shows latency measurements for all existing tracer tokens in each publication instead of just the newly created token.  
Use this to see historical latency patterns and trends for ongoing replication monitoring. Without this switch, only the current test token results are displayed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
