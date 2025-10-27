---
title: "New-DbaReplSubscription"
slug: "New-DbaReplSubscription"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Creates SQL Server replication subscriptions to distribute data from publisher to subscriber instances."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaReplSubscription.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaReplSubscription"
draft: false
---

# New-DbaReplSubscription

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaReplSubscription](https://github.com/dataplat/dbatools/blob/master/public/New-DbaReplSubscription.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaReplSubscription](https://dataplat.github.io/boh#New-DbaReplSubscription).

## Synopsis

Creates SQL Server replication subscriptions to distribute data from publisher to subscriber instances.

## Description

Creates push or pull subscriptions for SQL Server replication, connecting a subscriber instance to an existing publication on a publisher. This function handles the setup of transactional, snapshot, and merge replication subscriptions, automatically creating the subscription database and required schemas if they don't exist. Use this when you need to establish data replication for disaster recovery, reporting databases, or distributing data across multiple SQL Server instances without manually configuring subscription properties through SQL Server Management Studio.

## Syntax

```powershell
New-DbaReplSubscription
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [-SubscriberSqlInstance] <DbaInstanceParameter[]>
    [[-SubscriberSqlCredential] <PSCredential>]
    [[-SubscriptionDatabase] <String>]
    [-PublicationName] <String>
    [[-SubscriptionSqlCredential] <PSCredential>]
    [-Type] <String>
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> New-DbaReplSubscription -SqlInstance sql2017 -Database pubs -SubscriberSqlInstance sql2019 -SubscriptionDatabase pubs -PublicationName testPub -Type Push
```

Creates a push subscription from sql2017 to sql2019 for the pubs database.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaReplSubscription -SqlInstance sql2017 -Database pubs -SubscriberSqlInstance sql2019 -SubscriptionDatabase pubs -PublicationName testPub -Type Pull
```

Creates a pull subscription from sql2017 to sql2019 for the pubs database.<br>

### Required Parameters

##### -SqlInstance

The target publishing SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -SubscriberSqlInstance

The target SQL Server instance that will receive the replicated data from the publisher.  
Can specify multiple instances to create subscriptions on several subscribers simultaneously.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -PublicationName

The name of the existing publication on the publisher database that you want to subscribe to.  
This publication must already exist and be configured for the type of subscription you're creating.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies whether to create a Push or Pull subscription for data synchronization.  
Push subscriptions are managed by the publisher and typically used for high-frequency replication, while Pull subscriptions are managed by the subscriber.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Push,Pull |

### Optional Parameters

##### -SqlCredential

Login to the target publishing instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the source database on the publisher instance that contains the publication data to be replicated.  
This database must already contain the publication you're subscribing to.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubscriberSqlCredential

Login credentials for connecting to the subscriber SQL Server instance. Accepts PowerShell credentials (Get-Credential).  
Use this when the subscriber requires different authentication than the publisher connection.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubscriptionDatabase

The destination database name on the subscriber instance where replicated data will be stored.  
If this database doesn't exist, it will be automatically created with default settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubscriptionSqlCredential

SQL Server credentials used by the replication agents to connect to the subscriber database during synchronization.  
These credentials are stored in the subscription properties and used by the Distribution or Merge Agent.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
