---
title: "Invoke-DbaDbLogShipRecovery"
slug: "Invoke-DbaDbLogShipRecovery"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Brings log shipped secondary databases online for disaster recovery or planned migration scenarios"
tags:
  - "LogShipping"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbLogShipRecovery.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbLogShipRecovery"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbLogShipRecovery</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbLogShipRecovery.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Brings log shipped secondary databases online for disaster recovery or planned migration scenarios

## Description

Recovers log shipped secondary databases from standby or restoring state to normal operational state. This function is essential for disaster recovery scenarios when you need to bring secondary databases online after a primary server failure, or for planned migrations where you want to switch roles between primary and secondary servers.  
  
The recovery process handles the complete workflow automatically. First, it checks if the backup source directory is still accessible. If so, it ensures all available transaction log backups are copied by running the log shipping copy job. If the source directory is unreachable (common in disaster scenarios), it proceeds with available backups.  
  
Next, it runs the log shipping restore job to apply any remaining transaction log backups that haven't been restored yet. Both the copy and restore jobs are monitored until completion, then disabled to prevent them from running again.  
  
Finally, unless you specify -NoRecovery, the database is brought online by executing RESTORE DATABASE WITH RECOVERY. This makes the database fully accessible for reads and writes.  
  
By default, all log shipped databases on the target instance are recovered. You can specify individual databases using the -Database parameter. The function requires that SQL Server Agent is running and will validate the service status before proceeding.  
  
All operations are tracked through the msdb database log shipping tables to ensure consistency and proper sequencing of the recovery steps.

## Syntax

```powershell
Invoke-DbaDbLogShipRecovery
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Database] <String[]>]
    [[-SqlCredential] <PSCredential>]
    [-NoRecovery]
    [-EnableException]
    [-Force]
    [[-InputObject] <Database[]>]
    [[-Delay] <Int32>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaDbLogShipRecovery -SqlInstance server1 -Force
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbLogShipRecovery -SqlInstance server1 -Force" }

Recovers all the databases on the instance that are enabled for log shipping<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbLogShipRecovery -SqlInstance server1 -SqlCredential $cred -Verbose -Force
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbLogShipRecovery -SqlInstance server1 -SqlCredential $cred -Verbose -Force" }

Recovers all the databases on the instance that are enabled for log shipping using a credential<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbLogShipRecovery -SqlInstance server1 -database db_logship -Verbose
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbLogShipRecovery -SqlInstance server1 -database db_logship -Verbose" }

Recovers the database "db_logship" to a normal status<br>

#####  Example:  4 

```powershell
PS C:\> db1, db2, db3, db4 | Invoke-DbaDbLogShipRecovery -SqlInstance server1 -Verbose
```
{: data-copyable="true" data-clean-code="db1, db2, db3, db4 | Invoke-DbaDbLogShipRecovery -SqlInstance server1 -Verbose" }

Recovers the database db1, db2, db3, db4 to a normal status<br>

#####  Example:  5 

```powershell
PS C:\> Invoke-DbaDbLogShipRecovery -SqlInstance server1 -Force -WhatIf
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbLogShipRecovery -SqlInstance server1 -Force -WhatIf" }

Shows what would happen if the command were executed.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the log-shipped secondary databases to recover. Accepts multiple database names and wildcards for pattern matching.  
Use this when you need to recover specific databases instead of all log-shipped databases on the instance. Without specifying -Database, you must use -Force to recover all log-shipped databases.

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

##### -NoRecovery

Prevents the final RESTORE DATABASE WITH RECOVERY step that brings the database fully online. The database remains in restoring state after log shipping jobs complete.  
Use this when you need to apply additional transaction logs manually or perform other operations before bringing the database online. By default, databases are fully recovered and made available for   
read-write operations.

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

##### -Force

Bypasses the safety requirement to specify individual databases and processes all log-shipped databases on the instance. Also sets confirmation preference to none.  
Use this in disaster recovery scenarios when you need to quickly recover all log-shipped databases without interactive prompts. Without -Force, you must explicitly specify database names using   
-Database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects from Get-DbaDatabase through the pipeline. This allows you to filter databases using Get-DbaDatabase and pipe them directly to the recovery function.  
Particularly useful when you need to recover databases based on specific criteria like database state or properties rather than just database names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Delay

Sets the polling interval in seconds to check if the log shipping copy and restore jobs have completed. The function waits this long between status checks.  
Use a shorter delay for faster recovery monitoring or a longer delay to reduce system load during job execution. Default is 5 seconds, which balances responsiveness with system performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 5 |

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
