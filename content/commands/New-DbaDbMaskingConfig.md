---
title: "New-DbaDbMaskingConfig"
slug: "New-DbaDbMaskingConfig"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl) | Chrissy LeMaire (@cl, netnerds.net)"
availability: "Windows, Linux, macOS"
synopsis: "Scans database tables to detect sensitive data and creates a JSON configuration file for data masking"
tags:
  - "Masking"
  - "DataMasking"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbMaskingConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbMaskingConfig"
draft: false
---

# New-DbaDbMaskingConfig

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad, sqlstad.nl) , Chrissy LeMaire (@cl, netnerds.net) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbMaskingConfig](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbMaskingConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbMaskingConfig](https://dataplat.github.io/boh#New-DbaDbMaskingConfig).

## Synopsis

Scans database tables to detect sensitive data and creates a JSON configuration file for data masking

## Description

Analyzes SQL Server database tables and columns to automatically detect potentially sensitive information (PII) and generates a JSON configuration file that defines how to mask each identified column. The function uses pattern matching against column names and data sampling to identify sensitive data like Social Security Numbers, email addresses, phone numbers, and other PII based on predefined patterns and known column naming conventions.  
  
The generated configuration file is consumed by Invoke-DbaDbDataMasking to perform the actual data masking operations. This two-step process allows you to review and customize the masking strategy before applying changes to your data, making it safer for creating development and testing environments from production databases.  
  
The function intelligently determines appropriate masking methods based on data type and detected PII category - for example, dates get randomized to past dates, monetary values use commerce pricing patterns, and strings get realistic fake data rather than simple scrambling. You can customize the detection process using your own pattern files and known name definitions to handle organization-specific sensitive data patterns.  
  
Note that the following column and data types are not currently supported:  
Identity  
ForeignKey  
Computed  
Hierarchyid  
Geography  
Geometry  
Xml  
  
Read more here:  
https://sachabarbs.wordpress.com/2018/06/11/bogus-simple-fake-data-tool/  
https://github.com/bchavez/Bogus

## Syntax

```powershell
New-DbaDbMaskingConfig
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Table] <String[]>]
    [[-Column] <String[]>]
    [-Path] <String>
    [[-Locale] <String>]
    [[-CharacterString] <String>]
    [[-SampleCount] <Int32>]
    [[-KnownNameFilePath] <String>]
    [[-PatternFilePath] <String>]
    [-ExcludeDefaultKnownName]
    [-ExcludeDefaultPattern]
    [-Force]
    [[-InputObject] <Object[]>]
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
PS C:\> New-DbaDbMaskingConfig -SqlInstance SQLDB1 -Database DB1 -Path C:\Temp\clone
```

Process all tables and columns for database DB1 on instance SQLDB1<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbMaskingConfig -SqlInstance SQLDB1 -Database DB1 -Table Customer -Path C:\Temp\clone
```

Process only table Customer with all the columns<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbMaskingConfig -SqlInstance SQLDB1 -Database DB1 -Table Customer -Column City -Path C:\Temp\clone
```

Process only table Customer and only the column named "City"<br>

### Required Parameters

##### -Path

Path where to save the generated JSON files.  
Th naming convention will be "servername.databasename.tables.json"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

Databases to process through

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Tables to process. By default all the tables will be processed

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Column

Columns to process. By default all the columns will be processed

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Locale

Set the local to enable certain settings in the masking

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | en |

##### -CharacterString

The characters to use in string data. 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' by default

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 |

##### -SampleCount

Amount of rows to sample to make an assessment. The default is 100

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100 |

##### -KnownNameFilePath

Points to a file containing the custom known names

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PatternFilePath

Points to a file containing the custom patterns

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDefaultKnownName

Excludes the default known names

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeDefaultPattern

Excludes the default patterns

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Forcefully execute commands when needed

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Used for piping the values from Invoke-DbaDbPiiScan

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
