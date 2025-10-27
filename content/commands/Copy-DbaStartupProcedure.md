---
title: "Copy-DbaStartupProcedure"
slug: "Copy-DbaStartupProcedure"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Copies startup procedures from master database between SQL Server instances"
tags:
  - "Migration"
  - "Procedure"
  - "Startup"
  - "StartupProcedure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaStartupProcedure.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaStartupProcedure"
draft: false
---

# Copy-DbaStartupProcedure

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaStartupProcedure](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaStartupProcedure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaStartupProcedure](https://dataplat.github.io/boh#Copy-DbaStartupProcedure).

## Synopsis

Copies startup procedures from master database between SQL Server instances

## Description

Migrates user-defined startup procedures stored in the master database from source to destination SQL Server instances. Startup procedures are stored procedures that automatically execute when SQL Server starts up, commonly used for server initialization tasks, custom monitoring setup, or configuration validation.  
  
This function identifies procedures flagged with the startup option using sp_procoption, copies their definitions to the destination master database, and configures them as startup procedures. This is essential during server migrations, disaster recovery setup, or when standardizing startup configurations across multiple SQL Server environments.  
  
By default, all startup procedures are copied. Use -Procedure to copy specific procedures or -ExcludeProcedure to skip certain ones. Existing procedures on the destination are skipped unless -Force is used to overwrite them.

## Syntax

```powershell
Copy-DbaStartupProcedure
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Procedure] <String[]>]
    [[-ExcludeProcedure] <String[]>]
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
PS C:\> Copy-DbaStartupProcedure -Source sqlserver2014a -Destination sqlcluster
```

Copies all startup procedures from sqlserver2014a to sqlcluster using Windows credentials. If procedure(s) with the same name exists in the master database on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaStartupProcedure -Source sqlserver2014a -SourceSqlCredential $scred -Destination sqlcluster -DestinationSqlCredential $dcred -Procedure logstartup -Force
```

Copies only the startup procedure, logstartup, from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If the procedure already exists on <br>
sqlcluster, it will be updated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaStartupProcedure -Source sqlserver2014a -Destination sqlcluster -ExcludeProcedure logstartup -Force
```

Copies all the startup procedures found on sqlserver2014a except logstartup to sqlcluster. If a startup procedure with the same name exists on sqlcluster, it will be updated because -Force was used.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaStartupProcedure -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

The source SQL Server instance containing startup procedures to copy from the master database. Requires sysadmin access to read stored procedure definitions and startup configuration.  
Use this to specify which server has the startup procedures you want to migrate or standardize across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

The destination SQL Server instance(s) where startup procedures will be copied to the master database. Requires sysadmin access to create procedures and modify startup configuration.  
Accepts multiple destinations to deploy startup procedures across several servers simultaneously for standardization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance when Windows authentication is not available or desired.  
Use this when you need to connect with specific SQL login credentials or when running under a service account that lacks access to the source server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance(s) when Windows authentication is not available or desired.  
Use this when deploying to servers that require different authentication credentials or when your current context lacks destination access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Procedure

Specifies which startup procedures to copy from the source server instead of copying all available startup procedures.  
Use this when you only need specific procedures migrated, such as copying just monitoring or initialization procedures while leaving others behind.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeProcedure

Specifies which startup procedures to skip during the copy operation while processing all others from the source.  
Use this when most startup procedures should be copied but specific ones need to remain server-specific or are problematic.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Overwrites existing startup procedures on the destination server instead of skipping them when name conflicts occur.  
Use this when updating existing startup procedures with newer versions or when you need to ensure destination procedures match the source exactly.

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
