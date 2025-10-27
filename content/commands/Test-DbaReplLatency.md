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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaReplLatency</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaReplLatency.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Colin Douglas</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Test-DbaReplLatency -SqlInstance sql2008, sqlserver2012" }

Return replication latency for all transactional publications for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaReplLatency -SqlInstance sql2008 -Database TestDB
```
{: data-copyable="true" data-clean-code="Test-DbaReplLatency -SqlInstance sql2008 -Database TestDB" }

Return replication latency for all transactional publications on server sql2008 for only the TestDB database<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaReplLatency -SqlInstance sql2008 -Database TestDB -PublicationName TestDB_Pub
```
{: data-copyable="true" data-clean-code="Test-DbaReplLatency -SqlInstance sql2008 -Database TestDB -PublicationName TestDB_Pub" }

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
