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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaKbUpdate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaKbUpdate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaKbUpdate -Name KB4057119" }

Gets detailed information about KB4057119. This works for SQL Server or any other KB.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119, 4057114
```
{: data-copyable="true" data-clean-code="Get-DbaKbUpdate -Name KB4057119, 4057114" }

Gets detailed information about KB4057119 and KB4057114. This works for SQL Server or any other KB.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119, 4057114 -Simple
```
{: data-copyable="true" data-clean-code="Get-DbaKbUpdate -Name KB4057119, 4057114 -Simple" }

A lil faster. Returns, at the very least: Title, Architecture, Language, Hotfix, UpdateId and Link<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119 -Language ja
```
{: data-copyable="true" data-clean-code="Get-DbaKbUpdate -Name KB4057119 -Language ja" }

Gets detailed information about KB4057119 in Japanese. This works for SQL Server or any other KB.<br>
(Link property includes the links for Japanese version of SQL Server if the KB was Service Pack)<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119 -Language ja | Save-DbaKbUpdate
```
{: data-copyable="true" data-clean-code="Get-DbaKbUpdate -Name KB4057119 -Language ja | Save-DbaKbUpdate" }

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
