---
title: "Test-DbaDbLogShipStatus"
slug: "Test-DbaDbLogShipStatus"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves log shipping status and health information from the monitoring instance"
tags:
  - "LogShipping"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbLogShipStatus.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbLogShipStatus"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaDbLogShipStatus</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbLogShipStatus.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Retrieves log shipping status and health information from the monitoring instance

## Description

Queries the log shipping monitoring system to check the health of your log shipping configuration across primary and secondary instances.  
This function connects to your log shipping monitoring instance and examines backup, copy, and restore operations to identify any issues or delays.  
  
Make sure you're connecting to the monitoring instance of your log shipping infrastructure, as this is where SQL Server stores the consolidated monitoring data.  
  
The function analyzes timing thresholds for each operation and reports specific problems like missed backups, copy delays, or restore failures.  
When everything is functioning normally, you'll see "All OK" in the status output.  
Problem databases will show detailed messages about which operations are behind schedule or failing entirely.

## Syntax

```powershell
Test-DbaDbLogShipStatus
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [-Simple]
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
PS C:\> Test-DbaDbLogShipStatus -SqlInstance sql1
```
{: data-copyable="true" data-clean-code="Test-DbaDbLogShipStatus -SqlInstance sql1" }

Retrieves the log ship information from sql1 and displays all the information present including the status.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbLogShipStatus -SqlInstance sql1 -Database AdventureWorks2014
```
{: data-copyable="true" data-clean-code="Test-DbaDbLogShipStatus -SqlInstance sql1 -Database AdventureWorks2014" }

Retrieves the log ship information for just the database AdventureWorks.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDbLogShipStatus -SqlInstance sql1 -Primary
```
{: data-copyable="true" data-clean-code="Test-DbaDbLogShipStatus -SqlInstance sql1 -Primary" }

Retrieves the log ship information and only returns the information for the databases on the primary instance.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaDbLogShipStatus -SqlInstance sql1 -Secondary
```
{: data-copyable="true" data-clean-code="Test-DbaDbLogShipStatus -SqlInstance sql1 -Secondary" }

Retrieves the log ship information and only returns the information for the databases on the secondary instance.<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaDbLogShipStatus -SqlInstance sql1 -Simple
```
{: data-copyable="true" data-clean-code="Test-DbaDbLogShipStatus -SqlInstance sql1 -Simple" }

Retrieves the log ship information and only returns the columns SQL Instance, Database, Instance Type and Status<br>

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

Specifies which log shipped databases to check by exact name. Accepts multiple database names as a comma-separated list.  
Use this when you want to focus on specific databases instead of checking all log shipped databases on the monitoring instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific log shipped databases from the status check by exact name. Accepts multiple database names as a comma-separated list.  
Use this when you want to check most databases but skip certain ones, such as test or development log shipping configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Simple

Returns only essential columns: SqlInstance, Database, InstanceType, and Status instead of all detailed timing information.  
Use this for quick health overviews when you don't need the full backup/copy/restore timing details.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Primary

Returns only status information for databases acting as primary instances in log shipping configurations.  
Use this when you want to focus specifically on backup operations and primary-side health monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Secondary

Returns only status information for databases acting as secondary instances in log shipping configurations.  
Use this when you want to focus specifically on copy and restore operations and secondary-side health monitoring.

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
