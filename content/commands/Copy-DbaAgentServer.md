---
title: "Copy-DbaAgentServer"
slug: "Copy-DbaAgentServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies all SQL Server Agent objects and server properties between instances."
tags:
  - "Migration"
  - "SqlServerAgent"
  - "SqlAgent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaAgentServer"
draft: false
---

# Copy-DbaAgentServer

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaAgentServer](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaAgentServer](https://dataplat.github.io/boh#Copy-DbaAgentServer).

## Synopsis

Copies all SQL Server Agent objects and server properties between instances.

## Description

Migrates complete SQL Server Agent configuration including jobs, operators, alerts, schedules, job categories, and proxies from one instance to another. This function handles the proper sequence of object creation and also copies server-level Agent properties like job history retention settings, error log locations, and database mail profiles. Essential for server migrations, disaster recovery setups, or standardizing Agent configurations across multiple environments without manually recreating dozens of objects.  
  
You must have sysadmin access and server version must be SQL Server version 2000 or greater.

## Syntax

```powershell
Copy-DbaAgentServer
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [-DisableJobsOnDestination]
    [-DisableJobsOnSource]
    [-ExcludeServerProperties]
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
PS C:\> Copy-DbaAgentServer -Source sqlserver2014a -Destination sqlcluster
```

Copies all job server objects from sqlserver2014a to sqlcluster using Windows credentials for authentication. If job objects with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaAgentServer -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```

Copies all job objects from sqlserver2014a to sqlcluster using SQL credentials to authentication to sqlserver2014a and Windows credentials to authenticate to sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaAgentServer -Source sqlserver2014a -Destination sqlcluster -WhatIf
```

Shows what would happen if the command were executed.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the Agent objects you want to copy. All jobs, schedules, operators, alerts, proxies, and server properties will be migrated from this instance.  
Must have sysadmin access and be SQL Server 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Target SQL Server instance(s) where Agent objects will be copied. Accepts multiple instances to copy the same configuration to several servers at once.  
Must have sysadmin access and be SQL Server 2000 or higher. Useful for standardizing Agent configurations across development, test, and production environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Authentication credentials for connecting to the Source SQL Server instance. Use this when you need SQL Server authentication instead of Windows authentication.  
Create credentials using Get-Credential and pass them to this parameter. Common when source server is in different domain or requires SQL login.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Authentication credentials for connecting to the Destination SQL Server instance(s). Use this when you need SQL Server authentication instead of Windows authentication.  
Create credentials using Get-Credential and pass them to this parameter. Required when destination servers use different authentication than your current context.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DisableJobsOnDestination

Disables all copied jobs on the destination instance after migration completes. Jobs will exist but won't run until manually enabled.  
Use this when copying to test environments where you don't want production jobs running automatically, or during staged migrations where jobs should remain inactive initially.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableJobsOnSource

Disables all jobs on the source instance after copying them to destination. Jobs will exist but won't run until manually re-enabled.  
Use this during server migrations when you want to prevent jobs from running on the old server after moving them to the new instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeServerProperties

Skips copying SQL Agent server-level configuration like job history retention settings, error log locations, database mail profiles, and service restart preferences.  
Use this when you only want to copy jobs and schedules but keep the destination server's existing Agent configuration settings intact.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Overwrites existing Agent objects on destination that have matching names from source. Objects are dropped first, then recreated with source configuration.  
Use this when you want to ensure destination matches source exactly, replacing any existing jobs, operators, or schedules with conflicting names.

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
