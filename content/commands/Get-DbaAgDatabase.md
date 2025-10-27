---
title: "Get-DbaAgDatabase"
slug: "Get-DbaAgDatabase"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves availability group database information and synchronization status from SQL Server instances."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgDatabase"
draft: false
---

# Get-DbaAgDatabase

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgDatabase](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgDatabase.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgDatabase](https://dataplat.github.io/boh#Get-DbaAgDatabase).

## Synopsis

Retrieves availability group database information and synchronization status from SQL Server instances.

## Description

Retrieves detailed information about databases participating in SQL Server availability groups, including their synchronization state, failover readiness, and replica-specific status. This function queries the availability group configuration from each SQL Server instance to return database-level health and status information that varies depending on whether the replica is primary or secondary.  
  
Use this command to monitor availability group database health, troubleshoot synchronization issues, verify failover readiness, or generate compliance reports showing which databases are properly synchronized across your availability group replicas. The returned data includes critical operational details like suspension status, join state, and synchronization health that help DBAs quickly identify databases requiring attention.

## Syntax

```powershell
Get-DbaAgDatabase
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [[-Database] <String[]>]
    [[-InputObject] <AvailabilityGroup[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgDatabase -SqlInstance sql2017a
```

Returns all the databases in each availability group found on sql2017a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgDatabase -SqlInstance sql2017a -AvailabilityGroup AG101
```

Returns all the databases in the availability group AG101 on sql2017a<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sqlcluster -AvailabilityGroup SharePoint | Get-DbaAgDatabase -Database Sharepoint_Config
```

Returns the database Sharepoint_Config found in the availability group SharePoint on server sqlcluster<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2012 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -AvailabilityGroup

Specifies which availability groups to query for database information. Accepts multiple availability group names.  
Use this to limit results to specific availability groups when you have multiple AGs on the same instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which availability group databases to return information for. Accepts multiple database names with tab completion.  
Use this to focus on specific databases when troubleshooting AG issues or monitoring particular applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group objects from Get-DbaAvailabilityGroup via pipeline input.  
Use this when you want to chain commands to get database details from already retrieved availability groups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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


&nbsp;
