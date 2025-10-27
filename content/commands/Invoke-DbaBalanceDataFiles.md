---
title: "Invoke-DbaBalanceDataFiles"
slug: "Invoke-DbaBalanceDataFiles"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Re-balance data between data files"
tags:
  - "Database"
  - "FileManagement"
  - "File"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaBalanceDataFiles.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaBalanceDataFiles"
draft: false
---

# Invoke-DbaBalanceDataFiles

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaBalanceDataFiles](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaBalanceDataFiles.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaBalanceDataFiles](https://dataplat.github.io/boh#Invoke-DbaBalanceDataFiles).

## Synopsis

Re-balance data between data files

## Description

When you have a large database with a single data file and add another file, SQL Server will only use the new file until it's about the same size.  
You may want to balance the data between all the data files.  
  
The function will check the server version and edition to see if the it allows for online index rebuilds.  
If the server does support it, it will try to rebuild the index online.  
If the server doesn't support it, it will rebuild the index offline. Be carefull though, this can cause downtime  
  
The tables must have a clustered index to be able to balance out the data.  
The function does NOT yet support heaps.  
  
The function will also check if the file groups are subject to balance out.  
A file group would have at least have 2 data files and should be writable.  
If a table is within such a file group it will be subject for processing. If not the table will be skipped.  
  
Note: this command does not perform a disk space check for non-Windows machines so make sure you have enough space on the disk.

## Syntax

```powershell
Invoke-DbaBalanceDataFiles
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-Table <Object[]>]
    [-RebuildOffline]
    [-EnableException]
    [-Force]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Invoke-DbaBalanceDataFiles -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-Table <Object[]>]
    [-RebuildOffline]
    [-EnableException]
    [-Force]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaBalanceDataFiles -SqlInstance sql1 -Database db1
```

This command will distribute the data in database db1 on instance sql1<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaBalanceDataFiles -SqlInstance sql1 -Database db1 | Select-Object -ExpandProperty DataFilesEnd
```

This command will distribute the data in database db1 on instance sql1<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaBalanceDataFiles -SqlInstance sql1 -Database db1 -Table table1,table2,table5
```

This command will distribute the data for only the tables table1,table2 and table5<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaBalanceDataFiles -SqlInstance sql1 -Database db1 -RebuildOffline
```

This command will consider the fact that there might be a SQL Server edition that does not support online rebuilds of indexes.<br>
By supplying this parameter you give permission to do the rebuilds offline if the edition does not support it.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

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

Specifies which databases to balance data files for. Only databases with multiple data files can be balanced.  
This parameter is required since the function needs specific databases to process for data file balancing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies which tables to balance data for within the target databases. Only tables with clustered indexes in file groups containing multiple data files will be processed.  
When omitted, all eligible tables in the database will be processed. Use this to target specific large tables that need data redistribution.

| Property | Value |
| --- | --- |
| Alias | Tables |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RebuildOffline

Forces all clustered index rebuilds to occur offline, which redistributes data between files but blocks table access during the operation.  
Use this switch when you need to balance data files but can accept downtime, or when working with SQL Server editions that don't support online index operations (Standard, Express, Web).

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

##### -Force

Bypasses the disk space validation check that ensures sufficient free space exists before balancing data files.  
Use this when you're confident about available disk space or when working with non-Windows SQL Server instances where disk space checks may not work properly.

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
