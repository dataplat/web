---
title: "New-DbaDatabase"
slug: "New-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Matthew Darwin (@evoDBA, naturalselectiondba.wordpress.com)  | Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Creates new SQL Server databases with customizable file layout and growth settings"
tags:
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDatabase"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDatabase</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDatabase.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Matthew Darwin (@evoDBA, naturalselectiondba.wordpress.com)  , Chrissy LeMaire (@cl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates new SQL Server databases with customizable file layout and growth settings

## Description

Creates new databases on SQL Server instances with full control over file placement, sizing, and growth settings. Rather than using T-SQL CREATE DATABASE statements manually, this function provides a structured approach to database creation with built-in best practices.  
  
The function automatically configures growth settings to use fixed MB increments instead of percentage-based growth, which prevents runaway autogrowth issues in production environments. When specific file sizes aren't provided, it inherits sensible defaults from the model database to ensure new databases start with appropriate baseline configurations.  
  
Supports creating databases with secondary filegroups and multiple data files for performance optimization, making it useful for both simple development databases and complex production systems that require specific file layouts for optimal I/O distribution.

## Syntax

```powershell
New-DbaDatabase
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-Collation] <String>]
    [[-RecoveryModel] <String>]
    [[-Owner] <String>]
    [[-DataFilePath] <String>]
    [[-LogFilePath] <String>]
    [[-PrimaryFilesize] <Int32>]
    [[-PrimaryFileGrowth] <Int32>]
    [[-PrimaryFileMaxSize] <Int32>]
    [[-LogSize] <Int32>]
    [[-LogGrowth] <Int32>]
    [[-LogMaxSize] <Int32>]
    [[-SecondaryFilesize] <Int32>]
    [[-SecondaryFileGrowth] <Int32>]
    [[-SecondaryFileMaxSize] <Int32>]
    [[-SecondaryFileCount] <Int32>]
    [[-DefaultFileGroup] <String>]
    [[-DataFileSuffix] <String>]
    [[-LogFileSuffix] <String>]
    [[-SecondaryDataFileSuffix] <String>]
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
PS C:\> New-DbaDatabase -SqlInstance sql1
```
{: data-copyable="true" data-clean-code="New-DbaDatabase -SqlInstance sql1" }

Creates a randomly named database (random-N) on instance sql1<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDatabase -SqlInstance sql1 -Name dbatools, dbachecks
```
{: data-copyable="true" data-clean-code="New-DbaDatabase -SqlInstance sql1 -Name dbatools, dbachecks" }

Creates a database named dbatools and a database named dbachecks on sql1<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDatabase -SqlInstance sql1, sql2, sql3 -Name multidb, multidb2 -SecondaryFilesize 20 -SecondaryFileGrowth 20 -LogSize 20 -LogGrowth 20
```
{: data-copyable="true" data-clean-code="New-DbaDatabase -SqlInstance sql1, sql2, sql3 -Name multidb, multidb2 -SecondaryFilesize 20 -SecondaryFileGrowth 20 -LogSize 20 -LogGrowth 20" }

