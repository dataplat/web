---
title: "Expand-DbaDbLogFile"
slug: "Expand-DbaDbLogFile"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva)"
availability: "Windows, Linux, macOS"
synopsis: "Grows transaction log files using calculated increment sizes to prevent excessive Virtual Log File (VLF) fragmentation."
tags:
  - "Storage"
  - "LogFile"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Expand-DbaDbLogFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Expand-DbaDbLogFile"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Expand-DbaDbLogFile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Expand-DbaDbLogFile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Claudio Silva (@ClaudioESSilva)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Grows transaction log files using calculated increment sizes to prevent excessive Virtual Log File (VLF) fragmentation.

## Description

This function intelligently grows transaction log files to target sizes while minimizing Virtual Log File (VLF) fragmentation. It calculates optimal increment sizes based on your SQL Server version and target log size, then grows the log in controlled chunks instead of letting autogrowth create excessive VLFs.  
  
Too many VLFs create serious performance problems: slow transaction log backups, delayed database recovery during startup, and in extreme cases, degraded insert/update/delete performance. This command helps you proactively size your log files or fix existing VLF fragmentation issues.  
  
References:  
http://www.sqlskills.com/blogs/kimberly/transaction-log-vlfs-too-many-or-too-few/  
http://blogs.msdn.com/b/saponsqlserver/archive/2012/02/22/too-many-virtual-log-files-vlfs-can-cause-slow-database-recovery.aspx  
http://www.brentozar.com/blitz/high-virtual-log-file-vlf-count/  
  
In order to get rid of this fragmentation we need to grow the file taking the following into consideration:  
- How many VLFs are created when we perform a grow operation or when an auto-grow is invoked?  
  
