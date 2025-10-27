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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbMailProfile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbMailProfile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Ian Lanham (@ilanham)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="$profile = New-DbaDbMailProfile -SqlInstance sql2017 -Profile 'The DBA Team'" }

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
