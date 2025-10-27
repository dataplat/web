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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbMailProfile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMailProfile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Mikey Bronowski (@MikeyBronowski), bronowski.it</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Remove-DbaDbMailProfile -SqlInstance localhost, localhost\namedinstance" }

Removes all database mail profiles on the localhost, localhost\namedinstance instances.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbMailProfile -SqlInstance localhost -Profile MyDatabaseMailProfile
```
{: data-copyable="true" data-clean-code="Remove-DbaDbMailProfile -SqlInstance localhost -Profile MyDatabaseMailProfile" }

Removes MyDatabaseMailProfile database mail profile on the localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMailProfile -SqlInstance SRV1 | Out-GridView -Title 'Select database mail profile(s) to drop' -OutputMode Multiple | Remove-DbaDbMailProfile
```
{: data-copyable="true" data-clean-code="Get-DbaDbMailProfile -SqlInstance SRV1 | Out-GridView -Title 'Select database mail profile(s) to drop' -OutputMode Multiple | Remove-DbaDbMailProfile" }

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