Creates two databases, multidb and multidb2, on 3 instances (sql1, sql2 and sql3) and sets the secondary data file size to 20MB, the file growth to 20MB and the log growth to 20MB for each<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaDatabase -SqlInstance sql1 -Name nondefault -DataFilePath M:\Data -LogFilePath 'L:\Logs with spaces' -SecondaryFileCount 2
```
{: data-copyable="true" data-clean-code="New-DbaDatabase -SqlInstance sql1 -Name nondefault -DataFilePath M:\Data -LogFilePath 'L:\Logs with spaces' -SecondaryFileCount 2" }

Creates a database named nondefault and places data files in in the M:\data directory and log files in "L:\Logs with spaces".<br>
Creates a secondary group with 2 files in the Secondary filegroup.<br>

#####  Example:  5 

```powershell
PS C:\> $databaseParams = @{
>> SqlInstance             = "sql1"
>> Name                    = "newDb"
>> LogSize                 = 32
>> LogMaxSize              = 512
>> PrimaryFilesize         = 64
>> PrimaryFileMaxSize      = 512
>> SecondaryFilesize       = 64
>> SecondaryFileMaxSize    = 512
>> LogGrowth               = 32
>> PrimaryFileGrowth       = 64
>> SecondaryFileGrowth     = 64
>> DataFileSuffix          = "_PRIMARY"
>> LogFileSuffix           = "_Log"
>> SecondaryDataFileSuffix = "_MainData"
>> }
>> New-DbaDatabase @databaseParams
```
{: data-copyable="true" data-clean-code="$databaseParams = @{
SqlInstance             = &quot;sql1&quot;
Name                    = &quot;newDb&quot;
LogSize                 = 32
LogMaxSize              = 512
PrimaryFilesize         = 64
PrimaryFileMaxSize      = 512
SecondaryFilesize       = 64
SecondaryFileMaxSize    = 512
LogGrowth               = 32
PrimaryFileGrowth       = 64
SecondaryFileGrowth     = 64
DataFileSuffix          = &quot;_PRIMARY&quot;
LogFileSuffix           = &quot;_Log&quot;
SecondaryDataFileSuffix = &quot;_MainData&quot;
}
New-DbaDatabase @databaseParams" }

Creates a new database named newDb on the sql1 instance and sets the file sizes, max sizes, and growth as specified. The resulting filenames will take the form:<br>
newDb_PRIMARY<br>
newDb_Log<br>
newDb_MainData_1  (Secondary filegroup files)<br>

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

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Specifies the name of the database(s) to create on the SQL Server instance. Accepts multiple database names as an array to create several databases in a single operation. If not provided, creates a   
database with a randomly generated name like "random-12345".

| Property | Value |
| --- | --- |
| Alias | Database |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Collation

Specifies the collation for the new database, which determines sorting rules, case sensitivity, and accent sensitivity for string data. Use this when creating databases that need specific language or   
cultural sorting requirements different from the server default. If not specified, inherits the server's default collation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RecoveryModel

Sets the recovery model which determines how transaction log backups work and how much data loss is acceptable. Simple recovery model doesn't require log backups but limits point-in-time recovery,   
Full enables complete point-in-time recovery with log backups, BulkLogged offers a compromise for bulk operations. If not specified, inherits from the model database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Simple,Full,BulkLogged |

##### -Owner

Specifies which SQL Server login will be assigned as the database owner (dbo). Use this to assign ownership to a specific service account or administrator instead of the default creator. The login   
must already exist on the SQL Server instance. If not specified, the connecting user becomes the database owner.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DataFilePath

Specifies the directory path where database data files (.mdf and .ndf) will be created. Use this when you need to place database files on specific drives for performance or storage management. If not   
specified, uses the SQL Server instance's default data directory. The function will create the directory if it doesn't exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LogFilePath

Specifies the directory path where transaction log files (.ldf) will be created. Best practice is to place log files on separate drives from data files for performance and availability. If not   
specified, uses the SQL Server instance's default log directory. The function will create the directory if it doesn't exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PrimaryFilesize

Sets the initial size in MB for the primary data file (.mdf). Use this to create databases with appropriate initial sizing based on expected data volume to reduce autogrowth events. If the specified   
size is smaller than the model database's primary file, the model size is used instead to maintain minimum requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -PrimaryFileGrowth

Specifies the autogrowth increment in MB for the primary data file when it needs more space. Using fixed MB increments prevents runaway percentage-based growth that can cause performance issues and   
disk space problems in production environments. If not specified, inherits the model database's growth settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -PrimaryFileMaxSize

Sets the maximum size limit in MB that the primary data file can grow to during autogrowth events. Use this to prevent database files from consuming all available disk space in case of runaway   
processes or data imports. If set smaller than the initial file size, the initial size becomes the maximum.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -LogSize

Sets the initial size in MB for the transaction log file (.ldf). Proper log sizing prevents frequent autogrowth during normal operations which can impact performance. Size the log based on your   
transaction volume and backup frequency - larger logs for high-activity databases or infrequent log backups. If not specified, uses the model database's log size.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -LogGrowth

Specifies the autogrowth increment in MB for the transaction log file when additional space is needed. Fixed MB growth prevents percentage-based growth that can cause performance delays during   
high-activity periods. Consider setting this to handle your typical transaction volume between log backups. If not specified, uses the model database's growth settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -LogMaxSize

Sets the maximum size limit in MB for the transaction log file during autogrowth. This prevents transaction logs from consuming all disk space during bulk operations or when log backups are delayed.   
Consider your available disk space and typical maintenance windows when setting this limit. If set smaller than the initial log size, the initial size becomes the maximum.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SecondaryFilesize

Sets the initial size in MB for each file in the secondary filegroup. All secondary files will be created with this same size. Use this to establish consistent file sizes across the filegroup for   
balanced I/O distribution. If not specified and secondary files are created, uses the model database's file size.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SecondaryFileGrowth

Specifies the autogrowth increment in MB for each secondary data file when additional space is needed. All secondary files will use the same growth increment to maintain balanced file sizes. Set to 0   
to disable autogrowth for controlled file management. Fixed MB increments provide predictable growth behavior.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SecondaryFileMaxSize

Sets the maximum size limit in MB for each secondary data file during autogrowth. This prevents individual files from consuming excessive disk space while allowing controlled growth. All secondary   
files will use this same maximum size limit to maintain consistency across the filegroup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SecondaryFileCount

Specifies how many data files to create in the secondary filegroup. Multiple files allow parallel I/O operations which can improve performance for large databases with high activity. Consider your   
storage configuration and available CPU cores when determining the file count - typically one file per CPU core up to the number of available drives.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -DefaultFileGroup

Specifies which filegroup becomes the default for new tables and indexes when no filegroup is explicitly specified. Primary uses the standard PRIMARY filegroup, Secondary uses the created secondary   
filegroup. Setting the secondary filegroup as default directs new objects to use the optimized multi-file configuration for better performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Primary,Secondary |

##### -DataFileSuffix

Specifies a custom suffix to append to the primary data file name. The full filename becomes DatabaseName + DataFileSuffix + .mdf. Use this to follow organizational naming conventions or to   
differentiate between environments (like "_PROD" or "_DEV"). If not specified, no suffix is added.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LogFileSuffix

Specifies the suffix to append to the transaction log file name. The full filename becomes DatabaseName + LogFileSuffix + .ldf. Use this to follow naming conventions that distinguish log files from   
data files. Defaults to "_log" if not specified, creating files like "MyDatabase_log.ldf".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | _log |

##### -SecondaryDataFileSuffix

Specifies the suffix used for the secondary filegroup name and its data files. The filegroup becomes DatabaseName + SecondaryDataFileSuffix, and files are named like DatabaseName +   
SecondaryDataFileSuffix + "_1.ndf". Use descriptive suffixes like "_Data" or "_Indexes" to indicate the intended use of the secondary filegroup.

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
