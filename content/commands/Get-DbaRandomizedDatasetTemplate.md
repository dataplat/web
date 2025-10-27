---
title: "Get-DbaRandomizedDatasetTemplate"
slug: "Get-DbaRandomizedDatasetTemplate"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves JSON template files that define column structures for generating realistic test data"
tags:
  - "DataGeneration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRandomizedDatasetTemplate.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRandomizedDatasetTemplate"
draft: false
---

# Get-DbaRandomizedDatasetTemplate

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad, sqlstad.nl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRandomizedDatasetTemplate](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRandomizedDatasetTemplate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRandomizedDatasetTemplate](https://dataplat.github.io/boh#Get-DbaRandomizedDatasetTemplate).

## Synopsis

Retrieves JSON template files that define column structures for generating realistic test data

## Description

Retrieves JSON template files from default and custom directories that define how to generate realistic test datasets. These templates specify column names, data types, and semantic subtypes (like Name.FirstName, Address.City) for creating structured sample data for development and testing environments. The default templates include PersonalData with common fields like names, addresses, and birthdates, and you can specify custom template directories to include organization-specific data patterns.

## Syntax

```powershell
Get-DbaRandomizedDatasetTemplate
    [[-Template] <String[]>]
    [[-Path] <String[]>]
    [-ExcludeDefault]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRandomizedDatasetTemplate
```

Get the templates from the default directory<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRandomizedDatasetTemplate  -Template Personaldata, Test
```

Get the templates from thedefault directory and filter on PersonalData and Test<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRandomizedDatasetTemplate  -Path C:\DatasetTemplates
```

Get the templates from a custom directory<br>

### Optional Parameters

##### -Template

Specifies which template files to retrieve by name (without the .json extension).  
Use this to filter results when you only need specific templates like "PersonalData" or custom templates.  
If not specified, all available templates from the specified paths are returned.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies one or more directory paths containing custom JSON template files for data generation.  
Use this when your organization has created custom templates beyond the default dbatools templates.  
Templates from these paths are added to the default templates unless -ExcludeDefault is specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDefault

Excludes the built-in dbatools templates from the results.  
Use this when you only want to work with custom templates from specified paths.  
The default templates include common data patterns like PersonalData with names, addresses, and dates.

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


&nbsp;
