---
title: "Remove-DbaDbPartitionFunction"
slug: "Remove-DbaDbPartitionFunction"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Drops partition functions from SQL Server databases to clean up unused partitioning schemes."
tags:
  - "PartitionFunction"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbPartitionFunction.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbPartitionFunction"
draft: false
---

# Remove-DbaDbPartitionFunction

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbPartitionFunction](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbPartitionFunction.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbPartitionFunction](https://dataplat.github.io/boh#Remove-DbaDbPartitionFunction).

## Synopsis

Drops partition functions from SQL Server databases to clean up unused partitioning schemes.

## Description

Removes partition functions from specified databases across one or more SQL Server instances. Partition functions define the value ranges used to split table data across multiple filegroups, and removing unused functions helps maintain a clean database schema. This command is commonly used during partition cleanup operations, schema migrations, or when decommissioning partitioned tables that no longer require their associated partition functions.

## Syntax

```powershell
Remove-DbaDbPartitionFunction
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-ExcludeDatabase <Object[]>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbPartitionFunction
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-ExcludeDatabase <Object[]>]
    -InputObject <PartitionFunction[]>
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
PS C:\> Remove-DbaDbPartitionFunction -SqlInstance localhost, sql2016 -Database db1, db2
```

Removes partition functions from db1 and db2 on the local and sql2016 SQL Server instances.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbPartitionFunction -SqlInstance SRV1 | Out-GridView -Title 'Select partition function(s) to drop' -OutputMode Multiple | Remove-DbaDbPartitionFunction
```

Using a pipeline this command gets all partition functions on SRV1, lets the user select those to remove and then removes the selected partition functions.<br>

### Required Parameters

##### -InputObject

Accepts partition function objects from Get-DbaDbPartitionFunction for targeted removal operations.  
Use this with pipeline operations when you need to selectively remove specific partition functions based on criteria like name patterns, usage, or dependencies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies the database(s) from which to remove partition functions. Accepts wildcard patterns for matching multiple databases.  
Use this to target specific databases when you need to clean up partitioning objects from particular databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes the specified database(s) from partition function removal operations. Auto-populated with available databases from the target server.  
Use this when you want to remove partition functions from most databases but need to preserve them in specific databases like production or critical systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
This is the default. Use -Confirm:$false to suppress these prompts.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
