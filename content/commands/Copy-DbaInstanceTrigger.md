---
title: "Copy-DbaInstanceTrigger"
slug: "Copy-DbaInstanceTrigger"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies server-level triggers between SQL Server instances for migration or standardization"
tags:
  - "Migration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaInstanceTrigger.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaInstanceTrigger"
draft: false
---

# Copy-DbaInstanceTrigger

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaInstanceTrigger](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaInstanceTrigger.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaInstanceTrigger](https://dataplat.github.io/boh#Copy-DbaInstanceTrigger).

## Synopsis

Copies server-level triggers between SQL Server instances for migration or standardization

## Description

Migrates server-level triggers from a source SQL Server instance to one or more destination instances. This is essential during server migrations, disaster recovery setup, or when standardizing security and audit triggers across your environment.  
  
Server triggers fire in response to server-level events like logons, DDL changes, or server startup. This function scripts out the complete trigger definition from the source and recreates it on the destination, maintaining all trigger properties and logic.  
  
By default, all server triggers are copied, but you can specify particular triggers with -ServerTrigger or exclude specific ones with -ExcludeServerTrigger. Existing triggers on the destination are skipped unless -Force is used to drop and recreate them.

## Syntax

```powershell
Copy-DbaInstanceTrigger
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-ServerTrigger] <Object[]>]
    [[-ExcludeServerTrigger] <Object[]>]
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
PS C:\> Copy-DbaInstanceTrigger -Source sqlserver2014a -Destination sqlcluster
```

Copies all server triggers from sqlserver2014a to sqlcluster, using Windows credentials. If triggers with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaInstanceTrigger -Source sqlserver2014a -Destination sqlcluster -ServerTrigger tg_noDbDrop -SourceSqlCredential $cred -Force
```

Copies a single trigger, the tg_noDbDrop trigger from sqlserver2014a to sqlcluster, using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If a trigger with the same name <br>
exists on sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaInstanceTrigger -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the server triggers to copy. Must be SQL Server 2005 or later.  
Requires sysadmin privileges to access server-level triggers and their definitions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server instance(s) where server triggers will be created. Must be SQL Server 2005 or later.  
Requires sysadmin privileges to create server-level triggers and cannot be a lower version than the source.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance when Windows Authentication is not available.  
Use this when copying triggers from instances in different domains or when using SQL Server authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance(s) when Windows Authentication is not available.  
Use this when copying triggers to instances in different domains or when using SQL Server authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerTrigger

Specific server trigger name(s) to copy from the source instance. Tab completion shows available triggers.  
Use this when you need to copy only specific triggers instead of all server triggers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeServerTrigger

Server trigger name(s) to skip during the copy operation. Tab completion shows available triggers.  
Use this when copying most triggers but need to exclude specific ones due to environment differences.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops and recreates server triggers that already exist on the destination instance.  
Without this switch, existing triggers are skipped to prevent accidental overwrites.

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
