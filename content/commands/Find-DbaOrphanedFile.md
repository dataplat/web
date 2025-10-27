---
title: "Find-DbaOrphanedFile"
slug: "Find-DbaOrphanedFile"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Identifies database files on disk that are not attached to any SQL Server database instance"
tags:
  - "Orphan"
  - "Database"
  - "DatabaseFile"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaOrphanedFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaOrphanedFile"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaOrphanedFile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaOrphanedFile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad), sqlstad.nl</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Identifies database files on disk that are not attached to any SQL Server database instance

## Description

Scans filesystem directories for database files (.mdf, .ldf, .ndf) that exist on disk but are not currently attached to the SQL Server instance. This is essential for cleanup operations after database drops, detaches, or failed restores that leave behind orphaned files consuming disk space.  
  
The command compares files found via xp_dirtree against sys.master_files to identify true orphans. By default, it searches the root\data directory, default data and log paths, system paths, and any directory currently used by attached databases.  
  
Perfect for storage cleanup scenarios where you need to reclaim disk space by identifying leftover database files that can be safely removed. You can specify additional file types using -FileType and additional search paths using -Path parameter.

## Syntax

```powershell
Find-DbaOrphanedFile -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Path <String[]>]
    [-FileType <String[]>]
    [-LocalOnly]
    [-EnableException]
    [-Recurse]
    [<CommonParameters>]

Find-DbaOrphanedFile -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Path <String[]>]
    [-FileType <String[]>]
    [-RemoteOnly]
    [-EnableException]
    [-Recurse]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sqlserver2014a
```
{: data-copyable="true" data-clean-code="Find-DbaOrphanedFile -SqlInstance sqlserver2014a" }

Connects to sqlserver2014a, authenticating with Windows credentials, and searches for orphaned files. Returns server name, local filename, and unc path to file.<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sqlserver2014a -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Find-DbaOrphanedFile -SqlInstance sqlserver2014a -SqlCredential $cred" }

Connects to sqlserver2014a, authenticating with SQL Server authentication, and searches for orphaned files. Returns server name, local filename, and unc path to file.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014 -Path 'E:\Dir1', 'E:\Dir2'
```
{: data-copyable="true" data-clean-code="Find-DbaOrphanedFile -SqlInstance sql2014 -Path 'E:\Dir1', 'E:\Dir2'" }

Finds the orphaned files in "E:\Dir1" and "E:Dir2" in addition to the default directories.<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014 -Path 'E:\Dir1' -Recurse
```
{: data-copyable="true" data-clean-code="Find-DbaOrphanedFile -SqlInstance sql2014 -Path 'E:\Dir1' -Recurse" }

Finds the orphaned files in "E:\Dir1" and any of its subdirectories in addition to the default directories.<br>

#####  Example:  5 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014 -LocalOnly
```
{: data-copyable="true" data-clean-code="Find-DbaOrphanedFile -SqlInstance sql2014 -LocalOnly" }

Returns only the local file paths for orphaned files.<br>

#####  Example:  6 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014 -RemoteOnly
```
{: data-copyable="true" data-clean-code="Find-DbaOrphanedFile -SqlInstance sql2014 -RemoteOnly" }

Returns only the remote file path for orphaned files.<br>

#####  Example:  7 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014, sql2016 -FileType fsf, mld
```
{: data-copyable="true" data-clean-code="Find-DbaOrphanedFile -SqlInstance sql2014, sql2016 -FileType fsf, mld" }

Finds the orphaned ending with ".fsf" and ".mld" in addition to the default filetypes ".mdf", ".ldf", ".ndf" for both the servers sql2014 and sql2016.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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

##### -Path

Specifies additional directories to search beyond the default SQL Server data and log paths. Use this when databases were stored in non-standard locations or when you suspect orphaned files exist in   
custom backup/restore directories. Accepts multiple paths and searches them alongside the automatically detected SQL Server directories.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileType

Specifies additional file extensions to search for beyond the default database file types (mdf, ldf, ndf). Use this to find orphaned Full-Text catalog files (ftcat), backup files (bak, trn), or other   
SQL Server-related files. Do not include the dot when specifying extensions (use "bak" not ".bak").

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LocalOnly

Returns only the local file paths without server or UNC information. Use this when you need simple file paths for scripting file removal operations or when working with a single server. Not   
recommended for multi-server environments since it omits which server the file belongs to.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RemoteOnly

Returns only the UNC network paths to orphaned files. Use this when you need to access files remotely for cleanup operations or when building scripts that run from a central management server.   
Provides the \\server\share\path format needed for remote file operations.

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

##### -Recurse

Searches all subdirectories within the specified paths in addition to the root directories. Use this when database files may be organized in nested folder structures or when conducting comprehensive   
cleanup of complex directory hierarchies. Without this switch, only the immediate directories are searched.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
