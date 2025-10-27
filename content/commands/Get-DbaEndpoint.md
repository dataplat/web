---
title: "Get-DbaEndpoint"
slug: "Get-DbaEndpoint"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server endpoints with network connectivity details for troubleshooting and documentation."
tags:
  - "Endpoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaEndpoint.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaEndpoint"
draft: false
---

# Get-DbaEndpoint

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaEndpoint](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaEndpoint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaEndpoint](https://dataplat.github.io/boh#Get-DbaEndpoint).

## Synopsis

Retrieves SQL Server endpoints with network connectivity details for troubleshooting and documentation.

## Description

Retrieves all SQL Server endpoints including DatabaseMirroring, ServiceBroker, Soap, and TSql types with their network configuration details. This function provides essential information for troubleshooting connectivity issues, documenting high availability setups, and performing security audits. It automatically resolves DNS names and constructs connection strings (FQDN format) for endpoints that have TCP listeners, making it easier to validate network accessibility and plan firewall configurations.

## Syntax

```powershell
Get-DbaEndpoint
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Endpoint] <String[]>]
    [[-Type] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaEndpoint -SqlInstance localhost
```

Returns all endpoints on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaEndpoint -SqlInstance localhost, sql2016
```

Returns all endpoints for the local and sql2016 SQL Server instances<br>

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

##### -Endpoint

Specifies one or more endpoint names to retrieve instead of returning all endpoints. Accepts exact endpoint names and supports multiple values.  
Use this when you need to examine specific endpoints like 'Mirroring' or 'AlwaysOn_health' rather than scanning all configured endpoints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Filters endpoints by their functional type. Valid options: DatabaseMirroring, ServiceBroker, Soap, and TSql.  
Use this to focus on specific endpoint categories, such as 'DatabaseMirroring' for Always On AG troubleshooting or 'ServiceBroker' for message queuing configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | DatabaseMirroring,ServiceBroker,Soap,TSql |

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
