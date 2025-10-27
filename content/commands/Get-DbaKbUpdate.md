---
title: "Get-DbaKbUpdate"
slug: "Get-DbaKbUpdate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed metadata and download links for Microsoft KB updates from the update catalog"
tags:
  - "Deployment"
  - "Install"
  - "Patch"
  - "Update"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaKbUpdate.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaKbUpdate"
draft: false
---

# Get-DbaKbUpdate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaKbUpdate](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaKbUpdate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaKbUpdate](https://dataplat.github.io/boh#Get-DbaKbUpdate).

## Synopsis

Retrieves detailed metadata and download links for Microsoft KB updates from the update catalog

## Description

Searches Microsoft's update catalog website to retrieve comprehensive information about KB updates including service packs, hotfixes, and cumulative updates. Returns detailed metadata such as supported products, architecture, language, file size, supersession information, and direct download links. Integrates with Get-DbaBuild to provide SQL Server-specific versioning details when available, making it essential for patch management and update research workflows. Note that parsing multiple web pages can be slow since Microsoft doesn't provide an API for this data.

## Syntax

```powershell
Get-DbaKbUpdate
    [-Name] <String[]>
    [-Simple]
    [[-Language] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119
```

Gets detailed information about KB4057119. This works for SQL Server or any other KB.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119, 4057114
```

Gets detailed information about KB4057119 and KB4057114. This works for SQL Server or any other KB.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119, 4057114 -Simple
```

A lil faster. Returns, at the very least: Title, Architecture, Language, Hotfix, UpdateId and Link<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119 -Language ja
```

Gets detailed information about KB4057119 in Japanese. This works for SQL Server or any other KB.<br>
(Link property includes the links for Japanese version of SQL Server if the KB was Service Pack)<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119 -Language ja | Save-DbaKbUpdate
```

Downloads Japanese version of KB4057119.<br>

### Required Parameters

##### -Name

Specifies the KB article number to search for, with or without the 'KB' prefix. Accepts multiple values for batch processing.  
Use this to retrieve update information for specific knowledge base articles like security patches, cumulative updates, or service packs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Simple

Returns only essential update information to improve performance by skipping detailed web scraping. Provides Title, Architecture, Language, Hotfix status, UpdateId, and download Link.  
Use this when you need basic KB information quickly or when processing many updates where full details aren't required.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Language

Filters results to show only updates for a specific language when multiple language versions exist. Service Packs typically have separate files per language, while Cumulative Updates usually include   
all languages in one file.  
Use this when you need updates for non-English environments or want to download language-specific packages. Accepts standard language codes like "en" for English, "de" for German, or "ja" for   
Japanese.

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
