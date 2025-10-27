---
title: "Remove-DbaDbMailAccount"
slug: "Remove-DbaDbMailAccount"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes Database Mail accounts from SQL Server instances"
tags:
  - "DatabaseMail"
  - "DbMail"
  - "Mail"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMailAccount.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbMailAccount"
draft: false
---

# Remove-DbaDbMailAccount

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbMailAccount](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMailAccount.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbMailAccount](https://dataplat.github.io/boh#Remove-DbaDbMailAccount).

## Synopsis

Removes Database Mail accounts from SQL Server instances

## Description

Permanently deletes Database Mail accounts from the specified SQL Server instances, removing them from the MSDB database configuration.  
This command is useful when decommissioning obsolete email accounts, cleaning up after application retirement, or consolidating accounts during email system migrations.  
When used without pipeline input, it automatically retrieves accounts using Get-DbaDbMailAccount with the provided parameters before removal.  
Returns detailed status information for each removal operation, including success/failure status and any error messages encountered.

## Syntax

```powershell
Remove-DbaDbMailAccount
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Account <String[]>]
    [-ExcludeAccount <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbMailAccount -InputObject <MailAccount[]>
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
PS C:\> Remove-DbaDbMailAccount -SqlInstance localhost, localhost\namedinstance
```

Removes all database mail accounts on the localhost, localhost\namedinstance instances.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbMailAccount -SqlInstance localhost -Account MyDatabaseMailAccount
```

Removes MyDatabaseMailAccount database mail account on the localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMailAccount -SqlInstance SRV1 | Out-GridView -Title 'Select database mail account(s) to drop' -OutputMode Multiple | Remove-DbaDbMailAccount
```

Using a pipeline this command gets all database mail accounts on SRV1, lets the user select those to remove and then removes the selected database mail accounts.<br>

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

Accepts Database Mail account objects from the pipeline, typically from Get-DbaDbMailAccount.  
Use this approach when you need to filter or review accounts before removal using PowerShell pipeline operations.  
Provides more flexibility than specifying account names directly.

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

##### -Account

Specifies one or more Database Mail account names to remove from the SQL Server instance.  
Use this when you need to remove specific accounts rather than all accounts on the server.  
Accepts multiple account names as a string array for bulk removal operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAccount

Specifies Database Mail account names to exclude from removal when processing all accounts on the instance.  
Use this when you want to remove most accounts but keep certain ones active for ongoing operations.  
Only applies when the Account parameter is not specified.

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
