---
title: "New-DbaCustomError"
slug: "New-DbaCustomError"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Creates custom error messages in SQL Server's sys.messages table for standardized application and stored procedure error handling"
tags:
  - "General"
  - "Error"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaCustomError.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaCustomError"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaCustomError</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaCustomError.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates custom error messages in SQL Server's sys.messages table for standardized application and stored procedure error handling

## Description

Creates custom error messages in SQL Server's sys.messages table using sp_addmessage, enabling standardized error handling across applications and stored procedures. This replaces the need to manually execute sp_addmessage for each custom message you want to define.  
  
Custom error messages are essential for application development and database maintenance workflows where you need consistent, meaningful error reporting. Instead of generic SQL Server errors, you can define specific messages like "Customer record not found" or "Data validation failed for field X" that make troubleshooting much easier for both developers and DBAs.  
  
You can assign custom message IDs between 50001 and 2147483647, set severity levels from 1-25, and optionally enable logging to both the Windows Application Log and SQL Server Error Log. The function supports multiple languages and can create messages across multiple SQL Server instances simultaneously.  
  
Note: When adding non-English messages, the U.S. English version must be created first with the same severity level. This command does not support Azure SQL Database.

## Syntax

```powershell
New-DbaCustomError
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-MessageID] <Int32>]
    [[-Severity] <Int32>]
    [[-MessageText] <String>]
    [[-Language] <String>]
    [-WithLog]
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
PS C:\> New-DbaCustomError -SqlInstance sqldev01, sqldev02 -MessageID 70001 -Severity 16 -MessageText "test"
```
{: data-copyable="true" data-clean-code="New-DbaCustomError -SqlInstance sqldev01, sqldev02 -MessageID 70001 -Severity 16 -MessageText &quot;test&quot;" }

Creates a new custom message on the sqldev01 and sqldev02 instances with ID 70001, severity 16, and text "test".<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaCustomError -SqlInstance sqldev01 -MessageID 70001 -Severity 16 -MessageText "test" -Language "French"
```
{: data-copyable="true" data-clean-code="New-DbaCustomError -SqlInstance sqldev01 -MessageID 70001 -Severity 16 -MessageText &quot;test&quot; -Language &quot;French&quot;" }

Creates a new custom message on the sqldev01 instance for the french language with ID 70001, severity 16, and text "test".<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaCustomError -SqlInstance sqldev01 -MessageID 70001 -Severity 16 -MessageText "test" -WithLog
```
{: data-copyable="true" data-clean-code="New-DbaCustomError -SqlInstance sqldev01 -MessageID 70001 -Severity 16 -MessageText &quot;test&quot; -WithLog" }

Creates a new custom message on the sqldev01 instance with ID 70001, severity 16, text "test", and enables the log mechanism.<br>

#####  Example:  4 

```powershell
PS C:\> $server = Connect-DbaInstance sqldev01
PS C:\> $newMessage = New-DbaCustomError -SqlInstance $server -MessageID 70000 -Severity 16 -MessageText "test_70000"
```
{: data-copyable="true" data-clean-code="$server = Connect-DbaInstance sqldev01
$newMessage = New-DbaCustomError -SqlInstance $server -MessageID 70000 -Severity 16 -MessageText &quot;test_70000&quot;" }

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
{: data-copyable="true" data-clean-code="$original = $server.UserDefinedMessages | Where-Object ID -eq 70000
$messageID = $original.ID
$severity = 20
$text = $original.Text
$language = $original.Language
$removed = Remove-DbaCustomError -SqlInstance $server -MessageID 70000
$alteredMessage = New-DbaCustomError -SqlInstance $server -MessageID $messageID -Severity $severity -MessageText $text -Language $language -WithLog" }

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

Specifies the unique identifier for the custom error message, ranging from 50001 to 2147483647. Choose an ID that doesn't conflict with existing custom messages in your environment.  
Use sequential numbering for organization, such as 60000-60999 for application errors and 61000-61999 for stored procedure validation errors.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Severity

Sets the severity level from 1 to 25, which determines how SQL Server handles the error when raised. Levels 1-10 are informational, 11-16 are user errors that can be corrected, 17-19 are non-fatal   
resource errors, and 20-25 are fatal system errors.  
Most custom application errors use severity 16, while validation errors often use 11-15 depending on whether the application should continue processing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MessageText

Defines the error message text displayed when the custom error is raised, with a maximum length of 255 characters. Use clear, actionable language that helps developers and users understand what went   
wrong.  
Include parameter placeholders using printf-style formatting (like %s, %d) when the message needs dynamic values at runtime.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Language

Specifies the language for the error message using values from sys.syslanguages (Name or Alias columns). Defaults to 'English' if not specified.  
Create the U.S. English version first before adding other languages, as SQL Server requires the English version to exist with the same severity level before non-English versions can be added.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | English |

##### -WithLog

Enables automatic logging of this error message to both the Windows Application Log and SQL Server Error Log whenever the error is raised.  
Use this for critical errors that require audit trails or monitoring alerts, but avoid for frequently occurring validation errors to prevent log flooding.

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
