---
title: "Copy-DbaRegServer"
slug: "Copy-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies Central Management Server groups and registered server instances between SQL Server instances."
tags:
  - "Migration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaRegServer"
draft: false
---

# Copy-DbaRegServer

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaRegServer](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaRegServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaRegServer](https://dataplat.github.io/boh#Copy-DbaRegServer).

## Synopsis

Copies Central Management Server groups and registered server instances between SQL Server instances.

## Description

Migrates registered servers and server groups from a source Central Management Server to a destination CMS, preserving the hierarchical structure of groups and subgroups. This eliminates the need to manually recreate complex server organization structures when setting up new environments or consolidating server management. The function handles conflicts by either skipping existing items or dropping and recreating them when Force is specified.

## Syntax

```powershell
Copy-DbaRegServer
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Group] <String[]>]
    [-SwitchServerName]
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
PS C:\> Copy-DbaRegServer -Source sqlserver2014a -Destination sqlcluster
```

All groups, subgroups, and server instances are copied from sqlserver2014a CMS to sqlcluster CMS.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaRegServer -Source sqlserver2014a -Destination sqlcluster -Group Group1,Group3
```

Top-level groups Group1 and Group3 along with their subgroups and server instances are copied from sqlserver to sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaRegServer -Source sqlserver2014a -Destination sqlcluster -Group Group1,Group3 -SwitchServerName -SourceSqlCredential $SourceSqlCredential -DestinationSqlCredential
```

$DestinationSqlCredential<br>
Top-level groups Group1 and Group3 along with their subgroups and server instances are copied from sqlserver to sqlcluster. When adding sql instances to sqlcluster, if the server name of the <br>
migrating instance is "sqlcluster", it will be switched to "sqlserver".<br>
If SwitchServerName is not specified, "sqlcluster" will be skipped.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the Central Management Server to copy from. You must have sysadmin access and server version must be SQL Server version 2000 or higher.  
This is where your existing CMS groups and registered servers are currently stored.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server instance where CMS groups and registered servers will be copied to. You must have sysadmin access and the server must be SQL Server 2000 or higher.  
This instance will become the new Central Management Server containing the migrated server registrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance when Windows Authentication is not available. Accepts PowerShell credentials (Get-Credential).  
Use this when the source server requires SQL Authentication or different Windows credentials than your current session.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance when Windows Authentication is not available. Accepts PowerShell credentials (Get-Credential).  
Use this when the destination server requires SQL Authentication or different Windows credentials than your current session.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Group

Specifies which top-level CMS groups to copy from the source server. Accepts one or more group names as an array.  
When omitted, all groups and their registered servers are copied. Use this to selectively migrate specific environments like 'Production' or 'Development' groups.

| Property | Value |
| --- | --- |
| Alias | CMSGroup |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SwitchServerName

Replaces source server name references with the destination server name during migration.  
Use this when the source CMS server itself is registered within the groups and you want it renamed to the destination server name. Prevents conflicts since CMS cannot register itself as a managed   
server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates existing groups and registered servers at the destination instead of skipping them.  
Use this to overwrite conflicting CMS configurations when consolidating multiple Central Management Servers or updating existing registrations.

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
