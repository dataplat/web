---
title: "Get-DbaDbSynonym"
slug: "Get-DbaDbSynonym"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database synonyms and their target object mappings from SQL Server instances"
tags:
  - "Database"
  - "Synonym"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSynonym.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbSynonym"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbSynonym</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSynonym.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Mikey Bronowski (@MikeyBronowski), bronowski.it</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves database synonyms and their target object mappings from SQL Server instances

## Description

Returns database synonym objects along with their target object details including base server, database, schema, and object name. Synonyms are database-scoped aliases that point to objects in the same or different databases, even on remote servers. This function helps DBAs document database dependencies, track cross-database references, and analyze synonym usage across their SQL Server environment. The output includes both the synonym definition and its underlying target, making it useful for impact analysis when planning database migrations or refactoring.

## Syntax

```powershell
Get-DbaDbSynonym
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Schema] <String[]>]
    [[-ExcludeSchema] <String[]>]
    [[-Synonym] <String[]>]
    [[-ExcludeSynonym] <String[]>]
    [[-InputObject] <Database[]>]
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
PS C:\> Get-DbaDbSynonym -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Get-DbaDbSynonym -SqlInstance localhost" }

Returns all database synonyms in all databases on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbSynonym -SqlInstance localhost, sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaDbSynonym -SqlInstance localhost, sql2016" }

Returns all synonyms of all database(s) on the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Get-DbaDbSynonym
```
{: data-copyable="true" data-clean-code="$servers = Get-Content C:\servers.txt
$servers | Get-DbaDbSynonym" }

Returns synonyms of all database(s) for every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSynonym -SqlInstance localhost -Database db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbSynonym -SqlInstance localhost -Database db1" }

Returns synonyms of the database db1 on localhost.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSynonym -SqlInstance localhost -Database db1 -Synonym 'synonym1'
```
{: data-copyable="true" data-clean-code="Get-DbaDbSynonym -SqlInstance localhost -Database db1 -Synonym 'synonym1'" }

Returns the synonym1 synonym in the db1 database on localhost.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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

##### -Database

Specifies which database(s) to search for synonyms. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases instead of scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific database(s) from the synonym search. Accepts wildcards for pattern matching.  
Useful for skipping system databases, test environments, or databases you know don't contain relevant synonyms.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Filters synonyms to only those in the specified schema(s). Accepts wildcards for pattern matching.  
Use this when you need to focus on synonyms within specific schemas, such as application-specific or departmental schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSchema

Excludes synonyms from specific schema(s) in the results. Accepts wildcards for pattern matching.  
Helpful for filtering out system schemas or schemas that contain synonyms you're not interested in analyzing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Synonym

Specifies exact synonym name(s) to retrieve. Accepts multiple synonym names as an array.  
Use this when you need details about specific synonyms, such as checking where a particular synonym points or verifying its target object.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSynonym

Excludes specific synonym(s) from the results by name. Accepts multiple synonym names as an array.  
Useful when you want to see all synonyms except certain ones you already know about or don't need to review.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input. Allows you to chain database filtering commands.  
Use this to process synonyms only from databases that meet specific criteria, such as specific compatibility levels or last backup dates.

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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
