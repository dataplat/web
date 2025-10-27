---
title: "Get-DbaReplArticle"
slug: "Get-DbaReplArticle"
date: 2024-01-01
layout: "single"
author: "ClÃ¡udio Silva (@claudioessilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed information about replication articles from SQL Server publications."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplArticle.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaReplArticle"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaReplArticle</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplArticle.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>ClÃ¡udio Silva (@claudioessilva), claudioessilva.eu</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves detailed information about replication articles from SQL Server publications.

## Description

Retrieves comprehensive details about articles within SQL Server replication publications, helping DBAs audit and manage replication topology. Articles define which tables, views, or stored procedures are included in a publication for data distribution to subscribers.  
  
This function examines all accessible databases on the specified instances and returns article properties including name, type, schema, source objects, and partitioning details. Use this when troubleshooting replication issues, documenting replication setup, or verifying which objects are being replicated across your environment.

## Syntax

```powershell
Get-DbaReplArticle
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-Publication] <Object[]>]
    [[-Schema] <String[]>]
    [[-Name] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1
```
{: data-copyable="true" data-clean-code="Get-DbaReplArticle -SqlInstance mssql1" }

Retrieve information of all articles from all publications on all databases for server mssql1.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1 -Database pubs
```
{: data-copyable="true" data-clean-code="Get-DbaReplArticle -SqlInstance mssql1 -Database pubs" }

Retrieve information of all articles from all publications on 'pubs' database for server mssql1.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1 -Database pubs -Publication PubName
```
{: data-copyable="true" data-clean-code="Get-DbaReplArticle -SqlInstance mssql1 -Database pubs -Publication PubName" }

Retrieve information of all articles from 'PubName' on 'pubs' database for server mssql1.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1 -Database pubs -Schema sales
```
{: data-copyable="true" data-clean-code="Get-DbaReplArticle -SqlInstance mssql1 -Database pubs -Schema sales" }

Retrieve information of articles in the 'sales' schema on 'pubs' database for server mssql1.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1 -Database pubs -Publication PubName -Name sales
```
{: data-copyable="true" data-clean-code="Get-DbaReplArticle -SqlInstance mssql1 -Database pubs -Publication PubName -Name sales" }

Retrieve information of 'sales' article from 'PubName' on 'pubs' database for server mssql1.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to examine for replication articles. Only articles from publications in these databases will be returned.  
Use this when you need to focus on replication articles within specific databases rather than scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Publication

Filters results to articles within specific replication publications. Only articles from these named publications will be returned.  
Use this when troubleshooting a specific publication or when you need to audit articles within particular publications rather than all publications in the database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Filters articles by the schema of their source objects (tables, views, or procedures). Only articles whose source objects belong to these schemas will be returned.  
Use this when you need to examine replication articles for objects within specific schemas, such as when troubleshooting schema-specific replication issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Filters results to articles with specific names. Only articles matching these exact names will be returned.  
Use this when you need to examine specific replication articles by name, such as when troubleshooting issues with particular replicated objects.

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


&nbsp;
