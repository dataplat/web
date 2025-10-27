---
title: "Remove-DbaDbSequence"
slug: "Remove-DbaDbSequence"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Removes database sequence objects from SQL Server instances."
tags:
  - "Data"
  - "Sequence"
  - "Table"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSequence.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbSequence"
draft: false
---

# Remove-DbaDbSequence

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbSequence](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSequence.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbSequence](https://dataplat.github.io/boh#Remove-DbaDbSequence).

## Synopsis

Removes database sequence objects from SQL Server instances.

## Description

Removes sequence objects from SQL Server databases, freeing up schema namespace and cleaning up unused database objects.  
Sequences are commonly used for generating unique numeric values and may need removal during application changes or database cleanup.  
  
When used without a pipeline, the function will first retrieve matching sequences using Get-DbaDbSequence with the provided parameters, then remove them.  
Pipeline input from Get-DbaDbSequence allows for selective removal after review or filtering.

## Syntax

```powershell
Remove-DbaDbSequence
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-Sequence <String[]>]
    [-Schema <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbSequence -InputObject <Sequence[]>
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
PS C:\> Remove-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence
```

Removes the sequence TestSequence in the TestDB database on the sqldev01 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance SRV1 | Out-GridView -Title 'Select sequence(s) to drop' -OutputMode Multiple | Remove-DbaDbSequence
```

Using a pipeline this command gets all sequences on SRV1, lets the user select those to remove and then removes the selected sequences.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts sequence objects piped from Get-DbaDbSequence for removal.  
This allows you to first review sequences with Get-DbaDbSequence before selectively removing them.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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

Specifies which databases to search for sequences to remove. Accepts wildcards for pattern matching.  
Use this to limit sequence removal to specific databases instead of searching all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Sequence

Specifies the name(s) of the sequences to remove. Accepts wildcards for pattern matching.  
Use this when you know the exact sequence names or want to remove sequences matching a naming pattern.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Filters sequences to remove by schema name. Accepts wildcards for pattern matching.  
Useful when you need to remove sequences from specific schemas only, such as during application module cleanup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
This is the default. Use -Confirm:$false to suppress these prompts.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
