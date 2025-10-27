---
title: "Get-DbaDbFeatureUsage"
slug: "Get-DbaDbFeatureUsage"
date: 2024-01-01
layout: "single"
author: "Brandon Abshire, netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies Enterprise-edition features currently used in databases that prevent downgrading to Standard edition"
tags:
  - "Deprecated"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFeatureUsage.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbFeatureUsage"
draft: false
---

# Get-DbaDbFeatureUsage

| Property | Value |
| --- | --- |
| **Author** | Brandon Abshire, netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbFeatureUsage](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFeatureUsage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbFeatureUsage](https://dataplat.github.io/boh#Get-DbaDbFeatureUsage).

## Synopsis

Identifies Enterprise-edition features currently used in databases that prevent downgrading to Standard edition

## Description

Queries the sys.dm_db_persisted_sku_features dynamic management view to identify SQL Server Enterprise features that are actively used in your databases. This is essential when planning to downgrade from Enterprise to Standard edition or migrating databases to environments with lower SQL Server editions.  
  
Enterprise features like columnstore indexes, table partitioning, or transparent data encryption must be removed or disabled before a database can be successfully migrated to Standard edition. This function helps you inventory these blocking features across one or more databases so you can plan the necessary remediation steps.  
  
Returns feature ID, feature name, and database information for each Enterprise feature found, making it easy to identify which databases need attention before edition changes.

## Syntax

```powershell
Get-DbaDbFeatureUsage
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2008 -Database testdb, db2 | Get-DbaDbFeatureUsage
```

Shows features that are enabled in the testdb and db2 databases but<br>
not supported on the all the editions of SQL Server.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance

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

Specifies which databases to scan for Enterprise edition features. Accepts wildcards for pattern matching.  
Use this when you need to check specific databases instead of scanning all databases on the instance.  
Helpful when planning edition downgrades for particular databases or troubleshooting feature usage in development environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the Enterprise feature scan. Accepts wildcards for pattern matching.  
Use this to skip system databases, read-only databases, or databases you know don't need to be downgraded.  
Commonly used to exclude tempdb, model, or archived databases from bulk scanning operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects directly from the pipeline, typically from Get-DbaDatabase output.  
Use this for advanced filtering scenarios or when you've already retrieved specific database objects.  
Allows you to chain database selection commands with feature usage checking in a single pipeline operation.

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
