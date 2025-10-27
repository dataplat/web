---
title: "Get-DbaDbSequence"
slug: "Get-DbaDbSequence"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server sequence objects and their configuration details from specified databases."
tags:
  - "Data"
  - "Sequence"
  - "Table"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSequence.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbSequence"
draft: false
---

# Get-DbaDbSequence

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbSequence](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSequence.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbSequence](https://dataplat.github.io/boh#Get-DbaDbSequence).

## Synopsis

Retrieves SQL Server sequence objects and their configuration details from specified databases.

## Description

Retrieves sequence objects from SQL Server databases, returning detailed information about each sequence including data type, start value, increment value, and schema location. Sequences provide a flexible alternative to IDENTITY columns for generating sequential numeric values, allowing values to be shared across multiple tables and offering more control over numbering behavior. This function helps DBAs inventory sequences across databases, verify sequence configurations, and identify sequences that may need maintenance or optimization.

## Syntax

```powershell
Get-DbaDbSequence
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Sequence] <String[]>]
    [[-Schema] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence
```

Finds the sequence TestSequence in the TestDB database on the sqldev01 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | Get-DbaDbSequence -Sequence TestSequence -Schema TestSchema
```

Using a pipeline this command finds the sequence named TestSchema.TestSequence in the TestDB database on the sqldev01 instance.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance localhost
```

Finds all the sequences on the localhost instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance localhost -Database db
```

Finds all the sequences in the db database on the localhost instance.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance localhost -Sequence seq
```

Finds all the sequences named seq on the localhost instance.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance localhost -Schema sch
```

Finds all the sequences in the sch schema on the localhost instance.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

Specifies which databases to search for sequence objects. Accepts wildcards and multiple database names.  
Use this when you need to limit the search to specific databases instead of scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Sequence

Filters results to sequences with specific names. Accepts multiple sequence names and supports exact name matching.  
Use this when you need to find specific sequences across databases rather than retrieving all sequences.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Filters results to sequences within specific schemas. Accepts multiple schema names for searching across different schemas.  
Use this when you need to examine sequences in particular schemas, such as application-specific schemas or custom organizational structures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase pipeline input, allowing you to target specific databases already retrieved.  
Use this approach when you need to chain commands or work with databases that meet specific criteria from previous filtering operations.

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


&nbsp;
