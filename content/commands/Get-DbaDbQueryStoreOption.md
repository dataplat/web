---
title: "Get-DbaDbQueryStoreOption"
slug: "Get-DbaDbQueryStoreOption"
date: 2024-01-01
layout: "single"
author: "Enrico van de Laar (@evdlaar) | Klaas Vandenberghe (@PowerDBAKlaas) | Tracy Boggiano (@TracyBoggiano)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Query Store configuration settings from databases across SQL Server instances."
tags:
  - "QueryStore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbQueryStoreOption.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbQueryStoreOption"
draft: false
---

# Get-DbaDbQueryStoreOption

| Property | Value |
| --- | --- |
| **Author** | Enrico van de Laar (@evdlaar) , Klaas Vandenberghe (@PowerDBAKlaas) , Tracy Boggiano (@TracyBoggiano) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbQueryStoreOption](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbQueryStoreOption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbQueryStoreOption](https://dataplat.github.io/boh#Get-DbaDbQueryStoreOption).

## Synopsis

Retrieves Query Store configuration settings from databases across SQL Server instances.

## Description

Returns the complete Query Store configuration for user databases, including capture modes, storage limits, cleanup policies, and retention settings. This function helps DBAs audit Query Store configurations across their environment, identify databases with suboptimal settings, and ensure consistent Query Store policies. Query Store settings directly impact query performance monitoring, plan regression detection, and storage consumption, so regular configuration reviews are essential for maintaining optimal performance insights.

## Syntax

```powershell
Get-DbaDbQueryStoreOption
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbQueryStoreOption -SqlInstance ServerA\sql
```

Returns Query Store configuration settings for every database on the ServerA\sql instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbQueryStoreOption -SqlInstance ServerA\sql | Where-Object {$_.ActualState -eq "ReadWrite"}
```

Returns the Query Store configuration for all databases on ServerA\sql where the Query Store feature is in Read/Write mode.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbQueryStoreOption -SqlInstance localhost | format-table -AutoSize -Wrap
```

Returns Query Store configuration settings for every database on the ServerA\sql instance inside a table format.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

SqlLogin to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which user databases to retrieve Query Store configuration from. Accepts database names, wildcards, or arrays for multiple databases.  
Use this when you need to audit Query Store settings for specific databases rather than scanning your entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from Query Store configuration retrieval. System databases (master, tempdb, model) are automatically excluded.  
Useful for skipping databases that you know don't need Query Store monitoring or have restricted access permissions.

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
