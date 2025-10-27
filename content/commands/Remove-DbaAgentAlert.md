---
title: "Remove-DbaAgentAlert"
slug: "Remove-DbaAgentAlert"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server Agent alerts from specified instances."
tags:
  - "Agent"
  - "Alert"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentAlert.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgentAlert"
draft: false
---

# Remove-DbaAgentAlert

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgentAlert](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentAlert.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgentAlert](https://dataplat.github.io/boh#Remove-DbaAgentAlert).

## Synopsis

Removes SQL Server Agent alerts from specified instances.

## Description

Deletes SQL Server Agent alerts that monitor for specific errors, performance conditions, or system events.  
Useful for cleaning up obsolete alerts, removing test configurations, or managing alert policies across multiple instances.  
Can remove specific alerts by name, exclude certain alerts, or work with piped input from Get-DbaAgentAlert for selective removal.  
Returns detailed results showing which alerts were successfully removed and any errors encountered.

## Syntax

```powershell
Remove-DbaAgentAlert
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Alert <String[]>]
    [-ExcludeAlert <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaAgentAlert -InputObject <Alert[]>
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
PS C:\> Remove-DbaAgentAlert -SqlInstance localhost, localhost\namedinstance
```

Removes all SQL Agent alerts on the localhost, localhost\namedinstance instances.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaAgentAlert -SqlInstance localhost -Alert MyDatabaseAlert
```

Removes MyDatabaseAlert SQL Agent alert on the localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentAlert -SqlInstance SRV1 | Out-GridView -Title 'Select SQL Agent alert(s) to drop' -OutputMode Multiple | Remove-DbaAgentAlert
```

Using a pipeline this command gets all SQL Agent alerts on SRV1, lets the user select those to remove and then removes the selected SQL Agent alerts.<br>

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

Accepts SQL Agent alert objects from the pipeline, typically from Get-DbaAgentAlert.  
Use this for selective removal operations where you first query alerts with specific criteria and then remove the filtered results.  
Enables advanced scenarios like interactive selection using Out-GridView or complex filtering logic.

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

##### -Alert

Specifies the names of specific SQL Agent alerts to remove from the target instances.  
Use this when you need to remove particular alerts rather than all alerts on the server.  
Accepts an array of alert names for bulk removal operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAlert

Excludes specific SQL Agent alerts from removal when processing all alerts on an instance.  
Useful for bulk cleanup operations where you want to preserve certain critical alerts.  
Only applies when the Alert parameter is not specified, allowing you to remove all alerts except those listed here.

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
