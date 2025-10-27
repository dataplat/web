---
title: "New-DbaAgentAlertCategory"
slug: "New-DbaAgentAlertCategory"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Creates new SQL Agent alert categories for organizing and managing database alerts."
tags:
  - "Agent"
  - "Alert"
  - "AlertCategory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentAlertCategory.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAgentAlertCategory"
draft: false
---

# New-DbaAgentAlertCategory

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaAgentAlertCategory](https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentAlertCategory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaAgentAlertCategory](https://dataplat.github.io/boh#New-DbaAgentAlertCategory).

## Synopsis

Creates new SQL Agent alert categories for organizing and managing database alerts.

## Description

Creates custom alert categories in SQL Server Agent to help organize and group related alerts for better management and monitoring.  
Alert categories allow DBAs to logically group alerts by function, severity, or responsibility, making it easier to assign different categories to different teams or escalation procedures.  
This is particularly useful in environments with many alerts where categorization helps with organization, reporting, and maintenance workflows.  
Returns the newly created alert category objects that can be immediately used when configuring SQL Agent alerts.

## Syntax

```powershell
New-DbaAgentAlertCategory
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Category] <String[]>
    [-Force]
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
PS C:\> New-DbaAgentAlertCategory -SqlInstance sql1 -Category 'Category 1'
```

Creates a new alert category with the name 'Category 1'.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1' | New-DbaAgentAlertCategory -Category 'Category 2'
```

Creates a new alert category with the name 'Category 2'.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Category

Specifies the name or names of the alert categories to create in SQL Server Agent.  
Use descriptive names that reflect how you organize alerts, such as 'Database Errors', 'Performance Issues', or 'Security Events'.  
Multiple categories can be created in a single operation by providing an array of category names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -Force

Bypasses confirmation prompts and creates the alert categories without user interaction.  
Use this parameter in automated scripts or when you're confident about the category names being created.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
