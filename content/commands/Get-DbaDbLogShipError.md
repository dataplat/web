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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbLogShipError</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbLogShipError.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaDbLogShipError -SqlInstance sql1" }

Get all the log shipping errors that occurred<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbLogShipError -SqlInstance sql1 -Action Backup
```
{: data-copyable="true" data-clean-code="Get-DbaDbLogShipError -SqlInstance sql1 -Action Backup" }

Get the errors that have something to do with the backup of the databases<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbLogShipError -SqlInstance sql1 -Secondary
```
{: data-copyable="true" data-clean-code="Get-DbaDbLogShipError -SqlInstance sql1 -Secondary" }

Get the errors that occurred on the secondary instance.<br>
This will return the copy of the restore actions because those only occur on the secondary instance<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbLogShipError -SqlInstance sql1 -DateTimeFrom "01/05/2018"
```
{: data-copyable="true" data-clean-code="Get-DbaDbLogShipError -SqlInstance sql1 -DateTimeFrom &quot;01/05/2018&quot;" }

Get the errors that have occurred from "01/05/2018". This can also be of format "yyyy-MM-dd"<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbLogShipError -SqlInstance sql1 -Secondary -DateTimeFrom "01/05/2018" -DateTimeTo "2018-01-07"
```
{: data-copyable="true" data-clean-code="Get-DbaDbLogShipError -SqlInstance sql1 -Secondary -DateTimeFrom &quot;01/05/2018&quot; -DateTimeTo &quot;2018-01-07&quot;" }

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
