---
title: "Get-DbaReplSubscription"
slug: "Get-DbaReplSubscription"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server replication subscription details for publications across instances."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplSubscription.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaReplSubscription"
draft: false
---

# Get-DbaReplSubscription

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaReplSubscription](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplSubscription.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaReplSubscription](https://dataplat.github.io/boh#Get-DbaReplSubscription).

## Synopsis

Retrieves SQL Server replication subscription details for publications across instances.

## Description

Retrieves detailed information about replication subscriptions, showing which subscriber instances are receiving data from publications. This is essential for monitoring replication topology, troubleshooting subscription issues, and auditing data distribution across your SQL Server environment. You can filter results by database, publication name, subscriber instance, subscription database, or subscription type (Push/Pull) to focus on specific replication relationships.

## Syntax

```powershell
Get-DbaReplSubscription
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-PublicationName] <String[]>]
    [[-SubscriberName] <DbaInstanceParameter[]>]
    [[-SubscriptionDatabase] <Object[]>]
    [[-Type] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaReplSubscription -SqlInstance mssql1
```

Return all subscriptions for all publications on server mssql1.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplSubscription -SqlInstance mssql1 -Database TestDB
```

Return all subscriptions for all publications on server mssql1 for only the TestDB database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaReplSubscription -SqlInstance mssql1 -PublicationName Mergey
```

Return all subscriptions for the publication Mergey on server mssql1.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaReplSubscription -SqlInstance mssql1 -Type Push
```

Return all subscriptions for all transactional publications on server mssql1.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaReplSubscription -SqlInstance mssql1 -SubscriberName mssql2
```

Return all subscriptions for all publications on server mssql1 where the subscriber is mssql2.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaReplSubscription -SqlInstance mssql1 -SubscriptionDatabase TestDB
```

Return all subscriptions for all publications on server mssql1 where the subscription database is TestDB.<br>

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

##### -Database

Specifies which publication databases to include when retrieving subscriptions. Accepts multiple database names and wildcards.  
Use this to focus on subscriptions from specific databases instead of checking all replicated databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PublicationName

Filters results to subscriptions from specific publications by name. Accepts multiple publication names.  
Use this when you need to check subscription status for particular publications rather than all publications on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubscriberName

Filters results to subscriptions where data is being delivered to specific subscriber instances. Accepts multiple instance names.  
Use this to monitor subscription health and activity for particular subscriber servers in your replication topology.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubscriptionDatabase

Filters results to subscriptions where data is being delivered to specific databases on subscriber instances. Accepts multiple database names.  
Use this to track how data flows to particular databases across your subscribers, especially when subscription databases have different names than source databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Filters results to subscriptions of a specific delivery method (Push or Pull). Push subscriptions are managed by the publisher, while Pull subscriptions are managed by the subscriber.  
Use this to separate subscription management tasks or troubleshoot issues specific to push or pull delivery mechanisms.

| Property | Value |
| --- | --- |
| Alias | PublicationType |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Push,Pull |

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
