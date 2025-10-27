---
title: "Move-DbaDbFile"
slug: "Move-DbaDbFile"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@claudioessilva), claudioeesilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Relocates database files to different drives or folders while maintaining database integrity."
tags:
  - "Database"
  - "Move"
  - "File"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Move-DbaDbFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Move-DbaDbFile"
draft: false
---

# Move-DbaDbFile

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@claudioessilva), claudioeesilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Move-DbaDbFile](https://github.com/dataplat/dbatools/blob/master/public/Move-DbaDbFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Move-DbaDbFile](https://dataplat.github.io/boh#Move-DbaDbFile).

## Synopsis

Relocates database files to different drives or folders while maintaining database integrity.

## Description

Relocates database data and log files to new locations on the same SQL Server instance. The function takes the database offline, copies files to the new location, updates the database metadata with ALTER DATABASE commands, and brings the database back online.  
  
This is typically used when you need to move databases to faster storage, free up disk space, or reorganize your file layout without restoring from backup. The function handles both local and remote SQL Server instances, preserves file permissions, and optionally removes the original files after successful moves.

## Syntax

```powershell
Move-DbaDbFile -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    -Database <String>
    [-FileType <String>]
    [-FileDestination <String>]
    [-DeleteAfterMove]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Move-DbaDbFile -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    -Database <String>
    [-FileToMove <Hashtable>]
    [-DeleteAfterMove]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Move-DbaDbFile -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    -Database <String>
    [-FileStructureOnly]
    [-Force]
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
PS C:\> Move-DbaDbFile -SqlInstance sql2017 -Database dbatools -FileType Data -FileDestination D:\DATA2
```

Copy all data files of dbatools database on sql2017 instance to the "D:\DATA2" path.<br>
Before it puts database offline and after copy each file will update database metadata and it ends by set the database back online<br>

#####  Example:  2 

```powershell
PS C:\> $fileToMove=@{
>> 'dbatools'='D:\DATA3'
>> 'dbatools_log'='D:\LOG2'
>> }
PS C:\> Move-DbaDbFile -SqlInstance sql2019 -Database dbatools -FileToMove $fileToMove
```

Declares a hashtable that says for each logical file the new path.<br>
Copy each dbatools database file referenced on the hashtable on the sql2019 instance from the current location to the new mentioned location (D:\DATA3 and D:\LOG2 paths).<br>
Before it puts database offline and after copy each file will update database metadata and it ends by set the database back online<br>

#####  Example:  3 

```powershell
PS C:\> Move-DbaDbFile -SqlInstance sql2017 -Database dbatools -FileStructureOnly
```

Shows the current database file structure (without filenames). Example: 'dbatools'='D:\Data'<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Database

Specifies the user database whose files will be relocated to new paths.  
System databases (master, model, msdb, tempdb) are not supported for safety reasons.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -FileType

Specifies which file types to relocate: Data, Log, or Both (default).  
Use this with FileDestination when you want to move all files of a specific type to the same directory.  
Cannot be combined with FileToMove parameter as they serve different movement strategies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Data,Log,Both |

##### -FileDestination

Sets the target directory where all selected database files will be moved.  
Used with FileType parameter to move all data files, log files, or both to a single location.  
Must be accessible to the SQL Server service account and have sufficient space for the files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileToMove

Defines specific file movements using a hashtable where keys are logical file names and values are destination directory paths.  
Use this when you need granular control over where each file goes, like separating data and log files to different drives.  
Example: @{'MyDB_Data'='E:\Data'; 'MyDB_Log'='F:\Logs'}

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DeleteAfterMove

Removes the original database files from their source location after successful relocation.  
Use this to free up disk space on the source drive once files are confirmed copied and database metadata updated.  
Files are only deleted after successful copy and database metadata update to prevent data loss.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FileStructureOnly

Returns the current file structure as a hashtable template without performing any file operations.  
Use this to discover logical file names and current paths, then modify the output for use with FileToMove.  
Helpful for planning complex moves or scripting multiple database relocations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Forces the database offline using WITH ROLLBACK IMMEDIATE, terminating active transactions and connections.  
Use this when the database has active connections that would prevent it from going offline gracefully.  
Without this switch, the operation may fail if users are connected to the database.

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
