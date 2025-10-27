---
title: "Copy-DbaDataCollector"
slug: "Copy-DbaDataCollector"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Data Collector collection sets from one instance to another"
tags:
  - "Migration"
  - "DataCollection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDataCollector.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaDataCollector"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaDataCollector</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDataCollector.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Copies SQL Data Collector collection sets from one instance to another

## Description

Copies SQL Data Collector collection sets between SQL Server instances, allowing you to replicate performance monitoring configurations across your environment. This command scripts out the collection set definitions from the source instance and recreates them on the destination, preserving all collection items, schedules, and upload settings.  
  
By default, all user-defined collection sets are migrated. If a collection set already exists on the destination, it will be skipped unless -Force is used to drop and recreate it. Collection sets that were running on the source will automatically be started on the destination after migration.  
  
The -CollectionSet parameter is auto-populated for command-line completion and can be used to copy only specific collection sets. Note that Data Collector must already be configured and enabled on the destination instance before running this command.

## Syntax

```powershell
Copy-DbaDataCollector
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-CollectionSet] <Object[]>]
    [[-ExcludeCollectionSet] <Object[]>]
    [-NoServerReconfig]
    [-Force]
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
PS C:\> Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster" }

Copies all Data Collector Objects and Configurations from sqlserver2014a to sqlcluster, using Windows credentials.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```
{: data-copyable="true" data-clean-code="Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred" }

Copies all Data Collector Objects and Configurations from sqlserver2014a to sqlcluster, using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster -WhatIf
```
{: data-copyable="true" data-clean-code="Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster -WhatIf" }

Shows what would happen if the command were executed.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster -CollectionSet 'Server Activity', 'Table Usage Analysis'
```
{: data-copyable="true" data-clean-code="Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster -CollectionSet 'Server Activity', 'Table Usage Analysis'" }

Copies two Collection Sets, Server Activity and Table Usage Analysis, from sqlserver2014a to sqlcluster.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the Data Collector collection sets to copy. Requires sysadmin access and SQL Server 2008 or higher.  
The Data Collector feature must be configured on this instance for collection sets to exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server instance(s) where collection sets will be created. Requires sysadmin access and SQL Server 2008 or higher.  
The Data Collector feature must already be configured and enabled on the destination before running this command.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Login credentials for the source SQL Server instance. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Login credentials for the destination SQL Server instance(s). Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CollectionSet

Specific collection set names to copy from the source instance. Supports tab completion with available collection sets.  
When omitted, all user-defined collection sets are copied (system collection sets are always excluded).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeCollectionSet

Collection set names to exclude from the copy operation. Supports tab completion with available collection sets.  
Useful when you want to copy most collection sets but skip specific ones due to environment differences.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoServerReconfig

Reserved parameter for future Data Collector server configuration copying functionality.  
Currently has no effect as server-level configuration copying is not yet implemented.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates collection sets that already exist on the destination server.  
Without this switch, existing collection sets are skipped to prevent accidental data loss.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
