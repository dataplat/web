---
title: "Test-DbaNetworkLatency"
slug: "Test-DbaNetworkLatency"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Tests how long a query takes to return from SQL Server"
tags:
  - "Performance"
  - "Network"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaNetworkLatency.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaNetworkLatency"
draft: false
---

# Test-DbaNetworkLatency

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaNetworkLatency](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaNetworkLatency.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaNetworkLatency](https://dataplat.github.io/boh#Test-DbaNetworkLatency).

## Synopsis

Tests how long a query takes to return from SQL Server

## Description

This function is intended to help measure SQL Server network latency by establishing a connection and executing a simple query. This is a better than a simple ping because it actually creates the connection to the SQL Server and measures the time required for only the entire routine, but the duration of the query as well how long it takes for the results to be returned.  
  
By default, this command will execute "SELECT TOP 100 * FROM INFORMATION_SCHEMA.TABLES" three times. It will then output how long the entire connection and command took, as well as how long *only* the execution of the command took.  
  
This allows you to see if the issue is with the connection or the SQL Server itself.

## Syntax

```powershell
Test-DbaNetworkLatency
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Query] <String>]
    [[-Count] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaNetworkLatency -SqlInstance sqlserver2014a, sqlcluster
```

Tests the round trip return of "SELECT TOP 100 * FROM INFORMATION_SCHEMA.TABLES" on sqlserver2014a and sqlcluster using Windows credentials.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaNetworkLatency -SqlInstance sqlserver2014a -SqlCredential $cred
```

Tests the execution results return of "SELECT TOP 100 * FROM INFORMATION_SCHEMA.TABLES" on sqlserver2014a using SQL credentials.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaNetworkLatency -SqlInstance sqlserver2014a, sqlcluster, sqlserver -Query "select top 10 * from otherdb.dbo.table" -Count 10
```

Tests the execution results return of "select top 10 * from otherdb.dbo.table" 10 times on sqlserver2014a, sqlcluster, and sqlserver using Windows credentials.<br>

### Required Parameters

##### -SqlInstance

The SQL Server you want to run the test on.

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

##### -Query

Specifies the SQL query to execute for latency testing. Defaults to "SELECT TOP 100 * FROM INFORMATION_SCHEMA.TABLES" which provides consistent results across all SQL Server versions.  
Use a custom query when you need to test latency with queries similar to your actual workload, or when testing against specific databases using fully qualified object names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | select top 100 * from INFORMATION_SCHEMA.TABLES |

##### -Count

Specifies how many times the query should be executed to calculate average latency measurements. Defaults to 3 executions.  
Increase this value when you need more precise average measurements or when testing intermittent network issues. Higher counts provide better statistical accuracy but take longer to complete.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 3 |

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
