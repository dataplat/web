---
title: "Set-DbaDbSequence"
slug: "Set-DbaDbSequence"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Modifies properties of existing SQL Server sequence objects"
tags:
  - "Data"
  - "Sequence"
  - "Table"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbSequence.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbSequence"
draft: false
---

# Set-DbaDbSequence

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbSequence](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbSequence.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbSequence](https://dataplat.github.io/boh#Set-DbaDbSequence).

## Synopsis

Modifies properties of existing SQL Server sequence objects

## Description

Modifies existing SQL Server sequence objects by updating their properties such as increment value, restart point, minimum and maximum bounds, cycling behavior, and cache settings. This function is essential when you need to adjust sequence behavior after deployment, fix increment issues, or optimize performance without recreating the sequence and losing its current state.

## Syntax

```powershell
Set-DbaDbSequence
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [-Sequence] <String[]>
    [[-Schema] <String>]
    [[-RestartWith] <Int64>]
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
PS C:\> Set-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence -RestartWith 10000 -IncrementBy 10
```

Modifies the sequence TestSequence in the TestDB database on the sqldev01 instance. The sequence will restart with 10000 and increment by 10.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | Set-DbaDbSequence -Sequence TestSequence -Schema TestSchema -Cycle
```

Using a pipeline this command modifies the sequence named TestSchema.TestSequence in the TestDB database on the sqldev01 instance. The sequence will now cycle the sequence values.<br>

### Required Parameters

##### -Sequence

Specifies the name of the sequence object to modify. This is the sequence you want to update properties for.  
Must be an existing sequence in the specified schema, otherwise the function will fail.

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

Specifies the target database containing the sequence to modify. Accepts multiple database names.  
Required when using SqlInstance parameter to identify which database contains the sequence.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Specifies the schema containing the sequence to modify. Defaults to 'dbo' if not specified.  
Use this when your sequence exists in a custom schema rather than the default dbo schema.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbo |

##### -RestartWith

Sets the next value the sequence will return when NEXT VALUE FOR is called. Immediately resets the sequence to this value.  
Use this to fix sequence gaps, realign sequences after data imports, or reset sequences for testing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -IncrementBy

Sets how much the sequence value increases (or decreases if negative) with each NEXT VALUE FOR call.  
Common values are 1 for sequential numbering or larger values for reserving ranges. Cannot be zero.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MinValue

Sets the lowest value the sequence can generate. Once reached, sequence behavior depends on the Cycle setting.  
Use this to establish data range constraints or prevent sequences from going below business-required minimums.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaxValue

Sets the highest value the sequence can generate. Once reached, sequence behavior depends on the Cycle setting.  
Use this to prevent sequences from exceeding data type limits or business-defined maximum values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Cycle

Enables the sequence to restart from MinValue after reaching MaxValue (or vice versa for negative increments).  
Use this for scenarios like rotating through a fixed set of values or when sequences need to wrap around.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CacheSize

Sets the number of sequence values SQL Server pre-allocates in memory for faster access.  
Use 0 to disable caching (guarantees no gaps but slower performance), or specify a number for high-performance scenarios. Omit this parameter to let SQL Server choose an optimal cache size.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline to modify sequences across multiple databases.  
Use this for batch operations when you need to modify the same sequence in multiple databases.

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
