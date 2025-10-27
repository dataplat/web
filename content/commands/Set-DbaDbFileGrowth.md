---
title: "Set-DbaDbFileGrowth"
slug: "Set-DbaDbFileGrowth"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Modifies auto-growth settings for database data and log files to use fixed-size increments instead of percentage-based growth."
tags:
  - "Storage"
  - "Data"
  - "Log"
  - "File"
  - "Growth"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbFileGrowth.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbFileGrowth"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaDbFileGrowth</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbFileGrowth.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Modifies auto-growth settings for database data and log files to use fixed-size increments instead of percentage-based growth.

## Description

Configures database file auto-growth settings using ALTER DATABASE statements to replace default percentage-based growth with fixed-size increments. This prevents unpredictable growth patterns that can cause performance issues and storage fragmentation as databases grow larger. Defaults to 64MB growth increments, which provides better control over file expansion and reduces the risk of exponential growth that can quickly consume available disk space. You can target specific file types (data files, log files, or both) and specify custom growth values in KB, MB, GB, or TB units.

## Syntax

```powershell
Set-DbaDbFileGrowth
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-GrowthType] <String>]
    [[-Growth] <Int32>]
    [[-FileType] <String>]
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
PS C:\> Set-DbaDbFileGrowth -SqlInstance sql2016 -Database test  -GrowthType GB -Growth 1
```
{: data-copyable="true" data-clean-code="Set-DbaDbFileGrowth -SqlInstance sql2016 -Database test  -GrowthType GB -Growth 1" }

Sets the test database on sql2016 to a growth of 1GB<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database test | Set-DbaDbFileGrowth -GrowthType GB -Growth 1
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2016 -Database test | Set-DbaDbFileGrowth -GrowthType GB -Growth 1" }

Sets the test database on sql2016 to a growth of 1GB<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase | Set-DbaDbFileGrowth -SqlInstance sql2017, sql2016, sql2012
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase | Set-DbaDbFileGrowth -SqlInstance sql2017, sql2016, sql2012" }

Sets all database files on sql2017, sql2016, sql2012 to 64MB.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaDbFileGrowth -SqlInstance sql2017, sql2016, sql2012 -Database test -WhatIf
```
{: data-copyable="true" data-clean-code="Set-DbaDbFileGrowth -SqlInstance sql2017, sql2016, sql2012 -Database test -WhatIf" }

Shows what would happen if the command were executed<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaDbFileGrowth -SqlInstance sql2017 -Database test -GrowthType GB -Growth 1 -FileType Data
```
{: data-copyable="true" data-clean-code="Set-DbaDbFileGrowth -SqlInstance sql2017 -Database test -GrowthType GB -Growth 1 -FileType Data" }

Sets growth to 1GB for only data files for database test<br>

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

Specifies which databases to modify file growth settings for. Accepts an array of database names.  
Use this when you need to target specific databases rather than all databases on an instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -GrowthType

Specifies the unit of measurement for the growth increment. Valid values are KB, MB, GB, or TB.  
Choose the appropriate unit based on your database size and expected growth patterns - MB for smaller databases, GB for larger ones.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | MB |
| Accepted Values | KB,MB,GB,TB |

##### -Growth

Sets the numeric value for the fixed growth increment. Defaults to 64 when combined with the default MB unit.  
Use smaller values (16-64MB) for smaller databases or larger values (256MB-1GB) for high-growth production databases to balance performance and storage efficiency.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 64 |

##### -FileType

Controls which file types to modify - Data files only, Log files only, or All files (both data and log).  
Use 'Data' when you need different growth settings for data vs log files, or 'All' to standardize growth across all database files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | All |
| Accepted Values | All,Data,Log |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline operations.  
Use this when you need to filter databases first or when working with database objects from other dbatools functions.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
