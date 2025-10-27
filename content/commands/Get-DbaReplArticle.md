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

# Get-DbaReplArticle

| Property | Value |
| --- | --- |
| **Author** | ClÃ¡udio Silva (@claudioessilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaReplArticle](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplArticle.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaReplArticle](https://dataplat.github.io/boh#Get-DbaReplArticle).

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

Retrieve information of all articles from all publications on all databases for server mssql1.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1 -Database pubs
```

Retrieve information of all articles from all publications on 'pubs' database for server mssql1.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1 -Database pubs -Publication PubName
```

Retrieve information of all articles from 'PubName' on 'pubs' database for server mssql1.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1 -Database pubs -Schema sales
```

Retrieve information of articles in the 'sales' schema on 'pubs' database for server mssql1.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaReplArticle -SqlInstance mssql1 -Database pubs -Publication PubName -Name sales
```

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
