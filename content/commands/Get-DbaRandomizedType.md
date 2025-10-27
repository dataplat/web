---
title: "Get-DbaRandomizedType"
slug: "Get-DbaRandomizedType"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Lists available data types and subtypes for generating realistic test data during database masking operations"
tags:
  - "DataGeneration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRandomizedType.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRandomizedType"
draft: false
---

# Get-DbaRandomizedType

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad, sqlstad.nl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRandomizedType](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRandomizedType.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRandomizedType](https://dataplat.github.io/boh#Get-DbaRandomizedType).

## Synopsis

Lists available data types and subtypes for generating realistic test data during database masking operations

## Description

Returns all available randomizer types and subtypes that can be used with Get-DbaRandomizedValue for data masking and test data generation. These types include realistic data patterns like Person names, Address components, Finance data, Internet values, and Random data types. This command helps you discover what fake data options are available when building data masking rules or generating test datasets for non-production environments.

## Syntax

```powershell
Get-DbaRandomizedType
    [[-RandomizedType] <String[]>]
    [[-RandomizedSubType] <String[]>]
    [[-Pattern] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRandomizedType
```

Get all the types and subtypes<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRandomizedType -Pattern "Addr"
```

Find all the types and sub types based on a pattern<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRandomizedType -RandomizedType Person
```

Find all the sub types for Person<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRandomizedType -RandomizedSubType LastName
```

Get all the types and subtypes that known by "LastName"<br>

### Optional Parameters

##### -RandomizedType

Filters results to specific main data categories for realistic test data generation.  
Use this when you need to focus on particular data types like Person, Address, Finance, Internet, or Random data.  
Available types include Address, Commerce, Company, Database, Date, Finance, Hacker, Image, Internet, Lorem, Name, Person, Phone, Random, System, and more.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RandomizedSubType

Filters results to specific data subtypes within the main categories for precise data masking scenarios.  
Use this when you need exact data patterns like FirstName, LastName, Email, CreditCardNumber, or ZipCode.  
Subtypes provide granular control over the fake data generation for targeted column masking.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Pattern

Searches both main types and subtypes using pattern matching to find relevant data generators.  
Use this when you're unsure of exact type names or want to discover related options like searching 'Addr' to find Address-related types.  
Supports wildcard matching against both Type and SubType columns for flexible discovery.

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


&nbsp;
