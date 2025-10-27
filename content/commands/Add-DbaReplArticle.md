---
title: "Add-DbaReplArticle"
slug: "Add-DbaReplArticle"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Adds a table or other database object as an article to an existing replication publication."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaReplArticle.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaReplArticle"
draft: false
---

# Add-DbaReplArticle

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Add-DbaReplArticle](https://github.com/dataplat/dbatools/blob/master/public/Add-DbaReplArticle.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Add-DbaReplArticle](https://dataplat.github.io/boh#Add-DbaReplArticle).

## Synopsis

Adds a table or other database object as an article to an existing replication publication.

## Description

Adds a database object (typically a table) as an article to an existing SQL Server replication publication. Articles define which tables and data get replicated to subscribers. This function supports both transactional and merge replication publications, allowing you to expand replication topology without using SQL Server Management Studio. You can apply horizontal filters to replicate only specific rows, and customize schema options like indexes and statistics that get created on subscriber databases.

## Syntax

```powershell
Add-DbaReplArticle
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Database] <String>
    [-Publication] <String>
    [[-Schema] <String>]
    [-Name] <String>
    [[-Filter] <String>]
    [[-CreationScriptOptions] <PSObject>]
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
PS C:\> Add-DbaReplArticle -SqlInstance mssql1 -Database Northwind -Publication PubFromPosh -Name TableToRepl
```

Adds the TableToRepl table to the PubFromPosh publication from mssql1.Northwind<br>

#####  Example:  2 

```powershell
PS C:\> $article = @{
>> SqlInstance           = "mssql1"
>> Database              = "pubs"
>> Publication           = "testPub"
>> Name                  = "publishers"
>> Filter                = "city = 'seattle'"
>> }
PS C:\> Add-DbaReplArticle @article -EnableException
```

Adds the publishers table to the TestPub publication from mssql1.Pubs with a horizontal filter of only rows where city = 'seattle.<br>

#####  Example:  3 

```powershell
PS C:\> $cso = New-DbaReplCreationScriptOptions -Options NonClusteredIndexes, Statistics
PS C:\> $article = @{
>> SqlInstance           = 'mssql1'
>> Database              = 'pubs'
>> Publication           = 'testPub'
>> Name                  = 'stores'
>> CreationScriptOptions = $cso
>> }
PS C:\> Add-DbaReplArticle @article -EnableException
```

Adds the stores table to the testPub publication from mssql1.pubs with the NonClusteredIndexes and Statistics options set<br>
includes default options.<br>

### Required Parameters

##### -SqlInstance

The SQL Server instance(s) for the publication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Database

Specifies the database containing both the publication and the object you want to add as an article.  
This must be the same database where your replication publication was created.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Publication

Specifies the name of the existing replication publication to add the article to.  
The publication must already exist and be configured for the type of replication you want (transactional, snapshot, or merge).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Name

Specifies the name of the database object (typically a table) to add as an article to the publication.  
This object will be replicated to all subscribers of the publication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -Schema

Specifies the schema name of the object you want to add as an article.  
Use this when your table or object exists in a schema other than dbo. Defaults to dbo if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbo |

##### -Filter

Applies a WHERE clause condition to filter which rows get replicated from the article (horizontal filtering).  
Use this when you only want to replicate specific rows, such as "City = 'Seattle'" or "Status = 'Active'". Do not include the word 'WHERE' in your filter expression.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CreationScriptOptions

Controls which schema elements get created on the subscriber database when the article is replicated.  
Use this to specify whether indexes, constraints, triggers, and other objects should be created on subscribers. Create this object using New-DbaReplCreationScriptOptions.

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
