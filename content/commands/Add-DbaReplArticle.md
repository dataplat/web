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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaReplArticle</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaReplArticle.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Add-DbaReplArticle -SqlInstance mssql1 -Database Northwind -Publication PubFromPosh -Name TableToRepl" }

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
{: data-copyable="true" data-clean-code="$article = @{
SqlInstance           = &quot;mssql1&quot;
Database              = &quot;pubs&quot;
Publication           = &quot;testPub&quot;
Name                  = &quot;publishers&quot;
Filter                = &quot;city = 'seattle'&quot;
}
Add-DbaReplArticle @article -EnableException" }

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
{: data-copyable="true" data-clean-code="$cso = New-DbaReplCreationScriptOptions -Options NonClusteredIndexes, Statistics
$article = @{
SqlInstance           = 'mssql1'
Database              = 'pubs'
Publication           = 'testPub'
Name                  = 'stores'
CreationScriptOptions = $cso
}
Add-DbaReplArticle @article -EnableException" }

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
