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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaDbSequence</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbSequence.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Set-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence -RestartWith 10000 -IncrementBy 10" }

Modifies the sequence TestSequence in the TestDB database on the sqldev01 instance. The sequence will restart with 10000 and increment by 10.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | Set-DbaDbSequence -Sequence TestSequence -Schema TestSchema -Cycle
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sqldev01 -Database TestDB | Set-DbaDbSequence -Sequence TestSequence -Schema TestSchema -Cycle" }

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
