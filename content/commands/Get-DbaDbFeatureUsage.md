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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbFeatureUsage</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFeatureUsage.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Brandon Abshire, netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2008 -Database testdb, db2 | Get-DbaDbFeatureUsage" }

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
