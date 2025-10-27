---
title: "Select-DbaDbSequenceNextValue"
slug: "Select-DbaDbSequenceNextValue"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves and increments the next value from a SQL Server sequence object."
tags:
  - "Data"
  - "Sequence"
  - "Table"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Select-DbaDbSequenceNextValue.ps1"
bohUrl: "https://dataplat.github.io/boh#Select-DbaDbSequenceNextValue"
draft: false
---

# Select-DbaDbSequenceNextValue

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Select-DbaDbSequenceNextValue](https://github.com/dataplat/dbatools/blob/master/public/Select-DbaDbSequenceNextValue.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Select-DbaDbSequenceNextValue](https://dataplat.github.io/boh#Select-DbaDbSequenceNextValue).

## Synopsis

Retrieves and increments the next value from a SQL Server sequence object.

## Description

Executes a SELECT NEXT VALUE FOR statement against the specified sequence, which increments the sequence counter and returns the next value in the series.  
This is useful for testing sequence behavior, troubleshooting sequence issues, or retrieving sequence values for application logic.  
Note that calling this function will permanently increment the sequence counter, so it's not just a read operation.

## Syntax

```powershell
Select-DbaDbSequenceNextValue
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [-Sequence] <String[]>
    [[-Schema] <String>]
    [[-InputObject] <Database>]
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
PS C:\> Select-DbaDbSequenceNextValue -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence
```

Selects the next value from the sequence TestSequence in the TestDB database on the sqldev01 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | Select-DbaDbSequenceNextValue -Sequence TestSequence -Schema TestSchema
```

Using a pipeline this command selects the next value from the sequence TestSchema.TestSequence in the TestDB database on the sqldev01 instance.<br>

### Required Parameters

##### -Sequence

Specifies the name of the sequence object to increment and retrieve the next value from.  
Accepts multiple sequence names when you need to get next values from several sequences in the same operation.  
This will permanently increment each sequence's internal counter.

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

Specifies the database containing the sequence object you want to increment.  
Required when using SqlInstance parameter to identify which database contains the target sequence.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Specifies the schema that contains the sequence object. Defaults to 'dbo' if not specified.  
Use this when your sequence is created in a custom schema other than the default dbo schema.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbo |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input.  
Use this to chain database selection with sequence operations when working with multiple databases or complex filtering scenarios.

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
