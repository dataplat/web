---
title: "New-DbaDbFileGroup"
slug: "New-DbaDbFileGroup"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Creates new filegroups in SQL Server databases for custom data storage organization."
tags:
  - "Storage"
  - "Data"
  - "File"
  - "FileGroup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbFileGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbFileGroup"
draft: false
---

# New-DbaDbFileGroup

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbFileGroup](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbFileGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbFileGroup](https://dataplat.github.io/boh#New-DbaDbFileGroup).

## Synopsis

Creates new filegroups in SQL Server databases for custom data storage organization.

## Description

Creates a new filegroup for the specified database(s), supporting standard row data, FileStream, and memory-optimized storage types. This is useful when you need to separate table storage across different disk drives for performance optimization, implement compliance requirements, or organize data by department or function. The filegroup is created empty and requires adding data files with Add-DbaDbFile before it can store data. Use Set-DbaDbFileGroup to configure advanced properties like read-only status or default settings after files are added.

## Syntax

```powershell
New-DbaDbFileGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-FileGroup] <String>]
    [[-FileGroupType] <String>]
    [[-InputObject] <Database[]>]
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
PS C:\> New-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1
```

Creates the HRFG1 filegroup on the TestDb database on the sqldev1 instance with the default options for the filegroup.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1 -FileGroupType FileStreamDataFileGroup
```

Creates a filestream filegroup named HRFG1 on the TestDb database on the sqldev1 instance.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1 -FileGroupType MemoryOptimizedDataFileGroup
```

Creates a MemoryOptimized data filegroup named HRFG1 on the TestDb database on the sqldev1 instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev1 -Database TestDb | New-DbaDbFileGroup -FileGroup HRFG1
```

Passes in the TestDB database via pipeline and creates the HRFG1 filegroup on the TestDb database on the sqldev1 instance.<br>

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

Specifies the database(s) where the new filegroup will be created. Supports multiple database names for bulk operations.  
Use this when you need to create the same filegroup structure across multiple databases for consistency.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileGroup

Sets the name for the new filegroup being created. The name must be unique within the database and follow SQL Server naming conventions.  
Use descriptive names like 'HR_Data' or 'Archive_FG' to indicate the data's purpose or department for better organization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileGroupType

Defines the storage type for the filegroup: RowsFileGroup for regular tables and indexes, FileStreamDataFileGroup for FILESTREAM data like documents and images, or MemoryOptimizedDataFileGroup for   
In-Memory OLTP tables.  
Most scenarios use the default RowsFileGroup unless you're specifically implementing FILESTREAM or In-Memory OLTP features.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | RowsFileGroup |
| Accepted Values | FileStreamDataFileGroup,MemoryOptimizedDataFileGroup,RowsFileGroup |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline operations. This enables you to filter databases first, then create filegroups on the selected ones.  
Useful when working with multiple databases that match specific criteria rather than specifying database names directly.

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
