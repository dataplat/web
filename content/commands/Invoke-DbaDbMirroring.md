---
title: "Invoke-DbaDbMirroring"
slug: "Invoke-DbaDbMirroring"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates and configures database mirroring between SQL Server instances with full validation and setup"
tags:
  - "Mirroring"
  - "Mirror"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbMirroring.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbMirroring"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbMirroring</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbMirroring.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates and configures database mirroring between SQL Server instances with full validation and setup

## Description

Creates database mirroring configurations between SQL Server instances, handling the complete end-to-end setup process that would normally require dozens of manual T-SQL commands and careful validation steps. This function eliminates the complexity and potential errors involved in manually configuring database mirroring partnerships.  
  
The function performs comprehensive validation before setup and handles all the technical requirements:  
* Verifies that mirroring is possible between the specified instances and databases  
* Sets the recovery model to Full if needed (required for mirroring)  
* Creates and restores full and log backups to initialize the mirror database if it doesn't exist  
* Sets up database mirroring endpoints on all participating instances  
* Creates logins and grants CONNECT permissions to service accounts on all endpoints  
* Starts endpoints if they're not already running  
* Establishes the mirroring partnership between primary and mirror  
* Configures witness server if specified for automatic failover scenarios  
  
This saves DBAs significant time when setting up high availability solutions and reduces the risk of configuration errors that can cause mirroring setup failures. The function can work with existing backups or create fresh ones as needed.  
  
NOTE: If backup/restore is performed, the backup files will remain on the network share for your records.

## Syntax

```powershell
Invoke-DbaDbMirroring
    [[-Primary] <DbaInstanceParameter>]
    [[-PrimarySqlCredential] <PSCredential>]
    [-Mirror] <DbaInstanceParameter[]>
    [[-MirrorSqlCredential] <PSCredential>]
    [[-Witness] <DbaInstanceParameter>]
    [[-WitnessSqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-EndpointEncryption] <String>]
    [[-EncryptionAlgorithm] <String>]
    [[-SharedPath] <String>]
    [[-InputObject] <Database[]>]
    [-UseLastBackup]
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
PS C:\> $params = @{
>> Primary = 'sql2017a'
>> Mirror = 'sql2017b'
>> MirrorSqlCredential = 'sqladmin'
>> Witness = 'sql2019'
>> Database = 'pubs'
>> SharedPath = '\\nas\sql\share'
>> }
>>
PS C:\> Invoke-DbaDbMirroring @params
```
{: data-copyable="true" data-clean-code="$params = @{
Primary = 'sql2017a'
Mirror = 'sql2017b'
MirrorSqlCredential = 'sqladmin'
Witness = 'sql2019'
Database = 'pubs'
SharedPath = '\\nas\sql\share'
}
Invoke-DbaDbMirroring @params" }

Performs a bunch of checks to ensure the pubs database on sql2017a<br>
can be mirrored from sql2017a to sql2017b. Logs in to sql2019 and sql2017a<br>
using Windows credentials and sql2017b using a SQL credential.<br>
Prompts for confirmation for most changes. To avoid confirmation, use -Confirm:$false or<br>
use the syntax in the second example.<br>

#####  Example:  2 

```powershell
PS C:\> $params = @{
>> Primary = 'sql2017a'
>> Mirror = 'sql2017b'
>> MirrorSqlCredential = 'sqladmin'
>> Witness = 'sql2019'
>> Database = 'pubs'
>> SharedPath = '\\nas\sql\share'
>> Force = $true
>> Confirm = $false
>> }
>>
PS C:\> Invoke-DbaDbMirroring @params
```
{: data-copyable="true" data-clean-code="$params = @{
Primary = 'sql2017a'
Mirror = 'sql2017b'
MirrorSqlCredential = 'sqladmin'
Witness = 'sql2019'
Database = 'pubs'
SharedPath = '\\nas\sql\share'
Force = $true
Confirm = $false
}
Invoke-DbaDbMirroring @params" }

