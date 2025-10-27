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

# Find-DbaCommand

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto (@niphlod) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaCommand](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaCommand.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaCommand](https://dataplat.github.io/boh#Find-DbaCommand).

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

For lazy typers: finds all commands searching the entire help for "snapshot"<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaCommand -Pattern "snapshot"
```

For rigorous typers: finds all commands searching the entire help for "snapshot"<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaCommand -Tag Job
```

Finds all commands tagged with "Job"<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaCommand -Tag Job,Owner
```

Finds all commands tagged with BOTH "Job" and "Owner"<br>

#####  Example:  5 

```powershell
PS C:\> Find-DbaCommand -Author Chrissy
```

Finds every command whose author contains our beloved "Chrissy"<br>

#####  Example:  6 

```powershell
PS C:\> Find-DbaCommand -Author Chrissy -Tag AG
```

Finds every command whose author contains our beloved "Chrissy" and it tagged as "AG"<br>

#####  Example:  7 

```powershell
PS C:\> Find-DbaCommand -Pattern snapshot -Rebuild
```

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
