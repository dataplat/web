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

# Remove-DbaDbLogShipping

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbLogShipping](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbLogShipping.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbLogShipping](https://dataplat.github.io/boh#Remove-DbaDbLogShipping).

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

Remove the log shipping for database DB1<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbLogShipping -PrimarySqlInstance sql1 -Database DB1
```

Remove the log shipping for database DB1 and let the command figure out the secondary instance<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbLogShipping -PrimarySqlInstance localhost -SecondarySqlInstance sql2 -Database DB1, DB2
```

Remove the log shipping for multiple database<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaDbLogShipping -PrimarySqlInstance localhost -SecondarySqlInstance localhost -Database DB2 -RemoveSecondaryDatabase
```

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
