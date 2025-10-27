---
title: "New-DbaDbDataGeneratorConfig"
slug: "New-DbaDbDataGeneratorConfig"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Creates JSON configuration files for generating realistic test data in SQL Server database tables"
tags:
  - "DataGeneration"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbDataGeneratorConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbDataGeneratorConfig"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbDataGeneratorConfig</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbDataGeneratorConfig.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad, sqlstad.nl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates JSON configuration files for generating realistic test data in SQL Server database tables

## Description

Analyzes database table structures and generates JSON configuration files that define how to populate each column with realistic fake data. The function examines column names, data types, constraints, and relationships to intelligently map appropriate data generation rules using the Bogus library. Column names matching common patterns (like "Address", "Email", "Phone") automatically get contextually appropriate fake data types, while other columns get sensible defaults based on their SQL data types.  
  
These configuration files serve as the blueprint for Invoke-DbaDbDataGenerator, allowing DBAs to create development databases with realistic test data instead of using production data. Perfect for building demo environments, testing applications with meaningful datasets, or creating training databases that mirror production schemas but contain no sensitive information.  
  
The function handles identity columns, foreign key relationships, unique indexes, and nullable constraints while skipping unsupported column types like computed columns, spatial data types, and XML. Configuration files are saved with the naming convention "servername.databasename.DataGeneratorConfig.json" for easy identification and reuse.  
  
Read more here:  
https://sachabarbs.wordpress.com/2018/06/11/bogus-simple-fake-data-tool/  
https://github.com/bchavez/Bogus

## Syntax

```powershell
New-DbaDbDataGeneratorConfig
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Table] <String[]>]
    [-ResetIdentity]
    [-TruncateTable]
    [[-Rows] <Int32>]
    [-Path] <String>
    [-Force]
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
PS C:\> New-DbaDbDataGeneratorConfig -SqlInstance SQLDB1 -Database DB1 -Path C:\Temp\clone
```
{: data-copyable="true" data-clean-code="New-DbaDbDataGeneratorConfig -SqlInstance SQLDB1 -Database DB1 -Path C:\Temp\clone" }

Process all tables and columns for database DB1 on instance SQLDB1<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbDataGeneratorConfig -SqlInstance SQLDB1 -Database DB1 -Table Customer -Path C:\Temp\clone
```
{: data-copyable="true" data-clean-code="New-DbaDbDataGeneratorConfig -SqlInstance SQLDB1 -Database DB1 -Table Customer -Path C:\Temp\clone" }

Process only table Customer with all the columns<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory where JSON configuration files will be saved. Files are named using the pattern "servername.databasename.DataGeneratorConfig.json".  
Choose a location accessible to your development team since these config files will be used by Invoke-DbaDbDataGenerator to create the actual test data.

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

Specifies which databases to analyze for data generation configuration creation. Accepts multiple database names.  
Use this when you need to create test data configs for specific databases instead of all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies which tables to include in the data generation configuration. Accepts multiple table names and supports wildcards.  
Use this when you only need test data for specific tables rather than analyzing the entire database schema.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ResetIdentity

Controls whether identity columns should reset to their seed values when generating test data. When enabled, identity values start from the original seed.  
Use this when you need predictable, consistent identity values across test data generation runs instead of continuing from existing maximum values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -TruncateTable

Enables table truncation before inserting generated test data. When specified, existing data is removed before populating with fake data.  
Use this when you need clean test environments or want to replace all existing data rather than appending to current table contents.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Rows

Sets the number of test data rows to generate for each table in the configuration. Defaults to 1000 rows per table.  
Adjust this based on your testing needs - use smaller values for development environments or larger values for performance testing scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1000 |

##### -Force

Allows the function to create the specified Path directory if it doesn't exist. Without this switch, the function will fail if the target directory is missing.  
Use this when setting up new test data workflows where the output directory structure hasn't been established yet.

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
