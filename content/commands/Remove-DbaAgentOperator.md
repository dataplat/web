---
title: "Remove-DbaAgentOperator"
slug: "Remove-DbaAgentOperator"
date: 2024-01-01
layout: "single"
author: "Tracy Boggiano (@TracyBoggiano), databasesuperhero.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server Agent operators from one or more instances."
tags:
  - "Agent"
  - "Operator"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentOperator.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgentOperator"
draft: false
---

# Remove-DbaAgentOperator

| Property | Value |
| --- | --- |
| **Author** | Tracy Boggiano (@TracyBoggiano), databasesuperhero.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgentOperator](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentOperator.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgentOperator](https://dataplat.github.io/boh#Remove-DbaAgentOperator).

## Synopsis

Removes SQL Server Agent operators from one or more instances.

## Description

Removes SQL Server Agent operators from specified instances, cleaning up notification contacts that are no longer needed.  
  
Operators are notification contacts used by SQL Server Agent to send alerts about job failures, system issues, or other events. This function helps you remove outdated operator accounts when employees leave, contact information changes, or you need to consolidate notification lists.  
  
The function safely handles dependencies and provides detailed status output for each removal operation, making it suitable for both interactive cleanup and automated operator management scripts.

## Syntax

```powershell
Remove-DbaAgentOperator
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Operator <String[]>]
    [-ExcludeOperator <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaAgentOperator
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Operator <String[]>]
    [-ExcludeOperator <String[]>]
    -InputObject <Operator[]>
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
PS C:\> Remove-DbaAgentOperator -SqlInstance sql01 -Operator DBA
```

This removes an operator named DBA from the instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentOperator -SqlInstance SRV1 | Out-GridView -Title 'Select SQL Agent operator(s) to drop' -OutputMode Multiple | Remove-DbaAgentOperator
```

Using a pipeline this command gets all SQL Agent operator(s) on SRV1, lets the user select those to remove and then removes the selected SQL Agent alert category(-ies).<br>

### Required Parameters

##### -InputObject

Accepts SQL Server Agent operator objects from Get-DbaAgentOperator for pipeline operations.  
This parameter enables filtering operators before removal and supports interactive selection workflows using Out-GridView.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

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

##### -Operator

Specifies the SQL Server Agent operator names to remove from the instance. Accepts multiple operator names for bulk removal.  
Use this when you need to remove specific operators by name, such as when employees leave or contact information becomes outdated.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeOperator

Specifies operator names to skip during removal operations. Useful when removing multiple operators but want to preserve certain ones.  
Use this to protect critical operators from accidental deletion when performing bulk removals or scripted cleanup operations.

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

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
