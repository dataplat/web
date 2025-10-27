---
title: "New-DbaDbMailProfile"
slug: "New-DbaDbMailProfile"
date: 2024-01-01
layout: "single"
author: "Ian Lanham (@ilanham)"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new Database Mail profile for organizing SQL Server email notifications"
tags:
  - "DatabaseMail"
  - "DbMail"
  - "Mail"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbMailProfile.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbMailProfile"
draft: false
---

# New-DbaDbMailProfile

| Property | Value |
| --- | --- |
| **Author** | Ian Lanham (@ilanham) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbMailProfile](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbMailProfile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbMailProfile](https://dataplat.github.io/boh#New-DbaDbMailProfile).

## Synopsis

Creates a new Database Mail profile for organizing SQL Server email notifications

## Description

Creates a new Database Mail profile on SQL Server instances, which serves as a container for organizing mail accounts used by SQL Server for notifications, alerts, and reports. Database Mail profiles allow you to group multiple mail accounts and set priorities for failover scenarios. You can optionally associate an existing mail account to the profile during creation, making this useful for setting up complete email notification systems or organizing different notification types into separate profiles.

## Syntax

```powershell
New-DbaDbMailProfile
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Profile] <String>
    [[-Description] <String>]
    [[-MailAccountName] <String>]
    [[-MailAccountPriority] <Int32>]
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
PS C:\> $profile = New-DbaDbMailProfile -SqlInstance sql2017 -Profile 'The DBA Team'
```

Creates a new database mail profile.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Profile

Specifies the name for the new Database Mail profile. Profile names must be unique within each SQL Server instance.  
Use descriptive names like 'DBA Alerts', 'Application Notifications', or 'Backup Reports' to organize different types of email notifications.

| Property | Value |
| --- | --- |
| Alias | Name |
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

##### -Description

Provides a detailed description explaining the purpose or intended use of the Database Mail profile.  
This helps document what types of emails will be sent through this profile, making it easier for other DBAs to understand the profile's purpose.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MailAccountName

Specifies an existing Database Mail account to associate with this profile during creation.  
The mail account must already exist on the SQL Server instance and will be used to send emails through this profile.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MailAccountPriority

Sets the priority level for the associated mail account within the profile, with 1 being the highest priority.  
Lower priority accounts serve as failover options when higher priority accounts are unavailable. Defaults to 1 if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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
