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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaReplSubscription</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaReplSubscription.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Jess Pomfret (@jpomfret), jesspomfret.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="New-DbaReplSubscription -SqlInstance sql2017 -Database pubs -SubscriberSqlInstance sql2019 -SubscriptionDatabase pubs -PublicationName testPub -Type Push" }

Creates a push subscription from sql2017 to sql2019 for the pubs database.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaReplSubscription -SqlInstance sql2017 -Database pubs -SubscriberSqlInstance sql2019 -SubscriptionDatabase pubs -PublicationName testPub -Type Pull
```
{: data-copyable="true" data-clean-code="New-DbaReplSubscription -SqlInstance sql2017 -Database pubs -SubscriberSqlInstance sql2019 -SubscriptionDatabase pubs -PublicationName testPub -Type Pull" }

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
