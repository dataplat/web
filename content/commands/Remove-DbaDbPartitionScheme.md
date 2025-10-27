---
title: "Remove-DbaDbPartitionScheme"
slug: "Remove-DbaDbPartitionScheme"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes database partition schemes from SQL Server databases."
tags:
  - "PartitionScheme"
  - "Partition"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbPartitionScheme.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbPartitionScheme"
draft: false
---

# Remove-DbaDbPartitionScheme

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbPartitionScheme](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbPartitionScheme.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbPartitionScheme](https://dataplat.github.io/boh#Remove-DbaDbPartitionScheme).

## Synopsis

Removes database partition schemes from SQL Server databases.

## Description

Removes partition schemes from specified databases across one or more SQL Server instances. Partition schemes define how partitioned tables and indexes map to filegroups, and this function helps clean up unused schemes during database reorganization or migration projects.  
  
The function integrates seamlessly with Get-DbaDbPartitionScheme through pipeline support, allowing you to first identify partition schemes and then selectively remove them. This is particularly useful when consolidating databases or simplifying partition strategies.  
  
Each removal operation includes confirmation prompts by default to prevent accidental deletion of partition schemes that may still be referenced by tables or indexes.

## Syntax

```powershell
Remove-DbaDbPartitionScheme
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-ExcludeDatabase <Object[]>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbPartitionScheme
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-ExcludeDatabase <Object[]>]
    -InputObject <PartitionScheme[]>
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
PS C:\> Remove-DbaDbPartitionScheme -SqlInstance localhost, sql2016 -Database db1, db2
```

Removes partition schemes from db1 and db2 on the local and sql2016 SQL Server instances.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbPartitionScheme -SqlInstance SRV1 | Out-GridView -Title 'Select partition scheme(s) to drop' -OutputMode Multiple | Remove-DbaDbPartitionScheme
```

Using a pipeline this command gets all partition schemes on SRV1, lets the user select those to remove and then removes the selected partition schemes.<br>

### Required Parameters

##### -InputObject

Accepts partition scheme objects piped from Get-DbaDbPartitionScheme for targeted removal operations.  
Use this for selective removal workflows where you first identify specific partition schemes and then remove only those schemes.

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

Specifies which databases to scan for partition schemes to remove. Accepts multiple database names.  
Use this when you need to remove partition schemes from specific databases rather than all databases on the instance, such as during database decommissioning or partition strategy simplification.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when scanning for partition schemes to remove. Accepts multiple database names.  
Use this to exclude system databases or specific databases you want to preserve during bulk partition scheme cleanup operations.

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
