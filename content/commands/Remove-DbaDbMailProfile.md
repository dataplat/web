---
title: "Remove-DbaDbMailProfile"
slug: "Remove-DbaDbMailProfile"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes Database Mail profiles from SQL Server instances."
tags:
  - "DatabaseMail"
  - "DBMail"
  - "Mail"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMailProfile.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbMailProfile"
draft: false
---

# Remove-DbaDbMailProfile

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbMailProfile](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMailProfile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbMailProfile](https://dataplat.github.io/boh#Remove-DbaDbMailProfile).

## Synopsis

Removes Database Mail profiles from SQL Server instances.

## Description

Deletes specified Database Mail profiles from the msdb database, permanently removing their configuration and preventing them from sending emails.  
This is commonly used during security hardening to remove unused profiles or when cleaning up misconfigured mail setups.  
Accepts profiles via pipeline from Get-DbaDbMailProfile or directly through parameters, making it easy to selectively remove profiles based on specific criteria.  
Returns detailed results showing which profiles were successfully removed and any that failed during deletion.

## Syntax

```powershell
Remove-DbaDbMailProfile
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Profile <String[]>]
    [-ExcludeProfile <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbMailProfile -InputObject <MailProfile[]>
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
PS C:\> Remove-DbaDbMailProfile -SqlInstance localhost, localhost\namedinstance
```

Removes all database mail profiles on the localhost, localhost\namedinstance instances.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbMailProfile -SqlInstance localhost -Profile MyDatabaseMailProfile
```

Removes MyDatabaseMailProfile database mail profile on the localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMailProfile -SqlInstance SRV1 | Out-GridView -Title 'Select database mail profile(s) to drop' -OutputMode Multiple | Remove-DbaDbMailProfile
```

Using a pipeline this command gets all database mail profiles on SRV1, lets the user select those to remove and then removes the selected database mail profiles.<br>

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

Accepts Database Mail profile objects from Get-DbaDbMailProfile via pipeline.  
This allows for advanced filtering and selection of profiles before removal, such as selecting profiles based on account configuration or last usage date.

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

##### -Profile

Specifies one or more Database Mail profile names to remove from the instance. Supports wildcards for pattern matching.  
Use this when you need to remove specific profiles instead of all profiles on the instance. If unspecified, all profiles will be removed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeProfile

Specifies one or more Database Mail profile names to exclude from removal. Supports wildcards for pattern matching.  
Use this when removing all profiles except certain ones you want to keep active for ongoing email operations.

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
