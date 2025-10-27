---
title: "Remove-DbaReplArticle"
slug: "Remove-DbaReplArticle"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes articles from SQL Server replication publications and their associated subscriptions."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaReplArticle.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaReplArticle"
draft: false
---

# Remove-DbaReplArticle

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaReplArticle](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaReplArticle.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaReplArticle](https://dataplat.github.io/boh#Remove-DbaReplArticle).

## Synopsis

Removes articles from SQL Server replication publications and their associated subscriptions.

## Description

Removes articles from SQL Server replication publications, automatically handling subscription cleanup when subscribers exist. This function is essential when you need to stop replicating specific tables, views, or stored procedures without dismantling the entire publication.  
  
When articles have active subscriptions, the function first removes them from all subscribers using sp_dropsubscription before removing the article from the publication itself. This prevents orphaned subscription entries that could cause synchronization issues.  
  
Important considerations: Dropping an article from a publication does not remove the actual object from the publication database or the corresponding object from the subscription database. Use DROP <Object> statements to remove these objects if necessary. Additionally, dropping an article invalidates the current snapshot, so a new snapshot must be created before the next synchronization cycle.

## Syntax

```powershell
Remove-DbaReplArticle
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-Publication] <String>]
    [[-Schema] <String>]
    [[-Name] <String>]
    [[-InputObject] <Article[]>]
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
PS C:\> Remove-DbaReplArticle -SqlInstance mssql1 -Database Pubs -Publication PubFromPosh -Name 'publishers'
```

Removes the publishers article from a publication called PubFromPosh on mssql1<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1 -Database Pubs -Publication TestPub | Remove-DbaReplArticle
```

Removes all articles from a publication called TestPub on mssql1<br>

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

##### -Database

Specifies the publication database on the publisher that contains the article to remove from replication.  
This is the database where the source objects (tables, views, stored procedures) exist and are published for replication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Publication

Specifies the name of the replication publication from which to remove the article.  
Use Get-DbaReplPublication to list available publications if you're unsure of the exact name.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Specifies the schema name of the replicated object to remove from the publication. Defaults to 'dbo'.  
Required when multiple schemas contain objects with the same name, ensuring you remove the correct article.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbo |

##### -Name

Specifies the name of the article to remove from the publication.  
This corresponds to the source object name (table, view, or stored procedure) that was added to replication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts replication article objects from Get-DbaReplArticle for pipeline operations.  
Use this to remove multiple articles efficiently: Get-DbaReplArticle | Remove-DbaReplArticle.

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
