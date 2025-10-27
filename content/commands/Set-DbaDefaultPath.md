---
title: "Set-DbaDefaultPath"
slug: "Set-DbaDefaultPath"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Configures the default file paths for new databases and backups on SQL Server instances"
tags:
  - "Storage"
  - "Data"
  - "Logs"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDefaultPath.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDefaultPath"
draft: false
---

# Set-DbaDefaultPath

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDefaultPath](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDefaultPath.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDefaultPath](https://dataplat.github.io/boh#Set-DbaDefaultPath).

## Synopsis

Configures the default file paths for new databases and backups on SQL Server instances

## Description

Modifies the server-level default paths that SQL Server uses when creating new databases or performing backups without specifying explicit locations. This eliminates the need to manually specify file paths for routine database operations and ensures consistent placement of files across your environment.  
  
The function validates that the specified path is accessible to the SQL Server service account before making changes. When changing data or log paths, a SQL Server service restart is required for the changes to take effect. Backup path changes are immediate.  
  
To change the error log location, use Set-DbaStartupParameter

## Syntax

```powershell
Set-DbaDefaultPath
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Type] <String[]>]
    [-Path] <String>
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
PS C:\> Set-DbaDefaultPath -SqlInstance sql01\sharepoint -Type Data, Backup -Path C:\mssql\sharepoint\data
```

Sets the data and backup default paths on sql01\sharepoint to C:\mssql\sharepoint\data<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDefaultPath -SqlInstance sql01\sharepoint -Type Data, Log -Path C:\mssql\sharepoint\data -WhatIf
```

Shows what what happen if the command would have run<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Path

The directory path where SQL Server will create new database files or backups by default.  
Must be a valid path accessible to the SQL Server service account with appropriate permissions.  
Use UNC paths for shared storage or local paths like C:\Data for dedicated storage volumes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
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

##### -Type

Specifies which default path types to configure: Data (new database data files), Log (new database log files), or Backup (backup operations).  
Use Data and Log when standardizing database file locations across instances or moving files to faster storage.  
Backup path changes take effect immediately, while Data and Log changes require a SQL Server service restart.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |
| Accepted Values | Data,Backup,Log |

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
