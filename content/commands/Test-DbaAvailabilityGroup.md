---
title: "Test-DbaAvailabilityGroup"
slug: "Test-DbaAvailabilityGroup"
date: 2024-01-01
layout: "single"
author: "Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Validates Availability Group replica connectivity and database prerequisites for AG operations"
tags:
  - "AvailabilityGroup"
  - "HA"
  - "AG"
  - "Test"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaAvailabilityGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaAvailabilityGroup"
draft: false
---

# Test-DbaAvailabilityGroup

| Property | Value |
| --- | --- |
| **Author** | Andreas Jordan (@JordanOrdix), ordix.de |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaAvailabilityGroup](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaAvailabilityGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaAvailabilityGroup](https://dataplat.github.io/boh#Test-DbaAvailabilityGroup).

## Synopsis

Validates Availability Group replica connectivity and database prerequisites for AG operations

## Description

Verifies that all replicas in an Availability Group are connected and communicating properly by checking ConnectionState across all replicas from the primary's perspective. This helps you identify connectivity issues that could impact failover capabilities or data synchronization.  
  
When used with the AddDatabase parameter, performs comprehensive prerequisite validation before adding databases to an AG. Checks that target databases have Full recovery model, Normal status, and proper backup history. Also validates seeding mode compatibility, tests connectivity to secondary replicas, and ensures database restore requirements can be met.  
  
This prevents common AG setup failures by catching configuration issues early, so you don't have to troubleshoot failed Add-DbaAgDatabase operations later.

## Syntax

```powershell
Test-DbaAvailabilityGroup
    [-SqlInstance] <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    -AvailabilityGroup <String>
    [-Secondary <DbaInstanceParameter[]>]
    [-SecondarySqlCredential <PSCredential>]
    [-AddDatabase <String[]>]
    [-SeedingMode <String>]
    [-SharedPath <String>]
    [-UseLastBackup]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaAvailabilityGroup -SqlInstance SQL2016 -AvailabilityGroup TestAG1
```

Test Availability Group TestAG1 with SQL2016 as the primary replica.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaAvailabilityGroup -SqlInstance SQL2016 -AvailabilityGroup TestAG1 -AddDatabase AdventureWorks -SeedingMode Automatic
```

Test if database AdventureWorks can be added to the Availability Group TestAG1 with automatic seeding.<br>

### Required Parameters

##### -SqlInstance

The primary replica of the Availability Group.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

Specifies the Availability Group name to validate for replica connectivity and database prerequisites.  
Use this to target a specific AG when testing health status or preparing to add databases.

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

##### -Secondary

Specifies secondary replica endpoints when they use non-standard ports or custom connection strings.  
The function auto-discovers secondary replicas from the AG configuration, but use this when replicas listen on custom ports or require specific connection parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecondarySqlCredential

Specifies credentials for connecting to secondary replica instances during validation.  
Use this when secondary replicas require different authentication than the primary replica, such as in cross-domain scenarios or when using SQL authentication on secondaries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AddDatabase

Specifies database names to validate for Availability Group addition prerequisites.  
Triggers comprehensive validation including recovery model, database status, backup history, and seeding compatibility checks. Use this to prevent Add-DbaAgDatabase failures by catching configuration   
issues early.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SeedingMode

Specifies the database seeding method for validation when using AddDatabase parameter.  
Use 'Automatic' for SQL Server 2016+ environments or 'Manual' when you need to control backup/restore operations. This determines the prerequisite validation logic performed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Automatic,Manual |

##### -SharedPath

Specifies the network path accessible by all replicas for backup and restore operations during manual seeding validation.  
Required when AddDatabase uses manual seeding and databases need to be restored on secondary replicas. Must be accessible by all SQL Server service accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -UseLastBackup

Validates that the most recent database backup chain can be used for AG database addition.  
Enables validation using existing backups instead of creating new ones, but requires the last backup to be a transaction log backup. Use this to test AG readiness with your current backup strategy.

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
