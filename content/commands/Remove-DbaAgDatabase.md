---
title: "Remove-DbaAgDatabase"
slug: "Remove-DbaAgDatabase"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes databases from availability groups on SQL Server instances."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgDatabase"
draft: false
---

# Remove-DbaAgDatabase

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgDatabase](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgDatabase.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgDatabase](https://dataplat.github.io/boh#Remove-DbaAgDatabase).

## Synopsis

Removes databases from availability groups on SQL Server instances.

## Description

Removes databases from availability groups, effectively stopping replication and high availability protection for those databases. This is commonly needed when decommissioning databases, reconfiguring availability group membership during maintenance windows, or troubleshooting replication issues. The function safely removes the database from all replicas in the availability group while preserving the actual database files on each replica. You can target specific databases and availability groups, or use pipeline input from Get-DbaAgDatabase to remove multiple databases efficiently.

## Syntax

```powershell
Remove-DbaAgDatabase
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-AvailabilityGroup] <String[]>]
    [[-InputObject] <Object[]>]
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
PS C:\> Remove-DbaAgDatabase -SqlInstance sqlserver2012 -AvailabilityGroup ag1, ag2 -Confirm:$false
```

Removes all databases from the ag1 and ag2 availability groups on sqlserver2012.  Does not prompt for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaAgDatabase -SqlInstance sqlserver2012 -AvailabilityGroup ag1 -Database pubs -Confirm:$false
```

Removes the pubs database from the ag1 availability group on sqlserver2012.  Does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sqlserver2012 -AvailabilityGroup availabilitygroup1 | Remove-DbaAgDatabase
```

Removes the availability groups returned from the Get-DbaAvailabilityGroup function. Prompts for confirmation.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2012 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to remove from their availability groups. Accepts multiple database names as an array.  
Required when using SqlInstance parameter. Use this to target specific databases rather than removing all databases from an availability group.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

Limits the operation to databases within specific availability groups. When specified, only databases belonging to these availability groups will be removed.  
Useful when you have databases with the same name across multiple availability groups and need to target specific groups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group database objects from Get-DbaAgDatabase or database objects from Get-DbaDatabase through the pipeline.  
This enables efficient batch operations and complex filtering scenarios using the pipeline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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
