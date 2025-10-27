---
title: "Copy-DbaAgentAlert"
slug: "Copy-DbaAgentAlert"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Server Agent alerts from source instance to destination instances"
tags:
  - "Migration"
  - "Agent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentAlert.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaAgentAlert"
draft: false
---

# Copy-DbaAgentAlert

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaAgentAlert](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentAlert.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaAgentAlert](https://dataplat.github.io/boh#Copy-DbaAgentAlert).

## Synopsis

Copies SQL Server Agent alerts from source instance to destination instances

## Description

Transfers SQL Server Agent alerts from a source instance to one or more destination instances, preserving their configurations, notification settings, and job associations. This function handles the complex dependencies between alerts, operators, and jobs automatically, ensuring alerts work properly after migration.  
  
Essential for server migrations, disaster recovery preparation, and standardizing monitoring across multiple SQL Server environments. Prevents manual recreation of dozens of alerts and their intricate notification chains.  
  
By default, all alerts are copied, but you can specify individual alerts with the -Alert parameter. Existing alerts are skipped unless -Force is used to overwrite them.

## Syntax

```powershell
Copy-DbaAgentAlert
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Alert] <Object[]>]
    [[-ExcludeAlert] <Object[]>]
    [-IncludeDefaults]
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
PS C:\> Copy-DbaAgentAlert -Source sqlserver2014a -Destination sqlcluster
```

Copies all alerts from sqlserver2014a to sqlcluster using Windows credentials. If alerts with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaAgentAlert -Source sqlserver2014a -Destination sqlcluster -Alert PSAlert -SourceSqlCredential $cred -Force
```

Copies a only the alert named PSAlert from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If an alert with the same name exists on <br>
sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaAgentAlert -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

Specifies the source SQL Server instance containing the alerts to copy. Must be SQL Server 2000 or higher.  
Use this to identify the server with the alert configurations you want to migrate or replicate.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Specifies one or more destination SQL Server instances where alerts will be copied. Must be SQL Server 2000 or higher.  
Accepts multiple instances to copy alerts to several servers simultaneously during migrations or standardization efforts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Specifies alternative credentials for connecting to the source SQL Server instance.  
Use this when the current Windows credentials don't have access to the source server or when connecting with SQL Server authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Specifies alternative credentials for connecting to the destination SQL Server instances.  
Use this when the current Windows credentials don't have access to destination servers or when connecting with SQL Server authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Alert

Specifies specific alert names to copy instead of copying all alerts from the source instance.  
Use this when you only need to migrate particular alerts rather than the entire alert configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAlert

Specifies alert names to skip during the copy operation while processing all other alerts.  
Use this when you want to copy most alerts but exclude specific ones that shouldn't be migrated.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeDefaults

Copies SQL Server Agent system settings including FailSafeEmailAddress, ForwardingServer, and PagerSubjectTemplate.  
Use this when migrating to a new server where you want to replicate the source server's Agent notification configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates alerts that already exist on the destination servers instead of skipping them.  
Use this when you need to overwrite existing alerts with updated configurations from the source.

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
