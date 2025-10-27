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

# New-DbaDbDataGeneratorConfig

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad, sqlstad.nl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbDataGeneratorConfig](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbDataGeneratorConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbDataGeneratorConfig](https://dataplat.github.io/boh#New-DbaDbDataGeneratorConfig).

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

Process all tables and columns for database DB1 on instance SQLDB1<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbDataGeneratorConfig -SqlInstance SQLDB1 -Database DB1 -Table Customer -Path C:\Temp\clone
```

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
