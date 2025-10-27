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

# Set-DbaDbCompatibility

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley, blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbCompatibility](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbCompatibility.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbCompatibility](https://dataplat.github.io/boh#Set-DbaDbCompatibility).

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

Changes database compatibility level for all user databases on server sql2017a that have a Compatibility level that do not match<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbCompatibility -SqlInstance sql2019a -Compatibility Version150
```

Changes database compatibility level for all user databases on server sql2019a to Version150<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaDbCompatibility -SqlInstance sql2022b -Database Test -Compatibility Version160
```

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