Note: In SQL Server 2014 this algorithm has changed (http://www.sqlskills.com/blogs/paul/important-change-vlf-creation-algorithm-sql-server-2014/)  
  
Attention:  
We are growing in MB instead of GB because of known issue prior to SQL 2012:  
More detail here:  
http://www.sqlskills.com/BLOGS/PAUL/post/Bug-log-file-growth-broken-for-multiples-of-4GB.aspx  
and  
http://connect.microsoft.com/SqlInstance/feedback/details/481594/log-growth-not-working-properly-with-specific-growth-sizes-vlfs-also-not-created-appropriately  
or  
https://connect.microsoft.com/SqlInstance/feedback/details/357502/transaction-log-file-size-will-not-grow-exactly-4gb-when-filegrowth-4gb  
  
Understanding related problems:  
http://www.sqlskills.com/blogs/kimberly/transaction-log-vlfs-too-many-or-too-few/  
http://blogs.msdn.com/b/saponsqlserver/archive/2012/02/22/too-many-virtual-log-files-vlfs-can-cause-slow-database-recovery.aspx  
http://www.brentozar.com/blitz/high-virtual-log-file-vlf-count/  
  
Known bug before SQL Server 2012  
http://www.sqlskills.com/BLOGS/PAUL/post/Bug-log-file-growth-broken-for-multiples-of-4GB.aspx  
http://connect.microsoft.com/SqlInstance/feedback/details/481594/log-growth-not-working-properly-with-specific-growth-sizes-vlfs-also-not-created-appropriately  
https://connect.microsoft.com/SqlInstance/feedback/details/357502/transaction-log-file-size-will-not-grow-exactly-4gb-when-filegrowth-4gb  
  
How it works?  
The transaction log will grow in chunks until it reaches the desired size.  
Example: If you have a log file with 8192MB and you say that the target size is 81920MB (80GB) it will grow in chunks of 8192MB until it reaches 81920MB. 8192 -> 16384 -> 24576 ... 73728 -> 81920

## Syntax

```powershell
Expand-DbaDbLogFile
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-Database <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-TargetLogSize] <Int32>
    [[-IncrementSize] <Int32>]
    [[-LogFileId] <Int32>]
    [-ExcludeDiskSpaceValidation]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Expand-DbaDbLogFile
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-Database <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-TargetLogSize] <Int32>
    [[-IncrementSize] <Int32>]
    [[-LogFileId] <Int32>]
    [-ShrinkLogFile]
    [-ShrinkSize] <Int32>
    [[-BackupDirectory] <String>]
    [-ExcludeDiskSpaceValidation]
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
PS C:\> Expand-DbaDbLogFile -SqlInstance sqlcluster -Database db1 -TargetLogSize 50000
```
{: data-copyable="true" data-clean-code="Expand-DbaDbLogFile -SqlInstance sqlcluster -Database db1 -TargetLogSize 50000" }

Grows the transaction log for database db1 on sqlcluster to 50000 MB and calculates the increment size.<br>

#####  Example:  2 

```powershell
PS C:\> Expand-DbaDbLogFile -SqlInstance sqlcluster -Database db1, db2 -TargetLogSize 10000 -IncrementSize 200
```
{: data-copyable="true" data-clean-code="Expand-DbaDbLogFile -SqlInstance sqlcluster -Database db1, db2 -TargetLogSize 10000 -IncrementSize 200" }

Grows the transaction logs for databases db1 and db2 on sqlcluster to 1000MB and sets the growth increment to 200MB.<br>

#####  Example:  3 

```powershell
PS C:\> Expand-DbaDbLogFile -SqlInstance sqlcluster -Database db1 -TargetLogSize 10000 -LogFileId 9
```
{: data-copyable="true" data-clean-code="Expand-DbaDbLogFile -SqlInstance sqlcluster -Database db1 -TargetLogSize 10000 -LogFileId 9" }

Grows the transaction log file  with FileId 9 of the db1 database on sqlcluster instance to 10000MB.<br>

#####  Example:  4 

```powershell
PS C:\> Expand-DbaDbLogFile -SqlInstance sqlcluster -Database (Get-Content D:\DBs.txt) -TargetLogSize 50000
```
{: data-copyable="true" data-clean-code="Expand-DbaDbLogFile -SqlInstance sqlcluster -Database (Get-Content D:\DBs.txt) -TargetLogSize 50000" }

Grows the transaction log of the databases specified in the file 'D:\DBs.txt' on sqlcluster instance to 50000MB.<br>

#####  Example:  5 

```powershell
PS C:\> Expand-DbaDbLogFile -SqlInstance SqlInstance -Database db1,db2 -TargetLogSize 100 -IncrementSize 10 -ShrinkLogFile -ShrinkSize 10 -BackupDirectory R:\MSSQL\Backup
```
{: data-copyable="true" data-clean-code="Expand-DbaDbLogFile -SqlInstance SqlInstance -Database db1,db2 -TargetLogSize 100 -IncrementSize 10 -ShrinkLogFile -ShrinkSize 10 -BackupDirectory R:\MSSQL\Backup" }

Grows the transaction logs for databases db1 and db2 on SQL server SQLInstance to 100MB, sets the incremental growth to 10MB, shrinks the transaction log to 10MB and uses the directory <br>
R:\MSSQL\Backup for the required backups.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -TargetLogSize

Sets the final size you want the transaction log to reach, specified in megabytes.  
This should be large enough to handle your typical transaction volume plus growth buffer. Common values range from 1GB (1024MB) for smaller databases to 10GB+ for high-transaction systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | 0 |

##### -ShrinkLogFile

Shrinks the transaction log to the ShrinkSize before expanding it to the target size.  
This removes excessive VLF fragmentation by first reducing the log, then growing it with optimal increment sizes. Requires transaction log backups and cannot be used with Simple recovery model   
databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | False |

##### -ShrinkSize

Sets the intermediate size in megabytes to shrink the log file to before re-expanding.  
This should be small enough to remove VLF fragmentation but large enough to handle active transactions. Typical values are 10-100MB depending on transaction activity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | 0 |

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

##### -Database

Specifies which databases to expand transaction log files for. Accepts wildcards for pattern matching.  
If not specified, all accessible databases on the instance will be processed. Use this when you need to target specific databases instead of processing the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the expansion process when processing all databases on an instance.  
Use this to exclude system databases, read-only databases, or databases with specific requirements from batch log file expansion operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncrementSize

Controls the size of each growth operation in megabytes during the expansion process.  
If not specified, the function calculates an optimal increment size based on your target size and SQL Server version to minimize VLF fragmentation. Only specify this if you need to override the   
intelligent defaults.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | -1 |

##### -LogFileId

Targets a specific transaction log file by its file ID number when databases have multiple log files.  
Use this when you need to expand secondary log files instead of the primary log file. Get the file ID from sys.database_files or SSMS properties.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | -1 |

##### -BackupDirectory

Sets the directory path where transaction log backups will be created during the shrink process.  
Transaction log backups are required to shrink log files, so this directory must be accessible to the SQL Server service account. Defaults to the instance's default backup directory if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDiskSpaceValidation

Skips the automatic disk space validation that normally ensures sufficient free space exists before expanding log files.  
Use this when you're confident about available disk space but PowerShell remoting isn't available to check drive capacity, or when working with network storage that may not report correctly.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
