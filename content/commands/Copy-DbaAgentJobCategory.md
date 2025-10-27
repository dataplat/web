---
title: "Copy-DbaAgentJobCategory"
slug: "Copy-DbaAgentJobCategory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies custom SQL Agent categories for jobs, alerts, and operators between SQL Server instances."
tags:
  - "Migration"
  - "Agent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentJobCategory.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaAgentJobCategory"
draft: false
---

# Copy-DbaAgentJobCategory

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaAgentJobCategory](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentJobCategory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaAgentJobCategory](https://dataplat.github.io/boh#Copy-DbaAgentJobCategory).

## Synopsis

Copies custom SQL Agent categories for jobs, alerts, and operators between SQL Server instances.

## Description

Migrates custom SQL Agent categories from a source SQL Server to one or more destination servers, so you don't have to manually recreate organizational structures during server migrations or environment setups.  
This function copies only user-defined categories (ID >= 100), preserving built-in system categories on the destination.  
Essential for maintaining consistent job categorization across multiple SQL Server instances in enterprise environments.  
  
You can copy all categories at once or filter by category type (Job, Alert, Operator) or specify individual category names.  
Categories that already exist on the destination will be skipped unless you use -Force to drop and recreate them.  
The function uses SQL Server Management Objects (SMO) to script category definitions and recreate them on the target server.

## Syntax

```powershell
Copy-DbaAgentJobCategory -Source <DbaInstanceParameter>
    [-SourceSqlCredential <PSCredential>]
    -Destination <DbaInstanceParameter[]>
    [-DestinationSqlCredential <PSCredential>]
    [-JobCategory <String[]>]
    [-AgentCategory <String[]>]
    [-OperatorCategory <String[]>]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Copy-DbaAgentJobCategory -Source <DbaInstanceParameter>
    [-SourceSqlCredential <PSCredential>]
    -Destination <DbaInstanceParameter[]>
    [-DestinationSqlCredential <PSCredential>]
    [-CategoryType <String[]>]
    [-JobCategory <String[]>]
    [-AgentCategory <String[]>]
    [-OperatorCategory <String[]>]
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
PS C:\> Copy-DbaAgentJobCategory -Source sqlserver2014a -Destination sqlcluster
```

Copies all operator categories from sqlserver2014a to sqlcluster using Windows authentication. If operator categories with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaAgentJobCategory -Source sqlserver2014a -Destination sqlcluster -OperatorCategory PSOperator -SourceSqlCredential $cred -Force
```

Copies a single operator category, the PSOperator operator category from sqlserver2014a to sqlcluster using SQL credentials to authenticate to sqlserver2014a and Windows credentials for sqlcluster. <br>
If an operator category with the same name exists on sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaAgentJobCategory -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

The source SQL Server instance from which to copy Agent job categories. Requires sysadmin permissions to access MSDB and read category definitions.  
Use this to specify the server that has the custom categories you want to replicate to other instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

One or more destination SQL Server instances where the Agent job categories will be created. Accepts an array to copy categories to multiple servers simultaneously.  
Requires sysadmin permissions to create categories in each destination server's MSDB database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Alternative credentials for connecting to the source SQL Server instance. Use this when your current Windows authentication doesn't have sufficient permissions on the source server.  
Accepts credentials created with Get-Credential for SQL authentication or different Windows accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Alternative credentials for connecting to the destination SQL Server instances. Use this when different authentication is needed for the destination servers than your current context.  
Accepts credentials created with Get-Credential and applies to all destination servers specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CategoryType

Filters the copy operation to specific category types: Job, Alert, or Operator. When specified, copies all categories of the selected type(s) from the source.  
Use this for bulk migration of entire category types rather than individual category names. Leave empty to copy all category types.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Job,Alert,Operator |

##### -JobCategory

Specific job category names to copy from the source server. Use this for selective migration when you only need certain job categories.  
Supports tab completion from the source server's existing job categories for convenience.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AgentCategory

Specific alert category names to copy from the source server. Use this for selective migration when you only need certain alert categories.  
Note: This parameter is currently not implemented in the function code and will be ignored if used.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -OperatorCategory

Specific operator category names to copy from the source server. Use this for selective migration when you only need certain operator categories.  
Supports tab completion from the source server's existing operator categories for convenience.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops and recreates existing categories on the destination servers instead of skipping them. Use this when you need to overwrite categories that have changed on the source.  
Without this switch, categories that already exist on the destination will be skipped to prevent data loss.

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
