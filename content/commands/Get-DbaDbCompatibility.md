---
title: "Get-DbaDbCompatibility"
slug: "Get-DbaDbCompatibility"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley, blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database compatibility levels from SQL Server instances for upgrade planning and compliance auditing."
tags:
  - "Compatibility"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbCompatibility.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbCompatibility"
draft: false
---

# Get-DbaDbCompatibility

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley, blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbCompatibility](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbCompatibility.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbCompatibility](https://dataplat.github.io/boh#Get-DbaDbCompatibility).

## Synopsis

Retrieves database compatibility levels from SQL Server instances for upgrade planning and compliance auditing.

## Description

Returns the current compatibility level setting for each database, which determines what SQL Server language features and behaviors are available to that database. This is essential when planning SQL Server upgrades, as databases often retain older compatibility levels even after the instance is upgraded. The function helps identify which databases may need compatibility level updates to take advantage of newer SQL Server features or to maintain vendor application support requirements.

## Syntax

```powershell
Get-DbaDbCompatibility
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbCompatibility -SqlInstance localhost\sql2017
```

Displays database compatibility level for all user databases on server localhost\sql2017<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbCompatibility -SqlInstance localhost\sql2017 -Database Test
```

Displays database compatibility level for database Test on server localhost\sql2017<br>

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

SqlLogin to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance..

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to check for compatibility levels. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases rather than reviewing all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from the pipeline to check their compatibility levels directly.  
Use this when you already have database objects from Get-DbaDatabase or other dbatools commands and want to avoid additional server queries.

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


&nbsp;
