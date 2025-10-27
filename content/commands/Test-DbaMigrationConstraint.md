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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaMigrationConstraint</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaMigrationConstraint.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Claudio Silva (@ClaudioESSilva)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Test-DbaMigrationConstraint -Source sqlserver2014a -Destination sqlcluster" }

All databases on sqlserver2014a will be verified for features in use that can't be supported on sqlcluster.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaMigrationConstraint -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```
{: data-copyable="true" data-clean-code="Test-DbaMigrationConstraint -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred" }

All databases will be verified for features in use that can't be supported on the destination server. SQL credentials are used to authenticate against sqlserver2014a and Windows Authentication is <br>
used for sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaMigrationConstraint -Source sqlserver2014a -Destination sqlcluster -Database db1
```
{: data-copyable="true" data-clean-code="Test-DbaMigrationConstraint -Source sqlserver2014a -Destination sqlcluster -Database db1" }

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
