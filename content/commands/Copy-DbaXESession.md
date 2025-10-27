---
title: "Copy-DbaXESession"
slug: "Copy-DbaXESession"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies Extended Event sessions from one SQL Server instance to another, excluding system sessions."
tags:
  - "Migration"
  - "ExtendedEvent"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaXESession.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaXESession"
draft: false
---

# Copy-DbaXESession

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaXESession](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaXESession.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaXESession](https://dataplat.github.io/boh#Copy-DbaXESession).

## Synopsis

Copies Extended Event sessions from one SQL Server instance to another, excluding system sessions.

## Description

Copies custom Extended Event sessions between SQL Server instances while preserving their configuration and running state. This function scripts out the session definitions from the source server and recreates them on the destination, making it essential for server migrations, standardizing monitoring across environments, or setting up disaster recovery instances.  
  
System sessions (AlwaysOn_health and system_health) are automatically excluded since they're managed by SQL Server itself. If a session was running on the source, it will be started on the destination after creation. Existing sessions with the same name on the destination will be skipped unless you use the Force parameter to overwrite them.  
  
Perfect for migrating your custom monitoring, auditing, and troubleshooting Extended Event sessions when moving databases between servers or ensuring consistent monitoring across your SQL Server estate.

## Syntax

```powershell
Copy-DbaXESession
    [-Source] <DbaInstanceParameter>
    [-Destination] <DbaInstanceParameter[]>
    [[-SourceSqlCredential] <PSCredential>]
    [[-DestinationSqlCredential] <PSCredential>]
    [[-XeSession] <Object[]>]
    [[-ExcludeXeSession] <Object[]>]
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
PS C:\> Copy-DbaXESession -Source sqlserver2014a -Destination sqlcluster
```

Copies all Extended Event sessions from sqlserver2014a to sqlcluster using Windows credentials.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaXESession -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```

Copies all Extended Event sessions from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaXESession -Source sqlserver2014a -Destination sqlcluster -WhatIf
```

Shows what would happen if the command were executed.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaXESession -Source sqlserver2014a -Destination sqlcluster -XeSession CheckQueries, MonitorUserDefinedException
```

Copies only the Extended Events named CheckQueries and MonitorUserDefinedException from sqlserver2014a to sqlcluster.<br>

### Required Parameters

##### -Source

The source SQL Server instance containing the Extended Event sessions to copy. Requires sysadmin privileges and SQL Server 2012 or higher.  
This is typically your production server or template instance where you've configured custom monitoring and auditing sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

One or more destination SQL Server instances where Extended Event sessions will be recreated. Accepts arrays for bulk deployment to multiple servers.  
Common scenarios include disaster recovery sites, development environments, or new production servers that need the same monitoring configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

SQL Server authentication credentials for connecting to the source instance. Required when Windows authentication is disabled or unavailable.  
Use Get-Credential to securely prompt for credentials or pass an existing PSCredential object for automated scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

SQL Server authentication credentials for connecting to all destination instances. Used when destination servers require different authentication than the source.  
Single credential object applies to all destinations - use separate commands if different destinations need different credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -XeSession

Specific Extended Event session names to copy instead of all custom sessions. Accepts arrays of session names for selective migration.  
Use this when you only need specific monitoring sessions, such as copying just audit-related sessions to a compliance server or performance sessions to development.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeXeSession

Extended Event session names to exclude from the copy operation. Use this to skip sessions inappropriate for the destination environment.  
Common use cases include excluding production-specific auditing sessions when copying to development or excluding resource-intensive sessions on smaller test servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops and recreates existing Extended Event sessions with matching names on the destination servers. Without this parameter, existing sessions are skipped.  
Use this when you need to update session configurations or when consolidating monitoring setups from multiple sources requires overwriting existing sessions.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
