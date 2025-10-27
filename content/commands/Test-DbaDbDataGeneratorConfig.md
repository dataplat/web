---
title: "Test-DbaDbDataGeneratorConfig"
slug: "Test-DbaDbDataGeneratorConfig"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Validates JSON configuration files used for generating realistic test data in SQL Server databases"
tags:
  - "DataGeneration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbDataGeneratorConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbDataGeneratorConfig"
draft: false
---

# Test-DbaDbDataGeneratorConfig

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDbDataGeneratorConfig](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbDataGeneratorConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDbDataGeneratorConfig](https://dataplat.github.io/boh#Test-DbaDbDataGeneratorConfig).

## Synopsis

Validates JSON configuration files used for generating realistic test data in SQL Server databases

## Description

Validates JSON configuration files created by New-DbaDbDataGeneratorConfig before using them with Invoke-DbaDbDataGenerator to populate tables with realistic fake data. The function performs comprehensive validation including checking for required column properties, verifying data types are supported, confirming masking types exist in the Bogus library, and validating subtypes are available.  
  
This validation step prevents runtime errors during data generation and helps catch configuration issues early in the test data creation workflow. Returns detailed error information for any invalid configurations, showing exactly which tables and columns have problems so you can fix them before attempting to generate data.

## Syntax

```powershell
Test-DbaDbDataGeneratorConfig
    [-FilePath] <String>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDbDataGeneratorConfig -FilePath C:\temp\_datamasking\db1.json
```

Test the configuration file<br>

### Required Parameters

##### -FilePath

Specifies the path to the JSON configuration file created by New-DbaDbDataGeneratorConfig that needs validation.  
Use this to verify your data generation configuration before running Invoke-DbaDbDataGenerator to avoid runtime errors.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

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
