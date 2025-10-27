---
title: "Test-DbaMigrationConstraint"
slug: "Test-DbaMigrationConstraint"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva)"
availability: "Windows, Linux, macOS"
synopsis: "Validates database migration compatibility between SQL Server instances by checking for edition-specific features."
tags:
  - "Migration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaMigrationConstraint.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaMigrationConstraint"
draft: false
---

# Test-DbaMigrationConstraint

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaMigrationConstraint](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaMigrationConstraint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaMigrationConstraint](https://dataplat.github.io/boh#Test-DbaMigrationConstraint).

## Synopsis

Validates database migration compatibility between SQL Server instances by checking for edition-specific features.

## Description

Prevents migration failures by identifying databases that use features incompatible with the destination SQL Server edition.  
This function queries sys.dm_db_persisted_sku_features to detect enterprise-level features that would cause migration issues when moving from higher editions (Enterprise/Developer) to lower ones (Standard/Express).  
  
Common migration scenarios this helps validate include moving databases from development environments running Developer edition to production Standard edition, or consolidating databases from Enterprise to Standard during license optimization.  
The function also checks FILESTREAM configuration compatibility and validates that Change Data Capture (CDC) isn't used when migrating to Express edition, since Express lacks SQL Server Agent.  
  
Validation works on SQL Server 2008 and higher versions using the sys.dm_db_persisted_sku_features DMV.  
Supported editions include Enterprise, Developer, Evaluation, Standard, and Express.  
  
SQL Server 2016 SP1 introduced feature parity across editions for many capabilities, so this function accounts for those changes when validating post-SP1 destinations.  
For more details see: https://blogs.msdn.microsoft.com/sqlreleaseservices/sql-server-2016-service-pack-1-sp1-released/  
  
The -Database parameter is auto-populated for command-line completion.

## Syntax

```powershell
Test-DbaMigrationConstraint
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter>
    [[-DestinationSqlCredential] <PSCredential>]
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
PS C:\> Test-DbaMigrationConstraint -Source sqlserver2014a -Destination sqlcluster
```

All databases on sqlserver2014a will be verified for features in use that can't be supported on sqlcluster.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaMigrationConstraint -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```

All databases will be verified for features in use that can't be supported on the destination server. SQL credentials are used to authenticate against sqlserver2014a and Windows Authentication is <br>
used for sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaMigrationConstraint -Source sqlserver2014a -Destination sqlcluster -Database db1
```

Only db1 database will be verified for features in use that can't be supported on the destination server.<br>

### Required Parameters

##### -Source

Specifies the source SQL Server instance containing databases to validate for migration compatibility.  
Must be SQL Server 2008 or higher since the function uses sys.dm_db_persisted_sku_features DMV to detect edition-specific features.  
Requires sysadmin access to query system views and database metadata.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Destination

Specifies the destination SQL Server instance where databases will be migrated to.  
The function validates that database features are compatible with this target server's edition (Enterprise, Developer, Standard, or Express).  
Must be SQL Server 2008 or higher and requires sysadmin access to check server edition and configuration settings like FileStream access level.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for authenticating to the source SQL Server instance when Windows Authentication is not available.  
Use this when running the function with a different account than your current Windows login, or when connecting to SQL instances that require SQL Authentication.  
Create with Get-Credential or pass stored credential objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for authenticating to the destination SQL Server instance when Windows Authentication is not available.  
Required when the destination server uses different authentication than your current context, or when testing migrations across domains.  
Use Get-Credential to create or pass existing credential objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to validate for migration compatibility.  
When omitted, checks all user databases on the source instance (excludes system databases master, msdb, tempdb).  
Use this to focus validation on specific databases when planning selective migrations or troubleshooting particular database features.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the migration validation process.  
Useful when you know certain databases won't be migrated or when focusing validation efforts on a subset of databases.  
Commonly used to exclude test databases, archived databases, or databases with known compatibility issues.

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
