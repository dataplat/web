---
title: "Test-DbaEndpoint"
slug: "Test-DbaEndpoint"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Tests network connectivity to SQL Server endpoint TCP listener ports."
tags:
  - "Endpoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaEndpoint.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaEndpoint"
draft: false
---

# Test-DbaEndpoint

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaEndpoint](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaEndpoint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaEndpoint](https://dataplat.github.io/boh#Test-DbaEndpoint).

## Synopsis

Tests network connectivity to SQL Server endpoint TCP listener ports.

## Description

Tests network connectivity to SQL Server endpoint TCP listener ports by attempting direct socket connections. This function validates that endpoint ports are accessible from the network level, which is essential for troubleshooting database mirroring, Service Broker, and availability group connectivity issues.  
  
The function tests both standard TCP ports and SSL ports when configured, returning connection status rather than endpoint functionality. Endpoints without TCP listener ports (such as HTTP endpoints) are automatically skipped during testing.  
  
Use this when diagnosing connectivity problems between SQL Server instances or validating firewall rules before setting up features that rely on endpoints.

## Syntax

```powershell
Test-DbaEndpoint
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Endpoint] <String[]>]
    [[-InputObject] <Endpoint[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaEndpoint -SqlInstance localhost
```

Tests all endpoints on the local default SQL Server instance.<br>
Note that if an endpoint does not have a tcp listener port, it will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaEndpoint -SqlInstance localhost, sql2016 -Endpoint Mirror | Test-DbaEndpoint
```

Tests all endpoints named Mirroring on sql2016 and localhost.<br>
Note that if an endpoint does not have a tcp listener port, it will be skipped.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaEndpoint -SqlInstance localhost, sql2016 -Endpoint Mirror
```

Tests all endpoints named Mirroring on sql2016 and localhost.<br>
Note that if an endpoint does not have a tcp listener port, it will be skipped.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaEndpoint -SqlInstance localhost -Verbose
```

Tests all endpoints on the local default SQL Server instance.<br>
See all endpoints that were skipped due to not having a tcp listener port.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Endpoint

Specifies which endpoint names to test for network connectivity. Accepts multiple endpoint names to filter testing to specific endpoints.  
Use this when you need to validate connectivity for particular endpoints like database mirroring, Service Broker, or availability group listeners instead of testing all endpoints on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts endpoint objects from Get-DbaEndpoint for pipeline processing. This allows you to filter endpoints first using Get-DbaEndpoint, then test only those specific endpoints.  
Use this approach when you need to apply complex filtering logic before testing connectivity, such as testing only endpoints of a specific type or state.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
