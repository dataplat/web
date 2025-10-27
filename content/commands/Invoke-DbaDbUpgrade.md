---
title: "Invoke-DbaDbUpgrade"
slug: "Invoke-DbaDbUpgrade"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Upgrades database compatibility level and performs post-upgrade maintenance tasks"
tags:
  - "Shrink"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbUpgrade.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbUpgrade"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbUpgrade</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbUpgrade.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stephen Bennett, sqlnotesfromtheunderground.wordpress.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Upgrades database compatibility level and performs post-upgrade maintenance tasks

## Description

Performs the essential steps needed after upgrading SQL Server or moving databases to a newer instance. Updates database compatibility level to match the hosting SQL Server version and sets target recovery time to 60 seconds for SQL Server 2016 and newer.  
  
Executes critical post-upgrade maintenance including DBCC CHECKDB with DATA_PURITY to detect data corruption, DBCC UPDATEUSAGE to correct page counts, sp_updatestats to refresh statistics, and sp_refreshview to update all user views with new metadata. This automates the manual checklist DBAs typically follow after SQL Server upgrades to ensure databases function optimally on the new version.  
  
Based on https://thomaslarock.com/2014/06/upgrading-to-sql-server-2014-a-dozen-things-to-check/

## Syntax

```powershell
Invoke-DbaDbUpgrade
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-NoCheckDb]
    [-NoUpdateUsage]
    [-NoUpdateStats]
    [-NoRefreshView]
    [-AllUserDatabases]
    [-Force]
    [-InputObject <Database[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaDbUpgrade -SqlInstance PRD-SQL-MSD01 -Database Test
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbUpgrade -SqlInstance PRD-SQL-MSD01 -Database Test" }

Runs the below processes against the databases<br>
-- Puts compatibility of database to level of SQL Instance<br>
-- Changes the target recovery time to the new default of 60 seconds (for SQL Server 2016 and newer)<br>
-- Runs CHECKDB DATA_PURITY<br>
-- Runs DBCC UPDATESUSAGE<br>
-- Updates all users statistics<br>
-- Runs sp_refreshview against every view in the database<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbUpgrade -SqlInstance PRD-SQL-INT01 -Database Test -NoRefreshView
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbUpgrade -SqlInstance PRD-SQL-INT01 -Database Test -NoRefreshView" }

Runs the upgrade command skipping the sp_refreshview update on all views<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbUpgrade -SqlInstance PRD-SQL-INT01 -Database Test -Force
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbUpgrade -SqlInstance PRD-SQL-INT01 -Database Test -Force" }

If database Test is already at the correct compatibility, runs every necessary step<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 | Out-GridView -Passthru | Invoke-DbaDbUpgrade
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2016 | Out-GridView -Passthru | Invoke-DbaDbUpgrade" }

Get only specific databases using GridView and pass those to Invoke-DbaDbUpgrade<br>

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

Specifies which databases to upgrade and run post-upgrade maintenance tasks on. Accepts wildcards for pattern matching.  
Use this when you need to target specific databases rather than processing all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the upgrade process when using -AllUserDatabases. Accepts wildcards for pattern matching.  
Useful for skipping system-critical databases or those with special maintenance windows during bulk upgrade operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoCheckDb

Skips the DBCC CHECKDB with DATA_PURITY validation step during the upgrade process.  
Use this when you've recently run integrity checks or need to reduce upgrade time, though this removes corruption detection from the process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoUpdateUsage

Skips the DBCC UPDATEUSAGE step that corrects inaccuracies in page and row count information.  
Use this when you're confident space usage statistics are accurate or need to minimize upgrade time for very large databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoUpdateStats

Skips running sp_updatestats to refresh all user table statistics with current data distribution.  
Use this when statistics were recently updated or when you have a separate statistics maintenance plan in place.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoRefreshView

Skips executing sp_refreshview on all user views to update their metadata for the new SQL Server version.  
Use this when you have no views or prefer to refresh view metadata manually to avoid potential view compilation issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AllUserDatabases

Processes all user databases on the instance, excluding system databases. Cannot be used with -Database parameter.  
Use this for instance-wide upgrades after SQL Server version changes or when standardizing all databases to current compatibility levels.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Runs all maintenance tasks even on databases already at the correct compatibility level and target recovery time.  
Use this when you need to ensure CHECKDB, UPDATEUSAGE, statistics updates, and view refreshes run regardless of compatibility status.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects from the pipeline, typically from Get-DbaDatabase output. Cannot be used with -Database or -AllUserDatabases.  
Use this for targeted upgrades based on complex filtering criteria or when integrating with other dbatools commands in a pipeline.

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

##### -WhatIf

Shows what would happen if the command were to run

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts for confirmation of every step. For example:  
Are you sure you want to perform this action?  
Performing the operation "Update database" on target "pubs on SQL2016\VNEXT".  
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"):

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
