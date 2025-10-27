---
title: "Get-DbaRandomizedValue"
slug: "Get-DbaRandomizedValue"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Generates random data values for SQL Server data types or specialized data patterns for data masking and test data creation"
tags:
  - "DataMasking"
  - "DataGeneration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRandomizedValue.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRandomizedValue"
draft: false
---

# Get-DbaRandomizedValue

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad, sqlstad.nl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRandomizedValue](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRandomizedValue.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRandomizedValue](https://dataplat.github.io/boh#Get-DbaRandomizedValue).

## Synopsis

Generates random data values for SQL Server data types or specialized data patterns for data masking and test data creation

## Description

Creates realistic fake data by generating random values that match SQL Server data type constraints or using specialized data patterns like names, addresses, and phone numbers.  
This function is essential for data masking in non-production environments, replacing sensitive production data with believable fake data while maintaining referential integrity and data patterns.  
Supports all major SQL Server data types (varchar, int, datetime, etc.) with proper ranges and formatting, plus hundreds of specialized randomizer types including personal information, financial data, and lorem ipsum text.  
Uses the Bogus library to ensure generated data follows realistic patterns rather than simple random character generation.

## Syntax

```powershell
Get-DbaRandomizedValue
    [[-DataType] <String>]
    [[-RandomizerType] <String>]
    [[-RandomizerSubType] <String>]
    [[-Min] <Object>]
    [[-Max] <Object>]
    [[-Precision] <Int32>]
    [[-CharacterString] <String>]
    [[-Format] <String>]
    [[-Symbol] <String>]
    [[-Separator] <String>]
    [[-Value] <String>]
    [[-Locale] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRandomizedValue -DataType bit
```

Will return either a 1 or 0<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRandomizedValue -DataType int
```

Will generate a number between -2147483648 and 2147483647<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRandomizedValue -RandomizerSubType Zipcode
```

Generates a random zipcode<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRandomizedValue -RandomizerSubType Zipcode -Format "#### ##"
```

Generates a random zipcode like "1234 56"<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaRandomizedValue -RandomizerSubType PhoneNumber -Format "(###) #######"
```

Generates a random phonenumber like "(123) 4567890"<br>

### Optional Parameters

##### -DataType

Specifies the SQL Server data type for which to generate a random value that matches the type's constraints and range.  
Use this when you need to generate test data that exactly matches your column's data type, including proper ranges for numeric types and correct formatting for date/time types.  
Supported types include bigint, bit, bool, char, date, datetime, datetime2, decimal, int, float, guid, money, numeric, nchar, ntext, nvarchar, real, smalldatetime, smallint, text, time, tinyint,   
uniqueidentifier, userdefineddatatype, varchar.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RandomizerType

Selects the category of realistic fake data to generate using the Bogus library instead of basic SQL data types.  
Use this when you need data that looks realistic for specific domains like names, addresses, or financial information rather than just type-appropriate random values.  
Available types include Address, Commerce, Company, Database, Date, Finance, Hacker, Hashids, Image, Internet, Lorem, Name, Person, Phone, Random, Rant, System.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RandomizerSubType

Defines the specific type of data to generate within a RandomizerType category, such as 'FirstName' under Name or 'ZipCode' under Address.  
Use this to get precisely the kind of fake data you need, like generating just phone numbers from the Person category or specific address components.  
Can be used alone and the function will automatically determine the appropriate RandomizerType, or combined with RandomizerType for explicit control.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Min

Sets the minimum value or length constraint for generated data, such as the shortest string length or smallest numeric value.  
Use this to ensure generated data meets your minimum requirements, like ensuring usernames are at least 3 characters or account balances are above zero.  
Defaults to 1 for most data types; automatically adjusted to data type limits for numeric types like int or smallint.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Max

Sets the maximum value or length constraint for generated data, such as the longest string length or largest numeric value.  
Use this to prevent data from exceeding column limits or business rules, like keeping varchar fields under their defined length or amounts under spending limits.  
Defaults to 255 for most data types; automatically adjusted to data type limits for numeric types like int or smallint.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Precision

Controls the number of decimal places for generated numeric values when using decimal, numeric, real, or float data types.  
Use this to match your column's precision requirements, ensuring generated monetary amounts or measurements have the correct decimal precision.  
Defaults to 2 decimal places, which works well for most currency and percentage values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 2 |

##### -CharacterString

Defines the character set to use when generating random string data for varchar, char, and similar text data types.  
Use this to match specific requirements like alphanumeric-only strings for account codes or excluding certain characters that cause issues in your application.  
Defaults to all letters (upper and lower case) and numbers; customize for specific business rules or technical constraints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 |

##### -Format

Applies custom formatting patterns to generated data, such as phone number formats like "(###) ###-####" or ZIP code patterns like "##### ####".  
Use this to ensure generated data matches your application's expected format, making masked data look consistent with production patterns.  
Works with randomizer types that support formatting; use # as placeholders that will be replaced with appropriate random digits or characters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Symbol

Adds a prefix symbol to generated numeric values, such as "$" for currency amounts or "%" for percentages.  
Use this when you need formatted output that matches how values are displayed in reports or applications, like generating "$1,234.56" instead of just "1234.56".  
Primarily used with Finance randomizer types for realistic monetary displays.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Separator

Specifies the delimiter character to use in formatted data like MAC addresses, where you can choose between ":" or "-" separators.  
Use this to match your network infrastructure's standard format, ensuring generated MAC addresses use the same separator style as your production environment.  
Most commonly used with Internet randomizer types that generate network-related identifiers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Value

Provides the source data for transformation-based randomization methods, particularly when using the "Shuffle" subtype to rearrange existing values.  
Use this when you want to mask data by scrambling rather than replacing it entirely, preserving some characteristics like character count while making it unrecognizable.  
Required when using RandomizerSubType "Shuffle"; the function will randomize the order of characters while preserving commas and decimal points in their original positions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Locale

Controls the cultural context for generated data, affecting formats for names, addresses, phone numbers, and other locale-specific information.  
Use this when you need test data that matches your target region's conventions, such as generating European address formats or non-English names for international applications.  
Defaults to 'en' for English; change to other locale codes like 'de', 'fr', or 'es' to generate region-appropriate fake data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | en |

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
