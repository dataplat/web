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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Measure-DbaDiskSpaceRequirement</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Measure-DbaDiskSpaceRequirement.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Pollus Brodeur (@pollusb)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Measure-DbaDiskSpaceRequirement -Source INSTANCE1 -Database DB1 -Destination INSTANCE2" }

Calculate space needed for a simple migration with one database with the same name at destination.<br>

#####  Example:  2 

```powershell
PS C:\> @(
>> [PSCustomObject]@{Source='SQL1';Destination='SQL2';Database='DB1'},
>> [PSCustomObject]@{Source='SQL1';Destination='SQL2';Database='DB2'}
>> ) | Measure-DbaDiskSpaceRequirement
```
{: data-copyable="true" data-clean-code="@(
[PSCustomObject]@{Source='SQL1';Destination='SQL2';Database='DB1'},
[PSCustomObject]@{Source='SQL1';Destination='SQL2';Database='DB2'}
) | Measure-DbaDiskSpaceRequirement" }

Using a PSCustomObject with 2 databases to migrate on SQL2.<br>

#####  Example:  3 

```powershell
PS C:\> Import-Csv -Path .\migration.csv -Delimiter "`t" | Measure-DbaDiskSpaceRequirement | Format-Table -AutoSize
```
{: data-copyable="true" data-clean-code="Import-Csv -Path .\migration.csv -Delimiter &quot;`t&quot; | Measure-DbaDiskSpaceRequirement | Format-Table -AutoSize" }

Using a CSV file. You will need to use this header line "Source<tab>Destination<tab>Database<tab>DestinationDatabase".<br>

#####  Example:  4 

```powershell
PS C:\> $qry = "SELECT Source, Destination, Database FROM dbo.Migrations"
PS C:\> Invoke-DbaCmd -SqlInstance DBA -Database Migrations -Query $qry | Measure-DbaDiskSpaceRequirement
```
{: data-copyable="true" data-clean-code="$qry = &quot;SELECT Source, Destination, Database FROM dbo.Migrations&quot;
Invoke-DbaCmd -SqlInstance DBA -Database Migrations -Query $qry | Measure-DbaDiskSpaceRequirement" }

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
