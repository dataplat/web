---
title: "Set-DbaDbCompatibility"
slug: "Set-DbaDbCompatibility"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley, blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Changes database compatibility levels to match SQL Server instance version or specified target level."
tags:
  - "Compatibility"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbCompatibility.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbCompatibility"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaDbCompatibility</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbCompatibility.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Garry Bargsley, blog.garrybargsley.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Changes database compatibility levels to match SQL Server instance version or specified target level.

## Description

Updates database compatibility levels across one or more SQL Server instances. When no specific compatibility level is provided, automatically sets each database to match the SQL Server instance version it resides on. This is particularly useful after SQL Server upgrades when databases retain their original compatibility levels and need updating to take advantage of newer engine features and optimizations. The function processes only databases where the current compatibility level differs from the target level, making it safe to run repeatedly.

## Syntax

```powershell
Set-DbaDbCompatibility
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Compatibility] {Version60 | Version65 | Version70 | Version80 | Version90 | Version100 | Version110 | Version120 | Version130 | Version140 | Version150 | Version160 | Version170}]
    [[-InputObject] <Database[]>]
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
PS C:\> Set-DbaDbCompatibility -SqlInstance sql2017a
```
{: data-copyable="true" data-clean-code="Set-DbaDbCompatibility -SqlInstance sql2017a" }

Changes database compatibility level for all user databases on server sql2017a that have a Compatibility level that do not match<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbCompatibility -SqlInstance sql2019a -Compatibility Version150
```
{: data-copyable="true" data-clean-code="Set-DbaDbCompatibility -SqlInstance sql2019a -Compatibility Version150" }

Changes database compatibility level for all user databases on server sql2019a to Version150<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaDbCompatibility -SqlInstance sql2022b -Database Test -Compatibility Version160
```
{: data-copyable="true" data-clean-code="Set-DbaDbCompatibility -SqlInstance sql2022b -Database Test -Compatibility Version160" }

Changes database compatibility level for database Test on server sql2022b to Version160<br>

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

Specifies which databases to update compatibility levels for. Accepts wildcards for pattern matching.  
When omitted, processes all user databases on the target instance, excluding system databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Compatibility

Sets a specific target compatibility level for all processed databases. Must be a valid CompatibilityLevel enum value like Version160, Version150, etc.  
When omitted, automatically updates each database to match its SQL Server instance version, which is typically desired after SQL Server upgrades.  
Use this parameter when you need databases to remain at a specific compatibility level rather than matching the current server version.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from the pipeline, typically from Get-DbaDatabase or other dbatools functions.  
Use this when you need to apply compatibility level changes to a pre-filtered set of databases or when chaining multiple dbatools commands together.

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
