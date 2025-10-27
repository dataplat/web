---
title: "Copy-DbaDataCollector"
slug: "Copy-DbaDataCollector"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Data Collector collection sets from one instance to another"
tags:
  - "Migration"
  - "DataCollection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDataCollector.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaDataCollector"
draft: false
---

# Copy-DbaDataCollector

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaDataCollector](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDataCollector.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaDataCollector](https://dataplat.github.io/boh#Copy-DbaDataCollector).

## Synopsis

Copies SQL Data Collector collection sets from one instance to another

## Description

Copies SQL Data Collector collection sets between SQL Server instances, allowing you to replicate performance monitoring configurations across your environment. This command scripts out the collection set definitions from the source instance and recreates them on the destination, preserving all collection items, schedules, and upload settings.  
  
By default, all user-defined collection sets are migrated. If a collection set already exists on the destination, it will be skipped unless -Force is used to drop and recreate it. Collection sets that were running on the source will automatically be started on the destination after migration.  
  
The -CollectionSet parameter is auto-populated for command-line completion and can be used to copy only specific collection sets. Note that Data Collector must already be configured and enabled on the destination instance before running this command.

## Syntax

```powershell
Copy-DbaDataCollector
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-CollectionSet] <Object[]>]
    [[-ExcludeCollectionSet] <Object[]>]
    [-NoServerReconfig]
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
PS C:\> Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster
```

Copies all Data Collector Objects and Configurations from sqlserver2014a to sqlcluster, using Windows credentials.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```

Copies all Data Collector Objects and Configurations from sqlserver2014a to sqlcluster, using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster -WhatIf
```

Shows what would happen if the command were executed.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaDataCollector -Source sqlserver2014a -Destination sqlcluster -CollectionSet 'Server Activity', 'Table Usage Analysis'
```

Copies two Collection Sets, Server Activity and Table Usage Analysis, from sqlserver2014a to sqlcluster.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the Data Collector collection sets to copy. Requires sysadmin access and SQL Server 2008 or higher.  
The Data Collector feature must be configured on this instance for collection sets to exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server instance(s) where collection sets will be created. Requires sysadmin access and SQL Server 2008 or higher.  
The Data Collector feature must already be configured and enabled on the destination before running this command.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Login credentials for the source SQL Server instance. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Login credentials for the destination SQL Server instance(s). Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CollectionSet

Specific collection set names to copy from the source instance. Supports tab completion with available collection sets.  
When omitted, all user-defined collection sets are copied (system collection sets are always excluded).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeCollectionSet

Collection set names to exclude from the copy operation. Supports tab completion with available collection sets.  
Useful when you want to copy most collection sets but skip specific ones due to environment differences.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoServerReconfig

Reserved parameter for future Data Collector server configuration copying functionality.  
Currently has no effect as server-level configuration copying is not yet implemented.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates collection sets that already exist on the destination server.  
Without this switch, existing collection sets are skipped to prevent accidental data loss.

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
