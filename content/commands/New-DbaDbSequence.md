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

# New-DbaDbSequence

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbSequence](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSequence.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbSequence](https://dataplat.github.io/boh#New-DbaDbSequence).

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

Creates a new sequence TestSequence in the TestDB database on the sqldev01 instance. The sequence will start with 10000 and increment by 10.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence -Cycle
```

Creates a new sequence TestSequence in the TestDB database on the sqldev01 instance. The sequence will cycle the numbers.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | New-DbaDbSequence -Sequence TestSequence -Schema TestSchema -IntegerType bigint
```

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
