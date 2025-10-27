---
title: "Test-DbaDbDataMaskingConfig"
slug: "Test-DbaDbDataMaskingConfig"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Validates data masking configuration JSON files for structural and logical errors"
tags:
  - "Masking"
  - "DataMasking"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbDataMaskingConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbDataMaskingConfig"
draft: false
---

# Test-DbaDbDataMaskingConfig

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDbDataMaskingConfig](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbDataMaskingConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDbDataMaskingConfig](https://dataplat.github.io/boh#Test-DbaDbDataMaskingConfig).

## Synopsis

Validates data masking configuration JSON files for structural and logical errors

## Description

Validates data masking configuration JSON files by checking column properties, data types, masking types, and action configurations against dbatools requirements.  
Returns detailed error information for any tables and columns that fail validation, helping you identify configuration issues before running data masking operations.  
Checks include required/allowed column properties, supported SQL Server data types, valid masking and subtype combinations, date range validations, and action property requirements.  
Essential for troubleshooting complex masking configurations and ensuring they'll execute successfully without runtime errors.

## Syntax

```powershell
Test-DbaDbDataMaskingConfig
    [-FilePath] <String>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDbDataMaskingConfig -FilePath C:\temp\_datamasking\db1.json
```

Test the configuration file<br>

### Required Parameters

##### -FilePath

Specifies the full path to the data masking configuration JSON file to validate.  
Use this to verify your masking configuration before running New-DbaDbDataMaskingConfig or Invoke-DbaDbDataMasking to catch errors early.

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
