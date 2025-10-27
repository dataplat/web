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

# Set-DbaDbFileGrowth

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbFileGrowth](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbFileGrowth.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbFileGrowth](https://dataplat.github.io/boh#Set-DbaDbFileGrowth).

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

Sets the test database on sql2016 to a growth of 1GB<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database test | Set-DbaDbFileGrowth -GrowthType GB -Growth 1
```

Sets the test database on sql2016 to a growth of 1GB<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase | Set-DbaDbFileGrowth -SqlInstance sql2017, sql2016, sql2012
```

Sets all database files on sql2017, sql2016, sql2012 to 64MB.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaDbFileGrowth -SqlInstance sql2017, sql2016, sql2012 -Database test -WhatIf
```

Shows what would happen if the command were executed<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaDbFileGrowth -SqlInstance sql2017 -Database test -GrowthType GB -Growth 1 -FileType Data
```

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
