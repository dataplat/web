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

# Test-DbaDbLogShipStatus

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDbLogShipStatus](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbLogShipStatus.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDbLogShipStatus](https://dataplat.github.io/boh#Test-DbaDbLogShipStatus).

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

Retrieves the log ship information from sql1 and displays all the information present including the status.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbLogShipStatus -SqlInstance sql1 -Database AdventureWorks2014
```

Retrieves the log ship information for just the database AdventureWorks.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDbLogShipStatus -SqlInstance sql1 -Primary
```

Retrieves the log ship information and only returns the information for the databases on the primary instance.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaDbLogShipStatus -SqlInstance sql1 -Secondary
```

Retrieves the log ship information and only returns the information for the databases on the secondary instance.<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaDbLogShipStatus -SqlInstance sql1 -Simple
```

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
