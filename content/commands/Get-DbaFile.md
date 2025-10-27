---
title: "Get-DbaFile"
slug: "Get-DbaFile"
date: 2024-01-01
layout: "single"
author: "Brandon Abshire, netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Enumerates files and directories on remote SQL Server instances using xp_dirtree"
tags:
  - "Storage"
  - "File"
  - "Path"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaFile"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaFile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Enumerates files and directories on remote SQL Server instances using xp_dirtree

## Description

Searches directories on SQL Server machines remotely without requiring direct file system access or RDP connections. Uses the xp_dirtree extended stored procedure to return file listings that can be filtered by extension and searched recursively to specified depths. Defaults to the instance's data directory but accepts additional paths for comprehensive file system exploration.  
  
Common use cases include locating orphaned database files, finding backup files for restores, auditing disk usage, and preparing for file migrations.  
  
You can filter by extension using the -FileType parameter. By default, the default data directory will be returned. You can provide and additional paths to search using the -Path parameter.  
  
Thanks to serg-52 for the query:  https://www.sqlservercentral.com/Forums/Topic1642213-391-1.aspx

## Syntax

```powershell
Get-DbaFile
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Path] <String[]>]
    [[-FileType] <String[]>]
    [[-Depth] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaFile -SqlInstance sqlserver2014a -Path E:\Dir1
```
{: data-copyable="true" data-clean-code="Get-DbaFile -SqlInstance sqlserver2014a -Path E:\Dir1" }

Logs into the SQL Server "sqlserver2014a" using Windows credentials and searches E:\Dir for all files<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaFile -SqlInstance sqlserver2014a -SqlCredential $cred -Path 'E:\sql files'
```
{: data-copyable="true" data-clean-code="Get-DbaFile -SqlInstance sqlserver2014a -SqlCredential $cred -Path 'E:\sql files'" }

Logs into the SQL Server "sqlserver2014a" using alternative credentials and returns all files in 'E:\sql files'<br>

#####  Example:  3 

```powershell
PS C:\> $all = Get-DbaDefaultPath -SqlInstance sql2014
PS C:\> Get-DbaFile -SqlInstance sql2014 -Path $all.Data, $all.Log, $all.Backup -Depth 3
```
{: data-copyable="true" data-clean-code="$all = Get-DbaDefaultPath -SqlInstance sql2014
Get-DbaFile -SqlInstance sql2014 -Path $all.Data, $all.Log, $all.Backup -Depth 3" }

Returns the files in the default data, log and backup directories on sql2014, 3 directories deep (recursively).<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaFile -SqlInstance sql2014 -Path 'E:\Dir1', 'E:\Dir2'
```
{: data-copyable="true" data-clean-code="Get-DbaFile -SqlInstance sql2014 -Path 'E:\Dir1', 'E:\Dir2'" }

Returns the files in "E:\Dir1" and "E:Dir2" on sql2014<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaFile -SqlInstance sql2014, sql2016 -Path 'E:\Dir1' -FileType fsf, mld
```
{: data-copyable="true" data-clean-code="Get-DbaFile -SqlInstance sql2014, sql2016 -Path 'E:\Dir1' -FileType fsf, mld" }

Finds files in E:\Dir1 ending with ".fsf" and ".mld" for both the servers sql2014 and sql2016.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Allows you to login to servers using alternative credentials

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies additional directory paths to search beyond the instance's default data directory. Accepts multiple paths as an array.  
Use this when you need to scan specific locations for orphaned files, backup locations, or custom database file directories.  
Defaults to the instance's data directory if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileType

Filters results to only show files with specific extensions. Pass extensions without the dot (e.g., 'mdf', 'ldf', 'bak').  
Use this to find specific database files like data files (mdf, ndf), log files (ldf), or backup files (bak, trn).  
Accepts multiple extensions to search for different file types simultaneously.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Depth

Controls how many subdirectory levels to search recursively. Default is 1 (current directory only).  
Increase this value when searching deep folder structures for scattered database files or backup archives.  
Higher values take more time but ensure comprehensive file discovery across complex directory trees.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |

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
