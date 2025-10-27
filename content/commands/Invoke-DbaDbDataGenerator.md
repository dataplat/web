---
title: "Invoke-DbaDbDataGenerator"
slug: "Invoke-DbaDbDataGenerator"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Generates realistic test data for SQL Server database tables using configuration-driven rules"
tags:
  - "DataGeneration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDataGenerator.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbDataGenerator"
draft: false
---

# Invoke-DbaDbDataGenerator

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad, sqlstad.nl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaDbDataGenerator](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDataGenerator.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaDbDataGenerator](https://dataplat.github.io/boh#Invoke-DbaDbDataGenerator).

## Synopsis

Generates realistic test data for SQL Server database tables using configuration-driven rules

## Description

Populates database tables with randomly generated but realistic test data based on JSON configuration files. Uses the Bogus library to create fake but believable data like names, addresses, phone numbers, and dates that respect column constraints and data types. Perfect for creating development environments, testing scenarios, or demo databases without using production data. Handles identity columns, unique indexes, nullable fields, and foreign key relationships while maintaining data integrity.

## Syntax

```powershell
Invoke-DbaDbDataGenerator
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [-FilePath] <Object>
    [[-Locale] <String>]
    [[-CharacterString] <String>]
    [[-Table] <String[]>]
    [[-Column] <String[]>]
    [[-ExcludeTable] <String[]>]
    [[-ExcludeColumn] <String[]>]
    [[-MaxValue] <Int32>]
    [-ExactLength]
    [[-ModulusFactor] <Int32>]
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
PS C:\> Invoke-DbaDbDataGenerator -SqlInstance sqldb2 -Database DB1 -FilePath C:\temp\sqldb1.db1.tables.json
```

Apply the data generation configuration from the file "sqldb1.db1.tables.json" to the db1 database on sqldb2. Prompt for confirmation for each table.<br>

### Required Parameters

##### -FilePath

Path to the JSON configuration file that defines data generation rules for tables and columns. Accepts local file paths or HTTP URLs.  
This file specifies which tables to populate, how many rows to generate, and the data generation rules for each column.

| Property | Value |
| --- | --- |
| Alias | Path,FullName |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to generate data for. If not provided, uses database names from the configuration file.  
Use this to limit data generation to specific databases when your config file covers multiple databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Locale

Sets the locale for generating culture-specific fake data like names, addresses, and phone numbers. Defaults to 'en' for English.  
Change this when you need realistic data for specific regions, such as 'de' for German or 'fr' for French test data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | en |

##### -CharacterString

Defines the character set used for generating random string values. Defaults to alphanumeric characters.  
Customize this when you need specific character patterns for testing, such as restricting to only uppercase letters or including special characters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 |

##### -Table

Limits data generation to specific tables only, overriding the full table list in the configuration file.  
Useful when you need to populate just certain tables for testing or during incremental development work.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Column

Restricts data generation to specific columns within the processed tables.  
Use this to generate data for only certain columns during testing or when troubleshooting specific column configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeTable

Skips specific tables even if they're included in the configuration file.  
Use this to temporarily exclude problematic tables during testing or when you want to process most tables but skip a few.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeColumn

Skips specific columns even if they're included in the configuration file.  
Helpful when troubleshooting column-specific issues or when you want to exclude sensitive columns temporarily.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaxValue

Overrides the maximum length for string columns, ignoring the data type's natural limits. Lower data type limits still take precedence.  
Useful for testing with shorter strings or when you need consistent string lengths across different environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -ExactLength

Forces generated strings to match the exact length of existing data in the column.  
Use this when you need to preserve string length patterns for testing applications that expect specific data formats.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ModulusFactor

Controls how frequently nullable columns receive NULL values by using modulus calculation. Default is every 10th row gets NULL.  
Adjust this to increase or decrease NULL frequency in your test data to match realistic data distribution patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 10 |

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
