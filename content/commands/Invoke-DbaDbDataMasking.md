---
title: "Invoke-DbaDbDataMasking"
slug: "Invoke-DbaDbDataMasking"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl) | Chrissy LeMaire (@cl, netnerds.net)"
availability: "Windows, Linux, macOS"
synopsis: "Replaces sensitive production data with randomized values using configurable masking rules"
tags:
  - "Masking"
  - "DataMasking"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDataMasking.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbDataMasking"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbDataMasking</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDataMasking.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad, sqlstad.nl) , Chrissy LeMaire (@cl, netnerds.net)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Replaces sensitive production data with randomized values using configurable masking rules

## Description

Replaces sensitive data in SQL Server databases with randomized values based on a JSON configuration file. This enables DBAs to create safe, non-production datasets for development, testing, and training environments without exposing real customer data.  
  
The function processes tables row-by-row, applying masking rules like generating fake names, addresses, phone numbers, or random strings while preserving data relationships and referential integrity. It supports deterministic masking to maintain consistency across related records and can handle unique constraints.  
  
Use New-DbaDbMaskingConfig to generate the required configuration file, which defines which columns to mask and what type of replacement data to generate. The masking process creates temporary tables and indexes to optimize performance during large data transformations.  
  
Note that the following column and data types are not currently supported:  
Identity  
ForeignKey  
Computed  
Hierarchyid  
Geography  
Geometry  
Xml

## Syntax

```powershell
Invoke-DbaDbDataMasking
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
    [[-ModulusFactor] <Int32>]
    [-ExactLength]
    [[-CommandTimeout] <Int32>]
    [[-BatchSize] <Int32>]
    [[-Retry] <Int32>]
    [[-DictionaryFilePath] <String[]>]
    [[-DictionaryExportPath] <String>]
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
PS C:\> Invoke-DbaDbDataMasking -SqlInstance SQLDB2 -Database DB1 -FilePath C:\Temp\sqldb1.db1.tables.json
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDataMasking -SqlInstance SQLDB2 -Database DB1 -FilePath C:\Temp\sqldb1.db1.tables.json" }

Apply the data masking configuration from the file "sqldb1.db1.tables.json" to the db1 database on sqldb2. Prompt for confirmation for each table.<br>

#####  Example:  2 

```powershell
PS C:\> Get-ChildItem -Path C:\Temp\sqldb1.db1.tables.json | Invoke-DbaDbDataMasking -SqlInstance SQLDB2 -Database DB1 -Confirm:$false
```
{: data-copyable="true" data-clean-code="Get-ChildItem -Path C:\Temp\sqldb1.db1.tables.json | Invoke-DbaDbDataMasking -SqlInstance SQLDB2 -Database DB1 -Confirm:$false" }

Apply the data masking configuration from the file "sqldb1.db1.tables.json" to the db1 database on sqldb2. Do not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbMaskingConfig -SqlInstance SQLDB1 -Database DB1 -Path C:\Temp\clone -OutVariable file
```
{: data-copyable="true" data-clean-code="New-DbaDbMaskingConfig -SqlInstance SQLDB1 -Database DB1 -Path C:\Temp\clone -OutVariable file" }

$file | Invoke-DbaDbDataMasking -SqlInstance SQLDB2 -Database DB1 -Confirm:$false<br>
Create the data masking configuration file "sqldb1.db1.tables.json", then use it to mask the db1 database on sqldb2. Do not prompt for confirmation.<br>

#####  Example:  4 

```powershell
PS C:\> Get-ChildItem -Path C:\Temp\sqldb1.db1.tables.json | Invoke-DbaDbDataMasking -SqlInstance SQLDB2, sqldb3 -Database DB1 -Confirm:$false
```
{: data-copyable="true" data-clean-code="Get-ChildItem -Path C:\Temp\sqldb1.db1.tables.json | Invoke-DbaDbDataMasking -SqlInstance SQLDB2, sqldb3 -Database DB1 -Confirm:$false" }

See what would happen if you the data masking configuration from the file "sqldb1.db1.tables.json" to the db1 database on sqldb2 and sqldb3. Do not prompt for confirmation.<br>

### Required Parameters

##### -FilePath

Path to the JSON configuration file that defines masking rules for tables and columns. Accepts pipeline input from New-DbaDbMaskingConfig.  
This file specifies which columns to mask, what type of fake data to generate, and handles relationships between tables to maintain referential integrity.

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

Specifies which databases to mask on the target instance. Accepts wildcards for pattern matching.  
If omitted, uses the database name from the configuration file. Essential for targeting specific databases when the same config applies to multiple environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Locale

Sets the locale for generating culture-specific fake data like names, addresses, and phone numbers. Defaults to 'en' (English).  
Change this when masking data for specific regions to ensure realistic replacement values that match your target environment's cultural context.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | en |

##### -CharacterString

Defines the character set used when generating random strings for masked data. Defaults to alphanumeric characters.  
Customize this to match your application's validation rules, such as excluding certain characters that might cause issues with your systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 |

##### -Table

Limits masking to specific tables within the configuration file. Accepts wildcards for pattern matching.  
Use this when you need to mask only certain tables during testing or phased rollouts, rather than processing all tables defined in the config.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Column

Restricts masking to specific columns within the selected tables. Accepts wildcards for pattern matching.  
Useful for testing individual column masks or when you need to re-mask specific columns without affecting others.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeTable

Skips masking for specified tables even if they're defined in the configuration file. Accepts wildcards.  
Use this to temporarily exclude problematic tables during troubleshooting or when certain tables need to remain unchanged in specific environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeColumn

Skips masking for specified columns even if they're defined in the configuration file. Accepts wildcards.  
Helpful for excluding columns that are part of unique indexes or when specific columns need to remain unchanged during testing phases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaxValue

Overrides the maximum length for generated string values, useful for testing with shorter data than production allows.  
The smaller value between this parameter and the column's actual maximum length will be used. Primarily useful for development and testing scenarios rather than production masking.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -ModulusFactor

Controls how frequently nullable columns are set to NULL during masking. Default value of 10 means approximately every 10th row will be NULL.  
Adjust this to match your production data's NULL distribution patterns, ensuring masked data maintains realistic null value frequency.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -ExactLength

Forces masked string values to match the exact length of the original data. For example, 'Smith' becomes exactly 5 random characters.  
Enable this when your applications have strict validation rules that depend on consistent field lengths or when maintaining data formatting is critical.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CommandTimeout

Sets the timeout in seconds for SQL commands during the masking process. Default is 300 seconds (5 minutes).  
Increase this value when masking large tables or when working with slower storage systems to prevent timeout errors during long-running operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BatchSize

Number of rows processed in each batch during the masking operation. Default is 1000 rows per batch.  
Adjust based on your system's memory and transaction log capacity. Smaller batches reduce memory usage but may slow processing, while larger batches improve performance but require more resources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Retry

Maximum number of attempts to generate unique values when tables have unique constraints. Default is 1000 retries.  
Increase this when masking tables with many unique indexes or when the range of possible values is limited, preventing failure due to constraint violations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -DictionaryFilePath

Path to CSV files containing deterministic value mappings for consistent masking across multiple runs or environments.  
Use this when you need the same original values to always map to the same masked values, maintaining referential integrity across related systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DictionaryExportPath

Directory path where deterministic value mapping files will be exported after masking. Files are named [computername]_[instancename]_[database]_Dictionary.csv.  
Use with extreme caution as these files can be used to reverse masked values back to originals. Store securely and delete after use if not needed for consistency across environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
