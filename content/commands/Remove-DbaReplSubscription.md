---
title: "Remove-DbaReplSubscription"
slug: "Remove-DbaReplSubscription"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes a subscription for the target SQL instances."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaReplSubscription.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaReplSubscription"
draft: false
---

# Remove-DbaReplSubscription

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaReplSubscription](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaReplSubscription.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaReplSubscription](https://dataplat.github.io/boh#Remove-DbaReplSubscription).

## Synopsis

Removes a subscription for the target SQL instances.

## Description

Removes a subscription for the target SQL instances.  
  
https://learn.microsoft.com/en-us/sql/relational-databases/replication/delete-a-push-subscription?view=sql-server-ver16  
https://learn.microsoft.com/en-us/sql/relational-databases/replication/delete-a-pull-subscription?view=sql-server-ver16

## Syntax

```powershell
Remove-DbaReplSubscription
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Database] <String>
    [-PublicationName] <String>
    [-SubscriberSqlInstance] <DbaInstanceParameter>
    [[-SubscriberSqlCredential] <PSCredential>]
    [-SubscriptionDatabase] <String>
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
PS C:\> $sub = @{
>> SqlInstance           = 'mssql1'
>> Database              = 'pubs'
>> PublicationName       = 'testPub'
>> SubscriberSqlInstance = 'mssql2'
>> SubscriptionDatabase  = 'pubs'
>> }
PS C:\> Remove-DbaReplSubscription @sub
```

Removes a subscription for the testPub publication on mssql2.pubs.<br>

### Required Parameters

##### -SqlInstance

The target publisher SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Database

Specifies the publisher database that contains the replication publication.  
This is the source database where the published data originates from.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -PublicationName

Specifies the exact name of the replication publication to remove the subscription from.  
Must match an existing publication name on the publisher database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -SubscriberSqlInstance

Specifies the SQL Server instance that receives replicated data from the publisher.  
Use this to identify which subscriber instance should have its subscription removed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -SubscriptionDatabase

Specifies the database on the subscriber instance that receives the replicated data.  
This is the target database where the subscription will be removed from.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target publisher instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubscriberSqlCredential

Login to the subscriber instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Required when the subscriber instance uses different authentication than the publisher.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

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
