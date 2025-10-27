---
title: "Remove-DbaCredential"
slug: "Remove-DbaCredential"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL credential(s)."
tags:
  - "Security"
  - "Credential"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaCredential.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaCredential"
draft: false
---

# Remove-DbaCredential

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaCredential](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaCredential.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaCredential](https://dataplat.github.io/boh#Remove-DbaCredential).

## Synopsis

Removes SQL credential(s).

## Description

Removes the SQL credential(s) that have passed through the pipeline.  
If not used with a pipeline, Get-DbaCredential will be executed with the parameters provided  
and the returned SQL credential(s) will be removed.

## Syntax

```powershell
Remove-DbaCredential
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Credential <String[]>]
    [-ExcludeCredential <String[]>]
    [-Identity <String[]>]
    [-ExcludeIdentity <String[]>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaCredential
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Credential <String[]>]
    [-ExcludeCredential <String[]>]
    [-Identity <String[]>]
    [-ExcludeIdentity <String[]>]
    -InputObject <Credential[]>
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
PS C:\> Remove-DbaCredential -SqlInstance localhost, localhost\namedinstance
```

Removes all SQL credentials on the localhost, localhost\namedinstance instances.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaCredential -SqlInstance localhost -Credential MyDatabaseCredential
```

Removes MyDatabaseCredential SQL credential on the localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaCredential -SqlInstance SRV1 | Out-GridView -Title 'Select SQL credential(s) to drop' -OutputMode Multiple | Remove-DbaCredential
```

Using a pipeline this command gets all SQL credentials on SRV1, lets the user select those to remove and then removes the selected SQL credentials.<br>

### Required Parameters

##### -InputObject

Accepts credential objects from Get-DbaCredential for pipeline operations.  
Use this to chain credential discovery and removal operations, enabling selective removal through Out-GridView or other filters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Credential

Specifies one or more SQL Server credential names to remove from the instance. Accepts wildcards for pattern matching.  
Use this to target specific credentials instead of removing all credentials on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeCredential

Specifies one or more SQL Server credential names to exclude from removal. Accepts wildcards for pattern matching.  
Use this when you want to remove most credentials but preserve certain ones like service account or backup credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Identity

Filters credentials by their associated identity (the Windows account or certificate the credential represents).  
Use this to remove credentials based on the underlying identity rather than the credential name. Enclose identities with spaces in quotes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeIdentity

Specifies identities to exclude from credential removal operations.  
Use this to preserve credentials associated with specific Windows accounts or certificates when removing others.

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
