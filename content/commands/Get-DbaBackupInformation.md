---
title: "Get-DbaBackupInformation"
slug: "Get-DbaBackupInformation"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl) | Stuart Moore (@napalmgram)"
availability: "Windows, Linux, macOS"
synopsis: "Scans backup files and reads their headers to create structured backup history objects for restore operations"
tags:
  - "DisasterRecovery"
  - "Backup"
  - "Restore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBackupInformation.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaBackupInformation"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaBackupInformation</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBackupInformation.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl) , Stuart Moore (@napalmgram)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Scans backup files and reads their headers to create structured backup history objects for restore operations

## Description

Reads the headers of SQL Server backup files to extract metadata and creates BackupHistory objects compatible with Restore-DbaDatabase. This eliminates the need to manually track backup chains and file locations when planning database restores.  
  
The function identifies valid SQL Server backup files from a given path, reads their headers using the SQL Server instance, and organizes them into backup sets. It handles full, differential, and log backups, automatically determining backup types, LSN chains, and file dependencies.  
  
By default, the function uses xp_dirtree to scan remote paths accessible to the SQL Server instance. This means paths must be accessible from the SQL Server service account. The -NoXpDirTree switch allows scanning local files instead.  
  
Special support is included for Ola Hallengren maintenance solution backup folder structures, which can significantly speed up scanning of organized backup directories.

## Syntax

```powershell
Get-DbaBackupInformation -Path <Object[]> -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    [-DatabaseName <String[]>]
    [-SourceInstance <String[]>]
    [-NoXpDirTree]
    [-NoXpDirRecurse]
    [-DirectoryRecurse]
    [-EnableException]
    [-MaintenanceSolution]
    [-IgnoreLogBackup]
    [-IgnoreDiffBackup]
    [-ExportPath <String>]
    [-AzureCredential <String>]
    [-Anonymise]
    [-NoClobber]
    [-PassThru]
    [<CommonParameters>]

Get-DbaBackupInformation -Path <Object[]>
    [-DatabaseName <String[]>]
    [-SourceInstance <String[]>]
    [-EnableException]
    [-MaintenanceSolution]
    [-IgnoreLogBackup]
    [-IgnoreDiffBackup]
    [-ExportPath <String>]
    [-AzureCredential <String>]
    [-Import]
    [-Anonymise]
    [-NoClobber]
    [-PassThru]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaBackupInformation -SqlInstance Server1 -Path c:\backups\ -DirectoryRecurse
```
{: data-copyable="true" data-clean-code="Get-DbaBackupInformation -SqlInstance Server1 -Path c:\backups\ -DirectoryRecurse" }

Will use the Server1 instance to recursively read all backup files under c:\backups, and return a dbatools BackupHistory object<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaBackupInformation -SqlInstance Server1 -Path c:\backups\ -DirectoryRecurse -ExportPath c:\store\BackupHistory.xml
PS C:\> robocopy c:\store\ \\remoteMachine\C$\store\ BackupHistory.xml
PS C:\> Get-DbaBackupInformation -Import -Path  c:\store\BackupHistory.xml | Restore-DbaDatabase -SqlInstance Server2 -TrustDbBackupHistory
```
{: data-copyable="true" data-clean-code="Get-DbaBackupInformation -SqlInstance Server1 -Path c:\backups\ -DirectoryRecurse -ExportPath c:\store\BackupHistory.xml
robocopy c:\store\ \\remoteMachine\C$\store\ BackupHistory.xml
Get-DbaBackupInformation -Import -Path  c:\store\BackupHistory.xml | Restore-DbaDatabase -SqlInstance Server2 -TrustDbBackupHistory" }

This example creates backup history output from server1 and copies the file to the remote machine in order to preserve backup history. It is then used to restore the databases onto server2.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaBackupInformation -SqlInstance Server1 -Path c:\backups\ -DirectoryRecurse -ExportPath C:\store\BackupHistory.xml -PassThru | Restore-DbaDatabase -SqlInstance Server2
```
{: data-copyable="true" data-clean-code="Get-DbaBackupInformation -SqlInstance Server1 -Path c:\backups\ -DirectoryRecurse -ExportPath C:\store\BackupHistory.xml -PassThru | Restore-DbaDatabase -SqlInstance Server2" }

-TrustDbBackupHistory<br>
In this example we gather backup information, export it to an xml file, and then pass it on through to Restore-DbaDatabase.<br>
This allows us to repeat the restore without having to scan all the backup files again<br>

#####  Example:  4 

