---
title: "Get-DbaRandomizedDataset"
slug: "Get-DbaRandomizedDataset"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Generates random test data using predefined templates for development and testing scenarios"
tags:
  - "DataGeneration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRandomizedDataset.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRandomizedDataset"
draft: false
---

# Get-DbaRandomizedDataset

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad, sqlstad.nl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRandomizedDataset](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRandomizedDataset.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRandomizedDataset](https://dataplat.github.io/boh#Get-DbaRandomizedDataset).

## Synopsis

Generates random test data using predefined templates for development and testing scenarios

## Description

Generates random test datasets using JSON templates that define column names and data types. This function creates realistic sample data for database development, testing, and training environments without exposing production data. Templates can specify SQL Server data types (varchar, int, datetime) or semantic data types (Name.FirstName, Address.City, Person.DateOfBirth) for more realistic datasets. Built-in templates include PersonalData with common PII fields, and you can create custom templates for specific business scenarios.

## Syntax

```powershell
Get-DbaRandomizedDataset
    [[-Template] <String[]>]
    [[-TemplateFile] <String[]>]
    [[-Rows] <Int32>]
    [[-Locale] <String>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRandomizedDataset -Template Personaldata
```

Generate a data set based on the default template PersonalData.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRandomizedDataset -Template Personaldata -Rows 10
```

Generate a data set based on the default template PersonalData with 10 rows<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRandomizedDataset -TemplateFile C:\Dataset\FinancialData.json
```

Generates data set based on a template file in another directory<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRandomizedDataset -Template Personaldata, FinancialData
```

Generates multiple data sets<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaRandomizedDatasetTemplate -Template PersonalData | Get-DbaRandomizedDataset
```

Pipe the templates from Get-DbaRandomizedDatasetTemplate to Get-DbaRandomizedDataset and generate the data set<br>

### Optional Parameters

##### -Template

Specifies the name of one or more built-in templates to use for data generation.  
Use this when you want to generate data using predefined column structures like PersonalData which includes names, addresses, and birthdates.  
The function searches through default templates in the module's bin\randomizer\templates directory to find matching names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TemplateFile

Specifies the full path to one or more custom JSON template files that define column structures and data types.  
Use this when you need to generate data based on your own custom templates rather than the built-in ones.  
Template files must be valid JSON with a Columns array defining Name, Type, and SubType properties for each column.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Rows

Specifies how many rows of test data to generate for each template.  
Use this to control the size of your test dataset based on your development or testing needs.  
Defaults to 100 rows if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100 |

##### -Locale

Specifies the locale for generating culture-specific data like names, addresses, and phone numbers.  
Use this when you need test data that matches a specific geographic region or language for realistic testing scenarios.  
Defaults to 'en' (English) if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | en |

##### -InputObject

Accepts template objects piped from Get-DbaRandomizedDatasetTemplate.  
Use this in pipeline scenarios where you first retrieve templates and then generate data from them.  
Each input object should contain template information including the FullName path to the JSON template file.

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


&nbsp;
