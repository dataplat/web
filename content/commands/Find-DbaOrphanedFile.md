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

# Find-DbaOrphanedFile

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaOrphanedFile](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaOrphanedFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaOrphanedFile](https://dataplat.github.io/boh#Find-DbaOrphanedFile).

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

Connects to sqlserver2014a, authenticating with Windows credentials, and searches for orphaned files. Returns server name, local filename, and unc path to file.<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sqlserver2014a -SqlCredential $cred
```

Connects to sqlserver2014a, authenticating with SQL Server authentication, and searches for orphaned files. Returns server name, local filename, and unc path to file.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014 -Path 'E:\Dir1', 'E:\Dir2'
```

Finds the orphaned files in "E:\Dir1" and "E:Dir2" in addition to the default directories.<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014 -Path 'E:\Dir1' -Recurse
```

Finds the orphaned files in "E:\Dir1" and any of its subdirectories in addition to the default directories.<br>

#####  Example:  5 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014 -LocalOnly
```

Returns only the local file paths for orphaned files.<br>

#####  Example:  6 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014 -RemoteOnly
```

Returns only the remote file path for orphaned files.<br>

#####  Example:  7 

```powershell
PS C:\> Find-DbaOrphanedFile -SqlInstance sql2014, sql2016 -FileType fsf, mld
```

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
