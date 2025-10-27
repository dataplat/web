---
title: "Remove-DbaDbLogShipping"
slug: "Remove-DbaDbLogShipping"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Dismantles SQL Server log shipping configurations and removes associated jobs and monitoring"
tags:
  - "LogShipping"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbLogShipping.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbLogShipping"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbLogShipping</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbLogShipping.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Dismantles SQL Server log shipping configurations and removes associated jobs and monitoring

## Description

Completely removes log shipping setup from both primary and secondary instances by cleaning up all associated SQL Agent jobs, monitor configurations, and database relationships stored in msdb. This function calls the proper SQL Server system stored procedures (sp_delete_log_shipping_primary_secondary, sp_delete_log_shipping_primary_database, and sp_delete_log_shipping_secondary_database) to ensure clean removal without orphaned objects.  
  
Use this when migrating to different disaster recovery solutions, cleaning up failed log shipping setups, or decommissioning secondary servers. The function automatically discovers secondary server information from the log shipping configuration if not specified.  
  
By default, the secondary database remains intact and accessible after log shipping removal. Use -RemoveSecondaryDatabase to completely drop the secondary database as part of the cleanup process.

## Syntax

```powershell
Remove-DbaDbLogShipping
    [-PrimarySqlInstance] <DbaInstanceParameter>
    [[-SecondarySqlInstance] <DbaInstanceParameter>]
    [[-PrimarySqlCredential] <PSCredential>]
    [[-SecondarySqlCredential] <PSCredential>]
    [-Database] <Object[]>
    [-RemoveSecondaryDatabase]
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
PS C:\> Remove-DbaDbLogShipping -PrimarySqlInstance sql1 -SecondarySqlInstance sql2 -Database DB1
```
{: data-copyable="true" data-clean-code="Remove-DbaDbLogShipping -PrimarySqlInstance sql1 -SecondarySqlInstance sql2 -Database DB1" }

Remove the log shipping for database DB1<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbLogShipping -PrimarySqlInstance sql1 -Database DB1
```
{: data-copyable="true" data-clean-code="Remove-DbaDbLogShipping -PrimarySqlInstance sql1 -Database DB1" }

Remove the log shipping for database DB1 and let the command figure out the secondary instance<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbLogShipping -PrimarySqlInstance localhost -SecondarySqlInstance sql2 -Database DB1, DB2
```
{: data-copyable="true" data-clean-code="Remove-DbaDbLogShipping -PrimarySqlInstance localhost -SecondarySqlInstance sql2 -Database DB1, DB2" }

Remove the log shipping for multiple database<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaDbLogShipping -PrimarySqlInstance localhost -SecondarySqlInstance localhost -Database DB2 -RemoveSecondaryDatabase
```
{: data-copyable="true" data-clean-code="Remove-DbaDbLogShipping -PrimarySqlInstance localhost -SecondarySqlInstance localhost -Database DB2 -RemoveSecondaryDatabase" }

Remove the log shipping for database DB2 and remove the database from the secondary instance<br>

### Required Parameters

##### -PrimarySqlInstance

The SQL Server instance hosting the primary database(s) in the log shipping configuration. This server contains the source database that is being shipped to secondary instances.  
You must have sysadmin access to execute the log shipping removal stored procedures. Requires SQL Server 2000 or later.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Database

The primary database name(s) to remove from log shipping configuration. Accepts multiple databases via pipeline or array input.  
Must specify the database name as it exists on the primary instance, not the secondary instance name which may be different.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SecondarySqlInstance

The SQL Server instance hosting the secondary database(s) in the log shipping configuration. If not specified, the function automatically discovers this from the log shipping metadata in msdb.  
Required when removing log shipping from multiple secondary instances or when automatic discovery fails. You must have sysadmin access to clean up secondary database configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PrimarySqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecondarySqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RemoveSecondaryDatabase

Completely drops the secondary database from the secondary instance after removing the log shipping configuration. By default, the secondary database remains intact and accessible.  
Use this when decommissioning the secondary server or when you need to start fresh with a new log shipping setup.

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
