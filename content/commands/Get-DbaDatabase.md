---
title: "Get-DbaDatabase"
slug: "Get-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com | Klaas Vandenberghe (@PowerDbaKlaas) | Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database objects and metadata from SQL Server instances with advanced filtering and usage analytics."
tags:
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDatabase"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDatabase</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDatabase.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Garry Bargsley (@gbargsley), blog.garrybargsley.com , Klaas Vandenberghe (@PowerDbaKlaas) , Simone Bizzotto (@niphlod)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves database objects and metadata from SQL Server instances with advanced filtering and usage analytics.

## Description

Retrieves detailed database information from one or more SQL Server instances, returning rich database objects instead of basic metadata queries.  
This command provides comprehensive filtering options for database status, access type, recovery model, backup history, and encryption status, making it essential for database inventory, compliance auditing, and maintenance planning.  
Unlike querying sys.databases directly, this returns full SMO database objects with calculated properties for backup status, usage statistics from DMVs, and consistent formatting across SQL Server versions.  
Supports both on-premises SQL Server (2000+) and Azure SQL Database with automatic compatibility handling.

## Syntax

```powershell
Get-DbaDatabase
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [-ExcludeUser]
    [-ExcludeSystem]
    [[-Owner] <String[]>]
    [-Encrypted]
    [[-Status] <String[]>]
    [[-Access] <String>]
    [[-RecoveryModel] <String[]>]
    [-NoFullBackup]
    [[-NoFullBackupSince] <DateTime>]
    [-NoLogBackup]
    [[-NoLogBackupSince] <DateTime>]
    [-EnableException]
    [-IncludeLastUsed]
    [-OnlyAccessible]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance localhost" }

Returns all databases on the local default SQL Server instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost -ExcludeUser
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance localhost -ExcludeUser" }

Returns only the system databases on the local default SQL Server instance.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost -ExcludeSystem
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance localhost -ExcludeSystem" }

Returns only the user databases on the local default SQL Server instance.<br>

#####  Example:  4 

```powershell
PS C:\> 'localhost','sql2016' | Get-DbaDatabase
```
{: data-copyable="true" data-clean-code="'localhost','sql2016' | Get-DbaDatabase" }

Returns databases on multiple instances piped into the function.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance SQL1\SQLExpress -RecoveryModel full,Simple
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance SQL1\SQLExpress -RecoveryModel full,Simple" }

Returns only the user databases in Full or Simple recovery model from SQL Server instance SQL1\SQLExpress.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance SQL1\SQLExpress -Status Normal
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance SQL1\SQLExpress -Status Normal" }

Returns only the user databases with status 'normal' from SQL Server instance SQL1\SQLExpress.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance SQL1\SQLExpress -IncludeLastUsed
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance SQL1\SQLExpress -IncludeLastUsed" }

Returns the databases from SQL Server instance SQL1\SQLExpress and includes the last used information<br>
from the sys.dm_db_index_usage_stats DMV.<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance SQL1\SQLExpress,SQL2 -ExcludeDatabase model,master
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance SQL1\SQLExpress,SQL2 -ExcludeDatabase model,master" }

Returns all databases except master and model from SQL Server instances SQL1\SQLExpress and SQL2.<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance SQL1\SQLExpress,SQL2 -Encrypted
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance SQL1\SQLExpress,SQL2 -Encrypted" }

Returns only databases using TDE from SQL Server instances SQL1\SQLExpress and SQL2.<br>

#####  Example:  10 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance SQL1\SQLExpress,SQL2 -Access ReadOnly
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance SQL1\SQLExpress,SQL2 -Access ReadOnly" }

Returns only read only databases from SQL Server instances SQL1\SQLExpress and SQL2.<br>

#####  Example:  11 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance SQL2,SQL3 -Database OneDB,OtherDB
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance SQL2,SQL3 -Database OneDB,OtherDB" }

Returns databases 'OneDb' and 'OtherDB' from SQL Server instances SQL2 and SQL3 if databases by those names exist on those instances.<br>

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

##### -Database

Specifies one or more databases to include in the results. Supports wildcards and exact name matching.  
Use this when you need to retrieve specific databases instead of all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies one or more databases to exclude from the results. Supports wildcards and exact name matching.  
Use this to filter out specific databases like test or staging environments from your inventory.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeUser

Returns only system databases (master, model, msdb, tempdb).  
Use this when you need to focus on system database maintenance tasks or validation.  
This parameter cannot be used with -ExcludeSystem.

| Property | Value |
| --- | --- |
| Alias | SystemDbOnly,NoUserDb,ExcludeAllUserDb |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeSystem

Returns only user databases, excluding system databases (master, model, msdb, tempdb).  
Use this when you need to focus on application databases for maintenance, backup, or compliance reporting.  
This parameter cannot be used with -ExcludeUser.

| Property | Value |
| --- | --- |
| Alias | UserDbOnly,NoSystemDb,ExcludeAllSystemDb |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Owner

Filters databases by their database owner (the principal listed as the database owner).  
Use this to find databases owned by specific accounts for security auditing or ownership cleanup.  
Accepts login names like 'sa', 'DOMAIN\user', or service account names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Encrypted

Returns only databases with Transparent Data Encryption (TDE) enabled.  
Use this for compliance reporting or to verify which databases have encryption configured for data protection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Status

Filters databases by their current operational status. Returns only databases matching the specified status values.  
Use this to identify databases requiring attention (Suspect, Offline) or in specific states for maintenance planning.  
Valid options: EmergencyMode, Normal, Offline, Recovering, RecoveryPending, Restoring, Standby, Suspect.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @('EmergencyMode', 'Normal', 'Offline', 'Recovering', 'RecoveryPending', 'Restoring', 'Standby', 'Suspect') |
| Accepted Values | EmergencyMode,Normal,Offline,Recovering,RecoveryPending,Restoring,Standby,Suspect |

##### -Access

Filters databases by their read/write access mode. Returns only databases set to the specified access type.  
Use ReadOnly to find reporting databases or those temporarily set to read-only for maintenance.  
Valid options: ReadOnly, ReadWrite.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | ReadOnly,ReadWrite |

##### -RecoveryModel

Filters databases by their recovery model setting, which controls transaction log behavior and backup capabilities.  
Use this to verify recovery model consistency or find databases needing model changes for backup strategy compliance.  
Valid options: Full (point-in-time recovery), Simple (no log backups), BulkLogged (minimal logging for bulk operations).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @('Full', 'Simple', 'BulkLogged') |
| Accepted Values | Full,Simple,BulkLogged |

##### -NoFullBackup

Returns only databases that have never had a full backup or only have CopyOnly full backups recorded in msdb.  
Use this to identify databases at risk due to missing backup coverage for disaster recovery planning.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoFullBackupSince

Returns databases that haven't had a full backup since the specified date and time.  
Use this to identify databases with stale backups that may violate your backup policy or RTO requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoLogBackup

Returns databases in Full or BulkLogged recovery model that have never had a transaction log backup.  
Use this to identify databases where transaction logs may be growing unchecked due to missing log backup strategy.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoLogBackupSince

Returns databases that haven't had a transaction log backup since the specified date and time.  
Use this to find databases with overdue log backups that may cause transaction log growth or RPO violations.

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

##### -IncludeLastUsed

Adds LastRead and LastWrite columns showing when databases were last accessed based on index usage statistics.  
Use this to identify unused or rarely accessed databases for decommissioning or archival decisions.  
Data is retrieved from sys.dm_db_index_usage_stats and resets when SQL Server restarts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -OnlyAccessible

Returns only databases that are currently accessible, excluding offline or inaccessible databases.  
Use this to improve performance when you only need databases that can be queried, providing significant speedup for SMO enumeration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
