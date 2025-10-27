---
title: "Get-DbaAvailableCollation"
slug: "Get-DbaAvailableCollation"
date: 2024-01-01
layout: "single"
author: "Bryan Hamby (@galador)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves all available collations from SQL Server instances with detailed locale and code page information"
tags:
  - "Collation"
  - "Configuration"
  - "Management"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAvailableCollation.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAvailableCollation"
draft: false
---

# Get-DbaAvailableCollation

| Property | Value |
| --- | --- |
| **Author** | Bryan Hamby (@galador) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAvailableCollation](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAvailableCollation.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAvailableCollation](https://dataplat.github.io/boh#Get-DbaAvailableCollation).

## Synopsis

Retrieves all available collations from SQL Server instances with detailed locale and code page information

## Description

Returns the complete list of collations supported by each SQL Server instance, along with their associated code page names, locale descriptions, and detailed properties.  
This information is essential when creating new databases, changing database collations, or planning migrations where collation compatibility matters.  
The function enhances the raw collation data with human-readable code page and locale descriptions to help DBAs make informed collation choices.  
Only connect permission is required to retrieve this information.

## Syntax

```powershell
Get-DbaAvailableCollation
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAvailableCollation -SqlInstance sql2016
```

Gets all the collations from server sql2016 using NT authentication<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Only connect permission is required.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
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
