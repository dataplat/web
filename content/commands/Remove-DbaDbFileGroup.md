---
title: "Remove-DbaDbFileGroup"
slug: "Remove-DbaDbFileGroup"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Removes empty filegroups from SQL Server databases."
tags:
  - "Storage"
  - "Data"
  - "File"
  - "FileGroup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbFileGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbFileGroup"
draft: false
---

# Remove-DbaDbFileGroup

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbFileGroup](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbFileGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbFileGroup](https://dataplat.github.io/boh#Remove-DbaDbFileGroup).

## Synopsis

Removes empty filegroups from SQL Server databases.

## Description

Removes one or more filegroups from SQL Server databases after validating they contain no data files. This command is useful for cleaning up unused filegroups after moving data to different filegroups or during database reorganization projects. The function performs safety checks to ensure filegroups are empty before removal and provides detailed error messages if removal fails due to dependencies or constraints.

## Syntax

```powershell
Remove-DbaDbFileGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-FileGroup] <String[]>]
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
PS C:\> Remove-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1
```

Removes the HRFG1 filegroup on the TestDb database on the sqldev1 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev1 -Database TestDb | Remove-DbaDbFileGroup -FileGroup HRFG1
```

Passes in the TestDB database from the sqldev1 instance and removes the HRFG1 filegroup.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1 | Remove-DbaDbFileGroup
```

Passes in the HRFG1 filegroup from the TestDB database on the sqldev1 instance and removes the filegroup.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

Specifies which databases to target for filegroup removal. Required when using SqlInstance parameter.  
Use this to limit the operation to specific databases instead of all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileGroup

Specifies the name(s) of the filegroup(s) to remove from the target databases. Required when specifying databases directly.  
Only empty filegroups (containing no data files) can be removed. Common scenarios include removing filegroups after data migration or database cleanup projects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database or filegroup objects from Get-DbaDatabase or Get-DbaDbFileGroup for pipeline operations.  
Use this when you need to remove filegroups from a filtered set of databases or when working with specific filegroup objects.

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