Performs a bunch of checks to ensure the pubs database on sql2017a<br>
can be mirrored from sql2017a to sql2017b. Logs in to sql2019 and sql2017a<br>
using Windows credentials and sql2017b using a SQL credential.<br>
Drops existing pubs database on Mirror and restores it with<br>
a fresh backup.<br>
Does all the things in the description, does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> $map = @{ 'database_data' = 'M:\Data\database_data.mdf' 'database_log' = 'L:\Log\database_log.ldf' }
PS C:\> Get-ChildItem \\nas\seed | Restore-DbaDatabase -SqlInstance sql2017b -FileMapping $map -NoRecovery
PS C:\> Get-DbaDatabase -SqlInstance sql2017a -Database pubs | Invoke-DbaDbMirroring -Mirror sql2017b -Confirm:$false
```
{: data-copyable="true" data-clean-code="$map = @{ 'database_data' = 'M:\Data\database_data.mdf' 'database_log' = 'L:\Log\database_log.ldf' }
Get-ChildItem \\nas\seed | Restore-DbaDatabase -SqlInstance sql2017b -FileMapping $map -NoRecovery
Get-DbaDatabase -SqlInstance sql2017a -Database pubs | Invoke-DbaDbMirroring -Mirror sql2017b -Confirm:$false" }

Restores backups from sql2017a to a specific file structure on sql2017b then creates mirror with no prompts for confirmation.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017a -Database pubs |
>> Invoke-DbaDbMirroring -Mirror sql2017b -UseLastBackup -Confirm:$false
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2017a -Database pubs |
Invoke-DbaDbMirroring -Mirror sql2017b -UseLastBackup -Confirm:$false" }

Mirrors pubs on sql2017a to sql2017b and uses the last full and logs from sql2017a to seed. Doesn't prompt for confirmation.<br>

### Required Parameters

##### -Mirror

Specifies the SQL Server instance(s) that will serve as the mirror server(s) in the mirroring partnership.  
This is where the mirrored database copies will be created and maintained.  
Supports multiple mirror instances for creating mirror partnerships with different servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Primary

Specifies the SQL Server instance that will serve as the primary (principal) server in the mirroring partnership.  
Use this when setting up mirroring from scratch rather than piping database objects from Get-DbaDatabase.  
Must be paired with the Database parameter to identify which databases to mirror.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PrimarySqlCredential

Alternative credentials for connecting to the primary SQL Server instance.  
Required when the current user context doesn't have sufficient permissions on the primary server.  
Accepts PowerShell credential objects created with Get-Credential for SQL Authentication or domain accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MirrorSqlCredential

Alternative credentials for connecting to the mirror SQL Server instance(s).  
Required when the current user context doesn't have sufficient permissions on the mirror server.  
Accepts PowerShell credential objects created with Get-Credential for SQL Authentication or domain accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Witness

Specifies the SQL Server instance that will serve as the witness server for automatic failover scenarios.  
Optional parameter that enables high safety mode with automatic failover when all three servers can communicate.  
Leave empty if you only need high safety mode without automatic failover or high performance mode.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WitnessSqlCredential

Alternative credentials for connecting to the witness SQL Server instance.  
Required when the current user context doesn't have sufficient permissions on the witness server.  
Accepts PowerShell credential objects created with Get-Credential for SQL Authentication or domain accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which database(s) on the primary server to set up for mirroring.  
Required when using the Primary parameter instead of piping from Get-DbaDatabase.  
Supports multiple database names to set up mirroring for several databases in a single operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EndpointEncryption

Controls the encryption requirement for database mirroring endpoints created during setup.  
Default is 'Required' which enforces encrypted communication between all mirroring partners.  
Use 'Supported' to allow both encrypted and unencrypted connections, or 'Disabled' to prevent encryption.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Required |
| Accepted Values | Disabled,Required,Supported |

##### -EncryptionAlgorithm

Specifies the encryption algorithm used by database mirroring endpoints for secure communication.  
Default is 'Aes' which provides strong encryption with good performance.  
Consider 'AesRC4' or 'RC4Aes' for compatibility with older SQL Server versions in mixed environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Aes |
| Accepted Values | Aes,AesRC4,None,RC4,RC4Aes |

##### -SharedPath

Network share path accessible by all SQL Server service accounts for backup and restore operations.  
Required when the mirror database doesn't exist and needs to be initialized from backups.  
Must have read/write permissions for the service accounts running SQL Server on primary and mirror instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase to set up mirroring for specific databases.  
Use this approach when you want to filter databases first or work with existing database objects.  
Alternative to using the Primary and Database parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -UseLastBackup

Uses the most recent full and log backups from the primary server to initialize the mirror database.  
Avoids creating new backups when recent ones already exist and are sufficient for mirroring setup.  
Requires the primary database to be in Full recovery model with existing backup history.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates the mirror database even if it already exists, using fresh backups from the primary.  
Use this when you need to completely reinitialize mirroring or when the existing mirror database is corrupted.  
Requires either SharedPath for new backups or UseLastBackup to use existing ones.

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
