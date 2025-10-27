---
title: "New-DbaDbMailAccount"
slug: "New-DbaDbMailAccount"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new Database Mail account for sending emails from SQL Server"
tags:
  - "DatabaseMail"
  - "DbMail"
  - "Mail"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbMailAccount.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbMailAccount"
draft: false
---

# New-DbaDbMailAccount

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbMailAccount](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbMailAccount.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbMailAccount](https://dataplat.github.io/boh#New-DbaDbMailAccount).

## Synopsis

Creates a new Database Mail account for sending emails from SQL Server

## Description

Creates a new Database Mail account on SQL Server instances to enable automated email notifications, alerts, and reports. Database Mail accounts define the email settings (SMTP server, sender address, authentication) that SQL Server uses when sending emails through stored procedures like sp_send_dbmail. This is essential for setting up automated maintenance notifications, job failure alerts, and scheduled report delivery.

## Syntax

```powershell
New-DbaDbMailAccount
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Account] <String>
    [[-DisplayName] <String>]
    [[-Description] <String>]
    [-EmailAddress] <String>
    [[-ReplyToAddress] <String>]
    [[-MailServer] <String>]
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
PS C:\> $account = New-DbaDbMailAccount -SqlInstance sql2017 -Account 'The DBA Team' -EmailAddress admin@ad.local -MailServer smtp.ad.local
```

Creates a new database mail account with the email address admin@ad.local on sql2017 named "The DBA Team" using the smtp.ad.local mail server.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Account

Specifies the unique name for the Database Mail account being created. This name is used internally by SQL Server to identify the account when configuring Database Mail profiles.  
Choose a descriptive name that identifies the account's purpose, such as 'MaintenanceAlerts' or 'ReportDelivery'.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -EmailAddress

Specifies the sender email address that appears in outgoing messages from this Database Mail account. This must be a valid email address that your SMTP server accepts.  
Use addresses that recipients will recognize and trust, such as 'sqlserver@company.com' or 'dba-alerts@domain.local'.

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

##### -DisplayName

Sets the friendly name that appears in the 'From' field of outgoing emails. Recipients see this name instead of the raw account name.  
Defaults to the Account name if not specified. Use descriptive names like 'SQL Server Alerts' or 'DBA Team Notifications'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $Account |

##### -Description

Provides optional documentation text describing the account's purpose and usage. This helps other DBAs understand when and how the account should be used.  
Consider including details like which jobs or applications use this account and any special configuration requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReplyToAddress

Specifies an alternate email address for replies when different from the sender address. Recipients who reply to automated emails will send responses to this address instead.  
Useful when you want replies to go to a monitored mailbox like 'dba-team@company.com' rather than the automated sender address.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MailServer

Specifies the SMTP server hostname or IP address that SQL Server will use to send emails through this account. The server must be accessible from the SQL Server instance.  
If not specified, uses the SQL Server instance name as the mail server. The function validates that the mail server exists unless -Force is used.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Bypasses the mail server existence validation and creates the Database Mail account even if the specified SMTP server cannot be found or verified.  
Use this when the mail server exists but is not discoverable by SQL Server, or when setting up accounts for servers that will be available later.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
