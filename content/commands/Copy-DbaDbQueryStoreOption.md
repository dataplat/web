---
title: "Copy-DbaDbQueryStoreOption"
slug: "Copy-DbaDbQueryStoreOption"
date: 2024-01-01
layout: "single"
author: "Enrico van de Laar (@evdlaar) | Tracy Boggiano (@Tracy Boggiano)"
availability: "Windows, Linux, macOS"
synopsis: "Replicates Query Store configuration settings from one database to multiple target databases across instances."
tags:
  - "QueryStore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbQueryStoreOption.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaDbQueryStoreOption"
draft: false
---

# Copy-DbaDbQueryStoreOption

| Property | Value |
| --- | --- |
| **Author** | Enrico van de Laar (@evdlaar) , Tracy Boggiano (@Tracy Boggiano) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaDbQueryStoreOption](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbQueryStoreOption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaDbQueryStoreOption](https://dataplat.github.io/boh#Copy-DbaDbQueryStoreOption).

## Synopsis

Replicates Query Store configuration settings from one database to multiple target databases across instances.

## Description

Reads the complete Query Store configuration from a source database and applies those exact settings to specified destination databases. This lets you standardize Query Store behavior across your environment using proven configurations from production databases. The function handles version-specific settings automatically, supporting SQL Server 2016 through current versions with their respective Query Store features like wait statistics capture and custom capture policies.

## Syntax

```powershell
Copy-DbaDbQueryStoreOption
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-SourceDatabase] <Object>
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-DestinationDatabase] <Object[]>]
    [[-Exclude] <Object[]>]
    [-AllDatabases]
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
PS C:\> Copy-DbaDbQueryStoreOption -Source ServerA\SQL -SourceDatabase AdventureWorks -Destination ServerB\SQL -AllDatabases
```

Copy the Query Store configuration of the AdventureWorks database in the ServerA\SQL instance and apply it on all user databases in the ServerB\SQL Instance.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaDbQueryStoreOption -Source ServerA\SQL -SourceDatabase AdventureWorks -Destination ServerB\SQL -DestinationDatabase WorldWideTraders
```

Copy the Query Store configuration of the AdventureWorks database in the ServerA\SQL instance and apply it to the WorldWideTraders database in the ServerB\SQL Instance.<br>

### Required Parameters

##### -Source

The SQL Server instance containing the database with Query Store configuration you want to copy from.  
You must have sysadmin access and server version must be SQL Server 2016 or higher since Query Store was introduced in SQL Server 2016.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -SourceDatabase

The database containing the Query Store configuration you want to replicate to other databases.  
This database should have Query Store enabled with settings you've tested and want to standardize across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Destination

The SQL Server instance(s) where you want to apply the Query Store configuration to target databases.  
You must have sysadmin access and the server must be SQL Server 2016 or higher. Supports multiple destination instances for bulk configuration deployment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationDatabase

Specifies which specific databases should receive the Query Store configuration from the source database.  
Use this when you want to apply settings to selected databases rather than all databases on the destination instance.  
Cannot be used together with AllDatabases parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Exclude

Databases to skip when copying Query Store configuration, useful when using AllDatabases but want to exclude specific databases.  
System databases are automatically excluded since Query Store cannot be enabled on them.  
Commonly used to exclude test databases or databases with special Query Store requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllDatabases

Applies the Query Store configuration to all user databases on the destination instance.  
System databases are automatically excluded since Query Store is not supported on them.  
Use this for standardizing Query Store settings across an entire instance, optionally combined with Exclude parameter for exceptions.

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
