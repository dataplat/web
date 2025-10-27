---
title: "Measure-DbaDiskSpaceRequirement"
slug: "Measure-DbaDiskSpaceRequirement"
date: 2024-01-01
layout: "single"
author: "Pollus Brodeur (@pollusb)"
availability: "Windows, Linux, macOS"
synopsis: "Calculates disk space requirements for database migration between SQL Server instances"
tags:
  - "Diagnostic"
  - "Storage"
  - "Space"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Measure-DbaDiskSpaceRequirement.ps1"
bohUrl: "https://dataplat.github.io/boh#Measure-DbaDiskSpaceRequirement"
draft: false
---

# Measure-DbaDiskSpaceRequirement

| Property | Value |
| --- | --- |
| **Author** | Pollus Brodeur (@pollusb) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Measure-DbaDiskSpaceRequirement](https://github.com/dataplat/dbatools/blob/master/public/Measure-DbaDiskSpaceRequirement.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Measure-DbaDiskSpaceRequirement](https://dataplat.github.io/boh#Measure-DbaDiskSpaceRequirement).

## Synopsis

Calculates disk space requirements for database migration between SQL Server instances

## Description

Analyzes database files on source and destination instances to calculate space requirements before migration. Shows file size differences, mount points, and identifies potential overwrites when copying databases between SQL Server instances.  
  
The function compares data and log files from the source database against existing files on the destination, accounting for scenarios where files exist only on source, only on destination, or on both sides. This prevents migration failures due to insufficient disk space and helps plan storage allocation.  
  
Accepts pipeline input with Source, Database, and Destination properties, making it ideal for bulk migration planning from CSV files, SQL queries, or PowerShell objects.

## Syntax

```powershell
Measure-DbaDiskSpaceRequirement
    [-Source] <DbaInstanceParameter>
    [-Database] <String>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter>
    [[-DestinationDatabase] <String>]
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Measure-DbaDiskSpaceRequirement -Source INSTANCE1 -Database DB1 -Destination INSTANCE2
```

Calculate space needed for a simple migration with one database with the same name at destination.<br>

#####  Example:  2 

```powershell
PS C:\> @(
>> [PSCustomObject]@{Source='SQL1';Destination='SQL2';Database='DB1'},
>> [PSCustomObject]@{Source='SQL1';Destination='SQL2';Database='DB2'}
>> ) | Measure-DbaDiskSpaceRequirement
```

Using a PSCustomObject with 2 databases to migrate on SQL2.<br>

#####  Example:  3 

```powershell
PS C:\> Import-Csv -Path .\migration.csv -Delimiter "`t" | Measure-DbaDiskSpaceRequirement | Format-Table -AutoSize
```

Using a CSV file. You will need to use this header line "Source<tab>Destination<tab>Database<tab>DestinationDatabase".<br>

#####  Example:  4 

```powershell
PS C:\> $qry = "SELECT Source, Destination, Database FROM dbo.Migrations"
PS C:\> Invoke-DbaCmd -SqlInstance DBA -Database Migrations -Query $qry | Measure-DbaDiskSpaceRequirement
```

Using a SQL table. We are DBA after all!<br>

### Required Parameters

##### -Source

Specifies the source SQL Server instance containing the database to analyze for migration.  
This is where the database currently exists and from which file sizes will be measured.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Database

Specifies the name of the database to analyze on the source instance.  
The database must exist on the source server as the function reads actual file sizes from this database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Destination

Specifies the destination SQL Server instance where the database will be migrated.  
Used to determine target file paths, check for existing databases with the same name, and calculate mount point requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
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
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -DestinationDatabase

Specifies the database name to use on the destination instance if different from the source database name.  
When omitted, the destination database will use the same name as the source database.  
Useful when migrating databases that need to be renamed or when avoiding naming conflicts on the destination server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -DestinationSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Credential

The credentials to use to connect via CIM/WMI/PowerShell remoting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
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


&nbsp;
