---
title: "Get-DbaPfAvailableCounter"
slug: "Get-DbaPfAvailableCounter"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves all Windows performance counters available on local or remote machines for monitoring setup."
tags:
  - "Performance"
  - "DataCollector"
  - "PerfCounter"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfAvailableCounter.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPfAvailableCounter"
draft: false
---

# Get-DbaPfAvailableCounter

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPfAvailableCounter](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPfAvailableCounter.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPfAvailableCounter](https://dataplat.github.io/boh#Get-DbaPfAvailableCounter).

## Synopsis

Retrieves all Windows performance counters available on local or remote machines for monitoring setup.

## Description

Retrieves all Windows performance counters available on specified machines by reading directly from the registry for fast enumeration. This is essential when setting up SQL Server monitoring because you need to know which specific counters are available before configuring data collectors or performance monitoring solutions. The function uses a registry-based approach that's much faster than traditional Get-Counter methods, making it practical for discovering hundreds of available counters across multiple servers. When credentials are provided, they're included in the output for easy piping to other dbatools commands like Add-DbaPfDataCollectorCounter.  
  
Thanks to Daniel Streefkerk for this super fast way of counters  
https://daniel.streefkerkonline.com/2016/02/18/use-powershell-to-list-all-windows-performance-counters-and-their-numeric-ids

## Syntax

```powershell
Get-DbaPfAvailableCounter
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-Pattern] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPfAvailableCounter
```

Gets all available counters on the local machine.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPfAvailableCounter -Pattern *sql*
```

Gets all counters matching sql on the local machine.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfAvailableCounter -ComputerName sql2017 -Pattern *sql*
```

Gets all counters matching sql on the remote server sql2017.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfAvailableCounter -Pattern *sql*
```

Gets all counters matching sql on the local machine.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaPfAvailableCounter -Pattern *sql* | Add-DbaPfDataCollectorCounter -CollectorSet 'Test Collector Set' -Collector DataCollector01
```

Adds all counters matching "sql" to the DataCollector01 within the 'Test Collector Set' CollectorSet.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computers to query for available performance counters. Defaults to localhost.  
Use this when you need to discover counters on remote SQL Server instances or other servers in your environment before setting up monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:ComputerName |

##### -Credential

Allows you to login to servers using alternative credentials. To use:  
$scred = Get-Credential, then pass $scred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Pattern

Filters counter names using wildcard pattern matching (supports * and ? wildcards).  
Use this to find specific SQL Server counters like "*sql*" or "*buffer*" when you need to identify relevant performance metrics for monitoring setup.

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
