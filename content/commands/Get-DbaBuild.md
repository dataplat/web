---
title: "Get-DbaBuild"
slug: "Get-DbaBuild"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold) | Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed SQL Server build information including service pack, cumulative update, KB articles, and support lifecycle dates"
tags:
  - "SqlBuild"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBuild.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaBuild"
draft: false
---

# Get-DbaBuild

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto (@niphold) , Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaBuild](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBuild.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaBuild](https://dataplat.github.io/boh#Get-DbaBuild).

## Synopsis

Retrieves detailed SQL Server build information including service pack, cumulative update, KB articles, and support lifecycle dates

## Description

Identifies the specific build version of SQL Server instances and translates build numbers into meaningful patch levels with their corresponding KB articles.  
This function helps DBAs quickly determine what service packs and cumulative updates are installed, whether builds have been retired by Microsoft, and when support ends.  
You can query live SQL Server instances, look up specific build numbers, search by KB article numbers, or find builds by specifying major version with service pack and cumulative update combinations.  
The function maintains an offline reference index that can be updated online to ensure current patch information and accurate support lifecycle dates.

## Syntax

```powershell
Get-DbaBuild
    [[-Build] <Version[]>]
    [[-Kb] <String[]>]
    [[-MajorVersion] <String>]
    [[-ServicePack] <String>]
    [[-CumulativeUpdate] <String>]
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [-Update]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaBuild -Build "12.00.4502"
```

Returns information about a build identified by  "12.00.4502" (which is SQL 2014 with SP1 and CU11)<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaBuild -Build "12.00.4502" -Update
```

Returns information about a build trying to fetch the most up to date index online. When the online version is newer, the local one gets overwritten<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaBuild -Build "12.0.4502","10.50.4260"
```

Returns information builds identified by these versions strings<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a | Get-DbaBuild
```

Integrate with other cmdlets to have builds checked for all your registered servers on sqlserver2014a<br>

### Optional Parameters

##### -Build

Specifies SQL Server build numbers to look up without connecting to live instances. Accepts version strings like "12.00.4502" or "13.0.5026".  
Use this when you need to identify what service pack and cumulative update a specific build number represents, or to verify patch levels from installation logs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Kb

Looks up SQL Server build information using Knowledge Base article numbers. Accepts formats like "KB4057119" or just "4057119".  
Use this when you have a KB number from Microsoft documentation or patch notes and need to identify the corresponding SQL Server build version and patch level.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MajorVersion

Specifies the SQL Server major version to look up build information for specific version and patch level combinations. Accepts formats like "SQL2016", "2016", or "2008R2".  
Use this with -ServicePack and -CumulativeUpdate parameters when you need to find the exact build number for a specific SQL Server version and patch level combination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServicePack

Specifies the service pack level when looking up builds by major version. Accepts formats like "SP1", "1", or "RTM" for initial release. Defaults to "RTM".  
Requires the -MajorVersion parameter and can be combined with -CumulativeUpdate to pinpoint exact patch levels.

| Property | Value |
| --- | --- |
| Alias | SP |
| Required | False |
| Pipeline | false |
| Default Value | RTM |

##### -CumulativeUpdate

Specifies the cumulative update level when looking up builds by major version and service pack. Accepts formats like "CU5", "5", or "CU0" for base service pack.  
Requires the -MajorVersion parameter and works in combination with -ServicePack to identify exact patch levels within a service pack.

| Property | Value |
| --- | --- |
| Alias | CU |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlInstance

Target any number of instances, in order to return their build state.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -Update

Forces an online refresh of the local SQL Server build reference index from Microsoft sources. Updates the cached build database with the latest patch information and support lifecycle dates.  
Use this when the function warns about stale index data or when you need the most current patch and support information for accurate compliance reporting.

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


&nbsp;
