---
title: "Mount-DbaDatabase"
slug: "Mount-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Attaches detached database files to a SQL Server instance"
tags:
  - "Attach"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Mount-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Mount-DbaDatabase"
draft: false
---

# Mount-DbaDatabase

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Mount-DbaDatabase](https://github.com/dataplat/dbatools/blob/master/public/Mount-DbaDatabase.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Mount-DbaDatabase](https://dataplat.github.io/boh#Mount-DbaDatabase).

## Synopsis

Attaches detached database files to a SQL Server instance

## Description

Attaches detached database files (.mdf, .ldf, .ndf) back to a SQL Server instance, making the database available for use again. When database files exist on disk but the database is not registered in the SQL Server instance, this command reconnects them using the SQL Server Management Objects (SMO) AttachDatabase method.  
  
If you don't specify the file structure, the command attempts to determine the correct database files by examining backup history for the most recent full backup. This is particularly useful when restoring databases from file copies or moving databases between instances where the files already exist but need to be reattached.

## Syntax

```powershell
Mount-DbaDatabase
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Database] <String[]>
    [[-FileStructure] <StringCollection>]
    [[-DatabaseOwner] <String>]
    [[-AttachOption] <String>]
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
PS C:\> $fileStructure = New-Object System.Collections.Specialized.StringCollection
PS C:\> $fileStructure.Add("E:\archive\example.mdf")
PS C:\> $filestructure.Add("E:\archive\example.ldf")
PS C:\> $filestructure.Add("E:\archive\example.ndf")
PS C:\> Mount-DbaDatabase -SqlInstance sql2016 -Database example -FileStructure $fileStructure
```

Attaches a database named "example" to sql2016 with the files "E:\archive\example.mdf", "E:\archive\example.ldf" and "E:\archive\example.ndf". The database owner will be set to sa and the attach <br>
option is None.<br>

#####  Example:  2 

```powershell
PS C:\> Mount-DbaDatabase -SqlInstance sql2016 -Database example
```

Since the FileStructure was not provided, this command will attempt to determine it based on backup history. If found, a database named example will be attached to sql2016.<br>

#####  Example:  3 

```powershell
PS C:\> Mount-DbaDatabase -SqlInstance sql2016 -Database example -WhatIf
```

Shows what would happen if the command were executed (without actually performing the command)<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Database

Specifies the names of the detached databases to attach to the SQL Server instance.  
Use this when you have database files (.mdf, .ldf, .ndf) on disk but the database is no longer registered in SQL Server.

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

##### -FileStructure

Specifies the complete collection of database file paths (.mdf, .ldf, .ndf) required to attach the database.  
When omitted, the command attempts to determine file locations automatically using backup history from the most recent full backup.  
Use this parameter when files are in non-standard locations or when automatic detection fails.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DatabaseOwner

Sets the login account that will own the attached database.  
When not specified, defaults to the sa account or the SQL Server sysadmin with ID 1 if sa is not available.  
Use this to assign ownership to a specific login for security or administrative requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AttachOption

Controls how SQL Server handles the database attachment process and Service Broker configuration.  
Use 'RebuildLog' when transaction log files are missing or corrupt, 'EnableBroker' to activate Service Broker, or 'NewBroker' to create a new Service Broker identifier.  
Defaults to 'None' for standard attachment without special handling.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | None |
| Accepted Values | None,RebuildLog,EnableBroker,NewBroker,ErrorBrokerConversations |

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
