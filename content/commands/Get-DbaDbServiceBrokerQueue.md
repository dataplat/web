---
title: "Get-DbaDbServiceBrokerQueue"
slug: "Get-DbaDbServiceBrokerQueue"
date: 2024-01-01
layout: "single"
author: "Ant Green (@ant_green)"
availability: "Windows, Linux, macOS"
synopsis: "Gets database service broker queues"
tags:
  - "Database"
  - "ServiceBroker"
  - "Queue"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbServiceBrokerQueue.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbServiceBrokerQueue"
draft: false
---

# Get-DbaDbServiceBrokerQueue

| Property | Value |
| --- | --- |
| **Author** | Ant Green (@ant_green) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbServiceBrokerQueue](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbServiceBrokerQueue.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbServiceBrokerQueue](https://dataplat.github.io/boh#Get-DbaDbServiceBrokerQueue).

## Synopsis

Gets database service broker queues

## Description

Gets database Sservice broker queue

## Syntax

```powershell
Get-DbaDbServiceBrokerQueue
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemQueue]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbServiceBrokerQueue -SqlInstance sql2016
```

Gets all database service broker queues<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbServiceBrokerQueue -SqlInstance Server1 -Database db1
```

Gets the service broker queues for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbServiceBrokerQueue -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the service broker queues for all databases except db1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbServiceBrokerQueue -SqlInstance Server1 -ExcludeSystemQueue
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

Specifies which databases to retrieve Service Broker queues from. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases instead of scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude from the Service Broker queue retrieval. Accepts wildcards for pattern matching.  
Useful when you want to scan most databases but skip specific ones like test or development databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemQueue

Excludes system-created Service Broker queues from the results, showing only user-created queues.  
Use this to focus on application-specific queues and filter out SQL Server's internal messaging queues.

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
