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

# Get-DbaDbSynonym

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbSynonym](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSynonym.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbSynonym](https://dataplat.github.io/boh#Get-DbaDbSynonym).

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

Returns all database synonyms in all databases on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbSynonym -SqlInstance localhost, sql2016
```

Returns all synonyms of all database(s) on the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Get-DbaDbSynonym
```

Returns synonyms of all database(s) for every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSynonym -SqlInstance localhost -Database db1
```

Returns synonyms of the database db1 on localhost.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSynonym -SqlInstance localhost -Database db1 -Synonym 'synonym1'
```

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
