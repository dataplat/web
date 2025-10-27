---
title: "New-DbaDbSequence"
slug: "New-DbaDbSequence"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new sequence object in SQL Server databases with configurable properties and data types."
tags:
  - "Data"
  - "Sequence"
  - "Table"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSequence.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbSequence"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbSequence</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSequence.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates a new sequence object in SQL Server databases with configurable properties and data types.

## Description

Creates a new sequence object in one or more SQL Server databases, providing an alternative to IDENTITY columns for generating sequential numbers. This function allows you to configure all sequence properties including data type (system or user-defined), starting value, increment, min/max bounds, cycling behavior, and cache settings. Sequences are particularly useful when you need to share sequential numbers across multiple tables, require more control over number generation than IDENTITY provides, or need to reset or alter the sequence values. The function automatically creates the target schema if it doesn't exist and supports SQL Server 2012 and higher.

## Syntax

```powershell
New-DbaDbSequence
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [-Sequence] <String[]>
    [[-Schema] <String>]
    [[-IntegerType] <String>]
    [[-StartWith] <Int64>]
    [[-IncrementBy] <Int64>]
    [[-MinValue] <Int64>]
    [[-MaxValue] <Int64>]
    [-Cycle]
    [[-CacheSize] <Int32>]
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
PS C:\> New-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence -StartWith 10000 -IncrementBy 10
```
{: data-copyable="true" data-clean-code="New-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence -StartWith 10000 -IncrementBy 10" }

Creates a new sequence TestSequence in the TestDB database on the sqldev01 instance. The sequence will start with 10000 and increment by 10.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence -Cycle
```
{: data-copyable="true" data-clean-code="New-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence -Cycle" }

Creates a new sequence TestSequence in the TestDB database on the sqldev01 instance. The sequence will cycle the numbers.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | New-DbaDbSequence -Sequence TestSequence -Schema TestSchema -IntegerType bigint
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | New-DbaDbSequence -Sequence TestSequence -Schema TestSchema -IntegerType bigint" }

Using a pipeline this command creates a new bigint sequence named TestSchema.TestSequence in the TestDB database on the sqldev01 instance.<br>

### Required Parameters

##### -Sequence

Specifies the name of the sequence object to create. Must be unique within the target schema.  
Use descriptive names like 'OrderNumber' or 'InvoiceID' to indicate the sequence's purpose.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

Specifies the target database(s) where the sequence will be created. Accepts multiple database names.  
Required when using SqlInstance parameter to specify which databases should contain the new sequence.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Specifies the schema where the sequence will be created. Defaults to 'dbo' if not specified.  
The function will automatically create the schema if it doesn't exist in the target database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbo |

##### -IntegerType

Specifies the data type for the sequence values. Defaults to 'bigint' for maximum range.  
Supports system types (tinyint, smallint, int, bigint) and user-defined integer types using 'schema.typename' format.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | bigint |

##### -StartWith

Sets the initial value for the sequence. Defaults to 1 if not specified.  
Use higher starting values like 10000 when you need to reserve lower numbers or maintain existing numbering schemes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |

##### -IncrementBy

Controls how much the sequence increases with each call to NEXT VALUE FOR. Defaults to 1.  
Use negative values for descending sequences or larger increments like 10 for spaced numbering.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |

##### -MinValue

Sets the lowest value the sequence can generate. When omitted, uses the data type's minimum value.  
Specify this to prevent sequences from generating values below a certain threshold.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaxValue

Sets the highest value the sequence can generate. When omitted, uses the data type's maximum value.  
Define this to limit sequence values or enable cycling at a specific upper bound.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Cycle

Enables the sequence to restart from MinValue after reaching MaxValue (or vice versa for descending sequences).  
Use this for sequences that should continuously cycle through a range of values rather than stopping at the boundary.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CacheSize

Controls how many sequence values SQL Server pre-allocates in memory for performance. Set to 0 for NO CACHE.  
Higher cache sizes improve performance for frequently accessed sequences but may cause gaps if the instance restarts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input.  
Use this for pipeline operations when you want to create sequences across multiple databases returned by Get-DbaDatabase.

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
