---
title: "Update-DbaBuildReference"
slug: "Update-DbaBuildReference"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold) | Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Downloads the latest SQL Server build reference database used for patch compliance and version tracking"
tags:
  - "Utility"
  - "SqlBuild"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Update-DbaBuildReference.ps1"
bohUrl: "https://dataplat.github.io/boh#Update-DbaBuildReference"
draft: false
---

# Update-DbaBuildReference

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto (@niphold) , Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Update-DbaBuildReference](https://github.com/dataplat/dbatools/blob/master/public/Update-DbaBuildReference.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Update-DbaBuildReference](https://dataplat.github.io/boh#Update-DbaBuildReference).

## Synopsis

Downloads the latest SQL Server build reference database used for patch compliance and version tracking

## Description

Refreshes the comprehensive SQL Server build reference database that powers Get-DbaBuild and Test-DbaBuild functions with current patch level information. This database contains detailed mappings between build numbers, service packs, cumulative updates, KB articles, release dates, and support lifecycle dates for all SQL Server versions.  
  
DBAs use this to maintain accurate patch compliance reporting and identify outdated installations that need security updates. The function downloads the latest reference data from the dbatools project repository, ensuring you have current information about newly released patches and updated support timelines.  
  
The reference file is stored locally and automatically updated from newer module versions, but this command ensures you get the very latest patch data between dbatools releases. You can also specify a local file path instead of downloading, useful for air-gapped environments.  
  
Use Get-DbatoolsConfigValue -Name 'assets.sqlbuildreference' to see the current download URL.

## Syntax

```powershell
Update-DbaBuildReference
    [[-LocalFile] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Update-DbaBuildReference
```

Looks online if there is a newer version of the build reference<br>

#####  Example:  2 

```powershell
PS C:\> Update-DbaBuildReference -LocalFile \\fileserver\Software\dbatools\dbatools-buildref-index.json
```

Uses the given file instead of downloading the file to update the build reference<br>

### Optional Parameters

##### -LocalFile

Specifies the path to a local JSON build reference file to use instead of downloading from the internet.  
Use this in air-gapped environments or when you need to use a specific version of the build reference data.  
The file must be the dbatools-buildref-index.json format containing SQL Server build mappings and patch information.

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
