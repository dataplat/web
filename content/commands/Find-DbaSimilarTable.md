---
title: "Find-DbaSimilarTable"
slug: "Find-DbaSimilarTable"
date: 2024-01-01
layout: "single"
author: "Jana Sattainathan (@SQLJana), sqljana.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Finds tables and views with similar structures by comparing column names across databases"
tags:
  - "Table"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaSimilarTable.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaSimilarTable"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaSimilarTable</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaSimilarTable.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Jana Sattainathan (@SQLJana), sqljana.wordpress.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Finds tables and views with similar structures by comparing column names across databases

## Description

Analyzes table and view structures across databases by comparing column names using INFORMATION_SCHEMA views. Returns a match percentage showing how similar structures are based on shared column names.  
  
Perfect for finding archive tables that mirror production structures, identifying tables that might serve similar purposes across databases, or discovering where specific table patterns are used throughout your SQL Server environment.  
  
You can search across all databases or target specific databases, schemas, or tables. The function calculates match percentages so you can set minimum thresholds to filter results and focus on the most relevant matches.  
  
More information can be found here: https://sqljana.wordpress.com/2017/03/31/sql-server-find-tables-with-similar-table-structure/

## Syntax

```powershell
Find-DbaSimilarTable
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-SchemaName] <String>]
    [[-TableName] <String>]
    [-ExcludeViews]
    [-IncludeSystemDatabases]
    [[-MatchPercentThreshold] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01
```
{: data-copyable="true" data-clean-code="Find-DbaSimilarTable -SqlInstance DEV01" }

Searches all user database tables and views for each, returns all tables or views with their matching tables/views and match percent<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks
```
{: data-copyable="true" data-clean-code="Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks" }

Searches AdventureWorks database and lists tables/views and their corresponding matching tables/views with match percent<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks -SchemaName HumanResource
```
{: data-copyable="true" data-clean-code="Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks -SchemaName HumanResource" }

Searches AdventureWorks database and lists tables/views in the HumanResource schema with their corresponding matching tables/views with match percent<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks -SchemaName HumanResource -Table Employee
```
{: data-copyable="true" data-clean-code="Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks -SchemaName HumanResource -Table Employee" }

Searches AdventureWorks database and lists tables/views in the HumanResource schema and table Employee with its corresponding matching tables/views with match percent<br>

#####  Example:  5 

```powershell
PS C:\> Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks -MatchPercentThreshold 60
```
{: data-copyable="true" data-clean-code="Find-DbaSimilarTable -SqlInstance DEV01 -Database AdventureWorks -MatchPercentThreshold 60" }

Searches AdventureWorks database and lists all tables/views with its corresponding matching tables/views with match percent greater than or equal to 60<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input

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

Specifies which databases to search for similar table structures. Accepts multiple database names.  
Use this to limit the search scope when you know which databases contain the tables you're comparing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the similarity search. Accepts multiple database names.  
Useful for skipping temp databases, development copies, or databases with known irrelevant structures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SchemaName

Limits the search to tables within a specific schema. Only tables in this schema will be used as reference structures.  
Use this when comparing tables within a logical grouping like 'Sales', 'HR', or 'Archive' schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TableName

Uses a specific table as the reference structure to find similar tables across databases.  
Perfect for finding archive versions of production tables or identifying tables that mirror a known structure.  
When the table exists in multiple schemas, all instances are used as reference points.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeViews

Excludes views from both the reference objects and the comparison results, focusing only on physical tables.  
Use this when you need to find similar table structures for data migration or archiving where views aren't relevant.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSystemDatabases

Includes system databases (master, model, msdb, tempdb) in the similarity search.  
Typically used when troubleshooting system table relationships or comparing custom objects in system databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MatchPercentThreshold

Sets the minimum percentage of matching column names required to include a table pair in results.  
Use values like 50 for loose matches, 80 for close structural similarity, or 95 for near-identical tables.  
Zero matches are always excluded regardless of this threshold.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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
