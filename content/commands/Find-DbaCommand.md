---
title: "Find-DbaCommand"
slug: "Find-DbaCommand"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Finds dbatools commands searching through the inline help text"
tags:
  - "Module"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaCommand.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaCommand"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaCommand</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaCommand.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Simone Bizzotto (@niphlod)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Finds dbatools commands searching through the inline help text

## Description

Finds dbatools commands searching through the inline help text, building a consolidated json index and querying it because Get-Help is too slow

## Syntax

```powershell
Find-DbaCommand
    [[-Pattern] <String>]
    [[-Tag] <String[]>]
    [[-Author] <String>]
    [[-MinimumVersion] <String>]
    [[-MaximumVersion] <String>]
    [-Rebuild]
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
PS C:\> Find-DbaCommand "snapshot"
```
{: data-copyable="true" data-clean-code="Find-DbaCommand &quot;snapshot&quot;" }

For lazy typers: finds all commands searching the entire help for "snapshot"<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaCommand -Pattern "snapshot"
```
{: data-copyable="true" data-clean-code="Find-DbaCommand -Pattern &quot;snapshot&quot;" }

For rigorous typers: finds all commands searching the entire help for "snapshot"<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaCommand -Tag Job
```
{: data-copyable="true" data-clean-code="Find-DbaCommand -Tag Job" }

Finds all commands tagged with "Job"<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaCommand -Tag Job,Owner
```
{: data-copyable="true" data-clean-code="Find-DbaCommand -Tag Job,Owner" }

Finds all commands tagged with BOTH "Job" and "Owner"<br>

#####  Example:  5 

```powershell
PS C:\> Find-DbaCommand -Author Chrissy
```
{: data-copyable="true" data-clean-code="Find-DbaCommand -Author Chrissy" }

Finds every command whose author contains our beloved "Chrissy"<br>

#####  Example:  6 

```powershell
PS C:\> Find-DbaCommand -Author Chrissy -Tag AG
```
{: data-copyable="true" data-clean-code="Find-DbaCommand -Author Chrissy -Tag AG" }

Finds every command whose author contains our beloved "Chrissy" and it tagged as "AG"<br>

#####  Example:  7 

```powershell
PS C:\> Find-DbaCommand -Pattern snapshot -Rebuild
```
{: data-copyable="true" data-clean-code="Find-DbaCommand -Pattern snapshot -Rebuild" }

Finds all commands searching the entire help for "snapshot", rebuilding the index (good for developers)<br>

### Optional Parameters

##### -Pattern

Searches all help text properties (synopsis, description, examples, parameters) for the specified text pattern using wildcard matching.  
Use this for broad searches when you know a concept or term but aren't sure which specific commands handle it.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Tag

Filters results to show only commands that contain all specified tags. Tags categorize commands by SQL Server feature area like "Backup", "AG", "Job", or "Security".  
Use this when you need to find commands related to specific SQL Server functionality. Multiple tags require commands to have ALL specified tags.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Author

Filters results to show commands created by authors whose name contains the specified text. Uses wildcard matching so partial names work.  
Useful when you want to find commands written by a specific contributor or when following up on recommendations from particular experts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MinimumVersion

Filters results to show only commands that require the specified minimum version of dbatools or higher.  
Use this to ensure compatibility when working with older dbatools installations or when checking what features require recent updates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaximumVersion

Filters results to show only commands that work with the specified maximum version of dbatools or lower.  
Helpful when working with legacy environments where you need to avoid commands that require newer dbatools versions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Rebuild

Forces a complete rebuild of the dbatools command index from the current module state. This rescans all help text and updates the cached index file.  
Use this when developing new commands, after updating dbatools, or when search results seem outdated or incomplete.

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

##### -WhatIf

Displays what would happen if the command is run

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Confirms overwrite of index

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
