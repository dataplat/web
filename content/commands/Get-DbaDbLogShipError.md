---
title: "Get-DbaDbLogShipError"
slug: "Get-DbaDbLogShipError"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves log shipping error details from msdb to troubleshoot failed backup, copy, and restore operations"
tags:
  - "LogShipping"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbLogShipError.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbLogShipError"
draft: false
---

# Get-DbaDbLogShipError

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbLogShipError](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbLogShipError.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbLogShipError](https://dataplat.github.io/boh#Get-DbaDbLogShipError).

## Synopsis

Retrieves log shipping error details from msdb to troubleshoot failed backup, copy, and restore operations

## Description

Queries the log shipping monitor error detail table in msdb to return comprehensive error information when log shipping operations fail.  
Identifies which specific action failed (backup on primary, copy, or restore on secondary) along with session details and error messages.  
Saves time by consolidating error details from both primary and secondary instances into a single view, so you don't have to manually query multiple system tables.  
Essential for troubleshooting log shipping failures and determining whether issues occurred during backup, file copy, or database restore phases.

## Syntax

```powershell
Get-DbaDbLogShipError
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Action] <String[]>]
    [[-DateTimeFrom] <DateTime>]
    [[-DateTimeTo] <DateTime>]
    [-Primary]
    [-Secondary]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbLogShipError -SqlInstance sql1
```

Get all the log shipping errors that occurred<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbLogShipError -SqlInstance sql1 -Action Backup
```

Get the errors that have something to do with the backup of the databases<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbLogShipError -SqlInstance sql1 -Secondary
```

Get the errors that occurred on the secondary instance.<br>
This will return the copy of the restore actions because those only occur on the secondary instance<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbLogShipError -SqlInstance sql1 -DateTimeFrom "01/05/2018"
```

Get the errors that have occurred from "01/05/2018". This can also be of format "yyyy-MM-dd"<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbLogShipError -SqlInstance sql1 -Secondary -DateTimeFrom "01/05/2018" -DateTimeTo "2018-01-07"
```

Get the errors that have occurred between "01/05/2018" and "01/07/2018".<br>
See that is doesn't matter how the date is represented.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

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

##### -Database

Specifies which databases to include when retrieving log shipping errors. Requires exact database names, not wildcards.  
Use this when troubleshooting specific databases rather than reviewing all log shipped databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the log shipping error results. Requires exact database names, not wildcards.  
Useful when you want to see errors for all databases except certain ones, like excluding test databases from production error reviews.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Action

Filters errors by log shipping operation type: Backup (primary), Copy (between servers), or Restore (secondary).  
Use this to isolate which phase of log shipping is failing when troubleshooting multi-step log shipping workflows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Backup,Copy,Restore |

##### -DateTimeFrom

Sets the earliest date and time for error records to include in results.  
Essential for focusing on recent failures or analyzing errors that occurred after a specific event or change.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DateTimeTo

Sets the latest date and time for error records to include in results.  
Combined with DateTimeFrom, this creates a specific time window for analyzing log shipping failures during maintenance windows or incidents.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Primary

Returns only errors from backup operations that occur on the primary server.  
Use this when troubleshooting backup failures or primary-side log shipping issues like insufficient disk space or backup device problems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Secondary

Returns only errors from copy and restore operations that occur on secondary servers.  
Use this when troubleshooting file transfer failures or restore issues on the destination server, such as network connectivity or disk space problems.

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


&nbsp;
