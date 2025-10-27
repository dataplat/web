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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaAvailabilityGroup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaAvailabilityGroup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Andreas Jordan (@JordanOrdix), ordix.de</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Test-DbaAvailabilityGroup -SqlInstance SQL2016 -AvailabilityGroup TestAG1" }

Test Availability Group TestAG1 with SQL2016 as the primary replica.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaAvailabilityGroup -SqlInstance SQL2016 -AvailabilityGroup TestAG1 -AddDatabase AdventureWorks -SeedingMode Automatic
```
{: data-copyable="true" data-clean-code="Test-DbaAvailabilityGroup -SqlInstance SQL2016 -AvailabilityGroup TestAG1 -AddDatabase AdventureWorks -SeedingMode Automatic" }

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
