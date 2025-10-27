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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Update-DbaBuildReference</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Update-DbaBuildReference.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Simone Bizzotto (@niphold) , Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Update-DbaBuildReference" }

Looks online if there is a newer version of the build reference<br>

#####  Example:  2 

```powershell
PS C:\> Update-DbaBuildReference -LocalFile \\fileserver\Software\dbatools\dbatools-buildref-index.json
```
{: data-copyable="true" data-clean-code="Update-DbaBuildReference -LocalFile \\fileserver\Software\dbatools\dbatools-buildref-index.json" }

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
