---
title: "Remove-DbaAgentAlertCategory"
slug: "Remove-DbaAgentAlertCategory"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server Agent alert categories from SQL Server instances."
tags:
  - "Agent"
  - "Alert"
  - "AlertCategory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentAlertCategory.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgentAlertCategory"
draft: false
---

# Remove-DbaAgentAlertCategory

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgentAlertCategory](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentAlertCategory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgentAlertCategory](https://dataplat.github.io/boh#Remove-DbaAgentAlertCategory).

## Synopsis

Removes SQL Server Agent alert categories from SQL Server instances.

## Description

Removes custom alert categories from SQL Server Agent, useful for cleaning up unused organizational structures or standardizing alert management across environments.  
Any existing alerts that reference the removed category will automatically be reassigned to the [Uncategorized] category, so you don't need to manually update alert assignments before removal.  
The function works with both individual category names and accepts pipeline input from Get-DbaAgentAlertCategory for bulk operations.  
Returns detailed status information showing which categories were successfully removed and any that failed with error details.

## Syntax

```powershell
Remove-DbaAgentAlertCategory
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Category <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaAgentAlertCategory -InputObject <AlertCategory[]>
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
PS C:\> Remove-DbaAgentAlertCategory -SqlInstance sql1 -Category 'Category 1'
```

Remove the alert category Category 1 from the instance.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaAgentAlertCategory -SqlInstance sql1 -Category Category1, Category2, Category3
```

Remove multiple alert categories from the instance.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaAgentAlertCategory -SqlInstance sql1, sql2, sql3 -Category Category1, Category2, Category3
```

Remove multiple alert categories from the multiple instances.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentAlertCategory -SqlInstance SRV1 | Out-GridView -Title 'Select SQL Agent alert category(-ies) to drop' -OutputMode Multiple | Remove-DbaAgentAlertCategory
```

Using a pipeline this command gets all SQL Agent alert category(-ies) on SRV1, lets the user select those to remove and then removes the selected SQL Agent alert category(-ies).<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts alert category objects from Get-DbaAgentAlertCategory for pipeline-based operations.  
Use this when you need to filter or select categories interactively before removal, such as with Out-GridView.

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

##### -Category

Specifies the names of the alert categories to remove from SQL Server Agent. Accepts multiple category names for bulk removal.  
Use this to target specific custom categories you want to delete while keeping others intact.

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
