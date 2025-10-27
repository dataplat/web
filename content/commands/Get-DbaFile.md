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

# Get-DbaFile

| Property | Value |
| --- | --- |
| **Author** | Brandon Abshire, netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaFile](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaFile](https://dataplat.github.io/boh#Get-DbaFile).

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

Logs into the SQL Server "sqlserver2014a" using Windows credentials and searches E:\Dir for all files<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaFile -SqlInstance sqlserver2014a -SqlCredential $cred -Path 'E:\sql files'
```

Logs into the SQL Server "sqlserver2014a" using alternative credentials and returns all files in 'E:\sql files'<br>

#####  Example:  3 

```powershell
PS C:\> $all = Get-DbaDefaultPath -SqlInstance sql2014
PS C:\> Get-DbaFile -SqlInstance sql2014 -Path $all.Data, $all.Log, $all.Backup -Depth 3
```

Returns the files in the default data, log and backup directories on sql2014, 3 directories deep (recursively).<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaFile -SqlInstance sql2014 -Path 'E:\Dir1', 'E:\Dir2'
```

Returns the files in "E:\Dir1" and "E:Dir2" on sql2014<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaFile -SqlInstance sql2014, sql2016 -Path 'E:\Dir1' -FileType fsf, mld
```

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
