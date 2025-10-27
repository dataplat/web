---
title: "Set-DbaDbFileGroup"
slug: "Set-DbaDbFileGroup"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Modifies filegroup properties including default designation, read-only status, and auto-grow behavior."
tags:
  - "Storage"
  - "Data"
  - "File"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbFileGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbFileGroup"
draft: false
---

# Set-DbaDbFileGroup

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbFileGroup](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbFileGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbFileGroup](https://dataplat.github.io/boh#Set-DbaDbFileGroup).

## Synopsis

Modifies filegroup properties including default designation, read-only status, and auto-grow behavior.

## Description

Modifies key properties of database filegroups including setting the default filegroup for new objects, changing read-only status for data archival, and configuring auto-grow behavior across all files in the filegroup. Use this when you need to restructure database storage layout, implement data archival strategies, or optimize file growth patterns. The function validates that filegroups exist and contain at least one file before applying changes.

## Syntax

```powershell
Set-DbaDbFileGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-FileGroup] <String[]>]
    [-Default]
    [-ReadOnly]
    [-AutoGrowAllFiles]
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
PS C:\> Set-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1 -Default -AutoGrowAllFiles
```

Sets the HRFG1 filegroup to auto grow all files and makes it the default filegroup on the TestDb database on the sqldev1 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1 -AutoGrowAllFiles:$false
```

Sets the HRFG1 filegroup to not auto grow all files on the TestDb database on the sqldev1 instance.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1 -ReadOnly
```

Sets the HRFG1 filegroup to read only on the TestDb database on the sqldev1 instance.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1 -ReadOnly:$false
```

Sets the HRFG1 filegroup to read/write on the TestDb database on the sqldev1 instance.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev1 -Database TestDb | Set-DbaDbFileGroup -FileGroup HRFG1 -AutoGrowAllFiles
```

Passes in the TestDB database from the sqldev1 instance and sets the HRFG1 filegroup to auto grow all files.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbFileGroup -SqlInstance sqldev1 -Database TestDb -FileGroup HRFG1 | Set-DbaDbFileGroup -AutoGrowAllFiles
```

Passes in the HRFG1 filegroup from the TestDB database on the sqldev1 instance and sets it to auto grow all files.<br>

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

Specifies which databases contain the filegroups to modify. Required when using SqlInstance parameter.  
Use this to target specific databases when working with filegroup configurations across multiple databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileGroup

Specifies the name(s) of the filegroup(s) to modify. The filegroup must exist and contain at least one file.  
Use this to target specific filegroups when you need to change their default status, read-only setting, or auto-grow behavior.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Default

Sets the filegroup as the default filegroup for new database objects like tables and indexes.  
Use this when restructuring storage layout or when you want new objects created in a specific filegroup instead of PRIMARY.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ReadOnly

Controls the read-only status of the filegroup to prevent data modifications for archival or compliance purposes.  
Set to $true for read-only (common for historical data), or $false to restore read-write access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AutoGrowAllFiles

Enables proportional growth across all files in the filegroup when any file reaches its growth threshold.  
Use this to maintain balanced file sizes and prevent hotspots, especially important for tempdb and high-transaction filegroups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database or filegroup objects from Get-DbaDatabase or Get-DbaDbFileGroup via pipeline.  
Use this for efficient processing when working with multiple databases or filegroups from previous commands.

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