```powershell
PS C:\> Get-ChildItem c:\backups\ -recurse -files | Where-Object {$_.extension -in ('.bak','.trn') -and $_.LastWriteTime -gt (get-date).AddMonths(-1)} | Get-DbaBackupInformation -SqlInstance Server1
```
{: data-copyable="true" data-clean-code="Get-ChildItem c:\backups\ -recurse -files | Where-Object {$_.extension -in ('.bak','.trn') -and $_.LastWriteTime -gt (get-date).AddMonths(-1)} | Get-DbaBackupInformation -SqlInstance Server1" }

-ExportPath C:\backupHistory.xml<br>
This lets you keep a record of all backup history from the last month on hand to speed up refreshes<br>

#####  Example:  5 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\network\backups
PS C:\> $Backups += Get-DbaBackupInformation -SqlInstance Server2 -NoXpDirTree -Path c:\backups
```
{: data-copyable="true" data-clean-code="$Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\network\backups
$Backups += Get-DbaBackupInformation -SqlInstance Server2 -NoXpDirTree -Path c:\backups" }

Scan the unc folder \\network\backups with Server1, and then scan the C:\backups folder on<br>
Server2 not using xp_dirtree, adding the results to the first set.<br>

#####  Example:  6 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\network\backups -MaintenanceSolution
```
{: data-copyable="true" data-clean-code="$Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\network\backups -MaintenanceSolution" }

When MaintenanceSolution is indicated we know we are dealing with the output from Ola Hallengren backup scripts. So we make sure that a FULL folder exists in the first level of Path, if not we <br>
shortcut scanning all the files as we have nothing to work with<br>

#####  Example:  7 

```powershell
PS C:\> $Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\network\backups -MaintenanceSolution -IgnoreLogBackup
```
{: data-copyable="true" data-clean-code="$Backups = Get-DbaBackupInformation -SqlInstance Server1 -Path \\network\backups -MaintenanceSolution -IgnoreLogBackup" }

As we know we are dealing with an Ola Hallengren style backup folder from the MaintenanceSolution switch, when IgnoreLogBackup is also included we can ignore the LOG folder to skip any scanning of <br>
log backups. Note this also means they WON'T be restored<br>

### Required Parameters

##### -Path

Path to SQL Server backup files.  
Paths passed in as strings will be scanned using the desired method, default is a non recursive folder scan  
Accepts multiple paths separated by ','  
Or it can consist of FileInfo objects, such as the output of Get-ChildItem or Get-Item. This allows you to work with  
your own file structures as needed

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -SqlInstance

The SQL Server instance to be used to read the headers of the backup files

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

##### -DatabaseName

An array of Database Names to filter by. If empty all databases are returned.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SourceInstance

If provided only backup originating from this destination will be returned. This SQL instance will not be connected to or involved in this work

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoXpDirTree

If specified, this switch will cause the files to be parsed as local files to the SQL Server Instance provided. Errors may be observed when the SQL Server Instance cannot access the files being   
parsed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoXpDirRecurse

If specified, this switch changes xp_dirtree behavior to not recurse the folder structure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DirectoryRecurse

If specified the provided path/directory will be traversed (only applies if not using XpDirTree)

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

##### -MaintenanceSolution

This switch tells the function that the folder is the root of a Ola Hallengren backup folder

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IgnoreLogBackup

This switch only works with the MaintenanceSolution switch. With an Ola Hallengren style backup we can be sure that the LOG folder contains only log backups and skip it.  
For all other scenarios we need to read the file headers to be sure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IgnoreDiffBackup

This switch only works with the MaintenanceSolution switch. With an Ola Hallengren style backup we can be sure that the DIFF folder contains only differential backups and skip it.  
For all other scenarios we need to read the file headers to be sure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExportPath

If specified the output will export via CliXml format to the specified file. This allows you to store the backup history object for later usage, or move it between computers

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AzureCredential

The name of the SQL Server credential to be used if restoring from an Azure hosted backup

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Import

When specified along with a path the command will import a previously exported BackupHistory object from an xml file.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Anonymise

If specified we will output the results with ComputerName, InstanceName, Database, UserName, Paths, and Logical and Physical Names hashed out  
This options is mainly for use if we need you to submit details for fault finding to the dbatools team

| Property | Value |
| --- | --- |
| Alias | Anonymize |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoClobber

If specified will stop Export from overwriting an existing file, the default is to overwrite

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PassThru

When data is exported the cmdlet will return no other output, this switch means it will also return the normal output which can be then piped into another command

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
