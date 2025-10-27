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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbSequence</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSequence.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Adam Lancaster, github.com/lancasteradam</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence" }

Finds the sequence TestSequence in the TestDB database on the sqldev01 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | Get-DbaDbSequence -Sequence TestSequence -Schema TestSchema
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | Get-DbaDbSequence -Sequence TestSequence -Schema TestSchema" }

Using a pipeline this command finds the sequence named TestSchema.TestSequence in the TestDB database on the sqldev01 instance.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Get-DbaDbSequence -SqlInstance localhost" }

Finds all the sequences on the localhost instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance localhost -Database db
```
{: data-copyable="true" data-clean-code="Get-DbaDbSequence -SqlInstance localhost -Database db" }

Finds all the sequences in the db database on the localhost instance.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance localhost -Sequence seq
```
{: data-copyable="true" data-clean-code="Get-DbaDbSequence -SqlInstance localhost -Sequence seq" }

Finds all the sequences named seq on the localhost instance.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance localhost -Schema sch
```
{: data-copyable="true" data-clean-code="Get-DbaDbSequence -SqlInstance localhost -Schema sch" }

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
