---
title: "Get-DbaDbServiceBrokerService"
slug: "Get-DbaDbServiceBrokerService"
date: 2024-01-01
layout: "single"
author: "Ant Green (@ant_green)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Service Broker services from SQL Server databases for auditing and troubleshooting messaging configurations"
tags:
  - "Service"
  - "ServiceBroker"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbServiceBrokerService.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbServiceBrokerService"
draft: false
---

# Get-DbaDbServiceBrokerService

| Property | Value |
| --- | --- |
| **Author** | Ant Green (@ant_green) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbServiceBrokerService](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbServiceBrokerService.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbServiceBrokerService](https://dataplat.github.io/boh#Get-DbaDbServiceBrokerService).

## Synopsis

Retrieves Service Broker services from SQL Server databases for auditing and troubleshooting messaging configurations

## Description

Retrieves detailed information about Service Broker services configured in SQL Server databases, including service names, associated queues, schemas, and ownership details. Service Broker services define the endpoints for reliable messaging between applications and databases. This function helps DBAs audit Service Broker implementations, troubleshoot message-based applications, and document messaging configurations for compliance or migration planning.

## Syntax

```powershell
Get-DbaDbServiceBrokerService
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemService]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbServiceBrokerService -SqlInstance sql2016
```

Gets all database service broker queues<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbServiceBrokerService -SqlInstance Server1 -Database db1
```

Gets the service broker queues for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbServiceBrokerService -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the service broker queues for all databases except db1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbServiceBrokerService -SqlInstance Server1 -ExcludeSystemService
```

Gets the service broker queues for all databases that are not system objects<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -Database

Specifies which databases to query for Service Broker services. Accepts multiple database names.  
Use this when you need to limit the search to specific databases instead of scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the Service Broker service search. Accepts multiple database names.  
Useful when you want to audit most databases but skip known databases without Service Broker configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemService

Excludes system-created Service Broker services from the results, showing only user-defined services.  
Use this to focus on custom messaging implementations and avoid clutter from built-in SQL Server services.

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
