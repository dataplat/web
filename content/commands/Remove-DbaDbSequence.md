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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbSequence</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSequence.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Remove-DbaDbSequence -SqlInstance sqldev01 -Database TestDB -Sequence TestSequence" }

Removes the sequence TestSequence in the TestDB database on the sqldev01 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbSequence -SqlInstance SRV1 | Out-GridView -Title 'Select sequence(s) to drop' -OutputMode Multiple | Remove-DbaDbSequence
```
{: data-copyable="true" data-clean-code="Get-DbaDbSequence -SqlInstance SRV1 | Out-GridView -Title 'Select sequence(s) to drop' -OutputMode Multiple | Remove-DbaDbSequence" }

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
