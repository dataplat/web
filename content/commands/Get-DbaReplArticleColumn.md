---
title: "Get-DbaReplArticleColumn"
slug: "Get-DbaReplArticleColumn"
date: 2024-01-01
layout: "single"
author: "ClÃ¡udio Silva (@claudioessilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves column-level replication configuration details for SQL Server publication articles."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplArticleColumn.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaReplArticleColumn"
draft: false
---

# Get-DbaReplArticleColumn

| Property | Value |
| --- | --- |
| **Author** | ClÃ¡udio Silva (@claudioessilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaReplArticleColumn](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplArticleColumn.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaReplArticleColumn](https://dataplat.github.io/boh#Get-DbaReplArticleColumn).

## Synopsis

Retrieves column-level replication configuration details for SQL Server publication articles.

## Description

Returns detailed information about which columns are included in replication articles, helping DBAs audit replication configurations and troubleshoot column-specific replication issues. This is particularly useful when working with vertical partitioning scenarios where only specific columns from source tables are replicated to subscribers, or when investigating why certain columns aren't appearing in replicated data.

## Syntax

```powershell
Get-DbaReplArticleColumn
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-Publication] <Object[]>]
    [[-Article] <String[]>]
    [[-Column] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaReplArticleColumn -SqlInstance sqlserver2019
```

Retrieve information of all replicated columns in any publications on server sqlserver2019.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplArticleColumn -SqlInstance sqlserver2019 -Database pubs
```

Retrieve information of all replicated columns in any publications from the pubs database on server sqlserver2019.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaReplArticleColumn -SqlInstance sqlserver2019 -Publication test
```

Retrieve information of all replicated columns in the test publication on server sqlserver2019.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaReplArticleColumn -SqlInstance sqlserver2019 -Database pubs -Publication PubName -Article sales
```

Retrieve information of 'sales' article from 'PubName' on 'pubs' database for server sqlserver2019.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaReplArticleColumn -SqlInstance sqlserver2019 -Column state
```

Retrieve information for the state column in any publication from any database on server sqlserver2019.<br>

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

Filters results to specific database(s) containing publications. Accepts wildcards for pattern matching.  
Use this when you need to focus on replication columns from particular databases rather than scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Publication

Filters results to specific publication(s) within the specified databases. Accepts wildcards for pattern matching.  
Use this when auditing column replication configuration for particular publications or troubleshooting column-level issues in specific publications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Article

Filters results to specific article(s) within the publications. Accepts wildcards for pattern matching.  
Use this when you need to examine column replication details for particular tables or views that are published as articles.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Column

Filters results to specific column name(s) across all matched articles. Case-sensitive exact match.  
Use this when investigating whether specific columns are included in replication or troubleshooting missing columns in subscriber databases.

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
