---
title: "New-DbaReplCreationScriptOptions"
slug: "New-DbaReplCreationScriptOptions"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Creates replication article creation script options for controlling which database objects are replicated"
tags:
  - "repl"
  - "Replication"
  - "Script"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaReplCreationScriptOptions.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaReplCreationScriptOptions"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaReplCreationScriptOptions</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaReplCreationScriptOptions.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates replication article creation script options for controlling which database objects are replicated

## Description

Creates a Microsoft.SqlServer.Replication.CreationScriptOptions object that controls which database objects and properties are included when replicating tables through SQL Server replication. This determines what gets scripted at the subscriber when articles are added to publications - things like indexes, constraints, triggers, and identity columns.  
  
By default, includes the same options that SQL Server Management Studio uses when adding articles: primary objects, custom procedures, identity properties, timestamps, clustered indexes, primary keys, collation, unique keys, and constraint replication settings. Use -NoDefaults to start with a blank slate and specify only the options you want.  
  
This object is typically used with Add-DbaReplArticle to precisely control what database schema elements are replicated to subscribers, avoiding common issues like missing indexes or constraints that can impact subscriber performance.  
  
See https://learn.microsoft.com/en-us/dotnet/api/microsoft.sqlserver.replication.creationscriptoptions for more information

## Syntax

```powershell
New-DbaReplCreationScriptOptions
    [[-Options] <String[]>]
    [-NoDefaults]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $cso = New-DbaReplCreationScriptOptions -Options NonClusteredIndexes, Statistics
PS C:\> $article = @{
>> SqlInstance           = 'mssql1'
>> Database              = 'pubs'
>> PublicationName       = 'testPub'
>> Name                  = 'stores'
>> CreationScriptOptions = $cso
>> }
PS C:\> Add-DbaReplArticle @article -EnableException
```
{: data-copyable="true" data-clean-code="$cso = New-DbaReplCreationScriptOptions -Options NonClusteredIndexes, Statistics
$article = @{
SqlInstance           = 'mssql1'
Database              = 'pubs'
PublicationName       = 'testPub'
Name                  = 'stores'
CreationScriptOptions = $cso
}
Add-DbaReplArticle @article -EnableException" }

Adds the stores table to the testPub publication from mssql1.pubs with the NonClusteredIndexes and Statistics options set<br>
includes default options.<br>

#####  Example:  2 

```powershell
PS C:\> $cso = New-DbaReplCreationScriptOptions -Options ClusteredIndexes, Identity -NoDefaults
PS C:\> $article = @{
>> SqlInstance           = 'mssql1'
>> Database              = 'pubs'
>> PublicationName       = 'testPub'
>> Name                  = 'stores'
>> CreationScriptOptions = $cso
>> }
PS C:\> Add-DbaReplArticle @article -EnableException
```
{: data-copyable="true" data-clean-code="$cso = New-DbaReplCreationScriptOptions -Options ClusteredIndexes, Identity -NoDefaults
$article = @{
SqlInstance           = 'mssql1'
Database              = 'pubs'
PublicationName       = 'testPub'
Name                  = 'stores'
CreationScriptOptions = $cso
}
Add-DbaReplArticle @article -EnableException" }

Adds the stores table to the testPub publication from mssql1.pubs with the ClusteredIndexes and Identity options set, excludes default options.<br>

### Optional Parameters

##### -Options

Specifies which database object properties to include when creating replicated tables at subscribers. Controls what gets scripted beyond the basic table structure.  
Use this to add specific elements like NonClusteredIndexes, Statistics, CheckConstraints, or ForeignKeys that aren't included in the default set.  
Common values include Statistics for performance, NonClusteredIndexes for query optimization, or Triggers for business logic replication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoDefaults

Excludes the standard replication options that SQL Server Management Studio applies automatically when adding articles.  
Use this when you need precise control over which schema elements are replicated and want to avoid the default behavior.  
Without this switch, includes PrimaryObject, CustomProcedures, Identity, KeepTimestamp, ClusteredIndexes, DriPrimaryKey, Collation, DriUniqueKeys, and constraint replication settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
