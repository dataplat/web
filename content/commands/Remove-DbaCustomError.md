---
title: "Remove-DbaCustomError"
slug: "Remove-DbaCustomError"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Removes user-defined error messages from the sys.messages system catalog"
tags:
  - "General"
  - "Error"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaCustomError.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaCustomError"
draft: false
---

# Remove-DbaCustomError

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaCustomError](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaCustomError.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaCustomError](https://dataplat.github.io/boh#Remove-DbaCustomError).

## Synopsis

Removes user-defined error messages from the sys.messages system catalog

## Description

Removes custom error messages that applications have added to SQL Server's sys.messages catalog, cleaning up obsolete or unwanted user-defined messages with IDs between 50001 and 2147483647. This is essential when decommissioning applications, cleaning up test environments, or managing custom error message lifecycles during application deployments. You can remove messages for specific languages or all language versions of a message ID at once.

## Syntax

```powershell
Remove-DbaCustomError
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-MessageID] <Int32>]
    [[-Language] <String>]
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
PS C:\> Remove-DbaCustomError -SqlInstance sqldev01, sqldev02 -MessageID 70001 -Language "French"
```

Removes the custom message on the sqldev01 and sqldev02 instances with ID 70001 and language French.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaCustomError -SqlInstance sqldev01, sqldev02 -MessageID 70001 -Language "All"
```

Removes all custom messages on the sqldev01 and sqldev02 instances with ID 70001.<br>

#####  Example:  3 

```powershell
PS C:\> $server = Connect-DbaInstance sqldev01
PS C:\> $newMessage = New-DbaCustomError -SqlInstance $server -MessageID 70000 -Severity 16 -MessageText "test_70000"
```

Creates a new custom message on the sqldev01 instance with ID 70000, severity 16, and text "test_70000"<br>
To modify the custom message at a later time the following can be done to change the severity from 16 to 20:<br>

```powershell
PS C:\> $original = $server.UserDefinedMessages | Where-Object ID -eq 70000
PS C:\> $messageID = $original.ID
PS C:\> $severity = 20
PS C:\> $text = $original.Text
PS C:\> $language = $original.Language
PS C:\> $removed = Remove-DbaCustomError -SqlInstance $server -MessageID 70000
PS C:\> $alteredMessage = New-DbaCustomError -SqlInstance $server -MessageID $messageID -Severity $severity -MessageText $text -Language $language -WithLog
```

The resulting updated message object is available in $alteredMessage.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

##### -MessageID

Specifies the custom error message ID to remove from the sys.messages catalog.  
Must be between 50001 and 2147483647, which is the valid range for user-defined error messages.  
Use this to target specific custom errors that applications have registered with SQL Server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Language

Specifies which language version of the custom error message to remove.  
Accepts language names or aliases from sys.syslanguages (like 'English', 'French', 'Deutsch').  
Use 'All' to remove all language versions of the message ID at once. Defaults to 'English'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | English |

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
